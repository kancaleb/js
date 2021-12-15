class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }

  create() {
    console.log("*** main scene");

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to story 1 scene");
        window.storymusic.play();

        this.scene.start(
          "story1"
        );
      },
      this
    );

    //starting screen
    let background = this.add.image(0,0,'startscreen');
    background.setOrigin(0,0).setScale(0.19);

    // Create all the game animations here
  }
}
