class instruction extends Phaser.Scene {
  constructor() {
    super({
      key: "instruction",
    });

    // Put global variable here
  }

  create() {
    console.log("*** instruction scene");

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        window.wtfsound.stop();
        window.music.play();

        var player = {
          x:189.17,
          y:244.44
        }

        var keys = {
          all:0,
          meeting:1,
          toilet:1
        }

        window.health=5;
        window.doorlocked=1;

        this.scene.start(
          "world",
          // Optional parameters
          {player:player,
          keys:keys,}
        );
      },
      this
    );

    let inst = this.add.image(0,0,'instruction1');
    inst.setOrigin(0,0).setScale(0.76);

    // Create all the game animations here
  }
}
