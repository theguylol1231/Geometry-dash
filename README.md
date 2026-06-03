# Geometry Dash Lite - Modded

Play Geometry Dash Lite with **God Mode** and **Auto Play** features enabled!

## 🚀 Play Now

**CDN Link:**
```
https://cdn.jsdelivr.net/gh/theguylol1231/Geometry-dash@main/
```

## 🎮 Features

### ⚡ God Mode
- **Invincibility**: Cannot die or take damage
- **Infinite Health**: Player health set to maximum
- **Keyboard Shortcut**: `Ctrl+Shift+G`

### 🤖 Auto Play
- **Perfect Playthrough**: Automatic perfect timing
- **Auto-dodge**: Automatically avoids obstacles
- **Infinite Resources**: Unlimited jumps and health
- **Keyboard Shortcut**: `Ctrl+Shift+A`

### Other Features
- Speed Boost (`Ctrl+Shift+S`)
- Unlimited Jumps (`Ctrl+Shift+J`)
- Skip Level (`Ctrl+Shift+L`)
- Unlock All Levels (`Ctrl+Shift+U`)
- Max Currency (`Ctrl+Shift+M`)
- Developer Console (`Ctrl+Shift+C`)
- Game State Dump (`Ctrl+Shift+D`)

## 🎨 Mod Menu

The mod menu appears in the top-right corner with a magenta border:
- Click the header to expand/collapse
- All mods can be toggled with buttons
- Status indicator shows active mods
- Keyboard shortcuts available for quick access

## 📁 File Structure

```
Geometry-dash/
├── index.html           # Main game page with mod menu
├── js/
│   ├── modMenu.js      # Mod system & features (FIXED)
│   └── gameHooks.js    # Game integration hooks (FIXED)
├── README.md           # This file
└── GAME_FILES.md       # Game file information
```

## 🔧 Bug Fixes

This version fixes critical issues from the original:

1. **God Mode Fix**:
   - Now uses proper interval-based loops for continuous invincibility
   - Checks if modMenu is defined before accessing state
   - Properly manages god mode loop lifecycle

2. **Auto Play Fix**:
   - Fixed state management to prevent undefined errors
   - Auto-enables god mode when activated
   - Proper cleanup when disabled
   - Fixed toggle state in button UI

3. **Error Prevention**:
   - Added safety checks for undefined objects
   - Better error handling in hooks
   - Fixed button click handlers

## 🎯 How to Use

1. **Open the game**: Visit the CDN link
2. **Wait for loading**: Game will load the Geometry Dash Lite build
3. **Access mod menu**: Look for the magenta "MOD MENU" in top-right
4. **Toggle features**: Click buttons or use keyboard shortcuts
5. **Play with mods**: Enjoy the enhanced gameplay!

## ⌨️ Keyboard Shortcuts

| Shortcut | Feature |
|----------|----------|
| `Ctrl+Shift+G` | Toggle God Mode |
| `Ctrl+Shift+A` | Toggle Auto Play |
| `Ctrl+Shift+S` | Toggle Speed Boost |
| `Ctrl+Shift+J` | Toggle Unlimited Jumps |
| `Ctrl+Shift+L` | Skip Level |
| `Ctrl+Shift+U` | Unlock All Levels |
| `Ctrl+Shift+M` | Max Currency |
| `Ctrl+Shift+C` | Show Developer Console |
| `Ctrl+Shift+D` | Dump Game State |

## 📚 Game Files Source

Game assets are loaded from CDN:
- **Source**: https://github.com/bubbls/UGS-Assets
- **CDN**: https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/gdlite/

**Original Game**: Geometry Dash Lite by RobTop Games

## 📝 License

This is a modded version for educational and entertainment purposes.

## ✅ Status

✔️ God Mode - Working
✔️ Auto Play - Working
✔️ Mod Menu UI - Working
✔️ Keyboard Shortcuts - Working
✔️ Game Loading - Working
