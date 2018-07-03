class SoundMenager {
	private static shared:SoundMenager;
	public static Shared() {
		if(SoundMenager.shared == null) {
			SoundMenager.shared = new SoundMenager();
		}
		return SoundMenager.shared;
	}
	private _click:egret.Sound; // 点击声音
	private _word:egret.Sound;  // 点击字块的声音
	private _right:egret.Sound; // 胜利的声音
	private _wrong:egret.Sound;  // 失败的声音
	private _bgm:egret.Sound; // 背景音乐
	private _bgm_channel:egret.SoundChannel;  // 保存用来做静音用
	public constructor() {
		this._click = new egret.Sound();
		this._click.load("resource/assets/sound/buttonclick.mp3");
		this._bgm = new egret.Sound();
		this._bgm.load("resource/assets/sound/Music.mp3");
		this._right = new egret.Sound();
		this._right.load("resource/assets/sound/right.mp3");
		this._wrong = new egret.Sound();
        this._wrong.load("resource/assets/sound/wrong.mp3");
        this._word = new egret.Sound();
        this._word.load("resource/assets/sound/type_word.mp3");
	}
	// 打开背景音乐
	public PlayBGM() {
		if(this.IsMusic) {
			this._bgm_channel = this._bgm.play(0,0);
		}
	}
	// 关闭背景音乐
	public StopBGM() {
		if(this._bgm_channel != null) {
			this._bgm_channel.stop();
		}
	}
	// 播放点击音乐
	public PlayClick() {
		if(this.IsSound) {
			this._click.play(0,1);
		}
	}
	// 播放胜利音乐
	public PlayRight() {
		if(this.IsSound) {
			this._right.play(0,1);
		}
	}
	// 播放失败音乐
	public PlayWrong() {
		if(this.IsSound) {
			this._wrong.play(0,1);
		}
	}
	// 播放字块音乐
	public PlayWord() {
		if(this.IsSound) {
			this._word.play(0,1);
		}
	}
	// 音乐是否播放,保存设置
	public set IsMusic(value) {
		if(!value) {
			egret.localStorage.setItem("ismusic", "0");
			this.StopBGM();
		} else {
			egret.localStorage.setItem("ismusic", "1");
			this.PlayBGM();
		}
	}
	// 获取是否播放音乐的标识
	public get IsMusic() {
		let b = egret.localStorage.getItem("ismusic");
		if(b == null || b == "") {
			return true;
		} else {
			return b == "1";
		}
	}
	// 声效是否播放,保存设置
	public set IsSound(value) {
		if(value) {
			egret.localStorage.setItem("isSound", "1");
		} else {
			egret.localStorage.setItem("isSound", "0");
		}
	}
	public get IsSound() {
		let b = egret.localStorage.getItem("isSound");
		if(b == null || b == "") {
			return true;
		} else {
			return b == "1";
		}
	}
}