YUI.add("bacon-api3", function (Y) {
Y.log("Adding bacon module bacon-api3", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;



BACON.api = BACON.api || {};

var api = {
  setItem: 'bacon-item',
  newItem: 'bacon-item',
  setPage: 'bacon-item'
};

function Api3() {

}

Api3.prototype = {
  select: Y.Selector.query,
  
  bindAction: function(o) {
    var lib = api[o.action];
    if (lib) {
      Y.on('available', function () {
        Y.delegate('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          Y.use(lib, function(Y) {
            QUORUS[o.action].call(QUORUS, o);
          });
        }, 'body', o.bindToSelector);
      }, 'body');
    } else {
      throw new Error("Quorus: no such action '" + o.action + "' in bindAction().");
    }
  },
  
  addAnalyticsEngine: function(engine) {
    BACON.Analytics.addEngine(engine);
  }, 
  
  showBar: function() {
    BACON.on('barManagerReady', function(b) {
      b.show();
    });
  },
  
  popAuthoringPane: function() {
    // mobile_share only works in advanced browsers, otherwise use discuss if available
    if (QUORUS.advancedBrowser) {
      Y.use('bacon-notificaton', function() {
    	BACON.popNotificationPane();
      });
    } else {
      Y.log("Can't pop authoring pane, neither mobile_share nor discuss is available", 'warn', 'api');
    }
  }
};

//Delegate calls into the equivalent Quorus call
Y.Object.each(api, function(lib, call) {
  Api3.prototype[call] = QUORUS[call];
});

BACON.api[3] = Api3;

}, '@VERSION@', { requires: ["bacon","bacon-item","bacon-analytics","event-delegate"] });
