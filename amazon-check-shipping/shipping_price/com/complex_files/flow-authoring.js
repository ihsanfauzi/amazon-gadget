/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("substitute",function(c){var g=c.Lang,e="dump",h=" ",b="{",i="}",j=/(~-(\d+)-~)/g,a=/\{LBRACE\}/g,d=/\{RBRACE\}/g,f=function(B,m,u,l){var r,q,p,z,y,A,x=[],n,t,w=B.length;for(;;){r=B.lastIndexOf(b,w);if(r<0){break;}q=B.indexOf(i,r);if(r+1>=q){break;}n=B.substring(r+1,q);z=n;A=null;p=z.indexOf(h);if(p>-1){A=z.substring(p+1);z=z.substring(0,p);}y=m[z];if(u){y=u(z,y,A);}if(g.isObject(y)){if(!c.dump){y=y.toString();}else{if(g.isArray(y)){y=c.dump(y,parseInt(A,10));}else{A=A||"";t=A.indexOf(e);if(t>-1){A=A.substring(4);}if(y.toString===Object.prototype.toString||t>-1){y=c.dump(y,parseInt(A,10));}else{y=y.toString();}}}}else{if(g.isUndefined(y)){y="~-"+x.length+"-~";x.push(n);}}B=B.substring(0,r)+y+B.substring(q+1);if(!l){w=r-1;}}return B.replace(j,function(s,o,k){return b+x[parseInt(k,10)]+i;}).replace(a,b).replace(d,i);};c.substitute=f;g.substitute=f;},"3.6.0",{optional:["dump"],requires:["yui-base"]});
YUI.add("bacon-contacts", function (Y) {
Y.log("Adding bacon module bacon-contacts", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


function ContactSource () {
  ContactSource.superclass.constructor.apply(this, arguments);
}

Y.mix(ContactSource, {
  NAME: 'dataSourceXDS'
});

Y.extend(ContactSource, Y.DataSource.Local, {
  dataLoaded: false,
  googleContactsLoaded: false,

  initializer: function (config) {
    this.publish('dataReady', {fireOnce: true, emitFacade: false});
    BACON.after('authLoaded', function () {
      this.fetchData();
    }, this);
  },

  onData: function (response, e) {
    var data = response.get('responseJson');
    this.friends = Y.Array.map(data.friends, Contact.fromStruct, Contact),
    this.recentContacts = Y.Array.map(data.recent_contacts, Contact.fromStruct, Contact);
    this.googleContactsLoaded = data.google_contacts_imported;
    this.dataLoaded = true;
    this.fire('dataLoaded');
    if(this.googleContactsLoaded)
        Y.one('.q_google_contacts').set('text', 'Search for your google contacts...');
  },

  fetchData: function () {
    var uri = this.get('source');
    BACON.QuorusIo.io(uri, {
      context: this,
      on: {
        success: this.onData
      }
    });
  },

  _defRequestFn: function (e) {
    var request = e.request,
        results = [],
        corpus;
    if (request === '') {
      if (this.recentContacts && this.recentContacts.length) {
        results = results.concat(this.recentContacts);
      } else {
        request = 'a';
      }
    }

    if (this.dataLoaded) {
      if (request !== '') {
        corpus = this.recentContacts.concat(this.friends);
        results = results.concat(Contact.search(corpus, request));
      }
    } else {
      // Redo the search once we've loaded contact data
      if (this.pendingSearchHandle)
        this.pendingSearchHandle.detach();
      this.pendingSearchHandle = this.once('dataLoaded', function () {
        delete this.pendingSearchHandle;
        this._defRequestFn(e);
      }, this);
    }
    this.fire('data', Y.mix({ data: results }, e));
  }
});

function formatContacts (query, results) {
  return Y.Array.map(results, function (result) {
    return result.raw.matchHTML();
  });
}

function ContactSelector (config) {
  config.zIndex = 10 // hack
  ContactSelector.superclass.constructor.apply(this, arguments);
}

Y.extend(ContactSelector, Y.AutoCompleteList, {
  initializer: function (config) {
    this.on('query', function (evt) {
      this.set('activateFirstItem', evt.query !== '');
    }, this);
    this._inputNode.on('focus', function (evt) {
      if (Y.Lang.trim(this._inputNode.get('value')) == '')
        this.doDefaultQuery();
    }, this);
    // AutoCompleteList re-orders content in q_aclist_content. We have to
    // re-order it back again.
    this.after('render', function () {
      var listNode = this.get('listNode');
      var connectNode = Y.one('.q_aclist_connect');
      listNode.insert(connectNode, 'after');
    }, this);
  },
  doDefaultQuery: function () {
    this.fire('query', {inputValue: '', query: ''});
    this.show();
  }
}, {
  ATTRS: {
    maxResults: { value: 5 },
    minQueryLength: { value: 0 },
    resultFormatter: { value: formatContacts },
    resultHighlighter: { value: 'phraseMatch' },
    resultTextLocator: { value: 'displayText' },
    source: { valueFn: function () {
      return new ContactSource({ source: '/contacts' });
    }},
    zIndex: { value: 10 }
  },
  CSS_PREFIX: Y.AutoCompleteList.CSS_PREFIX,
  NAME: 'contactSelector',
  NS: 'selector'
});

BACON.ContactSelector = ContactSelector;


function Contact (config) {
  var photo = config.photo;

  if (! photo)
    photo = config.type + '.png';

  if (! photo.match(/^https?:\/\//))
    photo = Contact.iconsBase + photo;

  config.photo = photo;

  if(config.name != config.uid)
     this.displayText = config.name + ' <' + config.uid + '>';
  else
     this.displayText = config.name;

  Y.mix(this, config, false, ['uid', 'name', 'type', 'photo', 'source']);
  this._id = config.type + '|' + config.uid;
}
Contact.prototype = {
  match: function (query) {
    // See autocomplete-filters.js for more ideas.
    var name = this.name.toLowerCase(),
        uid = this.uid.toLowerCase();
    query = query.toLowerCase();
    return (name.indexOf(query) === 0) || (
            this.type != 'facebook' && uid.indexOf(query) === 0);
  },
  matchHTML: function () {
    var formatDisplayText = this.displayText.replace("<","&lt;");
    formatDisplayText = formatDisplayText.replace(">","&gt;");
    return Y.Node.create(Y.substitute(Contact.MATCH_TEMPLATE, {displayText:formatDisplayText}));
  },
  addedHTML: function () {
    return Y.Node.create(Y.substitute(Contact.ADDED_TEMPLATE, this));
  },
  toJSON: function () {
    return {
      uid: this.uid,
      name: this.name,
      type: this.type
    }
  },
  toString: function () {
    return this.name;
  }
};
Y.mix(Contact, {
  ADDED_TEMPLATE: (
    "<div class='q_friend q_formed_participant'>" +
      "<span class='q_remove' q_action='removeParticipantClick' q_id='{_id}'>x</span>" +
      "<span class='q_name'>{name}</span>" +
      "<input type='hidden' autocomplete='off' name='participants[][uid]' value='{uid}' />" +
      "<input type='hidden' autocomplete='off' name='participants[][type]' value='{type}' />" +
      "<input type='hidden' autocomplete='off' name='participants[][name]' value='{name}' />" +
    "</div>"),
  MATCH_TEMPLATE: (
    '<div class="q_contact">' +
      //'<div class="q_contact_photo_container">' +
      //  '<img class="q_contact_photo q_{type}_contact" src="{photo}" alt="Profile photo" />' +
      //'</div>' +
      '<span class="name">{displayText}</span>' +
    '</div>'),
  iconsBase: BACON.config.getDefaultKey('publicUrlBase') + '/images/icons/',
  fromStruct: function (obj) {
    return new Contact(obj);
  },
  fromString: function (string) {
    var meta = Contact._tryPhoneNumber(string) || Contact._tryEmail(string);
    if (meta) {
      meta.source = 'manual';
      return new Contact(meta);
    }
  },
  // Searches and filters out duplicates
  search: function (contacts, string) {
    var memo = {},
        contacts_out = [],
        contact;
    for (var i = 0; i < contacts.length; i++) {
      contact = contacts[i];
      if (contact.match(string) && ! memo[contact._id]) {
        memo[contact._id] = true;
        contacts_out.push(contact);
      }
    }
    return contacts_out;
  },
  _tryPhoneNumber: function (str) {
    var digits = str.match(/\d/g),
        name, ac, exch, locl;
    
    if (!str.match(/^[\d-()\s]+$/))
      return false;
    
    if (digits[0] == '1') digits.shift();
    if (! (digits && digits.length == 10))
      return false;
    
    if (digits[0] === "0" || digits[0] === "1")
      return false;

    ac   = digits.splice(0,3).join(''),
    exch = digits.splice(0,3).join(''),
    locl = digits.splice(0,4).join('');
    
    name = "("+ac+") " +
      ((exch != '') ? (exch)       : '') +
      ((locl != '') ? ('-' + locl) : '');

    return {
      name: name,
      type: 'mobile',
      uid: str.match(/\d/g).join('')
    };
  },

  _tryEmail: function (str) {
    if (! str.match(/^[.\w_\-+!]+@([a-z0-9][-a-z0-9]*\.)+[a-z]+$/i))
      return false;

    str = str.toLowerCase();

    return {
      name: str,
      type: 'email',
      uid: str
    };
  }
});
BACON.Contact = Contact;

}, '@VERSION@', { requires: ["bacon-config","bacon-io","autocomplete","autocomplete-filters","datasource-local","json-parse","substitute"] });

YUI.add("bacon-flow-authoring", function (Y) {
Y.log("Adding bacon module bacon-flow-authoring", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


var BA = BACON.Analytics,
    Auth = BACON.Auth,
    LOADING_CLASS = 'q_loading';

////////////////
//
// Button for new flow
//
var MobileShareButton = Y.Base.create("mobileShareButton", BACON.BarButton, [BACON.PaneRevealer], {
    initializer: function (config) {
      this.after('init', function() {
        BACON.after('barReady', function (barManager) {
          BACON.fire('mobileShareButtonReady', this);
        }, this);
      }, this);

      this.after('paneRevealer:needPane', this._needPane, this);
    },
    bindUI: function () {
      var bb = this.get('boundingBox');
      bb.after('click', this._onClick, this);
      
      this.after('mobileAuthoringPane:visibleChange', function (ev) {
        if (ev.newVal == true) {
          BA.qEvent('flow', 'seeAuthoringPane', {oneshot: true});
        } else {
          bb.removeClass('q_show_cta'); // collapse the cta when the pane is minimized
          BACON.config.setLocalKey('suppressCTA', true); // hint to keep the cta collapsed
          this.get('barManager').fire('barShifted'); // re-position the pane if necessary
          BA.qEvent('flow', 'closedAuthoringPane', {oneshot: true});
        }
      }, this);
    },
    syncUI: function() {
      var bb = this.get('boundingBox');
      this.withValue('cta', function (cta) {
        bb.one('.q_cta_text').setContent(cta.newVal);
        // show the cta if there is one AND it hasn't been suppressed
        bb.toggleClass('q_show_cta', !! (cta.newVal && !BACON.config.getKey('suppressCTA')));
        this.get('barManager').fire('barShifted');
      }, this);
    },
    _onClick: function(ev) {
      BA.qEvent('flow','clickedAuthoringButton',{oneshot: true});
    },
    _needPane: function(ev) {
      var dotheload = Y.bind(function() {
        var io = new BACON.QuorusIo({
              url: '/flows/new'
            });

        io.after('io:success', function(obj) {
          var resp = Y.JSON.parse(obj.get('responseText')),
              pane = new MobileAuthoringPane();

          pane.get('contentBox').setContent(resp.contentHTML);
          this.set('detailPane', pane);
        }, this);
        io.after('io:failure', function(obj) {
          this.get('detailPane').hide();
          this.set('detailPane', null);
          alert("Sorry, we weren't able to load the Ask A Friend feature. If the problem persists, please contact Customer Service.");
          BA.qEvent('flow', 'authoringFailure', {});
        }, this);
        io.submit();
      }, this);
      
      //If there's no auth session, attempt to login w/AMZN credentials
      if (BACON.get('authSession')) {
        dotheload();
      } else {
        Auth.amazonLogin(dotheload);
      }
    }
  },{
    ATTRS: {
      cta: { value: "" },
      serializeWidget: { value: false }
    }
  });
BACON.MobileShareButton = MobileShareButton;

BACON.publish('mobileShareButtonReady', {emitFacade: false, fireOnce: true});

BACON.popAuthoringPane = function () {
  // wait until callbacksDone, so we pick up the item if available
  BACON.once('callbacksDone', function () {
    BACON.once('mobileShareButtonReady', function (mobileShareButton) {
      mobileShareButton.get('barManager').show();
      mobileShareButton.showPane();
    });
  });
};

////////////////
//
// Callout for button (toolbar or in-page)
//
var MobileShareCallout = Y.Base.create('mobileShareCallout', BACON.Advice, [BACON.Autobinding, BACON.EventObserver, BACON.FixedPositioner], {
  BOUNDING_TEMPLATE: '<div rel="q_advice_dismiss"></div>',
  
  initializer: function(config) {
    var parentWidget = this.get('parentWidget');
    
    if (parentWidget) {
      this.set('parentNode', parentWidget.get('boundingBox'));
      
      this.barManager = parentWidget.get('barManager');
    }
    
    this.after('init', function() {
      BACON.after('rootNodeReady', function(rootNode, fixedContainer) {
        // if this is a bar widget, render ourselves into the fixed container
        // (otherwise, just into the rootNode)
        this.render(this.barManager ? fixedContainer : rootNode);
      }, this);
    }, this);
    
    this.on('visibleChange', function(ev) {
      if (ev.newVal == true) {
        BACON.config.setLocalKey(MobileShareCallout.SHOWED_ME_KEY, true);
        this.position();
        
        // debug flag is one-time use only, to test callout evanescence
        if (this.debugMode)
          BACON.config.setLocalKey(MobileShareCallout.DEBUG_ME_KEY, null);
      }
    }, this);
  },
  bindUI: function() {
    var parentNode = this.get('parentNode');
    
    this.observe(BACON.get('barManager'), 'on', 'widgetAppear', function(widget) {
      if (widget != this) this.hide();
    });
  },
  _analyticsClick: function(ev) {
    var props = {oneshot: 'session', toolbar: !!this.barManager},
        qData = ev.target.getAttribute('q_data'),
         data = Y.JSON.parse(qData || null);
    
    Y.mix(props, data);
    
    BA.qEvent('callout', 'dimissed', props);
  },
  _authService: function(ev) {
    this.clearDismissTimer();
    
    var service = ev.currentTarget.getAttribute('q_service');
    Auth.oauthLogin(service);
    ev.halt();
    BA.qEvent('auth', 'clickedLogin', { service: service, where: 'callout' });
    
    BACON.once('authLoaded', function() {
      BACON.popAuthoringPane();
    });
  },
  position: function() {
    this.positionAbove(this.get('parentNode'), MobileShareCallout.PADDING);
  },
  popable: function() {
    // make it a little easier to test callouts
    if (BACON.config.getLocalKey(MobileShareCallout.DEBUG_ME_KEY)) {
      this.debugMode = true;
      return true;
    }
    
    // suppress it for those who've already seen it
    if (BACON.config.getLocalKey(MobileShareCallout.SHOWED_ME_KEY))
      return false;
    
    // suppress it for authed users (they've already used the product)
    if (BACON.get('authSession'))
      return false;
    
    // suppress it when we're tied to the bar, and it isn't visible
    if (this.barManager && !this.barManager.get('visible'))
      return false;
    
    var item = BACON.get('item'),
        itemType = item && item.get('type');
    
    // suppress it for 'default' pages. is there a better way to detect this?
    if (!item || (itemType == 'page'))
      return false;
    
    return true;
  },
  pop: function() {
    if (!this.popable()) return;
    
    function doPop() {
      var boundingBox = this.get('boundingBox');
           transition = this.get('appearTransition');
      
      function prepareToSlide() {
        var theTop = boundingBox.getDOMNode().style.top,
            bottom = boundingBox.getDOMNode().style.bottom,
             y_val,
           y_slide = MobileShareCallout.VERTICAL_SLIDE;
        
        if (y_val = parseInt(theTop)) {
          transition['top'] = theTop;
          boundingBox.setStyle('top', y_val + y_slide);
        } else if (y_val = parseInt(bottom)) {
          transition['bottom'] = bottom;
          boundingBox.setStyle('bottom', y_val - y_slide);
        }
      }
      
      this.once('visibleChange', prepareToSlide, this);
      this.show();
    }
    
    // note: the default/prevented semantics for this event are backwards
    // default is 'do nothing', preventing the event makes the pop happen
    this.publish('activatedPop', {emitFacade: true, preventedFn: doPop});
    
    BA.qEvent('callout', 'activatedPop', {oneshot: 'session', toolbar: !!this.barManager});
    this.fire('activatedPop', (!!this.barManager));
  },
  poplater: function() {
    if (!this.popable()) return;
    
    var delay = this.get('delay');
    
    Y.log("MobileShareCallout activated, waiting " + delay + "s...", 'debug', 'MobileShareCallout');
    Y.later(delay * 1000, this, this.pop);
  },
  activate: function() {
    BACON.once('authInitialized', function() {
      BACON.onceValue('item', function() {
        this.poplater();
      }, this);
    }, this);
  }
}, {
  ATTRS: {
    delay: {
      value: 7.5 //seconds
    },
    autoDismiss: {
      value: 7.5 //seconds
    },
    persist: {
      value: true //don't auto-destroy
    },
    src: {
      value: "/flows/callout/pop"
    },
    parentNode: {}
  },
  
  PADDING:        {y: 13}, //px
  VERTICAL_SLIDE: 100, //px
  
  DEBUG_ME_KEY:  'callout:debug',
  SHOWED_ME_KEY: 'callout:shown'
});
BACON.MobileShareCallout = MobileShareCallout;

////////////////////
//
// Pane to select a user
//
var MobileAuthoringPane = Y.Base.create('mobileAuthoringPane', BACON.BarPane, [BACON.AttributeExtensions, BACON.Autobinding, BACON.EventObserver, BACON.ComponentWidget, BACON.ChannelAdapter], {
  initializer: function() {
    this.observe(BACON, 'onceValue', 'userChannel', function(ev) {
      this.set('channel', ev.newVal);
    });
  },
  renderUI: function() {
    var cb = this.get('contentBox');
    BACON.fire('newContent', cb);
  },
  bindUI: function () {
    this.loadComponents();
  },
  syncUI: function () {
    // invalidate ourselves on new flow (recent flows list)
    // (install this listener only after we get initial state)
 
    this.after('newFlowUUIDsChange', function(ev) {
      if (ev.newVal.toString() != "")
        this.destroy();
    }, this);
  },
  _signIn: function (ev) {
    ev.preventDefault();
    
    Auth.amazonSignIn();
  },
  _popFlow: function (ev) {
    ev.preventDefault();
    
    var target = ev.currentTarget,
        uuid = target.getAttribute('uuid'),
        config = { uuid: uuid, paneConfig: {
                     visible: true, attach: true
                   }
                 };
    
    //Loading spinner, since popping a flow may require a round trip
    target.addClass(LOADING_CLASS);
    this.once('visibleChange', function(ev) {
      target.removeClass(LOADING_CLASS);
    }, this);
    
    BA.qEvent('flow', 'openedRecentFlow');
    BACON.ensureFlowButton(config);
  }
}, {
  ATTRS: {
    contentLoaded: { value: false }
  }
});
BACON.MobileAuthoringPane = MobileAuthoringPane;

////////////
//
// Helper plugin for the authoring box
//
MobileAuthoringPane.AuthoringForm = Y.Base.create('authoringForm', BACON.Component, [BACON.EventObserver], {
  initializer: function(config) {
    var host = config.host,
        container = host.one('.q_participant_select'),
        input = host.one('input.q_name'),
        textarea = host.one('textarea'),
        formController,
        valueAtSelection,
        selector;

    host.addClass('q_no_persona');
    BACON.withValue('authSession', function (evt) {
      var user = BACON.get('authSession.user');
      host.replaceClass('q_no_persona', 'q_persona_' + user.personaType.toLowerCase());
    }, this);

    this.participants = {};
    this._input = input;
    this._textarea = textarea;

    formController = this.formController = host.plug(BACON.Form).form;
    formController.on('submit', this._onSubmit, this);
    formController.after('submit', function () {
      BA.qEvent('flow', 'submittedAuthoringForm', {oneshot: true});
    }, this);
    formController.after('io:end', function () {
      this.participants = {};
    }, this);
    formController.on('success', this._onSuccess, this);

    BACON.autobind(this, host);

    input.on('change', function () {
      var value = input.get('value');
      if (this.selectedContact && valueAtSelection != value) {
        this.selectedContact = null;
      }
    }, this);

    selector = this._selector = new BACON.ContactSelector({
      boundingBox: container.one('.q_aclist'),
      contentBox: container.one('.q_aclist_content'),
      listNode: container.one('.q_aclist_list'),
      inputNode: input,
      render: container
    });
    // the AutoCompleteList directly sets the value on the input,
    //   which doesn't toggle the label,
    //   so we have to do it explicitly
    selector.on('select', function (evt) {
      input.label.off();
    });
    selector.after('select', function (evt) {
      valueAtSelection = input.get('value');
      this.selectedContact = evt.result.raw;
    }, this);
    selector.after('hoveredItemChange', function (evt) {
      selector.set('activeItem', evt.newVal);
    }, this);
    selector.on('clear', selector.show, selector);
    input.on('focus', function () {
      formController.clearInvalid(input);
      Y.one('.q_error_participant').set('innerHTML', '');
    }, this);
    input.on('blur', function () {
      var recipient = this.parseRecipient(this._input.get('value'));
      if (!selector.get('visible') && this.isNotValidRecipient(recipient)) {
        formController.markInvalid(this._input);
        if(this.selectedContact)
            this.selectedContact = null;
      }
    }, this);
    input.on('key', function (evt) {
      textarea.focus();
      evt.preventDefault();
    }, (Y.UA.gecko ? 'press' : 'down') + ':9,13', this);
    textarea.on('key', function (evt) {
      formController.fire('submit');
      evt.preventDefault();
    }, 'down:13', this);
    textarea.on('focus', function (evt) {
      formController.clearInvalid(textarea);
      Y.one('.q_error_message').set('innerHTML', '');
    }, this);
    textarea.on('blur', function () {
      var message = Y.Lang.trim(textarea.get('value'));
      if (!message || message === "") {
        formController.markInvalid(this._textarea);
      }
    }, this);

    input.on('typing', function (evt) {
      BA.qEvent('input', 'hasTypedEmail', {oneshot: 'session'});
    }, this);
    textarea.on('typing', function (evt) {
      BA.qEvent('input', 'hasTypedMessage', {oneshot: 'session'});
    }, this);
  },
  destructor: function () {
    delete this._input;
    if (this._selector) {
      this._selector.destroy();
      delete this._selector;
    }
    if (this.formController) {
      this.formController.destroy();
      delete this.formController;
    }
  },

  parseRecipient: function(recipient) {
    var matchStrings = recipient.match(/<.+>/);
    if(matchStrings) {
        var matchedString = matchStrings[0];
        recipient = matchedString.substring(1,matchedString.length-1);
    }
    return recipient;
  },

  isNotValidRecipient: function(recipient) {
    return !recipient || recipient === "" || !(!recipient.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) != !recipient.match(/^\(?([2-9]\d{2})\)?[- \.]*(\d{3})[- \.]*(\d{4})$/));
  },
  loadFacebookFriendsClick: function (evt) {
    Auth.oauthLogin('facebook');
    evt.halt();
    BA.qEvent('flow', 'clickedLoadFacebookFriends', { service: 'facebook', clicked: 'loadFacebookFriends' });
    BA.qEvent('auth', 'clickedLogin', { service: 'facebook', where: 'loadFacebookFriends' });
    BACON.once('authLoaded', function () {
      this._input.focus();
    }, this);
  },
  addParticipantClick: function (evt) {
    this.addInputParticipant();
  },
  addInputParticipant: function () {
    var host = this.get('host'),
        input = this._input,
        contact = this.getInputParticipant();
    if (contact) {
      host.one('.q_flow_participants').prepend(contact.addedHTML());
      this.addParticipant(contact);
      delete this.selectedContact;
      input.set('value', '');
      return contact;
    }
  },
  addParticipant: function (contact) {
    this.participants[contact._id] = contact;
  },
  getInputParticipant: function () {
    return this.selectedContact || BACON.Contact.fromString(this.parseRecipient(this._input.get('value')));
  },
  removeParticipantClick: function(ev) {
    var div = ev.target.ancestor('.q_formed_participant'),
        id = ev.target.getAttribute('q_id');
    div.remove().destroy(true);
    delete this.participants[id];
  },
  _onSubmit: function (evt) {
    var topic = BACON.get('item'),
        formController = this.formController,
        inputParticipant = this.getInputParticipant(),
        message = Y.Lang.trim(this._textarea.get('value')),
        participants = [],
        id;

    // Include the recipient entered in the To: field
    if (inputParticipant) {
      this.addParticipant(inputParticipant);
    } else {
      // Don't proceed if there is an invalid recipient in the To: field
      var recipient = this.parseRecipient(this._input.get('value'));
      if (this.isNotValidRecipient(recipient)) {
        evt.halt();
        formController.markInvalid(this._input);
        Y.one('.q_error_participant').set('innerHTML', 'Please enter a valid e-mail address or phone number');
        BA.qEvent('validation', 'invalidEmail', {oneshot: 'session'});
      }
    }

    // Pull participant data
    for (id in this.participants) {
      if (this.participants.hasOwnProperty(id))
        participants.push(this.participants[id].toJSON());
    }

    if (! Y.Object.size(this.participants)) {
      evt.halt();
      formController.markInvalid(this._input);
    }

    if (! BACON.get('item'))
      evt.halt();
    
    if (!message || message === "") {
      evt.halt();
      formController.markInvalid(this._textarea);
      Y.one('.q_error_message').set('innerHTML', 'Please enter a message');
      BA.qEvent('validation', 'invalidMessage', {oneshot: 'session'});
    }

    formController.set('data', {
      topic: topic.toJSON(),
      participants: participants
    });

    if (! BACON.get('authSession')) {
      evt.preventDefault();
      if (BACON.get('identity')) {
        Auth.siteLogin(function () {
          formController.fire('submit');
        });
      }
    }
  },
  hide: function () {
    this.get('parent').hide();
  },
  reset: function () {
    var host = this.get('host'),
        formController = this.formController,
        input = this._input,
        textarea = this._textarea;
    this.formController.clearInvalid(input);
    input.set('value', '');
    input.label.toggle(); // setting the value doesn't trigger the label, so we have to do it explicitly
    Y.one('.q_error_participant').set('innerHTML', '');
    this.formController.clearInvalid(textarea);
    textarea.set('value', '');
    textarea.label.toggle(); // setting the value doesn't trigger the label, so we have to do it explicitly
    Y.one('.q_error_message').set('innerHTML', '');
    this._selector.syncUI();
    host.all('.q_formed_participant').remove();
  },
  _onSuccess: function(resp, io) {
    var config = resp.flowConfig,
        recipientTypes = [],
        flowProperties = {recipientCount: 0};

    config.paneConfig = config.paneConfig || {};
    config.paneConfig.visible = true;
    config.paneConfig.suppressAttach = true;

    Y.Object.each(this.participants, function (participant) {
      var type = participant.type,
          source = participant.source;
      BA.qEvent('flow', 'sentToRecipient', { type: type, source: source });
      recipientTypes.push(type);
      flowProperties.recipientCount++;
    }, this, false);

    if (Y.Array.unique(recipientTypes).length == 1) {
      flowProperties.recipientType = recipientTypes[0];
    } else {
      flowProperties.recipientType = 'mixed';
    }

    BA.qEvent('flow', 'authoredFlow', flowProperties);

    //TODO move me into a separate handler?
    var item = BACON.get('item'),
        hasItem = item ? item.get('type') : false,
        itemId = item ? item.get('identifier') : null,
        itemIdType = item ? item.get('identifierType') : null;

    BA.qEvent('flow','sentMessage',{
      hasItem: hasItem, itemId: itemId, itemIdType: itemIdType
    });

    this.hide();
    BACON.ensureFlowButton(config);
    this.reset();
  },
  _authService: function(ev) {
    var service = ev.currentTarget.getAttribute('q_service');
    Auth.oauthLogin(service);
    ev.halt();
    BA.qEvent('auth', 'clickedLogin', { service: service, where: 'authoring' });
  },
  //Performs Google Auth cycle and stores the authenticated token and secret
  //in the sesssion. Once authenticated, call the google contact import module
  //Authenticated token and secret is available for the session lifetime
  _googleService: function(ev) {
    popup = Auth.googleCredentialsAuth();
    Y.later(100, this, function checkClosed() {
              if (popup.closed) {
                  contactsHandle = this._selector.get('source');
                  inputHandle = this._input;
                  contactsHandle.fetchData();
                  contactsHandle.once('dataLoaded', function() {
                      if(contactsHandle.googleContactsLoaded) {
                            inputHandle.focus();
                      } else {
                             Y.one('.q_error_participant').set('text', 'Google contacts not loaded');
                      }

                  });
              } else
                   Y.later(100, this, checkClosed);


    });
    ev.halt();
    BA.qEvent('flow', 'googleContactsImported', { service: 'google', where: 'authoring' });
  },
  postToServiceClick: function (evt) {
    var svc = evt.currentTarget.getAttribute('q_service');
    this.postToService(svc);
  },
  postToService: function(svc) {
    var item = BACON.get('item'),
        url = BACON.pathAppend("https://conversations.amazon.com", '/invitation/new'),
        popup, json;
    if (! item) {
      Y.log("Tried to post something before there was an item to post", 'error', 'bacon-flow-authoring');
      return;
    }
    json = item.toJSON();
    json.images.length = Math.min(1, json.images.length);
    url = BACON.queryStringAppend(url, {
      service: svc,
      site: BACON.config.getDefaultKey('siteKey'),
      topic: Y.JSON.stringify(json),
      authsessionUUID: BACON.get('authSession.uuid')
    });
    popup = window.open(url, 'quorusPostWindow', 'directories=no,location=no,menubar=no,resizable=no,scrollbars=yes,status=no,titlebar=no,toolbar=no,width=600,height=400');
    popup.focus();
    Y.later(100, this, function checkClosed() {
      if (popup.closed)
        Y.later(500, this, this.hide);
      else
        Y.later(100, this, checkClosed);
    });
    BA.qEvent('invitation', 'clickedPostButton', { service: svc });
  }
}, {
  NS: 'authoringForm'
});


/////////////////
//
// Current Item component
//
var CurrentItem = Y.Base.create('currentItem', BACON.Component, [BACON.EventObserver], {
  initializer: function() {
    this.observe(BACON, 'withValue', 'item', this.withNewItem);
  }, 
  withNewItem: function(ev) {
    //Setup the img display
    var item = BACON.get('item'),
        image = item && item.get('image'),
        h = this.get('host'), tmp;
    if (image) {
      image.applyImage(h.one('.q_item_image'));
    }
    (tmp = h.one('.q_item_name')) && tmp.setContent(item.get('name'));
  }
}, {
  NS: 'currentItem'
});

MobileAuthoringPane.CurrentItem = CurrentItem;

////////////////
//
// Listens on the user channel for this session
//
var UserListener = Y.Base.create('userListener', Y.Base, [BACON.AttributeExtensions, BACON.ChannelAdapter], {
    initializer: function(config) {
      this.onceValue('channel', function(ev) {
        var channel = this.get('channel');
        
        BACON.set('userChannel', channel);
        
        this.stowChannel();
        channel.after('update', this.stowChannel, this);
	
      }, this);
    },
    // listen() should be invoked just after construction
    // Ideally, the initializer would invoke it, but that's blocked by YUI bug #2529898
    listen: function() {
      // needs to be auth-specific, so we lose this value after logout
      // ideally, we'd be able to stow this in some session data store
      this.channelKey = "session/" + BACON.get('authSession.uuid') + "/user/channel";
      
      // fetch it if it wasn't previously persisted
      this.unstowChannel() || this.fetchChannel();
      
      // after 'init' has already happened in the initializer, so we can't do this there
      // (YUI bug #2529898)
      this.after('init', function() {
        // install this listener only after we get initial state
        this.after('newFlowUUIDsChange', function(ev) {
          if (ev.newVal.toString() != "")
            this.onNewFlow();
        }, this);
      }, this);
    },
    // retrieve channel from session storage
    unstowChannel: function() {
      var channelObj = BACON.config.getSessionKey(this.channelKey),
             channel = channelObj && new BACON.Channel(channelObj);
      
      if (channel) this.set('channel', channel);
      
      return channel;
    },
    // persist the channel in session storage
    stowChannel: function() {
      var channel = this.get('channel')
      if (channel) BACON.config.setSessionKey(this.channelKey, channel);
    },
    // fetch my auth-specific user channel
    fetchChannel: function() {
      BACON.QuorusIo.rest('GET', 'users', 'current', 'channel', {
        on: {
          success: function(obj) {
            var resp = Y.JSON.parse(obj.get('responseText'));
            
            if (resp.channel)
              this.set('channel', new BACON.Channel(resp.channel));
          }
        },
        context: this
      });
    },
    // pop any new flows that come down the pipe
    onNewFlow: function() {
      var newFlowUUIDs = this.get('newFlowUUIDs');
      
      if (newFlowUUIDs && newFlowUUIDs.length > 0)
        Y.Array.each(newFlowUUIDs, UserListener.popFlow);
    }
  }, {
    ATTRS: {
      newFlowUUIDs: {},
      notificationPosition: {}
    },
    popFlow: function(uuid) {
      var config = { uuid: uuid, paneConfig: { visible: true, beckon: true } };
      BACON.ensureFlowButton(config); // pop it
    }
  });
BACON.UserListener = UserListener;

}, '@VERSION@', { requires: ["bacon-ab","bacon-advice","bacon-analytics","bacon-autobinding","bacon-auth-host","bacon-bar-core","bacon-channel-adapter","bacon-component","bacon-config","bacon-form","bacon-io","bacon-styles-flow","bacon-events","widget","bacon-contacts"] });
