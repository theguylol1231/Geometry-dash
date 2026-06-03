/**
 * Geometry Dash Lite - Mod Menu System
 * God Mode & Auto Play
 */

const modMenu = {
  state: {
    godModeActive: false,
    autoPlayActive: false
  },

  updateStatus(message) {
    const statusEl = document.getElementById('modStatus');
    if (statusEl) {
      statusEl.textContent = message;
    }
    console.log(`[MOD] ${message}`);
  },

  godMode() {
    this.state.godModeActive = !this.state.godModeActive;
    this.updateStatus(this.state.godModeActive ? '✓ God Mode: ON' : 'God Mode: OFF');
    
    if (this.state.godModeActive) {
      this.injectGodMode();
    } else {
      this.removeGodMode();
    }
  },

  injectGodMode() {
    const script = document.createElement('script');
    script.textContent = `
      window.SendMessage = window.SendMessage || function() {};
      const original_SendMessage = window.SendMessage;
      
      window.SendMessage = function(objectName, methodName, value) {
        // Intercept death messages
        if (methodName === 'OnTriggerEnter2D' || methodName === 'Die' || methodName === 'Death') {
          console.log('[GOD MODE] Blocked:', methodName);
          return;
        }
        return original_SendMessage.apply(this, arguments);
      };
      
      // Patch via gameInstance if available
      if (typeof gameInstance !== 'undefined' && gameInstance.Module) {
        window._godModeActive = true;
        console.log('[GOD MODE] Activated');
      }
    `;
    document.head.appendChild(script);
  },

  removeGodMode() {
    const script = document.createElement('script');
    script.textContent = `
      window._godModeActive = false;
      console.log('[GOD MODE] Deactivated');
    `;
    document.head.appendChild(script);
  },

  autoPlay() {
    this.state.autoPlayActive = !this.state.autoPlayActive;
    this.updateStatus(this.state.autoPlayActive ? '✓ Auto Play: ON' : 'Auto Play: OFF');
    
    if (this.state.autoPlayActive) {
      this.injectAutoPlay();
    } else {
      this.removeAutoPlay();
    }
  },

  injectAutoPlay() {
    const script = document.createElement('script');
    script.textContent = `
      window._autoPlayActive = true;
      
      // Simulate spacebar input
      window._autoPlayInterval = setInterval(() => {
        if (window._autoPlayActive) {
          // Create and dispatch spacebar event
          const keyDownEvent = new KeyboardEvent('keydown', {
            key: ' ',
            code: 'Space',
            keyCode: 32,
            which: 32,
            bubbles: true,
            cancelable: true
          });
          
          const keyUpEvent = new KeyboardEvent('keyup', {
            key: ' ',
            code: 'Space',
            keyCode: 32,
            which: 32,
            bubbles: true,
            cancelable: true
          });
          
          document.dispatchEvent(keyDownEvent);
          window.gameInstance?.Module?.print?.('jump');
          
          setTimeout(() => {
            document.dispatchEvent(keyUpEvent);
          }, 100);
        }
      }, 400); // Jump every 400ms
      
      console.log('[AUTO PLAY] Activated');
    `;
    document.head.appendChild(script);
  },

  removeAutoPlay() {
    const script = document.createElement('script');
    script.textContent = `
      window._autoPlayActive = false;
      if (window._autoPlayInterval) {
        clearInterval(window._autoPlayInterval);
      }
      console.log('[AUTO PLAY] Deactivated');
    `;
    document.head.appendChild(script);
  },

  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey) {
        if (e.key.toUpperCase() === 'G') {
          e.preventDefault();
          this.godMode();
        }
        if (e.key.toUpperCase() === 'A') {
          e.preventDefault();
          this.autoPlay();
        }
      }
    });
    console.log('%c✓ Mod Menu Ready', 'color: #00ff00; font-weight: bold; font-size: 14px;');
    console.log('Ctrl+Shift+G = God Mode');
    console.log('Ctrl+Shift+A = Auto Play');
  }
};

function initializeModMenu() {
  if (typeof modMenu !== 'undefined') {
    modMenu.updateStatus('Ready');
    modMenu.initKeyboardShortcuts();
  }
}
