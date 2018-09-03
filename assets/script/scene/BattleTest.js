/**
 * @author yangqi
 * @email txzm2018@gmail.com
 * @create date 2018-09-03 04:42:10
 * @modify date 2018-09-03 04:42:10
 * @desc [description]
*/
cc.Class({
    extends: cc.Component,

    properties: {
        enemyEditBox: cc.EditBox,
        heroEditBox: cc.EditBox,
        tipsLabel: cc.Label,
        battleBtnNode: cc.Node,
    },

    onLoad(){
        this._defaultTips = '战斗未开始，点击战斗按钮开始战斗';
        this.tipsLabel.string = this._defaultTips;
        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            const pos = this.node.convertTouchToNodeSpaceAR(event.touch);
            if(this._placeFlag){
                this.addEntity(pos);
                this._placeFlag = false;
                this.tipsLabel.string = this._defaultTips;
            }
        });
    },

    onBattleReady(){
        const world = this.node.getComponent('ViewWorld');
        world.pause = false;
        this._defaultTips = '战斗进行中';
        this.tipsLabel.string = this._defaultTips;
        this.battleBtnNode.active = false;
    },

    addEntity(pos){
        const world = this.node.getComponent('ViewWorld');
        let entity = world.addConfigEnetity(this._toPlaceId, this._toPlaceCamp);
        entity.setPosition(pos);
        if(this._toPlaceCamp===1){
            entity.setHead(cc.v2(1, 0));
        }
        return entity;
    },

    addHero() {
        this._placeFlag = true;
        this.tipsLabel.string = '请放置英雄';
        this._toPlaceCamp = 1;
        this._toPlaceId = this.heroEditBox.string.trim();
    },

    addEnemy() {
        this._placeFlag = true;
        this.tipsLabel.string = '请放置敌人';
        this._toPlaceCamp = 2;
        this._toPlaceId = this.enemyEditBox.string.trim();
    },

    getRandPos(){
        const world = this.node.getComponent('ViewWorld');
        return cc.v2(world.randFunc(-this.node.width / 2 + 50, this.node.width / 2 - 50),
            world.randFunc(-this.node.height / 2 + 50, this.node.height / 2 - 50))
    }

});
