# Game Level Map Component

A reusable web component for displaying game level progress with a comic-style path visualization. Perfect for web games, educational apps, and any application that needs to show progress through a series of levels or steps.

## Features

- 🎨 **Comic-style Design**: Colorful, fun graphics with smooth animations
- 📱 **Responsive**: Works perfectly on all screen sizes
- ⚙️ **Highly Configurable**: Customize levels, colors, sizes, spacing, and more
- 🎯 **Interactive**: Click events for level selection and interaction
- ✨ **Animated**: Smooth transitions and eye-catching visual effects
- 🔧 **Easy Integration**: Simple HTML custom element, no complex setup
- 📊 **Progress Tracking**: Clear visual representation of game progress
- 🎮 **Game-Ready**: Designed specifically for web games and educational applications

## Quick Start

### 1. Include the Component

```html
<script src="path/to/game-level-map.js"></script>
```

### 2. Use in HTML

```html
<game-level-map 
    levels="10" 
    current-level="5" 
    completed-levels="1,2,3,4">
</game-level-map>
```

That's it! You now have a beautiful, interactive level map.

## Configuration

### HTML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `levels` | number | 10 | Total number of levels in the game |
| `current-level` | number | 1 | The currently active/unlocked level |
| `completed-levels` | string | "" | Comma-separated list of completed level numbers |
| `path-color` | string | "#8B4513" | Color of the path connecting levels |
| `marker-size` | number | 40 | Default size of level markers in pixels |
| `spacing` | number | 100 | Horizontal spacing between level markers |
| `width` | number | 800 | Container width (auto-calculated if not specified) |
| `height` | number | 200 | Container height |
| `level-config` | JSON string | "" | Per-level customization configuration |

### Per-Level Customization

Each individual level can be customized with specific properties. This enables creating unique, engaging level maps with varied visual styles.

#### Available Options

| Option | Type | Description | Example |
|--------|------|-------------|---------|
| `shape` | string | Marker shape | 'circle', 'square', 'diamond', 'hexagon', 'star' |
| `size` | number | Custom size in pixels | 50 |
| `icon` | string | Custom icon/emoji | '🌟', '🏰', '👑' |
| `text` | string | Custom text label | 'Start', 'Boss', 'Final' |
| `color` | string | Custom color | '#FF6B6B', '#FFD700' |
| `animation` | string | Animation type | 'bounce', 'spin', 'pulse-large', 'wiggle' |
| `onClick` | function | Custom click handler (JS API only) | `(data) => {...}` |
| `hideCompletionStar` | boolean | Hide completion star | true/false |

### Examples

#### Basic Usage
```html
<game-level-map levels="5" current-level="3"></game-level-map>
```

#### Advanced Configuration
```html
<game-level-map 
    levels="15" 
    current-level="8" 
    completed-levels="1,2,3,4,5,6,7"
    path-color="#FF6B6B" 
    marker-size="45"
    spacing="120"
    width="1200"
    height="250">
</game-level-map>
```

#### Tutorial Levels
```html
<game-level-map 
    levels="3" 
    current-level="1"
    path-color="#4ECDC4" 
    marker-size="50">
</game-level-map>
```

#### Custom Level Configuration (HTML)
```html
<game-level-map 
    levels="5" 
    current-level="3" 
    completed-levels="1,2"
    level-config='{
        "1": {"shape": "star", "icon": "🌟", "animation": "bounce"},
        "2": {"shape": "square", "icon": "🌲", "color": "#32CD32"},
        "3": {"shape": "diamond", "icon": "⛰️", "size": 50},
        "4": {"shape": "hexagon", "icon": "🏰", "animation": "pulse-large"},
        "5": {"shape": "star", "icon": "👑", "color": "#FFD700", "size": 60}
    }'>
</game-level-map>
```

## JavaScript API

### Methods

#### `setCurrentLevel(level)`
Set the current active level.
```javascript
const levelMap = document.querySelector('game-level-map');
levelMap.setCurrentLevel(7);
```

#### `setCompletedLevels(levels)`
Set the completed levels array.
```javascript
levelMap.setCompletedLevels([1, 2, 3, 4, 5, 6]);
```

#### `getCurrentLevel()`
Get the current active level.
```javascript
const currentLevel = levelMap.getCurrentLevel();
console.log('Current level:', currentLevel);
```

#### `getCompletedLevels()`
Get the array of completed levels.
```javascript
const completed = levelMap.getCompletedLevels();
console.log('Completed levels:', completed);
```

#### `setLevelConfig(level, config)`
Set configuration for a specific level.
```javascript
levelMap.setLevelConfig(1, {
    shape: 'star',
    icon: '🌟',
    size: 50,
    color: '#FFD700',
    animation: 'bounce',
    text: 'Start',
    onClick: (data) => {
        console.log('Level clicked:', data.level);
    }
});
```

#### `getLevelConfig(level)`
Get configuration for a specific level.
```javascript
const config = levelMap.getLevelConfig(1);
console.log('Level 1 config:', config);
```

#### `setLevelConfigs(configs)`
Set configurations for multiple levels at once.
```javascript
levelMap.setLevelConfigs({
    1: { shape: 'circle', icon: '🏠' },
    2: { shape: 'square', icon: '🌲' },
    3: { shape: 'diamond', icon: '⛰️' },
    4: { shape: 'hexagon', icon: '🏰' },
    5: { shape: 'star', icon: '👑' }
});
```

#### `getLevelConfigs()`
Get all level configurations.
```javascript
const allConfigs = levelMap.getLevelConfigs();
console.log('All level configs:', allConfigs);
```
const currentLevel = levelMap.getCurrentLevel();
console.log('Current level:', currentLevel);
```

#### `getCompletedLevels()`
Get the array of completed levels.
```javascript
const completed = levelMap.getCompletedLevels();
console.log('Completed levels:', completed);
```

### Events

#### `level-click`
Fired when a user clicks on a level marker.

```javascript
levelMap.addEventListener('level-click', (event) => {
    const { level, state } = event.detail;
    console.log(`Level ${level} clicked (state: ${state})`);
    
    // Handle level selection
    if (state === 'completed') {
        // Allow replaying completed levels
        startLevel(level);
    } else if (state === 'current') {
        // Start current level
        startLevel(level);
    } else {
        // Level is locked
        showLockedMessage();
    }
});
```

## Level States

The component automatically determines the state of each level:

- **Locked** (gray): Levels that haven't been reached yet
- **Current** (gold): The currently active level  
- **Completed** (green): Levels that have been finished

## Styling and Themes

### Color Customization

You can customize colors using CSS custom properties or by setting the `path-color` attribute:

```html
<game-level-map 
    path-color="#FF6B6B"
    style="--locked-color: #e0e0e0; --current-color: #FFD700; --completed-color: #32CD32;">
</game-level-map>
```

### Popular Color Schemes

```html
<!-- Fire Theme -->
<game-level-map path-color="#FF6B6B"></game-level-map>

<!-- Ocean Theme -->
<game-level-map path-color="#4ECDC4"></game-level-map>

<!-- Forest Theme -->
<game-level-map path-color="#96CEB4"></game-level-map>

<!-- Royal Theme -->
<game-level-map path-color="#A55EEA"></game-level-map>
```

## Integration Examples

### React Integration

```jsx
import React, { useEffect, useRef } from 'react';
// Import the component
import './game-level-map.js';

function GameProgress({ levels, currentLevel, completedLevels }) {
    const mapRef = useRef();

    useEffect(() => {
        const levelMap = mapRef.current;
        
        const handleLevelClick = (event) => {
            const { level, state } = event.detail;
            // Handle level selection
            onLevelSelect(level, state);
        };

        levelMap.addEventListener('level-click', handleLevelClick);
        
        return () => {
            levelMap.removeEventListener('level-click', handleLevelClick);
        };
    }, []);

    return (
        <game-level-map
            ref={mapRef}
            levels={levels}
            current-level={currentLevel}
            completed-levels={completedLevels.join(',')}
        />
    );
}
```

### Vue.js Integration

```vue
<template>
    <game-level-map
        :levels="gameData.totalLevels"
        :current-level="gameData.currentLevel"
        :completed-levels="gameData.completedLevels.join(',')"
        @level-click="handleLevelClick"
    />
</template>

<script>
import '../path/to/game-level-map.js';

export default {
    data() {
        return {
            gameData: {
                totalLevels: 12,
                currentLevel: 5,
                completedLevels: [1, 2, 3, 4]
            }
        };
    },
    methods: {
        handleLevelClick(event) {
            const { level, state } = event.detail;
            // Handle level selection
        }
    }
};
</script>
```

### Plain JavaScript Integration

```javascript
// Load the component
import './game-level-map.js';

// Create and configure the component
const levelMap = document.createElement('game-level-map');
levelMap.setAttribute('levels', '10');
levelMap.setAttribute('current-level', '5');
levelMap.setAttribute('completed-levels', '1,2,3,4');

// Add event listener
levelMap.addEventListener('level-click', (event) => {
    const { level, state } = event.detail;
    handleLevelSelection(level, state);
});

// Add to page
document.body.appendChild(levelMap);

// Update progress programmatically
function completeLevel(level) {
    const completed = levelMap.getCompletedLevels();
    completed.push(level);
    levelMap.setCompletedLevels(completed);
    levelMap.setCurrentLevel(level + 1);
}
```

## Game Integration Patterns

### Save/Load Game State

```javascript
// Save game state
function saveGameProgress() {
    const levelMap = document.querySelector('game-level-map');
    const gameState = {
        currentLevel: levelMap.getCurrentLevel(),
        completedLevels: levelMap.getCompletedLevels()
    };
    localStorage.setItem('gameProgress', JSON.stringify(gameState));
}

// Load game state
function loadGameProgress() {
    const saved = localStorage.getItem('gameProgress');
    if (saved) {
        const gameState = JSON.parse(saved);
        const levelMap = document.querySelector('game-level-map');
        levelMap.setCurrentLevel(gameState.currentLevel);
        levelMap.setCompletedLevels(gameState.completedLevels);
    }
}
```

### Progressive Unlocking

```javascript
function completeCurrentLevel() {
    const levelMap = document.querySelector('game-level-map');
    const currentLevel = levelMap.getCurrentLevel();
    const completed = levelMap.getCompletedLevels();
    
    // Mark current level as completed
    completed.push(currentLevel);
    levelMap.setCompletedLevels(completed);
    
    // Unlock next level
    const totalLevels = parseInt(levelMap.getAttribute('levels'));
    if (currentLevel < totalLevels) {
        levelMap.setCurrentLevel(currentLevel + 1);
    } else {
        // Game completed!
        showGameCompletionMessage();
    }
}
```

## Accessibility

The component includes built-in accessibility features:

- **Keyboard Navigation**: Tab through levels and press Enter to select
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast**: Works well with high contrast mode
- **Focus Indicators**: Clear visual focus indicators

### Additional ARIA Support

```html
<game-level-map 
    levels="10" 
    current-level="5"
    aria-label="Game progress map"
    role="navigation">
</game-level-map>
```

## Performance

- **Lightweight**: Small footprint, minimal dependencies
- **Efficient Rendering**: SVG-based graphics for crisp visuals at any size
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Memory Efficient**: Minimal DOM manipulation

## Browser Support

- ✅ Chrome 54+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Edge 79+
- ✅ iOS Safari 10.3+
- ✅ Android Chrome 67+

## Troubleshooting

### Component Not Appearing
- Ensure the script is loaded before using the component
- Check browser console for any JavaScript errors
- Verify the component is properly registered

### Styles Not Applied
- The component uses Shadow DOM - external styles won't affect internal elements
- Use CSS custom properties for theming
- Check that the component has finished loading

### Events Not Firing
- Ensure event listeners are added after the component is connected to the DOM
- Use the `level-click` event, not generic click events
- Check that the event listener is properly attached

## License

MIT License - feel free to use in your projects!

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Made with ❤️ for the web gaming community