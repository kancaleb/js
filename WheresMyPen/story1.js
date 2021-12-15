class story1 extends Phaser.Scene {
  constructor() {
    super({
      key: "story1",
    });

    // Put global variable here
  }

  create() {
    console.log("*** story 1 scene");

    this.typingsound=this.sound.add("typing").setVolume(0.5);
    this.typingsound.play();

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to story 2 scene");

        this.typingsound.stop();

        this.scene.start(
          "story2"
        );
      },
      this
    );

    //starting screen
    let story1img = this.add.image(0,0,'story1');
    story1img.setOrigin(0,0).setScale(0.76);

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
