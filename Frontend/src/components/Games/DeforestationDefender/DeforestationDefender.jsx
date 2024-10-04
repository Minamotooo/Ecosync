// src/components/ClimateCascade/ClimateCascade.js

import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import "./DeforestationDefender.css";
import Loading from "../Loading/Loading";

const DeforestationDefender = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const gameContainerRef = useRef(null);
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [satelliteModal, setSatelliteModal] = useState({ visible: false });
  const sceneRef = useRef(null); // Reference to the Phaser scene
  let game; // Reference to the Phaser game instance

  useEffect(() => {
    // 1. Define constants and variables accessible throughout the useEffect
    const groundHeight = 64; // Height of the ground
    const groundY = 600; // Y-position for the ground
    let player;
    let cursors;
    let spacebar; // Reference for the Space Bar key
    let pKey; // Reference for the 'P' key
    let currentLevel = 0; // Start from 0 for swamp
    const maxLevels = 0; // Only one level now
    const backgrounds = ["swampBackground"];
    const groundTextures = ["platform1"]; // Ground textures
    let backgroundImage; // Reference to the current background
    let ground; // Reference to the ground
    let floatingPlatformsGroup; // Group for floating platforms
    let treesGroup; // Group for the trees
    let satellitesGroup; // Group for the satellites
    let score = 0;
    let maxScore = 100; // Maximum score for the progress bar
    let scoreLabel;
    let progressBar;
    let progressBarBackground;

    // Level configuration for labels and scoring
    const levelConfig = {
      0: {
        label: "Ecological Balance",
        maxScore: 100,
        scoreIncrement: 10, // per tree collected
      },
    };

    // Define floating platform data for the level
    const floatingPlatformData = {
      0: {
        // Swamp Level
        texture: "floatingPlatform1",
        platforms: [
          { x: 200, y: 470, width: 100 },
          { x: 225, y: 345, width: 150 },
          { x: 300, y: 170, width: 300 },
          { x: 110, y: 245, width: 200 },
          { x: 400, y: 420, width: 150 },
          { x: 500, y: 95, width: 400 },
          { x: 600, y: 270, width: 120 },
          { x: 650, y: 370, width: 200 },
        ],
      },
    };

    // Dummy data for educational pop-ups
    const dataInfo = {
      0: "Welcome to the Forest! Understand the effects of planting trees!!",
    };

    // 2. Phaser Game Configuration
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainerRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 500 },
          debug: false, // Set to true to enable physics debugging
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    // Initialize the game
    game = new Phaser.Game(config);

    // 3. Preload assets
    function preload() {
      this.load.image(
        "swampBackground",
        "/Games/DeforestationDefender/assets/background.png"
      );

      // Load ground texture
      this.load.image(
        "platform1",
        "/Games/DeforestationDefender/assets/platform.png"
      );

      // Load the floating platform image for the level
      this.load.image(
        "floatingPlatform1",
        "/Games/DeforestationDefender/assets/floating_platform.png"
      );

      this.load.spritesheet(
        "dude",
        "/Games/DeforestationDefender/assets/dude.png",
        {
          frameWidth: 32,
          frameHeight: 48,
        }
      );

      // Load tree images
      for (let i = 1; i <= 9; i++) {
        this.load.image(
          `tree${i}`,
          `/Games/DeforestationDefender/assets/trees/${i}.png`
        );
      }

      // Load satellite image
      this.load.image(
        "satellite",
        "/Games/DeforestationDefender/assets/satellite.png"
      );
    }

    // 4. Create game objects
    function create() {
      // Store the scene reference
      sceneRef.current = this;

      // Add the background
      backgroundImage = this.add
        .image(400, 300, backgrounds[currentLevel])
        .setScrollFactor(0, 0)
        .setDisplaySize(800, 600);

      // Get level configuration
      const levelSettings = levelConfig[currentLevel];

      // Create the score label
      scoreLabel = this.add
        .text(16, 16, levelSettings.label, { fontSize: "24px", fill: "#fff" })
        .setScrollFactor(0);

      // Create the progress bar background
      progressBarBackground = this.add.graphics();
      progressBarBackground.fillStyle(0x000000, 0.5);
      progressBarBackground.fillRect(16, 50, 200, 20); // x, y, width, height

      // Create the progress bar
      progressBar = this.add.graphics();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(16, 50, 0, 20); // Initially zero width

      // Set initial score and max score
      score = 0;
      maxScore = levelSettings.maxScore;

      // Set ground texture
      const groundTexture = groundTextures[currentLevel] || "platform1"; // Fallback to 'platform1'

      // Add the ground as a static physics object using staticSprite
      ground = this.physics.add
        .staticSprite(400, groundY, groundTexture)
        .setDisplaySize(800, groundHeight) // Stretch to fit the width
        .setOrigin(0.5, 1); // Anchor at the bottom center

      // Refresh the physics body after resizing
      ground.refreshBody();

      // Adjust ground's physics body
      const groundCollisionOffset = 18;
      ground.body.setSize(ground.width, ground.height - groundCollisionOffset);
      ground.body.setOffset(0, groundCollisionOffset);

      // Create player above the ground
      player = this.physics.add
        .sprite(100, groundY - groundHeight - 100, "dude")
        .setBounce(0.2)
        .setCollideWorldBounds(true);

      // Adjust player's physics body size and offset to align correctly
      player.body.setSize(player.width, player.height - 10);
      player.body.setOffset(0, 0);

      // Player animations
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      // Input
      cursors = this.input.keyboard.createCursorKeys();
      spacebar = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE
      );
      pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

      // Enable collision between the player and the ground
      this.physics.add.collider(player, ground);

      // 5. Create groups
      floatingPlatformsGroup = this.physics.add.staticGroup();
      treesGroup = this.physics.add.staticGroup(); // Changed to static group
      satellitesGroup = this.physics.add.group();

      // 6. Add floating platforms and satellite
      addLevelObjects.call(this, currentLevel);

      // Enable collision between the player and floating platforms
      this.physics.add.collider(player, floatingPlatformsGroup);

      // Enable collision between the player and trees
      this.physics.add.overlap(player, treesGroup, collectTree, null, this);

      // Enable collision between the player and satellites
      this.physics.add.overlap(
        player,
        satellitesGroup,
        collectSatellite,
        null,
        this
      );

      // Populate initial level information
      displayLevelInfo.call(this, currentLevel);

      // Update the progress bar
      updateProgressBar();

      // Camera settings
      this.cameras.main.startFollow(player);
      this.cameras.main.setBounds(0, 0, 800, 600);

      // Set world bounds
      this.physics.world.setBounds(0, 0, 800, 600);
    }

    // Function to add level objects (platforms and satellite)
    function addLevelObjects(level) {
      const levelData = floatingPlatformData[level];
      if (levelData && levelData.platforms && levelData.platforms.length > 0) {
        // Decide which platform will have the satellite
        let satellitePlatformIndex = Phaser.Math.Between(
          0,
          levelData.platforms.length - 1
        );

        levelData.platforms.forEach((platform, index) => {
          // Create platform
          const platformSprite = floatingPlatformsGroup
            .create(platform.x, platform.y, levelData.texture)
            .setDisplaySize(platform.width, 20)
            .setOrigin(0.5, 1);
          platformSprite.refreshBody();

          // Add satellite to the selected platform
          if (index === satellitePlatformIndex) {
            // Calculate the left and right edges of the platform
            const platformLeftX = platform.x - platform.width / 2 + 10;
            const platformRightX = platform.x + platform.width / 2 - 10;

            // Randomly position the satellite within the platform bounds
            const satelliteX = Phaser.Math.Between(
              platformLeftX,
              platformRightX
            );

            // Create satellite sprite
            const satellite = satellitesGroup
              .create(satelliteX, platform.y - 20, "satellite")
              .setOrigin(0.5, 1)
              .setScale(0.05); // Smaller satellite

            // Adjust the physics body size
            satellite.body.setSize(
              satellite.displayWidth,
              satellite.displayHeight
            );

            // Set satellite to be immovable and not affected by gravity
            satellite.body.setAllowGravity(false);
            satellite.body.setImmovable(true);

            // Make the satellite oscillate
            this.tweens.add({
              targets: satellite,
              y: satellite.y - 10,
              duration: 1000,
              yoyo: true,
              repeat: -1,
              ease: "Sine.easeInOut",
            });
          }
        });
      }
    }

    // Function to handle collecting trees
    function collectTree(player, tree) {
      // Remove the tree from the scene
      tree.destroy();

      // Get score increment for current level
      const scoreIncrement = levelConfig[currentLevel].scoreIncrement;

      // Update the score
      score += scoreIncrement;

      // Ensure score stays within bounds
      if (score > maxScore) score = maxScore;
      if (score < 0) score = 0;

      // Update the progress bar
      updateProgressBar();
    }

    // Function to handle updating the progress bar
    function updateProgressBar() {
      // Clear the previous progress bar
      progressBar.clear();

      // Calculate percentage
      const percentage = score / maxScore;

      // Set color
      let barColor = 0x00ff00; // Green

      // Draw the progress bar
      progressBar.fillStyle(barColor, 1);
      progressBar.fillRect(16, 50, 200 * percentage, 20);
    }

    // Function to handle collecting satellites
    function collectSatellite(player, satellite) {
      // Remove the satellite from the scene
      satellite.destroy();

      // Pause the game
      this.physics.pause();

      // Show the satellite modal
      setSatelliteModal({ visible: true });
    }

    // 7. Update loop
    function update() {
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.setFrame(4);
      }

      // Allow jumping with Up Arrow or Space Bar
      if ((cursors.up.isDown || spacebar.isDown) && player.body.touching.down) {
        player.setVelocityY(-330);
      }

      // Handle planting a tree when 'P' is pressed
      if (pKey.isDown && player.body.touching.down && !pKey.pressed) {
        pKey.pressed = true;

        // Plant a tree at ground level
        const treeIndex = Phaser.Math.Between(1, 9);
        const treeY = groundY - groundHeight; // Position at the ground level
        const tree = treesGroup
          .create(player.x, treeY, `tree${treeIndex}`)
          .setOrigin(0.5, 1)
          .setScale(0.1); // Keep the scale at 0.1

        // Optional: Make the tree oscillate
        this.tweens.add({
          targets: tree,
          y: tree.y - 10,
          duration: 1000,
          yoyo: true,
          repeat: -1,
          ease: "Sine.easeInOut",
        });
      }

      if (!pKey.isDown) {
        pKey.pressed = false;
      }
    }

    // 9. Function to display level-specific information
    function displayLevelInfo(level) {
      const levelMessage = dataInfo[level];
      if (levelMessage) {
        setPopup({ visible: true, message: levelMessage });
      }
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div
      className="deforestation-defender-container"
      style={{ backgroundColor: "black" }}
    >
      <img
        src="/Games/Deforestation Defender.jpg"
        alt="Title"
        style={{ width: 200, height: "auto" }}
      />
      <div className="game-wrapper">
        <div ref={gameContainerRef} className="game-container"></div>
        <div>{isLoading && <Loading logoSrc="/Games/ecosync.png" />}</div>

        {/* Popup for level information */}
        {/* {popup.visible && (
          <div className="popup" style={{ marginTop: 50 }}>
            <div className="popup-content">
              <p>{popup.message}</p>
              <button onClick={() => setPopup({ visible: false, message: "" })}>
                CLOSE
              </button>
            </div>
          </div>
        )} */}

        {/* Satellite modal */}
        {satelliteModal.visible && (
          <div className="modal" style={{ position: "absolute" }}>
            <div
              className="modal-content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <img src="/Games/satellite-image.gif" alt="Satellite" />
              <button
                onClick={() => {
                  setSatelliteModal({ visible: false });
                  // Resume the game
                  if (sceneRef.current) {
                    sceneRef.current.physics.resume();
                  }
                }}
              >
                CONTINUE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeforestationDefender;
