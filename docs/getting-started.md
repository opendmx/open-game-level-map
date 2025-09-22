# Getting Started with Game Level Map

## Quick Installation

### Via npm
```bash
npm install open-game-level-map
```

### Via CDN
```html
<script type="module" src="https://unpkg.com/open-game-level-map/dist/game-level-map.js"></script>
```

### Direct Download
Download the files from the `dist/` folder and include them in your project.

## Basic Usage

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="path/to/game-level-map.js"></script>
</head>
<body>
    <!-- Basic usage -->
    <game-level-map 
        levels="10" 
        current-level="5" 
        completed-levels="4"
        theme="adventure">
    </game-level-map>
</body>
</html>
```

### With Custom Level Names
```html
<game-level-map 
    levels="6" 
    current-level="3" 
    completed-levels="2"
    theme="fantasy"
    layout="circular"
    level-names="Home,Forest,Cave,Mountain,Castle,Dragon"
    show-labels="true">
</game-level-map>
```

### JavaScript Interaction
```javascript
const levelMap = document.querySelector('game-level-map');

// Listen for level clicks
levelMap.addEventListener('level-click', (event) => {
    const { level } = event.detail;
    console.log(`Player clicked level ${level}`);
    
    // Load the selected level
    loadGameLevel(level);
});

// Update progress
function completeLevel(level) {
    levelMap.setProgress(level + 1, level);
}

// Change theme
function switchTheme(newTheme) {
    levelMap.setTheme(newTheme);
}
```

## Configuration Options

| Attribute | Default | Description |
|-----------|---------|-------------|
| `levels` | 10 | Total number of levels |
| `current-level` | 1 | Currently active level |
| `completed-levels` | 0 | Number of completed levels |
| `theme` | 'adventure' | Visual theme |
| `layout` | 'linear' | Map layout |
| `size` | 'medium' | Component size |

## Available Themes
- **adventure**: Earthy brown and gold
- **space**: Dark blue with cyan accents  
- **fantasy**: Purple and pink magical colors
- **retro**: Classic red and yellow

## Available Layouts
- **linear**: Straight line progression
- **circular**: Circular arrangement
- **branching**: Tree-like structure

## Next Steps
- Check out the [interactive demo](demo/index.html)
- Read the [full API documentation](docs/API.md)
- See [usage examples](docs/examples.md) for different frameworks

Happy gaming! 🎮