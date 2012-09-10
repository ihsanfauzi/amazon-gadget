/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("attribute-complex",function(b){var a=b.Object,c=".";b.Attribute.Complex=function(){};b.Attribute.Complex.prototype={_normAttrVals:function(g){var i={},h={},j,d,f,e;if(g){for(e in g){if(g.hasOwnProperty(e)){if(e.indexOf(c)!==-1){j=e.split(c);d=j.shift();f=h[d]=h[d]||[];f[f.length]={path:j,value:g[e]};}else{i[e]=g[e];}}}return{simple:i,complex:h};}else{return null;}},_getAttrInitVal:function(o,m,r){var g=m.value,q=m.valueFn,e,k=false,d,f,j,h,s,p,n;if(!m.readOnly&&r){d=r.simple;if(d&&d.hasOwnProperty(o)){g=d[o];k=true;}}if(q&&!k){if(!q.call){q=this[q];}if(q){e=q.call(this,o);g=e;}}if(!m.readOnly&&r){f=r.complex;if(f&&f.hasOwnProperty(o)&&(g!==undefined)&&(g!==null)){n=f[o];for(j=0,h=n.length;j<h;++j){s=n[j].path;p=n[j].value;a.setValue(g,s,p);}}}return g;}};b.mix(b.Attribute,b.Attribute.Complex,true,null,1);b.AttributeComplex=b.Attribute.Complex;},"3.6.0",{requires:["attribute-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("json-parse",function(b){function k(e){return(b.config.win||this||{})[e];}var j=k("JSON"),l=(Object.prototype.toString.call(j)==="[object JSON]"&&j),f=!!l,o=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,m=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,d=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,g=/(?:^|:|,)(?:\s*\[)+/g,p=/[^\],:{}\s]/,n=function(e){return"\\u"+("0000"+(+(e.charCodeAt(0))).toString(16)).slice(-4);},c=function(r,e){var q=function(x,u){var t,s,w=x[u];if(w&&typeof w==="object"){for(t in w){if(w.hasOwnProperty(t)){s=q(w,t);if(s===undefined){delete w[t];}else{w[t]=s;}}}}return e.call(x,u,w);};return typeof e==="function"?q({"":r},""):r;},h=function(q,e){q=q.replace(o,n);if(!p.test(q.replace(m,"@").replace(d,"]").replace(g,""))){return c(eval("("+q+")"),e);}throw new SyntaxError("JSON.parse");};b.namespace("JSON").parse=function(q,e){if(typeof q!=="string"){q+="";}return l&&b.JSON.useNativeParse?l.parse(q,e):h(q,e);};function a(q,e){return q==="ok"?true:e;}if(l){try{f=(l.parse('{"ok":false}',a)).ok;}catch(i){f=false;}}b.JSON.useNativeParse=f;},"3.6.0",{requires:["yui-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("json-stringify",function(b){var j=(b.config.win||{}).JSON,N=b.Lang,p=N.isFunction,I=N.isObject,v=N.isArray,k=Object.prototype.toString,C=(k.call(j)==="[object JSON]"&&j),F=!!C,D="undefined",r="object",A="null",L="string",B="number",x="boolean",l="date",E={"undefined":D,"string":L,"[object String]":L,"number":B,"[object Number]":B,"boolean":x,"[object Boolean]":x,"[object Date]":l,"[object RegExp]":r},g="",q="{",a="}",y="[",i="]",s=",",c=",\n",m="\n",G=":",h=": ",u='"',d=/[\x00-\x07\x0b\x0e-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n=[[/\\/g,"\\\\"],[/\"/g,'\\"'],[/\x08/g,"\\b"],[/\x09/g,"\\t"],[/\x0a/g,"\\n"],[/\x0c/g,"\\f"],[/\x0d/g,"\\r"]],t=n.length,f={},o,H;function O(P){var e=typeof P;return E[e]||E[k.call(P)]||(e===r?(P?r:A):D);}function K(e){if(!f[e]){f[e]="\\u"+("0000"+(+(e.charCodeAt(0))).toString(16)).slice(-4);o[e]=0;}if(++o[e]===H){n.push([new RegExp(e,"g"),f[e]]);t=n.length;}return f[e];}function w(Q){var e,P;for(e=0;e<t;e++){P=n[e];Q=Q.replace(P[0],P[1]);}return u+Q.replace(d,K)+u;}function z(e,P){return e.replace(/^/gm,P);}function J(P,X,e){if(P===undefined){return undefined;}var R=p(X)?X:null,W=k.call(e).match(/String|Number/)||[],Y=b.JSON.dateToString,V=[],T,S,U;o={};H=b.JSON.charCacheThreshold;if(R||!v(X)){X=undefined;}if(X){T={};for(S=0,U=X.length;S<U;++S){T[X[S]]=true;}X=T;}e=W[0]==="Number"?new Array(Math.min(Math.max(0,e),10)+1).join(" "):(e||g).slice(0,10);function Q(ab,ah){var af=ab[ah],aj=O(af),ae=[],ad=e?h:G,ac,aa,ai,Z,ag;if(I(af)&&p(af.toJSON)){af=af.toJSON(ah);}else{if(aj===l){af=Y(af);}}if(p(R)){af=R.call(ab,ah,af);}if(af!==ab[ah]){aj=O(af);}switch(aj){case l:case r:break;case L:return w(af);case B:return isFinite(af)?af+g:A;case x:return af+g;case A:return A;default:return undefined;}for(aa=V.length-1;aa>=0;--aa){if(V[aa]===af){throw new Error("JSON.stringify. Cyclical reference");}}ac=v(af);V.push(af);if(ac){for(aa=af.length-1;aa>=0;--aa){ae[aa]=Q(af,aa)||A;}}else{ai=X||af;aa=0;for(Z in ai){if(ai.hasOwnProperty(Z)){ag=Q(af,Z);if(ag){ae[aa++]=w(Z)+ad+ag;}}}}V.pop();if(e&&ae.length){return ac?y+m+z(ae.join(c),e)+m+i:q+m+z(ae.join(c),e)+m+a;}else{return ac?y+ae.join(s)+i:q+ae.join(s)+a;}}return Q({"":P},"");}if(C){try{F=("0"===C.stringify(0));}catch(M){F=false;}}b.mix(b.namespace("JSON"),{useNativeStringify:F,dateToString:function(P){function e(Q){return Q<10?"0"+Q:Q;}return P.getUTCFullYear()+"-"+e(P.getUTCMonth()+1)+"-"+e(P.getUTCDate())+"T"+e(P.getUTCHours())+G+e(P.getUTCMinutes())+G+e(P.getUTCSeconds())+"Z";},stringify:function(Q,e,P){return C&&b.JSON.useNativeStringify?C.stringify(Q,e,P):J(Q,e,P);},charCacheThreshold:100});},"3.6.0",{requires:["yui-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-delegate",function(a){var c=a.Array,h=a.Lang,b=h.isString,i=h.isObject,e=h.isArray,g=a.Selector.test,d=a.Env.evt.handles;function f(u,w,l,k){var s=c(arguments,0,true),t=b(l)?l:null,r,o,j,n,v,m,q,x,p;if(i(u)){x=[];if(e(u)){for(m=0,q=u.length;m<q;++m){s[0]=u[m];x.push(a.delegate.apply(a,s));}}else{s.unshift(null);for(m in u){if(u.hasOwnProperty(m)){s[0]=m;s[1]=u[m];x.push(a.delegate.apply(a,s));}}}return new a.EventHandle(x);}r=u.split(/\|/);if(r.length>1){v=r.shift();s[0]=u=r.shift();}o=a.Node.DOM_EVENTS[u];if(i(o)&&o.delegate){p=o.delegate.apply(o,arguments);}if(!p){if(!u||!w||!l||!k){return;}j=(t)?a.Selector.query(t,null,true):l;if(!j&&b(l)){p=a.on("available",function(){a.mix(p,a.delegate.apply(a,s),true);},l);}if(!p&&j){s.splice(2,2,j);p=a.Event._attach(s,{facade:false});p.sub.filter=k;p.sub._notify=f.notifySub;}}if(p&&v){n=d[v]||(d[v]={});n=n[u]||(n[u]=[]);n.push(p);}return p;}f.notifySub=function(q,l,p){l=l.slice();if(this.args){l.push.apply(l,this.args);}var o=f._applyFilter(this.filter,l,p),n,m,j,k;if(o){o=c(o);n=l[0]=new a.DOMEventFacade(l[0],p.el,p);n.container=a.one(p.el);for(m=0,j=o.length;m<j&&!n.stopped;++m){n.currentTarget=a.one(o[m]);k=this.fn.apply(this.context||n.currentTarget,l);if(k===false){break;}}return k;}};f.compileFilter=a.cached(function(j){return function(l,k){return g(l._node,j,(k.currentTarget===k.target)?null:k.currentTarget._node);};});f._applyFilter=function(n,l,q){var p=l[0],j=q.el,o=p.target||p.srcElement,k=[],m=false;if(o.nodeType===3){o=o.parentNode;}l.unshift(o);if(b(n)){while(o){m=(o===j);if(g(o,n,(m?null:j))){k.push(o);}if(m){break;}o=o.parentNode;}}else{l[0]=a.one(o);l[1]=new a.DOMEventFacade(p,j,q);while(o){if(n.apply(l[0],l)){k.push(o);}if(o===j){break;}o=o.parentNode;l[0]=a.one(o);}l[1]=p;}if(k.length<=1){k=k[0];}l.shift();return k;};a.delegate=a.Event.delegate=f;},"3.6.0",{requires:["node-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-synthetic",function(b){var j=b.Env.evt.dom_map,d=b.Array,i=b.Lang,l=i.isObject,c=i.isString,e=i.isArray,g=b.Selector.query,k=function(){};function h(n,m){this.handle=n;this.emitFacade=m;}h.prototype.fire=function(s){var t=d(arguments,0,true),q=this.handle,o=q.evt,m=q.sub,p=m.context,u=m.filter,n=s||{},r;if(this.emitFacade){if(!s||!s.preventDefault){n=o._getFacade();if(l(s)&&!s.preventDefault){b.mix(n,s,true);t[0]=n;}else{t.unshift(n);}}n.type=o.type;n.details=t.slice();if(u){n.container=o.host;}}else{if(u&&l(s)&&s.currentTarget){t.shift();}}m.context=p||n.currentTarget||o.host;r=o.fire.apply(o,t);m.context=p;return r;};function f(o,n,m){this.handles=[];this.el=o;this.key=m;this.domkey=n;}f.prototype={constructor:f,type:"_synth",fn:k,capture:false,register:function(m){m.evt.registry=this;this.handles.push(m);},unregister:function(p){var o=this.handles,n=j[this.domkey],m;for(m=o.length-1;m>=0;--m){if(o[m].sub===p){o.splice(m,1);break;}}if(!o.length){delete n[this.key];if(!b.Object.size(n)){delete j[this.domkey];}}},detachAll:function(){var n=this.handles,m=n.length;while(--m>=0){n[m].detach();}}};function a(){this._init.apply(this,arguments);}b.mix(a,{Notifier:h,SynthRegistry:f,getRegistry:function(s,r,p){var q=s._node,o=b.stamp(q),n="event:"+o+r+"_synth",m=j[o];if(p){if(!m){m=j[o]={};}if(!m[n]){m[n]=new f(q,o,n);}}return(m&&m[n])||null;},_deleteSub:function(n){if(n&&n.fn){var m=this.eventDef,o=(n.filter)?"detachDelegate":"detach";this.subscribers={};this.subCount=0;m[o](n.node,n,this.notifier,n.filter);this.registry.unregister(n);delete n.fn;delete n.node;delete n.context;}},prototype:{constructor:a,_init:function(){var m=this.publishConfig||(this.publishConfig={});this.emitFacade=("emitFacade" in m)?m.emitFacade:true;m.emitFacade=false;},processArgs:k,on:k,detach:k,delegate:k,detachDelegate:k,_on:function(s,t){var u=[],o=s.slice(),p=this.processArgs(s,t),q=s[2],m=t?"delegate":"on",n,r;n=(c(q))?g(q):d(q||b.one(b.config.win));if(!n.length&&c(q)){r=b.on("available",function(){b.mix(r,b[m].apply(b,o),true);},q);return r;}b.Array.each(n,function(w){var x=s.slice(),v;w=b.one(w);if(w){if(t){v=x.splice(3,1)[0];}x.splice(0,4,x[1],x[3]);if(!this.preventDups||!this.getSubs(w,s,null,true)){u.push(this._subscribe(w,m,x,p,v));}}},this);return(u.length===1)?u[0]:new b.EventHandle(u);},_subscribe:function(q,o,t,r,p){var v=new b.CustomEvent(this.type,this.publishConfig),s=v.on.apply(v,t),u=new h(s,this.emitFacade),n=a.getRegistry(q,this.type,true),m=s.sub;m.node=q;m.filter=p;if(r){this.applyArgExtras(r,m);}b.mix(v,{eventDef:this,notifier:u,host:q,currentTarget:q,target:q,el:q._node,_delete:a._deleteSub},true);s.notifier=u;n.register(s);this[o](q,m,u,p);return s;},applyArgExtras:function(m,n){n._extra=m;},_detach:function(o){var t=o[2],r=(c(t))?g(t):d(t),s,q,m,p,n;o.splice(2,1);for(q=0,m=r.length;q<m;++q){s=b.one(r[q]);if(s){p=this.getSubs(s,o);if(p){for(n=p.length-1;n>=0;--n){p[n].detach();}}}}},getSubs:function(o,u,n,q){var m=a.getRegistry(o,this.type),v=[],t,p,s,r;if(m){t=m.handles;if(!n){n=this.subMatch;}for(p=0,s=t.length;p<s;++p){r=t[p];if(n.call(this,r.sub,u)){if(q){return r;}else{v.push(t[p]);}}}}return v.length&&v;},subMatch:function(n,m){return !m[1]||n.fn===m[1];}}},true);b.SyntheticEvent=a;b.Event.define=function(o,n,q){var p,r,m;if(o&&o.type){p=o;q=n;}else{if(n){p=b.merge({type:o},n);}}if(p){if(q||!b.Node.DOM_EVENTS[p.type]){r=function(){a.apply(this,arguments);};b.extend(r,a,p);m=new r();o=m.type;b.Node.DOM_EVENTS[o]=b.Env.evt.plugins[o]={eventDef:m,on:function(){return m._on(d(arguments));},delegate:function(){return m._on(d(arguments),true);},detach:function(){return m._detach(d(arguments));}};}}else{if(c(o)||e(o)){b.Array.each(d(o),function(s){b.Node.DOM_EVENTS[s]=1;});}}return m;};},"3.6.0",{requires:["node-base","event-custom-complex"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-mouseenter",function(f){var b=f.Env.evt.dom_wrappers,d=f.DOM.contains,c=f.Array,e=function(){},a={proxyType:"mouseover",relProperty:"fromElement",_notify:function(k,i,h){var g=this._node,j=k.relatedTarget||k[i];if(g!==j&&!d(g,j)){h.fire(new f.DOMEventFacade(k,g,b["event:"+f.stamp(g)+k.type]));}},on:function(k,i,j){var h=f.Node.getDOMNode(k),g=[this.proxyType,this._notify,h,null,this.relProperty,j];i.handle=f.Event._attach(g,{facade:false});},detach:function(h,g){g.handle.detach();},delegate:function(l,j,k,i){var h=f.Node.getDOMNode(l),g=[this.proxyType,e,h,null,k];j.handle=f.Event._attach(g,{facade:false});j.handle.sub.filter=i;j.handle.sub.relProperty=this.relProperty;j.handle.sub._notify=this._filterNotify;},_filterNotify:function(j,p,g){p=p.slice();if(this.args){p.push.apply(p,this.args);}var h=f.delegate._applyFilter(this.filter,p,g),q=p[0].relatedTarget||p[0][this.relProperty],o,k,m,n,l;if(h){h=c(h);for(k=0,m=h.length&&(!o||!o.stopped);k<m;++k){l=h[0];if(!d(l,q)){if(!o){o=new f.DOMEventFacade(p[0],l,g);o.container=f.one(g.el);}o.currentTarget=f.one(l);n=p[1].fire(o);if(n===false){break;}}}}return n;},detachDelegate:function(h,g){g.handle.detach();}};f.Event.define("mouseenter",a,true);f.Event.define("mouseleave",f.merge(a,{proxyType:"mouseout",relProperty:"toElement"}),true);},"3.6.0",{requires:["event-synthetic"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-style",function(a){(function(e){var p="documentElement",b="defaultView",n="ownerDocument",h="style",i="float",r="cssFloat",s="styleFloat",k="transparent",d="getComputedStyle",c="getBoundingClientRect",o=e.config.win,g=e.config.doc,t=undefined,q=e.DOM,f="transform",l=["WebkitTransform","MozTransform","OTransform"],m=/color$/i,j=/width|height|top|left|right|bottom|margin|padding/i;e.Array.each(l,function(u){if(u in g[p].style){f=u;}});e.mix(q,{DEFAULT_UNIT:"px",CUSTOM_STYLES:{},setStyle:function(x,u,y,w){w=w||x.style;var v=q.CUSTOM_STYLES;if(w){if(y===null||y===""){y="";}else{if(!isNaN(new Number(y))&&j.test(u)){y+=q.DEFAULT_UNIT;}}if(u in v){if(v[u].set){v[u].set(x,y,w);return;}else{if(typeof v[u]==="string"){u=v[u];}}}else{if(u===""){u="cssText";y="";}}w[u]=y;}},getStyle:function(x,u,w){w=w||x.style;var v=q.CUSTOM_STYLES,y="";if(w){if(u in v){if(v[u].get){return v[u].get(x,u,w);}else{if(typeof v[u]==="string"){u=v[u];}}}y=w[u];if(y===""){y=q[d](x,u);}}return y;},setStyles:function(v,w){var u=v.style;e.each(w,function(x,y){q.setStyle(v,y,x,u);},q);},getComputedStyle:function(w,u){var y="",x=w[n],v;if(w[h]&&x[b]&&x[b][d]){v=x[b][d](w,null);if(v){y=v[u];}}return y;}});if(g[p][h][r]!==t){q.CUSTOM_STYLES[i]=r;}else{if(g[p][h][s]!==t){q.CUSTOM_STYLES[i]=s;}}if(e.UA.opera){q[d]=function(w,v){var u=w[n][b],x=u[d](w,"")[v];if(m.test(v)){x=e.Color.toRGB(x);}return x;};}if(e.UA.webkit){q[d]=function(w,v){var u=w[n][b],x=u[d](w,"")[v];if(x==="rgba(0, 0, 0, 0)"){x=k;}return x;};}e.DOM._getAttrOffset=function(y,v){var A=e.DOM[d](y,v),x=y.offsetParent,u,w,z;if(A==="auto"){u=e.DOM.getStyle(y,"position");if(u==="static"||u==="relative"){A=0;}else{if(x&&x[c]){w=x[c]()[v];z=y[c]()[v];if(v==="left"||v==="top"){A=z-w;}else{A=w-y[c]()[v];}}}}return A;};e.DOM._getOffset=function(u){var w,v=null;if(u){w=q.getStyle(u,"position");v=[parseInt(q[d](u,"left"),10),parseInt(q[d](u,"top"),10)];if(isNaN(v[0])){v[0]=parseInt(q.getStyle(u,"left"),10);if(isNaN(v[0])){v[0]=(w==="relative")?0:u.offsetLeft||0;}}if(isNaN(v[1])){v[1]=parseInt(q.getStyle(u,"top"),10);if(isNaN(v[1])){v[1]=(w==="relative")?0:u.offsetTop||0;}}}return v;};q.CUSTOM_STYLES.transform={set:function(v,w,u){u[f]=w;},get:function(v,u){return q[d](v,f);}};})(a);(function(d){var b=parseInt,c=RegExp;d.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},re_RGB:/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,re_hex:/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,re_hex3:/([0-9A-F])/gi,toRGB:function(e){if(!d.Color.re_RGB.test(e)){e=d.Color.toHex(e);}if(d.Color.re_hex.exec(e)){e="rgb("+[b(c.$1,16),b(c.$2,16),b(c.$3,16)].join(", ")+")";}return e;},toHex:function(f){f=d.Color.KEYWORDS[f]||f;if(d.Color.re_RGB.exec(f)){f=[Number(c.$1).toString(16),Number(c.$2).toString(16),Number(c.$3).toString(16)];for(var e=0;e<f.length;e++){if(f[e].length<2){f[e]="0"+f[e];}}f=f.join("");}if(f.length<6){f=f.replace(d.Color.re_hex3,"$1$1");}if(f!=="transparent"&&f.indexOf("#")<0){f="#"+f;}return f.toUpperCase();}};})(a);},"3.6.0",{requires:["dom-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("dom-screen",function(a){(function(f){var d="documentElement",q="compatMode",o="position",c="fixed",m="relative",g="left",h="top",i="BackCompat",p="medium",e="borderLeftWidth",b="borderTopWidth",r="getBoundingClientRect",k="getComputedStyle",l=f.DOM,n=/^t(?:able|d|h)$/i,j;if(f.UA.ie){if(f.config.doc[q]!=="BackCompat"){j=d;}else{j="body";}}f.mix(l,{winHeight:function(t){var s=l._getWinSize(t).height;return s;},winWidth:function(t){var s=l._getWinSize(t).width;return s;},docHeight:function(t){var s=l._getDocSize(t).height;return Math.max(s,l._getWinSize(t).height);},docWidth:function(t){var s=l._getDocSize(t).width;return Math.max(s,l._getWinSize(t).width);},docScrollX:function(u,v){v=v||(u)?l._getDoc(u):f.config.doc;var t=v.defaultView,s=(t)?t.pageXOffset:0;return Math.max(v[d].scrollLeft,v.body.scrollLeft,s);},docScrollY:function(u,v){v=v||(u)?l._getDoc(u):f.config.doc;var t=v.defaultView,s=(t)?t.pageYOffset:0;return Math.max(v[d].scrollTop,v.body.scrollTop,s);},getXY:function(){if(f.config.doc[d][r]){return function(v){var D=null,w,t,y,x,C,B,A,z,s,u;if(v&&v.tagName){A=v.ownerDocument;y=A[q];if(y!==i){u=A[d];}else{u=A.body;}if(u.contains){s=u.contains(v);}else{s=f.DOM.contains(u,v);}if(s){z=A.defaultView;if(z&&"pageXOffset" in z){w=z.pageXOffset;t=z.pageYOffset;}else{w=(j)?A[j].scrollLeft:l.docScrollX(v,A);t=(j)?A[j].scrollTop:l.docScrollY(v,A);}if(f.UA.ie){if(!A.documentMode||A.documentMode<8||y===i){C=u.clientLeft;B=u.clientTop;}}x=v[r]();D=[x.left,x.top];if(C||B){D[0]-=C;D[1]-=B;}if((t||w)){if(!f.UA.ios||(f.UA.ios>=4.2)){D[0]+=w;D[1]+=t;}}}else{D=l._getOffset(v);}}return D;};}else{return function(t){var w=null,v,s,y,u,x;if(t){if(l.inDoc(t)){w=[t.offsetLeft,t.offsetTop];v=t.ownerDocument;s=t;y=((f.UA.gecko||f.UA.webkit>519)?true:false);while((s=s.offsetParent)){w[0]+=s.offsetLeft;w[1]+=s.offsetTop;if(y){w=l._calcBorders(s,w);}}if(l.getStyle(t,o)!=c){s=t;while((s=s.parentNode)){u=s.scrollTop;x=s.scrollLeft;if(f.UA.gecko&&(l.getStyle(s,"overflow")!=="visible")){w=l._calcBorders(s,w);}if(u||x){w[0]-=x;w[1]-=u;}}w[0]+=l.docScrollX(t,v);w[1]+=l.docScrollY(t,v);}else{w[0]+=l.docScrollX(t,v);w[1]+=l.docScrollY(t,v);}}else{w=l._getOffset(t);}}return w;};}}(),getScrollbarWidth:f.cached(function(){var v=f.config.doc,t=v.createElement("div"),s=v.getElementsByTagName("body")[0],u=0.1;if(s){t.style.cssText="position:absolute;visibility:hidden;overflow:scroll;width:20px;";t.appendChild(v.createElement("p")).style.height="1px";s.insertBefore(t,s.firstChild);u=t.offsetWidth-t.clientWidth;s.removeChild(t);}return u;},null,0.1),getX:function(s){return l.getXY(s)[0];},getY:function(s){return l.getXY(s)[1];},setXY:function(t,w,z){var u=l.setStyle,y,x,s,v;if(t&&w){y=l.getStyle(t,o);x=l._getOffset(t);if(y=="static"){y=m;u(t,o,y);}v=l.getXY(t);if(w[0]!==null){u(t,g,w[0]-v[0]+x[0]+"px");}if(w[1]!==null){u(t,h,w[1]-v[1]+x[1]+"px");}if(!z){s=l.getXY(t);if(s[0]!==w[0]||s[1]!==w[1]){l.setXY(t,w,true);}}}else{}},setX:function(t,s){return l.setXY(t,[s,null]);},setY:function(s,t){return l.setXY(s,[null,t]);},swapXY:function(t,s){var u=l.getXY(t);l.setXY(t,l.getXY(s));l.setXY(s,u);},_calcBorders:function(v,w){var u=parseInt(l[k](v,b),10)||0,s=parseInt(l[k](v,e),10)||0;if(f.UA.gecko){if(n.test(v.tagName)){u=0;s=0;}}w[0]+=s;w[1]+=u;return w;},_getWinSize:function(v,y){y=y||(v)?l._getDoc(v):f.config.doc;var x=y.defaultView||y.parentWindow,z=y[q],u=x.innerHeight,t=x.innerWidth,s=y[d];if(z&&!f.UA.opera){if(z!="CSS1Compat"){s=y.body;}u=s.clientHeight;t=s.clientWidth;}return{height:u,width:t};},_getDocSize:function(t){var u=(t)?l._getDoc(t):f.config.doc,s=u[d];if(u[q]!="CSS1Compat"){s=u.body;}return{height:s.scrollHeight,width:s.scrollWidth};}});})(a);(function(g){var d="top",c="right",h="bottom",b="left",f=function(m,k){var o=Math.max(m[d],k[d]),p=Math.min(m[c],k[c]),i=Math.min(m[h],k[h]),j=Math.max(m[b],k[b]),n={};n[d]=o;n[c]=p;n[h]=i;n[b]=j;return n;},e=g.DOM;g.mix(e,{region:function(j){var k=e.getXY(j),i=false;if(j&&k){i=e._getRegion(k[1],k[0]+j.offsetWidth,k[1]+j.offsetHeight,k[0]);}return i;},intersect:function(k,i,m){var j=m||e.region(k),l={},p=i,o;if(p.tagName){l=e.region(p);}else{if(g.Lang.isObject(i)){l=i;}else{return false;}}o=f(l,j);return{top:o[d],right:o[c],bottom:o[h],left:o[b],area:((o[h]-o[d])*(o[c]-o[b])),yoff:((o[h]-o[d])),xoff:(o[c]-o[b]),inRegion:e.inRegion(k,i,false,m)};},inRegion:function(l,i,j,o){var m={},k=o||e.region(l),q=i,p;if(q.tagName){m=e.region(q);}else{if(g.Lang.isObject(i)){m=i;}else{return false;}}if(j){return(k[b]>=m[b]&&k[c]<=m[c]&&k[d]>=m[d]&&k[h]<=m[h]);}else{p=f(m,k);if(p[h]>=p[d]&&p[c]>=p[b]){return true;}else{return false;}}},inViewportRegion:function(j,i,k){return e.inRegion(j,e.viewportRegion(j),i,k);},_getRegion:function(k,m,i,j){var n={};n[d]=n[1]=k;n[b]=n[0]=j;n[h]=i;n[c]=m;n.width=n[c]-n[b];n.height=n[h]-n[d];return n;},viewportRegion:function(j){j=j||g.config.doc.documentElement;var i=false,l,k;if(j){l=e.docScrollX(j);k=e.docScrollY(j);i=e._getRegion(k,e.winWidth(j)+l,k+e.winHeight(j),l);}return i;}});})(a);},"3.6.0",{requires:["dom-base","dom-style"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-screen",function(a){a.each(["winWidth","winHeight","docWidth","docHeight","docScrollX","docScrollY"],function(b){a.Node.ATTRS[b]={getter:function(){var c=Array.prototype.slice.call(arguments);c.unshift(a.Node.getDOMNode(this));return a.DOM[b].apply(this,c);}};});a.Node.ATTRS.scrollLeft={getter:function(){var b=a.Node.getDOMNode(this);return("scrollLeft" in b)?b.scrollLeft:a.DOM.docScrollX(b);},setter:function(c){var b=a.Node.getDOMNode(this);if(b){if("scrollLeft" in b){b.scrollLeft=c;}else{if(b.document||b.nodeType===9){a.DOM._getWin(b).scrollTo(c,a.DOM.docScrollY(b));}}}else{}}};a.Node.ATTRS.scrollTop={getter:function(){var b=a.Node.getDOMNode(this);return("scrollTop" in b)?b.scrollTop:a.DOM.docScrollY(b);},setter:function(c){var b=a.Node.getDOMNode(this);if(b){if("scrollTop" in b){b.scrollTop=c;}else{if(b.document||b.nodeType===9){a.DOM._getWin(b).scrollTo(a.DOM.docScrollX(b),c);}}}else{}}};a.Node.importMethod(a.DOM,["getXY","setXY","getX","setX","getY","setY","swapXY"]);a.Node.ATTRS.region={getter:function(){var b=this.getDOMNode(),c;if(b&&!b.tagName){if(b.nodeType===9){b=b.documentElement;}}if(a.DOM.isWindow(b)){c=a.DOM.viewportRegion(b);}else{c=a.DOM.region(b);}return c;}};a.Node.ATTRS.viewportRegion={getter:function(){return a.DOM.viewportRegion(a.Node.getDOMNode(this));}};a.Node.importMethod(a.DOM,"inViewportRegion");a.Node.prototype.intersect=function(b,d){var c=a.Node.getDOMNode(this);if(a.instanceOf(b,a.Node)){b=a.Node.getDOMNode(b);}return a.DOM.intersect(c,b,d);};a.Node.prototype.inRegion=function(b,d,e){var c=a.Node.getDOMNode(this);if(a.instanceOf(b,a.Node)){b=a.Node.getDOMNode(b);}return a.DOM.inRegion(c,b,d,e);};},"3.6.0",{requires:["node-base","dom-screen"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("classnamemanager",function(c){var b="classNamePrefix",d="classNameDelimiter",a=c.config;a[b]=a[b]||"yui3";a[d]=a[d]||"-";c.ClassNameManager=function(){var e=a[b],f=a[d];return{getClassName:c.cached(function(){var g=c.Array(arguments);if(g[g.length-1]!==true){g.unshift(e);}else{g.pop();}return g.join(f);})};}();},"3.6.0",{requires:["yui-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-focus",function(f){var d=f.Event,c=f.Lang,a=c.isString,e=f.Array.indexOf,b=c.isFunction(f.DOM.create('<p onbeforeactivate=";"/>').onbeforeactivate);function g(i,h,k){var j="_"+i+"Notifiers";f.Event.define(i,{_attach:function(m,n,l){if(f.DOM.isWindow(m)){return d._attach([i,function(o){n.fire(o);},m]);}else{return d._attach([h,this._proxy,m,this,n,l],{capture:true});}},_proxy:function(o,s,q){var p=o.target,m=o.currentTarget,r=p.getData(j),t=f.stamp(m._node),l=(b||p!==m),n;s.currentTarget=(q)?p:m;s.container=(q)?m:null;if(!r){r={};p.setData(j,r);if(l){n=d._attach([k,this._notify,p._node]).sub;n.once=true;}}else{l=true;}if(!r[t]){r[t]=[];}r[t].push(s);if(!l){this._notify(o);}},_notify:function(w,q){var C=w.currentTarget,l=C.getData(j),x=C.ancestors(),B=C.get("ownerDocument"),s=[],m=l?f.Object.keys(l).length:0,A,r,t,n,o,y,u,v,p,z;C.clearData(j);x.push(C);if(B){x.unshift(B);}x._nodes.reverse();if(m){y=m;x.some(function(H){var G=f.stamp(H),E=l[G],F,D;if(E){m--;for(F=0,D=E.length;F<D;++F){if(E[F].handle.sub.filter){s.push(E[F]);}}}return !m;});m=y;}while(m&&(A=x.shift())){n=f.stamp(A);r=l[n];if(r){for(u=0,v=r.length;u<v;++u){t=r[u];p=t.handle.sub;o=true;w.currentTarget=A;if(p.filter){o=p.filter.apply(A,[A,w].concat(p.args||[]));s.splice(e(s,t),1);}if(o){w.container=t.container;z=t.fire(w);}if(z===false||w.stopped===2){break;}}delete r[n];m--;}if(w.stopped!==2){for(u=0,v=s.length;u<v;++u){t=s[u];p=t.handle.sub;if(p.filter.apply(A,[A,w].concat(p.args||[]))){w.container=t.container;w.currentTarget=A;z=t.fire(w);}if(z===false||w.stopped===2){break;}}}if(w.stopped){break;}}},on:function(n,l,m){l.handle=this._attach(n._node,m);},detach:function(m,l){l.handle.detach();},delegate:function(o,m,n,l){if(a(l)){m.filter=function(p){return f.Selector.test(p._node,l,o===p?null:o._node);};}m.handle=this._attach(o._node,n,true);},detachDelegate:function(m,l){l.handle.detach();}},true);}if(b){g("focus","beforeactivate","focusin");g("blur","beforedeactivate","focusout");}else{g("focus","focus","focus");g("blur","blur","blur");}},"3.6.0",{requires:["event-synthetic"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-style",function(a){(function(b){b.mix(b.Node.prototype,{setStyle:function(c,d){b.DOM.setStyle(this._node,c,d);return this;},setStyles:function(c){b.DOM.setStyles(this._node,c);return this;},getStyle:function(c){return b.DOM.getStyle(this._node,c);},getComputedStyle:function(c){return b.DOM.getComputedStyle(this._node,c);}});b.NodeList.importMethod(b.Node.prototype,["getStyle","getComputedStyle","setStyle","setStyles"]);})(a);},"3.6.0",{requires:["dom-style","node-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-base",function(b){var g=b.Lang,r=b.Node,e=b.ClassNameManager,w=e.getClassName,M,s=b.cached(function(L){return L.substring(0,1).toUpperCase()+L.substring(1);}),F="content",P="visible",K="hidden",y="disabled",B="focused",d="width",A="height",N="boundingBox",v="contentBox",k="parentNode",m="ownerDocument",x="auto",j="srcNode",I="body",H="tabIndex",q="id",i="render",J="rendered",n="destroyed",a="strings",o="<div></div>",z="Change",p="loading",E="_uiSet",D="",G=function(){},u=true,O=false,t,l={},f=[P,y,A,d,B,H],C=b.UA.webkit,h={};function c(Q){var T=this,L,S,R=T.constructor;T._strs={};T._cssPrefix=R.CSS_PREFIX||w(R.NAME.toLowerCase());Q=Q||{};c.superclass.constructor.call(T,Q);S=T.get(i);if(S){if(S!==u){L=S;}T.render(L);}}c.NAME="widget";t=c.UI_SRC="ui";c.ATTRS=l;l[q]={valueFn:"_guid",writeOnce:u};l[J]={value:O,readOnly:u};l[N]={value:null,setter:"_setBB",writeOnce:u};l[v]={valueFn:"_defaultCB",setter:"_setCB",writeOnce:u};l[H]={value:null,validator:"_validTabIndex"};l[B]={value:O,readOnly:u};l[y]={value:O};l[P]={value:u};l[A]={value:D};l[d]={value:D};l[a]={value:{},setter:"_strSetter",getter:"_strGetter"};l[i]={value:O,writeOnce:u};c.CSS_PREFIX=w(c.NAME.toLowerCase());c.getClassName=function(){return w.apply(e,[c.CSS_PREFIX].concat(b.Array(arguments),true));};M=c.getClassName;c.getByNode=function(L){var S,R,Q=M();L=r.one(L);if(L){L=L.ancestor("."+Q,true);if(L){R=L.get(q);S=h[R];}}return S||null;};b.extend(c,b.Base,{getClassName:function(){return w.apply(e,[this._cssPrefix].concat(b.Array(arguments),true));},initializer:function(L){var Q=this.get(N);if(Q instanceof r){this._mapInstance(Q.get(q));}if(this._applyParser){this._applyParser(L);}},_mapInstance:function(L){if(!(h[L])){h[L]=this;}},destructor:function(){var L=this.get(N),Q;if(L instanceof r){Q=L.get(q);if(Q in h){delete h[Q];}this._destroyBox();}},destroy:function(L){this._destroyAllNodes=L;return c.superclass.destroy.apply(this);},_destroyBox:function(){var R=this.get(N),Q=this.get(v),L=this._destroyAllNodes,S;S=R&&R.compareTo(Q);if(this.UI_EVENTS){this._destroyUIEvents();}this._unbindUI(R);if(L){R.empty();R.remove(u);}else{if(Q){Q.remove(u);}if(!S){R.remove(u);}}},render:function(L){if(!this.get(n)&&!this.get(J)){this.publish(i,{queuable:O,fireOnce:u,defaultTargetOnly:u,defaultFn:this._defRenderFn});this.fire(i,{parentNode:(L)?r.one(L):null});}return this;},_defRenderFn:function(L){this._parentNode=L.parentNode;this.renderer();this._set(J,u);this._removeLoadingClassNames();},renderer:function(){var L=this;L._renderUI();L.renderUI();L._bindUI();L.bindUI();L._syncUI();L.syncUI();},bindUI:G,renderUI:G,syncUI:G,hide:function(){return this.set(P,O);},show:function(){return this.set(P,u);},focus:function(){return this._set(B,u);},blur:function(){return this._set(B,O);},enable:function(){return this.set(y,O);},disable:function(){return this.set(y,u);},_uiSizeCB:function(L){this.get(v).toggleClass(M(F,"expanded"),L);},_renderBox:function(L){var T=this,Q=T.get(v),R=T.get(N),V=T.get(j),S=T.DEF_PARENT_NODE,U=(V&&V.get(m))||R.get(m)||Q.get(m);if(V&&!V.compareTo(Q)&&!Q.inDoc(U)){V.replace(Q);}if(!R.compareTo(Q.get(k))&&!R.compareTo(Q)){if(Q.inDoc(U)){Q.replace(R);}R.appendChild(Q);}L=L||(S&&r.one(S));if(L){L.appendChild(R);}else{if(!R.inDoc(U)){r.one(I).insert(R,0);}}},_setBB:function(L){return this._setBox(this.get(q),L,this.BOUNDING_TEMPLATE,true);},_setCB:function(L){return(this.CONTENT_TEMPLATE===null)?this.get(N):this._setBox(null,L,this.CONTENT_TEMPLATE,false);},_defaultCB:function(L){return this.get(j)||null;},_setBox:function(S,R,L,Q){R=r.one(R);if(!R){R=r.create(L);if(Q){this._bbFromTemplate=true;}else{this._cbFromTemplate=true;}}if(!R.get(q)){R.set(q,S||b.guid());}return R;},_renderUI:function(){this._renderBoxClassNames();this._renderBox(this._parentNode);},_renderBoxClassNames:function(){var S=this._getClasses(),L,Q=this.get(N),R;Q.addClass(M());for(R=S.length-3;R>=0;R--){L=S[R];Q.addClass(L.CSS_PREFIX||w(L.NAME.toLowerCase()));}this.get(v).addClass(this.getClassName(F));},_removeLoadingClassNames:function(){var R=this.get(N),L=this.get(v),Q=this.getClassName(p),S=M(p);R.removeClass(S).removeClass(Q);L.removeClass(S).removeClass(Q);},_bindUI:function(){this._bindAttrUI(this._UI_ATTRS.BIND);this._bindDOM();},_unbindUI:function(L){this._unbindDOM(L);},_bindDOM:function(){var L=this.get(N).get(m),Q=c._hDocFocus;if(!Q){Q=c._hDocFocus=L.on("focus",this._onDocFocus,this);Q.listeners={count:0};}Q.listeners[b.stamp(this,true)]=true;Q.listeners.count++;if(C){this._hDocMouseDown=L.on("mousedown",this._onDocMouseDown,this);}},_unbindDOM:function(L){var T=c._hDocFocus,Q=b.stamp(this,true),S,R=this._hDocMouseDown;if(T){S=T.listeners;if(S[Q]){delete S[Q];S.count--;}if(S.count===0){T.detach();c._hDocFocus=null;}}if(C&&R){R.detach();}},_syncUI:function(){this._syncAttrUI(this._UI_ATTRS.SYNC);},_uiSetHeight:function(L){this._uiSetDim(A,L);this._uiSizeCB((L!==D&&L!==x));},_uiSetWidth:function(L){this._uiSetDim(d,L);},_uiSetDim:function(L,Q){this.get(N).setStyle(L,g.isNumber(Q)?Q+this.DEF_UNIT:Q);},_uiSetVisible:function(L){this.get(N).toggleClass(this.getClassName(K),!L);},_uiSetDisabled:function(L){this.get(N).toggleClass(this.getClassName(y),L);},_uiSetFocused:function(R,Q){var L=this.get(N);L.toggleClass(this.getClassName(B),R);if(Q!==t){if(R){L.focus();}else{L.blur();}}},_uiSetTabIndex:function(Q){var L=this.get(N);if(g.isNumber(Q)){L.set(H,Q);}else{L.removeAttribute(H);}},_onDocMouseDown:function(L){if(this._domFocus){this._onDocFocus(L);}},_onDocFocus:function(L){var Q=c.getByNode(L.target),R=c._active;if(R&&(R!==Q)){R._domFocus=false;R._set(B,false,{src:t});c._active=null;}if(Q){Q._domFocus=true;Q._set(B,true,{src:t});c._active=Q;}},toString:function(){return this.name+"["+this.get(q)+"]";},DEF_UNIT:"px",DEF_PARENT_NODE:null,CONTENT_TEMPLATE:o,BOUNDING_TEMPLATE:o,_guid:function(){return b.guid();},_validTabIndex:function(L){return(g.isNumber(L)||g.isNull(L));},_bindAttrUI:function(Q){var R,L=Q.length;for(R=0;R<L;R++){this.after(Q[R]+z,this._setAttrUI);
}},_syncAttrUI:function(R){var S,Q=R.length,L;for(S=0;S<Q;S++){L=R[S];this[E+s(L)](this.get(L));}},_setAttrUI:function(L){if(L.target===this){this[E+s(L.attrName)](L.newVal,L.src);}},_strSetter:function(L){return b.merge(this.get(a),L);},getString:function(L){return this.get(a)[L];},getStrings:function(){return this.get(a);},_UI_ATTRS:{BIND:f,SYNC:f}});b.Widget=c;},"3.6.0",{skinnable:true,requires:["attribute","event-focus","base-base","base-pluginhost","node-base","node-style","classnamemanager"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-htmlparser",function(f){var e=f.Widget,c=f.Node,d=f.Lang,a="srcNode",b="contentBox";e.HTML_PARSER={};e._buildCfg={aggregates:["HTML_PARSER"]};e.ATTRS[a]={value:null,setter:c.one,getter:"_getSrcNode",writeOnce:true};f.mix(e.prototype,{_getSrcNode:function(g){return g||this.get(b);},_applyParsedConfig:function(i,g,h){return(h)?f.mix(g,h,false):g;},_applyParser:function(g){var i=this,j=this._getNodeToParse(),h=i._getHtmlParser(),l,k;if(h&&j){f.Object.each(h,function(n,m,p){k=null;if(d.isFunction(n)){k=n.call(i,j);}else{if(d.isArray(n)){k=j.all(n[0]);if(k.isEmpty()){k=null;}}else{k=j.one(n);}}if(k!==null&&k!==undefined){l=l||{};l[m]=k;}});}g=i._applyParsedConfig(j,g,l);},_getNodeToParse:function(){var g=this.get("srcNode");return(!this._cbFromTemplate)?g:null;},_getHtmlParser:function(){var h=this._getClasses(),k={},g,j;for(g=h.length-1;g>=0;g--){j=h[g].HTML_PARSER;if(j){f.mix(k,j,true);}}return k;}});},"3.6.0",{requires:["widget-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-skin",function(e){var d="boundingBox",b="contentBox",a="skin",c=e.ClassNameManager.getClassName;e.Widget.prototype.getSkinName=function(){var f=this.get(b)||this.get(d),h=new RegExp("\\b"+c(a)+"-(\\S+)"),g;if(f){f.ancestor(function(i){g=i.get("className").match(h);return g;});}return(g)?g[1]:null;};},"3.6.0",{requires:["widget-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("node-event-delegate",function(a){a.Node.prototype.delegate=function(d){var c=a.Array(arguments,0,true),b=(a.Lang.isObject(d)&&!a.Lang.isArray(d))?1:2;c.splice(b,0,this._node);return a.delegate.apply(a,c);};},"3.6.0",{requires:["node-base","event-delegate"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-uievents",function(g){var f="boundingBox",e=g.Widget,d="render",a=g.Lang,c=":",b=g.Widget._uievts=g.Widget._uievts||{};g.mix(e.prototype,{_destroyUIEvents:function(){var h=g.stamp(this,true);g.each(b,function(j,i){if(j.instances[h]){delete j.instances[h];if(g.Object.isEmpty(j.instances)){j.handle.detach();if(b[i]){delete b[i];}}}});},UI_EVENTS:g.Node.DOM_EVENTS,_getUIEventNode:function(){return this.get(f);},_createUIEvent:function(i){var l=this._getUIEventNode(),h=(g.stamp(l)+i),k=b[h],j;if(!k){j=l.delegate(i,function(m){var n=e.getByNode(this);if(n){if(n._filterUIEvent(m)){n.fire(m.type,{domEvent:m});}}},"."+g.Widget.getClassName());b[h]=k={instances:{},handle:j};}k.instances[g.stamp(this)]=1;},_filterUIEvent:function(h){return(h.currentTarget.compareTo(h.container)||h.container.compareTo(this._getUIEventNode()));},_getUIEvent:function(j){if(a.isString(j)){var k=this.parseType(j)[1],h,i;if(k){h=k.indexOf(c);if(h>-1){k=k.substring(h+c.length);}if(this.UI_EVENTS[k]){i=k;}}return i;}},_initUIEvent:function(i){var j=this._getUIEvent(i),h=this._uiEvtsInitQueue||{};if(j&&!h[j]){this._uiEvtsInitQueue=h[j]=1;this.after(d,function(){this._createUIEvent(j);delete this._uiEvtsInitQueue[j];});}},on:function(h){this._initUIEvent(h);return e.superclass.on.apply(this,arguments);},publish:function(i,h){var j=this._getUIEvent(i);if(j&&h&&h.defaultFn){this._initUIEvent(j);}return e.superclass.publish.apply(this,arguments);}},true);},"3.6.0",{requires:["widget-base","node-event-delegate"]});
YUI.add("bacon-config", function (Y) {
Y.log("Adding bacon module bacon-config", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;

if (QUORUS._isQuirkyFrame) {
  BACON.config = window.QUORUS.BACON.config;
  return;
}

////////////////
//
// For manipulating configuration
//

var CFG = BACON.namespace('config'),
    blob,
    configKey = 'q_config',
    localConfig = QUORUS.advancedBrowser ? (blob = localStorage[configKey]) && Y.JSON.parse(blob) || {} : {},
    sessionConfig = QUORUS.advancedBrowser ? (blob = sessionStorage[configKey]) && Y.JSON.parse(blob) || {} : {};

// Getters
CFG.getDefaultKey = function(key) { return Y.clone(QUORUS.defaultConfig[key]); };
CFG.getLocalKey   = function(key) { return Y.clone(localConfig[key]); };
CFG.getSessionKey = function(key) { return Y.clone(sessionConfig[key]); };
CFG.getKey        = function(key) { return CFG.getSessionKey(key) || CFG.getLocalKey(key) || CFG.getDefaultKey(key); }

// Really meta way to create setters for session and local storage
function setKeyMeta(storageObj, storageFunc) {
  return function(key, value) {
    if (Y.Lang.isValue(value))
      storageObj[key] = value;
    else
      delete storageObj[key];
    
    storageFunc(Y.JSON.stringify(storageObj));
    Y.log("Wrote config value for '" + key + "'", 'debug', 'Config');
    
    return value;
  };
}

function localSave(value) {
  return (localStorage[configKey] = value);
};
function sessionSave(value) {
  return (sessionStorage[configKey] = value);
};

// Setters
CFG.setLocalKey   = setKeyMeta(localConfig, localSave);
CFG.setSessionKey = setKeyMeta(sessionConfig, sessionSave);

//Returns a function that enumerates the keys of storageObj
//if cb is a func, calls it for each key, func(k,v)
//if cb is null, returns a list of keys [k1,k2,etc]
function keyEnumMeta(storageObj) {
  return function(cb,ctx) {
    var arr;
    function tfunc(v,k) { cb(k,v); }
    if(cb) {
      Y.each(storageObj,tfunc,ctx);
    } else {
      arr = [];
      Y.each(storageObj,function(v,k) {
        arr.push(k);
      });
      return k;
    }
  };
}

// Enumerators
CFG.localKeys   = keyEnumMeta(localConfig);
CFG.sessionKeys = keyEnumMeta(sessionConfig);

// UUID stuff
var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

CFG.uuid = function() {
  var chars = CHARS, uuid = new Array(36), rnd=0, r;
  for (var i = 0; i < 36; i++) {
    if (i==8 || i==13 ||  i==18 || i==23) {
      uuid[i] = '-';
    } else if (i==14) {
      uuid[i] = '4';
    } else {
      if (rnd <= 0x02)
        rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
      r = rnd & 0xf;
      rnd = rnd >> 4;
      uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
    }
  }
  return uuid.join('');
};

CFG.hostUUID = QUORUS._isQuorusFrame ? function() {
  return CFG.getLocalKey('host_uuid') || CFG.setLocalKey('host_uuid', CFG.uuid());
} : function() { return undefined; };

}, '@VERSION@', { requires: ["bacon","json"] });

YUI.add("bacon-serializable", function (Y) {
Y.log("Adding bacon module bacon-serializable", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


function Serializable () {}

function serialize (value) {
  if (Y.Lang.isArray(value))
    return Y.Array.map(value, serialize);
  if (Y.Lang.isObject(value) && value.toJSON)
    return value.toJSON();
  return value;
}

function toJSON () {
  var o = {};
  Y.Object.each(this._classes[0].ATTRS, function(config, attr) {
    if (config.serialize) {
      var value = this.get(attr);
      value = serialize(value);
      o[attr] = value;
    }
  }, this);
  return o;
}
Serializable.prototype.toJSON = toJSON;

QUORUS.BACON.Serializable = Serializable;

}, '@VERSION@', { requires: ["bacon","base-base"] });

YUI.add("bacon-io", function (Y) {
Y.log("Adding bacon module bacon-io", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;

if (QUORUS._isQuirkyFrame) {
  BACON.QuorusIo = window.QUORUS.BACON.QuorusIo;
  return;
}

/////////////////////////////////////
//
// QuorusIo
//
var QuorusIo = Y.Base.create('quorusIo', Y.Base, [BACON.Serializable], {
  initializer: function(config) {
    var evCfg = {emitFacade: false, fireOnce: true},
        ioCBs = ['start', 'complete', 'success', 'failure', 'end'],
        ioObj = this;
    Y.each(ioCBs, function(v) {
      ioObj.publish("io:"+v, evCfg);
    });
    this.addRequestKey('site', BACON.config.getDefaultKey('siteKey'));
  },
  //Adds a single key to the end of the data segment
  addRequestKey: function(key, value) {
    this.get('data').push([key, value]);
  },
  //Flattens the object to tuples, appends it to the data segment
  addRequestObj: function(obj) {
    this.set('data', this.get('data').concat(flattenToTuples(obj)));
  },
  //Adds the form element values to the data segment
  addRequestForm: function(formNode) {
    var ioObj = this;
    Y.Array.each(formToParams(formNode), function(kvp) {
      ioObj.addRequestKey(kvp[0],kvp[1]);
    });
  },
  //Removes all data pairs with the given key
  remRequestKey: function(key) {
    this.set('data', Y.Array.reject(this.get('data'), function(kvp) {
      return kvp[0] == key;
    }));
  },
  addRequestHeader: function(key, value) {
    this.get('headers').push([key, value]);
  },
  //Returns an array of all matching headers
  getRequestHeader: function(key) {
    return Y.Array.filter(this.get('headers'), function(h) {
      return h[0] == key;
    });
  },
  getResponseHeader: function(key) {
    var hdr = Y.Array.find(this.get('responseHeaders'),function(v) { return (v[0] == key); });
    if(hdr) return hdr[1];
  },
  getContentType: function() {
    var tmp = this.getResponseHeader('Content-Type');
    return (tmp && tmp.split(/;/, 1)[0]) || 'text/plain';
  },
  wasSuccess: function() {
    var status = this.get('status');
    return status >= 200 && status < 300;
  },
  submit: function() {
    var ioLib = QUORUS._isQuorusFrame && 'bacon-io-quorus' || 'bacon-io-host',
        ioObj = this,
        canceled = false,
        timeoutSeconds = ioObj.get('timeoutSeconds');
    
    this._cancel = function() { return canceled = true; };
    
    this.fire('io:start', this);
    
    Y.use(ioLib, Y.bind(function(Y) {
      if (canceled)
        return;

      QuorusIo._submitIo(ioObj);

      if (timeoutSeconds)
        this._timeoutTimer = Y.later(timeoutSeconds * 1000, ioObj, ioObj.abort)
    }, this));
  },
  _handleResponse: function(resp) {
    if (this._timeoutTimer)
      this._timeoutTimer.cancel();

    try {
      this.setAttrs(resp);
      this._cancel = function() { return false; };
      this.fire('io:complete', this);
      if(this.wasSuccess()) {
        this.fire('io:success', this);
      } else {
        this.fire('io:failure', this);
      }
    } finally {
      this.fire('io:end', this);
    }
  },
  isInProgress: function() {
    return this.getEvent('io:start').fired && !this.getEvent('io:complete').fired;
  },
  abort: function() {
    if (!this._cancel || this._cancel()) {
      this._handleResponse({status: 0, statusText: 'abort'});
      return true;
    } else {
      return false;
    }
  }
}, {
  ATTRS: {
    url: { serialize: true },
    method: { value: 'GET', serialize: true },
    //Headers and data are stored as array tuples
    data: { value: [], serialize: true },
    headers: { value: [], serialize: true },
    comet: { value: false, serialize: true}, // connect to the comet host, send no non-standard headers or cookies
    userUUID: { value: true, serialize: true}, // selects an authsession by user uuid. true indicates to use the global authsession if available
    
    //Response values
    status: { value: null },
    statusText: { value: null },
    timeoutSeconds: { value: 20 },
    responseText: { value: null },
    responseJson: {
      getter: function() {
        return Y.JSON.parse(this.get('responseText'));
      }
    },
    //Stored as array tuples
    responseHeaders: { 
      setter: function(v) {
        var ret = (v || "").split(/\n/);
        ret = Y.Array.reject(ret, function(v) { return v == "" });
        ret = Y.Array.map(ret, function(v) { return v.split(/:\s*/,2); });
        return ret;
      }
    }
  },
  //Static methods
  rest: function(verb, noun, id, action, cfg) {
    var url = "/" + noun;
    
    cfg = cfg || {};
    cfg.method = verb;

    //Construct URL
    if(id) url = url + '/' + id;
    if(action) url = url + "/" + action;
    if(cfg && cfg.params) {
      url = BACON.queryStringAppend(url,cfg.params);
    }

    return this.io(url, cfg);
  },
  
  io: function(url, cfg) {
    var tmp, io;
    
    if(/^\w+:\/\//.test(url)) throw "QuorusIo only takes relative paths";
    cfg = cfg || {};
    
    tmp = (BACON.flattenToTuples(cfg.data)) || [];
    cfg.form && formToParams(cfg.form, tmp);

    io = new this({
      url: url,
      method: cfg.method || (cfg.form && 'POST') || 'GET',
      data: tmp,
      userUUID: cfg.userUUID,
      comet: cfg.comet,
      timeoutSeconds: cfg.timeoutSeconds
    })
    
    //Add basic params to the data
    if (tmp = BACON.config.getDefaultKey('deployVersion')) io.addRequestKey('version', tmp);
    
    //Invoke user-specified callbacks via event handlers on the completion
    Y.each(cfg.on, function(v,k) {
      var callArgs = ['io:' + k, v, cfg.context].concat(cfg.arguments || []);
      io.after.apply(io, callArgs);
    });
    
    io.submit();

    return io;
  },
  
  _paramsToString: function(arr) {
    return Y.Array.map(arr, function(x) {
      return encodeURIComponent(x[0]) + '=' + encodeURIComponent(x[1]);
    }).join('&');
  }
});

BACON.QuorusIo = QuorusIo;

//f is a form node, a is an array the tuples to
//Yanked from YUI3's io-form, and lightly edited
function formToParams(f, a) {
    var data = a || [],
        e, n, v, d, i, il, j, jl, o;
    
    f = f.getDOMNode();

    // Iterate over the form elements collection to construct the
    // label-value pairs.
    for (i = 0, il = f.elements.length; i < il; ++i) {
        e = f.elements[i];
        d = e.disabled;
        n = e.name;

        if (n && !d) {
            v = e.value;

            switch (e.type) {
                // Safari, Opera, FF all default options.value from .text if
                // value attribute not specified in markup
                case 'select-one':
                    if (e.selectedIndex > -1) {
                        o = e.options[e.selectedIndex];
                        data.push([n, o.attributes.value && o.attributes.value.specified ? o.value : o.text]);
                    }
                    break;
                case 'select-multiple':
                    if (e.selectedIndex > -1) {
                        for (j = e.selectedIndex, jl = e.options.length; j < jl; ++j) {
                            o = e.options[j];
                            if (o.selected) {
                              data.push([n, o.attributes.value && o.attributes.value.specified ? o.value : o.text]);
                            }
                        }
                    }
                    break;
                case 'radio':
                case 'checkbox':
                    if (e.checked) {
                        data.push([n, v]);
                    }
                    break;
                case 'file':
                    // stub case as XMLHttpRequest will only send the file path as a string.
                case undefined:
                    // stub case for fieldset element which returns undefined.
                case 'reset':
                    // stub case for input type reset button.
                case 'button':
                    // stub case for input type button elements.
                    break;
                case 'submit':
                default:
                    data.push([n, v]);
            }
        }
    }
    return data;
}

/////////////////////
//
// Flattens (JSON) objects into a params string for rails
//
function flattenToParams(obj) {
  return Y.Array.map(flattenToTuples(obj), function(x) {
    return encodeURIComponent(x[0]) + '=' + encodeURIComponent(x[1]);
  }).join('&');
}

function flattenToTuples(obj) {
  var params = [];
  
  recursive_serialize(obj, '');
  
  return params;
  
  function add_param(name, value) {
    params.push([name, value]);
  }
  
  function recursive_serialize(object, prefix) {
    var i,tmp;
    
    if(object && object.toJSON) object = object.toJSON();

    if(object instanceof Array) {
      //Cannot use 'in' iteration for Arrays
      for(i = 0;i<object.length;i++) {
        tmp = prefix + '[]';
        recursive_serialize(object[i],tmp);
      }
    } else if(object instanceof String) { //Stupid special case
      add_param(prefix, object);
    } else if(typeof object == 'object' && object != null) {
      //"Hash"
      for(i in object) {
        if(!object.hasOwnProperty(i)) continue;
        tmp = prefix ? prefix + '[' + i + ']' : i;
        recursive_serialize(object[i],tmp);
      }
    } else if(object != undefined) {
      add_param(prefix, object);
    }
  }
}
BACON.flattenToTuples = flattenToTuples;
BACON.flattenToParams = flattenToParams;

}, '@VERSION@', { requires: ["bacon","bacon-serializable","collection","bacon-config"] });

YUI.add("bacon-servermetrics", function (Y) {
Y.log("Adding bacon module bacon-servermetrics", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


BACON.ServerMetricsEngine = function () {};

//Analytics engine to forward Metric Events back to rails to forward onto Analytics
Y.mix(BACON.ServerMetricsEngine.prototype,{
  trackEvent: function (category, name, properties, globals) {
    properties = Y.mix(Y.mix({},globals),properties,true);

    var req = new BACON.QuorusIo({
      method: 'GET',
      url: "/analytics_events/track.gif",
      userUUID: false
    });
    
    req.addRequestKey('category', category);
    req.addRequestKey('name', name);
    req.addRequestObj(properties);
    
    req.after('io:failure', function() {
      //Need to have some sort of exponential backoff retry method here to resend event after minor io failure.
      Y.log("Failed to send metric event data",'error','Analytics');
    });

    req.submit();

    return req;
  }
});
}, '@VERSION@', { requires: ["bacon-io"] });

YUI.add("bacon-analytics", function (Y) {
Y.log("Adding bacon module bacon-analytics", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;

if (QUORUS._isQuirkyFrame) {
  BACON.Analytics = window.QUORUS.BACON.Analytics;
  return;
}

//These are 
var analytics_options = ['oneshot'];
var AnalyticsSingleton = Y.Base.create('analyticsSingleton',Y.Base,[],{
  initializer: function() {
    this._analyticsEngines = [];
    this._analyticsEvents  = [];
    this._globalParams     = {};
    this._oneShots         = {};
  },
  
  //Events are published to Quorus' analytics engine
  qEvent: function(category, name, properties) {
    var opts = properties || {}, key, shotType = opts['oneshot'];
    
    key = category + ":" + name;
    if(shotType == 'session' && window.sessionStorage) {
      key = 'analytics.' + key;
      if(window.sessionStorage[key]) { return; }
      window.sessionStorage[key] = 'fired';
    } else if(shotType) { //Defaults to 'page'
      if(this._oneShots[key]) { return; }
      this._oneShots[key] = true;
    }

    //copied to prevent aliasing
    properties = Y.mix({},properties);
    Y.each(analytics_options,function(v) { delete properties[v]; });

    //Automagically add ab* Vars
    BACON.config.localKeys(function(k,v) {
      if(!k.match(/^ab.+/)) { return; }
      properties[k] = v;
    });

    //Add default application name
    properties['application'] = 'default';

    var evData = {
      category: category,
      name: name,
      properties: properties
    };
    
    this._analyticsEvents.push(evData);
    this._pushEvents();
  },
  addEngine: function(engine) {
    var i,
        evts = this._analyticsEvents;
    
    this._analyticsEngines.push({
      engine: engine,
      position: 0
    });
    this._pushEvents();
  },
  
  //
  // Globals are attached to an event when it is pushed to the engine, NOT when the event is fired
  //
  setGlobal: function(key,value) {
    this._globalParams[key] = value;
  }, 
  
  //
  // This method is rewritten below once the analyticsid is set
  //
  _pushEvents: function() {
    return;
  },
  _sendEvent: function(engine, ev) {
    //Don't let exceptions in engines bubble
    try {
      engine.trackEvent(ev.category,ev.name,ev.properties,this._globalParams);
    } catch(e) {
      Y.log("Swallowed exception during analytics: "+e,'warn','analytics');
    }
  }
},{
  ATTRS: {
    
  }
});

var Analytics = BACON.Analytics = new AnalyticsSingleton();


var ConsoleEngine = Y.Base.create('consoleEngine',Y.Base,[],{
  trackEvent: function(category,name,properties,globals) {
    var argnames = ['category','name','params','globals'],
        i;
    
    console.log("EVENT: ");
    for(i=0; i<argnames.length; i++) {
      console.log("  "+argnames[i] + ": " + Y.JSON.stringify(arguments[i]));
    }

  }
},{
  //Class Properties
});

Analytics.ConsoleEngine = ConsoleEngine;


//Initialize a user uuid for mixPanel reporting
BACON.withValue('analyticsId', function(ev) {
  Analytics.setGlobal('analyticsid',ev.newVal);
  Analytics._pushEvents = function() {
    var evts = this._analyticsEvents,
        len  = evts.length;
    Y.each(this._analyticsEngines, function(e) {
      while(e.position < len) {
        this._sendEvent(e.engine, evts[e.position++]);
      }
    }, this);
  };
  Analytics._pushEvents();
});

//Figuring out the UA
Y.each(Y.UA, function(v, k) {
  if (v) {
    if (Y.Lang.isNumber(v)) {
      //Normalize the UA versions a bit
      Analytics.setGlobal('bUAExact', "" + k + ":" + v);
      switch(k) {
        case 'safari':
        case 'webkit': 
        case 'chrome': v = Math.floor(v); break;
      }
      Analytics.setGlobal('bUA',"" + k + ":" + v);
    }
  }
});
Analytics.setGlobal('os', Y.UA.os);
Analytics.setGlobal('domain', document.domain);

//Set an 'authType' property
Analytics.setGlobal('authType', 'none');
BACON.withValue('authSession', function(ev) {
  Analytics.setGlobal('authType', BACON.get('authSession.user.personaType'));
});

//Some QUORUS specific Stuff
Analytics.setGlobal('site', BACON.config.getDefaultKey('siteKey'));

}, '@VERSION@', { requires: ["bacon","bacon-config"] });

YUI.add("bacon-ab", function (Y) {
Y.log("Adding bacon module bacon-ab", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


////////////////
//
// For client-side A/B testing
//
// example usage:
//
//   BACON.AB.on('trial:authoring', function(treatment) {
//     switch (treatment) {
//       case '1step':
//         blah blah
//       case '2step:
//         yada yada
//     }
//   });
//
var AB = Y.Base.create("ab", Y.Base, [], {
  initializer: function(config) {
    this.after('stateChange', this.onState, this);
    this.after('configChange', this.computeState, this);
  },
  //Assigns treatments for trials for which there's no assigment
  computeState: function() {
    var config = this.get('config'),
        stowed = this.unstowState(),
         state = {};
    
    Y.Object.each(config, function(cfg, trial) {
      if (stowed[trial] && Y.Object.hasKey(cfg.treatments, stowed[trial]))
        state[trial] = stowed[trial]; // preserve stowed value, if valid
      else
        state[trial] = AB.chooseTreatment(cfg.treatments); // roll the dice
    }, this);
    
    this.set('state', state);
  },
  //Fires trial events, and sets corresponding analytics properties
  onState: function() {
    var state = this.get('state');
    
    Y.Object.each(state, function(treatment, trial) {
      var trialEvent = 'trial:' + trial,
          trialProperty = 'ab:' + trial;
      
      Y.log("Applying treatment '" + treatment + "'" +
            " for trial '" + trial + "'", 'debug', 'AB');
      
      //Set an analytics property
      BACON.Analytics.setGlobal(trialProperty, treatment);
      
      //Publish and fire the event
      this.publish(trialEvent, {fireOnce:true, emitFacade:false});
      this.fire(trialEvent, treatment, trial);
    }, this);
    
    //Persist the state
    this.stowState(state);
    
    //Detach all trial listeners, they won't get invoked again
    this.detach('trial:*');
  },
  //Partitions state into local/session, and persists in DOMStorage
  stowState: function(state) {
    var config = this.get('config'),
        localState = {},
        sessionState = {};
    
    Y.Object.each(state, function(treatment, trial) {
      switch (config[trial].scope) {
        case 'page':
          // page-scoped trials don't get persisted
          break;
        case 'session':
          sessionState[trial] = treatment;
          break;
        default:
          localState[trial] = treatment;
      }
    }, this);
    
    BACON.config.setLocalKey('ab', localState);
    BACON.config.setSessionKey('ab', sessionState);
  },
  //Retrieves local/session state, and merges into a single object
  unstowState: function() {
    var localState = BACON.config.getLocalKey('ab'),
        sessionState = BACON.config.getSessionKey('ab');
    
    return Y.merge(localState, sessionState);
  }
}, {
  ATTRS: {
    config: {},
    state: {}
  },
  //Randomly selects a treatment according to their relative weights
  //  treatments = { treatment1: weight1, treatment1: weight2, ... }
  chooseTreatment: function(treatments) {
    var total = 0,
          val = null,
       choice = null;
    
    // find the sum
    Y.Object.each(treatments, function(weight) { total += weight; });
    
    val = Math.random() * total; // roll the dice
    
    // choose the choice
    Y.Object.some(treatments, function(weight, treatment) {
      choice = treatment; if (val < weight) return true; val -= weight;
    });
    
    return choice;
  }
});

BACON.AB = new AB();

}, '@VERSION@', { requires: ["bacon","bacon-config","bacon-analytics","collection"] });

YUI.add("bacon-autobinding", function (Y) {
Y.log("Adding bacon module bacon-autobinding", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


///////////////////////
//
// To ease hooking up functions and links, automatically calls
// a function on the object if an element has a q_action attribute
//
function Autobinding(config) {
  Y.after(this.autobind, this, 'bindUI');
}

Autobinding.prototype.autobind = function () {
  autobind(this, this.get('boundingBox'));
};
BACON.Autobinding = Autobinding;

//Generalization of Autobind
function autobind(obj, node) {
  node.delegate("click", Y.bind(function (ev) {
    var action = ev.currentTarget.getAttribute('q_action'),
        method = this[action];
    if (typeof method === 'function')
      method.call(this, ev);
  }, obj), "[q_action]");
  node.delegate("mousedown", Y.bind(function (ev) {
    var action = ev.currentTarget.getAttribute('q_mousedown'),
        method = this[action];
    if (typeof method === 'function')
      method.call(this, ev);
  }, obj), "[q_mousedown]");
}
BACON.autobind = autobind;

}, '@VERSION@', { requires: ["event-delegate","node-base"] });

YUI.add("bacon-widget", function (Y) {
Y.log("Adding bacon module bacon-widget", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


BACON.namespace('widget');

//Turns the contentHTML into a node and sets the contentBox
// Widget should be able to handle nodifying the content, but doesn't: YUI bug #2528604
// This could be done via a mixin, but that's blocked by YUI bugs #2529048 and #2529049
BACON.widget.contentBoxFromHTML = function(config) {
  if (config && config.contentHTML) {
    if (this.CONTENT_TEMPLATE) {
      config.contentBox = Y.Node.create(this.CONTENT_TEMPLATE);
      config.contentBox.setContent(config.contentHTML);
    } else {
      config.contentBox = Y.Node.create(config.contentHTML);
    }
  }
};

////////////////
//
// Mixin for stowing widget config state in sessionStorage
//
function CacheableConfig() { }

CacheableConfig.getKey = function (widgetName) {
  return 'widgetState.' + widgetName;
};
CacheableConfig.getState = function (widgetName) {
  var key = CacheableConfig.getKey(widgetName);
  
  return BACON.config.getSessionKey(key);
};
CacheableConfig.saveState = function (widgetName, widgetState) {
  var key = CacheableConfig.getKey(widgetName);
  
  BACON.config.setSessionKey(key, widgetState);
};
CacheableConfig.clearState = function (widgetName) {
  var key = CacheableConfig.getKey(widgetName);
  
  BACON.config.setSessionKey(key, null);
};

CacheableConfig.prototype = {
  initializer: function () {
    this.publish('cacheableConfig:save');
    this.after('cacheableConfig:save', this._saveState, this);
  },
  /*
   * Serializes out the state of the widget in
   * as an config object-literal suitable for recreating the button
   * on next page load or false if it should not be rendered again.  
   * attributes that are marked 'serialize: true' are automatically 
   * saved.  
   *
   * IF overridden, it can return null to 
   */
  getConfigState: function () {
    var classes = this._getClasses(),
        i, state = {};
    
    if (!this.get('serializeWidget'))
      return null; //Do not serialize
    
    for (i = classes.length; i-- > 0;) {
      var clazz = classes[i];
      if (clazz.ATTRS) {
        Y.each(clazz.ATTRS, function(cfg, k) {
          if (cfg.serialize)
            state[k] = this.get(k);
        }, this);
      }
      if (clazz.prototype.hasOwnProperty('configState')) {
        var tmp = clazz.prototype.configState.call(this);
        Y.mix(state, tmp, true);
      }
    }
    return state;
  },
  _saveState: function (ev) {
    //Don't do anything if the event is from a child object
    if(ev.target != this)
      return;
      
    function saveIt() {
      this._saveStateTimeout = null;
      
      if (!this.get('destroyed')) {
        var name = this.get('name'),
           state = this.getConfigState();
        
        if(!name) throw "Widget is not named, cannot save!";
        
        CacheableConfig.saveState(name, state);
      }
    }
    
    //Crude aggregation of change events
    this._saveStateTimeout =
      this._saveStateTimeout || setTimeout(Y.bind(saveIt, this), 0);
  }
};

BACON.CacheableConfig = CacheableConfig;


////////////////
//
// Mixin to mix-in config from the q_config DOM element
//
// (Mixed-in config will be available to any initializer, but it's too late for the class constructor)
//
function SerializedConfig(config) {
  var someBox = config.srcNode || config.boundingBox || config.contentBox,
      configEl = someBox && someBox.one('.q_config'),
      deserializedConfig = configEl && Y.JSON.parse(configEl.get('text'));
  
  if (deserializedConfig) {
    config = config || {};
    
    Y.mix(config, deserializedConfig);
  }
}

BACON.SerializedConfig = SerializedConfig;

}, '@VERSION@', { requires: ["bacon","bacon-config","json"] });

YUI.add("bacon-bar-core", function (Y) {
Y.log("Adding bacon module bacon-bar-core", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


var MOUSE_LEAVE_DELAY = 500, // ms
    VERTICAL_OFFSET_FROM_BAR = 5,
    BA = BACON.Analytics; // px

//HACK: Force YUI to preserve the 'serialize' config attribute
Y.Base._ATTR_CFG.push("serialize");

BACON.publish('barReady', {fireOnce: true, emitFacade: false});

/////////////////
//
// Plugin for managing stuff on the bar
//
// Methods available to manipulate the bar
//
var BarManager = Y.Base.create('barManager', Y.Base, [], {
  initializer: function (config) {
    var installedWidgets = BACON.config.getSessionKey('barState'),
        self = this;
    
    this.addTarget(BACON);
    
    // Show the bar if the persist_bar is "always"
    this._doShow = (this.get('persistBar') === 'always');
    
    //Widget install
    this.publish('widgetInstall', { emitFacade: true, defaultFn: this._doInstall, preventedFn: this._preventedInstall });
    this.publish('widgetAppear', { emitFacade: false }); //Fires whenever a widget is exposing external UI
    this.publish('barShifted', { emitFacade: false }); //Fired whenever something on the bar possibly changes width/height/etc
    //All widgets have to have a unique name
    this.on('widgetInstall', this._checkForDups, this);
    
    //Render widgets after we're shown
    this.after('visibleChange', function(ev) {
      if (ev.newVal) this.renderWidgets();
      
      //Hint that the guy is one of the chosen few.
      //Currently, these flags are used externally to determine how aggressively we load our JS (either immediately or on domready)
      if (ev.newVal) {
        localStorage.setItem('q_seen', true); // they've seen Quorus (in localStorage because we want this set across windows)
      }
      
      //Analytics
      if (ev.newVal)
        BA.qEvent('bar', 'initialized', {oneshot: 'session'});
    }, this);
    this.after('barShifted', this._barShifted, this);
    
    //List of widgets
    this._widgets = {};
    this._counter = 0;
    this._pendingInstalls = 0;
    
    //Hold bar render until featuresInitComplete
    this.startInstall();
    this.startInstall();
    BACON.once('featuresInitComplete', this.finishInstall, this);
    BACON.after('barReady', this.finishInstall, this);
    
    //Install existing widgets, if any
    var widgetLibs = [];
    Y.each(installedWidgets, function (w) {
      if (w.library) { widgetLibs.push(w.library); }
    });
    widgetLibs.push(function (Y) {
      Y.each(installedWidgets, function (w) {
        self.install(w.library, w.widget, w.config);
      });
      
      //FIXME Fire event after we're sure all widgets have loaded
      Y.later(0, self, function() { BACON.fire('barReady', self); });
    });
    Y.use.apply(Y, widgetLibs);
  },
  /* 
   * library and class_name are needed to facilitate future 
   * rapid loading of the bar
   *
   * cb(wasInstalled): callback, first arg true if widget was installed
   *
   */
  install: function (library, class_name, config, cb) {
    this.startInstall();
    this._installHelper(library, class_name, config, cb);
  },
  load: function (library, widget_name, src, config) {
    // Make a shallow copy of config for safety
    config = Y.merge(config);

    this.startInstall();

    function onLoaded (resp) {
      var contentType = resp.getContentType(),
          reply = resp.get('responseText');
      if ('text/html' == contentType)
        config.contentHTML = reply;
      else if (/json$/.test(contentType)) {
        reply = Y.JSON.parse(reply);
        Y.mix(config, reply, true);
      } else {
        Y.log("Didn't understand response content type " + contentType + " for widget " + widget_name, 'error', 'bacon-bartender');
        this.finishInstall();
      }

      this._installHelper(library, widget_name, config);
    }

    function onFailure (id, response) {
      Y.log("Failed to load content for " + widget_name, 'error', 'bacon-bar-core');
      this.finishInstall();
    }

    BACON.QuorusIo.rest('GET', src[0], src[1], src[2], {
      context: this,
      on: {
        success: onLoaded,
        failure: onFailure
      }
    });
  },
  _installHelper: function (library, class_name, config, cb) {
    var mgr  = this,
        host = mgr.get('host');

    Y.use(library, function (Y) {
      var wclazz = BACON[class_name];

      if (!wclazz) {
        Y.log("Failed to find a class with name " + class_name, 'error', 'bacon-bar-core');
        mgr.finishInstall();
        return;
      }

      config = config || {};
      config.name = config.name || (wclazz.nameForWidget && wclazz.nameForWidget(config)) || wclazz.NAME;

      if (config.name == '')
        throw "can't install " + class_name + " widget without a name!";

      mgr.fire('widgetInstall', {
        library: library,
        config: config,
        class_name: class_name,
        wclazz: wclazz,
        cb: cb
      });
    });
  },
  _uninstall: function (ev) {
    var bid = ev.target._barId;
    delete this._widgets[bid];
    this.saveWidgets();
  },
  //Only gets invoked if the installation wasn't prevented
  _doInstall: function (ev) {
    var mgr  = this,
        host = mgr.get('host'),
        bar_id = mgr._counter++,
        library = ev.library,
        config = ev.config,
        class_name = ev.class_name,
        wclazz = ev.wclazz,
        wname = config.name,
        trailer = host.one('.q_last'),
        widget, bb, cb;

    Y.mix(config, { barId: bar_id, barManager: mgr });

    bb = wname && host.one('[q_name=' + wname + ']') ||
         Y.Node.create(wclazz.prototype.BOUNDING_TEMPLATE);
    cb = bb.one('.q_' + wclazz.NAME.toLowerCase() + '_content');
    Y.mix(config, { boundingBox: bb, contentBox: cb });

    widget = new wclazz(config);

    bb = widget.get('boundingBox');
    bb.addClass('q_baritem');
    bb.setAttribute('q_library', library);
    bb.setAttribute('q_widget', class_name);
    if (! bb.hasAttribute('q_name'))
      bb.setAttribute('q_name', widget.get('name'));

    if (! bb.inDoc())
      host.insertBefore(bb, trailer);

    //TODO: This should be an 'after' call
    var handle = widget.after('destroy', function(ev) {
      handle.detach();
      mgr._uninstall(ev);
    });
    BACON.fire('newContent', bb);
    //Saves the widget data to be rendered next time
    mgr._widgets[widget._barId] = {
      library: library,
      widget: class_name, //Class name
      instance: widget
    };

    //show bar if barTrigger is set
    if (widget.get('barTrigger'))
      mgr._doShow = true;
    
    ev.cb && ev.cb(true);

    mgr.finishInstall();
  },
  startInstall: function () {
    this._pendingInstalls++;
  },
  finishInstall: function () {
    this._pendingInstalls--;
    if (this._pendingInstalls == 0) {
      if (this.get('visible')) {
        this.renderWidgets();
      } else if (this._doShow) {
        this.show(); // will trigger widget render
      }
      this.saveWidgets();
    }
  },
  _checkForDups: function(ev) {
    var name = ev.config.name,
        dup;
    Y.each(this._widgets, function(w, id) {
      if(w.instance.get('name') == name) { dup = w; }
    });
    if(dup) {
      ev.preventDefault();
      ev.reason = 'duplicate';
      dup.instance.fire('duplicateInstall', { config: ev.config });
      Y.log("Prevented duplicate installation of " + name, 'debug', 'bacon-bar-core');
    }
  },
  _preventedInstall: function (ev) {
    var canceled = ev.details[0];
    
    canceled.cb && canceled.cb(false);
    
    this.finishInstall();
  },
  show: function () {
    this.set('visible', true);
  },
  getWidgetByName: function(name) {
    var ret;
    Y.each(this._widgets, function(w, id) {
      if (w.instance.get('name') == name) { ret = w.instance; }
    });
    return ret;
  },
  renderWidgets: function () {
    var instance;
    Y.each(this._widgets, function (widget, id) {
      instance = widget.instance;
      if (!instance.get('rendered')) instance.render();
    });
  },
  saveWidgets: function () {
    var state = [];
    Y.each(this._widgets, function(w, k) {
      var cfg = w.instance.getConfigState();
      if (cfg === null)
        return;
      state.push({
        library: w.library,
        widget: w.widget,
        config: cfg
      });
    });
    BACON.config.setSessionKey('barState', state);
  },
  widgetsExternallyVisible: function () {
    var ret = false;
    Y.each(this._widgets, function(w) {
      if (w.instance.isExternallyVisible &&
          w.instance.isExternallyVisible())
        ret = true;
    });
    return ret;
  },
  _barWidth: function() {
    var width = 0;
    this.get('host').get('children').each(function(el) {
      width += el.get('offsetWidth');
    });
    return width;
  },
  _barShifted: function() {
    if(this._shifting)
      return;
    this._shifting = true;
    var maxWidth = this.get('barSizer').get('offsetWidth'),
        widgets  = this._widgets,
        objs  = Y.Array.map(Y.Object.keys(widgets), function(id) { return widgets[id].instance; });
    
    objs.sort(function(a,b) {
      return ((a.get('sacrificial') ? 0 : 1)  - (b.get('sacrificial') ? 0 : 1)) ||
             ( a.get('lastTouched')           -  b.get('lastTouched'));
    });
    
    while(this._barWidth() > maxWidth) {
      var w = objs.shift();
      if(!w || !w.get('sacrificial')) break;
      w.destroy();
    }
    this._shifting = false;
  }
}, {
  ATTRS: {
    host: { },
    name: { value: 'barManager' },
    visible: {
      getter: function() {
        return ! this.get('host').hasClass('q_hidden');
      },
      setter: function(val) {
        this.get('host').toggleClass('q_hidden', !val);
      }
    },
    persistBar: {
      getter: function(val) {
        var meta = Y.one('meta[name=quorus-persist-bar]'); //per-page override
        return val || (meta && meta.get('content')) || BACON.config.getKey('persistBar');
      }
    },
    barSizer: {
      getter: function(val) {
        return val || Y.one('.quorus-bar-sizer') || BACON.rootNode.one('.q_bar_sizer');
      }
    }
  }
});
BACON.BarManager = BarManager;

//////////////////////////
//
// Base class for all button widgets on the bar
//
function BarButton (config) {
  BACON.widget.contentBoxFromHTML.call(this, config); // see comment in widget.js
  
  BarButton.superclass.constructor.apply(this, arguments);
}

BarButton.NAME = 'barButton';
BarButton.ATTRS = {
  name: {
    writeOnce: 'initOnly',
    serialize: true
  },
  //Prevents the focus outline
  tabIndex: {
    value: null
  },
  barManager: {
    value: null
  },
  contentHTML: {
    serialize: true
  },
  serializeWidget: {
    value: true
  },
  lastTouched: {
    valueFn: function() {
      return (new Date()).getTime();
    },
    lazyAdd: false,
    serialize: true
  },
  //If true, the widget forces the bar to be shown
  barTrigger: {
    value: false,
    serialize: true
  },
  //If true, the widget may be sacrificed to reduce bar width
  sacrificial: {
    value: false
  }
};

Y.extend(BarButton, Y.Widget, {
  initializer: function (config) {
    this._barId = config.barId;
    
    this.publish('duplicateInstall', { emitFacade: true });
    
    this.addTarget(this.get('barManager'));
    
    this.after('render', function () {
      this.get('barManager').fire('barShifted');
    }, this);
    this.after('destroy', function () {
      this.get('barManager').fire('barShifted');
    }, this);
  },
  isExternallyVisible: function () {
    return false;
  },
  _destroyClick: function(ev) {
    ev.stopPropagation();
    this.destroy();
  }
});

Y.Base.mix(BarButton, [BACON.AttributeExtensions, BACON.CacheableConfig, BACON.EventObserver]);

BACON.BarButton = BarButton;

//////////////////////////
//
// "Mixin" to apply positioning styles to Widgets that are triggered from the bar  
//
function FixedPositioner(config) { }
FixedPositioner.ATTRS = {};

/*****
 * Positions this element in relation to the supplied element. 
 *  
 *  - Attempts to place the element above the refElem
 *  - Padding is obj. literal in units of px, e.g. {x: -5, y: -10}
 */
Y.mix(FixedPositioner.prototype, {
  positionAbove: function (refElem, padding) {
    var bb = this.get('boundingBox'),
     fixed = !! refElem.ancestor(function(el) {
                  return el.getComputedStyle('position') == 'fixed';
                }, true); // determine if the ref element is fixed
    
    Y.mix(padding, {x: 0, y: 0});
    
    bb.setStyle('position', fixed ? 'fixed' : 'absolute');
    
    //Reset the element all the way to right to get bounding Rect
    if (fixed) { bb.setStyles({bottom: 0, right: 0}); }
    
    var thisRect = bb.getDOMNode().getBoundingClientRect(),
        refRect  = refElem.getDOMNode().getBoundingClientRect();
    
    if (fixed) {
      var rightPos = thisRect.right - refRect.right,
          tmp;
      
      //Prevent ourselves from being positioned off the left edge of the screen
      if ((tmp = thisRect.left - rightPos) < 0) { rightPos = rightPos + tmp; }
      
      bb.setStyles({
        bottom: thisRect.bottom - refRect.top + padding.y,
        right:  rightPos + padding.x
      });
    } else {
      var refXY = refElem.getXY();
      
      bb.setXY([
        refXY[0] + (refRect.right - refRect.left) - (thisRect.right - thisRect.left) - padding.x,
        refXY[1] - (thisRect.bottom - thisRect.top) - padding.y
      ]);
    }
  }
}, true);

// Returns the number of pixels to position a "right: " style
// to line up with the right edge of refElem.  
FixedPositioner.rightOffset = function (refElem) {
  //The fixed container is 100% width and therefore abuts the right side
  var edgeRect = BACON.fixedContainer.getDOMNode().getBoundingClientRect();
  var refRect  = refElem.getDOMNode().getBoundingClientRect();
  
  return edgeRect.right - refRect.right;
};

BACON.FixedPositioner = FixedPositioner;

/////////////////////////////////
//
// Mixin for BarButton to reveal a pane
//
function PaneRevealer (config) {
  // WIDGET METHOD OVERLAP
  Y.after(this._renderUIRevealer, this, 'renderUI');
  Y.after(this._bindUIRevealer, this, 'bindUI');
  Y.after(this._syncUIRevealer, this, 'syncUI');

  //Should be .after('init',…) per YUI bug #2529898
  var handle = this.after('initializedChange', function() {
    //TODO withValue would sure be useful here
    this.after('detailPaneChange', this.afterPaneChange, this);
    this.on('detailPaneChange', this.onPaneChange, this);
    this.afterPaneChange({newVal: this.get('detailPane')}); //In case the pane was set during initialization
    handle.detach();
  }, this);
  
  this.after('destroy', this._destroyPane, this);
}

PaneRevealer.ATTRS = {
  detailPane: { //Constructed before renderUI
    serialize: false,
    valueFn: function() { return new LoadingPane(); }
  },
  activation: {
    /* hover, click, or sticky
     *
     * hover - display on click or mouseenter, hide on mouseleave. Hide when other panes display.
     * click - display on click, hide on mouseleave. Hide when other panes display.
     * sticky - display on click, don't automatically hide.
     */
    value: 'click'
  },
  paneOffset: { value: 40 }
};

Y.mix(PaneRevealer.prototype, {
  _destroyPane: function() {
    var pane = this.get('detailPane');
    this.prCancelMouseLeaveTimer();
    if (pane) {
      pane.destroy();
    }
  },
  //renderUI, bindUI, syncUI have to be done as Y.after calls 'cause JS is dumb
  _renderUIRevealer: function() {
    //Mark this button as 
    var bb = this.get('boundingBox');
    bb.addClass('q_clickable');
  },
  _bindUIRevealer: function() {
    var boundingBox = this.get('boundingBox'),
         barManager = this.get('barManager');
    
    boundingBox.on('mouseenter', this.prMouseEnter, this);
    boundingBox.on('mouseleave', this.prMouseLeave, this);
    boundingBox.after('click', this.prButtonClick, this);
    
    this.observe(barManager, 'on', 'widgetAppear', function(widget) {
      if (widget != this) this.hidePane();
    });
    this.observe(barManager, 'on', 'barShifted', this.repositionPane);
  },
  _syncUIRevealer: function() {
  },
  isExternallyVisible: function () {
    var pane = this.get('detailPane');
    return pane && pane.get('visible');
  },
  prMouseEnter: function (evt) {
    var activation = this.get('activation');
    
    this.prCancelMouseLeaveTimer();
    if (activation == 'hover')
      this.showPane();
  },
  prMouseLeave: function (evt) {
    var paneRevealer = this;
    if (this.get('activation') == 'hover') {
      this.prCancelMouseLeaveTimer();
      this._mouseLeaveTimer = setTimeout(function () {
        delete paneRevealer._mouseLeaveTimer;
        paneRevealer.hidePane();
      }, MOUSE_LEAVE_DELAY);
    }
  },
  prCancelMouseLeaveTimer: function () {
    if (this._mouseLeaveTimer)
      clearTimeout(this._mouseLeaveTimer);
    delete this._mouseLeaveTimer;
  },
  prButtonClick: function(ev) {
    var activation = this.get('activation');
    //Toggles
    if (!this.showPane()) {
      //toggle only for 'click' or 'sticky'
      if (activation != 'hover') 
        this.hidePane();
    }
  },
  onPaneChange: function(evt) {
    if (!this.get('destroyed')) {
      //ensures that there's always a valid detailPane
      evt.newVal = evt.newVal || new LoadingPane();
    }
  },
  afterPaneChange: function(evt) {
    var oldPane = evt.prevVal,
        newPane = evt.newVal,
         doShow = false,
        paneBox;
    
    if (oldPane) {
      doShow = oldPane.get('visible');
      if (!oldPane.get('destroyed')) oldPane.destroy();
    }
    
    if (newPane) {
      newPane.set('parentWidget', this);
      
      doShow = doShow || newPane.get('visible');
      newPane.hide();
      newPane.render(BACON.fixedContainer);
      
      paneBox = newPane.get('boundingBox');
      paneBox.on('mouseenter', this.prMouseEnter, this);
      paneBox.on('mouseleave', this.prMouseLeave, this);
      
      //Pane should always start out hidden
      newPane.after('visibleChange', this.onPaneVisible, this);
      newPane.set('visible', doShow);
      
      //Listen for the destruction of the current pane
      // (listener must be attached after the new pane is set)
      newPane.after('destroy', this.afterPaneDestroy, this);
    }
  },
  afterPaneDestroy: function(ev) {
    var dtp = this.get('detailPane');
    
    // only if it's the current pane
    if (dtp == ev.target)
      this.set('detailPane', null);
  },
  showPane: function() {
    var dtp = this.get('detailPane'),
        isVisible = dtp.get('visible');
    
    // already rendered and already visible
    if (isVisible)
      return false; // we didn't do anything

    dtp.show();
    return true; // we did something (either rendered or showed it)
  },
  onPaneVisible: function(evt) {
    var visible = evt.target.get('visible'),
             bb = this.get('boundingBox');

    bb.toggleClass('q_selected', visible);

    if (visible) {
      this.repositionPane();
      this.get('barManager').fire('widgetAppear', this);
    }
  },
  repositionPane: function() {
    var dtp = this.get('detailPane'),
         bb = dtp ? dtp.get('boundingBox') : null,
         ro = BACON.FixedPositioner.rightOffset(this.get('boundingBox')),
         bottom = this.get('paneOffset');
    
    if (bb)
      bb.setStyles({bottom: bottom, right: ro});
  },
  hidePane: function() {
    this.get('detailPane').hide();
  }
}, true);

BACON.PaneRevealer = PaneRevealer;

///////////////////////
//
// Adds some standard styles to the pane
//
function BarPane(config) {
  BACON.widget.contentBoxFromHTML.call(this, config); // see comment in widget.js
  
  Y.after(this._renderUIBarPane, this, 'renderUI');
  Y.after(this._bindUIBarPane, this, 'bindUI');
  
  BarPane.superclass.constructor.apply(this, arguments);
}

BarPane.NAME = 'barPane';
BarPane.ATTRS = {
  parentWidget: {},
  serializeWidget: { value: true },
  visible: { value: false }
};

Y.extend(BarPane, Y.Widget, {
  initializer: function() {
    this.on('parentWidgetChange', this._parentWidgetChange, this);
  },
  _renderUIBarPane: function() {
    var cb = this.get('contentBox');
    cb.addClass('q_barpane_content')
    cb.setAttribute('role', 'tabpanel');
  },
  _bindUIBarPane: function() {
    var bb = this.get('boundingBox');
    this.after('visibleChange',function(ev) {
      bb.toggleClass('q_hidden',!ev.newVal);
    },this);
    bb.toggleClass('q_hidden',!this.get('visible'));
  },
  _hideClick: function(ev) {
    this.hide();
  },
  _destroyClick: function(ev) {
    ev.stopPropagation();
    this.get('parentWidget').destroy();
  },
  //Causes events to bubble up to the parent widget
  _parentWidgetChange: function(ev) {
    if(ev.prevVal) {
      this.removeTarget(ev.prevVal);
    }
    if(ev.newVal) {
      this.addTarget(ev.newVal);
    }
  }
}, true);

BACON.BarPane = BarPane;

////////////////
//
// A pane that is simply a loading throbber
//
var LoadingPane = Y.Base.create('loadingPane', BACON.BarPane, [BACON.AttributeExtensions], {
  BOUNDING_TEMPLATE: '<div class="q_loading"></div>',
  CONTENT_TEMPLATE:  '<div class="q_clearfix"></div>',
  initializer: function(config) {
    this.publish('paneRevealer:needPane', {emitFacade: true, fireOnce: true});
  },
  renderUI: function() {
    this.withValue('visible', function(ev) {
      if (ev.newVal) {
        //So that the spinner is horizontally centered over the parent widget
        var parentWidth = this.get('parentWidget').get('boundingBox').get('offsetWidth');
        this.get('contentBox').setStyle('minWidth', parentWidth);

        //So that revealers know they need to load a pane to replace this one
        this.fire('paneRevealer:needPane');
      }
    });
  }
}, {
});
BACON.LoadingPane = LoadingPane;

}, '@VERSION@', { requires: ["bacon-analytics","bacon-autobinding","bacon-config","bacon-dom","bacon-io","bacon-styles-embedded","bacon-widget","event-mouseenter","node-screen","widget"] });

YUI.add("bacon-xds", function (Y) {
Y.log("Adding bacon module bacon-xds", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;

if (QUORUS._isQuirkyFrame) {
  BACON.xds = window.QUORUS.BACON.xds;
  return;
}

var XdsSingleton = Y.Base.create('xdsSingleton',Y.Base,[], {
  initializer: function(config) {
    this._handlers = {}; //Request handlers, indexed by name
    this._openTxns = {}; //indexed by tid
    this._cancelators = {}; //indexed by tid
  },
  //Send a request with the given args object, cb is called with the response
  request: function(destWindow, proc, args, cb, context) {
    var tid = this._sendRequest(destWindow, {args: args || null, proc: proc, when: 'now'});
    this._openTxns[tid] = {
      win: destWindow,
      cb: Y.bind(cb || function() {}, context || window)
    };
    return tid;
  },
  
  //Send a request, do not expect a response
  push: function(destWindow, proc, args, when) {
    this._sendRequest(destWindow, {args: args || null, proc: proc, push: true, when: when || 'now' });
  },
  
  cancel: function(tid) {
    var txn = this._openTxns[tid];
    if(txn) {
      delete this._openTxns[tid];
      Y.log("Sending a cancelation (tid: " + tid + ")");
      this._sendRequest(txn.win, {cancel: tid});
    }
    return !!txn; //false if the transaction already completed
  },

  recvMessage: function(ev) {
    var obj, ret, self = this, origin = ev.origin;

    try {
      //Not a bacon message
      if (ev.data.indexOf('BACON') != 0) return;
      var data = ev.data.substring(5);

      obj = Y.JSON.parse(data);
    } catch(e) {
      Y.log("Caught exception parsing message in recvMessage from "+origin, 'error', 'bacon-xds');
      return;
    }

    if (obj.hasOwnProperty('args')) {
      Y.log("Dispatching XDS request: " + obj.proc + " (tid: " + obj.tid + ")", 'debug', 'bacon-xds');
      //Dispatch to the null handler if one is not defined
      var handler  = this._handlers[obj.proc] || this._handlers[null], 
          context  = handler.context || window, 
          func     = handler.func,
          canceled = false;

      //Optional origin check
      if (handler.origin) {
        if (handler.origin != origin)
          throw "Handler "+obj.proc+" requires origin of "+handler.origin+" but request origin was "+origin;
      }

      var completion = function(retval, exception) {
        if (obj.push || canceled) return; //Don't send a response if it was a push
        
        var resp = {
              dest: 'BACON',
              tid: obj.tid
            };
            
        if (exception)
          resp.exception = exception;
        else
          resp.value = retval;
        
        setTimeout(function() {
          ev.source.postMessage("BACON" + Y.JSON.stringify(resp), origin);
        },10);
      };

      try {
        //Dispatch
        if (handler.async) {
          var cancelator = func.call(context, obj.args, ev, completion);
          if(cancelator)
            this._cancelators[obj.tid] = function() {
              delete self._cancelators[obj.tid];
              canceled = true;
              cancelator();
            };
        } else
          completion(func.call(context, obj.args,ev));
      } catch(e) {
        completion(null,e);
        Y.log(e, 'error', 'bacon-xds');
      }

    } else if (obj.cancel) {
      //Request to cancel an outstanding request
      Y.log("Canceling transaction "+obj.cancel, 'info', 'bacon-xds');
      var f = this._cancelators[obj.cancel];
      if(f) {
        f();
        Y.log("  TXN is outstanding, called cancel function", 'info', 'bacon-xds');
        delete this._cancelators[obj.cancel];
      }
    } else {
      //Must be a response
      var txn = this._openTxns[obj.tid];
      delete this._openTxns[obj.tid];
      if(!txn) {
        Y.log("Got a response for a txn that doesn't exist (tid: " + obj.tid + ")", 'warn', 'bacon-xds');
      } else if (txn.cb) {
        txn.cb(function () {
          if ('undefined' != typeof obj.value) {
            return obj.value;
          } else {
            throw obj.exception;
          }
        });
      } else {
        Y.log("Got a response but no callback to hand it off to (tid: " + obj.tid + ")", 'warn', 'bacon-xds');
      }
    }
  },
  
  /*
   * Valid opts:
   *   origin: origin check for any requests, handler will not get called if the request is not from the given origin
   *   async: [boolean] if true, a callback function will be passed to the handler which can be used to asynchronously complete the request
   * Note: if the function is async, it may return a function that is the cancelator. If the request is canceled before it completes, the cancelator will be called
   */
  setRequestHandler: function(name, func, context, opts) {
    this._handlers[name] = Y.mix({func: func, context: context},opts);
  },
  
  _sendRequest: function(destWindow, msg) {
    var postIt;
    msg.dest = 'BACON';
    msg.tid  = this._availableTid();

    //Magic key prepended to identify our messages
    var serialized = "BACON" + Y.JSON.stringify(msg);
    if (QUORUS.advancedBrowser) {
      postIt = function () {
        setTimeout(function() {
          destWindow.postMessage(serialized, '*');
        },10);
      };

      if (msg.when == 'unload') {
        Y.on('unload', postIt);
      } else {
        postIt();
      }
    } else {
      //Encode the message
      throw new Error("XDS no longer supports non-advanced browsers");
    }

    return msg.tid;
  }, 
  
  //
  // Returns one randomly that is not currently in use
  //
  _availableTid: function() {
    while(true) {
      var tid = Math.floor(Math.random()*1e12);
      if (!this._openTxns[tid])
        return tid;
    }
  }
},{
  ATTRS: {
    
  }
});

var seqId = 0,
    xds = new XdsSingleton();

BACON.xds = xds;

///////////////
//
// Available request handlers
//
xds.setRequestHandler(null, function(args,ev) {
  throw "No handler for that method (data: "+ ev.data +")";
});

xds.setRequestHandler('echo', function(args) {
  return args.str;
});

xds.setRequestHandler('event', function(args) {
  Y.log("Dispatching event: " + args.event, 'debug', 'bacon-xds');
  BACON.fire(args.event, args.data);
});

xds.setRequestHandler('clearData', function (attrs) {
  Y.Array.each(attrs, function (name) {
    BACON.set(name, null);
  });
  Y.log("Cleared BACON attrs " + attrs.join(','), 'debug', 'bacon-xds');
});

}, '@VERSION@', { requires: ["bacon","bacon-config","json"] });

YUI.add("bacon-auth-host", function (Y) {
Y.log("Adding bacon module bacon-auth-host", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;

if (QUORUS._isQuirkyFrame) {
  BACON.Auth = window.QUORUS.BACON.Auth;
  return;
}

//Instantiated in the host-site.com pages
var HostAuth = Y.Base.create('hostAuth',Y.Base,[BACON.AttributeExtensions],{
  //methods
  initializer: function(config) {
    //Called when a user completes an auth mechanism or it is loaded from the session
    //Does not fire if the user is not logged in at all
    BACON.publish('authLoaded',{fireOnce: true, emitFacade: false});
    //Fired once authData has been sent from the quorus frame at least once (even if there is no session)
    //Will always fire on every page
    BACON.publish('authInitialized', {fireOnce: true, emitFacade: false});

    //////
    //loads auth data out of sessionStorage, if the authSession differs, reload the page
    //
    this.publish('authWindowReady', { fireOnce: true, emitFacade: false });

    // The logout facade has a 'reason' property, which can be 'authChange' or 'user'
    BACON.publish('logout', { fireOnce: true, emitFacade: true });

    //xds handler for listening to auth frame only if the user is not logged in
    BACON.xds.setRequestHandler('authData',function(data) {
      if(data) { //null if no user or "logout" fired
        BACON.config.setSessionKey('authData',data);
        BACON.set('authSession', data);
        BACON.fire('authLoaded', this);
      }
      BACON.fire('authInitialized', this);
    },this);
    
    //Auth handler for getting the analyticsId
    BACON.xds.setRequestHandler('analyticsId', function(data) {
      BACON.set('analyticsId', data.analyticsId);
    });

    //Done explicitly before the authLoaded listener
    var authData = BACON.config.getSessionKey('authData');
    if(authData && authData.uuid) {
      BACON.set('authSession', authData);
      BACON.fire('authLoaded', this);
    }

    //Change the handler only if the user has already been auth'd
    //If we're already logged in and we get new data
    //reset the authData handler to force a reset of the page as well
    BACON.on('authLoaded',function(auth) {
      BACON.xds.setRequestHandler('authData',function(data) {
        var oldUUID = BACON.get('authSession.uuid');

        BACON.config.setSessionKey('authData',data);
        data = data || {};
        if(data.uuid != oldUUID) {
          Y.log("These are not the same: "+data.uuid+","+oldUUID, 'debug', 'auth-host');
          BACON.fire('logout', {reason: 'authChange'});
          // allow some time to sync sessionStorage
          // TODO: Bugs here are really,really bad
          setTimeout(function () {
            window.location.reload();
          }, 100);
        } else {
          Y.log('Ignoring identical auth data','info','Auth');
          BACON.fire('authInitialized', this);
        }
      },auth);
    });
    
    //Drop an iFrame in Quorus.com 
    var iframe = Y.Node.create('<iframe width="0" height="0" style="visibility: hidden; display: none;"></iframe>'),
       baseUrl = "https://conversations.amazon.com",
      frameUrl = BACON.pathAppend(baseUrl, '/session/frame/' + BACON.config.getDefaultKey('siteKey') + '.html');
    frameUrl = BACON.queryStringAppend(frameUrl, { version: BACON.config.getDefaultKey('deployVersion') });

    //sets the authWindow attribute once the auth subsystem on the other side has loaded
    BACON.xds.setRequestHandler('authFrameReady',function(args,ev) {
      // Pending YUI #2529255
      this.set('authWindow', iframe.getDOMNode().contentWindow);
      this.fire('authWindowReady',this.get('authWindow'));
      //Cannot be changed again
      BACON.xds.setRequestHandler('authFrameReady', function () {
        Y.log('Tried to call authFrameReady a second time!', 'error', 'bacon-auth');
      });
    },this);

    //puts a bug in the window to alert the user about auth test mode, or origin mismatch
    BACON.xds.setRequestHandler('authTestMode',function(args,ev) {
      BACON.after('rootNodeReady',function(rootNode,fixedContainer) {
      });
    },this);

    BACON.after('rootNodeReady',function(rootNode) {
      rootNode.append(iframe);
      iframe.getDOMNode().contentWindow.location = frameUrl;
    });
  },
  logout: function () {
    BACON.fire('logout', {reason: 'user'});
    this.on('authWindowReady',function(authWin) {
      BACON.xds.push(authWin,'authLogout');
    });
  },
  //NOTE: This pretty much must be called directly in an onClick handler
  oauthLogin: function(service) {
    var url = "https://conversations.amazon.com";
    
    url = BACON.pathAppend(url,'/session/oauth_login');
    url = BACON.queryStringAppend(url, {service: service, site: BACON.config.getDefaultKey('siteKey')});
    window.open(url, 'oauth', 'toolbar=no,menubar=no,location=yes,width=700,height=600');
  },

  googleCredentialsAuth: function(service) {
    var url = "https://conversations.amazon.com";
    url = BACON.pathAppend(url,'/google/google_sign_in');
    url = BACON.queryStringAppend(url, {service: 'google', site: BACON.config.getDefaultKey('siteKey')});
    var popup = window.open(url, 'googleSignIn', 'toolbar=no,menubar=no,location=yes,width=700,height=600');
    popup.focus();
    return popup;
 },
  //NOTE: This pretty much must be called directly in an onClick handler
  amazonSignIn: function(continuation) {
    var signIn = "https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.pape.max_auth_age=0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&_encoding=UTF8&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select",
      returnTo = BACON.pathAppend("https://conversations.amazon.com", "/session/openid_return_to"),
         popup;
    
    returnTo = BACON.queryStringAppend(returnTo, {site: BACON.config.getDefaultKey('siteKey')});
    signIn = BACON.queryStringAppend(signIn, {'openid.return_to': returnTo});
    
    popup = window.open(signIn, 'signin', 'toolbar=no,menubar=no,location=yes,width=700,height=500');
    popup.focus();
    Y.later(100, this, function checkClosed() {
      if (popup.closed)
        this.amazonLogin(continuation);
      else
        Y.later(100, this, checkClosed);
    });
  },
  //Causes a login using the existing Amazon credentials
  //This may fail to produce an authenticated state
  amazonLogin: function(continuation) {
    this.on('authWindowReady', function(authWin) {
      BACON.xds.request(authWin, 'amazonCredentialsLogin', {}, continuation);
    });
  },
  //Thin wrapper, calls the appropriate 'xds' function once the frame is ready to accept requests
  //Returns a method that may be called to cancel the request since the tid is not immediately known
  //Requests are made after authInitialized since that is what most external modules want
  xdsToFrame: function() {
    var XDS    = BACON.xds,
        args   = Array.prototype.slice.call(arguments, 0),
        method = args.shift(),
        tid, handle; //Should be push or request

    handle = BACON.after('authInitialized', function() {
      handle = this.after('authWindowReady', function(authWin) {
        args.unshift(this.get('authWindow'));
        tid = XDS[method].apply(XDS,args);
      }, this);
    }, this);
    
    return function() {
      if(tid) {
        return XDS.cancel(tid);
      } else {
        handle.detach();
        return true;
      }
    };
  },
  /****
   * Flash storage is cleared once accessed by key. values are JSON-able objects.
   * Flash is stored in the quorus frame
   */
  getFlash: function(key, callback, context) {
    this.xdsToFrame('request', 'getFlash', key, function(o) {
      callback.call(context, o());
    });
  }, 
  setFlash: function(key, value) {
    this.xdsToFrame('push', 'setFlash', {k: key, v: value});
  }
}, {
  ATTRS: {
    authWindow: { } //Reference to the window of the Quorus.com frame
  }
});

if(!QUORUS._isQuorusFrame) {
  BACON.Auth = new HostAuth();
} else {
  throw "Cannot load auth-host in Quorus frames!";
}

}, '@VERSION@', { requires: ["bacon","bacon-config","bacon-xds"] });

YUI.add("bacon-element-parser", function (Y) {
Y.log("Adding bacon module bacon-element-parser", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


var parsers = {
      floating: function (el) {
        var match = el.get('text').replace(/[^0-9\.]/g, '').match(/([0-9]+(\.[0-9]+)?)/);
        return parseFloat(match && match[0]);
      },
      images: function (els) {
        if (! (els instanceof Y.NodeList))
          els = new Y.NodeList(els);
        return els;
      },
      meta: function (el) {
        return Y.Lang.trim(el.get('content'));
      },
      text: function(el) {
        return Y.Lang.trim(el.get('text')).replace(/\s+/, ' ');
      },
      url: function(el) {
        return Y.Lang.trim(el.get('href') || el.get('src') || el.get('text'));
      }
    };

/*
 * Causes attributes on the supplied class, clazz, with opts 'parseType'
 * to be coerced into the loose type specified. 
 *
 * Additionally, attributes for which there is a corresponding 
 * '<attribute name>Selector' attribute (e.g. 'image' and 'imageSelector'), 
 * the '<attribute name>Selector' will be used as a CSS selector to find and 
 * initialize the attribute. If the attribute 'classSelectorPrefix' is defined,
 * it will be prepended to all *Selector values.
 *
 * If the attribute 'selectorRoot' is defined, all *Selector attributes will
 * be selected relative to the CSS selector, selectorRoot. 
 *
 * If the *Selector attribute is an array, the first element corresponds to the 
 * selector to use and multiple elements are returned instead of just the first
 * element. 
 *
 */
function makeParseable (clazz) {
  var attrs = clazz.ATTRS;
  Y.Object.each(attrs, function(v, k) {
    var parser = parsers[v.parseType],
        selectorAttr = k + 'Selector',
        oldValueFn = v.valueFn;

    if (parser) {
      // Stub *Selector attribute: an element with a class matching the attribute name
      var selectorAttrConfig = attrs[selectorAttr] = attrs[selectorAttr] || {};
      selectorAttrConfig.value = selectorAttrConfig.value;
      selectorAttrConfig.getter = selectorAttrConfig.getter || function (value) {
        var prefix = this.get('selectorClassPrefix');
        if (prefix) {
          if (Y.Lang.isString(value)) {
            return value.replace(/\./g, '.' + prefix);
          } else if (Y.Lang.isArray(value)) {
            return [value[0].replace(/\./g, '.' + prefix)];
          }
        }
        return value;
      };
      
      // Default value function for the main attribute
      v.valueFn = function () {
        var selectorRoot = Y.one(this.get('selectorRoot') || Y.config.doc.documentElement),
            selector = this.get(selectorAttr),
            elem;

        if (selector) {
          if (Y.Lang.isArray(selector)) {
            elem = selectorRoot.all(selector[0]);
          } else {
            elem = selectorRoot.one(selector);
          }
        }

        return elem && parser.call(this, elem) || oldValueFn && oldValueFn.call(this);
      };
    }
  });
}

BACON.makeParseable = makeParseable;

}, '@VERSION@', { requires: ["bacon","yui"] });

YUI.add("bacon-item", function (Y) {
Y.log("Adding bacon module bacon-item", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


var ITEM = 'item',
    DEFAULT_IMAGE = {
      src: BACON.config.getDefaultKey('publicUrlBase') + '/images/generic_document.png',
      height: 130,
      width: 130
    },
    itemSet = false;

var Item = function (config) {
  Item.superclass.constructor.apply(this, arguments);
};
Item.NAME = ITEM;
Item.ATTRS = {
  selectorRoot:   { value: Y.config.doc.documentElement },
  selectorClassPrefix: {},
  brand:          { serialize: true, parseType: 'text' },
  category:       { serialize: true, parseType: 'text' },
  categorySelector: { value: '.category' },
  description:    {
    serialize: true, 
    parseType: 'text',
    getter: function(val) {
      if (val && val.length > 400)
        return val.substring(0, 400) + '...';
      return val;
    }
  },
  identifier:     { serialize: true, parseType: 'text' },
  identifierSelector: { value: '.identifier .identifier-value, .identifier dd' },
  identifierType: {
    serialize: true,
    setter: function (val) {
      if (Y.Lang.isString(val))
        val = val.replace(/[^-_+a-z0-9]/gi, '').toUpperCase();
      return val;
    },
    parseType: 'text'
  },
  identifierTypeSelector: { value: '.identifier .identifier-type, .identifier dt' },
  image:          {
    getter: function () {
      return this.get('images').item(0);
    }
  },
  images:         {
    value: [],
    serialize: true,
    parseType: 'images',
    setter: function (nodes) {
      if (! (nodes instanceof ItemImageList))
        nodes = new ItemImageList(nodes);
      return nodes;
    },
    lazyAdd: false,
    valueFn: function () {
      return new ItemImageList([DEFAULT_IMAGE]);
    }
  },
  imagesSelector: { value: ['img.photo'] }, // TODO: support link elements, per spec
  name:           { serialize: true, parseType: 'text' },
  nameSelector: { value: '.name' },
  price:          { serialize: true, parseType: 'floating' },
  type:           { serialize: true, parseType: 'text', valueFn: function () {
    if (this.get('image.src') == DEFAULT_IMAGE.src)
      return 'page';
    return BACON.config.getDefaultKey('defaultTopicType');
  }},
  url:            {
    serialize: true,
    parseType: 'url',
    valueFn: function () {
      var metatag = Y.one('.quorus-product-url');
      return metatag && metatag.get('href') || Y.config.doc.location.href;
    }
  }
};
BACON.makeParseable(Item);
Y.extend(Item, Y.Base);
Y.augment(Item, BACON.Serializable);

function ItemImage (el) {
  if (el instanceof Y.Node)
    el = el.getDOMNode();
  this.src = el.src || el.href;
  this.publish('dimensionsReady', {fireOnce: true});
  if (el.height && el.width) {
    this.height = el.height;
    this.width = el.width;
    this.fire('dimensionsReady');
  } else {
    this.getDimensions();
  }
}
ItemImage.prototype = {
  //
  // applyImage takes a container node (e.g. div) whose width and height
  // constrain the image, then the image within is scaled to fit
  //
  applyImage: function (node, zoom) {
    if (Y.Lang.isUndefined(zoom))
      zoom = true;
    this.on('dimensionsReady', this._applyImage, this, node, zoom);
  },

  _applyImage: function (node, zoom) {
    var img = node.one('img'),
        maxWidth = parseInt(node.getStyle('width'), 10),
        maxHeight = parseInt(node.getStyle('height'), 10),
        dims = this.dimsBoundedBy(maxWidth, maxHeight, zoom);
    if (node == img) {
      Y.log('In applyImage: Node and image are identical!','warn');
    }
    img.setAttrs({
      src: this.src,
      width: dims.width,
      height: dims.height
    });
    if (zoom) {
      img.setStyles({
        marginLeft: dims.offsetLeft,
        marginTop: dims.offsetTop
      });
    }
  },
  dimsBoundedBy: function(widthLimit, heightLimit, zoom) {
    var width = this.width,
        height = this.height,
        offsetLeft = 0, offsetTop = 0,
        scale_x = widthLimit  / width,
        scale_y = heightLimit / height,
        scale = zoom && Math.max(scale_x, scale_y) || Math.min(scale_x, scale_y);
    width  = Math.floor(width  * scale);
    height = Math.floor(height * scale);
    offsetLeft = -1 * Math.floor((width  - widthLimit ) / 2);
    offsetTop  = -1 * Math.floor((height - heightLimit) / 2);
    return {width: width, height: height,
            offsetLeft: offsetLeft, offsetTop: offsetTop};
  },
  getDimensions: function () {
    var image = new Image();
    Y.log("Fetching (async) dimensions for image " + this.src, 'debug', 'ElementParser');
    image.onload = Y.bind(function () {
      this.width = image.width;
      this.height = image.height;
      this.fire('dimensionsReady');
      image.onload = image.onerror = image.onabort = null;
    }, this);
    image.onerror = function () {
      Y.log("Failed (onerror) to fetch image " + this.src, 'error', 'ElementParser');
      image.onload = image.onerror = image.onabort = null;
    };
    image.onabort = function () {
      Y.log("Failed (onabort) to fetch image " + this.src, 'warn', 'ElementParser');
      image.onload = image.onerror = image.onabort = null;
    };
    image.src = this.src;
  },
  toJSON: function () {
    return {
      height: this.height,
      src: this.src,
      width: this.width
    };
  }
};
Y.augment(ItemImage, Y.EventTarget);
BACON.ItemImage = ItemImage;

function ItemImageList (list) {
  var readyCount = 0,
      size,
      i;

  // Coerce NodeList to Array
  if (list instanceof Y.NodeList)
    list = list._nodes;

  // Coerce array elements to ItemImages
  // Limit to 1 image on !advancedBrowser(s)
  i = size = list.length = Math.min(list.length, QUORUS.advancedBrowser ? 1000 : 1);
  while (i--) {
    if (! (list[i] instanceof ItemImage)) 
      list[i] = new ItemImage(list[i]);
  }

  ItemImageList.superclass.constructor.call(this, list);

  this.publish('allDimensionsReady', {fireOnce: true});
  if (size) {
    this.each(function (image) {
      image.on('dimensionsReady', function () {
        readyCount++;
        if (readyCount === size)
          this.fire('allDimensionsReady');
      }, this);
    }, this);
  } else {
    this.fire('allDimensionsReady');
  }
}
Y.extend(ItemImageList, Y.ArrayList);
Y.augment(ItemImageList, Y.EventTarget);

// This must come after ItemImageList because typedAttr can cause an Item to be instantiated.
BACON.addAttr(ITEM, {setter: BACON.bind(BACON.coerceValue, Item)});

function setItem (o) {
  var item;
  itemSet = true;
  if (o.imageSelector) {
    o.imagesSelector = o.imageSelector;
    delete o.imageSelector;
  }
  if (o.image) {
    o.images = [o.image];
    delete o.image;
  }
  item = new Item(o);
  item.get('images').on('allDimensionsReady', function () {
    BACON.set(ITEM, item);
  });
}

BACON.after('rootNodeReady', function (rootNode) {
  BACON.withValue(ITEM, function (evt) {
    if (evt.newVal) {
      rootNode.addClass('q_topic_present');
      Y.one('body').addClass('quorus-product');
    } else {
      rootNode.removeClass('q_topic_present');
      Y.one('body').removeClass('quorus-product');
    }
  });
});

BACON.withValue(ITEM, function (evt) {
  BACON.Analytics.setGlobal('pageType', evt.newVal ? evt.newVal.get('type') : false);
  if (evt.newVal && evt.newVal.get('category')) {
    var itemCategory = evt.newVal.get('category').replace('_display_on_website', '');
    BACON.Analytics.setGlobal('itemCategory', itemCategory);
  }
});

function newItem () {
  var productDiv = Y.one('body .quorus-product');
  if (productDiv) {
    setItem({
      selectorRoot: productDiv,
      selectorClassPrefix: 'quorus-product-'
    });
  } else {
    setItem({
      selectorRoot: 'head',
      nameSelector: 'title',
      imageSelector: 'link[rel=image_src]'
    });
  }
}

if (! QUORUS._isQuorusFrame) {
  BACON.once('callbacksDone', function () {
    if (! itemSet) {
      newItem();
    }
  });
}

// QUORUS API
QUORUS.setItem = setItem;
QUORUS.newItem = newItem;
QUORUS.setPage = function (o) { setItem(o.item); };
BACON.Item = Item;

}, '@VERSION@', { requires: ["bacon","bacon-analytics","bacon-config","bacon-element-parser","bacon-serializable","base-build","arraylist","collection"] });
