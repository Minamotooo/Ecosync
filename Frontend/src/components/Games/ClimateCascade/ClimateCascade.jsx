// src/components/ClimateCascade/ClimateCascade.js

import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import "./ClimateCascade.css";
import Loading from "../Loading/Loading";

const ClimateCascade = () => {
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
    let player;
    let cursors;
    let spacebar; // Reference for the Space Bar key
    let currentLevel = 0; // Start from 0 for swamp
    const maxLevels = 2; // 0: Swamp, 1: Desert, 2: Polar
    const backgrounds = [
      "swampBackground",
      "desertBackground",
      "polarBackground",
    ];
    const groundTextures = ["platform1", "platform2", "platform3"]; // Ground textures
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
        label: "Biodiversity",
        maxScore: 100,
        scoreIncrement: 10, // per tree collected
      },
      1: {
        label: "Soil Water Level",
        maxScore: 100,
        scoreIncrement: 10,
      },
      2: {
        label: "Sea Level",
        maxScore: 100,
        scoreIncrement: 10, // Collecting trees decreases the score
      },
    };

    // Define floating platform data for each level
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
      1: {
        // Desert Level
        texture: "floatingPlatform2",
        platforms: [
          { x: 600, y: 470, width: 120 },
          { x: 300, y: 100, width: 300 },
          { x: 500, y: 320, width: 300 },
          { x: 400, y: 420, width: 200 },
          { x: 225, y: 370, width: 100 },
          { x: 300, y: 245, width: 150 },
          { x: 110, y: 195, width: 200 },
          { x: 600, y: 170, width: 375 },
        ],
      },
      2: {
        // Polar Level
        texture: "floatingPlatform3",
        platforms: [
          { x: 220, y: 95, width: 320 },
          { x: 420, y: 170, width: 420 },
          { x: 245, y: 320, width: 220 },
          { x: 670, y: 120, width: 170 },
          { x: 220, y: 470, width: 220 },
          { x: 620, y: 420, width: 220 },
          { x: 420, y: 395, width: 170 },
          { x: 120, y: 245, width: 170 },
        ],
      },
    };

    // Dummy data for educational pop-ups
    const dataInfo = {
      0: "Welcome to the Swamp! Navigate through rising temperatures and understand their impact.",
      1: "Welcome to the Desert! Experience desertification and its effects on biodiversity.",
      2: "Welcome to the Polar Regions! Witness ice melt and its consequences on sea levels.",
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
      this.load.image("swampBackground", "/Games/ClimateCascade/assets/swamp.jpg");
      this.load.image("desertBackground", "/Games/ClimateCascade/assets/desert.jpg");
      this.load.image("polarBackground", "/Games/ClimateCascade/assets/polar.jpg");

      // Load all ground textures
      this.load.image("platform1", "/Games/ClimateCascade/assets/platform/1.png");
      this.load.image("platform2", "/Games/ClimateCascade/assets/platform/6.png"); // Ground texture for level 2
      this.load.image("platform3", "/Games/ClimateCascade/assets/platform/5.png"); // Ground texture for level 3

      // Load the floating platform images for different levels
      this.load.image(
        "floatingPlatform1",
        "/Games/ClimateCascade/assets/platform/2.png"
      ); // Level 0 floating platform
      this.load.image(
        "floatingPlatform2",
        "/Games/ClimateCascade/assets/platform/6.png"
      ); // Level 1 floating platform
      this.load.image(
        "floatingPlatform3",
        "/Games/ClimateCascade/assets/platform/5.png"
      ); // Level 2 floating platform

      this.load.spritesheet("dude", "/Games/ClimateCascade/assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });

      // Load tree images
      for (let i = 1; i <= 9; i++) {
        this.load.image(`tree${i}`, `/Games/ClimateCascade/assets/trees/${i}.png`);
      }

      // Load satellite image
      this.load.image("satellite", "/Games/ClimateCascade/assets/satellite.png");
    }

    // 4. Create game objects
    function create() {
      // Store the scene reference
      sceneRef.current = this;

      // Add the initial background
      backgroundImage = this.add
        .image(400, 300, backgrounds[currentLevel])
        .setScrollFactor(0, 0);

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
      score = currentLevel === 2 ? levelSettings.maxScore : 0;
      maxScore = levelSettings.maxScore;

      // Define ground properties
      const groundY = 600; // Y-position for the ground

      // Set ground texture based on the current level
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

      // Enable collision between the player and the ground
      this.physics.add.collider(player, ground);

      // 5. Create groups
      floatingPlatformsGroup = this.physics.add.staticGroup();
      treesGroup = this.physics.add.group();
      satellitesGroup = this.physics.add.group();

      // 6. Add floating platforms, trees, and satellites
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

    // Function to add level objects (platforms, trees, satellites)
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

          // Decide how many trees to place on this platform
          const numberOfTrees = Phaser.Math.Between(1, 3);

          for (let i = 0; i < numberOfTrees; i++) {
            const treeIndex = Phaser.Math.Between(1, 9);

            // Calculate the left and right edges of the platform
            const platformLeftX = platform.x - platform.width / 2 + 10; // Adding 10 to avoid edges
            const platformRightX = platform.x + platform.width / 2 - 10;

            // Randomly position the tree within the platform bounds
            const treeX = Phaser.Math.Between(platformLeftX, platformRightX);

            // Create tree sprite
            const tree = treesGroup
              .create(treeX, platform.y - 20, `tree${treeIndex}`)
              .setOrigin(0.5, 1)
              .setScale(0.1); // Keep the scale at 0.1

            // Adjust the physics body size
            tree.body.setSize(tree.displayWidth, tree.displayHeight);

            // Set tree to be immovable and not affected by gravity
            tree.body.setAllowGravity(false);
            tree.body.setImmovable(true);

            // Make the tree oscillate
            this.tweens.add({
              targets: tree,
              y: tree.y - 10,
              duration: 1000,
              yoyo: true,
              repeat: -1,
              ease: "Sine.easeInOut",
            });
          }

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
      if (currentLevel === 2) {
        // Decrease score in level 2
        score -= scoreIncrement;
      } else {
        // Increase score in other levels
        score += scoreIncrement;
      }

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

      if (currentLevel === 2) {
        barColor = 0x0000ff; // Blue for Sea Level
      }

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
        player.anims.play("turn");
      }

      // Allow jumping with Up Arrow or Space Bar
      if ((cursors.up.isDown || spacebar.isDown) && player.body.touching.down) {
        player.setVelocityY(-330);
      }

      // Check if player crosses the right edge of the current level
      const levelBoundary = 800;
      if (player.x > levelBoundary - 50) {
        switchToNextLevel.call(this);
        player.x = 50;
        player.y = ground.y - groundHeight - 24;
      }

      // Prevent player from going beyond the left of the first level
      if (currentLevel === 0 && player.x < 0) {
        player.setX(0);
      }
    }

    // 8. Function to handle switching to the next level/background
    function switchToNextLevel() {
      if (currentLevel < maxLevels) {
        currentLevel++;

        // Get new level settings
        const levelSettings = levelConfig[currentLevel];

        // Update the background texture
        backgroundImage.setTexture(backgrounds[currentLevel]);

        // Set the new ground texture based on the current level
        const newGroundTexture = groundTextures[currentLevel] || "platform1";

        // Update the ground texture and stretch it
        ground
          .setTexture(newGroundTexture)
          .setDisplaySize(800, groundHeight)
          .setOrigin(0.5, 1);

        // Refresh the physics body after resizing
        ground.refreshBody();

        // Adjust ground's physics body for the new level
        const groundCollisionOffset = 10;
        ground.body.setSize(
          ground.width,
          ground.height - groundCollisionOffset
        );
        ground.body.setOffset(0, groundCollisionOffset);

        // Reset player position if necessary
        player.setX(50);
        player.setY(ground.y - groundHeight - 24);

        // Remove existing floating platforms, trees, and satellites
        floatingPlatformsGroup.clear(true, true);
        treesGroup.clear(true, true);
        satellitesGroup.clear(true, true);

        // Re-initialize groups
        treesGroup = this.physics.add.group();
        satellitesGroup = this.physics.add.group();

        // Add new floating platforms, trees, and satellites based on the new level
        addLevelObjects.call(this, currentLevel);

        // Re-enable collision between the player and new floating platforms, trees, and satellites
        this.physics.add.collider(player, floatingPlatformsGroup);
        this.physics.add.overlap(player, treesGroup, collectTree, null, this);
        this.physics.add.overlap(
          player,
          satellitesGroup,
          collectSatellite,
          null,
          this
        );

        // Optionally, display level-specific information
        displayLevelInfo.call(this, currentLevel);

        // Update score label
        scoreLabel.setText(levelSettings.label);

        // Reset score and maxScore
        maxScore = levelSettings.maxScore;
        if (currentLevel === 2) {
          // For level 2, start score at maxScore
          score = maxScore;
        } else {
          // For other levels, start score at 0
          score = 0;
        }

        // Update the progress bar
        updateProgressBar();
      } else {
        // All levels completed
        setPopup({
          visible: true,
          message:
            "Congratulations! You've explored all regions of Climate Cascade.",
        });
        // Pause the game
        this.physics.pause();
        player.setTint(0x00ff00);
        player.anims.play("turn");
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
    <div className="climate-cascade-container">
      <h2>Climate Cascade</h2>
      <div className="game-wrapper">
        <div ref={gameContainerRef} className="game-container"></div>
        <div>{isLoading && <Loading logoSrc="/Games/ecosync.png" />}</div>

        {/* Popup for level information */}
        {/* Popup for level information */}
        {popup.visible && (
          <div className="popup" style={{marginTop: 50}}>
            <div className="popup-content">
              <p>{popup.message}</p>
              <button onClick={() => setPopup({ visible: false, message: "" })}>
                Close
              </button>
            </div>
          </div>
        )}
        {/* Satellite modal */}
        {satelliteModal.visible && (
          <div className="modal" style={{position: 'absolute'}}>
            <div className="modal-content">
              <img src="/Games//ClimateCascade/assets/satellite.png" alt="Satellite" />
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

export default ClimateCascade;
