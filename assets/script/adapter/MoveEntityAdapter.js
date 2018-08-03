/**
 * @author yangqi
 * @email txzm2018@gmail.com
 * @create date 2018-08-03 11:33:36
 * @modify date 2018-08-03 11:33:36
 * @desc [description]
*/
import MoveEntity from '../../cyan/src/logic/entity/MoveEntity';
import GeoInfo from '../../cyan/src/logic/info/GeoInfo';
import Vec2 from '../../cyan/src/logic/utils/vec2';

cc.Class({
    extends: cc.Component,

    properties: {
        head: cc.Vec2,
        maxSpeed: 10,
        target: cc.Node
    },

    onLoad () {
        const geo = new GeoInfo(this.node.position, this.head, this.maxSpeed);
        this.moveEntity = new MoveEntity(geo);
    },

    update (dt) {
        if (this.target && cc.isValid(this.target)) {
            let force = this.moveEntity.seek(new Vec2(this.target.x, this.target.y));
            this.moveEntity.calculate(force);
        }
        this.moveEntity.update();
        this.node.x = this.moveEntity.geoInfo.pos.x;
        this.node.y = this.moveEntity.geoInfo.pos.y;
    },
});
