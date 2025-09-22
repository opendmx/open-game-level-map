# 🎮 Game Level Map

A reusable web component for game level progress visualization with comic-style graphics. Perfect for showing player progression through game levels in a visually appealing, interactive way.

![Game Level Map Demo](https://img.shields.io/badge/demo-live-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🎨 Multiple Themes**: Adventure, Space, Fantasy, and Retro styles
- **📐 Flexible Layouts**: Linear, circular, and branching map layouts
- **🎯 Interactive**: Click events on level markers
- **📱 Responsive**: Adapts to different screen sizes
- **⚙️ Highly Configurable**: Customize everything from colors to animations
- **🚀 Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS
- **♿ Accessible**: Built with web standards and accessibility in mind

## 🚀 Quick Start

### Installation

```bash
npm install open-game-level-map
```

Or include directly in your HTML:

```html
<script type="module" src="path/to/game-level-map.js"></script>
```

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="game-level-map.js"></script>
</head>
<body>
    <game-level-map 
        levels="10" 
        current-level="5" 
        completed-levels="4"
        theme="adventure">
    </game-level-map>
</body>
</html>
```

## 📖 API Documentation

### HTML Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `levels` | number | 10 | Total number of levels |
| `current-level` | number | 1 | Currently active level |
| `completed-levels` | number | 0 | Number of completed levels |
| `theme` | string | 'adventure' | Visual theme ('adventure', 'space', 'fantasy', 'retro') |
| `layout` | string | 'linear' | Map layout ('linear', 'circular', 'branching') |
| `path-style` | string | 'curved' | Path style ('curved', 'straight', 'zigzag') |
| `size` | string | 'medium' | Component size ('small', 'medium', 'large') |
| `show-labels` | boolean | true | Show level labels |
| `show-progress` | boolean | true | Show progress bar |
| `animated` | boolean | true | Enable animations |
| `level-names` | string | null | Comma-separated custom level names |

### JavaScript API

```javascript
const levelMap = document.querySelector('game-level-map');

// Update progress
levelMap.setProgress(5, 4); // currentLevel, completedLevels

// Set custom level names
levelMap.setLevelNames(['Home', 'Forest', 'Cave', 'Castle']);

// Change theme
levelMap.setTheme('space');

// Reset progress
levelMap.reset();
```

### Events

```javascript
levelMap.addEventListener('level-click', (event) => {
    const { level, marker } = event.detail;
    console.log(`Level ${level} clicked!`);
});
```

## 🎨 Themes

### Adventure Theme
- Earthy brown and gold colors
- Perfect for RPG and adventure games

### Space Theme  
- Dark blue with cyan accents
- Ideal for sci-fi and space games

### Fantasy Theme
- Purple and pink magical colors
- Great for fantasy and magic games

### Retro Theme
- Classic red and yellow
- Perfect for arcade-style games

## 📐 Layouts

### Linear Layout
Levels arranged in a straight or zigzag line, perfect for platformer games.

### Circular Layout
Levels arranged in a circle, great for showing cyclical progression.

### Branching Layout
Levels arranged in branches, ideal for games with multiple paths.

## 🎮 Usage Examples

### RPG Adventure Game

```html
<game-level-map 
    levels="12" 
    current-level="7" 
    completed-levels="6"
    theme="fantasy"
    layout="branching"
    level-names="Village,Forest,Cave,Mountain,Temple,Castle,Dungeon,Dragon,Tower,Portal,Heaven,Boss"
    show-labels="true">
</game-level-map>
```

### Space Shooter

```html
<game-level-map 
    levels="8" 
    current-level="4" 
    completed-levels="3"
    theme="space"
    layout="linear"
    path-style="straight"
    size="large">
</game-level-map>
```

### Puzzle Game

```html
<game-level-map 
    levels="50" 
    current-level="23" 
    completed-levels="22"
    theme="retro"
    layout="circular"
    show-progress="true"
    animated="true">
</game-level-map>
```

## 🛠️ Customization

### Custom Styling

You can override the default styles by targeting the component:

```css
game-level-map {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

### Adding New Themes

Extend the component by modifying the theme colors in the JavaScript:

```javascript
// Add to getThemeColors() method
custom: {
    background: '#yourBackgroundColor',
    path: '#yourPathColor',
    completed: '#yourCompletedColor',
    current: '#yourCurrentColor',
    locked: '#yourLockedColor',
    text: '#yourTextColor'
}
```

## 🔧 Development

### Build from Source

```bash
git clone https://github.com/opendmx/open-game-level-map.git
cd open-game-level-map
npm install
npm run dev
```

### Run Demo

```bash
npm run dev
# Navigate to /demo/index.html
```

### Build for Production

```bash
npm run build
```

## 📱 Browser Support

- Chrome 60+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic video game level select screens
- Built with modern web standards
- Designed for developers who love games

---

**Happy Gaming! 🎮**