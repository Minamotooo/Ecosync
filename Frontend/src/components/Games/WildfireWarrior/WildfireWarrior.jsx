// src/components/WildfireWarrior/WildfireWarrior.js

import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import "./WildfireWarrior.css";
import Loading from "../Loading/Loading";

const WildfireWarrior = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const gameContainerRef = useRef(null);
  const [popup, setPopup] = useState({ visible: false, message: "" });
  const [satelliteModal, setSatelliteModal] = useState({ visible: false });
  const sceneRef = useRef(null); // Reference to the Phaser scene
  let game; // Reference to the Phaser game instance

  useEffect(() => {
    // 1. Define constants and variables accessible throughout the useEffect
    const groundHeight = 64; // Height of the ground
    let player;
    let gun;
    let cursors;
    let spacebar; // Reference for the Space Bar key
    let bulletsGroup; // Group for bullets
    let firesGroup; // Group for fires
    let satellitesGroup; // Group for satellites
    let explosionsGroup; // Group for explosions
    let score = 0;
    const maxScore = 100; // Maximum score for the progress bar
    let scoreLabel;
    let progressBar;
    let progressBarBackground;

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
      // Load background and platform images
      this.load.image("background", "/Games/WildfireWarrior/assets/wildfire.jpg");
      this.load.image("platform", "/Games/WildfireWarrior/assets/platform.png");

      // Load player spritesheet
      this.load.spritesheet("dude", "/Games/WildfireWarrior/assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
      });

      // Load fire frames (fire1.png to fire9.png)
      for (let i = 1; i <= 9; i++) {
        this.load.image(`fire${i}`, `/Games/WildfireWarrior/assets/fire/fire${i}.png`);
      }

      // Load gun image
      this.load.image("gun", "/Games/WildfireWarrior/assets/shooting/gun.png");

      // Load bullet frames (bullet1.png to bullet3.png)
      for (let i = 1; i <= 3; i++) {
        this.load.image(`bullet${i}`, `/Games/WildfireWarrior/assets/shooting/bullet${i}.png`);
      }

      // Load explosion frames (explosion1.png to explosion2.png)
      for (let i = 1; i <= 2; i++) {
        this.load.image(`explosion${i}`, `/Games/WildfireWarrior/assets/shooting/explosion${i}.png`);
      }

      // Load satellite image
      this.load.image("satellite", "/Games/WildfireWarrior/assets/satellite.png");
    }

    // 4. Create game objects
    function create() {
      // Store the scene reference
      sceneRef.current = this;

      // Add the background
      this.add.image(400, 300, "background").setScrollFactor(0);

      // Create the ground
      const groundY = 600; // Y-position for the ground
      const groundTexture = "platform"; // Ground texture

      // Add the ground as a static physics object
      const ground = this.physics.add
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

      // Create groups
      bulletsGroup = this.physics.add.group();
      firesGroup = this.physics.add.group();
      satellitesGroup = this.physics.add.group();
      explosionsGroup = this.add.group(); // Explosions don't need physics

      // Create fire animation
      this.anims.create({
        key: "fire_anim",
        frames: [
          { key: "fire1" },
          { key: "fire2" },
          { key: "fire3" },
          { key: "fire4" },
          { key: "fire5" },
          { key: "fire6" },
          { key: "fire7" },
          { key: "fire8" },
          { key: "fire9" },
        ],
        frameRate: 10, // Adjust as needed
        repeat: -1, // Loop indefinitely
      });

      // Create bullet animation
      this.anims.create({
        key: "bullet_anim",
        frames: [
          { key: "bullet1" },
          { key: "bullet2" },
          { key: "bullet3" },
        ],
        frameRate: 15, // Adjust as needed
        repeat: -1, // Loop indefinitely
      });

      // Create explosion animation
      this.anims.create({
        key: "explosion_anim",
        frames: [
          { key: "explosion1" },
          { key: "explosion2" },
        ],
        frameRate: 10, // Adjust as needed
        repeat: 0, // Play once
      });

      // Create gun and attach to player
      gun = this.add.sprite(player.x, player.y, "gun").setScale(0.05); // Very small scale
      gun.setDepth(1); // Ensure gun is above the player

      // Disable physics on gun by not adding it to any physics group
      // Position gun relative to player in the update loop

      // Create fires
      for (let i = 0; i < 10; i++) {
        let fire = firesGroup.create(
          Phaser.Math.Between(100, 700),
          Phaser.Math.Between(50, 300),
          "fire1" // Initial frame
        );
        fire.setVelocity(
          Phaser.Math.Between(-50, 50),
          Phaser.Math.Between(-50, 50)
        );
        fire.setBounce(1);
        fire.setCollideWorldBounds(true);
        fire.setScale(0.1);

        // Disable gravity for fire sprites
        fire.body.allowGravity = false;

        // Assign the fire animation to the sprite
        fire.anims.play("fire_anim");
      }

      // Create satellites
      for (let i = 0; i < 1; i++) {
        let satellite = satellitesGroup.create(
          Phaser.Math.Between(100, 700),
          Phaser.Math.Between(50, 300),
          "satellite"
        );
        satellite.setVelocity(
          Phaser.Math.Between(-30, 30),
          Phaser.Math.Between(-30, 30)
        );
        satellite.setBounce(1);
        satellite.setCollideWorldBounds(true);
        satellite.setScale(0.1);

        // Disable gravity for satellite sprites
        satellite.body.allowGravity = false;
      }

      // Create explosions group
      explosionsGroup = this.add.group();

      // Collision detection between bullets and fires
      this.physics.add.overlap(
        bulletsGroup,
        firesGroup,
        hitFire,
        null,
        this
      );

      // Collision detection between bullets and satellites
      this.physics.add.overlap(
        bulletsGroup,
        satellitesGroup,
        hitSatellite,
        null,
        this
      );

      // Create the score label
      scoreLabel = this.add
        .text(16, 16, "Air Quality", { fontSize: "24px", fill: "#fff" })
        .setScrollFactor(0);

      // Create the progress bar background
      progressBarBackground = this.add.graphics();
      progressBarBackground.fillStyle(0x000000, 0.5);
      progressBarBackground.fillRect(16, 50, 200, 20); // x, y, width, height

      // Create the progress bar
      progressBar = this.add.graphics();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(16, 50, 0, 20); // Initially zero width

      // Camera settings
      this.cameras.main.startFollow(player);
      this.cameras.main.setBounds(0, 0, 800, 600);

      // Set world bounds
      this.physics.world.setBounds(0, 0, 800, 600);

      // Initialize nextFire time
      this.nextFire = 0;
      this.fireRate = 500; // milliseconds
    }

    // Function to handle shooting
    function shootBullet() {
      const bullet = bulletsGroup.create(gun.x, gun.y, "bullet1");
      bullet.setScale(0.05); // Adjust as needed
      bullet.anims.play("bullet_anim");
      bullet.body.allowGravity = false;

      // Calculate angle from gun to pointer
      const pointer = sceneRef.current.input.activePointer;
      const angle = Phaser.Math.Angle.Between(
        gun.x,
        gun.y,
        pointer.worldX,
        pointer.worldY
      );

      // Set bullet velocity
      const speed = 500;
      sceneRef.current.physics.velocityFromRotation(angle, speed, bullet.body.velocity);
      bullet.rotation = angle;

      // Destroy bullet after 2 seconds to prevent memory leaks
      sceneRef.current.time.delayedCall(2000, () => {
        if (bullet.active) {
          bullet.destroy();
        }
      }, [], sceneRef.current);
    }

    // Function to update progress bar
    function updateProgressBar() {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      let barWidth = (score / maxScore) * 200;
      progressBar.fillRect(16, 50, barWidth, 20);
    }

    // Function when bullet hits fire
    function hitFire(bullet, fire) {
      bullet.destroy();
      fire.destroy();
      score += 10; // Increase score
      updateProgressBar();

      // Create explosion at collision point
      createExplosion(fire.x, fire.y);
    }

    // Function when bullet hits satellite
    function hitSatellite(bullet, satellite) {
      bullet.destroy();
      satellite.destroy();
      setSatelliteModal({ visible: true });
      sceneRef.current.physics.pause();

      // Create explosion at collision point
      createExplosion(satellite.x, satellite.y);
    }

    // Function to create explosion
    function createExplosion(x, y) {
      const explosion = explosionsGroup.create(x, y, "explosion1");
      explosion.setScale(0.3); // Adjust scale as needed
      explosion.anims.play("explosion_anim");
      explosion.setDepth(2); // Ensure explosion is above other sprites

      // Destroy explosion after animation completes
      explosion.on('animationcomplete', () => {
        explosion.destroy();
      });
    }

    // 5. Update function
    function update() {
      // Player movement
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

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }

      // Update gun position to match player and hold the gun
      const pointer = sceneRef.current.input.activePointer;
      const angle = Phaser.Math.Angle.Between(
        player.x,
        player.y,
        pointer.worldX,
        pointer.worldY
      );

      const gunOffset = 20; // Distance from player to gun
      gun.x = player.x + Math.cos(angle) * gunOffset;
      gun.y = player.y + Math.sin(angle) * gunOffset;
      gun.rotation = angle;

      // Shooting
      if (spacebar.isDown && this.time.now > this.nextFire) {
        this.nextFire = this.time.now + this.fireRate;
        shootBullet();
      }
    }

    // Cleanup on component unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="wildfire-warrior-containerr" style={{backgroundColor: 'black'}}>
      <img src="/Games/Wildfire Warrior.jpg" alt="Title"  style={{width: 200, height: 'auto'}}/>
      <div className="game-wrapper">
        <div ref={gameContainerRef} className="game-container"></div>
        <div>{isLoading && <Loading logoSrc="/Games/ecosync.png" />}</div>

        {/* Popup for level information */}
        {popup.visible && (
          <div className="popup" style={{ marginTop: 50 }}>
            <div className="popup-content">
              <p>{popup.message}</p>
              <button
                onClick={() => setPopup({ visible: false, message: "" })}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {/* Satellite modal */}
        {satelliteModal.visible && (
          <div className="modal" style={{ position: "absolute" }}>
            <div className="modal-content" style={{display: 'flex', flexDirection: 'column'}}>
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

export default WildfireWarrior;
