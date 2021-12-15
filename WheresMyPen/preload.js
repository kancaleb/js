class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
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
    this.load.spritesheet("wmp", "assets/WMPTiles.png", {
      frameWidth: 48,
      frameHeight: 48,
    });

    this.load.atlas('guy','assets/guy.png','assets/guy.json'); 
    this.load.atlas('cc','assets/cc.png','assets/cc.json'); 
    this.load.atlas('dog','assets/dog.png','assets/dog.json');
    this.load.atlas('girla','assets/girla.png','assets/girla.json');
    this.load.atlas('girlb','assets/girlb.png','assets/girlb.json');
    this.load.atlas('girlc','assets/girlc.png','assets/girlc.json');
    this.load.atlas('spacebar','assets/space.png','assets/space.json');

    //full page images
    this.load.image('startscreen','assets/start_screen.png');
    this.load.image('story1','assets/story1.png');
    this.load.image('story2','assets/story2.png');
    this.load.image('story3','assets/story3.png');
    this.load.image('story4','assets/story4.png');
    this.load.image('instruction1','assets/instruction1.png');
    this.load.image('morekeys','assets/locked.png');
    this.load.image('gameOverPage','assets/gameover.png');
    this.load.image('win','assets/win.png');

    //collected items
    this.load.image('key0','assets/key.png');
    this.load.image('pen1','assets/pen.png');
    this.load.image('mask','assets/mask.png');
    this.load.image('heart','assets/heart.png');

    //text items
    this.load.image('text1','assets/text1.png');
    this.load.image('text2','assets/text2.png');
    this.load.image('text3','assets/text3.png');

    //audio files
    this.load.audio('bgMusic','assets/WiserThanYouThink.mp3');
    this.load.audio('storyMusic','assets/PrincipalsOffice.mp3');
    this.load.audio('typing','assets/typing.mp3');
    this.load.audio('penDrop','assets/pendrop.mp3');
    this.load.audio('sigh','assets/sigh.mp3');
    this.load.audio('moan','assets/moan.mp3');
    this.load.audio('wtf','assets/wtf.mp3');
    this.load.audio('gameOverMusic','assets/gameover.mp3');
    this.load.audio('trumpet','assets/trumpet.mp3');
    this.load.audio('ohyeah','assets/ohyeah.mp3');
    this.load.audio('healthdeduct','assets/healthdeduct.mp3');
    this.load.audio('keyget','assets/keyget.mp3');
    this.load.audio('bark','assets/bark.mp3');
    this.load.audio('girlscream1','assets/girlscream1.mp3');
    this.load.audio('girlscream2','assets/girlscream2.mp3');
    this.load.audio('holymoly','assets/holymoly.mp3');
    this.load.audio('unlock','assets/unlock.mp3');
    
  }

  create() {
    console.log("*** preload");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    window.music = this.sound.add('bgMusic',{loop: true,}).setVolume(0.2) // 10% volume
    window.storymusic = this.sound.add('storyMusic',{loop: true,}).setVolume(0.3)

    this.scene.start("main");
  }
}
