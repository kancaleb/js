class gameend extends Phaser.Scene {

    constructor() {
        super({ key: 'gameend' });
        
        // Put global variable here
    }


 //   preload() {
  //  }

    create() {

      console.log("*** game end scene");
      // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
        // On spacebar event, call the world scene
      spaceDown.on(
      "down",
      function () {
        console.log("Jump to main scene");
        this.scene.start(
          "main"
        );
      },
      this
    );


    //display
    this.add.text(90, 600, "CONGRATULATIONS! PRESS SPACE TO REPLAY", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });
}
}