class SceneLevels extends eui.Component{
	private btn_back = new eui.Button();
	private group_levels = new eui.Group();
	private img_arrow = new eui.Image();
	public constructor() {
		
		super();
		this.skinName = "src/Game/SceneLevelsSkin.exml";
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_back,this);
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadPage, this);
	}
	private loadPage() {
		
		// 创建地图选项
		var row = 20;
		var col = 10;
		var spanx = 720 / col;  // 计算行x间隔
		var spany = 1136 / row; // 计算列y间隔
		var group = new eui.Group();  // 地图背景
		group.width = 720;
		group.height = (spany * 400);    // 计算出最大尺寸
		// 填充背景 相当于在水平方向上铺满了GameBG2_jpg这个背景图
		for(var i = 0; i <= (group.height / 1138); i++) {
			var img = new eui.Image();
			img.source = RES.getRes("GameBG2_jpg");
			img.y = i * 1138;
			img.touchEnabled = false;
			this.group_levels.addChildAt(img, 0);
		}
		// 以正弦曲线绘制关卡图标的路径
		for(var i = 0; i < 400; i++) {
			var icon = new LevelIconSkin();		
			
			icon.y = spany * i / 2;
			icon.x = Math.sin(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i /2;
            icon.y = group.height - icon.y - spany;
			icon.Level = i + 1;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_level,this);
		}
		// 开启位图缓存模式
		group.cacheAsBitmap = true;
        this.group_levels.addChild(group)
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
	}
	private onclick_back() {

	}
	private onclick_level(event) {
		var icon = event.currentTarget;
		console.log(icon.Level);
		this.img_arrow.x = icon.x;
    	this.img_arrow.y = icon.y;
	}
}