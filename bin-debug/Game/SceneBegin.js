var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.btn_begin = new eui.Button();
        _this.btn_setting = new eui.Button();
        _this.skinName = "src/Game/SceneBeginSkin.exml";
        _this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_begin, _this);
        _this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_setting, _this);
        console.log("asdfsd");
        // 开始播放背景音乐
        SoundMenager.Shared().PlayBGM();
        return _this;
    }
    SceneBegin.Shared = function () {
        if (SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    SceneBegin.prototype.onclick_begin = function () {
        console.log("game begin!");
        // 开始播放点击音乐
        SoundMenager.Shared().PlayClick();
        this.parent.addChild(SceneLevels.Shared());
        // 点击进入游戏的时候把当前界面移除
        this.parent.removeChild(this);
    };
    // 设置按钮的回调
    SceneBegin.prototype.onclick_setting = function () {
        SoundMenager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    };
    // 单例
    SceneBegin.shared = new SceneBegin();
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin");
//# sourceMappingURL=SceneBegin.js.map