class SceneBegin extends eui.Component {

    private btn_begin = new eui.Button();
    // 单例
    private static shared = new SceneBegin();
    public static Shared() {
        if(SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    }
    public constructor() {
          super(); 
          this.skinName = "src/Game/SceneBeginSkin.exml";
          this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);
          console.log("asdfsd");
    }
    private onclick_begin(){
        console.log("game begin!");
        this.parent.addChild(SceneLevels.Shared());
        // 点击进入游戏的时候把当前界面移除
        this.parent.removeChild(this);
    } 
}