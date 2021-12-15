class gameover extends Phaser.Scene {

    constructor() {
        super({ key: 'gameover' });
        
        // Put global variable here
    }


 //   preload() {
  //  }

    create() {
      window.music.stop();
      this.gameOverSound=this.sound.add("gameOverMusic");
      this.gameOverSound.play();

      console.log("*** game over scene");
      // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");
        // On spacebar event, call the world scene
      spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
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
          {player:player, keys:keys}
        );
      },
      this
    );


    //display
    let gameoverimg = this.add.image(0,0,'gameOverPage');
    gameoverimg.setOrigin(0,0).setScale(0.76);
}
}