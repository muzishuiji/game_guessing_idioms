class SceneBegin extends eui.Component {
    private btn_begin = new eui.Button();
    public constructor() {
          super(); 
          this.skinName = "src/Game/SceneBeginSkin.exml";
          this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);
          console.log("asdfsd");
    }
    private onclick_begin(){
        console.log("game begin!");
    } 
}