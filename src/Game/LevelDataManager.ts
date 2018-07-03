// 用来管理关卡数据的类
// 每个问题(关卡)的数据结构
class LevelDataItem {
	public answer:string;  // 问题
	public img:string;     // 图片
	public word:string;    // 单词
	public tip:string;     // 小tips
	public content:string; // 内容
}

// 关卡数据管理器

class LevelDataManager {
	// 单例
	private static shared = new LevelDataManager();
	public static Shared() {
		if(LevelDataManager.shared == null) {
			LevelDataManager.shared = new LevelDataManager();
		}
		return LevelDataManager.shared;
	}
	// 一个关卡的保存数据组
	private items:LevelDataItem[] = [];
	public constructor() {
		// 使用RES读取和构建JSON数据,JSON数据可以直接解析到目标结构
		console.log(RES);
		RES.loadGroup("preload",0);
		this.items = RES.getRes("questions_json");
		// RES.addEventListene/r
	}
	// 通过关卡号获得一个关的数据 创建的是一个属于这个属性的方法 LevelDataItem
	// 获取某一关的关卡数据
	public GetLevel(level:number):LevelDataItem {
		if(level < 0) {level = 0;}
		if(level >= this.items.length) {
			level = this.items.length - 1;
		}
		return this.items[level];
	}
	// 给Mileston这个属性设置get和set方法
	// 获取当前游戏的最远进度
	public get Mileston():number {
		var mileston = egret.localStorage.getItem("CYDTZ_Milestone");
		// 如果没有数据,那默认就是第一关
		if(mileston == "" || mileston == null) {
			mileston = "1";
		}
		return parseInt(mileston);
	}
	// 设置当前游戏的最远进度
	public set Mileston(value: number) {
		egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
	}
}