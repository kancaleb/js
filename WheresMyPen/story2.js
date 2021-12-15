class story2 extends Phaser.Scene {
  constructor() {
    super({
      key: "story2",
    });

    // Put global variable here
  }

  create() {
    console.log("*** story 2 scene");

    this.penDropSound=this.sound.add("penDrop");
    this.sighsound=this.sound.add("sigh").setVolume(0.7);

    this.penDropSound.play();
    
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
        console.log("Jump to story 3 scene");

        this.penDropSound.stop();
        this.sighsound.stop();

        this.scene.start(
          "story3"
        );
      },
      this
    );

    //starting screen
    let story2img = this.add.image(0,0,'story2');
    story2img.setOrigin(0,0).setScale(0.76);

    //spacebar animation
    this.anims.create({
      key:'spacebarAnims',
      frames:[
        {key:'spacebar',frame:'space1.png'},
        {key:'spacebar',frame:'space2.png'},
      ],
      frameRate:2,
      repeat:-1
    });

    this.spacebar=this.add.sprite(1220,700,"spacebar").anims.play("spacebarAnims").setScale(0.8);
  }

  delayOneSec(){
    this.sighsound.play();
  }
  
}