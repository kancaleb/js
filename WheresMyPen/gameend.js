class gameend extends Phaser.Scene {

    constructor() {
        super({ key: 'gameend' });
        
        // Put global variable here
    }


 //   preload() {
  //  }

    create() {

      console.log("*** game end scene");

      window.music.stop();
      this.trumpetSound=this.sound.add("trumpet");
      this.trumpetSound.play();

      this.ohyeahSound=this.sound.add("ohyeah");

      this.timedEvent=this.time.addEvent({
        delay:1000,
        callback:this.delayOneSec,
        callbackScope:this,
        loop:false,
      });
      
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
    let winimg = this.add.image(0,0,'win');
    winimg.setOrigin(0,0).setScale(0.76);
}

delayOneSec(){
  this.ohyeahSound.play();
}
}