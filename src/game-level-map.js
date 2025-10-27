/**
 * GameLevelMap - A reusable web component for displaying game level progress
 * with a comic-style path visualization
 */
class GameLevelMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Default configuration
    this._config = {
      levels: 10,
      currentLevel: 1,
      completedLevels: [],
      pathColor: '#8B4513',
      pathWidth: 8,
      markerSize: 40,
      spacing: 100,
      containerWidth: 800,
      containerHeight: 200,
      sections: [], // Array of section objects: {name, levels, color}
      colors: {
        locked: '#cccccc',
        current: '#FFD700',
        completed: '#32CD32',
        path: '#8B4513'
      }
    };
    
    // Per-level customizations
    this._levelConfigs = {};
  }

  static get observedAttributes() {
    return [
      'levels', 
      'current-level', 
      'completed-levels', 
      'path-color', 
      'marker-size',
      'spacing',
      'width',
      'height',
      'level-config'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateConfig(name, newValue);
      this.render();
    }
  }

  updateConfig(attributeName, value) {
    switch (attributeName) {
      case 'levels':
        this._config.levels = parseInt(value) || 10;
        break;
      case 'current-level':
        this._config.currentLevel = parseInt(value) || 1;
        break;
      case 'completed-levels':
        this._config.completedLevels = value ? value.split(',').map(n => parseInt(n.trim())) : [];
        break;
      case 'path-color':
        this._config.colors.path = value || '#8B4513';
        break;
      case 'marker-size':
        this._config.markerSize = parseInt(value) || 40;
        break;
      case 'spacing':
        this._config.spacing = parseInt(value) || 100;
        break;
      case 'width':
        this._config.containerWidth = parseInt(value) || 800;
        break;
      case 'height':
        this._config.containerHeight = parseInt(value) || 200;
        break;
      case 'level-config':
        try {
          this._levelConfigs = value ? JSON.parse(value) : {};
        } catch (e) {
          console.error('Invalid level-config JSON:', e);
          this._levelConfigs = {};
        }
        break;
    }
  }

  connectedCallback() {
    this.loadInitialConfig();
    this.render();
  }

  loadInitialConfig() {
    // Load configuration from attributes
    const attributes = this.constructor.observedAttributes;
    attributes.forEach(attr => {
      if (this.hasAttribute(attr)) {
        this.updateConfig(attr, this.getAttribute(attr));
      }
    });
  }

  parseSections(value) {
    if (!value) return [];
    
    try {
      const sections = JSON.parse(value);
      return sections.map(section => {
        // Parse levels - support both "1-5" string format and array [1,2,3,4,5]
        let levelArray = [];
        if (typeof section.levels === 'string' && section.levels.includes('-')) {
          const parts = section.levels.split('-').map(n => n.trim());
          if (parts.length === 2) {
            const start = parseInt(parts[0]);
            const end = parseInt(parts[1]);
            // Validate that both are valid numbers and start <= end
            if (!isNaN(start) && !isNaN(end) && start <= end) {
              for (let i = start; i <= end; i++) {
                levelArray.push(i);
              }
            }
          }
        } else if (Array.isArray(section.levels)) {
          levelArray = section.levels.map(l => parseInt(l)).filter(n => !isNaN(n));
        } else if (typeof section.levels === 'number') {
          levelArray = [section.levels];
        }
        
        return {
          name: section.name || '',
          levels: levelArray,
          color: section.color || '#f0f0f0'
        };
      });
    } catch (e) {
      console.error('Failed to parse sections:', e);
      return [];
    }
  }

  getSectionForLevel(level) {
    return this._config.sections.find(section => section.levels.includes(level));
  }

  createSectionBackgrounds(pathPoints) {
    const { sections, containerHeight, markerSize, spacing } = this._config;
    if (!sections || sections.length === 0) return '';
    
    let sectionsHTML = '';
    
    sections.forEach(section => {
      if (section.levels.length === 0) return;
      
      const minLevel = Math.min(...section.levels);
      const maxLevel = Math.max(...section.levels);
      
      // Calculate section bounds
      const minX = minLevel * spacing - spacing / 2;
      const maxX = maxLevel * spacing + spacing / 2;
      const width = maxX - minX;
      
      // Create section background rectangle
      const padding = 10;
      const sectionY = padding;
      const sectionHeight = containerHeight - padding * 2;
      
      sectionsHTML += `
        <g class="section-group">
          <!-- Section background -->
          <rect x="${minX}" y="${sectionY}" width="${width}" height="${sectionHeight}"
                fill="${section.color}" opacity="0.3" rx="15" class="section-background"/>
          <!-- Section border -->
          <rect x="${minX}" y="${sectionY}" width="${width}" height="${sectionHeight}"
                fill="none" stroke="${section.color}" stroke-width="2" 
                stroke-dasharray="5,5" rx="15" class="section-border"/>
          <!-- Section label -->
          <text x="${minX + width / 2}" y="${padding + 20}" 
                text-anchor="middle" class="section-label"
                fill="#333" font-weight="bold" font-size="16px">
            ${section.name}
          </text>
        </g>
      `;
    });
    
    return sectionsHTML;
  }

  generatePath() {
    const { levels, spacing, containerHeight, markerSize } = this._config;
    const pathPoints = [];
    const centerY = containerHeight / 2;
    
    for (let i = 0; i < levels; i++) {
      const x = (i + 1) * spacing;
      // Create a wavy path for comic effect
      const waveOffset = Math.sin(i * 0.8) * 20;
      const y = centerY + waveOffset;
      pathPoints.push({ x, y, level: i + 1 });
    }
    
    return pathPoints;
  }

  createSVGPath(points) {
    if (points.length < 2) return '';
    
    let pathData = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];
      
      // Create smooth curves for comic effect
      const controlPointX = (prevPoint.x + currentPoint.x) / 2;
      const controlPointY = (prevPoint.y + currentPoint.y) / 2;
      
      pathData += ` Q ${controlPointX} ${controlPointY} ${currentPoint.x} ${currentPoint.y}`;
    }
    
    return pathData;
  }

  getMarkerState(level) {
    if (this._config.completedLevels.includes(level)) {
      return 'completed';
    } else if (level === this._config.currentLevel) {
      return 'current';
    } else if (level < this._config.currentLevel) {
      return 'completed';
    } else {
      return 'locked';
    }
  }

  createMarker(point, state) {
    const levelConfig = this._levelConfigs[point.level] || {};
    const { markerSize, colors } = this._config;
    
    // Get level-specific settings or fall back to defaults
    const size = levelConfig.size || markerSize;
    const radius = size / 2;
    const shape = levelConfig.shape || 'circle';
    const icon = levelConfig.icon;
    const text = levelConfig.text !== undefined ? levelConfig.text : point.level;
    const color = levelConfig.color || colors[state];
    const animation = levelConfig.animation;
    
    // Create the shape based on configuration
    let shapeElement = '';
    switch (shape) {
      case 'square':
        shapeElement = this.createSquare(point.x, point.y, size, color);
        break;
      case 'star':
        shapeElement = this.createStarShape(point.x, point.y, size, color);
        break;
      case 'diamond':
        shapeElement = this.createDiamond(point.x, point.y, size, color);
        break;
      case 'hexagon':
        shapeElement = this.createHexagon(point.x, point.y, size, color);
        break;
      case 'circle':
      default:
        shapeElement = this.createCircle(point.x, point.y, radius, color);
        break;
    }
    
    // Apply custom animation class if specified
    const animationClass = animation ? `custom-animation-${animation}` : '';
    
    // Create comic-style marker
    const markerGroup = `
      <g class="level-marker ${animationClass}" data-level="${point.level}" data-state="${state}">
        <!-- Outer glow for comic effect -->
        <circle cx="${point.x}" cy="${point.y}" r="${radius + 3}" 
                fill="${color}" opacity="0.3" class="marker-glow"/>
        <!-- Main marker shape -->
        ${shapeElement}
        ${icon ? this.createIconContent(point.x, point.y, icon, size) : this.createTextContent(point.x, point.y, text, size)}
        <!-- Star for completed levels -->
        ${state === 'completed' && !levelConfig.hideCompletionStar ? this.createStar(point.x, point.y - radius - 10) : ''}
      </g>
    `;
    
    return markerGroup;
  }

  createCircle(x, y, radius, color) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" 
            fill="${color}" stroke="#333" stroke-width="3" class="marker-body"/>`;
  }

  createSquare(x, y, size, color) {
    const half = size / 2;
    return `<rect x="${x - half}" y="${y - half}" width="${size}" height="${size}" 
            fill="${color}" stroke="#333" stroke-width="3" class="marker-body" rx="5"/>`;
  }

  createDiamond(x, y, size, color) {
    const half = size / 2;
    const points = `${x},${y - half} ${x + half},${y} ${x},${y + half} ${x - half},${y}`;
    return `<polygon points="${points}" 
            fill="${color}" stroke="#333" stroke-width="3" class="marker-body"/>`;
  }

  createHexagon(x, y, size, color) {
    const radius = size / 2;
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      points.push(`${px},${py}`);
    }
    return `<polygon points="${points.join(' ')}" 
            fill="${color}" stroke="#333" stroke-width="3" class="marker-body"/>`;
  }

  createStarShape(x, y, size, color) {
    const outerRadius = size / 2;
    const innerRadius = size / 4;
    const points = [];
    for (let i = 0; i < 10; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / 5) * i - Math.PI / 2;
      const px = x + radius * Math.cos(angle);
      const py = y + radius * Math.sin(angle);
      points.push(`${px},${py}`);
    }
    return `<polygon points="${points.join(' ')}" 
            fill="${color}" stroke="#333" stroke-width="3" class="marker-body"/>`;
  }

  createIconContent(x, y, icon, size) {
    return `<text x="${x}" y="${y + size * 0.15}" text-anchor="middle" 
            class="level-icon" fill="#333" font-size="${size * 0.6}px">
      ${icon}
    </text>`;
  }

  createTextContent(x, y, text, size) {
    return `<text x="${x}" y="${y + 5}" text-anchor="middle" 
            class="level-text" fill="#333" font-weight="bold" font-size="${size * 0.4}px">
      ${text}
    </text>`;
  }

  createStar(x, y) {
    const size = 12;
    return `
      <polygon points="${x},${y-size} ${x+size*0.3},${y-size*0.3} ${x+size},${y-size*0.3} 
                       ${x+size*0.4},${y+size*0.2} ${x+size*0.6},${y+size} 
                       ${x},${y+size*0.4} ${x-size*0.6},${y+size} 
                       ${x-size*0.4},${y+size*0.2} ${x-size},${y-size*0.3} 
                       ${x-size*0.3},${y-size*0.3}"
               fill="#FFD700" stroke="#FFA500" stroke-width="1" class="completion-star"/>
    `;
  }

  render() {
    const { containerWidth, containerHeight, colors, pathWidth } = this._config;
    const pathPoints = this.generatePath();
    const svgPath = this.createSVGPath(pathPoints);
    const sectionsHTML = this.createSectionBackgrounds(pathPoints);
    
    // Calculate actual width needed
    const actualWidth = Math.max(containerWidth, (this._config.levels + 1) * this._config.spacing);
    
    const markersHTML = pathPoints.map(point => {
      const state = this.getMarkerState(point.level);
      return this.createMarker(point, state);
    }).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: ${actualWidth}px;
          margin: 20px auto;
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        
        .level-map-container {
          overflow-x: auto;
          padding: 20px;
          background: linear-gradient(135deg, #87CEEB 0%, #98FB98 100%);
          border-radius: 15px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          border: 3px solid #333;
        }
        
        .level-map-svg {
          display: block;
          margin: 0 auto;
        }
        
        .game-path {
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }
        
        .level-marker {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .level-marker:hover {
          transform: scale(1.1);
        }
        
        .marker-body {
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }
        
        .level-text {
          pointer-events: none;
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        
        .level-icon {
          pointer-events: none;
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
        
        .completion-star {
          animation: sparkle 2s infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        
        .marker-glow {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        /* Custom animations for level markers */
        .custom-animation-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .custom-animation-spin {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .custom-animation-pulse-large {
          animation: pulse-large 1.5s infinite;
        }
        
        @keyframes pulse-large {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        .custom-animation-wiggle {
          animation: wiggle 2s infinite;
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          :host {
            font-size: 14px;
          }
          .level-map-container {
            padding: 10px;
          }
        }
      </style>
      
      <div class="level-map-container">
        <svg class="level-map-svg" width="${actualWidth}" height="${containerHeight}" 
             viewBox="0 0 ${actualWidth} ${containerHeight}">
          <!-- Section backgrounds (rendered first, behind everything) -->
          ${sectionsHTML}
          
          <!-- Path -->
          <path d="${svgPath}" 
                stroke="${colors.path}" 
                stroke-width="${pathWidth}" 
                fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="game-path"/>
          
          <!-- Level markers -->
          ${markersHTML}
        </svg>
      </div>
    `;
    
    this.addEventListeners();
  }

  addEventListeners() {
    const markers = this.shadowRoot.querySelectorAll('.level-marker');
    markers.forEach(marker => {
      marker.addEventListener('click', (e) => {
        const level = parseInt(marker.dataset.level);
        const state = marker.dataset.state;
        const levelConfig = this._levelConfigs[level] || {};
        
        // If there's a custom click handler, execute it
        if (levelConfig.onClick && typeof levelConfig.onClick === 'function') {
          levelConfig.onClick({ level, state, event: e });
        }
        
        // Dispatch custom event
        this.dispatchEvent(new CustomEvent('level-click', {
          detail: { level, state, config: levelConfig },
          bubbles: true
        }));
      });
    });
  }

  // Public API methods
  setCurrentLevel(level) {
    this._config.currentLevel = level;
    this.setAttribute('current-level', level);
  }

  setCompletedLevels(levels) {
    this._config.completedLevels = levels;
    this.setAttribute('completed-levels', levels.join(','));
  }

  getCurrentLevel() {
    return this._config.currentLevel;
  }

  getCompletedLevels() {
    return [...this._config.completedLevels];
  }
  
  // New methods for per-level configuration
  setLevelConfig(level, config) {
    this._levelConfigs[level] = config;
    this.render();
  }
  
  getLevelConfig(level) {
    return this._levelConfigs[level] || null;
  }
  
  setLevelConfigs(configs) {
    this._levelConfigs = configs;
    this.setAttribute('level-config', JSON.stringify(configs));
  }
  
  getLevelConfigs() {
    return { ...this._levelConfigs };
  }
}

// Register the custom element
customElements.define('game-level-map', GameLevelMap);

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameLevelMap;
}