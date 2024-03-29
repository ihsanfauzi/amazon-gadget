package components.browser {
	import flash.display.Sprite;
	import flash.display.Stage;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.LocationChangeEvent;
	import flash.utils.setTimeout;
	
	import mx.core.FlexGlobals;
	import mx.core.UIComponent;
	import mx.events.PropertyChangeEvent;
	import mx.events.PropertyChangeEventKind;
	
	import es.xperiments.media.StageWebViewBridge;
	import es.xperiments.media.StageWebViewDisk;
	import es.xperiments.media.StageWebviewDiskEvent;
	
	import services.JSInit;
	
	[Event(name="complete", type = "flash.events.Event")]
	[Event(name="locationChanging", type = "flash.events.LocationChangeEvent")]
	[Event(name="locationChange", type = "flash.events.LocationChangeEvent")]
	[Event(name="webviewCreated", type = "flash.events.Event")]
	
	public class StageWebViewUIComponentBase extends UIComponent {
		
		private var _yOffset:int = 0;
		
		protected var myStage:Stage;
		private var _url:String;
		private var _text:String;
		
		private var _stageWebView:StageWebViewBridge;
		
		private var scale:Number = FlexGlobals.topLevelApplication.runtimeDPI / FlexGlobals.topLevelApplication.applicationDPI;
		
		private var _snapShotVisible:Boolean = false;
		
		public function get url():String {
			return _url;
		}
		
		[Bindable]
		
		public function get snapShotVisible():Boolean {
			return _stageWebView ? _stageWebView.snapShotVisible : _snapShotVisible;
		}
		
		public function set snapShotVisible(value:Boolean):void {
			_snapShotVisible = value;
			if (_stageWebView) {
				_stageWebView.snapShotVisible = value;
			}
		}
		
		[Bindable]
		
		public function get stageWebView():StageWebViewBridge {
			return _stageWebView;
		}
		
		public function set stageWebView(value:StageWebViewBridge):void {
			_stageWebView = value;
		}
		
		public function StageWebViewUIComponentBase() {
			addEventListener(Event.ADDED_TO_STAGE, addedToStageHandler);
		}
		
		[Bindable("urlChanged")]
		
		public function set url(url:String):void {
			if (_url == url)
				return ;
			_url = url;
			
			if (_stageWebView && url) {
				if (StageWebViewDisk.isIPHONE) {
					setTimeout(function():void {
						_stageWebView.loadURL(url);
					}, 100);
				} else {
					_stageWebView.loadURL(url);
				}
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
			dispatchEvent(new Event("webviewCreated"));
		}
		
		protected function completeHandler(event:Event):void {
			dispatchEvent(event.clone());
		}
		
		protected function locationChangingHandler(event:Event):void {
			//dispatchEvent(event.clone());
			var e:LocationChangeEvent = event as LocationChangeEvent;
			if (e.location.indexOf("://") != -1) {
				var oldValue:String = _url;
				_url = e.location;
				if (_url != oldValue) {
					dispatchEvent(new PropertyChangeEvent('urlChanged', false, false, PropertyChangeEventKind.UPDATE, "url", oldValue, _url));
				}
			}
		}
		
		protected function locationChangeHandler(event:Event):void {
			dispatchEvent(event.clone());
		}
		
		protected function errorHandler(event:Event):void {
			
		}
		
		override public function setLayoutBoundsSize(width:Number, height:Number, postLayoutTransform:Boolean = true):void {
			super.setLayoutBoundsSize(width, height, postLayoutTransform);
			if (stageWebView)
				stageWebView.setSize(scale * width, scale * height);
		}
	}
}