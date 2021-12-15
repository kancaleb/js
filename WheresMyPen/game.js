var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 48 * 30,
    height: 48 * 17,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
     scale: {
         mode: Phaser.Scale.FIT,
         autoCenter: Phaser.Scale.CENTER_BOTH
     },
    backgroundColor: '#4e53b5',
    pixelArt: true,
    scene: [preload, main, story1, story2, story3, story4, instruction, world, archive, meeting, toilet, gameover, gameend, needMoreKeys]
};

var game = new Phaser.Game(config);