class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.keys = data.keys;
  }

  create() {
    console.log("*** world scene");
    console.log("no. of keys: "+this.keys.all);
    console.log("meeting key: "+this.keys.meeting);
    console.log("toilet key: "+this.keys.toilet);
    console.log("health: "+window.health);

    this.unlockSound=this.sound.add("unlock");

    // Create the map from main
    var map = this.make.tilemap({key:'map'});

    window.map=map;

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let wmpTiles = map.addTilesetImage("WMPTiles","wmp");

    // Load in layers by layers
    this.wallLayer = map.createLayer("wallLayer",wmpTiles,0,0);
    this.floorLayer = map.createLayer("floorLayer",wmpTiles,0,0);
    this.borderLayer = map.createLayer("borderLayer",wmpTiles,0,0);
    this.furnitureLayer = map.createLayer("furnitureLayer",wmpTiles,0,0);

    // set the boundaries of our game world
    this.physics.world.bounds.width=this.borderLayer.width;
    this.physics.world.bounds.height=this.borderLayer.height;

    //Object Layers
    var start = map.findObject("objectLayer", obj=>obj.name === "start");

    this.archive =  map.findObject("objectLayer", obj => obj.name === "archive");
    this.meeting = map.findObject("objectLayer", obj => obj.name === "meeting");
    this.toilet = map.findObject("objectLayer", obj => obj.name === "toilet");

    //health & keys
    this.heart1 = this.add.image(455,270,"heart").setScrollFactor(0).setScale(0.4);
    this.heart2 = this.add.image(485,270,"heart").setScrollFactor(0).setScale(0.4);
    this.heart3 = this.add.image(515,270,"heart").setScrollFactor(0).setScale(0.4);
    this.heart4 = this.add.image(545,270,"heart").setScrollFactor(0).setScale(0.4);
    this.heart5 = this.add.image(575,270,"heart").setScrollFactor(0).setScale(0.4);
    this.keydisp1 = this.add.image(965,270,"key0").setScrollFactor(0).setScale(0.3).setVisible(false);
    this.keydisp2 = this.add.image(990,270,"key0").setScrollFactor(0).setScale(0.3).setVisible(false);

    // Add time event / movement here
    this.timedEvent=this.time.addEvent({
      delay:1000,
      callback:this.delayOneSec,
      callbackScope:this,
      loop:false,
    });

    this.anims.create({
      key:'up',
      frames:[
        {key:'guy',frame:'back1'},
        {key:'guy',frame:'back2'},
        {key:'guy',frame:'back3'},
        {key:'guy',frame:'back4'},
      ],
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'down',
      frames:[
        {key:'guy',frame:'front1'},
        {key:'guy',frame:'front2'},
        {key:'guy',frame:'front3'},
        {key:'guy',frame:'front4'},
      ],
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'left',
      frames:[
        {key:'guy',frame:'left1'},
        {key:'guy',frame:'left2'},
        {key:'guy',frame:'left3'},
        {key:'guy',frame:'left4'},
      ],
      frameRate:10,
      repeat:-1
    });

    this.anims.create({
      key:'right',
      frames:[
        {key:'guy',frame:'right1'},
        {key:'guy',frame:'right2'},
        {key:'guy',frame:'right3'},
        {key:'guy',frame:'right4'},
      ],
      frameRate:10,
      repeat:-1
    });

    // Add main player here with physics.add.sprite
    this.player=this.physics.add.sprite(this.player.x,this.player.y,"guy");
    this.player.setScale(0.35).setSize(80).anims.play("down");
    this.player.setCollideWorldBounds(true); // don't go out of map
    window.player=this.player;

    // collide property
    this.wallLayer.setCollisionByProperty({wall:true});
    this.borderLayer.setCollisionByProperty({wall:true});
    this.furnitureLayer.setCollisionByProperty({item:true});

    // What will collider witg what layers
    this.physics.add.collider(this.wallLayer,this.player);
    this.physics.add.collider(this.borderLayer,this.player);
    this.physics.add.collider(this.furnitureLayer,this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(2.5);
  } /////////////////// end of create //////////////////////////////

  update() {
    
    if(this.cursors.left.isDown){
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left",true);
      //console.log('left');
    }else if(this.cursors.right.isDown){
      this.player.body.setVelocityX(200);
      this.player.anims.play("right",true);
      //console.log('right');
    }else if(this.cursors.up.isDown){
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up",true);
      //console.log('up');
    }else if(this.cursors.down.isDown){
      this.player.body.setVelocityY(200);
      this.player.anims.play("down",true);
      //console.log('down');
    }else{
      this.player.anims.stop();
      this.player.body.setVelocity(0,0);
      //console.log('idle');
    }

    this.archive=new Phaser.Geom.Rectangle(this.archive.x,this.archive.y,this.archive.width,this.archive.height);
    if ( this.archive.contains(this.player.x, this.player.y) ) {
        console.log('archive zone');
        this.archiveRoom();
    }

    this.meeting=new Phaser.Geom.Rectangle(this.meeting.x,this.meeting.y,this.meeting.width,this.meeting.height);
    if ( this.meeting.contains(this.player.x, this.player.y) ) {
        console.log('meeting zone');
        this.meetingRoom();
    }

    this.toilet=new Phaser.Geom.Rectangle(this.toilet.x,this.toilet.y,this.toilet.width,this.toilet.height);
    if ( this.toilet.contains(this.player.x, this.player.y) ) {
        console.log('toilet zone');
        this.toiletRoom();
    }

    if(window.health===4){
      this.heart5.setVisible(false);
    }else if (window.health===3){
      this.heart5.setVisible(false);
      this.heart4.setVisible(false);
    }else if (window.health===2){
      this.heart5.setVisible(false);
      this.heart4.setVisible(false);
      this.heart3.setVisible(false);
    }else if (window.health===1){
      this.heart5.setVisible(false);
      this.heart4.setVisible(false);
      this.heart3.setVisible(false);
      this.heart2.setVisible(false);
    }
    else if (window.health<=0){
      this.heart5.setVisible(false);
      this.heart4.setVisible(false);
      this.heart3.setVisible(false);
      this.heart2.setVisible(false);
      this.heart1.setVisible(false);
    }

    if(this.keys.all===1){
      this.keydisp2.setVisible(true);
    }else if(this.keys.all===2){
      this.keydisp1.setVisible(true);
      this.keydisp2.setVisible(true);
    }

    if(window.doorlocked===0){
      this.keys.all=3;
      this.keydisp1.setVisible(false);
      this.keydisp2.setVisible(false);
    }
    
  } /////////////////// end of update //////////////////////////////

  // Function to jump to rooms
  archiveRoom(player, tile) {
    console.log("archive function");
    if(this.keys.all===2||this.keys.all===3){
    window.doorlocked=0;
    this.unlockSound.play();
    this.scene.start("archive", {
      player: player,
      keys: this.keys,
    });
    }else{
      this.scene.start("needMoreKeys",{player:player,keys:this.keys});
    }
  }

  meetingRoom(player, tile) {
    console.log("meeting function");
    this.scene.start("meeting", {
      player: player,
      keys: this.keys,
    });
  }

  toiletRoom(player, tile) {
    console.log("toilet function");
    this.scene.start("toilet", {
      player: player,
      keys: this.keys,
    });
  }
} //////////// end of class world ///////////////////////
