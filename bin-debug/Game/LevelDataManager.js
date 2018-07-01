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
// 用来管理关卡数据的类
// 每个问题(关卡)的数据结构
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
// 关卡数据管理器
var LevelDataManager = (function (_super) {
    __extends(LevelDataManager, _super);
    function LevelDataManager() {
        var _this = _super.call(this) || this;
        // 一个关卡的保存数据组
        _this.items = [];
        // 使用RES读取和构建JSON数据,JSON数据可以直接解析到目标结构
        _this.items = RES.getRes("questions_json");
        return _this;
        // RES.addEventListene/r
    }
    LevelDataManager.Shared = function () {
        if (LevelDataManager.shared == null) {
            LevelDataManager.shared = new LevelDataManager();
        }
        return LevelDataManager.shared;
    };
    // 通过关卡号获得一个关的数据 创建的是一个属于这个属性的方法 LevelDataItem
    // 获取某一关的关卡数据
    LevelDataManager.prototype.GetLevel = function (level) {
        if (level < 0) {
            level = 0;
        }
        if (level >= this.items.length) {
            level = this.items.length - 1;
        }
        return this.items[level];
    };
    Object.defineProperty(LevelDataManager.prototype, "Mileston", {
        // 给Mileston这个属性设置get和set方法
        // 获取当前游戏的最远进度
        get: function () {
            var mileston = egret.localStorage.getItem("CYDTZ_Milestone");
            // 如果没有数据,那默认就是第一关
            if (mileston == "" || mileston == null) {
                mileston = "1";
            }
            return parseInt(mileston);
        },
        // 设置当前游戏的最远进度
        set: function (value) {
            egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
        },
        enumerable: true,
        configurable: true
    });
    // 单例
    LevelDataManager.shared = new LevelDataManager();
    return LevelDataManager;
}(eui.Component));
__reflect(LevelDataManager.prototype, "LevelDataManager");
//# sourceMappingURL=LevelDataManager.js.map