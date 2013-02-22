package components.browser {
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.LocationChangeEvent;
	
	import mx.core.FlexGlobals;
	import mx.core.UIComponent;
	
	import es.xperiments.media.StageWebViewBridge;
	import es.xperiments.media.StageWebViewDisk;
	import es.xperiments.media.StageWebviewDiskEvent;
	
	import services.JSInit;
	
	[Event(name="complete", type = "flash.events.Event")]
	[Event(name="locationChanging", type = "flash.events.LocationChangeEvent")]
	[Event(name="locationChange", type = "flash.events.LocationChangeEvent")]
	
	public class StageWebViewUIComponentBase extends UIComponent {
		
		private var _yOffset:int = 0;
		
		protected var myStage:Stage;
		private var _url:String;
		private var _text:String;
		
		private var _stageWebView:StageWebViewBridge;
		
		private var scale:Number = FlexGlobals.topLevelApplication.runtimeDPI / FlexGlobals.topLevelApplication.applicationDPI;
		
		public function get stageWebView():StageWebViewBridge {
			return _stageWebView;
		}
		
		public function StageWebViewUIComponentBase() {
			addEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
		}
		
		public function set url(url:String):void {
			_url = url;
			
			if (_stageWebView) {
				_stageWebView.loadURL(url);
			}
		}
		
		public function set text(text:String):void {
			_text = text;
			
			if (_stageWebView) {
				_stageWebView.loadString(text);
			}
		}
		
		public function dispose():void {
			_stageWebView.dispose();
		}
		
		protected function addedToStageHandler(event:Event):void {
			removeEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
			
			myStage = event.currentTarget.document.stage;
			JSInit.initJ_SCRIPT();
			StageWebViewDisk.addEventListener(StageWebviewDiskEvent.END_DISK_PARSING, onInit);
			StageWebViewDisk.setDebugMode(true);
			StageWebViewDisk.initialize(myStage);
		}
		
		private function onInit(event:Event):void {
			StageWebViewDisk.removeEventListener(StageWebviewDiskEvent.END_DISK_PARSING, onInit);
			_stageWebView = new StageWebViewBridge(0, 0, width * scale, height * scale);
			_stageWebView.addEventListener(Event.COMPLETE, completeHandler);
			_stageWebView.addEventListener(ErrorEvent.ERROR, errorHandler);
			_stageWebView.addEventListener(LocationChangeEvent.LOCATION_CHANGING, locationChangingHandler);
			_stageWebView.addEventListener(LocationChangeEvent.LOCATION_CHANGE, locationChangeHandler);
			if (_url) {
				_stageWebView.loadURL(_url);
			} else if (_text) {
				_stageWebView.loadString(_text);
			}
			var s:Sprite = new Sprite();
			s.addChild(_stageWebView);
			addChild(s);
		}
		
		protected function completeHandler(event:Event):void {
			dispatchEvent(event.clone());
		}
		
		protected function locationChangingHandler(event:Event):void {
			dispatchEvent(event.clone());
		}
		
		protected function locationChangeHandler(event:Event):void {
			dispatchEvent(event.clone());
		}
		
		protected function errorHandler(event:Event):void {
			dispatchEvent(event.clone());
		}
		
		override public function setLayoutBoundsSize(width:Number, height:Number, postLayoutTransform:Boolean = true):void {
			super.setLayoutBoundsSize(width, height, postLayoutTransform);
			if (stageWebView)
				stageWebView.setSize(scale * width, scale * height);
		}
	}
}



