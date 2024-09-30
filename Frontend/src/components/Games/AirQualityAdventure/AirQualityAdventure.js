// src/components/AirQualityAdventure/AirQualityAdventure.js

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './AirQualityAdventure.css';

const AirQualityAdventure = () => {
  const gameContainerRef = useRef(null);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  useEffect(() => {
    // Initialize score and health
    let score = 0;
    let health = 100;
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
    let cursors;
    let cleanAirs;
    let pollutants;
    let powerUps;
    let scoreText;
    let healthText;
    let levelText;

    // Dummy data for educational pop-ups
    const dataInfo = {
      1: "Industrial activities and vehicular emissions are major contributors to air pollution, impacting public health.",
      2: "Adopting renewable energy sources like wind turbines and solar panels can significantly reduce air pollution.",
      3: "Improving air quality enhances overall public health and contributes to a sustainable environment.",
    };

    // Preload assets
    function preload() {
      this.load.image('background', '/AirQualityAdventure/assets/background.png');
      this.load.image('character', '/AirQualityAdventure/assets/character.png');
      this.load.image('cleanAir', '/AirQualityAdventure/assets/clean-air.png');
      this.load.image('factory', '/AirQualityAdventure/assets/factory.png');
      this.load.image('vehicle', '/AirQualityAdventure/assets/vehicle.png');
      this.load.image('windTurbine', '/AirQualityAdventure/assets/wind-turbine.png');
      this.load.image('solarPanel', '/AirQualityAdventure/assets/solar-panel.png');
    }

    // Create game objects
    function create() {
      // Add background
      this.add.image(400, 300, 'background');

      // Create player
      player = this.physics.add.sprite(100, 300, 'character');
      player.setCollideWorldBounds(true);

      // Create groups
      cleanAirs = this.physics.add.group({
        key: 'cleanAir',
        repeat: 5,
        setXY: { x: 150, y: 100, stepX: 100 },
      });

      pollutants = this.physics.add.group({
        key: ['factory', 'vehicle'],
        repeat: 5,
        setXY: { x: 150, y: 500, stepX: 100 },
      });

      powerUps = this.physics.add.group({
        key: ['windTurbine', 'solarPanel'],
        repeat: 2,
        setXY: { x: 200, y: 200, stepX: 200 },
      });

      // Enable collision between player and cleanAirs
      this.physics.add.overlap(player, cleanAirs, collectCleanAir, null, this);

      // Enable collision between player and pollutants
      this.physics.add.overlap(player, pollutants, hitPollutant, null, this);

      // Enable collision between player and powerUps
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this);

      // Input
      cursors = this.input.keyboard.createCursorKeys();

      // Display score, health, and level
      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
      healthText = this.add.text(16, 40, 'Health: 100', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
      levelText = this.add.text(16, 64, 'Level: 1', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);

      // Store references for updating
      this.scoreText = scoreText;
      this.healthText = healthText;
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

      // Increase difficulty based on level
      if (score > currentLevel * 100) {
        currentLevel += 1;
        this.levelText.setText(`Level: ${currentLevel}`);
        spawnPollutants.call(this, currentLevel);
        spawnPowerUps.call(this, currentLevel);
      }
    }

    // Function to collect clean air tokens
    function collectCleanAir(playerObj, cleanAir) {
      cleanAir.disableBody(true, true);
      score += 10;
      setPopup({ visible: true, message: "Clean Air Collected! Score +10." });

      // Update score display
      if (this.scoreText) {
        this.scoreText.setText(`Score: ${score}`);
      }
    }

    // Function to collect power-ups
    function collectPowerUp(playerObj, powerUp) {
      powerUp.disableBody(true, true);
      const increment = 20;
      score += increment;
      setPopup({ visible: true, message: "Green Energy Activated! Score +20." });

      // Update score display
      if (this.scoreText) {
        this.scoreText.setText(`Score: ${score}`);
      }

      // Implement power-up effects (e.g., reduce pollution)
      // For demonstration, we'll just increase the score
    }

    // Function to handle hitting pollutants
    function hitPollutant(playerObj, pollutant) {
      pollutant.disableBody(true, true);
      health -= 20;
      setPopup({ visible: true, message: "Pollution Hit! Health -20." });

      // Update health display
      if (this.healthText) {
        this.healthText.setText(`Health: ${health}`);
      }

      // Check for game over
      if (health <= 0) {
        this.physics.pause();
        player.setTint(0xff0000);
        setPopup({ visible: true, message: "Game Over! Poor Air Quality." });
      }
    }

    // Function to spawn additional pollutants based on level
    function spawnPollutants(currentLevel) {
      const pollutantCount = currentLevel * 2; // Increase with level
      for (let i = 0; i < pollutantCount; i++) {
        const type = Phaser.Utils.Array.GetRandom(['factory', 'vehicle']);
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        const pollutant = pollutants.create(x, y, type);
        pollutant.setScale(0.5);
        pollutant.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to spawn additional power-ups based on level
    function spawnPowerUps(currentLevel) {
      const powerUpCount = Math.floor(currentLevel / 2); // Adjust as needed
      for (let i = 0; i < powerUpCount; i++) {
        const type = Phaser.Utils.Array.GetRandom(['windTurbine', 'solarPanel']);
        const x = Phaser.Math.Between(100, 700);
        const y = Phaser.Math.Between(100, 500);
        const powerUp = powerUps.create(x, y, type);
        powerUp.setScale(0.5);
      }
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="air-quality-adventure-container">
      <h2>Air Quality Adventure</h2>
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

export default AirQualityAdventure;
