/**
 * @author yangqi
 * @email txzm2018@gmail.com
 * @create date 2018-08-14 03:06:49
 * @modify date 2018-08-14 03:06:49
 * @desc [description]
*/
import ViewEntity from '../../cyan/src/view/ViewEntity';
import LogicWorld from '../../cyan/src/lib/LogicWorld';
import pubfunc from '../../cyan/src/logic/utils/pubfunc';

cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    
    ctor(){
        this._entitys = [];
    },

    onLoad () {
        const size = this.node.getContentSize();
        const world = new LogicWorld(size, size, cc.v2(-size.width/2 , -size.height/2), 1);
        pubfunc.setWorld(world);
        const entity = new ViewEntity({}, 'KM/KM', this.node);
        entity.setHead(cc.v2(1, 0));
        this._entitys.push(entity);

        this.node.on(cc.Node.EventType.TOUCH_END, (event)=>{
            const pos = this.node.convertTouchToNodeSpaceAR(event.touch);
            entity.handleEvent({
                type: 'moveToPos',
                detail: pos
            });
        });
    },

    update(){
        for(const entity of this._entitys){
            entity.update();
        }
    },


});
