
//610

var game = new Phaser.Game(1024,768,Phaser.AUTO);
var deltaTime=0.016;

document.addEventListener('contextmenu',function()
{
    event.preventDefault();
})

class Player
{
    constructor()
    {
        this.player = game.add.sprite(30,412,'player');
        
        this.killPoint=0;
        this.hand=0;
        this.inHand=0;

        this.isPickUpAR=0;
        this.isPickUpSG=0;
        this.isPickUpSR=0;
    }

    move()
    {    
        if((TEST.AKey.isDown || TEST.aKey.isDown) && this.player.x>0)
        {
           this.player.x-=10;
        }
        if((TEST.DKey.isDown || TEST.dKey.isDown) && this.player.x + this.player.width < game.width)
        {
            this.player.x+=10;
        }

    }

    changeWeapon()
    {
        if(this.inHand==3)
        {
            this.inHand=0;
        }
        else if(this.inHand==0)
        {
            if(this.isPickUpAR==1)
                this.inHand=1;
            else if(this.isPickUpSG==1)
                this.inHand=2;
            else if(this.isPickUpSR==1)
                this.inHand=3;
        }
        else if(this.inHand==1)
        {
            if(this.isPickUpSG==1)
                this.inHand=2;
            else if(this.isPickUpSR==1)
                this.inHand=3;
            else
                this.inHand=0;
        }
        else if(this.inHand==2)
        {
            if(this.isPickUpSR==1)
                this.inHand=3;
            else
                this.inHand=0;
        }
              
    }
}


class HG
{
    constructor(_x,_y)
    { 
        this.x =_x+56;
        this.y =_y+60;

        this.hand= game.add.sprite(this.x,this.y,'HG');
    }
    move(_x,_y)
    {
        this.hand.x=_x+56;
        this.hand.y=_y+60;
    }
}

class AR
{
    constructor(_x,_y)
    {
        this.x =_x+56;
        this.y =_y+60;

        this.hand = game.add.sprite(this.x,this.y,'AR');
    }
    move(_x,_y)
    {
        this.hand.x=_x-10;
        this.hand.y=_y+60;
    }
}

class SG
{
    constructor(_x,_y)
    {
        this.x =_x-17;
        this.y =_y+68;

        this.hand = game.add.sprite(this.x,this.y,'SG');
    }
    move(_x,_y)
    {
        this.hand.x=_x-17;
        this.hand.y=_y+68;
    }
}

class SR
{
    constructor(_x,_y)
    {
        this.x =_x-10;
        this.y =_y+60;

        this.hand = game.add.sprite(this.x,this.y,'SR');
    }
    move(_x,_y)
    {
        this.hand.x=_x-10;
        this.hand.y=_y+60;
    }
}

class Boss
{
    
}

var TEST = {
    preload: function()
    {

        game.load.audio('Map','assets/Map.mp3');

        game.load.image('BG','assets/BG.png');
        game.load.image('BGboss','assets/BGboss.png');   
        
        game.load.image('player','assets/playerArms.png');
        game.load.image('Tank','assets/Tank2.png');
        game.load.image('MommySon','assets/MommySonNew.png');
        game.load.image('Boss','assets/Boss.png');
        game.load.image('enemy','assets/enemyP.png');

        game.load.image('enemyB','assets/enemyB.png');
        game.load.image('enemyC','assets/enemyC.png');
        game.load.image('enemyS','assets/enemyS.png');

        game.load.image('SGbullet','assets/SGbulletNew.png');
        game.load.image('SRbullet','assets/SRbulletNew.png');
        game.load.image('ARbullet','assets/ARbulletNew.png');

        game.load.image('bulletHG','assets/bulletHG.png');
        game.load.image('bulletSP','assets/bulletSP.png');
        game.load.image('bulletSPnew','assets/bulletSPnew.png');
        game.load.image('k','assets/k.png');

        game.load.image('HG','assets/Magnum.png');
        game.load.image('SG','assets/Shotgun.png');
        game.load.image('SR','assets/AWP.png');
        game.load.image('AR','assets/AR1.png');

        game.load.image('Aim','assets/Aim.png');
        game.load.image('floor','assets/floor.png');
        
        game.load.image('Bullet5','assets/Bullet5.png');
        game.load.image('Bullet30','assets/Bullet30.png');
        
        game.load.image('StartGame','assets/StartGame.png');
        game.load.image('HowtoGame','assets/HowtoGame.png');
        game.load.image('zozac','assets/zozac.png');
        
        game.load.image('Egg','assets/Egg.png');

    },
    create: function()
    {  
    
        this.BGM = game.add.audio('Map');
        this.BGM.loopFull(); 

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 500;

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        this.WKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.AKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.SKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.DKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.cKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
        
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.randomSpawn;
        
        this.aimX;
        this.aimY;

        this.bulletList = []; 
        this.bulletSList = [];
        this.bulletSRList = [];
        this.enemyList = [];
        this.effectList = [];
        this.dropAR = [];
        this.dropSG = [];
        this.dropSR = [];

        this.textList = [];

        this.bulletHG=6;
        this.bulletAR=30;
        this.bulletSG=5;
        this.bulletSR=5;
        this.p=0;
        this.z=0;
       

        this.floorGroup = game.add.group();
        this.floorGroup.enableBody = true;
        this.floorGroup.physicsBodyType = Phaser.Physics.ARCADE;

        for(let i=0;i<10;i++)
        {
            let temp = this.floorGroup.create(i*120,610,'floor');
            temp.body.allowGravity = false;
            temp.body.immovable = true;
        }
        this.bg1 = game.add.sprite(0,0,'BG');
        this.bg2 = game.add.sprite(1024,0,'BG');

        this.player = new Player();
        game.physics.enable(this.player,Phaser.Physics.ARCADE);

        this.tank = game.add.sprite(this.player.player.x,this.player.player.y,'Tank');

        this.aim = game.add.sprite(this.aimX,this.aimY,'Aim');
        this.aim.anchor.setTo(0.5);
        this.aim.kill();


        this.makeWeapon();

        this.e=1300;
        this.randomSpawn;
        this.tanfur;
        this.tansok;

        this.makeEnemyC();

        this.isDropAR=0;
        this.isDropSG=0;
        this.isDropSR=0;
       
        this.bulletEtime=0;
        this.bulletAREtime=0;
        this.bulletSGEtime=0.5;
        this.bulletSREtime=0.5;
        this.enemyEtime=0; 
        this.bossEtime=0; 

        this.bulletGroup=game.add.group();
        this.temp=0;
        this.p=0;
        this.q=0;
       
        this.style = {font:"40px Arial",fill:"#ffffff"}
        this.styleR = {font:"40px Arial",fill:"#0000ff"}
        this.styleB = {font:"70px Arial",fill:"#00ffff"}
        this.styleT = {font:"30px Arial",fill:"#0000ff"}
        this.styleC = {font:"50px Arial",fill:"#ffff00"}

        this.textbox;
        this.tip;
        this.effectList=[];
        

        game.input.keyboard.onUpCallback = function(e)
        {
            if(e.keyCode == Phaser.Keyboard.Z)
            {
                TEST.player.changeWeapon();
                TEST.makeWeapon();
            }
        }

       this.textbox = game.add.text(450,620,"Reloading...",this.styleR);
       this.textbox.kill();

       this.textR = game.add.text(600,700,"",this.style);
       this.textR.kill();

       this.textB = game.add.text(570,750,"",this.styleB);
       this.textB.kill();
       this.textB.anchor.setTo(1);


    },
    update: function()
    {
        this.bg();
        this.player.move();
        this.moveTank();
        this.player.hand.move(this.player.player.x,this.player.player.y);

        this.makeEnemy();
        this.enemyManager();
        this.shootManager();

         if(this.player.inHand==2)
            this.bulletSManager();
        else if(this.player.inHand==3)
            this.bulletSRManager();
        else 
            this.bulletManager();

        this.pickUp();
        this.effectManager();

    },
    bg()
    {
        this.bg1.x-=5;
        this.bg2.x-=5;
        if(this.bg2.x<=0)
        {
            this.bg1.x=0;
            this.bg2.x=1024;
        }
        game.world.bringToTop(this.aim);
        if(this.player.inHand!=3)
            this.aim.kill();
        this.aimX = game.input.activePointer.position.x;
        this.aimY = game.input.activePointer.position.y;
        this.aim.x = this.aimX;
        this.aim.y =this.aimY;
        if(this.player.killPoint>29)
            this.bossEtime+=deltaTime;
        if(this.player.killPoint>30 && this.bossEtime>10)
            game.state.start('Clear');
    },
    pickUp()
    {
        let i = 0;
        let t=0;
        if(this.isDropAR==1 && this.player.player.x+this.player.player.width > this.dropAR[i].x)
        {
            this.dropAR[i].destroy();
            this.player.isPickUpAR=1;
            t++;
        }
        if(this.isDropSG==1 && this.player.player.x+this.player.player.width > this.dropSG[i].x)
        {
            this.dropSG[i].destroy();
            this.player.isPickUpSG=1;
            t++;
        }
        if(this.isDropSR==1 && this.player.player.x+this.player.player.width > this.dropSR[i].x)
        {
            this.dropSR[i].destroy();
            this.player.isPickUpSR=1;
            t++;
        }

        if(t==1)
            this.tip = game.add.text(200,0,"tip : If you press Z, you can change your weapon.",this.styleT);
            
    },
    makeEnemy()
    {
        this.randomSpawn = Math.random();
        if(this.enemyList==0)
        {
            this.e=1300;
            if(this.player.killPoint<30)
            {
                this.randomEnemy();
            }
            else 
            {
                this.bossEnemy();
            }
                
        }
    },
    bossEnemy()
    {
        let boss = this.game.add.sprite(this.e,320,'MommySon')
        game.physics.enable(boss,Phaser.Physics.ARCADE);
        boss.body.allowGravity=false;
        this.enemyList.push(boss);
        boss.body.velocity.x=-360;
        this.e+=200;
        this.hp=100;
    },

    randomEnemy()
    {
        if(this.randomSpawn>0.67)
            this.makeEnemyB();
        else if(this.randomSpawn>0.33)
            this.makeEnemyC();
        else
            this.makeEnemyS();
    },

    makeEnemyB()
    {  
        let enemy1 = this.game.add.sprite(this.e,470,'enemyB')
        game.physics.enable(enemy1,Phaser.Physics.ARCADE);
        enemy1.body.allowGravity=false;
        this.enemyList.push(enemy1);
        enemy1.body.velocity.x=-350;
        this.e+=200;
    }, 
    makeEnemyC()
    {  
        let enemy1 = this.game.add.sprite(this.e,470,'enemyC')
        game.physics.enable(enemy1,Phaser.Physics.ARCADE);
        enemy1.body.allowGravity=false;
        this.enemyList.push(enemy1);
        enemy1.body.velocity.x=-350;
        this.e+=200;
    }, 
    makeEnemyS()
    {  
        let enemy1 = this.game.add.sprite(this.e,470,'enemyS')
        game.physics.enable(enemy1,Phaser.Physics.ARCADE);
        enemy1.body.allowGravity=false;
        this.enemyList.push(enemy1);
        enemy1.body.velocity.x=-350;
        this.e+=200;
    },
    enemyManager()
    {
        for(let i=0;i<this.enemyList.length;i++)
        {
            let p = this.player.player;
            let e = this.enemyList[i];

            if(p.x+p.width+20>e.x)
                game.state.start('GameOverScene');
        }

    },

    shoot()
    {
        let b = this.game.add.sprite(this.player.hand.hand.x+70,this.player.hand.hand.y,'bulletHG');

        game.physics.enable(b,Phaser.Physics.ARCADE);

        this.bulletList.push(b);
        b.body.velocity.x=400000;
        b.body.velocity.y=10;
        this.bulletHG-=1;
    },
    shootA()
    {
        let b = this.game.add.sprite(this.player.hand.hand.x+175 ,this.player.hand.hand.y+8,'bulletHG');

        game.physics.enable(b,Phaser.Physics.ARCADE);

        //b.body.allowGravity=false;
        this.bulletList.push(b);
        b.body.velocity.x=500000;
        b.body.velocity.y=10;
        this.bulletAR-=1;

    }, 
    shootS()
    {
        let b = this.game.add.sprite(this.player.hand.hand.x+130 ,this.player.hand.hand.y,'bulletSPnew');
        b.scale.setTo(0.3);

        game.physics.enable(b,Phaser.Physics.ARCADE);

        b.body.allowGravity=false;
        this.bulletSList.push(b);
        b.body.velocity.x=this.tansok+5000;
        b.body.velocity.y=this.tanfur;

    },
    shootSR()
    {
        let b = this.game.add.sprite(this.aim.x,this.aim.y,'k');
        game.physics.enable(b,Phaser.Physics.ARCADE);

        b.body.allowGravity=false;
        this.bulletSRList.push(b);
        this.bulletSR-=1;
    },
    shotgunbullet()
    {
        for(let i=0;i<9;i++)
        {
            let t1 = Math.random();
            this.tanfur = Math.random()*200;

            if(t1>0.5)
            {
                this.tanfur*=-1;
            }
            this.tansok = Math.random()*1000;

            this.shootS();
        }
        this.bulletSG-=1;
    },    

    
    shootManager()
    {    
        if(this.player.inHand==0)
        {
            this.textB.revive();
            this.textB.setText(""+this.bulletHG);
            this.textR.revive();
            this.textR.setText("/6");
           
            if(this.bulletHG==0 && this.p==0)
            { 
                this.textbox.revive();
                this.bulletEtime=-1.0;
                this.p=1;
            }
            else if(this.p==1 && this.bulletEtime>0.3)
            {
                this.bulletHG=6;
                this.textbox.kill();
            }
                
            this.bulletEtime+=deltaTime;
            
            if(this.spaceKey.isDown && this.bulletEtime>0.4 && this.bulletHG>0)
            {
                this.shoot();
                this.bulletEtime=0;
                this.p=0;
            }
        }

        if(this.player.inHand==1)
        {
            this.textB.revive();
            this.textB.setText(""+this.bulletAR);
            this.textR.revive();
            this.textR.setText("/30");
            
            if(this.bulletAR==0 && this.p==0)
            {
                this.textbox.revive();
                this.bulletAREtime=-1.5;
                this.p=1;
            }
            else if(this.p==1 && this.bulletAREtime>0.1)
            {
                this.textbox.kill();
                this.bulletAR=30;
            }
            this.bulletAREtime+=deltaTime;
            if(this.spaceKey.isDown && this.bulletAREtime>0.11 && this.bulletAR>0)
            {
                this.shootA();
                this.bulletAREtime=0;
                this.p=0;
                let temp = game.add.image(this.player.hand.hand.x+35,this.player.hand.hand.y+7,'ARbullet');
                temp.anchor.setTo(0.5);
                this.effectList.push(temp);
            }
        }

        if(this.player.inHand==2)
        {
            this.textB.revive();
            this.textB.setText(""+this.bulletSG);
            this.textR.revive();
            this.textR.setText("/5")
            if(this.bulletSG==0 && this.p==0)
            {
                this.textbox.revive();
                this.bulletSGEtime=-1.5;
                this.p=1;
                
            }
            else if(this.p==1 && this.bulletSGEtime>0.8)
            {
                this.textbox.kill();
                this.bulletSG=5;
            }
            this.bulletSGEtime+=deltaTime;
            if(this.spaceKey.isDown && this.bulletSGEtime>1 && this.bulletSG>0)
            {
                this.shotgunbullet();
                this.bulletSGEtime=0;
                this.p=0;
                let temp = game.add.image(this.player.hand.hand.x+54,this.player.hand.hand.y+2,'SGbullet');
                temp.anchor.setTo(0.5);
                this.effectList.push(temp);
                this.z=0;
            }
        }
        if(this.player.inHand==3)
        {
            this.textB.revive();
            this.textB.setText(""+this.bulletSR);
            this.textR.revive();
            this.textR.setText("/5")
            if(this.bulletSR==0 && this.p==0)
            {
                this.textbox.revive();
                this.bulletSREtime=-1.5;
                this.p=1;
                
            }
            else if(this.p==1 && this.bulletSREtime>0.8)
            {
                this.textbox.kill();
                this.bulletSR=5;
            }
            this.bulletSREtime+=deltaTime;

            
            if(game.input.activePointer.rightButton.isDown)
            {
                this.aim.revive();
                if(game.input.activePointer.leftButton.isDown && this.bulletSREtime>1 && this.bulletSR>0)
                {
                    this.bulletSREtime=0;
                    this.p=0;
                    let temp = game.add.image(this.player.hand.hand.x+30,this.player.hand.hand.y+20,'SRbullet');
                    temp.anchor.setTo(0.5);
                    this.effectList.push(temp); 
                    this.shootSR();
                }
            }
            else if(!game.input.activePointer.rightButton.isDown)
            {
                this.aim.kill();
            }
            
        }
    },


    bulletManager()
    {
      
        for(let j=0;j<this.enemyList.length;j++)
        {  
           
            for(let i=0;i<this.bulletList.length;i++)
            { 
                let e = this.enemyList[j];
                let b = this.bulletList[i]; 
                
                if(this.bulletList[i]==0 || this.enemyList[j]==0)
                    break;  
                if(this.bulletList[i]!=0)
                {
                    if(this.bulletList[i].x>1024)
                    {
                        this.bulletList[i].destroy();
                        this.bulletList.splice(i,1);
                        i--;
                        continue;
                    }
                }
                if(b.x <= e.x + e.width && b.x + b.width >= e.x && b.y <= e.y + e.height && b.y + b.height >= e.y)
                {
                    this.weaponDrop(j);

                    if(this.enemyList!=0)
                    {
                        this.enemyList[j].destroy();
                        this.enemyList.splice(j,1);
                        j--;
                    }
                    if(this.bulletList!=0)
                    {
                        this.bulletList[i].destroy();
                        this.bulletList.splice(i,1);
                        i--;
                    } 
                   
                    this.player.killPoint+=1;

                }
              

            }
            
                
        }

    },
    bulletSManager()
    {
        let i=0;
        let b=this.bulletList[i];

        for(let k=0;k<this.bulletSList.length;k++)
        {  
            
            for(let j=0;j<this.enemyList.length;j++)
            {
                let e = this.enemyList[j];
                let s = this.bulletSList[k];
                
                if(this.bulletSList[k]==0 || this.enemyList[j]==0)
                    break;  
                
                if(this.bulletSList[k]!=0 && this.enemyList[j]!=0)
                {
                    if(s.x <= e.x + e.width && s.x + s.width >= e.x && s.y <= e.y + e.height && s.y + s.height >= e.y)
                    {
                        this.weaponDrop(j);

                        if(this.bulletSList!=0)
                        {
                            for(let q=0;q<this.bulletSList.length;q++)
                            {
                                this.bulletSList[q].destroy();
                                this.bulletSList.splice(q,1);
                                q--;
                            }
                        }
                        if(this.enemyList!=0)
                        {
                            this.enemyList[j].destroy();
                            this.enemyList.splice(j,1);
                            j--;
                        }
                           
                        this.player.killPoint+=1;
                    }
                } 
                else if(this.bulletSList[k]!=0)
                {
                    if(this.bulletSList[k].x>1024)
                    {
                        this.bulletSList[k].destroy();
                        this.bulletSList.splice(k,1);
                        k--;
                        continue;
                    }
                }
 
            }
        }
    },
    bulletSRManager()
    {
        for(let j=0;j<this.enemyList.length;j++)
        {   
            for(let i=0;i<this.bulletSRList.length;i++)
            { 
                let e = this.enemyList[j];
                let b = this.bulletSRList[i]; 
                
                if(this.bulletSRList[i]==0 || this.enemyList[j]==0)
                    break;  

                if(b.x <= e.x + e.width-3 && b.x + b.width >= e.x+40 && b.y <= e.y + e.height && b.y + b.height >= e.y)
                {
                    this.weaponDrop(j);

                    if(this.enemyList!=0)
                    {
                        this.enemyList[j].destroy();
                        this.enemyList.splice(j,1);
                        j--;
                    }
                    if(this.bulletSRList!=0)
                    {
                        this.bulletSRList[i].destroy();
                        this.bulletSRList.splice(i,1);
                        i--;
                    } 
                   
                    this.player.killPoint+=1;

                }
                else  
                {
                    this.bulletSRList[i].destroy();
                    this.bulletSRList.splice(i,1);
                    i--;
                }
              

            }
            
                
        }
    },
   
  
    effectManager()
    {
        for(let i=0;i<this.effectList.length;i++)
        {
            this.effectList[i].y+=500*game.time.physicsElapsed;
            this.effectList[i].x-=10;
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
    weaponDrop(j)
    {  
        this.randomSpawn=Math.random();
        if(this.enemyList[j].x+this.enemyList[j].width<1024)
        {
            let e = this.enemyList[j];
            if(this.isDropAR==0 && this.randomSpawn<0.1)
            {
                let o = this.game.add.sprite(e.x+20,e.y+50,'AR');
                this.dropAR.push(o);
                this.isDropAR=1;
            }
            else if(this.isDropSG==0 && this.randomSpawn>0.1 && this.randomSpawn<0.2)
            {
                let o = this.game.add.sprite(e.x+20,e.y+50,'SG');
                this.dropSG.push(o);
                this.isDropSG=1;
            }
            else if(this.isDropSR==0 && this.randomSpawn>0.2 && this.randomSpawn<0.3)
            {
                let o = this.game.add.sprite(e.x+100,e.y+20,'SR');
                this.dropSR.push(o);
                this.isDropSR=1;
            }
        }
    },

    makeWeapon : function()
    {
        if(this.player.hand.hand!=undefined)
            this.player.hand.hand.destroy();

        if(this.player.inHand==0) 
        {       
            this.player.hand = new HG(this.player.player.x,this.player.player.y);
           
        }

        if(this.player.inHand==1)
        {       
            this.player.hand = new AR(this.player.player.x,this.player.player.y);
            
        }

        if(this.player.inHand==2)
        {
            this.player.hand = new SG(this.player.player.x,this.player.player.y);
           
        }   

        if(this.player.inHand==3)
        {  
            this.player.hand = new SR(this.player.player.x,this.player.player.y);
            
        }
    },
    moveTank()
    {
        this.tank.x=this.player.player.x-39;
        this.tank.y=this.player.player.y+85;
    },
    
};

var TitleScene =
{
    preload:function()
    {
        game.load.image('S1','assets/StartSceneFirst.png');
        game.load.image('S2','assets/StartSceneSecond.png');
        game.load.image('S3','assets/StartSceneThird.png');
        game.load.image('S4','assets/StartSceneFourth.png');
    },
    create:function()
    {
        this.scene = game.add.sprite(100,100,'S1');
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.sceneNumber=1;

        if(TEST.BGM!=undefined)
            TEST.BGM.destroy();

        game.input.keyboard.onUpCallback = function(e)
        {
            if(e.keyCode == 32)
            {
                TitleScene.set();
            }
        }
    },
    update:function()
    {
        
    },
    set:function()
    {
        if(this.sceneNumber==1)
        {
            this.scene = game.add.sprite(100,100,'S2');
            this.sceneNumber++;
        }
        else if(this.sceneNumber==2)
        {
            this.scene = game.add.sprite(100,100,'S3');
            this.sceneNumber++;
        }
        else if(this.sceneNumber==3)
        {
            this.scene = game.add.sprite(100,100,'S4');
            this.sceneNumber++;
        }
        else if(this.sceneNumber==4)
            game.state.start('TEST');
    }
}
var GameOverScene =
{
    preload:function()
    {
        game.load.image('GameOverScene','assets/GameOverScene.png');
    },
    create:function()
    {
        this.scene = game.add.sprite(120,100,'GameOverScene');
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        game.input.keyboard.onUpCallback = function(e)
        {
            if(e.keyCode == 32)
            {
                game.state.start('TitleScene',TitleScene);
            }
        }
    },
    update:function()
    {
        
    }
}
var Clear =
{
    preload:function()
    {
        game.load.image('C1','assets/C1.png');
        game.load.image('C2','assets/C2.png');
        game.load.image('TFP','assets/TFP.png');
    },
    create:function()
    {
        this.sceneNumber=1;
        this.scene = game.add.sprite(0,0,'C1');
        this.scene.scale.setTo(1.3);
        this.ss = game.add.sprite(2000,2000,'TFP');
        this.eTime=0;
       

        game.input.keyboard.onUpCallback = function(e)
        {
            if(e.keyCode == 13)
            {
               Clear.set();
               Clear.sceneNumber++;
               

            }
            if(e.keyCode == 32 && Clear.eTime>9)
            {
               game.state.start('TitleScene');
            }
        }
    },
    update:function()
    {
        this.eTime+=deltaTime; 
        if(this.eTime<9)
        this.ss.alpha+=0.1*game.time.physicsElapsed;

    },
    set:function()
    {
        this.scene = game.add.sprite(0,0,'C2');
        this.scene.scale.setTo(2); 

        this.ss.x=500;
        this.ss.y=500;
        this.ss = game.add.sprite(500,300,'TFP');
        this.ss.alpha=0;
        this.ss.anchor.setTo(0.5);
       
        
    }
}
game.state.add('TitleScene',TitleScene);
game.state.add('TEST',TEST);
game.state.add('GameOverScene',GameOverScene);
game.state.add('Clear',Clear);

game.state.start('TitleScene');





























































