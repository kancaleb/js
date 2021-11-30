class needMoreKeys extends Phaser.Scene {

    constructor() {
        super({ key: 'needMoreKeys' });
        
        // Put global variable here
    }

    init(data) {
      this.player = data.player
      this.keys = data.keys
  }

 //   preload() {
  //  }

    create() {

      console.log("*** need more keys scene");
      // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
        // On spacebar event, call the world scene
      spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");

        var player = {
          x:715.04,
          y:251.98
        }
        this.scene.start(
          "world",
          // Optional parameters
          {player:player, keys:this.keys}
        );
      },
      this
    );


    //display
    this.add.text(90, 600, "NEED 2 KEYS TO OPEN THIS ROOM, HIT SPACE TO CONTINUE", {
      font: "30px Courier",
      fill: "#FFFFFF",
    });
}
}