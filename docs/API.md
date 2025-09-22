# API Documentation

## Component Properties

### Configuration Object

The component uses an internal configuration object that can be modified through attributes or JavaScript methods:

```javascript
{
  levels: 10,              // Total number of levels
  currentLevel: 1,         // Currently active level
  completedLevels: 0,      // Number of completed levels
  layout: 'linear',        // Layout type: 'linear', 'branching', 'circular'
  theme: 'adventure',      // Theme: 'adventure', 'space', 'fantasy', 'retro'
  showLabels: true,        // Show level labels
  showProgress: true,      // Show progress bar
  animated: true,          // Enable animations
  levelNames: null,        // Array of custom level names
  pathStyle: 'curved',     // Path style: 'straight', 'curved', 'zigzag'
  size: 'medium'          // Size: 'small', 'medium', 'large'
}
```

## HTML Attributes

All configuration properties can be set via HTML attributes using kebab-case:

```html
<game-level-map 
    levels="15"
    current-level="8"
    completed-levels="7"
    layout="circular"
    theme="space"
    show-labels="true"
    show-progress="true"
    animated="true"
    level-names="Start,Forest,Cave,Mountain,Castle"
    path-style="curved"
    size="large">
</game-level-map>
```

## JavaScript Methods

### setProgress(currentLevel, completedLevels)

Updates the progress state of the map.

```javascript
const levelMap = document.querySelector('game-level-map');
levelMap.setProgress(5, 4); // Set current level to 5, completed levels to 4
```

**Parameters:**
- `currentLevel` (number): The level that should be highlighted as current
- `completedLevels` (number, optional): Number of completed levels

### setLevelNames(names)

Sets custom names for the levels.

```javascript
levelMap.setLevelNames(['Home', 'Forest', 'Cave', 'Mountain', 'Castle']);
```

**Parameters:**
- `names` (Array<string>): Array of level names

### setTheme(theme)

Changes the visual theme of the component.

```javascript
levelMap.setTheme('space');
```

**Parameters:**
- `theme` (string): One of 'adventure', 'space', 'fantasy', 'retro'

### reset()

Resets the progress to the beginning.

```javascript
levelMap.reset(); // Sets currentLevel to 1, completedLevels to 0
```

## Events

### level-click

Fired when a level marker is clicked.

```javascript
levelMap.addEventListener('level-click', (event) => {
    const { level, marker } = event.detail;
    console.log(`Level ${level} clicked!`);
    console.log('Marker element:', marker);
});
```

**Event Detail:**
- `level` (number): The level number that was clicked
- `marker` (HTMLElement): The marker element that was clicked

## Theme Customization

### Built-in Themes

#### Adventure Theme
```javascript
{
    background: '#8B4513',  // Saddle brown
    path: '#DEB887',        // Burlywood
    completed: '#32CD32',   // Lime green
    current: '#FFD700',     // Gold
    locked: '#696969',      // Dim gray
    text: '#FFFFFF'         // White
}
```

#### Space Theme
```javascript
{
    background: '#000033',  // Dark blue
    path: '#4169E1',        // Royal blue
    completed: '#00FFFF',   // Cyan
    current: '#FF69B4',     // Hot pink
    locked: '#2F4F4F',      // Dark slate gray
    text: '#FFFFFF'         // White
}
```

#### Fantasy Theme
```javascript
{
    background: '#2F1B69',  // Dark slate blue
    path: '#9370DB',        // Medium purple
    completed: '#FF1493',   // Deep pink
    current: '#FFD700',     // Gold
    locked: '#483D8B',      // Dark slate blue
    text: '#FFFFFF'         // White
}
```

#### Retro Theme
```javascript
{
    background: '#8B0000',  // Dark red
    path: '#FF6347',        // Tomato
    completed: '#00FF00',   // Lime
    current: '#FFFF00',     // Yellow
    locked: '#CD5C5C',      // Indian red
    text: '#FFFFFF'         // White
}
```

## Layout Types

### Linear Layout
- Arranges levels in a straight line
- Supports zigzag path style for visual interest
- Best for: Platformer games, sequential progression

### Circular Layout
- Arranges levels in a circle
- Good for showing cyclical or hub-based progression
- Best for: Strategy games, hub worlds

### Branching Layout
- Creates a tree-like structure with multiple paths
- Levels are arranged in branches
- Best for: RPGs with choices, skill trees

## Path Styles

### Curved
- Smooth curves between level markers
- Most visually appealing
- Default style

### Straight
- Direct lines between markers
- Clean and minimal look
- Good for technical/sci-fi themes

### Zigzag
- Alternating up/down pattern
- Fun and playful appearance
- Works well with linear layout

## Size Options

### Small
- 400px × 200px
- 20px markers
- Good for sidebars or compact layouts

### Medium (Default)
- 600px × 300px
- 30px markers
- Balanced size for most use cases

### Large
- 800px × 400px
- 40px markers
- Great for feature displays or full-width layouts

## Responsive Behavior

The component automatically adapts to smaller screens:
- Maintains aspect ratio
- Scales down proportionally
- Touch-friendly on mobile devices

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast color options
- Focus indicators

## Performance Considerations

- Uses CSS transforms for animations
- Minimal DOM manipulation
- Efficient SVG path rendering
- Lazy event listener attachment