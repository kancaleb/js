class toilet extends Phaser.Scene {

    constructor() {
        super({ key: 'toilet' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.keys = data.keys
    }

    create() {
        console.log('*** toilet scene');

        this.keySound=this.sound.add("keyget").setVolume(0.5);

        this.healthDeductSound=this.sound.add("healthdeduct");
        this.girlSound1=this.sound.add("girlscream1").setVolume(0.7);
        this.girlSound2=this.sound.add("girlscream2").setVolume(0.7);
        
        // Create the map from main
        var map = this.make.tilemap({key:'toilet'});

        window.map=map;

        // Load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let wmpTiles = map.addTilesetImage("WMPTiles","wmp");

        // Load in layers by layers
        this.floorLayer = map.createLayer("floorLayer",wmpTiles,0,0);
        this.cubicleLayer = map.createLayer("cubicleLayer",wmpTiles,0,0);
        this.borderLayer = map.createLayer("borderLayer",wmpTiles,0,0);
        this.itemLayer = map.createLayer("itemLayer",wmpTiles,0,0);
        this.sinkLayer = map.createLayer("sinkLayer",wmpTiles,0,0);

        // set the boundaries of our game world
        this.physics.world.bounds.width=this.borderLayer.width;
        this.physics.world.bounds.height=this.borderLayer.height;

        //Object Layers
        var start = map.findObject("objectLayer", obj=>obj.name === "start");
        var key = map.findObject("objectLayer", obj=>obj.name === "key");

        this.office =  map.findObject("objectLayer", obj => obj.name === "office");

        this.text3 = this.add.image(122.27,265.44,"text3").setScale(0.2).setAlpha(0.5);


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
          key:'girlaAnim',
          frames:[
              {key:'girla',frame:'girla1'},
              {key:'girla',frame:'girla2'},
              {key:'girla',frame:'girla3'},
              {key:'girla',frame:'girla4'},
          ],
          frameRate:10,
          repeat:-1
          });

          this.anims.create({
            key:'girlbAnim',
            frames:[
                {key:'girlb',frame:'girlb1'},
                {key:'girlb',frame:'girlb2'},
                {key:'girlb',frame:'girlb3'},
                {key:'girlb',frame:'girlb4'},
            ],
            frameRate:10,
            repeat:-1
            });

            this.anims.create({
              key:'girlcAnim',
              frames:[
                  {key:'girlc',frame:'girlc1'},
                  {key:'girlc',frame:'girlc2'},
                  {key:'girlc',frame:'girlc3'},
                  {key:'girlc',frame:'girlc4'},
              ],
              frameRate:10,
              repeat:-1
              });

        // Add main player here with physics.add.sprite
        this.player=this.physics.add.sprite(start.x,start.y,"guy");
        this.player.setScale(0.5).setSize(80).anims.play("up");
        this.player.setCollideWorldBounds(true); // don't go out of map
        window.player=this.player;

        //npc
        this.girl1=this.physics.add.sprite(263,122.54,"girla").play("girlaAnim").setScale(0.5).setSize(80);
        this.girl2=this.physics.add.sprite(408,122.54,"girlb").play("girlbAnim").setScale(0.5).setSize(80);
        this.girl3=this.physics.add.sprite(552,122.54,"girlc").play("girlcAnim").setScale(0.5).setSize(80);
        this.girl4=this.physics.add.sprite(696,122.54,"girla").play("girlaAnim").setScale(0.5).setSize(80);

        this.timedEvent=this.time.addEvent({
          delay:0,
          callback:this.moveUpDown,
          callbackScope:this,
          loop:false,
          });

        this.timedEvent=this.time.addEvent({
          delay:1000,
          callback:this.moveUpDown2,
          callbackScope:this,
          loop:false,
          });

        this.timedEvent=this.time.addEvent({
          delay:1500,
          callback:this.moveUpDown3,
          callbackScope:this,
          loop:false,
          });
  
        this.timedEvent=this.time.addEvent({
          delay:2000,
          callback:this.moveUpDown4,
          callbackScope:this,
          loop:false,
          });
  
        //key
        this.key2=this.physics.add.image(key.x,key.y,"key0").setScale(0.2);

        // collide property
        this.borderLayer.setCollisionByProperty({wall:true});
        this.cubicleLayer.setCollisionByProperty({wall:true});
        this.itemLayer.setCollisionByProperty({item:true});

        // What will collider witg what layers
        this.physics.add.collider(this.borderLayer,this.player);
        this.physics.add.collider(this.cubicleLayer,this.player);
        this.physics.add.collider(this.itemLayer,this.player);
        this.physics.add.overlap(this.key2,this.player,this.key2Get,null,this);
        this.physics.add.overlap(this.girl1,this.player,this.gotCaught,null,this);
        this.physics.add.overlap(this.girl2,this.player,this.gotCaught2,null,this);
        this.physics.add.overlap(this.girl3,this.player,this.gotCaught3,null,this);
        this.physics.add.overlap(this.girl4,this.player,this.gotCaught4,null,this);

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

          if(this.keys.toilet===0){
            this.key2.disableBody(true,true);
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

    moveUpDown(){
      this.tweens.timeline({
          targets: this.girl1,
          ease: "Linear",
          loop: -1,
          duration: 3000,
          tweens:[
              {
                  y: 334.62,
              },
              {
                  y: 122.54,
              },
          ],
      });
    }

    moveUpDown2(){
      this.tweens.timeline({
          targets: this.girl2,
          ease: "Linear",
          loop: -1,
          duration: 2500,
          tweens:[
              {
                  y: 334.62,
              },
              {
                  y: 122.54,
              },
          ],
      });
    }

    moveUpDown3(){
      this.tweens.timeline({
          targets: this.girl3,
          ease: "Linear",
          loop: -1,
          duration: 2000,
          tweens:[
              {
                  y: 334.62,
              },
              {
                  y: 122.54,
              },
          ],
      });
    }

    moveUpDown4(){
      this.tweens.timeline({
          targets: this.girl4,
          ease: "Linear",
          loop: -1,
          duration: 1500,
          tweens:[
              {
                  y: 334.62,
              },
              {
                  y: 122.54,
              },
          ],
      });
    }

    gotCaught(){
      this.girl1.disableBody(true,true);
      window.health--;
      console.log("got caught girl 1");
      this.player.x=122.27;
      this.player.y=265.44;
      this.healthDeductSound.play();
      this.girlSound1.play();
      console.log("health: "+window.health);
  }

  gotCaught2(){
    this.girl2.disableBody(true,true);
    window.health--;
    console.log("got caught girl 2");
      this.player.x=122.27;
      this.player.y=265.44;
      this.healthDeductSound.play();
      this.girlSound2.play();
      console.log("health: "+window.health);
}

gotCaught3(){
  this.girl3.disableBody(true,true);
  window.health--;
  console.log("got caught girl 3");
    this.player.x=122.27;
    this.player.y=265.44;
    this.healthDeductSound.play();
    this.girlSound1.play();
    console.log("health: "+window.health);
}

gotCaught4(){
  this.girl4.disableBody(true,true);
  window.health--;
  console.log("got caught girl 4");
    this.player.x=122.27;
    this.player.y=265.44;
    this.healthDeductSound.play();
    this.girlSound2.play();
    console.log("health: "+window.health);
}

    key2Get(player,key2){
      this.key2.disableBody(true,true);
      console.log("get key 2");
      this.keySound.play();
      if(this.keys.toilet===1){
       this.keys.all=this.keys.all+1;
       this.keys.toilet=0;
      }
    }

    worldRoom(player, tile) {
        console.log("exit toilet room");
        var player ={
            x:1247.22,
            y:439.92
        }
        this.scene.start("world", {
          player: player,
          keys: this.keys,
        });
      }

}
