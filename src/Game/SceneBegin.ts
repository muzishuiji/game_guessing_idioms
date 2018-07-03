class SceneBegin extends eui.Component {

    private btn_begin = new eui.Button();
    private btn_setting = new eui.Button();
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
          this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);
          console.log("asdfsd");
          // 开始播放背景音乐
          SoundMenager.Shared().PlayBGM();
    }
    private onclick_begin(){
        console.log("game begin!");
        // 开始播放点击音乐
        SoundMenager.Shared().PlayClick();
        this.parent.addChild(SceneLevels.Shared());
        // 点击进入游戏的时候把当前界面移除
        this.parent.removeChild(this);
    } 
    // 设置按钮的回调
    private onclick_setting() {
        SoundMenager.Shared().PlayClick();
        this.addChild(GameSetting.Shared());
    }
}