class gameover extends Phaser.Scene {

    constructor() {
        super({ key: 'gameover' });
        
        // Put global variable here
    }


 //   preload() {
  //  }

    create() {

      console.log("*** game over scene");
      // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
        // On spacebar event, call the world scene
      spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");

        var player = {
          x:189.17,
          y:244.44
        }

        var keys = {
          all:0,
          meeting:1,
          toilet:1
        }

        this.scene.start(
          "world",
          // Optional parameters
          {player:player, keys:keys}
        );
      },
      this
    );


    //display
    this.add.text(90, 600, "GAME OVER! PRESS SPACE TO REPLAY", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });
}
}