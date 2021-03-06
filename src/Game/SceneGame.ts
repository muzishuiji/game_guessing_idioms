// 开始游戏的类
class SceneGame extends eui.Component {
	// 单例
	private static shared:SceneGame;  // 定义一个静态的对象
	private btn_setting = new eui.Button();
	public static Shared() {
		if(SceneGame.shared == null) {
			SceneGame.shared = new SceneGame();
		}
		return SceneGame.shared;
	}
	public constructor() {
		super();
		this.skinName = "src/Game/SceneGameSkin.exml";
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_back, this);
		this.btn_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_next, this);
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_setting,this);

	}
	// 对象变量
	private group_answer = new eui.Group();
	private group_words = new eui.Group();
	private img_question = new eui.Image();
	private btn_back = new eui.Group();
	private levelIndex:number;
	private group_win = new eui.Group();  // 胜利界面的Group组件
	private btn_text = new eui.Button();  // 下一个题目
	private lb_explain = new eui.Label();  //解释
	private lb_from = new eui.Label();     // 来源

	// 初始化关卡
	public InitLevel(level:number) {
		// 保存正在进行的关卡
		this.levelIndex = level;
		// 获取对应的某个关卡的数据
		var leveldata = LevelDataManager.Shared().GetLevel(level);
		// 讲字段接起来
		var words = leveldata.answer +  leveldata.word;
		// 随机一个其他题目的字段混进本题目
		while(words.length == 10) {
			var i = Math.floor(Math.random() * 400);
			if(i!=level) {
				// 取出i索引对应的题目信息,与words进行拼接,构成二十个字符
				var temp = LevelDataManager.Shared().GetLevel(i);
				words += temp.word + temp.answer;
			}
		}
		// 对字段重排,将字段存进数组,并对数组乱序
		var wordList:string[] = [];
		for(var i = 0; i < words.length; i++) {
			wordList.push(words.charAt(i))
		}
		wordList = this.randomlist(wordList);
		// 赋值,将每一个字填充
		for(var i= 0; i < this.group_words.numChildren; i++) {
			var wordrect = <Word>this.group_words.getChildAt(i); // 继承Word类
			wordrect.setWordText(wordList[i]);
			wordrect.visible = true;
		}
		// 重置一些状态
		for(var i = 0; i < this.group_answer.numChildren;) {
			var answerrect = <AnswerWord>this.group_words.getChildAt(i); // 继承group_words类
			answerrect.SetSelectWord(null);
			answerrect.visible = true;
			answerrect.SelectWord = null;
		}
		// 显示图像
		this.img_question.source = "resource/assets/"+leveldata.img;
	}
	// 将一个数列随机排布
	private randomlist(arr: any[]) {
		var array = [];
		while(array.length > 0) {
			// 随机产生一个索引,然后将目标数组中该索引对应的值放进新数组,将目标数组中该索引对应的值删除.
			var i = Math.floor(Math.random() * arr.length);
			array.push(arr[i]);
			arr.splice(i,1);
		}
		return array;
	}
	// 由Word类触发的点击事件
	public onclick_word(word:Word) {
		// 找一个合适的位置添加进答案内容
		var sel:AnswerWord = null;
		for(var i = 0;i < this.group_answer.numChildren; i++) {
			var answer = <AnswerWord>this.group_answer.getChildAt(i); // 获取选中的文字对象
			if(answer.SelectWord === null) {
				sel = answer;
				break;
			}
		}
		// 当有一个合适的位置的时候就会将字填充,并判断是否胜利
		if(sel != null) {
			sel.SetSelectWord(word);
			// 判断是否胜利
			var check_str:string = "";
			for(var i = 0; i < this.group_answer.numChildren; i++) {
				var answer = <AnswerWord>this.group_answer.getChildAt(i);
            	check_str += answer.getWordText();
			}
			if(check_str === LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
				console.log("win");
				this.showWin();  // 调用显示成功的结果的方法
			} else {
				if(check_str.length == 4) {
					SoundMenager.Shared().PlayWrong();
				}
			}
		}
	}
	// 跳转到下一题
	private onclick_next() {
		this.group_win.visible = false;
		SceneLevels.Shared().OpenLevel(this.levelIndex + 1);
		this.InitLevel(this.levelIndex + 1);
	}
	// 显示结果
	private showWin() {
		this.group_win.visible = true;
		var leveldata = LevelDataManager.Shared().GetLevel(this.levelIndex);
		this.lb_from.text = leveldata.tip;
   		this.lb_explain.text = leveldata.content;
	}

	// 点击返回按钮
	private onclick_back(){
		this.parent.addChild(SceneLevels.Shared());
		this.parent.removeChild(this);
	}
	// 设置按钮的回调
	private onclick_setting() {
		SoundMenager.Shared().PlayClick();
		this.addChild(GameSetting.Shared());
	}
}