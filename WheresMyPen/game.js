var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 48 * 30,
    height: 48 * 17,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
     scale: {
         mode: Phaser.Scale.FIT,
         autoCenter: Phaser.Scale.CENTER_BOTH
     },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [main, world, archive, meeting, toilet, gameover, gameend, needMoreKeys]
};

var game = new Phaser.Game(config);