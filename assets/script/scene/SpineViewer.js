/**
 * @author yangqi
 * @email txzm2018@gmail.com
 * @create date 2018-08-06 11:36:29
 * @modify date 2018-08-06 11:36:29
 * @desc [description]
*/
cc.Class({
    extends: cc.Component,

    properties: {
        role: sp.Skeleton,
        nextBtn: cc.Button,
        prevBtn: cc.Button,
        animName: cc.Label
    },

    onLoad(){
        this.initAnims();
        this.runAnim();
    }, 

    initAnims(){
        this.animIndex = 0;
        this.anims = Object.keys(this.role.skeletonData.skeletonJson.animations);
    },

    runAnim(){
        const anim = this.anims[this.animIndex];
        this.role.setAnimation(0, anim, true);
        this.animName.string = anim;
    },

    onClickPrev(){
        this.animIndex--;
        if(this.animIndex < 0){
            this.animIndex = this.anims.length - 1;
        }
        this.runAnim();
    },

    onClickNext() {
        this.animIndex++;
        if (this.animIndex >= this.anims.length) {
            this.animIndex = 0;
        }
        this.runAnim();
    }

});
