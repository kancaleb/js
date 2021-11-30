class meeting extends Phaser.Scene {

    constructor() {
        super({ key: 'meeting' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.keys = data.keys
    }

    preload() {
        this.load.tilemapTiledJSON('meeting', 'src/assets/meeting.json');

        // Preload any images here
        this.load.image("interiors", "src/assets/Interiors48x48.png");
        this.load.image("room", "src/assets/Room48x48.png");

        this.load.atlas('guy','assets/guy.png','assets/guy.json'); 
    }

    create() {
        console.log('*** meeting scene');
        
        // Create the map from main
        var map = this.make.tilemap({key:'meeting'});

        window.map=map;

        // Load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let interiorsTiles = map.addTilesetImage("Interiors48x48","interiors");
        let roomTiles = map.addTilesetImage("Room48x48","room");

        // Load in layers by layers
        this.floorLayer = map.createLayer("floorLayer",[interiorsTiles,roomTiles],0,0);
        this.itemLayer = map.createLayer("itemLayer",[interiorsTiles,roomTiles],0,0);
        this.borderLayer = map.createLayer("borderLayer",[interiorsTiles,roomTiles],0,0);

        // set the boundaries of our game world
        this.physics.world.bounds.width=this.borderLayer.width;
        this.physics.world.bounds.height=this.borderLayer.height;

        //Object Layers
        var start = map.findObject("objectLayer", obj=>obj.name === "start");

        this.office =  map.findObject("objectLayer", obj => obj.name === "office");

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

        this.anims.create({
          key:'dogAnim',
          frames:[
              {key:'dog',frame:'dog1'},
              {key:'dog',frame:'dog2'},
              {key:'dog',frame:'dog3'},
              {key:'dog',frame:'dog4'},
          ],
          frameRate:10,
          repeat:-1
          });


        // Add main player here with physics.add.sprite
        this.player=this.physics.add.sprite(start.x,start.y,"guy");
        this.player.setScale(0.35).setSize(80).anims.play("up");
        this.player.setCollideWorldBounds(true); // don't go out of map
        window.player=this.player;

        //dog
        this.dog=this.physics.add.sprite(83.60,383.28,"dog").play("dogAnim").setScale(0.5).setSize(80);
        this.timedEvent=this.time.addEvent({
          delay:1000,
          callback:this.moveSquare,
          callbackScope:this,
          loop:false,
        });

        //key
        this.key1=this.physics.add.image(this.dog.x+32,this.dog.y,"key0").setScale(0.2);
        
        // collide property
        this.borderLayer.setCollisionByProperty({wall:true});
        this.itemLayer.setCollisionByProperty({item:true});

        // What will collider witg what layers
        this.physics.add.collider(this.borderLayer,this.player);
        this.physics.add.collider(this.itemLayer,this.player);
        this.physics.add.overlap(this.key1,this.player,this.key1Get,null,this);

        // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);
    }

    update() {

      this.key1.x=this.dog.x+32;
      this.key1.y=this.dog.y;

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
      
          this.office=new Phaser.Geom.Rectangle(this.office.x,this.office.y,this.office.width,this.office.height);
          if ( this.office.contains(this.player.x, this.player.y) ) {
              console.log('office zone');
              this.worldRoom();
          }

          if(this.keys.meeting===0){
            this.key1.disableBody(true,true);
          }
    }

    moveSquare(){
      this.tweens.timeline({
          targets: this.dog,
          ease: "Linear",
          loop: -1,
          duration: 2500,
          tweens:[
              {
                y: 79.74,
              },
              {
                x: 641.80,
              },
              {
                y: 383.28,
              },
              {
                y: 79.74,
              },
              {
                x: 83.60,
              },
              {
                y: 383.28,
              },
          ],
      });
  }

  key1Get(player,key1){
    this.key1.disableBody(true,true);
    console.log("get key 1");
    if(this.keys.meeting===1){
     this.keys.all=this.keys.all+1;
     this.keys.meeting=0;
    }
  }

    worldRoom(player, tile) {
        console.log("exit meeting room");
        var player ={
            x:1103.31,
            y:443.43
        }
        this.scene.start("world", {
          player: player,
          keys: this.keys,
        });
      }

}
