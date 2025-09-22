/**
 * GameLevelMap - A reusable web component for game level progress visualization
 * 
 * Features:
 * - Comic-style visual design
 * - Configurable number of levels
 * - Multiple layout options (linear, branching, circular)
 * - Progress tracking (locked, current, completed)
 * - Customizable styling and themes
 * - Responsive design
 */
class GameLevelMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Default configuration
    this.config = {
      levels: 10,
      currentLevel: 1,
      completedLevels: 0,
      layout: 'linear', // linear, branching, circular
      theme: 'adventure', // adventure, space, fantasy, retro
      showLabels: true,
      showProgress: true,
      animated: true,
      levelNames: null, // array of custom level names
      pathStyle: 'curved', // straight, curved, zigzag
      size: 'medium' // small, medium, large
    };
    
    this.render();
  }

  static get observedAttributes() {
    return [
      'levels', 'current-level', 'completed-levels', 'layout', 
      'theme', 'show-labels', 'show-progress', 'animated',
      'level-names', 'path-style', 'size'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateConfig(name, newValue);
      this.render();
    }
  }

  updateConfig(attributeName, value) {
    const key = attributeName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    switch (key) {
      case 'levels':
      case 'currentLevel':
      case 'completedLevels':
        this.config[key] = parseInt(value) || this.config[key];
        break;
      case 'showLabels':
      case 'showProgress':
      case 'animated':
        this.config[key] = value === 'true';
        break;
      case 'levelNames':
        this.config[key] = value ? value.split(',').map(name => name.trim()) : null;
        break;
      default:
        this.config[key] = value;
    }
  }

  connectedCallback() {
    this.render();
  }

  getThemeColors() {
    const themes = {
      adventure: {
        background: '#8B4513',
        path: '#DEB887',
        completed: '#32CD32',
        current: '#FFD700',
        locked: '#696969',
        text: '#FFFFFF'
      },
      space: {
        background: '#000033',
        path: '#4169E1',
        completed: '#00FFFF',
        current: '#FF69B4',
        locked: '#2F4F4F',
        text: '#FFFFFF'
      },
      fantasy: {
        background: '#2F1B69',
        path: '#9370DB',
        completed: '#FF1493',
        current: '#FFD700',
        locked: '#483D8B',
        text: '#FFFFFF'
      },
      retro: {
        background: '#8B0000',
        path: '#FF6347',
        completed: '#00FF00',
        current: '#FFFF00',
        locked: '#CD5C5C',
        text: '#FFFFFF'
      }
    };
    return themes[this.config.theme] || themes.adventure;
  }

  generatePath() {
    const { levels, layout, pathStyle } = this.config;
    const points = [];
    
    if (layout === 'linear') {
      for (let i = 0; i < levels; i++) {
        const x = (i / (levels - 1)) * 80 + 10;
        const y = pathStyle === 'zigzag' ? (i % 2 === 0 ? 30 : 70) : 50;
        points.push({ x, y, level: i + 1 });
      }
    } else if (layout === 'circular') {
      const centerX = 50;
      const centerY = 50;
      const radius = 35;
      
      for (let i = 0; i < levels; i++) {
        const angle = (i / levels) * 2 * Math.PI - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push({ x, y, level: i + 1 });
      }
    } else if (layout === 'branching') {
      // Create a branching path structure
      const branches = Math.ceil(levels / 3);
      let levelIndex = 1;
      
      for (let branch = 0; branch < branches && levelIndex <= levels; branch++) {
        const levelsInBranch = Math.min(3, levels - levelIndex + 1);
        for (let i = 0; i < levelsInBranch; i++) {
          const x = branches > 1 ? (branch / (branches - 1)) * 60 + 20 : 50;
          const y = levelsInBranch > 1 ? (i / (levelsInBranch - 1)) * 40 + 30 : 50;
          points.push({ x, y, level: levelIndex });
          levelIndex++;
        }
      }
    }
    
    return points;
  }

  createPathSVG(points) {
    const { pathStyle } = this.config;
    
    if (points.length < 2) {
      return points.length === 1 ? `M ${points[0].x} ${points[0].y}` : '';
    }
    
    let pathData = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const previous = points[i - 1];
      
      if (pathStyle === 'curved' && i < points.length - 1) {
        const next = points[i + 1];
        const cpX = (previous.x + current.x) / 2;
        const cpY = (previous.y + current.y) / 2;
        pathData += ` Q ${cpX} ${cpY} ${current.x} ${current.y}`;
      } else {
        pathData += ` L ${current.x} ${current.y}`;
      }
    }
    
    return pathData;
  }

  createLevelMarker(point, index) {
    const { currentLevel, completedLevels, levelNames, showLabels, animated } = this.config;
    const colors = this.getThemeColors();
    const level = index + 1;
    
    let state = 'locked';
    let color = colors.locked;
    
    if (level <= completedLevels) {
      state = 'completed';
      color = colors.completed;
    } else if (level === currentLevel) {
      state = 'current';
      color = colors.current;
    }
    
    const labelText = levelNames && levelNames[index] ? levelNames[index] : level.toString();
    const animationClass = animated ? 'animated' : '';
    
    return `
      <div class="level-marker ${state} ${animationClass}" 
           style="left: ${point.x}%; top: ${point.y}%;"
           data-level="${level}">
        <div class="marker-circle" style="background-color: ${color};">
          <span class="marker-number">${level}</span>
        </div>
        ${showLabels ? `<div class="marker-label">${labelText}</div>` : ''}
        ${state === 'current' ? '<div class="pulse-ring"></div>' : ''}
        ${state === 'completed' ? '<div class="checkmark">✓</div>' : ''}
      </div>
    `;
  }

  getStyles() {
    const colors = this.getThemeColors();
    const { size, animated } = this.config;
    
    const sizeMap = {
      small: { width: '400px', height: '200px', marker: '20px' },
      medium: { width: '600px', height: '300px', marker: '30px' },
      large: { width: '800px', height: '400px', marker: '40px' }
    };
    
    const dimensions = sizeMap[size] || sizeMap.medium;
    
    return `
      <style>
        :host {
          display: block;
          width: ${dimensions.width};
          height: ${dimensions.height};
          font-family: 'Comic Sans MS', cursive, sans-serif;
          background: linear-gradient(135deg, ${colors.background}DD, ${colors.background}AA);
          border-radius: 15px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0,0,0,0.3);
          border: 3px solid ${colors.path};
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent);
        }

        .path-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .path-line {
          fill: none;
          stroke: ${colors.path};
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
        }

        .level-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 2;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .level-marker:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }

        .marker-circle {
          width: ${dimensions.marker};
          height: ${dimensions.marker};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #FFF;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          position: relative;
        }

        .marker-number {
          color: ${colors.text};
          font-weight: bold;
          font-size: ${parseInt(dimensions.marker) * 0.4}px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .marker-label {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 5px;
          color: ${colors.text};
          font-size: 12px;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
          white-space: nowrap;
        }

        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${parseInt(dimensions.marker) + 20}px;
          height: ${parseInt(dimensions.marker) + 20}px;
          border: 2px solid ${colors.current};
          border-radius: 50%;
          ${animated ? 'animation: pulse 2s infinite;' : ''}
        }

        .checkmark {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 16px;
          height: 16px;
          background: ${colors.completed};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: bold;
        }

        .level-marker.animated.current .marker-circle {
          animation: bounce 1s infinite alternate;
        }

        .level-marker.locked {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .level-marker.locked:hover {
          transform: translate(-50%, -50%) scale(1);
        }

        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
        }

        @keyframes bounce {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-5px); }
        }

        .progress-bar {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          height: 20px;
          background: rgba(0,0,0,0.3);
          border-radius: 10px;
          overflow: hidden;
          z-index: 3;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, ${colors.completed}, ${colors.current});
          border-radius: 10px;
          transition: width 0.5s ease;
          position: relative;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: ${colors.text};
          font-size: 12px;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        }
      </style>
    `;
  }

  render() {
    const points = this.generatePath();
    const pathData = this.createPathSVG(points);
    const colors = this.getThemeColors();
    const { levels, completedLevels, showProgress } = this.config;
    
    const progressPercentage = (completedLevels / levels) * 100;
    
    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="map-container">
        <svg class="path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path class="path-line" d="${pathData}" />
        </svg>
        
        ${points.map((point, index) => this.createLevelMarker(point, index)).join('')}
        
        ${showProgress ? `
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%">
              <div class="progress-text">${completedLevels}/${levels}</div>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Add event listeners for level markers
    this.shadowRoot.querySelectorAll('.level-marker').forEach(marker => {
      marker.addEventListener('click', (e) => {
        const level = parseInt(marker.dataset.level);
        this.dispatchEvent(new CustomEvent('level-click', {
          detail: { level, marker },
          bubbles: true
        }));
      });
    });
  }

  // Public API methods
  setProgress(currentLevel, completedLevels = null) {
    this.config.currentLevel = currentLevel;
    if (completedLevels !== null) {
      this.config.completedLevels = completedLevels;
    }
    this.render();
  }

  setLevelNames(names) {
    this.config.levelNames = names;
    this.render();
  }

  setTheme(theme) {
    this.config.theme = theme;
    this.render();
  }

  reset() {
    this.config.currentLevel = 1;
    this.config.completedLevels = 0;
    this.render();
  }
}

// Register the custom element
customElements.define('game-level-map', GameLevelMap);

export default GameLevelMap;