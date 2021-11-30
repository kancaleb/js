class main extends Phaser.Scene {
  constructor() {
    super({
      key: "main",
    });

    // Put global variable here
  }

  preload() {
    // Preload all the assets here
    this.load.tilemapTiledJSON("map", "assets/office.json");
    this.load.tilemapTiledJSON("archive", "assets/archive.json");
    this.load.tilemapTiledJSON("meeting", "assets/meeting.json");
    this.load.tilemapTiledJSON("toilet", "assets/toilet.json");

    // Preload any images here
    this.load.spritesheet("interiors", "assets/Interiors48x48.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.spritesheet("room", "assets/Room48x48.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.atlas('guy','assets/guy.png','assets/guy.json'); 
    this.load.atlas('cc','assets/cc.png','assets/cc.json'); 
    this.load.atlas('dog','assets/dog.png','assets/dog.json');
    this.load.atlas('girla','assets/girla.png','assets/girla.json');
    this.load.atlas('girlb','assets/girlb.png','assets/girlb.json');
    this.load.atlas('girlc','assets/girlc.png','assets/girlc.json');

    this.load.image('startscreen','assets/start_screen.png');

    //collected items
    this.load.image('key0','assets/key.png');
    this.load.image('pen1','assets/pen.png');
  }

  create() {
    console.log("*** main scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

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
          {player:player,
          keys:keys,}
        );
      },
      this
    );

    //starting screen
    let background = this.add.sprite(0,0,'startscreen');
    background.setOrigin(0,0).setScale(0.19);

    // Create all the game animations here
  }
}
