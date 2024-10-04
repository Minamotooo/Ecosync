// src/components/OceanOdyssey/OceanOdyssey.js

import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import './OceanOdyssey.css';
import Loading from '../Loading/Loading';

const OceanOdyssey = () => {
  const gameContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
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
          gravity: { y: 0 }, // No gravity for swimming
          debug: false, // Set to true to enable physics debugging
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      // Adjust scale mode for responsiveness
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    // Initialize the game
    const game = new Phaser.Game(config);

    let player;
    let cursors;
    let idleTween; // Reference to the idle oscillation tween
    let playerBaseY; // Original Y position of the player
    let trashGroup;
    let score = 0;
    const maxScore = 10; // Total number of trash items
    let scoreLabel;
    let progressBar;
    let progressBarBackground;

    // Preload assets
    function preload() {
      // Load background and character as a sprite sheet
      this.load.image('background', '/Games/OceanOdyssey/assets/ocean.jpg');
      this.load.spritesheet('dude', '/Games/OceanOdyssey/assets/dude.png', {
        frameWidth: 32, // Replace with your actual frame width
        frameHeight: 48, // Replace with your actual frame height
      });

      // Load trash images
      this.load.image('trash1', '/Games/OceanOdyssey/assets/trash/trash1.png');
      this.load.image('trash2', '/Games/OceanOdyssey/assets/trash/trash2.png');
      this.load.image('trash3', '/Games/OceanOdyssey/assets/trash/trash3.png');
      this.load.image('trash4', '/Games/OceanOdyssey/assets/trash/trash4.png');
    }

    // Create game objects
    function create() {
      // Add background
      this.add.image(400, 300, 'background').setScrollFactor(0);

      // Create player
      player = this.physics.add.sprite(400, 300, 'dude');
      player.setCollideWorldBounds(true);
      player.setScale(1.5); // Adjust scale as needed

      // Store the base Y position for idle oscillation
      playerBaseY = player.y;

      // Set player physics properties for swimming
      player.setDamping(true);
      player.setDrag(0.9);
      player.setMaxVelocity(200, 200); // Maximum speed

      // Input
      cursors = this.input.keyboard.createCursorKeys();

      // Define Animations
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      // Use existing frame for 'up' and 'down' animations
      this.anims.create({
        key: 'up',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 10,
      });

      this.anims.create({
        key: 'down',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 10,
      });

      this.anims.create({
        key: 'idle',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 10,
      });

      // Debug: List all animations
      console.log('Animations created:', this.anims.anims.entries);

      // Create idle oscillation tween (initially paused)
      idleTween = this.tweens.add({
        targets: player,
        y: playerBaseY + 5, // Move 5 pixels down
        duration: 1000,
        yoyo: true,
        repeat: -1, // Infinite oscillation
        paused: true, // Start paused
        ease: 'Sine.easeInOut',
      });

      // Listen to player's movement to control idle tween
      this.physics.world.on('worldstep', () => {
        const velocity = player.body.velocity.length();
        let moving = velocity > 10;

        if (moving) {
          idleTween.pause(); // Pause idle oscillation when moving
        } else {
          idleTween.resume(); // Resume idle oscillation when not moving
        }
      });

      // Create trash group
      trashGroup = this.physics.add.group();

      // Array of trash keys for random selection
      const trashKeys = ['trash1', 'trash2', 'trash3', 'trash4'];

      // Create 10 trash items
      for (let i = 0; i < maxScore; i++) {
        // Randomly select a trash image
        const trashKey = Phaser.Utils.Array.GetRandom(trashKeys);

        // Create a trash sprite at a random position
        const x = Phaser.Math.Between(50, config.width - 50);
        const y = Phaser.Math.Between(50, config.height - 50);
        const trash = trashGroup.create(x, y, trashKey);

        // Set physics properties
        trash.setScale(0.1); // Adjust scale as needed
        trash.setCollideWorldBounds(true);

        // Remove bouncing and velocity
        // trash.setBounce(1); // Removed
        // Assign zero velocity to make trash static
        trash.setVelocity(0, 0);

        // Disable gravity for trash items
        trash.body.allowGravity = false;
        // Make the trash item immovable
        trash.body.immovable = true;
        trash.body.moves = false; // Ensure the trash doesn't move due to physics

        // Create an oscillation tween for the trash item
        this.tweens.add({
          targets: trash,
          y: y + 5, // Move 5 pixels down
          duration: 1000,
          yoyo: true,
          repeat: -1, // Infinite oscillation
          ease: 'Sine.easeInOut',
        });
      }

      // Enable collision between player and trash items
      this.physics.add.overlap(player, trashGroup, collectTrash, null, this);

      // Function to handle trash collection
      function collectTrash(player, trash) {
        trash.destroy(); // Remove the collected trash item
        increaseScore(); // Update the score
      }

      // Create the score label
      scoreLabel = this.add
        .text(16, 16, 'Water Quality', { fontSize: '24px', fill: '#fff' })
        .setScrollFactor(0);

      // Create the progress bar background
      progressBarBackground = this.add.graphics();
      progressBarBackground.fillStyle(0x000000, 0.5);
      progressBarBackground.fillRect(16, 50, 200, 20); // x, y, width, height

      // Create the progress bar
      progressBar = this.add.graphics();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(16, 50, 0, 20); // Initially zero width

      // Function to update the progress bar
      function updateProgressBar() {
        progressBar.clear();
        progressBar.fillStyle(0x00ff00, 1);
        let barWidth = (score / maxScore) * 200; // 200 is the width of the progress bar background
        progressBar.fillRect(16, 50, barWidth, 20);
      }

      // Function to increase the score
      function increaseScore() {
        score += 1;
        updateProgressBar();

        // Display popup when all trash is collected
        if (score >= maxScore) {
          setPopup({ visible: true, message: 'Congratulations! Water Quality Improved!' });
        }
      }

      // Initial update to set the progress bar
      updateProgressBar();
    }

    // Update loop
    function update() {
      // Player movement
      const acceleration = 600;
      let moving = false;

      if (cursors.left.isDown) {
        player.setAccelerationX(-acceleration);
        player.anims.play('left', true);
        moving = true;
      } else if (cursors.right.isDown) {
        player.setAccelerationX(acceleration);
        player.anims.play('right', true);
        moving = true;
      } else {
        player.setAccelerationX(0);
      }

      if (cursors.up.isDown) {
        player.setAccelerationY(-acceleration);
        player.anims.play('up', true);
        moving = true;
      } else if (cursors.down.isDown) {
        player.setAccelerationY(acceleration);
        player.anims.play('down', true);
        moving = true;
      } else {
        player.setAccelerationY(0);
      }

      // If not moving, play idle animation
      if (!moving) {
        player.anims.play('idle', true);
      }
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  // Loading state management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust loading time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ocean-odyssey-container" style={{backgroundColor: 'black'}}>
      <img src="/Games/Ocean Odyssey.jpg" alt="Title"  style={{width: 200, height: 'auto'}}/>
      <div ref={gameContainerRef} className="game-container"></div>
      <div>{isLoading && <Loading logoSrc="/Games/ecosync.png" />}</div>

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
