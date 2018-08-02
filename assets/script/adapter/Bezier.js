/**
 * @author yangqi
 * @email txzm2018@gmail.com
 * @create date 2018-08-01 06:03:48
 * @modify date 2018-08-01 06:03:48
 * @desc [description]
*/
import BezierBuilder from '../../cyan/src/logic/trace/BezierBuilder';

function showLine(target, name, descriptor){
    const fn = descriptor.value;
    descriptor.value = function(){
        console.log(name);
        if(this._trace){
            const _node = cc.instantiate(this.node);
            _node.getComponent('Bezier').destroy();
            _node.parent = this.node.parent;
        }
        let ret = fn.apply(this, arguments);
        return ret;
    }
    return descriptor
}

cc.Class({
    extends: cc.Component,

    properties: {
        midPoints: [cc.Vec2],
        targetPos: cc.Vec2,
        duration: 60
    },

    start(){
        this.prepareTrace();
    },

    prepareTrace(){
        let pos = this.node.position;
        let mypoints = this.midPoints.slice();
        mypoints.unshift(pos);
        mypoints.push(this.targetPos);
        this._trace = BezierBuilder.getTraceFromNomalize(mypoints, this.duration);
    },

    // @showLine
    update(){
        if(this._trace){
            const pos = this._trace.nextPos();
            this.node.position = cc.v2(pos.x, pos.y);
        }
    }
});
