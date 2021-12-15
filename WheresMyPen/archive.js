class archive extends Phaser.Scene {

    constructor() {
        super({ key: 'archive', });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.keys = data.keys
    }

    create() {
        console.log('*** archive scene');

        this.healthDeductSound=this.sound.add("healthdeduct");
        
        // Create the map from main
        var map = this.make.tilemap({key:'archive'});

        window.map=map;

        // Load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let wmpTiles = map.addTilesetImage("WMPTiles","wmp");

        // Load in layers by layers
        this.floorLayer = map.createLayer("floorLayer",wmpTiles,0,0);
        this.shelfLayer = map.createLayer("shelfLayer",wmpTiles,0,0);
        this.borderLayer = map.createLayer("borderLayer",wmpTiles,0,0);

        // set the boundaries of our game world
        this.physics.world.bounds.width=this.borderLayer.width;
        this.physics.world.bounds.height=this.borderLayer.height;

        //Object Layers
        var start = map.findObject("objectLayer", obj=>obj.name === "start");
        var pen = map.findObject("objectLayer", obj=>obj.name === "pen");

        this.office =  map.findObject("objectLayer", obj => obj.name === "office");

        this.text1 = this.add.image(start.x,start.y,"text1").setScale(0.2).setAlpha(0.5);

        //health & keys
        this.heart1 = this.add.image(530,310,"heart").setScrollFactor(0).setScale(0.27);
        this.heart2 = this.add.image(552,310,"heart").setScrollFactor(0).setScale(0.27);
        this.heart3 = this.add.image(574,310,"heart").setScrollFactor(0).setScale(0.27);
        this.heart4 = this.add.image(596,310,"heart").setScrollFactor(0).setScale(0.27);
        this.heart5 = this.add.image(618,310,"heart").setScrollFactor(0).setScale(0.27);

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
            key:'ccAnim',
            frames:[
                {key:'cc',frame:'cc1'},
                {key:'cc',frame:'cc2'},
            ],
            frameRate:5,
            repeat:-1
        });

        // Add main player here with physics.add.sprite
        this.player=this.physics.add.sprite(start.x,start.y,"guy");
        this.player.setScale(0.35).setSize(80).anims.play("up");
        this.player.setCollideWorldBounds(true); // don't go out of map
        window.player=this.player;

        //Cockroach Enemy
        this.cc=this.physics.add.sprite(55.02,645.92,"cc").play("ccAnim").setScale(0.5).setSize(100,50);
        this.cc2=this.physics.add.sprite(425.49,458.61,"cc").play("ccAnim").setScale(0.5).setSize(100,50);
        this.cc3=this.physics.add.sprite(55.02,265.93,"cc").play("ccAnim").setScale(0.5).setSize(100,50);

        this.timedEvent=this.time.addEvent({
            delay:1000,
            callback:this.moveLeftRight,
            callbackScope:this,
            loop:false,
            });

        this.timedEvent=this.time.addEvent({
            delay:1000,
            callback:this.moveLeftRight2,
            callbackScope:this,
            loop:false,
            });

        this.timedEvent=this.time.addEvent({
            delay:1000,
            callback:this.moveLeftRight3,
            callbackScope:this,
            loop:false,
            });

        //pen
        this.pen1=this.physics.add.image(pen.x,pen.y,"pen1").setScale(0.3);

        

        // collide property
        this.borderLayer.setCollisionByProperty({wall:true});
        this.shelfLayer.setCollisionByProperty({item:true});

        // What will collider witg what layers
        this.physics.add.collider(this.borderLayer,this.player);
        this.physics.add.collider(this.shelfLayer,this.player);
        this.physics.add.overlap(this.cc,this.player,this.gotCaught,null,this);
        this.physics.add.overlap(this.cc2,this.player,this.gotCaught,null,this);
        this.physics.add.overlap(this.cc3,this.player,this.gotCaught,null,this);
        this.physics.add.overlap(this.pen1,this.player,this.congrats,null,this);

        // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3.5);
        this.cameras.main.setBackgroundColor(0x000000);

        //fog of wall
        this.borderLayer.setPipeline('Light2D').setAlpha(0.1);
        this.shelfLayer.setPipeline('Light2D').setAlpha(0.1);
        this.floorLayer.setPipeline('Light2D').setAlpha(0.1);
        this.cc.setPipeline('Light2D').setAlpha(0.1);
        this.cc2.setPipeline('Light2D').setAlpha(0.1);
        this.cc3.setPipeline('Light2D').setAlpha(0.1);
        this.pen1.setPipeline('Light2D').setAlpha(0.1);
        this.text1.setPipeline('Light2D').setAlpha(0.1);

        this.lights.enable();
        this.lights.setAmbientColor(0x080808);
        this.spotlight=this.lights.addLight(this.player.x, this.player.y).setRadius(200,200).setIntensity(10);        

    }

    update() {
        this.spotlight.x=this.player.x+5;
        this.spotlight.y=this.player.y-5;

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

          if(window.health<=0){
            this.scene.start("gameover");
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
    }

    moveLeftRight(){
        this.tweens.timeline({
            targets: this.cc,
            ease: "Linear",
            loop: -1,
            duration: 3000,
            tweens:[
                {
                    x: 400,
                },
                {
                    x: 70,
                },
            ],
        });
    }

    moveLeftRight2(){
        this.tweens.timeline({
            targets: this.cc2,
            ease: "Linear",
            loop: -1,
            duration: 1000,
            tweens:[
                {
                    x: 70,
                },
                {
                    x: 400,
                },
            ],
        });
    }

    moveLeftRight3(){
        this.tweens.timeline({
            targets: this.cc3,
            ease: "Linear",
            loop: -1,
            duration: 800,
            tweens:[
                {
                    x: 400,
                },
                {
                    x: 70,
                },
            ],
        });
    }


    worldRoom(player, tile) {
        console.log("exit archive room");
        var player ={
            x:715.04,
            y:251.98
        }
        this.scene.start("world", {
          player: player,
          keys: this.keys,
        });
      }

    gotCaught(player, cc){
        console.log("got caught");
        this.player.body.setVelocityY(3000);
        this.healthDeductSound.play();
        window.health--;
        console.log("health: "+window.health);
    }

    congrats(player,pen1){
        console.log("congrats");
        this.scene.start("gameend");
    }

}
