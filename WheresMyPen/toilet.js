class toilet extends Phaser.Scene {

    constructor() {
        super({ key: 'toilet' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.keys = data.keys
    }

    preload() {
        this.load.tilemapTiledJSON('toilet', 'src/assets/toilet.json');

        // Preload any images here
        this.load.image("interiors", "src/assets/Interiors48x48.png");
        this.load.image("room", "src/assets/Room48x48.png");

        this.load.atlas('guy','assets/guy.png','assets/guy.json'); 
    }

    create() {
        console.log('*** toilet scene');
        
        // Create the map from main
        var map = this.make.tilemap({key:'toilet'});

        window.map=map;

        // Load the game tiles
        // 1st parameter is name in Tiled,
        // 2nd parameter is key in Preload
        let interiorsTiles = map.addTilesetImage("Interiors48x48","interiors");
        let roomTiles = map.addTilesetImage("Room48x48","room");

        // Load in layers by layers
        this.floorLayer = map.createLayer("floorLayer",[interiorsTiles,roomTiles],0,0);
        this.cubicleLayer = map.createLayer("cubicleLayer",[interiorsTiles,roomTiles],0,0);
        this.borderLayer = map.createLayer("borderLayer",[interiorsTiles,roomTiles],0,0);
        this.itemLayer = map.createLayer("itemLayer",[interiorsTiles,roomTiles],0,0);

        // set the boundaries of our game world
        this.physics.world.bounds.width=this.borderLayer.width;
        this.physics.world.bounds.height=this.borderLayer.height;

        //Object Layers
        var start = map.findObject("objectLayer", obj=>obj.name === "start");
        var key = map.findObject("objectLayer", obj=>obj.name === "key");

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
        this.girl1=this.physics.add.sprite(275,101.54,"girla").play("girlaAnim").setScale(0.5).setSize(80);
        this.girl2=this.physics.add.sprite(420,101.54,"girlb").play("girlbAnim").setScale(0.5).setSize(80);
        this.girl3=this.physics.add.sprite(564,101.54,"girlc").play("girlcAnim").setScale(0.5).setSize(80);
        this.girl4=this.physics.add.sprite(708,101.54,"girla").play("girlaAnim").setScale(0.5).setSize(80);

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

        // create the arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        // camera follow player
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);
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
    }

    key2Get(player,key2){
      this.key2.disableBody(true,true);
      console.log("get key 2");
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
