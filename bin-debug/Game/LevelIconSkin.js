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
var LevelIconSkin = (function (_super) {
    __extends(LevelIconSkin, _super);
    function LevelIconSkin() {
        var _this = _super.call(this) || this;
        _this.lb_level = new eui.Label();
        _this.p = new Promise(function (resolve) {
            _this.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
        _this.skinName = "src/Game/LevelIconSkin.exml";
        return _this;
    }
    Object.defineProperty(LevelIconSkin.prototype, "Level", {
        // 使用get和set创建了一个属性来标记关卡数字
        get: function () {
            return parseInt(this.lb_level.text);
        },
        set: function (value) {
            var _this = this;
            this.p.then(function () {
                console.log(_this.lb_level.text);
                _this.lb_level.text = value.toString();
                console.log(_this.x, _this.lb_level.text);
            });
        },
        enumerable: true,
        configurable: true
    });
    return LevelIconSkin;
}(eui.Button));
__reflect(LevelIconSkin.prototype, "LevelIconSkin");
//# sourceMappingURL=LevelIconSkin.js.map