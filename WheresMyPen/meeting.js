class meeting extends Phaser.Scene {

    constructor() {
        super({ key: 'meeting' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.keys = data.keys
    }

    create() {
        console.log('*** meeting scene');

        this.keySound=this.sound.add("keyget").setVolume(0.5);
        this.barkSound=this.sound.add("bark").setVolume(0.2);
        
        // Create the map from main
        var map = this.make.tilemap({key:'meeting'});

        window.map=map;

        // Load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let wmpTiles = map.addTilesetImage("WMPTiles","wmp");

        // Load in layers by layers
        this.floorLayer = map.createLayer("floorLayer",wmpTiles,0,0);
        this.itemLayer = map.createLayer("itemLayer",wmpTiles,0,0);
        this.borderLayer = map.createLayer("borderLayer",wmpTiles,0,0);

        // set the boundaries of our game world
        this.physics.world.bounds.width=this.borderLayer.width;
        this.physics.world.bounds.height=this.borderLayer.height;

        //Object Layers
        var start = map.findObject("objectLayer", obj=>obj.name === "start");

        this.office =  map.findObject("objectLayer", obj => obj.name === "office");

        this.text2 = this.add.image(start.x,start.y-20,"text2").setScale(0.2).setAlpha(0.5);


        // Add time event / movement here

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
          delay:0,
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
        this.physics.add.overlap(this.dog,this.player,this.dogBark,null,this);

        // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2.5);


        //health & keys
        this.heart1 = this.add.image(455,270,"heart").setScrollFactor(0).setScale(0.4);
        this.heart2 = this.add.image(485,270,"heart").setScrollFactor(0).setScale(0.4);
        this.heart3 = this.add.image(515,270,"heart").setScrollFactor(0).setScale(0.4);
        this.heart4 = this.add.image(545,270,"heart").setScrollFactor(0).setScale(0.4);
        this.heart5 = this.add.image(575,270,"heart").setScrollFactor(0).setScale(0.4);
        this.keydisp1 = this.add.image(965,270,"key0").setScrollFactor(0).setScale(0.3).setVisible(false);
        this.keydisp2 = this.add.image(990,270,"key0").setScrollFactor(0).setScale(0.3).setVisible(false);
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
    }

    moveSquare(){
      this.tweens.timeline({
          targets: this.dog,
          ease: "Linear",
          loop: -1,
          duration: 2500,
          tweens:[
              {
                y: 90.74,
              },
              {
                x: 620.80,
              },
              {
                y: 383.28,
              },
              {
                y: 90.74,
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
    this.keySound.play();
    if(this.keys.meeting===1){
     this.keys.all=this.keys.all+1;
     this.keys.meeting=0;
    }
  }

  dogBark(player,dog){
    console.log("bark");
    this.barkSound.play();
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
