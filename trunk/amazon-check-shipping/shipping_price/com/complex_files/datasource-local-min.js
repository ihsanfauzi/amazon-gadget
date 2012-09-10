/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("intl",function(d){var b={},a="yuiRootLang",e="yuiActiveLang",c=[];d.mix(d.namespace("Intl"),{_mod:function(f){if(!b[f]){b[f]={};}return b[f];},setLang:function(g,j){var i=this._mod(g),f=i[e],h=!!i[j];if(h&&j!==f){i[e]=j;this.fire("intl:langChange",{module:g,prevVal:f,newVal:(j===a)?"":j});}return h;},getLang:function(f){var g=this._mod(f)[e];return(g===a)?"":g;},add:function(g,h,f){h=h||a;this._mod(g)[h]=f;this.setLang(g,h);},get:function(h,g,j){var f=this._mod(h),i;j=j||f[e];i=f[j]||{};return(g)?i[g]:d.merge(i);},getAvailableLangs:function(h){var f=d.Env._loader,g=f&&f.moduleInfo[h],i=g&&g.lang;return(i)?i.concat():c;}});d.augment(d.Intl,d.EventTarget);d.Intl.publish("intl:langChange",{emitFacade:true});},"3.6.0",{requires:["event-custom","intl-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("transition",function(b){var i="",h="",f=b.config.doc,r="documentElement",s="transition",k="Transition",m,j,p,a,n,c,l,t,q={},g=["Webkit","Moz"],e={Webkit:"webkitTransitionEnd"},d=function(){this.init.apply(this,arguments);};d._toCamel=function(u){u=u.replace(/-([a-z])/gi,function(w,v){return v.toUpperCase();});return u;};d._toHyphen=function(u){u=u.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(y,x,w,v){var z=((x)?"-"+x.toLowerCase():"")+w;if(v){z+="-"+v.toLowerCase();}return z;});return u;};d.SHOW_TRANSITION="fadeIn";d.HIDE_TRANSITION="fadeOut";d.useNative=false;b.Array.each(g,function(v){var u=v+k;if(u in f[r].style){i=v;h=d._toHyphen(v)+"-";d.useNative=true;d.supported=true;d._VENDOR_PREFIX=v;}});k=i+k;m=i+"TransitionProperty";j=h+"transition-property";p=h+"transition-duration";a=h+"transition-timing-function";n=h+"transition-delay";c="transitionend";l="on"+i.toLowerCase()+"transitionend";c=e[i]||c;t=i+"Transform";d.fx={};d.toggles={};d._hasEnd={};d._reKeywords=/^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i;b.Node.DOM_EVENTS[c]=1;d.NAME="transition";d.DEFAULT_EASING="ease";d.DEFAULT_DURATION=0.5;d.DEFAULT_DELAY=0;d._nodeAttrs={};d.prototype={constructor:d,init:function(v,u){var w=this;w._node=v;if(!w._running&&u){w._config=u;v._transition=w;w._duration=("duration" in u)?u.duration:w.constructor.DEFAULT_DURATION;w._delay=("delay" in u)?u.delay:w.constructor.DEFAULT_DELAY;w._easing=u.easing||w.constructor.DEFAULT_EASING;w._count=0;w._running=false;}return w;},addProperty:function(v,x){var A=this,y=this._node,C=b.stamp(y),B=b.one(y),F=d._nodeAttrs[C],z,E,u,D,w;if(!F){F=d._nodeAttrs[C]={};}D=F[v];if(x&&x.value!==undefined){w=x.value;}else{if(x!==undefined){w=x;x=q;}}if(typeof w==="function"){w=w.call(B,B);}if(D&&D.transition){if(D.transition!==A){D.transition._count--;}}A._count++;u=((typeof x.duration!="undefined")?x.duration:A._duration)||0.0001;F[v]={value:w,duration:u,delay:(typeof x.delay!="undefined")?x.delay:A._delay,easing:x.easing||A._easing,transition:A};z=b.DOM.getComputedStyle(y,v);E=(typeof w==="string")?z:parseFloat(z);if(d.useNative&&E===w){setTimeout(function(){A._onNativeEnd.call(y,{propertyName:v,elapsedTime:u});},u*1000);}},removeProperty:function(w){var v=this,u=d._nodeAttrs[b.stamp(v._node)];if(u&&u[w]){delete u[w];v._count--;}},initAttrs:function(v){var u,w=this._node;if(v.transform&&!v[t]){v[t]=v.transform;delete v.transform;}for(u in v){if(v.hasOwnProperty(u)&&!d._reKeywords.test(u)){this.addProperty(u,v[u]);if(w.style[u]===""){b.DOM.setStyle(w,u,b.DOM.getComputedStyle(w,u));}}}},run:function(y){var x=this,v=x._node,u=x._config,w={type:"transition:start",config:u};if(!x._running){x._running=true;if(u.on&&u.on.start){u.on.start.call(b.one(v),w);}x.initAttrs(x._config);x._callback=y;x._start();}return x;},_start:function(){this._runNative();},_prepDur:function(u){u=parseFloat(u);return u+"s";},_runNative:function(w){var C=this,x=C._node,E=b.stamp(x),v=x.style,A=x.ownerDocument.defaultView.getComputedStyle(x),I=d._nodeAttrs[E],y="",J=A[d._toCamel(j)],H=j+": ",B=p+": ",G=a+": ",D=n+": ",z,F,u;if(J!=="all"){H+=J+",";B+=A[d._toCamel(p)]+",";G+=A[d._toCamel(a)]+",";D+=A[d._toCamel(n)]+",";}for(u in I){z=d._toHyphen(u);F=I[u];if((F=I[u])&&F.transition===C){if(u in x.style){B+=C._prepDur(F.duration)+",";D+=C._prepDur(F.delay)+",";G+=(F.easing)+",";H+=z+",";y+=z+": "+F.value+"; ";}else{this.removeProperty(u);}}}H=H.replace(/,$/,";");B=B.replace(/,$/,";");G=G.replace(/,$/,";");D=D.replace(/,$/,";");if(!d._hasEnd[E]){x.addEventListener(c,C._onNativeEnd,"");d._hasEnd[E]=true;}v.cssText+=H+B+G+D+y;},_end:function(u){var y=this,w=y._node,A=y._callback,v=y._config,x={type:"transition:end",config:v,elapsedTime:u},z=b.one(w);y._running=false;y._callback=null;if(w){if(v.on&&v.on.end){setTimeout(function(){v.on.end.call(z,x);if(A){A.call(z,x);}},1);}else{if(A){setTimeout(function(){A.call(z,x);},1);}}}},_endNative:function(u){var v=this._node,w=v.ownerDocument.defaultView.getComputedStyle(v,"")[d._toCamel(j)];u=d._toHyphen(u);if(typeof w==="string"){w=w.replace(new RegExp("(?:^|,\\s)"+u+",?"),",");w=w.replace(/^,|,$/,"");v.style[k]=w;}},_onNativeEnd:function(B){var x=this,A=b.stamp(x),u=B,v=d._toCamel(u.propertyName),E=u.elapsedTime,D=d._nodeAttrs[A],C=D[v],y=(C)?C.transition:null,z,w;if(y){y.removeProperty(v);y._endNative(v);w=y._config[v];z={type:"propertyEnd",propertyName:v,elapsedTime:E,config:w};if(w&&w.on&&w.on.end){w.on.end.call(b.one(x),z);}if(y._count<=0){y._end(E);x.style[m]="";}}},destroy:function(){var v=this,u=v._node;if(u){u.removeEventListener(c,v._onNativeEnd,false);v._node=null;}}};b.Transition=d;b.TransitionNative=d;b.Node.prototype.transition=function(w,v,A){var u=d._nodeAttrs[b.stamp(this._node)],y=(u)?u.transition||null:null,x,z;if(typeof w==="string"){if(typeof v==="function"){A=v;v=null;}x=d.fx[w];if(v&&typeof v!=="boolean"){v=b.clone(v);for(z in x){if(x.hasOwnProperty(z)){if(!(z in v)){v[z]=x[z];}}}}else{v=x;}}else{A=v;v=w;}if(y&&!y._running){y.init(this,v);}else{y=new d(this._node,v);}y.run(A);return this;};b.Node.prototype.show=function(v,u,w){this._show();if(v&&b.Transition){if(typeof v!=="string"&&!v.push){if(typeof u==="function"){w=u;u=v;}v=d.SHOW_TRANSITION;}this.transition(v,u,w);}return this;};var o=function(v,u,w){return function(){if(u){u.call(v);}if(w){w.apply(v._node,arguments);}};};b.Node.prototype.hide=function(v,u,w){if(v&&b.Transition){if(typeof u==="function"){w=u;u=null;}w=o(this,this._hide,w);if(typeof v!=="string"&&!v.push){if(typeof u==="function"){w=u;u=v;}v=d.HIDE_TRANSITION;}this.transition(v,u,w);}else{this._hide();}return this;};b.NodeList.prototype.transition=function(v,y){var u=this._nodes,w=0,x;while((x=u[w++])){b.one(x).transition(v,y);}return this;};b.Node.prototype.toggleView=function(v,u,w){this._toggles=this._toggles||[];w=arguments[arguments.length-1];if(typeof v=="boolean"){u=v;v=null;}v=v||b.Transition.DEFAULT_TOGGLE;if(typeof u=="undefined"&&v in this._toggles){u=!this._toggles[v];}u=(u)?1:0;if(u){this._show();
}else{w=o(this,this._hide,w);}this._toggles[v]=u;this.transition(b.Transition.toggles[v][u],w);return this;};b.NodeList.prototype.toggleView=function(w,u,z){var v=this._nodes,x=0,y;while((y=v[x++])){b.one(y).toggleView(w,u,z);}return this;};b.mix(d.fx,{fadeOut:{opacity:0,duration:0.5,easing:"ease-out"},fadeIn:{opacity:1,duration:0.5,easing:"ease-in"},sizeOut:{height:0,width:0,duration:0.75,easing:"ease-out"},sizeIn:{height:function(u){return u.get("scrollHeight")+"px";},width:function(u){return u.get("scrollWidth")+"px";},duration:0.5,easing:"ease-in",on:{start:function(){var u=this.getStyle("overflow");if(u!=="hidden"){this.setStyle("overflow","hidden");this._transitionOverflow=u;}},end:function(){if(this._transitionOverflow){this.setStyle("overflow",this._transitionOverflow);delete this._transitionOverflow;}}}}});b.mix(d.toggles,{size:["sizeOut","sizeIn"],fade:["fadeOut","fadeIn"]});d.DEFAULT_TOGGLE="fade";},"3.6.0",{requires:["node-style"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("plugin",function(b){function a(c){if(!(this.hasImpl&&this.hasImpl(b.Plugin.Base))){a.superclass.constructor.apply(this,arguments);}else{a.prototype.initializer.apply(this,arguments);}}a.ATTRS={host:{writeOnce:true}};a.NAME="plugin";a.NS="plugin";b.extend(a,b.Base,{_handles:null,initializer:function(c){this._handles=[];},destructor:function(){if(this._handles){for(var d=0,c=this._handles.length;d<c;d++){this._handles[d].detach();}}},doBefore:function(g,d,c){var e=this.get("host"),f;if(g in e){f=this.beforeHostMethod(g,d,c);}else{if(e.on){f=this.onHostEvent(g,d,c);}}return f;},doAfter:function(g,d,c){var e=this.get("host"),f;if(g in e){f=this.afterHostMethod(g,d,c);}else{if(e.after){f=this.afterHostEvent(g,d,c);}}return f;},onHostEvent:function(e,d,c){var f=this.get("host").on(e,d,c||this);this._handles.push(f);return f;},afterHostEvent:function(e,d,c){var f=this.get("host").after(e,d,c||this);this._handles.push(f);return f;},beforeHostMethod:function(f,d,c){var e=b.Do.before(d,this.get("host"),f,c||this);this._handles.push(e);return e;},afterHostMethod:function(f,d,c){var e=b.Do.after(d,this.get("host"),f,c||this);this._handles.push(e);return e;},toString:function(){return this.constructor.NAME+"["+this.constructor.NS+"]";}});b.namespace("Plugin").Base=a;},"3.6.0",{requires:["base-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-key",function(g){var e="+alt",c="+ctrl",d="+meta",b="+shift",a=g.Lang.trim,f={KEY_MAP:{enter:13,esc:27,backspace:8,tab:9,pageup:33,pagedown:34},_typeRE:/^(up|down|press):/,_keysRE:/^(?:up|down|press):|\+(alt|ctrl|meta|shift)/g,processArgs:function(m){var p=m.splice(3,1)[0],o=g.Array.hash(p.match(/\+(?:alt|ctrl|meta|shift)\b/g)||[]),j={type:this._typeRE.test(p)?RegExp.$1:null,mods:o,keys:null},n=p.replace(this._keysRE,""),k,q,h,l;if(n){n=n.split(",");j.keys={};for(l=n.length-1;l>=0;--l){k=a(n[l]);if(!k){continue;}if(+k==k){j.keys[k]=o;}else{h=k.toLowerCase();if(this.KEY_MAP[h]){j.keys[this.KEY_MAP[h]]=o;if(!j.type){j.type="down";}}else{k=k.charAt(0);q=k.toUpperCase();if(o["+shift"]){k=q;}j.keys[k.charCodeAt(0)]=(k===q)?g.merge(o,{"+shift":true}):o;}}}}if(!j.type){j.type="press";}return j;},on:function(n,k,m,j){var h=k._extra,i="key"+h.type,l=h.keys,o=(j)?"delegate":"on";k._detach=n[o](i,function(q){var p=l?l[q.which]:h.mods;if(p&&(!p[e]||(p[e]&&q.altKey))&&(!p[c]||(p[c]&&q.ctrlKey))&&(!p[d]||(p[d]&&q.metaKey))&&(!p[b]||(p[b]&&q.shiftKey))){m.fire(q);}},j);},detach:function(j,h,i){h._detach.detach();}};f.delegate=f.on;f.detachDelegate=f.detach;g.Event.define("key",f,true);},"3.6.0",{requires:["event-synthetic"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("escape",function(c){var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},b={html:function(d){return(d+"").replace(/[&<>"'\/`]/g,b._htmlReplacer);},regex:function(d){return(d+"").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g,"\\$&");},_htmlReplacer:function(d){return a[d];}};b.regexp=b.regex;c.Escape=b;},"3.6.0",{requires:["yui-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-valuechange",function(e){var c="_valuechange",d="value",a,b={POLL_INTERVAL:50,TIMEOUT:10000,_poll:function(k,g){var i=k._node,j=g.e,f=i&&i.value,l=k._data&&k._data[c],h,m;if(!i||!l){b._stopPolling(k);return;}m=l.prevVal;if(f!==m){l.prevVal=f;h={_event:j,currentTarget:(j&&j.currentTarget)||k,newVal:f,prevVal:m,target:(j&&j.target)||k};e.Object.each(l.notifiers,function(n){n.fire(h);});b._refreshTimeout(k);}},_refreshTimeout:function(g,f){if(!g._node){return;}var h=g.getData(c);b._stopTimeout(g);h.timeout=setTimeout(function(){b._stopPolling(g,f);},b.TIMEOUT);},_startPolling:function(h,g,f){if(!h.test("input,textarea")){return;}var i=h.getData(c);if(!i){i={prevVal:h.get(d)};h.setData(c,i);}i.notifiers||(i.notifiers={});if(i.interval){if(f.force){b._stopPolling(h,g);}else{i.notifiers[e.stamp(g)]=g;return;}}i.notifiers[e.stamp(g)]=g;i.interval=setInterval(function(){b._poll(h,i,f);},b.POLL_INTERVAL);b._refreshTimeout(h,g);},_stopPolling:function(g,f){if(!g._node){return;}var h=g.getData(c)||{};clearInterval(h.interval);delete h.interval;b._stopTimeout(g);if(f){h.notifiers&&delete h.notifiers[e.stamp(f)];}else{h.notifiers={};}},_stopTimeout:function(f){var g=f.getData(c)||{};clearTimeout(g.timeout);delete g.timeout;},_onBlur:function(g,f){b._stopPolling(g.currentTarget,f);},_onFocus:function(h,g){var f=h.currentTarget,i=f.getData(c);if(!i){i={};f.setData(c,i);}i.prevVal=f.get(d);b._startPolling(f,g,{e:h});},_onKeyDown:function(g,f){b._startPolling(g.currentTarget,f,{e:g});},_onKeyUp:function(g,f){if(g.charCode===229||g.charCode===197){b._startPolling(g.currentTarget,f,{e:g,force:true});}},_onMouseDown:function(g,f){b._startPolling(g.currentTarget,f,{e:g});},_onSubscribe:function(k,h,j,g){var l,i,f;i={blur:b._onBlur,focus:b._onFocus,keydown:b._onKeyDown,keyup:b._onKeyUp,mousedown:b._onMouseDown};l=j._valuechange={};if(g){l.delegated=true;l.getNodes=function(){return k.all("input,textarea").filter(g);};l.getNodes().each(function(m){if(!m.getData(c)){m.setData(c,{prevVal:m.get(d)});}});j._handles=e.delegate(i,k,g,null,j);}else{if(!k.test("input,textarea")){return;}if(!k.getData(c)){k.setData(c,{prevVal:k.get(d)});}j._handles=k.on(i,null,null,j);}},_onUnsubscribe:function(h,g,f){var i=f._valuechange;f._handles&&f._handles.detach();if(i.delegated){i.getNodes().each(function(j){b._stopPolling(j,f);});}else{b._stopPolling(h,f);}}};a={detach:b._onUnsubscribe,on:b._onSubscribe,delegate:b._onSubscribe,detachDelegate:b._onUnsubscribe,publishConfig:{emitFacade:true}};e.Event.define("valuechange",a);e.Event.define("valueChange",a);e.ValueChange=b;},"3.6.0",{requires:["event-focus","event-synthetic"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("autocomplete-base",function(f){var g=f.Escape,j=f.Lang,q=f.Array,i=f.Object,d=j.isFunction,r=j.isString,u=j.trim,l=f.Attribute.INVALID_VALUE,o="_functionValidator",x="_sourceSuccess",c="allowBrowserAutocomplete",h="inputNode",w="query",e="queryDelimiter",b="requestTemplate",m="results",n="resultListLocator",k="value",s="valueChange",a="clear",t=w,p=m;function v(){}v.prototype={initializer:function(){f.before(this._bindUIACBase,this,"bindUI");f.before(this._syncUIACBase,this,"syncUI");this.publish(a,{defaultFn:this._defClearFn});this.publish(t,{defaultFn:this._defQueryFn});this.publish(p,{defaultFn:this._defResultsFn});},destructor:function(){this._acBaseEvents&&this._acBaseEvents.detach();delete this._acBaseEvents;delete this._cache;delete this._inputNode;delete this._rawSource;},clearCache:function(){this._cache&&(this._cache={});return this;},sendRequest:function(A,B){var y,z=this.get("source");if(A||A===""){this._set(w,A);}else{A=this.get(w)||"";}if(z){if(!B){B=this.get(b);}y=B?B.call(this,A):A;z.sendRequest({query:A,request:y,callback:{success:f.bind(this._onResponse,this,A)}});}return this;},_bindUIACBase:function(){var z=this.get(h),y=z&&z.tokenInput;if(y){z=y.get(h);this._set("tokenInput",y);}if(!z){f.error("No inputNode specified.");return;}this._inputNode=z;this._acBaseEvents=new f.EventHandle([z.on(s,this._onInputValueChange,this),z.on("blur",this._onInputBlur,this),this.after(c+"Change",this._syncBrowserAutocomplete),this.after("sourceTypeChange",this._afterSourceTypeChange),this.after(s,this._afterValueChange)]);},_syncUIACBase:function(){this._syncBrowserAutocomplete();this.set(k,this.get(h).get(k));},_createArraySource:function(z){var y=this;return{type:"array",sendRequest:function(A){y[x](z.concat(),A);}};},_createFunctionSource:function(z){var y=this;return{type:"function",sendRequest:function(A){var B;function C(D){y[x](D||[],A);}if((B=z(A.query,C))){C(B);}}};},_createObjectSource:function(z){var y=this;return{type:"object",sendRequest:function(A){var B=A.query;y[x](i.owns(z,B)?z[B]:[],A);}};},_functionValidator:function(y){return y===null||d(y);},_getObjectValue:function(B,A){if(!B){return;}for(var z=0,y=A.length;B&&z<y;z++){B=B[A[z]];}return B;},_parseResponse:function(A,y,P){var G={data:P,query:A,results:[]},I=this.get(n),H=[],F=y&&y.results,C,z,J,B,O,K,L,M,D,E,N;if(F&&I){F=I.call(this,F);}if(F&&F.length){C=this.get("resultFilters");N=this.get("resultTextLocator");for(K=0,L=F.length;K<L;++K){D=F[K];E=N?N.call(this,D):D.toString();H.push({display:g.html(E),raw:D,text:E});}for(K=0,L=C.length;K<L;++K){H=C[K].call(this,A,H.concat());if(!H){return;}if(!H.length){break;}}if(H.length){J=this.get("resultFormatter");O=this.get("resultHighlighter");M=this.get("maxResults");if(M&&M>0&&H.length>M){H.length=M;}if(O){B=O.call(this,A,H.concat());if(!B){return;}for(K=0,L=B.length;K<L;++K){D=H[K];D.highlighted=B[K];D.display=D.highlighted;}}if(J){z=J.call(this,A,H.concat());if(!z){return;}for(K=0,L=z.length;K<L;++K){H[K].display=z[K];}}}}G.results=H;this.fire(p,G);},_parseValue:function(y){var z=this.get(e);if(z){y=y.split(z);y=y[y.length-1];}return j.trimLeft(y);},_setEnableCache:function(y){this._cache=y?{}:null;},_setLocator:function(y){if(this[o](y)){return y;}var z=this;y=y.toString().split(".");return function(A){return A&&z._getObjectValue(A,y);};},_setRequestTemplate:function(y){if(this[o](y)){return y;}y=y.toString();return function(z){return j.sub(y,{query:encodeURIComponent(z)});};},_setResultFilters:function(A){var y,z;if(A===null){return[];}y=f.AutoCompleteFilters;z=function(B){if(d(B)){return B;}if(r(B)&&y&&d(y[B])){return y[B];}return false;};if(j.isArray(A)){A=q.map(A,z);return q.every(A,function(B){return !!B;})?A:l;}else{A=z(A);return A?[A]:l;}},_setResultHighlighter:function(y){var z;if(this[o](y)){return y;}z=f.AutoCompleteHighlighters;if(r(y)&&z&&d(z[y])){return z[y];}return l;},_setSource:function(A){var y=this.get("sourceType")||j.type(A),z;if((A&&d(A.sendRequest))||A===null||y==="datasource"){this._rawSource=A;return A;}if((z=v.SOURCE_TYPES[y])){this._rawSource=A;return j.isString(z)?this[z](A):z(A);}f.error("Unsupported source type '"+y+"'. Maybe autocomplete-sources isn't loaded?");return l;},_sourceSuccess:function(z,y){y.callback.success({data:z,response:{results:z}});},_syncBrowserAutocomplete:function(){var y=this.get(h);if(y.get("nodeName").toLowerCase()==="input"){y.setAttribute("autocomplete",this.get(c)?"on":"off");}},_updateValue:function(z){var B=this.get(e),A,y,C;z=j.trimLeft(z);if(B){A=u(B);C=q.map(u(this.get(k)).split(B),u);y=C.length;if(y>1){C[y-1]=z;z=C.join(A+" ");}z=z+A+" ";}this.set(k,z);},_afterSourceTypeChange:function(y){if(this._rawSource){this.set("source",this._rawSource);}},_afterValueChange:function(F){var B=F.newVal,z=this,E=F.src===v.UI_SRC,A,C,y,D;if(!E){z._inputNode.set(k,B);}y=z.get("minQueryLength");D=z._parseValue(B)||"";if(y>=0&&D.length>=y){if(E){A=z.get("queryDelay");C=function(){z.fire(t,{inputValue:B,query:D,src:F.src});};if(A){clearTimeout(z._delay);z._delay=setTimeout(C,A);}else{C();}}else{z._set(w,D);}}else{clearTimeout(z._delay);z.fire(a,{prevVal:F.prevVal?z._parseValue(F.prevVal):null,src:F.src});}},_onInputBlur:function(B){var C=this.get(e),y,z,A;if(C&&!this.get("allowTrailingDelimiter")){C=j.trimRight(C);A=z=this._inputNode.get(k);if(C){while((z=j.trimRight(z))&&(y=z.length-C.length)&&z.lastIndexOf(C)===y){z=z.substring(0,y);}}else{z=j.trimRight(z);}if(z!==A){this.set(k,z);}}},_onInputValueChange:function(z){var y=z.newVal;if(y!==this.get(k)){this.set(k,y,{src:v.UI_SRC});}},_onResponse:function(y,z){if(y===(this.get(w)||"")){this._parseResponse(y||"",z.response,z.data);}},_defClearFn:function(){this._set(w,null);this._set(m,[]);},_defQueryFn:function(y){this.sendRequest(y.query);},_defResultsFn:function(y){this._set(m,y[m]);}};v.ATTRS={allowBrowserAutocomplete:{value:false},allowTrailingDelimiter:{value:false},enableCache:{lazyAdd:false,setter:"_setEnableCache",value:true},inputNode:{setter:f.one,writeOnce:"initOnly"},maxResults:{value:0},minQueryLength:{value:1},query:{readOnly:true,value:null},queryDelay:{value:100},queryDelimiter:{value:null},requestTemplate:{setter:"_setRequestTemplate",value:null},resultFilters:{setter:"_setResultFilters",value:[]},resultFormatter:{validator:o,value:null},resultHighlighter:{setter:"_setResultHighlighter",value:null},resultListLocator:{setter:"_setLocator",value:null},results:{readOnly:true,value:[]},resultTextLocator:{setter:"_setLocator",value:null},source:{setter:"_setSource",value:null},sourceType:{value:null},tokenInput:{readOnly:true},value:{value:""}};
v._buildCfg={aggregates:["SOURCE_TYPES"],statics:["UI_SRC"]};v.SOURCE_TYPES={array:"_createArraySource","function":"_createFunctionSource",object:"_createObjectSource"};v.UI_SRC=(f.Widget&&f.Widget.UI_SRC)||"ui";f.AutoCompleteBase=v;},"3.6.0",{requires:["array-extras","base-build","escape","event-valuechange","node-base"],optional:["autocomplete-sources"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("autocomplete-sources",function(g){var a=g.AutoCompleteBase,f=g.Lang,b="_sourceSuccess",d="maxResults",e="requestTemplate",c="resultListLocator";g.mix(a.prototype,{_YQL_SOURCE_REGEX:/^(?:select|set|use)\s+/i,_beforeCreateObjectSource:function(h){if(h instanceof g.Node&&h.get("nodeName").toLowerCase()==="select"){return this._createSelectSource(h);}if(g.JSONPRequest&&h instanceof g.JSONPRequest){return this._createJSONPSource(h);}return this._createObjectSource(h);},_createIOSource:function(l){var j={type:"io"},k=this,n,i,m;function h(o){var p=o.request;if(k._cache&&p in k._cache){k[b](k._cache[p],o);return;}if(n&&n.isInProgress()){n.abort();}n=g.io(k._getXHRUrl(l,o),{on:{success:function(t,q){var s;try{s=g.JSON.parse(q.responseText);}catch(r){g.error("JSON parse error",r);}if(s){k._cache&&(k._cache[p]=s);k[b](s,o);}}}});}j.sendRequest=function(o){i=o;if(m){return;}m=true;g.use("io-base","json-parse",function(){j.sendRequest=h;h(i);});};return j;},_createJSONPSource:function(l){var j={type:"jsonp"},k=this,i,m;function h(n){var p=n.request,o=n.query;if(k._cache&&p in k._cache){k[b](k._cache[p],n);return;}l._config.on.success=function(q){k._cache&&(k._cache[p]=q);k[b](q,n);};l.send(o);}j.sendRequest=function(n){i=n;if(m){return;}m=true;g.use("jsonp",function(){if(!(l instanceof g.JSONPRequest)){l=new g.JSONPRequest(l,{format:g.bind(k._jsonpFormatter,k)});}j.sendRequest=h;h(i);});};return j;},_createSelectSource:function(i){var h=this;return{type:"select",sendRequest:function(k){var j=[];i.get("options").each(function(l){j.push({html:l.get("innerHTML"),index:l.get("index"),node:l,selected:l.get("selected"),text:l.get("text"),value:l.get("value")});});h[b](j,k);}};},_createStringSource:function(h){if(this._YQL_SOURCE_REGEX.test(h)){return this._createYQLSource(h);}else{if(h.indexOf("{callback}")!==-1){return this._createJSONPSource(h);}else{return this._createIOSource(h);}}},_createYQLSource:function(l){var k=this,m={type:"yql"},i,n,j;if(!k.get(c)){k.set(c,k._defaultYQLLocator);}function h(s){var t=s.query,q=k.get("yqlEnv"),o=k.get(d),u,r,p;p=f.sub(l,{maxResults:o>0?o:1000,request:s.request,query:t});if(k._cache&&p in k._cache){k[b](k._cache[p],s);return;}u=function(v){k._cache&&(k._cache[p]=v);k[b](v,s);};r={proto:k.get("yqlProtocol")};if(j){j._callback=u;j._opts=r;j._params.q=p;if(q){j._params.env=q;}}else{j=new g.YQLRequest(p,{on:{success:u},allowCache:false},q?{env:q}:null,r);}j.send();}m.sendRequest=function(o){i=o;if(!n){n=true;g.use("yql",function(){m.sendRequest=h;h(i);});}};return m;},_defaultYQLLocator:function(i){var j=i&&i.query&&i.query.results,h;if(j&&f.isObject(j)){h=g.Object.values(j)||[];j=h.length===1?h[0]:h;if(!f.isArray(j)){j=[j];}}else{j=[];}return j;},_getXHRUrl:function(i,j){var h=this.get(d);if(j.query!==j.request){i+=j.request;}return f.sub(i,{maxResults:h>0?h:1000,query:encodeURIComponent(j.query)});},_jsonpFormatter:function(i,j,k){var h=this.get(d),l=this.get(e);if(l){i+=l(k);}return f.sub(i,{callback:j,maxResults:h>0?h:1000,query:encodeURIComponent(k)});}});g.mix(a.ATTRS,{yqlEnv:{value:null},yqlProtocol:{value:"http"}});g.mix(a.SOURCE_TYPES,{io:"_createIOSource",jsonp:"_createJSONPSource",object:"_beforeCreateObjectSource",select:"_createSelectSource",string:"_createStringSource",yql:"_createYQLSource"},true);},"3.6.0",{requires:["autocomplete-base"],optional:["io-base","json-parse","jsonp","yql"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("lang/autocomplete-list_en",function(a){a.Intl.add("autocomplete-list","en",{item_selected:"{item} selected.",items_available:"Suggestions are available. Use up and down arrows to select."});},"3.6.0");/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("event-resize",function(a){a.Event.define("windowresize",{on:(a.UA.gecko&&a.UA.gecko<1.91)?function(d,b,c){b._handle=a.Event.attach("resize",function(f){c.fire(f);});}:function(e,c,d){var b=a.config.windowResizeDelay||100;c._handle=a.Event.attach("resize",function(f){if(c._timer){c._timer.cancel();}c._timer=a.later(b,a,function(){d.fire(f);});});},detach:function(c,b){if(b._timer){b._timer.cancel();}b._handle.detach();}});},"3.6.0",{requires:["event-synthetic"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("selector-css2",function(g){var h="parentNode",d="tagName",e="attributes",a="combinator",f="pseudos",c=g.Selector,b={_reRegExpTokens:/([\^\$\?\[\]\*\+\-\.\(\)\|\\])/,SORT_RESULTS:true,_isXML:(function(){var i=(g.config.doc.createElement("div").tagName!=="DIV");return i;}()),shorthand:{"\\#(-?[_a-z0-9]+[-\\w\\uE000]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w\\uE000]*)":"[className~=$1]"},operators:{"":function(j,i){return g.DOM.getAttribute(j,i)!=="";},"~=":"(?:^|\\s+){val}(?:\\s+|$)","|=":"^{val}-?"},pseudos:{"first-child":function(i){return g.DOM._children(i[h])[0]===i;}},_bruteQuery:function(n,r,t){var o=[],i=[],q=c._tokenize(n),m=q[q.length-1],s=g.DOM._getDoc(r),k,j,p,l;if(m){j=m.id;p=m.className;l=m.tagName||"*";if(r.getElementsByTagName){if(j&&(r.all||(r.nodeType===9||g.DOM.inDoc(r)))){i=g.DOM.allById(j,r);}else{if(p){i=r.getElementsByClassName(p);}else{i=r.getElementsByTagName(l);}}}else{k=r.firstChild;while(k){if(k.tagName&&(l==="*"||k.tagName===l)){i.push(k);}k=k.nextSibling||k.firstChild;}}if(i.length){o=c._filterNodes(i,q,t);}}return o;},_filterNodes:function(u,q,s){var z=0,y,A=q.length,t=A-1,p=[],w=u[0],D=w,B=g.Selector.getters,o,x,m,r,k,v,l,C;for(z=0;(D=w=u[z++]);){t=A-1;r=null;testLoop:while(D&&D.tagName){m=q[t];l=m.tests;y=l.length;if(y&&!k){while((C=l[--y])){o=C[1];if(B[C[0]]){v=B[C[0]](D,C[0]);}else{v=D[C[0]];if(C[0]==="tagName"&&!c._isXML){v=v.toUpperCase();}if(typeof v!="string"&&v!==undefined&&v.toString){v=v.toString();}else{if(v===undefined&&D.getAttribute){v=D.getAttribute(C[0],2);}}}if((o==="="&&v!==C[2])||(typeof o!=="string"&&o.test&&!o.test(v))||(!o.test&&typeof o==="function"&&!o(D,C[0],C[2]))){if((D=D[r])){while(D&&(!D.tagName||(m.tagName&&m.tagName!==D.tagName))){D=D[r];}}continue testLoop;}}}t--;if(!k&&(x=m.combinator)){r=x.axis;D=D[r];while(D&&!D.tagName){D=D[r];}if(x.direct){r=null;}}else{p.push(w);if(s){return p;}break;}}}w=D=null;return p;},combinators:{" ":{axis:"parentNode"},">":{axis:"parentNode",direct:true},"+":{axis:"previousSibling",direct:true}},_parsers:[{name:e,re:/^\uE003(-?[a-z]+[\w\-]*)+([~\|\^\$\*!=]=?)?['"]?([^\uE004'"]*)['"]?\uE004/i,fn:function(l,m){var k=l[2]||"",i=c.operators,j=(l[3])?l[3].replace(/\\/g,""):"",n;if((l[1]==="id"&&k==="=")||(l[1]==="className"&&g.config.doc.documentElement.getElementsByClassName&&(k==="~="||k==="="))){m.prefilter=l[1];l[3]=j;m[l[1]]=(l[1]==="id")?l[3]:j;}if(k in i){n=i[k];if(typeof n==="string"){l[3]=j.replace(c._reRegExpTokens,"\\$1");n=new RegExp(n.replace("{val}",l[3]));}l[2]=n;}if(!m.last||m.prefilter!==l[1]){return l.slice(1);}}},{name:d,re:/^((?:-?[_a-z]+[\w-]*)|\*)/i,fn:function(j,k){var i=j[1];if(!c._isXML){i=i.toUpperCase();}k.tagName=i;if(i!=="*"&&(!k.last||k.prefilter)){return[d,"=",i];}if(!k.prefilter){k.prefilter="tagName";}}},{name:a,re:/^\s*([>+~]|\s)\s*/,fn:function(i,j){}},{name:f,re:/^:([\-\w]+)(?:\uE005['"]?([^\uE005]*)['"]?\uE006)*/i,fn:function(i,j){var k=c[f][i[1]];if(k){if(i[2]){i[2]=i[2].replace(/\\/g,"");}return[i[2],k];}else{return false;}}}],_getToken:function(i){return{tagName:null,id:null,className:null,attributes:{},combinator:null,tests:[]};},_tokenize:function(l){l=l||"";l=c._parseSelector(g.Lang.trim(l));var k=c._getToken(),q=l,p=[],r=false,n,o,m,j;outer:do{r=false;for(m=0;(j=c._parsers[m++]);){if((n=j.re.exec(l))){if(j.name!==a){k.selector=l;}l=l.replace(n[0],"");if(!l.length){k.last=true;}if(c._attrFilters[n[1]]){n[1]=c._attrFilters[n[1]];}o=j.fn(n,k);if(o===false){r=false;break outer;}else{if(o){k.tests.push(o);}}if(!l.length||j.name===a){p.push(k);k=c._getToken(k);if(j.name===a){k.combinator=g.Selector.combinators[n[1]];}}r=true;}}}while(r&&l.length);if(!r||l.length){p=[];}return p;},_replaceMarkers:function(i){i=i.replace(/\[/g,"\uE003");i=i.replace(/\]/g,"\uE004");i=i.replace(/\(/g,"\uE005");i=i.replace(/\)/g,"\uE006");return i;},_replaceShorthand:function(i){var j=g.Selector.shorthand,k;for(k in j){if(j.hasOwnProperty(k)){i=i.replace(new RegExp(k,"gi"),j[k]);}}return i;},_parseSelector:function(i){var j=g.Selector._replaceSelector(i),i=j.selector;i=g.Selector._replaceShorthand(i);i=g.Selector._restore("attr",i,j.attrs);i=g.Selector._restore("pseudo",i,j.pseudos);i=g.Selector._replaceMarkers(i);i=g.Selector._restore("esc",i,j.esc);return i;},_attrFilters:{"class":"className","for":"htmlFor"},getters:{href:function(j,i){return g.DOM.getAttribute(j,i);},id:function(j,i){return g.DOM.getId(j);}}};g.mix(g.Selector,b,true);g.Selector.getters.src=g.Selector.getters.rel=g.Selector.getters.href;if(g.Selector.useNative&&g.config.doc.querySelector){g.Selector.shorthand["\\.(-?[_a-z]+[-\\w]*)"]="[class~=$1]";}},"3.6.0",{requires:["selector-native"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("selector-css3",function(a){a.Selector._reNth=/^(?:([\-]?\d*)(n){1}|(odd|even)$)*([\-+]?\d*)$/;a.Selector._getNth=function(d,o,q,h){a.Selector._reNth.test(o);var m=parseInt(RegExp.$1,10),c=RegExp.$2,j=RegExp.$3,k=parseInt(RegExp.$4,10)||0,p=[],l=a.DOM._children(d.parentNode,q),f;if(j){m=2;f="+";c="n";k=(j==="odd")?1:0;}else{if(isNaN(m)){m=(c)?1:0;}}if(m===0){if(h){k=l.length-k+1;}if(l[k-1]===d){return true;}else{return false;}}else{if(m<0){h=!!h;m=Math.abs(m);}}if(!h){for(var e=k-1,g=l.length;e<g;e+=m){if(e>=0&&l[e]===d){return true;}}}else{for(var e=l.length-k,g=l.length;e>=0;e-=m){if(e<g&&l[e]===d){return true;}}}return false;};a.mix(a.Selector.pseudos,{"root":function(b){return b===b.ownerDocument.documentElement;},"nth-child":function(b,c){return a.Selector._getNth(b,c);},"nth-last-child":function(b,c){return a.Selector._getNth(b,c,null,true);},"nth-of-type":function(b,c){return a.Selector._getNth(b,c,b.tagName);},"nth-last-of-type":function(b,c){return a.Selector._getNth(b,c,b.tagName,true);},"last-child":function(c){var b=a.DOM._children(c.parentNode);return b[b.length-1]===c;},"first-of-type":function(b){return a.DOM._children(b.parentNode,b.tagName)[0]===b;},"last-of-type":function(c){var b=a.DOM._children(c.parentNode,c.tagName);return b[b.length-1]===c;},"only-child":function(c){var b=a.DOM._children(c.parentNode);return b.length===1&&b[0]===c;},"only-of-type":function(c){var b=a.DOM._children(c.parentNode,c.tagName);return b.length===1&&b[0]===c;},"empty":function(b){return b.childNodes.length===0;},"not":function(b,c){return !a.Selector.test(b,c);},"contains":function(b,c){var d=b.innerText||b.textContent||"";return d.indexOf(c)>-1;},"checked":function(b){return(b.checked===true||b.selected===true);},enabled:function(b){return(b.disabled!==undefined&&!b.disabled);},disabled:function(b){return(b.disabled);}});a.mix(a.Selector.operators,{"^=":"^{val}","$=":"{val}$","*=":"{val}"});a.Selector.combinators["~"]={axis:"previousSibling"};},"3.6.0",{requires:["selector-native","selector-css2"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("shim-plugin",function(b){function a(c){this.init(c);}a.CLASS_NAME="yui-node-shim";a.TEMPLATE='<iframe class="'+a.CLASS_NAME+'" frameborder="0" title="Node Stacking Shim"'+'src="javascript:false" tabindex="-1" role="presentation"'+'style="position:absolute; z-index:-1;"></iframe>';a.prototype={init:function(c){this._host=c.host;this.initEvents();this.insert();this.sync();},initEvents:function(){this._resizeHandle=this._host.on("resize",this.sync,this);},getShim:function(){return this._shim||(this._shim=b.Node.create(a.TEMPLATE,this._host.get("ownerDocument")));},insert:function(){var c=this._host;this._shim=c.insertBefore(this.getShim(),c.get("firstChild"));},sync:function(){var d=this._shim,c=this._host;if(d){d.setAttrs({width:c.getStyle("width"),height:c.getStyle("height")});}},destroy:function(){var c=this._shim;if(c){c.remove(true);}this._resizeHandle.detach();}};a.NAME="Shim";a.NS="shim";b.namespace("Plugin");b.Plugin.Shim=a;},"3.6.0",{requires:["node-style","node-pluginhost"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-position",function(a){var i=a.Lang,l=a.Widget,n="xy",j="position",g="positioned",k="boundingBox",h="relative",m="renderUI",f="bindUI",d="syncUI",c=l.UI_SRC,e="xyChange";function b(o){this._posNode=this.get(k);a.after(this._renderUIPosition,this,m);a.after(this._syncUIPosition,this,d);a.after(this._bindUIPosition,this,f);}b.ATTRS={x:{setter:function(o){this._setX(o);},getter:function(){return this._getX();},lazyAdd:false},y:{setter:function(o){this._setY(o);},getter:function(){return this._getY();},lazyAdd:false},xy:{value:[0,0],validator:function(o){return this._validateXY(o);}}};b.POSITIONED_CLASS_NAME=l.getClassName(g);b.prototype={_renderUIPosition:function(){this._posNode.addClass(b.POSITIONED_CLASS_NAME);},_syncUIPosition:function(){var o=this._posNode;if(o.getStyle(j)===h){this.syncXY();}this._uiSetXY(this.get(n));},_bindUIPosition:function(){this.after(e,this._afterXYChange);},move:function(){var o=arguments,p=(i.isArray(o[0]))?o[0]:[o[0],o[1]];this.set(n,p);},syncXY:function(){this.set(n,this._posNode.getXY(),{src:c});},_validateXY:function(o){return(i.isArray(o)&&i.isNumber(o[0])&&i.isNumber(o[1]));},_setX:function(o){this.set(n,[o,this.get(n)[1]]);},_setY:function(o){this.set(n,[this.get(n)[0],o]);},_getX:function(){return this.get(n)[0];},_getY:function(){return this.get(n)[1];},_afterXYChange:function(o){if(o.src!=c){this._uiSetXY(o.newVal);}},_uiSetXY:function(o){this._posNode.setXY(o);}};a.WidgetPosition=b;},"3.6.0",{requires:["base-build","node-screen","widget"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("widget-position-align",function(a){var f=a.Lang,d="align",b="alignOn",g="visible",i="boundingBox",e="offsetWidth",j="offsetHeight",h="region",k="viewportRegion";function c(l){if(!this._posNode){a.error("WidgetPosition needs to be added to the Widget, "+"before WidgetPositionAlign is added");}a.after(this._bindUIPosAlign,this,"bindUI");a.after(this._syncUIPosAlign,this,"syncUI");}c.ATTRS={align:{value:null},centered:{setter:"_setAlignCenter",lazyAdd:false,value:false},alignOn:{value:[],validator:a.Lang.isArray}};c.TL="tl";c.TR="tr";c.BL="bl";c.BR="br";c.TC="tc";c.RC="rc";c.BC="bc";c.LC="lc";c.CC="cc";c.prototype={_posAlignUIHandles:null,destructor:function(){this._detachPosAlignUIHandles();},_bindUIPosAlign:function(){this.after("alignChange",this._afterAlignChange);this.after("alignOnChange",this._afterAlignOnChange);this.after("visibleChange",this._syncUIPosAlign);},_syncUIPosAlign:function(){var l=this.get(d);this._uiSetVisiblePosAlign(this.get(g));if(l){this._uiSetAlign(l.node,l.points);}},align:function(m,l){if(arguments.length){this.set(d,{node:m,points:l});}else{this._syncUIPosAlign();}return this;},centered:function(l){return this.align(l,[c.CC,c.CC]);},_setAlignCenter:function(l){if(l){this.set(d,{node:l===true?null:l,points:[c.CC,c.CC]});}return l;},_uiSetAlign:function(o,n){if(!f.isArray(n)||n.length!==2){a.error("align: Invalid Points Arguments");return;}var m=this._getRegion(o),l,p,q;if(!m){return;}l=n[0];p=n[1];switch(p){case c.TL:q=[m.left,m.top];break;case c.TR:q=[m.right,m.top];break;case c.BL:q=[m.left,m.bottom];break;case c.BR:q=[m.right,m.bottom];break;case c.TC:q=[m.left+Math.floor(m.width/2),m.top];break;case c.BC:q=[m.left+Math.floor(m.width/2),m.bottom];break;case c.LC:q=[m.left,m.top+Math.floor(m.height/2)];break;case c.RC:q=[m.right,m.top+Math.floor(m.height/2)];break;case c.CC:q=[m.left+Math.floor(m.width/2),m.top+Math.floor(m.height/2)];break;default:break;}if(q){this._doAlign(l,q[0],q[1]);}},_uiSetVisiblePosAlign:function(l){if(l){this._attachPosAlignUIHandles();}else{this._detachPosAlignUIHandles();}},_attachPosAlignUIHandles:function(){if(this._posAlignUIHandles){return;}var n=this.get(i),m=a.bind(this._syncUIPosAlign,this),l=[];a.Array.each(this.get(b),function(r){var q=r.eventName,p=a.one(r.node)||n;if(q){l.push(p.on(q,m));}});this._posAlignUIHandles=l;},_detachPosAlignUIHandles:function(){var l=this._posAlignUIHandles;if(l){new a.EventHandle(l).detach();this._posAlignUIHandles=null;}},_doAlign:function(m,l,p){var o=this._posNode,n;switch(m){case c.TL:n=[l,p];break;case c.TR:n=[l-o.get(e),p];break;case c.BL:n=[l,p-o.get(j)];break;case c.BR:n=[l-o.get(e),p-o.get(j)];break;case c.TC:n=[l-(o.get(e)/2),p];break;case c.BC:n=[l-(o.get(e)/2),p-o.get(j)];break;case c.LC:n=[l,p-(o.get(j)/2)];break;case c.RC:n=[l-o.get(e),p-(o.get(j)/2)];break;case c.CC:n=[l-(o.get(e)/2),p-(o.get(j)/2)];break;default:break;}if(n){this.move(n);}},_getRegion:function(m){var l;if(!m){l=this._posNode.get(k);}else{m=a.Node.one(m);if(m){l=m.get(h);}}return l;},_afterAlignChange:function(l){var m=l.newVal;if(m){this._uiSetAlign(m.node,m.points);}},_afterAlignOnChange:function(l){this._detachPosAlignUIHandles();if(this.get(g)){this._attachPosAlignUIHandles();}}};a.WidgetPositionAlign=c;},"3.6.0",{requires:["widget-position"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("autocomplete-list",function(b){var i=b.Lang,v=b.Node,l=b.Array,h=b.UA.ie&&b.UA.ie<7,p=9,s="_CLASS_ITEM",t="_CLASS_ITEM_ACTIVE",d="_CLASS_ITEM_HOVER",u="_SELECTOR_ITEM",f="activeItem",k="alwaysShowList",o="circular",r="hoveredItem",m="id",e="item",c="list",w="result",j="results",q="visible",g="width",n="select",a=b.Base.create("autocompleteList",b.Widget,[b.AutoCompleteBase,b.WidgetPosition,b.WidgetPositionAlign],{ARIA_TEMPLATE:"<div/>",ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",UI_EVENTS:(function(){var x=b.merge(b.Node.DOM_EVENTS);delete x.valuechange;delete x.valueChange;return x;}()),initializer:function(){var x=this.get("inputNode");if(!x){b.error("No inputNode specified.");return;}this._inputNode=x;this._listEvents=[];this.DEF_PARENT_NODE=x.get("parentNode");this[s]=this.getClassName(e);this[t]=this.getClassName(e,"active");this[d]=this.getClassName(e,"hover");this[u]="."+this[s];this.publish(n,{defaultFn:this._defSelectFn});},destructor:function(){while(this._listEvents.length){this._listEvents.pop().detach();}if(this._ariaNode){this._ariaNode.remove().destroy(true);}},bindUI:function(){this._bindInput();this._bindList();},renderUI:function(){var C=this._createAriaNode(),z=this.get("boundingBox"),y=this.get("contentBox"),B=this._inputNode,A=this._createListNode(),x=B.get("parentNode");B.addClass(this.getClassName("input")).setAttrs({"aria-autocomplete":c,"aria-expanded":false,"aria-owns":A.get("id")});x.append(C);if(h){z.plug(b.Plugin.Shim);}z.setStyle("position","absolute");this._ariaNode=C;this._boundingBox=z;this._contentBox=y;this._listNode=A;this._parentNode=x;},syncUI:function(){this._syncResults();this._syncVisibility();},hide:function(){return this.get(k)?this:this.set(q,false);},selectItem:function(y,x){if(y){if(!y.hasClass(this[s])){return this;}}else{y=this.get(f);if(!y){return this;}}this.fire(n,{itemNode:y,originEvent:x||null,result:y.getData(w)});return this;},_activateNextItem:function(){var y=this.get(f),x;if(y){x=y.next(this[u])||(this.get(o)?null:y);}else{x=this._getFirstItemNode();}this.set(f,x);return this;},_activatePrevItem:function(){var y=this.get(f),x=y?y.previous(this[u]):this.get(o)&&this._getLastItemNode();this.set(f,x||null);return this;},_add:function(x){var y=[];l.each(i.isArray(x)?x:[x],function(z){y.push(this._createItemNode(z).setData(w,z));},this);y=b.all(y);this._listNode.append(y.toFrag());return y;},_ariaSay:function(z,x){var y=this.get("strings."+z);this._ariaNode.set("text",x?i.sub(y,x):y);},_bindInput:function(){var A=this._inputNode,y,z,x;if(this.get("align")===null){x=this.get("tokenInput");y=(x&&x.get("boundingBox"))||A;this.set("align",{node:y,points:["tl","bl"]});if(!this.get(g)&&(z=y.get("offsetWidth"))){this.set(g,z);}}this._listEvents=this._listEvents.concat([A.after("blur",this._afterListInputBlur,this),A.after("focus",this._afterListInputFocus,this)]);},_bindList:function(){this._listEvents=this._listEvents.concat([b.one("doc").after("click",this._afterDocClick,this),b.one("win").after("windowresize",this._syncPosition,this),this.after({mouseover:this._afterMouseOver,mouseout:this._afterMouseOut,activeItemChange:this._afterActiveItemChange,alwaysShowListChange:this._afterAlwaysShowListChange,hoveredItemChange:this._afterHoveredItemChange,resultsChange:this._afterResultsChange,visibleChange:this._afterVisibleChange}),this._listNode.delegate("click",this._onItemClick,this[u],this)]);},_clear:function(){this.set(f,null);this._set(r,null);this._listNode.get("children").remove(true);},_createAriaNode:function(){var x=v.create(this.ARIA_TEMPLATE);return x.addClass(this.getClassName("aria")).setAttrs({"aria-live":"polite",role:"status"});},_createItemNode:function(x){var y=v.create(this.ITEM_TEMPLATE);return y.addClass(this[s]).setAttrs({id:b.stamp(y),role:"option"}).setAttribute("data-text",x.text).append(x.display);},_createListNode:function(){var x=this.get("listNode")||v.create(this.LIST_TEMPLATE);x.addClass(this.getClassName(c)).setAttrs({id:b.stamp(x),role:"listbox"});this._set("listNode",x);this.get("contentBox").append(x);return x;},_getFirstItemNode:function(){return this._listNode.one(this[u]);},_getLastItemNode:function(){return this._listNode.one(this[u]+":last-child");},_syncPosition:function(){this._syncUIPosAlign();this._syncShim();},_syncResults:function(x){if(!x){x=this.get(j);}this._clear();if(x.length){this._add(x);this._ariaSay("items_available");}this._syncPosition();if(this.get("activateFirstItem")&&!this.get(f)){this.set(f,this._getFirstItemNode());}},_syncShim:h?function(){var x=this._boundingBox.shim;if(x){x.sync();}}:function(){},_syncVisibility:function(x){if(this.get(k)){x=true;this.set(q,x);}if(typeof x==="undefined"){x=this.get(q);}this._inputNode.set("aria-expanded",x);this._boundingBox.set("aria-hidden",!x);if(x){this._syncPosition();}else{this.set(f,null);this._set(r,null);this._boundingBox.get("offsetWidth");}if(b.UA.ie===7){b.one("body").addClass("yui3-ie7-sucks").removeClass("yui3-ie7-sucks");}},_afterActiveItemChange:function(A){var z=this._inputNode,x=A.newVal,B=A.prevVal,y;if(B&&B._node){B.removeClass(this[t]);}if(x){x.addClass(this[t]);z.set("aria-activedescendant",x.get(m));}else{z.removeAttribute("aria-activedescendant");}if(this.get("scrollIntoView")){y=x||z;if(!y.inRegion(b.DOM.viewportRegion(),true)||!y.inRegion(this._contentBox,true)){y.scrollIntoView();}}},_afterAlwaysShowListChange:function(x){this.set(q,x.newVal||this.get(j).length>0);},_afterDocClick:function(z){var x=this._boundingBox,y=z.target;if(y!==this._inputNode&&y!==x&&y.ancestor("#"+x.get("id"),true)){this.hide();}},_afterHoveredItemChange:function(y){var x=y.newVal,z=y.prevVal;if(z){z.removeClass(this[d]);}if(x){x.addClass(this[d]);}},_afterListInputBlur:function(){this._listInputFocused=false;if(this.get(q)&&!this._mouseOverList&&(this._lastInputKey!==p||!this.get("tabSelect")||!this.get(f))){this.hide();}},_afterListInputFocus:function(){this._listInputFocused=true;},_afterMouseOver:function(x){var y=x.domEvent.target.ancestor(this[u],true);
this._mouseOverList=true;if(y){this._set(r,y);}},_afterMouseOut:function(){this._mouseOverList=false;this._set(r,null);},_afterResultsChange:function(x){this._syncResults(x.newVal);if(!this.get(k)){this.set(q,!!x.newVal.length);}},_afterVisibleChange:function(x){this._syncVisibility(!!x.newVal);},_onItemClick:function(x){var y=x.currentTarget;this.set(f,y);this.selectItem(y,x);},_defSelectFn:function(x){var y=x.result.text;this._inputNode.focus();this._updateValue(y);this._ariaSay("item_selected",{item:y});this.hide();}},{ATTRS:{activateFirstItem:{value:false},activeItem:{setter:b.one,value:null},alwaysShowList:{value:false},circular:{value:true},hoveredItem:{readOnly:true,value:null},listNode:{writeOnce:"initOnly",value:null},scrollIntoView:{value:false},strings:{valueFn:function(){return b.Intl.get("autocomplete-list");}},tabSelect:{value:true},visible:{value:false}},CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});b.AutoCompleteList=a;b.AutoComplete=a;},"3.6.0",{lang:["en"],after:["autocomplete-sources"],skinnable:true,requires:["autocomplete-base","event-resize","node-screen","selector-css3","shim-plugin","widget","widget-position","widget-position-align"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("autocomplete-list-keys",function(g){var c=40,a=13,d=27,f=9,b=38;function e(){g.before(this._bindKeys,this,"bindUI");this._initKeys();}e.prototype={_initKeys:function(){var h={},i={};h[c]=this._keyDown;i[a]=this._keyEnter;i[d]=this._keyEsc;i[f]=this._keyTab;i[b]=this._keyUp;this._keys=h;this._keysVisible=i;},destructor:function(){this._unbindKeys();},_bindKeys:function(){this._keyEvents=this._inputNode.on("keydown",this._onInputKey,this);},_unbindKeys:function(){this._keyEvents&&this._keyEvents.detach();this._keyEvents=null;},_keyDown:function(){if(this.get("visible")){this._activateNextItem();}else{this.show();}},_keyEnter:function(i){var h=this.get("activeItem");if(h){this.selectItem(h,i);}else{return false;}},_keyEsc:function(){this.hide();},_keyTab:function(i){var h;if(this.get("tabSelect")){h=this.get("activeItem");if(h){this.selectItem(h,i);return true;}}return false;},_keyUp:function(){this._activatePrevItem();},_onInputKey:function(j){var h,i=j.keyCode;this._lastInputKey=i;if(this.get("results").length){h=this._keys[i];if(!h&&this.get("visible")){h=this._keysVisible[i];}if(h){if(h.call(this,j)!==false){j.preventDefault();}}}}};g.Base.mix(g.AutoCompleteList,[e]);},"3.6.0",{requires:["autocomplete-list","base-build"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("autocomplete-plugin",function(b){var a=b.Plugin;function c(d){d.inputNode=d.host;if(!d.render&&d.render!==false){d.render=true;}c.superclass.constructor.apply(this,arguments);}b.extend(c,b.AutoCompleteList,{},{NAME:"autocompleteListPlugin",NS:"ac",CSS_PREFIX:b.ClassNameManager.getClassName("aclist")});a.AutoComplete=c;a.AutoCompleteList=c;},"3.6.0",{requires:["autocomplete-list","node-pluginhost"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("text-data-wordbreak",function(a){a.namespace("Text.Data").WordBreak={aletter:"[A-Za-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F3\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1A00-\u1A16\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BC0-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u24B6-\u24E9\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u303B\u303C\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790\uA791\uA7A0-\uA7A9\uA7FA-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]",midnumlet:"['\\.\u2018\u2019\u2024\uFE52\uFF07\uFF0E]",midletter:"[:\u00B7\u00B7\u05F4\u2027\uFE13\uFE55\uFF1A]",midnum:"[,;;\u0589\u060C\u060D\u066C\u07F8\u2044\uFE10\uFE14\uFE50\uFE54\uFF0C\uFF1B]",numeric:"[0-9\u0660-\u0669\u066B\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9]",cr:"\\r",lf:"\\n",newline:"[\u000B\u000C\u0085\u2028\u2029]",extend:"[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2\u1DC0-\u1DE6\u1DFC-\u1DFF\u200C\u200D\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26\uFF9E\uFF9F]",format:"[\u00AD\u0600-\u0603\u06DD\u070F\u17B4\u17B5\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]",katakana:"[\u3031-\u3035\u309B\u309C\u30A0-\u30FA\u30FC-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\uFF66-\uFF9D]",extendnumlet:"[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]",punctuation:"[!-#%-*,-\\/:;?@\\[-\\]_{}\u00A1\u00AB\u00B7\u00BB\u00BF;\u00B7\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1361-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u3008\u3009\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30\u2E31\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]"};
},"3.6.0",{requires:["yui-base"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("text-wordbreak",function(d){var n=d.Text,k=n.Data.WordBreak,g=0,e=1,l=2,s=3,q=4,c=5,i=6,m=7,t=8,o=9,r=10,f=11,p=12,h=[new RegExp(k.aletter),new RegExp(k.midnumlet),new RegExp(k.midletter),new RegExp(k.midnum),new RegExp(k.numeric),new RegExp(k.cr),new RegExp(k.lf),new RegExp(k.newline),new RegExp(k.extend),new RegExp(k.format),new RegExp(k.katakana),new RegExp(k.extendnumlet)],b="",a=new RegExp("^"+k.punctuation+"$"),u=/\s/,j={getWords:function(A,E){var z=0,v=j._classify(A),B=v.length,w=[],C=[],y,D,x;if(!E){E={};}if(E.ignoreCase){A=A.toLowerCase();}D=E.includePunctuation;x=E.includeWhitespace;for(;z<B;++z){y=A.charAt(z);w.push(y);if(j._isWordBoundary(v,z)){w=w.join(b);if(w&&(x||!u.test(w))&&(D||!a.test(w))){C.push(w);}w=[];}}return C;},getUniqueWords:function(w,v){return d.Array.unique(j.getWords(w,v));},isWordBoundary:function(w,v){return j._isWordBoundary(j._classify(w),v);},_classify:function(A){var x,w=[],z=0,y,C,v=A.length,D=h.length,B;for(;z<v;++z){x=A.charAt(z);B=p;for(y=0;y<D;++y){C=h[y];if(C&&C.test(x)){B=y;break;}}w.push(B);}return w;},_isWordBoundary:function(z,w){var v,x=z[w],A=z[w+1],y;if(w<0||(w>z.length-1&&w!==0)){return false;}if(x===g&&A===g){return false;}y=z[w+2];if(x===g&&(A===l||A===e)&&y===g){return false;}v=z[w-1];if((x===l||x===e)&&A===g&&v===g){return false;}if((x===q||x===g)&&(A===q||A===g)){return false;}if((x===s||x===e)&&A===q&&v===q){return false;}if(x===q&&(A===s||A===e)&&y===q){return false;}if(x===t||x===o||v===t||v===o||A===t||A===o){return false;}if(x===c&&A===i){return false;}if(x===m||x===c||x===i){return true;}if(A===m||A===c||A===i){return true;}if(x===r&&A===r){return false;}if(A===f&&(x===g||x===q||x===r||x===f)){return false;}if(x===f&&(A===g||A===q||A===r)){return false;}return true;}};n.WordBreak=j;},"3.6.0",{requires:["array-extras","text-data-wordbreak"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("autocomplete-filters",function(d){var c=d.Array,e=d.Object,a=d.Text.WordBreak,b=d.mix(d.namespace("AutoCompleteFilters"),{charMatch:function(i,h,f){if(!i){return h;}var g=c.unique((f?i:i.toLowerCase()).split(""));return c.filter(h,function(j){j=j.text;if(!f){j=j.toLowerCase();}return c.every(g,function(k){return j.indexOf(k)!==-1;});});},charMatchCase:function(g,f){return b.charMatch(g,f,true);},phraseMatch:function(h,g,f){if(!h){return g;}if(!f){h=h.toLowerCase();}return c.filter(g,function(i){return(f?i.text:i.text.toLowerCase()).indexOf(h)!==-1;});},phraseMatchCase:function(g,f){return b.phraseMatch(g,f,true);},startsWith:function(h,g,f){if(!h){return g;}if(!f){h=h.toLowerCase();}return c.filter(g,function(i){return(f?i.text:i.text.toLowerCase()).indexOf(h)===0;});},startsWithCase:function(g,f){return b.startsWith(g,f,true);},subWordMatch:function(i,g,f){if(!i){return g;}var h=a.getUniqueWords(i,{ignoreCase:!f});return c.filter(g,function(j){var k=f?j.text:j.text.toLowerCase();return c.every(h,function(l){return k.indexOf(l)!==-1;});});},subWordMatchCase:function(g,f){return b.subWordMatch(g,f,true);},wordMatch:function(j,h,f){if(!j){return h;}var g={ignoreCase:!f},i=a.getUniqueWords(j,g);return c.filter(h,function(k){var l=c.hash(a.getUniqueWords(k.text,g));return c.every(i,function(m){return e.owns(l,m);});});},wordMatchCase:function(g,f){return b.wordMatch(g,f,true);}});},"3.6.0",{requires:["array-extras","text-wordbreak"]});/*
YUI 3.6.0 (build 5521)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("datasource-local",function(c){var b=c.Lang,a=function(){a.superclass.constructor.apply(this,arguments);};c.mix(a,{NAME:"dataSourceLocal",ATTRS:{source:{value:null}},_tId:0,transactions:{},issueCallback:function(h,d){var f=h.on||h.callback,i=f&&f.success,g=h.details[0];g.error=(h.error||h.response.error);if(g.error){d.fire("error",g);i=f&&f.failure;}if(i){i(g);}}});c.extend(a,c.Base,{initializer:function(d){this._initEvents();},_initEvents:function(){this.publish("request",{defaultFn:c.bind("_defRequestFn",this),queuable:true});this.publish("data",{defaultFn:c.bind("_defDataFn",this),queuable:true});this.publish("response",{defaultFn:c.bind("_defResponseFn",this),queuable:true});},_defRequestFn:function(g){var d=this.get("source"),f=g.details[0];if(b.isUndefined(d)){f.error=new Error("Local source undefined");}f.data=d;this.fire("data",f);},_defDataFn:function(i){var f=i.data,h=i.meta,d={results:(b.isArray(f))?f:[f],meta:(h)?h:{}},g=i.details[0];g.response=d;this.fire("response",g);},_defResponseFn:function(d){a.issueCallback(d,this);},sendRequest:function(e){var f=a._tId++,d;e=e||{};d=e.on||e.callback;this.fire("request",{tId:f,request:e.request,on:d,callback:d,cfg:e.cfg||{}});return f;}});c.namespace("DataSource").Local=a;},"3.6.0",{requires:["base"]});
YUI.add("bacon-advice", function (Y) {
Y.log("Adding bacon module bacon-advice", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


var FADE_DURATION            = 0.3, //seconds
    AUTO_DISMISS_LONG_DELAY  =  15, //seconds
    AUTO_DISMISS_SHORT_DELAY = 7.5; //seconds

var Advice = Y.Base.create("advice", Y.Widget, [], {
  initializer: function () {
    this.after('visibleChange', function(ev) {
      (ev.newVal == true) ? this.appear() : this.dismiss();
    }, this);
  },
  renderUI: function (cb) {
    var src = this.get('src');
    
    if (src) {
      return BACON.QuorusIo.io(src, {
        on: {
          success: function (resp) {
            this.get('contentBox').setContent(resp.get('responseText'));
            if (cb) cb();
          }
        },
        context: this
      });
    }
  },
  syncUI: function () {
    if (this.get('visible')) {
      this.setDismissTimer();
    } else {
      this.get('boundingBox').setStyle('opacity', 0);
    }
  },
  appear: function () {
    var advice = this;
    
    advice.clearDismissTimer();
    
    function afterFade() {
      advice.setDismissTimer();
    }
    
    advice.get('boundingBox').transition(this.get('appearTransition'), afterFade);
  },
  dismiss: function () {
    var advice = this;
    
    advice.clearDismissTimer();
    
    function afterFade() {
      advice.hide();
      if (!advice.get('persist')) advice.destroy();
    }
    
    advice.get('boundingBox').transition(this.get('dismissTransition'), afterFade);
  },
  setDismissTimer: function (delay) {
    delay = delay || this.get('autoDismiss');
    this.clearDismissTimer();
    if (delay)
      this._dismissTimer = Y.later(delay*1000, this, this.dismiss);
  },
  clearDismissTimer: function () {
    if (this._dismissTimer) {
      this._dismissTimer.cancel();
      delete this._dismissTimer;
    }
  },
  destructor: function () {
    this.clearDismissTimer();
  }
}, {
  ATTRS: {
    appearTransition: {            // fade in
      value: {
        easing:   'ease-out',
        duration: FADE_DURATION,
        opacity:  1
      }
    },
    dismissTransition: {           // fade out
      value: {
        easing:   'ease-out',
        duration: FADE_DURATION,
        opacity:  0
      }
    },
    autoDismiss: { value: false }, // Dismiss automatically after 15 seconds,
                                   // or false/0 to require manual dismissal.
    persist: { value: false },     // Don't self-destruct after dismissal
    src: { value: null }           // Load content from this address on render or syncUI
  }
});
BACON.Advice = Advice;

BACON.withSelector('.q_auto_advice', function (el) {
  new Advice({
    boundingBox: el,
    contentBox: el.one('.q_advice_content'),
    visible: !el.hasClass('q_advice_hidden'),
    persist: el.hasClass('q_advice_persist'),
    autoDismiss: el.hasClass('q_advice_auto_dismiss') ? AUTO_DISMISS_LONG_DELAY : false
  }).render();
});

BACON.onRel('q_advice_show', function (el) {
  var adviceSelector = el.getAttribute('q_advice'),
      advice = Y.Widget.getByNode(adviceSelector);
  
  if (advice) {
    advice.set('autoDismiss', AUTO_DISMISS_SHORT_DELAY);
    advice.set('src', advice.get('boundingBox').getAttribute('q_src'));
    advice.renderUI(Y.bind(advice.show, advice));
  } else {
    Y.log("Couldn't locate advice with selector " + adviceSelector, 'error', 'bacon-advice');
  }
});

BACON.onRel('q_advice_dismiss', function (el) {
  var widget = Y.Widget.getByNode(el);
  if (widget)
    widget.dismiss();
});

}, '@VERSION@', { requires: ["bacon","bacon-dom","widget-base","transition"] });

YUI.add("bacon-comet", function (Y) {
Y.log("Adding bacon module bacon-comet", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;

if (QUORUS._isQuirkyFrame) {
  BACON.Comet = window.QUORUS.BACON.Comet;
  return;
}

function Comet(config) {
  this.context  = config.context;  delete config.context;
  this.callback = config.callback; delete config.callback;
  
  Comet.superclass.constructor.apply(this, arguments);
}
Comet.NAME  = 'comet';
Comet.ATTRS = {
  target: { value: null }
};

Y.extend(Comet, Y.Base, {
  FIRST_CONNECT_INTERVAL      :  3 * 1000, //  3s
  RECONNECT_SOON_INTERVAL     :  2 * 1000, //  2s
  RECONNECT_LATER_INTERVAL    : 30 * 1000, // 30s
  CONSECUTIVE_ERROR_TOLERANCE : 60 * 1000, // 60s
  
  initializer: function(config) {
    // wait a little bit in case of rapid browsing
    Y.later(this.FIRST_CONNECT_INTERVAL, this, this.start);
    
    //Increments with each connection to provide some protection against caching
    this.nonce = 0;
  },
  
  start: function() {
    // connect whenever the comet target changes
    this.after('targetChange', this.connect, this);
    
    // periodically ensure that we have an active comet connection
    this.reconnectTimer = Y.later(this.RECONNECT_LATER_INTERVAL,
                                  this, this.reconnect, null, true);
    
    this.reconnect(); // if there's already a target, let's connect
  },
  
  connect: function() {
    var target = this.get('target');
    
    this.close();
    
    if (target)
      target = BACON.queryStringAppend(target, 'nonce=' + this.nonce++);
    else
      return; // no target, don't connect
    
    Y.log("Connecting to " + target, 'debug', 'Comet');
    
    this.ioCompletion = BACON.QuorusIo.io(target, {
      context: this,
      comet: true,
      userUUID: false,
      timeoutSeconds: 120,
      on: {
        success: this.ioSuccess,
        failure: function() {
          Y.later(200, this, this.ioFailure, arguments);
        }
      }
    });
  },
  
  reconnect: function() {
    if (this.ioCompletion && this.ioCompletion.isInProgress()) {
      // already connected
    } else if (this.get('target')) {
      this.connect();
    }
  },
  
  close: function() {
    if (this.ioCompletion) { this.ioCompletion.abort(); }
  },
  
  ioSuccess: function(obj) {
    var messageStr = Y.Lang.trim(obj.get('responseText')),
        messageObj = null;
    
    if (!messageStr) return; // empty messages are noops
    
    try {
      messageObj = Y.JSON.parse(messageStr);
    } catch(e) {
      Y.log("invalid message: " + messageStr, 'error', 'Comet');
      messageObj = null;
    }
    
    if (messageObj) {
      this.callback.call(this.context || Y.config.win, messageObj);
    }
  },
  
  ioFailure: function(obj) {
    if (obj.get('statusText') === 'abort') return;
    
    var statusText = "request failed";
    
    if (Y.Lang.isString(obj.get('statusText'))) {
      statusText += ": " + obj.get('statusText');
    }
    if (obj.get('status') > 0) {
      statusText += " (" + obj.get('status') + ")";
    }
    
    Y.log(statusText, 'warn', 'Comet');
    
    if (this.is1stError()) { // reconnect sooner if it's the first error
      Y.log("1st error, reconnecting soon...", 'debug', 'Comet');
      Y.later(this.RECONNECT_SOON_INTERVAL, this, this.connect);
    } else {
      Y.log("consective error, reconnecting later...", 'debug', 'Comet');
    }
  },
  
  is1stError: function() {
    if (!this.errors) { this.errors = []; }
    
    this.errors.push(new Date());
    
    if    (this.errors.length < 2) { return true; }
    while (this.errors.length > 2) { this.errors.shift(); }
    
    var elapsed = Math.abs(this.errors[1].getTime() -
                           this.errors[0].getTime());
    
    // the last error was a while ago, consider this the 1st
    return elapsed > this.CONSECUTIVE_ERROR_TOLERANCE;
  }
});

BACON.Comet = Comet;

}, '@VERSION@', { requires: ["bacon","bacon-io","json"] });

YUI.add("bacon-channel", function (Y) {
Y.log("Adding bacon module bacon-channel", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


function ChannelManager(config) {
  ChannelManager.superclass.constructor.apply(this, arguments);
}
ChannelManager.NAME = 'channelManager';
ChannelManager.ATTRS = {
  baseUri: {
    value: "/comet/subscribe"
  },
  tarry: { value: 50 } // milliseconds
};

Y.extend(ChannelManager, Y.Base, {
  initializer: function(config) {
    this.channels = {}; // hash of channel names to lists of channels
    
    this.pipe = new BACON.Comet({ callback: this.receiveChunk, context: this });
  },
  
 
  subscribe: function(channel) {
    var name = channel.get('name');
    
    this._addChannel(channel);
    this.publish(name, {emitFacade: false}); // does a no-op if already published
    
    this.listen();
  },
  
  unsubscribe: function(channel) {
    this._removeChannel(channel);
    
    this.listen(); // reconnect to quit listening on this channel
  },
  
  listen: function() {
    var names = Y.Object.keys(this.channels);
    
    if (names.length > 0)
      Y.log("Listening to " + names.length + " channel(s): " + names.join(), 'debug', 'ChannelManager');
    else
      Y.log("No channels to listen on, not reconnecting", 'debug', 'ChannelManager');
    
    this.pipe.set('target', names.length > 0 ? this.getSubscribeUri() : null);
  },
  
  receiveChunk: function(chunk) {
    Y.Object.each(chunk, function(msg, channel) {
      Y.log("Dispatching version " + msg.version + " for channel " + channel, 'debug', 'ChannelManager');
      
      try {
        this.fire(channel, msg);
      } catch(e) {
        Y.log("Failed to dispatch message for channel " + channel + ": " + e, 'error', 'ChannelManager');
      }
    }, this);
    
    this.listen();
  },
  
  getSubscribeUri: function() {
    var subscribeUri = this.get('baseUri'),
        subscribeParams = {};
    
    if (Y.Object.size(this.channels) <= 0) return null; // gotta have some channels
    
    Y.Object.each(this.channels, function(channels, name) {
      subscribeParams["channels[" + name + "]"] = this._minVersion(channels);
    }, this);
    
    if (this.get('tarry')) subscribeParams['tarry'] = this.get('tarry');
    
    return BACON.queryStringAppend(subscribeUri, subscribeParams);
  },

  _addChannel: function(channel) {
    var name = channel.get('name');
    
    this.channels[name] = this.channels[name] || [];
    this.channels[name].push(channel);
    this.channels[name] = Y.Array.unique(this.channels[name]);
  },

  _removeChannel: function(channel) {
    var name = channel.get('name');
    
    if (Y.Object.hasKey(this.channels, name)) {
      // remove this channel if it has no subscribers
      this.channels[name] = Y.Array.reject(this.channels[name], function(c) {
                              return c === channel && !c.hasSubscribers();
                            });
      // delete the key if no channels left
      if (this.channels[name].length <= 0) delete this.channels[name];
    }
  },
  
  _minVersion: function(channels) {
    return Y.Array.reduce(channels, null, function(prev, channel) {
      return prev ? Math.min(prev, channel.get('version')) : channel.get('version');
    });
  }
 });

BACON.ChannelManager = new ChannelManager();

function Channel(config) {
  Y.mix(config, { name: config.channel });
  
  Channel.superclass.constructor.call(this, config);
}

Channel.NAME = 'channel';
Channel.NS = 'channel';
Channel.ATTRS = {
  name: {
    value: null, serialize: true
  },
  version: {
    value: 0, validator: Y.Lang.isNumber, serialize: true
  },
  data: {
    value: null, serialize: true
  }
};

Y.extend(Channel, Y.Base, {
  initializer: function(config) {
    this.publish('update', {emitFacade: false});
    
    this.listener = BACON.ChannelManager.after(this.get('name'), this.update, this);
    
    BACON.ChannelManager.subscribe(this);
  },
  update: function(state) {
    var name = this.get('name'),
        version = this.get('version');
    
    if (state.version <= version) {
      Y.log("Ignoring old state on channel '" + name + "': " + state.version + " <= " + version, 'debug', 'Channel');
      return;
    }
    
    this.setAttrs(state);
    this.fire('update', this);
  },
  unsubscribe: function() {
    if (!this.hasSubscribers()) this.listener.detach();
    
    BACON.ChannelManager.unsubscribe(this);
  },
  hasSubscribers: function() {
    return this.getEvent('update').hasSubs();
  }
});
Y.augment(Channel, BACON.Serializable);
BACON.Channel = Channel;

}, '@VERSION@', { requires: ["bacon","base","bacon-comet","bacon-serializable"] });

YUI.add("bacon-channel-adapter", function (Y) {
Y.log("Adding bacon module bacon-channel-adapter", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


/**
 * Abstracts channel state changes as instance attribute value changes
 *
 * Requires the AttributeExtensions mixin
 */
function ChannelAdapter(config) {
  // Mix channel data into the config
  if (config && config.channel) {
    config.channel = channelize(config.channel);
    
    Y.mix(config, config.channel.get('data'));
  }
}

ChannelAdapter.ATTRS = {
  channel: {
    setter: channelize,
    serialize: true
  }
};

ChannelAdapter.prototype = {
  initializer: function () {
    var listener = null;
    
    // update ourselves with any new channel state
    this.withValue('channel', function (ev) {
      var oldChannel = ev.prevVal,
          newChannel = ev.newVal;
      
      if (listener)
        listener.detach();
      
      if (oldChannel)
        oldChannel.unsubscribe();
      
      if (newChannel) {
        listener = newChannel.after('update', this._syncChannelAdapter, this);
        // The first time through, this is redundant with the constructor:
        this._syncChannelAdapter();
      }
    }, this);
  },
  destructor: function () {
    this.set('channel', null);
  },
  _syncChannelAdapter: function () {
    var channel = this.get('channel'),
        data = channel && channel.get('data');
    if (Y.Lang.isObject(data)) {
      for (var attr in data) {
        this.set(attr, data[attr], {source: 'channelAdapter', channel: channel});
      }
    }
  }
};

function channelize (value) {
  if (value && !(value instanceof BACON.Channel))
    value = new BACON.Channel(value);
  return value;
}

BACON.ChannelAdapter = ChannelAdapter;

}, '@VERSION@', { requires: ["widget","bacon-channel"] });

YUI.add("bacon-component", function (Y) {
Y.log("Adding bacon module bacon-component", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


/////////////////
//
// Mixed into widgets and Components
//
function ComponentHolder(config) {
  //TODO: This isn't quite right per YUI bug #2530046
  this.on('destroy', this.unloadComponents, this);
}

Y.mix(ComponentHolder.prototype, {
  holderRoot: function() {
    throw "Needs to be implemented by subclass";
  },
  //Loads all sub-components within the root of this component
  loadComponents: function() {
    this.eachComponent(function (node, name, component, instance) {
      if (! instance)
        node.plug(component, { parent: this });
    });
  },
  //Unloads all sub-components within the root of this component
  unloadComponents: function() {
    //Recursively destroy all components
    this.eachComponent(function (node, name, component, instance) {
      //May have already been destructed b/c the 'all' will go deeper than one level of sub-components
      if (instance)
        node.unplug(component);
    });
  },
  // Iterates over components in DOM order. Callback gets:
  // - the host node
  // - the name of the component
  // - its constructor
  // - the component instance, if it exists
  eachComponent: function (fn, context) {
    var lib = this.get('componentLibrary');
    this.holderRoot().all('[q_component]').each(function(node) {
      var componentName = node.getAttribute('q_component'),
          component = lib[componentName];
      fn.call(context || this, node, componentName, component, node[component.NS]);
    }, this);
  }
});

function ComponentWidget(config) {
  ComponentHolder.call(this, config);
  this.after('render', this.loadComponents, this);
}

Y.mix(ComponentWidget.prototype, ComponentHolder.prototype);
Y.mix(ComponentWidget.prototype, {
  holderRoot: function() {
    return this.get('boundingBox');
  }
}, true);

ComponentWidget.ATTRS = {
  //Place to source all the components from
  componentLibrary: {
    valueFn: function() { return this.constructor; }
  }
};

///////////////////
//
// A Component is a submodule of behavior for (typically) a Widget.  Its events bubble to the parent ComponentHolder
// All Components are ComponentHolders usually rooted by a Widget that is a ComponentHolder
//
var Component = Y.Base.create('component', Y.Plugin.Base, [ComponentHolder], {
  initializer: function(config) {
    var n = config.host;

    this.addTarget(config.parent);

    this.after('init', this.loadComponents, this);
  },
  destructor: function() {

  },
  holderRoot: function() {
    return this.get('host');
  }
}, {
  ATTRS: {
    parent: {},
    //Derived from the ComponentWidget root
    componentLibrary: {
      valueFn: function() {
        return this.get('parent').get('componentLibrary');
      }, 
      writeOnce: true
    }
  },
  NS: 'component'
});

BACON.Component = Component;
BACON.ComponentHolder = ComponentHolder;
BACON.ComponentWidget = ComponentWidget;

}, '@VERSION@', { requires: ["base","node-base","plugin"] });

YUI.add("bacon-form", function (Y) {
Y.log("Adding bacon module bacon-form", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


var FIELD_CLASS        = '.q_field',
    FIELDSET_CLASS     = '.q_fieldset',
    VALIDATE_CLASS     = '.q_validate',
    VALIDATION_FAILURE = 'q_error',
    VALIDATION_RE      = /q_validate_([a-z]+)/g,
    VALIDATIONS        = {
      present: function(v) {
        return !! v;
      },
      email: function(v) {
        if (v.length) {
          return !! (/^([^@\/\?:\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i).exec(v);
        } else {
          return true;
        }
      },
      tweet: function(v) {
        return v.length < BACON.Tweet.maxTweetLength;
      }
    };

// To post the form programmatically, fire 'submit' on it:
//   Y.one('form.myForm').form.fire('submit');
function Form(config) {
  Form.superclass.constructor.apply(this, arguments);
}
Form.NAME = 'form';
Form.NS = 'form';
Form.ATTRS = {
  data: {}
};
Y.extend(Form, Y.Plugin.Base, {
  initializer: function(config) {
    var form = this, formNode = config.host;
    formNode.on('submit', form._onSubmit, form);
    form.publish('submit',  {emitFacade: true, defaultFn: Y.bind(form._doSubmit, form)});
    form.publish('invalid', {emitFacade: true, defaultFn: Y.bind(form._onInvalid, form)});
    form.publish('success', {emitFacade: true, defaultFn: Y.bind(form._onSuccess, form)});
    form.on('submit', function (evt) {
      if (form._io && form._io.isInProgress() || form._disabled) {
        evt.stopPropagation();
        evt.preventDefault();
      }
    });
    // TODO - Validation desperately needs to be broken out into its own module/plugin.
    //      - Make validation event-based.
    form.on('submit', function (evt) {
      if (! this.validate()) {
        evt.halt();
      }
    });
    form._host = config.host;
    // change event does not bubble in IE
    formNode.all(VALIDATE_CLASS + ' input').on('change', function(ev) {
      form._validateField(ev.target.ancestor(VALIDATE_CLASS));
    }, form);
  },
  // set form elements with Rails-y names with values from the object
  setFromObject: function(obj, prefix) {
    var elements = this._host.getDOMNode().elements;
    for (var i = 0; i < elements.length; i++) {
      var name = elements[i].name;
      // ignore elements that don't start with the prefix
      if (name.indexOf(prefix+'[') !== 0) {
        continue;
      }
      // TODO; this could be implemented more easily with Y.Object.getValue
      var attributes = name.substr(prefix.length).match(/(\w+)/g);
      var value = obj;
      for (var j = 0; j < attributes.length; j++) {
        if (!value) { break; }
        value = value[attributes[j]];
      }
      elements[i].value = value || '';
    }
  },
  validate: function() {
    var errorCount = 0;

    this._host.all(VALIDATE_CLASS).each(function(el) {
      errorCount += this._validateField(el) ? 0 : 1;
    }, this);

    if (errorCount) {
      Y.log('Form validation failed with ' + errorCount + ' errors', 'notice', 'Form');
      return false;
    } else {
      Y.log('Form validation succeeded', 'debug', 'Form');
      return true;
    }
  },
  markInvalid: function (element) {
    element.addClass(VALIDATION_FAILURE);
    element.ancestors(FIELD_CLASS, true).addClass(VALIDATION_FAILURE);
  },
  clearInvalid: function (element) {
    element.removeClass(VALIDATION_FAILURE);
    element.ancestors(FIELD_CLASS, true).removeClass(VALIDATION_FAILURE);
  },
  _getLightbox: function() {
    var lightbox = this._host.ancestor('.q_lightbox');
    return (lightbox) ? Y.Widget.getByNode(lightbox) : null;
  },
  // DOM event receiver
  _onSubmit: function(evt) {
    if (evt)
      evt.preventDefault();
    this.fire('submit');
  },
  // Performs the actual submit, default action for 'submit' event
  _doSubmit: function() {
    var form = this,
        uri = form._host.getAttribute('action') || Y.config.doc.location.href,
        method = form._host.get('method').toUpperCase(), //the tOC works around YUI bug #2528549
        userUUID = this.get('userUUID'),
        cfg = {
          on: {
            start:   form._ioStart,
            success: form._ioSuccess,
            failure: form._ioFailure,
            end:     form._ioEnd
          },
          data: this.get('data') || {},
          method: method,
          form: form._host,
          context: form
        };

    if (userUUID)
      cfg.userUUID = userUUID;

    //IO request _may_ be xdr, so use wrapper
    form._io = BACON.QuorusIo.io(uri, cfg);
  },
  //Validates the form object and returns a QuorusIo request if validation succeeeds
  // (undefined otherwise)
  getIoRequest: function() {
    var io, form = this, data = this.get('data');
    if(this.validate()) {
      io = new BACON.QuorusIo({
        method: form._host.get('method').toUpperCase(),
        url: form._host.getAttribute('action') || Y.config.doc.location.href
      });
      io.addRequestForm(form._host);
      if(data)
        io.addRequestObj(data);
      return io;
    }
  },
  /*
   *  Called with the (successful) result of form submission (JavaScript object)
   *  Override for different behavior.
   */
  _onSuccess: function(evt) {
    var resp = evt.details[0],
        lightbox = this._getLightbox();
    // TODO - hook up through events
    if (lightbox) {
      lightbox.close();
    }
    if (resp.redirect) {
      this._disabled = true;
      top.location = resp.redirect;
    }
  },
  _onInvalid: function (evt) {
    var newHTML = Y.Node.create(resp.replace).one('.q_form_auto').get('innerHTML');
    this._host.setContent(newHTML);
  },
  _validateField: function(el) {
    if (this._fieldIsValid(el)) {
      this.clearInvalid(el);
      return true;
    } else {
      this.markInvalid(el);
      return false;
    }
  },
  _fieldIsValid: function(el) {
    var classes = el.get('className').match(VALIDATION_RE),
        dependent = null,
        check = true,
        i;
    // If this is a primary or secondary field, find the dependent field
    if (el.hasClass('q_validation_primary')) {
      dependent = el.ancestor(FIELDSET_CLASS).one('.q_validation_secondary');
    } else if (el.hasClass('q_validation_secondary')) {
      dependent = el.ancestor(FIELDSET_CLASS).one('.q_validation_primary');
    }
    // Fields with a dependent are valid if both fields are empty
    if (dependent &&
        ! Y.Lang.trim(el.one('input').get('value')) &&
        ! Y.Lang.trim(dependent.one('input').get('value'))) {
        check = false;
    }
    if (check) {
      var input = el.one('input') || el.one('textarea'),
          value = Y.Lang.trim(input.get('value'));
      for (i = 0; i < classes.length; i++) {
        var validation = classes[i].replace(VALIDATION_RE, '$1'),
            validator = VALIDATIONS[validation];
        if (! validator(value)) {
          return false;
        }
      }
    }
    return true;
  },
  _ioStart: function(obj) {
    this._host.addClass('q_loading');
  },
  _ioSuccess: function(obj) {
    var resp = Y.JSON.parse(obj.get('responseText'));
    Y.log('Got ' + resp.status + ' response', 'info', 'Form');
    this.fire('io:success', obj);
    this.fire(resp.status, resp, obj);
  },
  _ioFailure: function(obj) {
    this.fire('io:failure', obj);
    var lightbox = this._getLightbox();
    if (lightbox) { 
      if (obj.get('responseText')) {
        lightbox.get('contentBox').setContent(obj.get('responseText'));
      } else {
        lightbox.close();
      }
    } else {
      try {
        var resp = Y.JSON.parse(obj.get('responseText'));
        (resp.statusText) ? alert(resp.statusText) : alert(obj.get('statusText'));
      } catch (e) {
        alert(obj.get('statusText'));
      }
    }
  },
  _ioEnd: function(obj) {
    if (!this.get('destroyed'))
      this._host.removeClass('q_loading');
    this.fire('io:end', obj);
  }
}, {
  ATTRS: {
    userUUID: { }
  }
});
BACON.Form = Form;

BACON.autoPlug('form.q_auto_form', Form);

}, '@VERSION@', { requires: ["bacon","plugin","event-base","json","bacon-io"] });

YUI.add("bacon-events", function (Y) {
Y.log("Adding bacon module bacon-events", 'debug', 'LOAD');

var QUORUS = Y.config.win.QUORUS;
var BACON = QUORUS.BACON;


//Synthetic YUI Events

///////////////
//
// Defining a synthetic event for autocomplete
//
Y.Event.define('typing',{
  on: function(node,subscription,notifier) {
    var category = Y.stamp(subscription),
        tmp = subscription._extra.context;

    if(tmp) subscription.context = tmp;

    function checkValue(ev) {
      var newVal = node.get('value'),
          oldVal = subscription._lastValue;
      if(oldVal != newVal) {
        subscription._lastValue = newVal;

        notifier.fire({
          newVal: newVal,
          oldVal: oldVal
        });
      }
    }

    node.after(category+'|valueChange',checkValue);
    node.after(category+"|keyup",checkValue);
    subscription._timer = Y.later(800,node,checkValue,null,true);
    subscription._lastValue = node.get('value');
  },
  detach: function(node,subscription,notifier) {
    subscription._timer.cancel();
    node.detach(Y.stamp(subscription)+'|');
  },
  processArgs: function(argArray) {
    var ctx = argArray.splice(3,1)[0];
    if(ctx) {
      return {context: ctx};
    }
  }
});
}, '@VERSION@', { requires: ["event-synthetic","event-delegate","event-key"] });
