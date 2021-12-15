class story4 extends Phaser.Scene {
  constructor() {
    super({
      key: "story4",
    });

    // Put global variable here
  }

  create() {
    console.log("*** story 4 scene");

    window.storymusic.stop();

    this.wtfsound=this.sound.add("wtf").setVolume(0.5);
    this.wtfsound.play();
    window.wtfsound=this.wtfsound;

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to instruction scene");

        this.scene.start(
          "instruction"
        );
      },
      this
    );

    //starting screen
    let story4img = this.add.image(0,0,'story4');
    story4img.setOrigin(0,0).setScale(0.76);

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
}
