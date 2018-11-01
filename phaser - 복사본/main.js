    var width = 800;
var height = 600;
var game = new Phaser.Game(width,height,Phaser.AUTO);

var TEST = 
{
    preload : function()
    {
        game.load.audio('BGM','assets/BGM.mp3');

        game.load.image('player','assets/playerP.png');
        game.load.image('floor','assets/floor.png');
        game.load.image('itemBox','assets/itemBox.png');
        game.load.image('background','assets/background.png');
        game.load.image('effect','assets/effect.png');
    },
    create : function()
    {
        this.BGM = game.add.audio('BGM');
        this.BGM.loopFull();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 1000;

        game.add.tileSprite(0,0,1600,900,'background');
        game.world.setBounds(0,0,1600,900);

        this.player = game.add.sprite(200,300,'player');
        this.player.scale.setTo(0.5);
        game.physics.enable(this.player,Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds=true;

        this.floorGroup = game.add.group();
        this.floorGroup.enableBody = true;
        this.floorGroup.physicsBodyType = Phaser.Physics.ARCADE;
        for(let i=0;i<4;i++)
        {
            let temp = this.floorGroup.create(i*100,450,'floor');
            temp.body.allowGravity = false;
            temp.body.immovable = true;
        }
        this.itemBox = game.add.sprite(0,200,'itemBox');
        this.itemBox.scale.setTo(0.5);
        game.physics.enable(this.itemBox,Phaser.Physics.ARCADE);
        this.itemBox.body.allowGravity = false;
        this.itemBox.body.immovable=true;

        this.style = {font:"50px Arial",fill:"#000"};
        this.textbox = game.add.text(0,0,"Item : 0",this.style);
        this.textbox.fixedToCamera=true;
        this.itemNum=0;

        game.camera.follow(this.player,
            Phaser.Camera.FOLLOW_LOCKON,0.1,0.1);
        this.effectList=[];
        

    },
    update : function()
    {
        game.physics.arcade.collide(this.player,this.floorGroup);
        game.physics.arcade.collide(this.player,this.itemBox,
            function(p,i)
            {
                if(p.body.touching.up && i.body.touching.down)
                {
                   this.itemNum++;
                   this.textbox.setText("Item : "+this.itemNum);
                   let temp = game.add.image(i.x+i.width/2,i.y,'effect');
                   temp.anchor.setTo(0.5);
                   this.effectList.push(temp);
                }
            },null,this);
        this.player.body.velocity.x=0;
        if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.player.body.velocity.x-=500;
            
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {   
            this.player.body.velocity.x+=500;
            
            
        }

        /*else
        {
            this.player.body.velocity.x*=0.8;
            if(Math.abs(this.player.body.velocity.x)<=0.1)
                this.player.body.velocity.x=0;
        }*/

        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
        && this.player.body.touching.down)
        {
            this.player.body.velocity.y-=550;
        }
        for(let i=0;i<this.effectList.length;i++)
        {
            this.effectList[i].y-=150*game.time.physicsElapsed;
            this.effectList[i].alpha-=1.5*game.time.physicsElapsed;
            this.effectList[i].rotation-=2*Math.PI*game.time.physicsElapsed;
            if(this.effectList[i].alpha<0.1)
            {
                this.effectList[i].destroy();
                this.effectList.splice(i,1);
                i--;
            }
            
        }

    },

};
game.state.add('TEST',TEST);
game.state.start('TEST');

