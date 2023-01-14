class SpriteSheet {
    constructor(src_file, spriteSize=16) {
        this.spriteSize = spriteSize;
        this.sheet = new Image()
        this.sheet.src = src_file;
    }
    draw(spriteLoc, x, y, flipx=false){
        let flipped = 1 - 2*flipx;
        if(flipx) {
            game.ctx.scale(-1,1);
        }
        game.ctx.drawImage(
            this.sheet,
            spriteLoc[0]*this.spriteSize,
            spriteLoc[1]*this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            flipped*x,
            y,
            flipped,
            1
        );
        if(flipx) {
            game.ctx.scale(-1,1);
        }
    }
    drawScaled(spriteLoc, x, y, scale, flipx=false){
        let flipped = 1 - 2*flipx;
        if(flipx) {
            game.ctx.scale(-1,1);
        }
        game.ctx.drawImage(
            this.sheet,
            spriteLoc[0]*this.spriteSize,
            spriteLoc[1]*this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            flipped*(x),
            y,
            flipped*scale,
            scale
        );
        if(flipx) {
            game.ctx.scale(-1,1);
        }
    }
    drawRotated(spriteLoc, x, y, angle, flipx=false, anchor='center'){
        game.ctx.save();
//        let flipped = 1 - 2*flipx;
        if(anchor == 'center') {
            anchor = [1/2,1/2];
        } else {
            anchor = [anchor[0], anchor[1]];
        }
        game.ctx.translate(x, y);
        game.ctx.rotate(angle * Math.PI / 180);
        if(flipx) {
            game.ctx.scale(-1,1);
        }
        game.ctx.translate(-anchor[0], -anchor[1]);
        game.ctx.drawImage(
            this.sheet,
            spriteLoc[0]*this.spriteSize,
            spriteLoc[1]*this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            0, //-game.tileSize+anchor[0],
            0, //-game.tileSize+anchor[1],
            1,
            1
        );
        game.ctx.restore();
    }
    drawRotatedMultitile(spriteLoc, x, y, angle, flipx=false, anchor='center'){ //same as drawRotated but spriteloc is 4-item array referencing the sprite location: [x,y,w,h]
        game.ctx.save();
        let tw = spriteLoc[2];
        let th = spriteLoc[3];
//        let flipped = 1 - 2*flipx;
        if(anchor == 'center') {
            anchor = [tw*1/2,th*1/2];
        } else {
            anchor = [anchor[0], anchor[1]];
        }
        game.ctx.translate(x + anchor[0], 
                        y + anchor[1]);
        game.ctx.rotate(angle * Math.PI / 180);
        if(flipx) {
            game.ctx.scale(-1,1);
        }
        game.ctx.translate(-anchor[0], -anchor[1]);
        game.ctx.drawImage(
            this.sheet,
            spriteLoc[0]*this.spriteSize,
            spriteLoc[1]*this.spriteSize,
            this.spriteSize*tw,
            this.spriteSize*th,
            0,
            0,
            tw,
            th
        );
        game.ctx.restore();
    }
}

//TODO: This can be deleted or replaced with something relevant to sneaky game
var monsterRowLocIds = {
    OneEye: 0,
    TwoEye: 1,
    Tank: 2,
    Eater: 3,
    Jester: 4,
}

var tileIds = {
    KioskScreen: [0,0],
    KioskDispenser: [0,1],
    Floor: [1,0],
    Wall: [2,0],
    Ledge: [3,0],
    Ladder: [4,0],
    Exit: [5,0],
    LockedExit: [6,0],
    TrapBlock: [7,0],
    Pillar: [8,0],
    Lights: [0,1],
    FlowerBox: [1,1],
    PlantBox: [1,2],
    TreeTop: [2,1],
    TrunkBox: [2,2],
    AppleTreeTop: [3,1],
    Trunk: [3,2],
    BerryBush: [4,1],
    Bush: [4,2],
    VineBranchRight: [5,1],
    VineUp: [5,2],
    VineRightUp: [6,1],
    VineLeftUp: [6,2],
    VineTerminator: [7,1],
    VineBranchLeft: [7,2],
    VineLeft: [10,2],
    VineRight: [11,2],
    PineBox: [8,1],
    VineBox: [8,2],
    PineTop: [9,1],
    PineMid: [9,2],
    WaterTankLeft: [10,1],
    WaterTankRight: [11,1],
    LockerClosed: [0,3],
    LockerOpen: [1,3],
    RazorWireLeft: [2,3],
    RazorWire: [3,3],
    RazorWireRight: [4,3],
    RazorWirePost: [5,3],
    ShotWall1: [6,3],
    ShotWall2: [7,3],
    BlastedLadder1: [8,3],
    BlastedLadder2: [9,3],
    BlastedWall1: [10,3],
    BlastedWall2: [11,3],
    Debris1: [12,3],
    BlastedPillar: [13,3],
    BluePrint: [0,4],
    Potions: [1,4],
    Burner: [2,4],
    Desk: [7,4],
    Chair: [8,4],
    CryoBottom: [3,4],
    CryoTop: [4,4],
    CryoMiddle: [5,4],
    SuspendedWiresPlatform: [6,4],
    SuspendedWiresVert: [6,5],
    SuspendedWiresEnd: [6,6],
    Dirt1: [0,5],
    Dirt2: [0,6],
    Dirt3: [1,6],
    Drill1: [1,5],
    Drill2: [2,6],
    Drill3: [3,6],
    DirtLeft: [2,5],
    DirtBottom: [3,5],
    DirtRight: [4,5],
    DirtTop: [5,5],

}

var entityItemIds = {
    Chips: [0,0],
    Energy: [1,0],
    Key: [2,0],
    LiveGrenade: [3,0],
    Shot1: [4,0],
    Shot2: [5,0],
    Shot3: [6,0],
    Boom: [7,0],
    Drone1: [8,0],
    Drone2: [9,0],
    Platform: [10,0],
    TrapBlade: [11,0],
    GunTurretBase: [12,0],
    GunTurretBarrel: [13,0],
    LiveRocket: [14,0],
    LiveVibroBlade: [15,0],
    Reticle: [16,0],
    Strike: [17,0],
    InventorySelector: [0,1],
    Gun: [1,1],
    Grenade: [2,1],
    Wrench: [3,1],
    JetPack: [4,1],
    Fist: [5,1],
    GrappleGun: [6,1],
    Glider: [7,1],
    Shotgun: [8,1],
    RocketLauncher: [9,1],
    Shield: [10,1],
    Drone: [11,1],
    VibroBlade: [12,1],
    AssaultRifle: [13,1],
    ClimbingGlove: [14,1],
    Boot1: [0,2],
    Boot2: [1,2],
    Boot3: [2,2],
    Health: [0,3],
    Pickup1: [1,3],
    Pickup2: [2,3],
    Frag: [30,0,2,2], // 2x2 texture
}

