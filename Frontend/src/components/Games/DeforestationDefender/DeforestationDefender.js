// src/components/DeforestationDefender/DeforestationDefender.js

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './DeforestationDefender.css';

const DeforestationDefender = () => {
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
    let deforestations;
    let wildfires;
    let powerUps;
    let defenses;
    let score = 0;
    let level = 1;
    const maxLevels = 3;

    // Dummy data for educational pop-ups
    const dataInfo = {
      1: "Deforestation reduces biodiversity and disrupts carbon cycles, contributing to climate change.",
      2: "Wildfires resulting from deforestation release significant amounts of carbon dioxide into the atmosphere.",
      3: "Sustainable land use and reforestation are vital for maintaining healthy ecosystems and mitigating climate impacts.",
    };

    // Preload assets
    function preload() {
      this.load.image('background', '/DeforestationDefender/assets/background.png');
      this.load.image('researcher', '/DeforestationDefender/assets/researcher.png');
      this.load.image('deforestation', '/DeforestationDefender/assets/deforestation.png');
      this.load.image('wildfire', '/DeforestationDefender/assets/wildfire.png');
      this.load.image('conservation', '/DeforestationDefender/assets/conservation.png');
      this.load.image('firebreak', '/DeforestationDefender/assets/firebreak.png'); // Placeholder for defense
    }

    // Create game objects
    function create() {
      // Add background
      this.add.image(400, 300, 'background');

      // Create player
      player = this.physics.add.sprite(400, 550, 'researcher');
      player.setCollideWorldBounds(true);

      // Create defenses group
      defenses = this.physics.add.group();

      // Create deforestation group
      deforestations = this.physics.add.group();
      this.physics.add.collider(deforestations, defenses, handleDefense, null, this);
      this.physics.add.collider(deforestations, defenses, handleDefense, null, this);
      this.physics.add.collider(player, deforestations, hitDeforestation, null, this);

      // Create wildfires group
      wildfires = this.physics.add.group();
      this.physics.add.collider(wildfires, defenses, extinguishWildfire, null, this);
      this.physics.add.collider(player, wildfires, hitWildfire, null, this);

      // Create power-ups group
      powerUps = this.physics.add.group();
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this);

      // Input
      cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown_SPACE', placeDefense, this);

      // Spawn deforestations and wildfires
      spawnDeforestations.call(this, level);
      spawnWildfires.call(this, level);
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

    // Function to place defenses
    function placeDefense() {
      const defense = defenses.create(player.x, player.y - 50, 'firebreak');
      defense.setCollideWorldBounds(true);
      defense.setImmovable(true);
      score += 5; // Example score increment
      setPopup({ visible: true, message: "Defense Placed! Score +5." });

      // Update score display
      this.scoreText.setText(`Score: ${score}`);
    }

    // Function to spawn deforestations based on level
    function spawnDeforestations(currentLevel) {
      const deforestationCount = currentLevel * 3; // Increase count with level
      for (let i = 0; i < deforestationCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 500);
        const deforestation = deforestations.create(x, y, 'deforestation');
        deforestation.setScale(0.5);
        deforestation.setCollideWorldBounds(true);
        deforestation.setBounce(1);
        deforestation.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to spawn wildfires based on level
    function spawnWildfires(currentLevel) {
      const wildfireCount = currentLevel * 2; // Increase count with level
      for (let i = 0; i < wildfireCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 500);
        const wildfire = wildfires.create(x, y, 'wildfire');
        wildfire.setScale(0.5);
        wildfire.setCollideWorldBounds(true);
        wildfire.setBounce(1);
        wildfire.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to spawn power-ups based on level
    function spawnPowerUps(currentLevel) {
      const powerUpCount = currentLevel; // Increase count with level
      for (let i = 0; i < powerUpCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 500);
        const powerUp = powerUps.create(x, y, 'conservation');
        powerUp.setScale(0.5);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
        powerUp.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to handle collecting power-ups
    function collectPowerUp(player, powerUp) {
      powerUp.disableBody(true, true);
      score += 20; // Example boost
      setPopup({ visible: true, message: "Conservation Effort! Score +20." });

      // Update score display
      this.scoreText.setText(`Score: ${score}`);
    }

    // Function to handle collision with deforestation
    function hitDeforestation(player, deforestation) {
      this.physics.pause();
      player.setTint(0xff0000);
      setPopup({ visible: true, message: "Game Over! Deforestation occurred." });
      // Optionally, implement game over logic here
    }

    // Function to handle collision with wildfire
    function hitWildfire(player, wildfire) {
      this.physics.pause();
      player.setTint(0xff0000);
      setPopup({ visible: true, message: "Game Over! Wildfire spread." });
      // Optionally, implement game over logic here
    }

    // Function to handle defense and deforestation collision
    function handleDefense(deforestation, defense) {
      deforestation.disableBody(true, true);
      defense.disableBody(true, true);
      score += 10; // Example score increment
      setPopup({ visible: true, message: "Deforestation Blocked! Score +10." });

      // Update score display
      this.scoreText.setText(`Score: ${score}`);
    }

    // Function to extinguish wildfire with defense
    function extinguishWildfire(wildfire, defense) {
      wildfire.disableBody(true, true);
      defense.disableBody(true, true);
      score += 15; // Example score increment
      setPopup({ visible: true, message: "Wildfire Extinguished! Score +15." });

      // Update score display
      this.scoreText.setText(`Score: ${score}`);
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="deforestation-defender-container">
      <h2>Deforestation Defender</h2>
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

export default DeforestationDefender;
