/**
 * Game Hooks - Runtime modification system
 * Applies God Mode and Auto Play effects (FIXED)
 */

const gameHooks = {
  // Hook into game initialization
  initGameMods() {
    this.hookCollisionDetection();
    this.hookPlayerDeath();
    this.hookAutoPlay();
  },

  hookCollisionDetection() {
    // Bypass collisions in God Mode or Auto Play
    window.originalCheckCollision = window.originalCheckCollision || function() {
      return false;
    };

    window.checkCollision = function(...args) {
      if (typeof modMenu !== 'undefined' && (modMenu.state.godModeActive || modMenu.state.autoPlayActive)) {
        return false; // No collision when god mode/auto play is active
      }
      return window.originalCheckCollision.apply(this, args);
    };
  },

  hookPlayerDeath() {
    // Prevent player death when God Mode is active
    window.originalOnDeath = window.originalOnDeath || function() {
      return true;
    };

    // Override death detection
    window.checkDeath = function(...args) {
      if (typeof modMenu !== 'undefined' && modMenu.state.godModeActive) {
        console.log('[GOD MODE] Death prevented!');
        return false; // Prevent death
      }
      return window.originalOnDeath.apply(this, args);
    };

    // Continuous anti-death loop
    window.antiDeathLoop = setInterval(() => {
      if (typeof modMenu !== 'undefined' && modMenu.state.godModeActive) {
        if (typeof window.playerHealth !== 'undefined') {
          window.playerHealth = 999999;
          window.health = 999999;
          window.isDead = false;
          window.canDie = false;
        }
      }
    }, 100);
  },

  hookAutoPlay() {
    // Auto Play hook for perfect jumping and dodging
    window.autoPlayPerfectJump = () => {
      if (typeof modMenu !== 'undefined' && modMenu.state.autoPlayActive) {
        window.simulateJump = true;
        window.playerHealth = 999999;
        window.health = 999999;
        window.playerInvincible = true;
        window.isDead = false;
        window.canDie = false;
      }
    };
  },

  // Main game loop integration
  integrateGameLoop() {
    const updateGameState = () => {
      if (typeof modMenu === 'undefined') return;
      
      // God Mode: Keep player alive
      if (modMenu.state.godModeActive) {
        window.playerHealth = 999999;
        window.health = 999999;
        window.playerInvincible = true;
        window.canDie = false;
        window.isDead = false;
      }

      // Auto Play: Perfect gameplay
      if (modMenu.state.autoPlayActive) {
        window.playerHealth = 999999;
        window.health = 999999;
        window.playerInvincible = true;
        window.remainingJumps = 999999;
        window.dodgeActive = true;
        window.canDie = false;
        window.isDead = false;
        window.perfectTiming = (window.perfectTiming || 0) + 1;
      }
    };

    // Request animation frame for continuous updates
    const gameLoop = () => {
      updateGameState();
      requestAnimationFrame(gameLoop);
    };

    // Start game loop after a small delay to ensure game is loaded
    setTimeout(() => {
      gameLoop();
    }, 1000);
  }
};

// Wait for game to be fully loaded, then integrate mods
window.addEventListener('load', () => {
  setTimeout(() => {
    if (typeof gameHooks !== 'undefined') {
      gameHooks.initGameMods();
      gameHooks.integrateGameLoop();
    }
  }, 3000);
});

// Backup: Initialize after page is fully interactive
if (document.readyState === 'complete') {
  setTimeout(() => {
    if (typeof gameHooks !== 'undefined') {
      gameHooks.initGameMods();
      gameHooks.integrateGameLoop();
    }
  }, 3000);
} else {
  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
      setTimeout(() => {
        if (typeof gameHooks !== 'undefined') {
          gameHooks.initGameMods();
          gameHooks.integrateGameLoop();
        }
      }, 3000);
    }
  });
}