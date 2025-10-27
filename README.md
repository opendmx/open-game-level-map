# 🎮 Game Level Map Component

A beautiful, reusable web component for displaying game level progress with comic-style graphics. Perfect for web games, educational apps, and any application that needs to show progress through a series of levels or steps.

![Game Level Map Demo](https://img.shields.io/badge/demo-live-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Comic-style Design**: Colorful, fun graphics with smooth animations
- 📱 **Responsive**: Works perfectly on all screen sizes  
- ⚙️ **Highly Configurable**: Customize levels, colors, sizes, and more
- 🎯 **Interactive**: Click events for level selection
- ✨ **Animated**: Eye-catching visual effects and transitions
- 🔧 **Easy Integration**: Simple HTML custom element
- 📊 **Progress Tracking**: Clear visual representation of game progress
- 🎮 **Game-Ready**: Designed for web games and educational applications

## 🚀 Quick Start

### 1. Include the Component
```html
<script src="src/game-level-map.js"></script>
```

### 2. Use in HTML
```html
<game-level-map 
    levels="10" 
    current-level="5" 
    completed-levels="1,2,3,4">
</game-level-map>
```

### 3. Try the Demo
```bash
# Clone the repository
git clone https://github.com/opendmx/open-game-level-map.git
cd open-game-level-map

# Run the demo (requires Python 3)
npm run demo
# or
python3 -m http.server 8000

# Open http://localhost:8000/demo in your browser
```

## 📖 Documentation

- **[Complete Documentation](docs/README.md)** - Detailed usage guide and API reference
- **[Live Demo](demo/index.html)** - Interactive examples and configuration
- **[Component Source](src/game-level-map.js)** - Main component code

## 🎯 Basic Examples

### Simple 5-Level Game
```html
<game-level-map levels="5" current-level="3" completed-levels="1,2"></game-level-map>
```

### Customized Adventure Game
```html
<game-level-map 
    levels="15" 
    current-level="8" 
    completed-levels="1,2,3,4,5,6,7"
    path-color="#FF6B6B" 
    marker-size="45">
</game-level-map>
```

### Tutorial Levels
```html
<game-level-map 
    levels="3" 
    current-level="1"
    path-color="#4ECDC4" 
    marker-size="50">
</game-level-map>
```

### Custom Level Shapes and Icons
```html
<game-level-map 
    levels="5" 
    current-level="3" 
    completed-levels="1,2"
    level-config='{
        "1": {"shape": "star", "icon": "🌟"},
        "2": {"shape": "square", "icon": "🌲"},
        "3": {"shape": "diamond", "icon": "⛰️"},
        "4": {"shape": "hexagon", "icon": "🏰"},
        "5": {"shape": "star", "icon": "👑"}
    }'>
</game-level-map>
```

## ⚙️ Configuration Options

### Global Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `levels` | number | 10 | Total number of levels |
| `current-level` | number | 1 | Currently active level |
| `completed-levels` | string | "" | Comma-separated completed levels |
| `path-color` | string | "#8B4513" | Path color |
| `marker-size` | number | 40 | Default marker size in pixels |
| `spacing` | number | 100 | Spacing between markers |
| `level-config` | JSON string | "" | Per-level customization (see below) |

### Per-Level Customization

Each level can be individually customized with the following options:

| Option | Type | Description |
|--------|------|-------------|
| `shape` | string | Shape of the marker: 'circle', 'square', 'diamond', 'hexagon', 'star' |
| `size` | number | Custom size for this level (overrides global marker-size) |
| `icon` | string | Custom icon or emoji to display instead of level number |
| `text` | string | Custom text to display instead of level number |
| `color` | string | Custom color for this level (overrides state color) |
| `animation` | string | Animation: 'bounce', 'spin', 'pulse-large', 'wiggle' |
| `onClick` | function | Custom click handler (JavaScript API only) |
| `hideCompletionStar` | boolean | Hide the completion star for this level |

## 🎮 JavaScript API

```javascript
const levelMap = document.querySelector('game-level-map');

// Set current level
levelMap.setCurrentLevel(7);

// Set completed levels
levelMap.setCompletedLevels([1, 2, 3, 4, 5, 6]);

// Set sections
levelMap.setSections([
    { name: 'Beginner', levels: '1-5', color: '#E8F5E9' },
    { name: 'Advanced', levels: '6-10', color: '#FFEBEE' }
]);

// Get current state
const currentLevel = levelMap.getCurrentLevel();
const completed = levelMap.getCompletedLevels();
const sections = levelMap.getSections();

// Configure individual levels
levelMap.setLevelConfig(1, {
    shape: 'star',
    icon: '🌟',
    size: 50,
    color: '#FFD700',
    animation: 'bounce',
    text: 'Start',
    onClick: (data) => {
        console.log('Level clicked:', data);
    }
});

// Configure multiple levels at once
levelMap.setLevelConfigs({
    1: { shape: 'circle', icon: '🏠' },
    2: { shape: 'square', icon: '🌲' },
    3: { shape: 'diamond', icon: '⛰️' },
    4: { shape: 'hexagon', icon: '🏰' },
    5: { shape: 'star', icon: '👑' }
});

// Get level configurations
const levelConfig = levelMap.getLevelConfig(1);
const allConfigs = levelMap.getLevelConfigs();

// Listen for level clicks
levelMap.addEventListener('level-click', (event) => {
    const { level, state, config } = event.detail;
    console.log(`Level ${level} clicked (${state})`);
});
```

## 📑 Sections Configuration

Sections allow you to group levels with visual labels and backgrounds. Each section can have:

- **name**: The label displayed for the section
- **levels**: Range of levels as a string (e.g., "1-5") or array (e.g., [1,2,3,4,5])
- **color**: Background color for the section (optional, defaults to "#f0f0f0")

### Example with Multiple Sections

```html
<game-level-map 
    levels="12" 
    current-level="5"
    completed-levels="1,2,3,4"
    sections='[
        {"name":"Tutorial","levels":"1-3","color":"#B3E5FC"},
        {"name":"Easy","levels":"4-7","color":"#C8E6C9"},
        {"name":"Hard","levels":"8-10","color":"#FFCCBC"},
        {"name":"Expert","levels":"11-12","color":"#F8BBD0"}
    ]'>
</game-level-map>
```

### JavaScript API for Sections

```javascript
// Set sections programmatically
const levelMap = document.querySelector('game-level-map');
levelMap.setSections([
    { name: 'Beginner', levels: '1-5', color: '#E8F5E9' },
    { name: 'Intermediate', levels: '6-10', color: '#FFF3E0' },
    { name: 'Advanced', levels: '11-15', color: '#FFEBEE' }
]);

// Get current sections
const sections = levelMap.getSections();
console.log('Current sections:', sections);
```

## 🌐 Browser Support

- ✅ Chrome 54+
- ✅ Firefox 63+  
- ✅ Safari 10.1+
- ✅ Edge 79+
- ✅ iOS Safari 10.3+
- ✅ Android Chrome 67+

## 📜 License

MIT License - feel free to use in your projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

Made with ❤️ for the web gaming community