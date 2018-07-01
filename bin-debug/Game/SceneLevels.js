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
        _this.sel_level = 0;
        _this.LevelIcons = [];
        _this.skinName = "src/Game/SceneLevelsSkin.exml";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadPage, _this);
        return _this;
    }
    SceneLevels.Shared = function () {
        if (SceneLevels.shared == null) {
            SceneLevels.shared = new SceneLevels();
        }
        return SceneLevels.shared;
    };
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
        // 获取当前关卡号
        var milestone = LevelDataManager.Shared().Mileston;
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIconSkin();
            icon.y = spany * i / 2;
            icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - spany;
            icon.Level = i + 1;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_level, this);
            // 根据进度设置关卡显示
            icon.enabled = i < milestone;
            // 将所有关卡对象保存在一个列表中
            this.LevelIcons.push(icon);
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
        // 跳转到下一个场景
        this.parent.addChild(SceneBegin.Shared());
        // 移除自身
        this.parent.removeChild(this);
    };
    SceneLevels.prototype.onclick_level = function (event) {
        var icon = event.currentTarget;
        // console.log(icon.Level);
        // sel_level 是选定关卡的标记, 如果sel_level 的值不等于当前点击的关卡,就将当前点击的关卡数赋给sel_level
        // 否则进入并开始游戏
        if (this.sel_level != icon.Level) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
        else {
            var begin = SceneGame.Shared();
            this.parent.addChild(begin);
            begin.InitLevel(icon.Level);
            this.parent.removeChild(this);
        }
    };
    // 打开指定的关卡,如果大于最远关卡,则保存数据也跟着调整
    SceneLevels.prototype.OpenLevel = function (level) {
        var icon = this.LevelIcons[level - 1];
        icon.enabled = true;
        if (level > LevelDataManager.Shared().Mileston) {
            LevelDataManager.Shared().Mileston = level;
            // 	同时将选定标记置于其上
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
    };
    // 单例 该方法将该类实例化之后的对象存在于shared属性中,并返回这个属性
    SceneLevels.shared = new SceneLevels();
    return SceneLevels;
}(eui.Component));
__reflect(SceneLevels.prototype, "SceneLevels");
//# sourceMappingURL=SceneLevels.js.map