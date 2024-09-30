// src/components/WildfireWarrior/WildfireWarrior.js

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './WildfireWarrior.css';

const WildfireWarrior = () => {
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
    let fires;
    let waterJets;
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
      this.load.image('background', '/WildfireWarrior/assets/background.png');
      this.load.image('firefighter', '/WildfireWarrior/assets/firefighter.png');
      this.load.image('fire', '/WildfireWarrior/assets/fire.png');
      this.load.image('waterJet', '/WildfireWarrior/assets/water-jet.png');
      this.load.image('cleanAir', '/WildfireWarrior/assets/clean-air.png');
    }

    // Create game objects
    function create() {
      // Add background
      this.add.image(400, 300, 'background');

      // Create player
      player = this.physics.add.sprite(400, 500, 'firefighter');
      player.setCollideWorldBounds(true);

      // Enable collision between player and fires
      fires = this.physics.add.group();
      this.physics.add.collider(player, fires, hitFire, null, this);

      // Enable collision between player and power-ups
      powerUps = this.physics.add.group();
      this.physics.add.overlap(player, powerUps, collectPowerUp, null, this);

      // Create water jets group
      waterJets = this.physics.add.group();
      this.physics.add.collider(waterJets, fires, extinguishFire, null, this);
      this.physics.add.collider(waterJets, waterJets);

      // Input
      cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown_SPACE', shootWaterJet, this);

      // Spawn fires and power-ups
      spawnFires.call(this, level);
      spawnPowerUps.call(this, level);

      // Display score and level
      this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
      this.add.text(16, 40, 'Level: 1', { fontSize: '20px', fill: '#fff' }).setScrollFactor(0);
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
    }

    // Function to shoot water jets
    function shootWaterJet() {
      const waterJet = waterJets.create(player.x, player.y - 20, 'waterJet');
      waterJet.setVelocityY(-300);
      waterJet.setCollideWorldBounds(false);
      waterJet.body.allowGravity = false;
      waterJet.setDepth(1);
    }

    // Function to spawn fires based on level
    function spawnFires(currentLevel) {
      const fireCount = currentLevel * 3; // Increase fire count with level
      for (let i = 0; i < fireCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 400);
        const fire = fires.create(x, y, 'fire');
        fire.setScale(Phaser.Math.FloatBetween(0.5, 1.5));
        fire.setCollideWorldBounds(true);
        fire.setBounce(1);
        fire.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to spawn power-ups based on level
    function spawnPowerUps(currentLevel) {
      const powerUpCount = currentLevel; // Increase power-ups with level
      for (let i = 0; i < powerUpCount; i++) {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 400);
        const powerUp = powerUps.create(x, y, 'cleanAir');
        powerUp.setScale(0.5);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
        powerUp.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
      }
    }

    // Function to handle collecting power-ups
    function collectPowerUp(player, powerUp) {
      powerUp.disableBody(true, true);
      score += 10; // Example boost
      setPopup({ visible: true, message: "Air Quality Improved! Score +10." });

      // Update score display
      this.children.list.forEach(child => {
        if (child.text && child.text.startsWith('Score:')) {
          child.setText(`Score: ${score}`);
        }
        if (child.text && child.text.startsWith('Level:')) {
          child.setText(`Level: ${level}`);
        }
      });

      // Optionally, implement power-up effects here
    }

    // Function to handle collision with fire
    function hitFire(player, fire) {
      this.physics.pause();
      player.setTint(0xff0000);
      setPopup({ visible: true, message: "Game Over! Wildfire affected air quality." });
      // Optionally, implement game over logic here
    }

    // Function to extinguish fire with water jet
    function extinguishFire(waterJet, fire) {
      waterJet.destroy();
      fire.destroy();
      score += 5; // Example score increment

      // Update score display
      this.children.list.forEach(child => {
        if (child.text && child.text.startsWith('Score:')) {
          child.setText(`Score: ${score}`);
        }
      });
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="wildfire-warrior-container">
      <h2>Wildfire Warrior</h2>
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

export default WildfireWarrior;
