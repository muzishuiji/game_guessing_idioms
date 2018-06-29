class LevelIconSkin extends eui.Button {
	private lb_level=new eui.Label();
	private	 p;
	public constructor() {
		super();
		this.p=	new Promise(resolve=>{
		this.addEventListener(eui.UIEvent.COMPLETE, function () {
			resolve();
		}, this);
		})
		this.skinName = "src/Game/LevelIconSkin.exml"
	}
	// 使用get和set创建了一个属性来标记关卡数字
	public get Level() {
		return parseInt(this.lb_level.text);
	}
	public set Level(value) {
		this.p.then(()=>{
			console.log(this.lb_level.text);
			this.lb_level.text = value.toString();
			console.log(this.x,this.lb_level.text);
		});
	}
}