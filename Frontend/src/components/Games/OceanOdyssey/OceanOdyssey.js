// src/components/OceanOdyssey/OceanOdyssey.js

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './OceanOdyssey.css';

const OceanOdyssey = () => {
  const gameContainerRef = useRef(null);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  useEffect(() => {
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
    let cursors;
    let pollutants;
    let dataPoints;
    let powerUps;
    let score = 0;
    let level = 1;
    const maxLevels = 3;

    // Dummy data for educational pop-ups
    const dataInfo = {
      1: "Drought conditions have increased the severity of wildfires, making them harder to control.",
      2: "Wildfires release large amounts of smoke, degrading air quality and impacting public health.",
      3: "Effective resource management is crucial in preventing and managing wildfires.",
    };

    // Preload assets
    function preload() {
      this.load.image('background', '/OceanOdyssey/assets/background.png');
      this.load.image('researcher', '/OceanOdyssey/assets/researcher.png');
      this.load.image('pollution', '/OceanOdyssey/assets/pollution.png');
      this.load.image('data-point', '/OceanOdyssey/assets/data-point.png');
      this.load.image('conservation', '/OceanOdyssey/assets/conservation.png');
    }

    // Create game objects
    function create() {
      // Add background
      this.add.image(400, 300, 'background');

      // Create player
      player = this.physics.add.sprite(400, 500, 'researcher');
      player.setCollideWorldBounds(true);

      // Enable collision between player and pollutants
      pollutants = this.physics.add.group();
      this.physics.add.collider(player, pollutants, hitPollution, null, this);

      // Enable overlap between player and data points
      dataPoints = this.physics.add.group();
      this.physics.add.overlap(player, dataPoints, collectDataPoint, null, this);

      // Enable overlap between player and power-ups
      powerUps = this.physics.add.group();
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this);

      // Create data jets group
      // (Optional: If implementing data collection mechanics beyond overlap)
      
      // Input
      cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown_SPACE', shootDataPoint, this);

      // Spawn pollutants and power-ups
      spawnPollutants.call(this, level);
      spawnPowerUps.call(this, level);

      // Display score and level
      const scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
      const levelText = this.add.text(16, 40, 'Level: 1', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);

      // Store references for updating
      this.scoreText = scoreText;
      this.levelText = levelText;

      // Camera settings
      this.cameras.main.startFollow(player);
      this.cameras.main.setBounds(0, 0, 800, 600);
    }

    // Update loop
    function update() {
      if (cursors.left.isDown) {
        player.setVelocityX(-200);
      } else if (cursors.right.isDown) {
        player.setVelocityX(200);
      } else {
        player.setVelocityX(0);
      }

      if (cursors.up.isDown) {
        player.setVelocityY(-200);
      } else if (cursors.down.isDown) {
        player.setVelocityY(200);
      } else {
        player.setVelocityY(0);
      }
    }

    // Function to shoot data points (Optional)
    function shootDataPoint() {
      // Implement data collection mechanics if desired
      // For simplicity, this function can be left empty or used for other interactions
    }

    // Function to spawn pollutants based on level
    function spawnPollutants(currentLevel) {
      const pollutionCount = currentLevel * 5; // Increase pollution count with level
      for (let i = 0; i < pollutionCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        const pollutant = pollutants.create(x, y, 'pollution');
        pollutant.setScale(Phaser.Math.FloatBetween(0.5, 1.5));
        pollutant.setCollideWorldBounds(true);
        pollutant.setBounce(1);
        pollutant.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to spawn power-ups based on level
    function spawnPowerUps(currentLevel) {
      const powerUpCount = currentLevel; // Increase power-ups with level
      for (let i = 0; i < powerUpCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        const powerUp = powerUps.create(x, y, 'conservation');
        powerUp.setScale(0.5);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
        powerUp.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to handle collecting data points
    function collectDataPoint(playerObj, dataPoint) {
      dataPoint.disableBody(true, true);
      score += 10; // Example boost
      setPopup({ visible: true, message: "Marine Data Collected! Score +10." });

      // Update score display
      this.scoreText.setText(`Score: ${score}`);

      // Optionally, implement additional effects or level progression
    }

    // Function to handle collecting power-ups
    function collectPowerUp(player, powerUp) {
      powerUp.disableBody(true, true);
      score += 20; // Example boost
      setPopup({ visible: true, message: "Conservation Effort Boost! Score +20." });

      // Update score display
      this.scoreText.setText(`Score: ${score}`);

      // Optionally, implement power-up effects here
    }

    // Function to handle collision with pollutants
    function hitPollution(player, pollutant) {
      this.physics.pause();
      player.setTint(0xff0000);
      setPopup({ visible: true, message: "Game Over! Pollution affected marine life." });
      // Optionally, implement game over logic here
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="ocean-odyssey-container">
      <h2>Ocean Odyssey</h2>
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

export default OceanOdyssey;
