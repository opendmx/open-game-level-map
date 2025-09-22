# Usage Examples

This document provides practical examples of how to use the Game Level Map component in different scenarios.

## Basic Examples

### Simple Linear Progression

Perfect for platformer games with sequential levels:

```html
<game-level-map 
    levels="8" 
    current-level="3" 
    completed-levels="2"
    theme="adventure"
    layout="linear">
</game-level-map>
```

### Circular Hub World

Great for games with a central hub:

```html
<game-level-map 
    levels="6" 
    current-level="4" 
    completed-levels="3"
    theme="fantasy"
    layout="circular"
    show-labels="true">
</game-level-map>
```

## Advanced Examples

### RPG with Custom Level Names

```html
<game-level-map 
    levels="12" 
    current-level="7" 
    completed-levels="6"
    theme="fantasy"
    layout="branching"
    level-names="Village,Dark Forest,Haunted Cave,Snowy Mountain,Ancient Temple,Dragon's Lair,Sky Castle,Underground City,Wizard Tower,Crystal Cavern,Fire Realm,Final Boss"
    show-labels="true"
    size="large">
</game-level-map>
```

### Space Shooter Game

```html
<game-level-map 
    levels="10" 
    current-level="5" 
    completed-levels="4"
    theme="space"
    layout="linear"
    path-style="straight"
    level-names="Earth,Moon,Mars,Asteroid Belt,Jupiter,Saturn,Uranus,Neptune,Pluto,Deep Space"
    show-progress="true"
    animated="true">
</game-level-map>
```

### Retro Arcade Style

```html
<game-level-map 
    levels="20" 
    current-level="12" 
    completed-levels="11"
    theme="retro"
    layout="linear"
    path-style="zigzag"
    show-progress="true"
    size="medium">
</game-level-map>
```

## JavaScript Integration Examples

### React Component

```jsx
import React, { useEffect, useRef } from 'react';
import '../path/to/game-level-map.js';

function GameProgress({ gameState }) {
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setProgress(gameState.currentLevel, gameState.completedLevels);
        }
    }, [gameState]);

    const handleLevelClick = (event) => {
        const { level } = event.detail;
        console.log(`Player wants to go to level ${level}`);
        // Handle level selection logic
    };

    return (
        <game-level-map
            ref={mapRef}
            levels={gameState.totalLevels}
            theme="adventure"
            layout="linear"
            onLevel-click={handleLevelClick}
        />
    );
}
```

### Vue.js Component

```vue
<template>
    <game-level-map
        :levels="gameData.totalLevels"
        :current-level="gameData.currentLevel"
        :completed-levels="gameData.completedLevels"
        :theme="selectedTheme"
        layout="circular"
        @level-click="onLevelClick"
    />
</template>

<script>
import '../path/to/game-level-map.js';

export default {
    data() {
        return {
            gameData: {
                totalLevels: 15,
                currentLevel: 8,
                completedLevels: 7
            },
            selectedTheme: 'space'
        };
    },
    methods: {
        onLevelClick(event) {
            const { level } = event.detail;
            this.navigateToLevel(level);
        },
        navigateToLevel(level) {
            // Level navigation logic
            console.log(`Navigating to level ${level}`);
        }
    }
};
</script>
```

### Angular Component

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import '../path/to/game-level-map.js';

@Component({
    selector: 'app-game-progress',
    template: `
        <game-level-map
            #levelMap
            [attr.levels]="gameState.totalLevels"
            [attr.current-level]="gameState.currentLevel"
            [attr.completed-levels]="gameState.completedLevels"
            theme="fantasy"
            layout="branching"
            (level-click)="onLevelClick($event)">
        </game-level-map>
    `
})
export class GameProgressComponent implements AfterViewInit {
    @ViewChild('levelMap') levelMap!: ElementRef;

    gameState = {
        totalLevels: 12,
        currentLevel: 6,
        completedLevels: 5
    };

    ngAfterViewInit() {
        this.levelMap.nativeElement.addEventListener('level-click', this.onLevelClick.bind(this));
    }

    onLevelClick(event: CustomEvent) {
        const { level } = event.detail;
        console.log(`Level ${level} selected`);
    }
}
```

### Vanilla JavaScript

```javascript
// Dynamic level map creation
function createLevelMap(container, gameConfig) {
    const levelMap = document.createElement('game-level-map');
    
    levelMap.setAttribute('levels', gameConfig.totalLevels);
    levelMap.setAttribute('current-level', gameConfig.currentLevel);
    levelMap.setAttribute('completed-levels', gameConfig.completedLevels);
    levelMap.setAttribute('theme', gameConfig.theme);
    levelMap.setAttribute('layout', gameConfig.layout);
    
    if (gameConfig.levelNames) {
        levelMap.setAttribute('level-names', gameConfig.levelNames.join(','));
    }
    
    levelMap.addEventListener('level-click', (event) => {
        const { level } = event.detail;
        handleLevelSelection(level);
    });
    
    container.appendChild(levelMap);
    return levelMap;
}

// Usage
const gameConfig = {
    totalLevels: 10,
    currentLevel: 4,
    completedLevels: 3,
    theme: 'adventure',
    layout: 'linear',
    levelNames: ['Start', 'Forest', 'Cave', 'Mountain', 'Castle', 'Dungeon', 'Tower', 'Bridge', 'Final', 'Boss']
};

const container = document.getElementById('game-container');
const levelMap = createLevelMap(container, gameConfig);

function handleLevelSelection(level) {
    console.log(`Player selected level ${level}`);
    // Implement level loading logic
}

// Update progress dynamically
function updateProgress(newLevel, completed) {
    levelMap.setProgress(newLevel, completed);
}
```

## Game Integration Patterns

### Save/Load Game State

```javascript
// Save game state including level progress
function saveGameState() {
    const gameState = {
        currentLevel: levelMap.config.currentLevel,
        completedLevels: levelMap.config.completedLevels,
        totalLevels: levelMap.config.levels,
        theme: levelMap.config.theme
    };
    
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load game state and update level map
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        levelMap.setProgress(gameState.currentLevel, gameState.completedLevels);
        levelMap.setTheme(gameState.theme);
    }
}
```

### Achievement System Integration

```javascript
// Track achievements based on level completion
levelMap.addEventListener('level-click', (event) => {
    const { level } = event.detail;
    
    // Check if player can access this level
    if (level <= levelMap.config.completedLevels + 1) {
        loadLevel(level);
        
        // Check for achievements
        checkAchievements(level);
    } else {
        showLockedLevelMessage();
    }
});

function checkAchievements(level) {
    const achievements = [
        { id: 'first_level', condition: level === 1, name: 'First Steps' },
        { id: 'halfway', condition: level === Math.ceil(levelMap.config.levels / 2), name: 'Halfway There' },
        { id: 'final_level', condition: level === levelMap.config.levels, name: 'The End' }
    ];
    
    achievements.forEach(achievement => {
        if (achievement.condition && !hasAchievement(achievement.id)) {
            unlockAchievement(achievement);
        }
    });
}
```

### Difficulty Selection

```javascript
// Different maps for different difficulty levels
const difficultyMaps = {
    easy: {
        levels: 8,
        theme: 'adventure',
        layout: 'linear'
    },
    normal: {
        levels: 12,
        theme: 'fantasy',
        layout: 'branching'
    },
    hard: {
        levels: 20,
        theme: 'retro',
        layout: 'circular'
    }
};

function createDifficultySelector() {
    const container = document.getElementById('difficulty-container');
    
    Object.entries(difficultyMaps).forEach(([difficulty, config]) => {
        const mapElement = document.createElement('game-level-map');
        Object.entries(config).forEach(([key, value]) => {
            mapElement.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
        });
        
        mapElement.addEventListener('level-click', () => {
            startGameWithDifficulty(difficulty);
        });
        
        container.appendChild(mapElement);
    });
}
```

### Multiplayer Progress Comparison

```html
<!-- Show multiple players' progress -->
<div class="multiplayer-progress">
    <div class="player-progress">
        <h3>Player 1</h3>
        <game-level-map 
            levels="15" 
            current-level="8" 
            completed-levels="7"
            theme="adventure"
            size="small">
        </game-level-map>
    </div>
    
    <div class="player-progress">
        <h3>Player 2</h3>
        <game-level-map 
            levels="15" 
            current-level="12" 
            completed-levels="11"
            theme="space"
            size="small">
        </game-level-map>
    </div>
</div>
```

## Responsive Design Examples

### Mobile-First Approach

```css
.level-map-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    game-level-map {
        transform: scale(0.8);
        transform-origin: top center;
    }
}

@media (max-width: 480px) {
    game-level-map {
        transform: scale(0.6);
    }
}
```

### Grid Layout Integration

```css
.game-dashboard {
    display: grid;
    grid-template-areas: 
        "header header"
        "sidebar levelmap"
        "footer footer";
    grid-template-columns: 200px 1fr;
    gap: 20px;
}

.level-map-area {
    grid-area: levelmap;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

These examples should give you a comprehensive understanding of how to integrate the Game Level Map component into various projects and frameworks!