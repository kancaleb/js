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

      this.hmSound=this.sound.add("holymoly").setVolume(0.6);
      this.hmSound.play();

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
    let morekeysimg = this.add.image(0,0,'morekeys');
    morekeysimg.setOrigin(0,0).setScale(0.76);

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