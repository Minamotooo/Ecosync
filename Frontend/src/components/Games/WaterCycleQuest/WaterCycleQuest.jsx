// WaterCycleQuest.js
import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import "./WaterCycleQuest.css";

function WaterCycleQuest() {
  const gameRef = useRef(null);

  useEffect(() => {
    let game;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    game = new Phaser.Game(config);

    function preload() {
      // Load images from the assets directory
      this.load.image("cloud", "/Games/WaterCycleQuest/assets/cloud.png");
      this.load.image("sun", "/Games/WaterCycleQuest/assets/sun.png");
      this.load.image(
        "background",
        "/Games/WaterCycleQuest/assets/background.jpg"
      );
      this.load.image(
        "evaporation",
        "/Games/WaterCycleQuest/assets/evaporation.png"
      );
      this.load.image(
        "waterflow",
        "/Games/WaterCycleQuest/assets/waterflow.png"
      );
      this.load.image(
        "drop1",
        "/Games/WaterCycleQuest/assets/droplets/drop1.png"
      );
      this.load.image(
        "drop2",
        "/Games/WaterCycleQuest/assets/droplets/drop2.png"
      );
      this.load.image(
        "drop3",
        "/Games/WaterCycleQuest/assets/droplets/drop3.png"
      );
      this.load.image(
        "drop4",
        "/Games/WaterCycleQuest/assets/droplets/drop4.png"
      );
    }

    let sun;
    let clouds = [];
    let droplets = [];
    let evaporationEmitter;

    function create() {
      const scene = this;

      // Add background image
      scene.add.image(400, 300, "background").setDisplaySize(800, 600);

      // Add sun image
      sun = scene.add.image(700, 100, "sun").setScale(0.5);

      // Add clouds
      for (let i = 0; i < 3; i++) {
        let cloud = scene.add.image(200 + i * 200, 150, "cloud").setScale(0.5);
        clouds.push(cloud);
      }

      // Add evaporation arrow (pointing upwards)
      let evaporationArrow = scene.add
        .image(250, 350, "waterflow")
        .setScale(0.5);
      evaporationArrow.setRotation(-Math.PI / 2);

      // Add precipitation arrow (pointing downwards)
      let precipitationArrow = scene.add
        .image(550, 350, "waterflow")
        .setScale(0.5);
      precipitationArrow.setRotation(Math.PI / 2);

      // Create droplet animations
      scene.anims.create({
        key: "raindropFall",
        frames: [{ key: "drop1" }, { key: "drop2" }],
        frameRate: 2,
        repeat: -1,
      });

      scene.anims.create({
        key: "raindropHit",
        frames: [{ key: "drop3" }, { key: "drop4" }],
        frameRate: 2,
        repeat: 0,
      });

      // Evaporation timer
      scene.time.addEvent({
        delay: 1000,
        callback: evaporate,
        callbackScope: scene,
        loop: true,
      });

      // Precipitation timer
      scene.time.addEvent({
        delay: 5000,
        callback: precipitate,
        callbackScope: scene,
        loop: true,
      });
    }

    function evaporate() {
      const scene = this;
      // Create evaporation particles moving upwards
      let droplet = scene.add.sprite(
        400 + Phaser.Math.Between(-100, 100),
        550,
        "evaporation"
      );
      droplet.setScale(0.1);
      scene.physics.add.existing(droplet);
      scene.physics.moveTo(droplet, droplet.x, 200, 50);
      droplets.push({ sprite: droplet, type: "evaporating" });
    }

    function precipitate() {
      const scene = this;
      // Create raindrops falling from clouds
      clouds.forEach((cloud) => {
        let raindrop = scene.add.sprite(
          cloud.x + Phaser.Math.Between(-30, 30),
          cloud.y + 20,
          "drop1"
        );
        raindrop.setScale(0.3);
        raindrop.play("raindropFall");
        scene.physics.add.existing(raindrop);
        scene.physics.moveTo(raindrop, raindrop.x, 550, 100);
        droplets.push({ sprite: raindrop, type: "precipitating" });
      });
    }

    function update() {
      const scene = this;
      // Update droplets and remove them when necessary
      droplets = droplets.filter((dropletObj) => {
        let droplet = dropletObj.sprite;
        if (dropletObj.type === "evaporating") {
          if (droplet.y <= 200) {
            droplet.destroy();
            return false;
          }
        } else if (dropletObj.type === "precipitating") {
          if (droplet.y >= 550) {
            droplet.body.setVelocity(0, 0);
            droplet.play("raindropHit");
            dropletObj.type = "hit";
            scene.time.delayedCall(1000, () => {
              droplet.destroy();
            });
            return false;
          }
        }
        return true;
      });
    }

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return (
    <div
      className="water-cycle-quest-container"
      style={{ backgroundColor: "black" }}
    >
      <img
        src="/Games/Water Cycle Quest.jpg"
        alt="Title"
        style={{ width: 200, height: "auto" }}
      />
      <div className="game-wrapper">
        <div className="water-cycle-quest" ref={gameRef}></div>
      </div>
    </div>
  );
}

export default WaterCycleQuest;
