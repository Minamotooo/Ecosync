// src/components/WaterCycleQuest/WaterCycleQuest.js

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './WaterCycleQuest.css';

const WaterCycleQuest = () => {
  const gameContainerRef = useRef(null);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  useEffect(() => {
    // Initialize score and level
    let score = 0;
    let currentLevel = 1;

    // Phaser Game Configuration
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainerRef.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    // Initialize the game
    const game = new Phaser.Game(config);

    let player;
    let waterFlows;
    let regions;
    let powerUps;
    let challenges;
    let scoreText;
    let levelText;

    // Dummy data for educational pop-ups
    const dataInfo = {
      1: "Proper water management ensures balanced ecosystems and supports agricultural productivity.",
      2: "Droughts can severely impact water availability, leading to reduced crop yields and ecosystem stress.",
      3: "Sustainable practices restore the water cycle, enhancing resource availability and ecosystem health.",
    };

    // Preload assets
    function preload() {
      this.load.image('background', '/WaterCycleQuest/assets/background.png');
      this.load.image('waterFlow', '/WaterCycleQuest/assets/water-flow.png');
      this.load.image('farm', '/WaterCycleQuest/assets/farm.png');
      this.load.image('city', '/WaterCycleQuest/assets/city.png');
      this.load.image('forest', '/WaterCycleQuest/assets/forest.png');
      this.load.image('powerUp', '/WaterCycleQuest/assets/power-up.png');
      this.load.image('drought', '/WaterCycleQuest/assets/drought.png');
      this.load.image('flood', '/WaterCycleQuest/assets/flood.png');
      this.load.image('pollution', '/WaterCycleQuest/assets/pollution.png');
    }

    // Create game objects
    function create() {
      // Add background
      this.add.image(400, 300, 'background');

      // Create player
      player = this.physics.add.sprite(400, 550, 'waterFlow');
      player.setCollideWorldBounds(true);
      player.setInteractive();
      this.input.setDraggable(player);

      // Create regions group
      regions = this.physics.add.group();
      createRegions.call(this, currentLevel);

      // Create power-ups group
      powerUps = this.physics.add.group();
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this);

      // Create challenges group
      challenges = this.physics.add.group();
      this.physics.add.overlap(player, challenges, handleChallenge, null, this);

      // Input handlers for dragging
      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });

      // Spawn power-ups and challenges
      spawnPowerUps.call(this, currentLevel);
      spawnChallenges.call(this, currentLevel);

      // Display score and level
      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
      levelText = this.add.text(16, 40, `Level: ${currentLevel}`, { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);

      // Store references for updating
      this.scoreText = scoreText;
      this.levelText = levelText;

      // Initialize cursors and attach to scene
      this.cursors = this.input.keyboard.createCursorKeys();

      // Camera settings
      this.cameras.main.startFollow(player);
      this.cameras.main.setBounds(0, 0, 800, 600);
    }

    // Update loop
    function update() {
      if (this.cursors.left.isDown) {
        player.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        player.setVelocityX(200);
      } else {
        player.setVelocityX(0);
      }

      if (this.cursors.up.isDown) {
        player.setVelocityY(-200);
      } else if (this.cursors.down.isDown) {
        player.setVelocityY(200);
      } else {
        player.setVelocityY(0);
      }
    }

    // Function to create regions based on level
    function createRegions(currentLevel) {
      // Example: Create farms, cities, and forests
      this.add.image(200, 300, 'farm').setInteractive();
      this.add.image(400, 300, 'city').setInteractive();
      this.add.image(600, 300, 'forest').setInteractive();
    }

    // Function to spawn power-ups based on level
    function spawnPowerUps(currentLevel) {
      const powerUpCount = currentLevel;
      for (let i = 0; i < powerUpCount; i++) {
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 500);
        const powerUp = powerUps.create(x, y, 'powerUp');
        powerUp.setScale(0.5);
      }
    }

    // Function to spawn challenges based on level
    function spawnChallenges(currentLevel) {
      const challengeTypes = ['drought', 'flood', 'pollution'];
      const challengeCount = currentLevel * 2;

      for (let i = 0; i < challengeCount; i++) {
        const type = Phaser.Utils.Array.GetRandom(challengeTypes);
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 500);
        const challenge = challenges.create(x, y, type);
        challenge.setScale(0.5);
      }
    }

    // Function to handle collecting power-ups
    function collectPowerUp(playerObj, powerUp) {
      powerUp.disableBody(true, true);
      const increment = 10;
      score += increment;
      setPopup({ visible: true, message: `Water Management Improved! Score +${increment}.` });

      // Update score display
      if (this.scoreText) {
        this.scoreText.setText(`Score: ${score}`);
      }
    }

    // Function to handle challenges
    function handleChallenge(playerObj, challenge) {
      const type = challenge.texture.key;
      if (type === 'drought') {
        setPopup({ visible: true, message: 'Drought Occurred! Water availability decreased.' });
      } else if (type === 'flood') {
        setPopup({ visible: true, message: 'Flood Occurred! Water overflowed areas.' });
      } else if (type === 'pollution') {
        setPopup({ visible: true, message: 'Pollution Detected! Water quality deteriorated.' });
      }
      // Implement additional effects based on challenge type
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="water-cycle-quest-container">
      <h2>Water Cycle Quest</h2>
      <div ref={gameContainerRef} className="game-container"></div>

      {popup.visible && (
        <div className="popup">
          <div className="popup-content">
            <p>{popup.message}</p>
            <button onClick={() => setPopup({ visible: false, message: '' })}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaterCycleQuest;
