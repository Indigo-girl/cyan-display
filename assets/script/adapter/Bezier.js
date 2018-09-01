/**
 * @author yangqi
 * @email txzm2018@gmail.com
 * @create date 2018-08-01 06:03:48
 * @modify date 2018-08-01 06:03:48
 * @desc [description]
*/
import BezierBuilder from '../../cyan/src/view/trace/BezierBuilder';

// 所有的测试注解发布后都会被移除
function test(target, name, descriptor){
    const fn = descriptor.value;
    descriptor.value = function(){
        if(this.showTrace && this._trace){
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
        midPoints: {
            type: [cc.Vec2],
            default: [],
            tooltip: '贝塞尔曲线的中间点(不包含起点和终点),使用以起点到终点的方向为x轴正方向,以起点到终点的长度为单位向量长度构建的坐标系'
        },
        targetPos: cc.Vec2,
        duration: 60,
        showTrace: false
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

    @test
    update(){
        if(this._trace){
            const pos = this._trace.nextPos();
            this.node.position = cc.v2(pos.x, pos.y);
        }
    }
});
