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
var SceneLevels = (function (_super) {
    __extends(SceneLevels, _super);
    function SceneLevels() {
        var _this = _super.call(this) || this;
        _this.btn_back = new eui.Button();
        _this.group_levels = new eui.Group();
        _this.img_arrow = new eui.Image();
        _this.skinName = "src/Game/SceneLevelsSkin.exml";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadPage, _this);
        return _this;
    }
    SceneLevels.prototype.loadPage = function () {
        // 创建地图选项
        var row = 20;
        var col = 10;
        var spanx = 720 / col; // 计算行x间隔
        var spany = 1136 / row; // 计算列y间隔
        var group = new eui.Group(); // 地图背景
        group.width = 720;
        group.height = (spany * 400); // 计算出最大尺寸
        // 填充背景 相当于在水平方向上铺满了GameBG2_jpg这个背景图
        for (var i = 0; i <= (group.height / 1138); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1138;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img, 0);
        }
        // 以正弦曲线绘制关卡图标的路径
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIconSkin();
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
            icon.Level = i + 1;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
        }
        // 开启位图缓存模式
        group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
        this.group_levels.scrollV = group.height - 1100;
        // 跟踪箭头
        this.img_arrow.source = RES.getRes("PageDownBtn.png");
        this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(0).x;
        this.img_arrow.y = group.getChildAt(0).y;
        group.addChild(this.img_arrow);
    };
    SceneLevels.prototype.onclick_back = function () {
    };
    SceneLevels.prototype.onclick_level = function (event) {
        var icon = event.currentTarget;
        console.log(icon.Level);
        this.img_arrow.x = icon.x;
        this.img_arrow.y = icon.y;
    };
    return SceneLevels;
}(eui.Component));
__reflect(SceneLevels.prototype, "SceneLevels");
//# sourceMappingURL=SceneLevels.js.map