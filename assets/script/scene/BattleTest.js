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
    },

    onLoad(){

    },

    addHero() {
        const world = this.node.getComponent('ViewWorld');
        let entity = world.addConfigEnetity(this.heroEditBox.string.trim(), 1);
        entity.setPosition(this.getRandPos());
        return entity;
    },

    addEnemy() {
        const world = this.node.getComponent('ViewWorld');
        let entity = world.addConfigEnetity(this.enemyEditBox.string.trim(), 2);
        entity.setPosition(this.getRandPos());
        return entity;
    },

    getRandPos(){
        const world = this.node.getComponent('ViewWorld');
        return cc.v2(world.randFunc(-this.node.width / 2 + 50, this.node.width / 2 - 50),
            world.randFunc(-this.node.height / 2 + 50, this.node.height / 2 - 50))
    }

});
