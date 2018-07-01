class Word extends eui.Component{
	private lb_text = new eui.Label();
	public constructor() {
		super();
		// this.skinName="src/Game/WordSkin.exml";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
	}
	protected onclick_tap() {
		// 将文字的点击事件放进SceneGame类中统一处理
		SceneGame.Shared().onclick_word(this);
	}
	// 这里没有做成属性的原因是因为当应用到eui的时候.skin还未指定,运行时候会出现报错,若制定了SkinName,那么就会产生两次eui的构建浪费内存
	// this.lb_text.text的设置和获取函数
	public setWordText(value:string) {
		this.lb_text.text = value;
	}
	public getWordText(){
		return this.lb_text.text;
	}
}