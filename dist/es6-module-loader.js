/*
 *  es6-module-loader v0.5.3
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Implemented to the 2013-12-02 ES6 module specification draft
 *  Copyright (c) 2014 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */
!function(){return"undefined"!=typeof Promise&&Promise.all&&Promise.resolve&&Promise.reject}()&&!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.Promise=a():"undefined"!=typeof global?global.Promise=a():"undefined"!=typeof self&&(self.Promise=a())}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};a[g][0].call(j.exports,function(b){var c=a[g][1][b];return e(c?c:b)},j,j.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=b.exports=a("../lib/Promise"),d="undefined"!=typeof global&&global||"undefined"!=typeof window&&window||"undefined"!=typeof self&&self;"undefined"!=typeof d&&"undefined"==typeof d.Promise&&(d.Promise=c)},{"../lib/Promise":2}],2:[function(b,c){!function(a){"use strict";a(function(a){var b=a("./makePromise"),c=a("./scheduler"),d=a("./async");return b({scheduler:new c(d),monitor:"undefined"!=typeof console?console:void 0})})}("function"==typeof a&&a.amd?a:function(a){c.exports=a(b)})},{"./async":4,"./makePromise":5,"./scheduler":6}],3:[function(b,c){!function(a){"use strict";a(function(){function a(a){this.head=this.tail=this.length=0,this.buffer=new Array(1<<a)}return a.prototype.push=function(a){return this.length===this.buffer.length&&this._ensureCapacity(2*this.length),this.buffer[this.tail]=a,this.tail=this.tail+1&this.buffer.length-1,++this.length,this.length},a.prototype.shift=function(){var a=this.buffer[this.head];return this.buffer[this.head]=void 0,this.head=this.head+1&this.buffer.length-1,--this.length,a},a.prototype._ensureCapacity=function(a){var b,c=this.head,d=this.buffer,e=new Array(a),f=0;if(0===c)for(b=this.length;b>f;++f)e[f]=d[f];else{for(a=d.length,b=this.tail;a>c;++f,++c)e[f]=d[c];for(c=0;b>c;++f,++c)e[f]=d[c]}this.buffer=e,this.head=0,this.tail=this.length},a})}("function"==typeof a&&a.amd?a:function(a){c.exports=a()})},{}],4:[function(b,c){!function(a){"use strict";a(function(a){var b,c;return b="undefined"!=typeof process&&null!==process&&"function"==typeof process.nextTick?function(a){process.nextTick(a)}:(c="function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver)?function(a,b){function c(){var a=d;d=void 0,a()}var d,e=a.createElement("div"),f=new b(c);return f.observe(e,{attributes:!0}),function(a){d=a,e.setAttribute("class","x")}}(document,c):function(a){try{return a("vertx").runOnLoop||a("vertx").runOnContext}catch(b){}var c=setTimeout;return function(a){c(a,0)}}(a)})}("function"==typeof a&&a.amd?a:function(a){c.exports=a(b)})},{}],5:[function(b,c){!function(a){"use strict";a(function(){return function(a){function b(a){function b(a){f._handler.resolve(a)}function d(a){f._handler.reject(a)}function e(a){f._handler.notify(a)}var f=this;this._handler=new q,c(a,b,d,e)}function c(a,b,c,d){try{a(b,c,d)}catch(e){c(e)}}function d(a){return a instanceof b?a:new j(new r(k(a)))}function e(a){return new j(new r(new v(a)))}function f(){return G}function g(){return new j(new q)}function h(a){function b(a,b,c,d){c.when(F,F,void 0,a,function(a){b[d]=a,0===--g&&this.resolve(b)},a.reject,a.notify)}var c,d,e=new q,f=a.length>>>0,g=f,h=[];for(c=0;f>c;++c)c in a?(d=a[c],C(d)?b(e,h,l(d),c):(h[c]=d,--g)):--g;return 0===g&&e.resolve(h),new j(e)}function i(a){if(Object(a)===a&&0===a.length)return f();for(var b=new q,c=0;c<a.length;++c)k(a[c]).when(F,F,void 0,b,b.resolve,b.reject);return new j(b)}function j(a){this._handler=a}function k(a,c){return a instanceof b?m(a,c):C(a)?n(a):new u(a)}function l(a){return a instanceof b?a._handler.join():n(a)}function m(a,b){var c=a._handler.join();return b===c?w():c}function n(a){try{var b=a.then;return"function"==typeof b?new t(b,a):new u(a)}catch(c){return new v(c)}}function o(){}function p(a){if(this.handler=a,this._isMonitored()){var b=this._env.promiseMonitor.captureStack();this.trace=a._addTrace(b)}}function q(a){this.consumers=[],this.receiver=a,this.handler=void 0,this.resolved=!1,this._isMonitored()&&(this.trace=this._env.promiseMonitor.captureStack())}function r(a){p.call(this,a)}function s(a,b){p.call(this,a),this.receiver=b}function t(a,b){q.call(this),this.assimilated=!1,this.untrustedThen=a,this.thenable=b}function u(a){this.value=a}function v(a){this.value=a,this.observed=!1,this._isMonitored()&&(this.key=this._env.promiseMonitor.startTrace(a))}function w(){return new v(new TypeError("Promise cycle"))}function x(a){return{state:"fulfilled",value:a}}function y(a){return{state:"rejected",reason:a}}function z(){return{state:"pending"}}function A(a,b,c,d,e,f,g,h){this.a=a,this.b=b,this.c=c,this.d=d,this.e=e,this.f=f,this.g=g,this.handler=h}function B(a,b){this.q=a,this.value=b}function C(a){return("object"==typeof a||"function"==typeof a)&&null!==a}function D(a,b,c){try{return a.call(c,b)}catch(d){return e(d)}}function E(a,b,c){try{return a.call(c,b)}catch(d){return d}}function F(){}var G,H=a.scheduler,I=Object.create||function(a){function b(){}return b.prototype=a,new b};return b.resolve=d,b.reject=e,b.never=f,b._defer=g,b.prototype.then=function(a,b,c){var d=this._handler,e=new q(d.receiver);return d.when(e.resolve,e.notify,e,d.receiver,a,b,c),new j(e)},b.prototype["catch"]=b.prototype.otherwise=function(a){return this.then(void 0,a)},b.prototype._bindContext=function(a){return new j(new s(this._handler,a))},b.all=h,b.race=i,j.prototype=I(b.prototype),o.prototype.inspect=z,o.prototype.when=F,o.prototype.resolve=F,o.prototype.reject=F,o.prototype.notify=F,o.prototype.join=function(){return this},o.prototype._env=a.monitor||b,o.prototype._addTrace=F,o.prototype._isMonitored=function(){return"undefined"!=typeof this._env.promiseMonitor},p.prototype=I(o.prototype),p.prototype.join=function(){return this.handler.join()},p.prototype.inspect=function(){return this.handler.inspect()},p.prototype._addTrace=function(a){return this.handler._addTrace(a)},q.prototype=I(o.prototype),q.prototype.inspect=function(){return this.resolved?this.handler.join().inspect():z()},q.prototype.resolve=function(a){this._join(k(a,this))},q.prototype.reject=function(a){this._join(new v(a))},q.prototype.join=function(){return this.resolved?this.handler.join():this},q.prototype.run=function(){var a=this.consumers,b=this.handler=this.handler.join();this.consumers=void 0;for(var c=0;c<a.length;c+=7)b.when(a[c],a[c+1],a[c+2],a[c+3],a[c+4],a[c+5],a[c+6])},q.prototype._join=function(a){this.resolved||(this.resolved=!0,this.handler=a,H.enqueue(this),this._isMonitored()&&(this.trace=a._addTrace(this.trace)))},q.prototype.when=function(a,b,c,d,e,f,g){this.resolved?H.enqueue(new A(a,b,c,d,e,f,g,this.handler.join())):this.consumers.push(a,b,c,d,e,f,g)},q.prototype.notify=function(a){this.resolved||H.enqueue(new B(this.consumers,a))},q.prototype._addTrace=function(a){return this.resolved?this.handler._addTrace(a):a},r.prototype=I(p.prototype),r.prototype.when=function(a,b,c,d,e,f,g){H.enqueue(new A(a,b,c,d,e,f,g,this.join()))},s.prototype=I(p.prototype),s.prototype.when=function(a,b,c,d,e,f,g){void 0!==this.receiver&&(d=this.receiver),this.join().when(a,b,c,d,e,f,g)},t.prototype=I(q.prototype),t.prototype.when=function(a,b,c,d,e,f,g){this.assimilated||(this.assimilated=!0,this._assimilate()),q.prototype.when.call(this,a,b,c,d,e,f,g)},t.prototype._assimilate=function(){function a(a){d.resolve(a)}function b(a){d.reject(a)}function c(a){d.notify(a)}var d=this;this._try(this.untrustedThen,this.thenable,a,b,c)},t.prototype._try=function(a,b,c,d,e){try{a.call(b,c,d,e)}catch(f){d(f)}},u.prototype=I(o.prototype),u.prototype.inspect=function(){return x(this.value)},u.prototype.when=function(a,b,c,d,e){var f="function"==typeof e?D(e,this.value,d):this.value;a.call(c,f)},v.prototype=I(o.prototype),v.prototype.inspect=function(){return y(this.value)},v.prototype.when=function(a,b,c,d,f,g){this._isMonitored()&&!this.observed&&this._env.promiseMonitor.removeTrace(this.key),this.observed=!0;var h="function"==typeof g?D(g,this.value,d):e(this.value);a.call(c,h)},v.prototype._addTrace=function(a){this.observed||this._env.promiseMonitor.updateTrace(this.key,a)},G=new j(new o),A.prototype.run=function(){this.handler.when(this.a,this.b,this.c,this.d,this.e,this.f,this.g)},B.prototype.run=function(){for(var a=this.q,b=1;b<a.length;b+=7)this._notify(a[b],a[b+1],a[b+2],a[b+5])},B.prototype._notify=function(a,b,c,d){var e="function"==typeof d?E(d,this.value,c):this.value;a.call(b,e)},b}})}("function"==typeof a&&a.amd?a:function(a){c.exports=a()})},{}],6:[function(b,c){!function(a){"use strict";a(function(a){function b(a){this._enqueue=a,this._handlerQueue=new c(15);var b=this;this.drainQueue=function(){b._drainQueue()}}var c=a("./Queue");return b.prototype.enqueue=function(a){1===this._handlerQueue.push(a)&&this._enqueue(this.drainQueue)},b.prototype._drainQueue=function(){for(var a=this._handlerQueue;a.length>0;)a.shift().run()},b})}("function"==typeof a&&a.amd?a:function(a){c.exports=a(b)})},{"./Queue":3}]},{},[1])(1)}),function(a){function b(a,b){b||console.log("Assertion Failed - "+a)}function c(a){return{status:"loading",name:a,metadata:{},linkSets:[]}}function d(a,d,f,g){return new y(function(b){b(a.normalize(d,f,g))}).then(function(d){var f;if(a._modules[d])return f=c(d),f.status="linked",f;for(var g=0,h=a._loads.length;h>g;g++)if(f=a._loads[g],f.name==d)return b("loading or loaded","loading"==f.status||"loaded"==f.status),f;return f=c(d),a._loads.push(f),e(a,f),f})}function e(a,b){f(a,b,y.resolve().then(function(){return a.locate({name:b.name,metadata:b.metadata})}))}function f(a,b,c){g(a,b,c.then(function(c){return"failed"==b.status?void 0:(b.address=c,a.fetch({name:b.name,metadata:b.metadata,address:c}))}))}function g(c,e,f){f.then(function(a){return"failed"==e.status?void 0:c.translate({name:e.name,metadata:e.metadata,address:e.address,source:a})}).then(function(a){return"failed"==e.status?void 0:(e.source=a,c.instantiate({name:e.name,metadata:e.metadata,address:e.address,source:a}))}).then(function(f){if("failed"==e.status)return void 0;var g;if(void 0===f){if(!a.traceur)throw new TypeError("Include Traceur for module syntax support");w||(w=a.traceur,$traceurRuntime.ModuleStore.get=$traceurRuntime.getModuleImpl=function(a){return System.get(a)}),e.address=e.address||"anon"+ ++C;var h=new w.syntax.Parser(new w.syntax.SourceFile(e.address,e.source));e.body=h.parseModule(),g=t(e.body),e.kind="declarative"}else{if("object"!=typeof f)throw TypeError("Invalid instantiate return value");g=f.deps||[],e.execute=f.execute,e.kind="dynamic"}e.dependencies={},e.depsList=g;for(var j=[],k=0,l=g.length;l>k;k++)(function(a){var f=d(c,a,e.name,e.address);f.then(function(c){if(b("not already a dependency",!e.dependencies[a]),e.dependencies[a]=c.name,"linked"!=c.status)for(var d=e.linkSets.concat([]),f=0,g=d.length;g>f;f++)i(d[f],c)}),j.push(f)})(g[k]);return y.all(j)}).then(function(){b("is loading","loading"==e.status),e.status="loaded";for(var a=e.linkSets.concat([]),c=0,d=a.length;d>c;c++)j(a[c],e)},function(a){b("is loading on fail","loading"==e.status),e.status="failed",e.exception=a;for(var c=0,d=e.linkSets.length;d>c;c++)k(e.linkSets[c],a);b("fail linkSets removed",0==e.linkSets.length)})}function h(a,b){var c,d,e=new y(function(a,b){c=a,d=b}),f={loader:a,loads:[],done:e,resolve:c,reject:d,loadingCount:0};return i(f,b),f}function i(a,c){b("loading or loaded on link set","loading"==c.status||"loaded"==c.status);for(var d=0,e=a.loads.length;e>d;d++)if(a.loads[d]==c)return;a.loads.push(c),c.linkSets.push(a),"loaded"!=c.status&&a.loadingCount++;var f=a.loader;for(var g in c.dependencies){var h=c.dependencies[g];if(!f._modules[h])for(var d=0,e=f._loads.length;e>d;d++)if(f._loads[d].name==h){i(a,f._loads[d]);break}}}function j(a,c){if(b("loaded or linked","loaded"==c.status||"linked"==c.status),a.loadingCount--,!(a.loadingCount>0)){var d=a.loads[0];try{q(a.loads,a.loader)}catch(e){return k(a,e)}b("loads cleared",0==a.loads.length),a.resolve(d)}}function k(a,c){for(var d=a.loads.concat([]),e=0,f=d.length;f>e;e++){var g=d[e],h=A.call(g.linkSets,a);if(b("link not present",-1!=h),g.linkSets.splice(h,1),0==g.linkSets.length){var i=A.call(a.loader._loads,g);-1!=i&&a.loader._loads.splice(i,1)}}a.reject(c)}function l(a,c){c.name&&(b("load not in module table",!a._modules[c.name]),a._modules[c.name]=c.module);var d=A.call(a._loads,c);-1!=d&&a._loads.splice(d,1);for(var e=0,f=c.linkSets.length;f>e;e++)d=A.call(c.linkSets[e].loads,c),c.linkSets[e].loads.splice(d,1);c.linkSets=[]}function m(a,b,c){return new y(n(a,b,c&&c.address?"fetch":"locate",void 0,c&&c.address,void 0)).then(function(a){return a})}function n(a,d,i,j,k,l){return function(m,n){if(a._modules[d])throw new TypeError('Module "'+d+'" already exists in the module table');for(var o=0,p=a._loads.length;p>o;o++)if(a._loads[o].name==d)throw new TypeError('Module "'+d+'" is already loading');var q=c(d);j&&(q.metadata=j);var r=h(a,q);a._loads.push(q),r.done.then(m,n),"locate"==i?e(a,q):"fetch"==i?f(a,q,y.resolve(k)):(b("translate step","translate"==i),q.address=k,g(a,q,y.resolve(l)))}}function o(a,c){return b("is linked "+c.name,"linked"==c.status),p(c.module,a),b("is a module",c.module.module instanceof v),c.module.module}function p(b,c){if(b.module)return b.module;for(var d in b.dependencies){var e=b.dependencies[d];c._modules[e].module||p(c._modules[e],c)}w.options.sourceMaps=!0,w.options.modules="instantiate";var f=new w.util.ErrorReporter;f.reportMessageInternal=function(a,b){throw b+"\n"+a};var g=a.System;a.System=w.System;var h=new w.codegeneration.module.AttachModuleNameTransformer(b.name).transformAny(b.body);h=new w.codegeneration.FromOptionsTransformer(f).transform(h),a.System=g,delete b.body;var i=new w.outputgeneration.SourceMapGenerator({file:b.address}),j={sourceMapGenerator:i},k=w.outputgeneration.TreeWriter.write(h,j);a.btoa&&(k+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(j.sourceMap)))+"\n");var l=System.register;System.register=function(c,d,e){for(var f=0;f<d.length;f++)d[f]=b.dependencies[d[f]];b.module=new v(e.apply(a,d))},u(k,a,b.address,b.name),System.register=l}function q(a,b){for(var c=!1;a.length;){c=!0;a:for(var d=0;d<a.length;d++){var e=a[d],f=[];for(var g in e.dependencies){var h=e.dependencies[g];if(!b._modules[h])continue a;var i=e.depsList.indexOf(g);f[i]=h}if(c=!1,"declarative"==e.kind)e.module={name:e.name,dependencies:e.dependencies,body:e.body};else{var j=e.execute.apply(null,f);if(!(j instanceof v))throw new TypeError("Execution must define a Module instance");e.module={module:j}}e.status="linked",l(b,e)}if(c)throw new TypeError("Circular dependencies not supported by the polyfill")}}function r(a){if("object"!=typeof a)throw new TypeError("Options must be an object");a.normalize&&(this.normalize=a.normalize),a.locate&&(this.locate=a.locate),a.fetch&&(this.fetch=a.fetch),a.translate&&(this.translate=a.translate),a.instantiate&&(this.instantiate=a.instantiate),x(this,"global",{get:function(){throw new TypeError("global accessor not provided by polyfill")}}),x(this,"realm",{get:function(){throw new TypeError("Realms not implemented in polyfill")}}),this._modules={},this._loads=[]}function s(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&s(f,b,a,e))}function t(a){function b(a){-1==A.call(c,a)&&c.push(a)}var c=[];return s(a,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&b(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?b(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&b(a.expression.token.processedValue)}),c}function u(a,b,c,d){try{Function("global",'var __moduleName = "'+(d||"").replace('"','"')+'"; with(global) { '+a+" \n }"+(c&&!a.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n]+)/)?"\n//# sourceURL="+c:"")).call(b,b)}catch(e){throw"SyntaxError"==e.name&&(e.message="Evaluating "+c+"\n	"+e.message),e}}function v(a){if("object"!=typeof a)throw new TypeError("Expected object");if(!(this instanceof v))return new v(a);var b=this;for(var c in a)!function(a,c){x(b,a,{configurable:!1,enumerable:!0,get:function(){return c}})}(c,a[c]);Object.preventExtensions&&Object.preventExtensions(this)}var w,x,y=a.Promise||require("./promise");try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(z){x=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}var A=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},B={};r.prototype={define:function(a,b,c){if(B[a])throw new TypeError("Module is already loading.");return B[a]=new y(n(this,a,c&&c.address?"fetch":"translate",c&&c.meta||{},c&&c.address,b)),B[a].then(function(){delete B[a]})},load:function(a,b){return this._modules[a]?(p(this._modules[a],this),y.resolve(this._modules[a].module)):B[a]?B[a]:(B[a]=m(this,a,b),B[a].then(function(){delete B[a]}))},module:function(a,b){var d=c();d.address=b&&b.address;var e=h(this,d),f=y.resolve(a),i=this,j=e.done.then(function(){return o(i,d)});return g(this,d,f),j},"import":function(a,b){if(this._modules[a])return p(this._modules[a],this),y.resolve(this._modules[a].module);var c=this;return(B[a]||(B[a]=m(this,a,b))).then(function(b){return delete B[a],o(c,b)})},eval:function(){throw new TypeError("Eval not implemented in polyfill")},get:function(a){return p(this._modules[a],this),this._modules[a].module},has:function(a){return!!this._modules[a]},set:function(a,b){if(!(b instanceof v))throw new TypeError("Set must be a module");this._modules[a]={module:b}},"delete":function(a){return this._modules[a]?delete this._modules[a]:!1},entries:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},keys:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},values:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},normalize:function(a){return a},locate:function(a){return a.name},fetch:function(){throw new TypeError("Fetch not implemented")},translate:function(a){return a.source},instantiate:function(){}};var C=0;"object"==typeof exports&&(module.exports=r),a.Loader||(a.Loader=r),a.LoaderPolyfill=r,a.Module=v}("undefined"!=typeof global?global:this),function(a){function b(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function c(a,c){function d(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return c=b(c||""),a=b(a||""),c&&a?(c.protocol||a.protocol)+(c.protocol||c.authority?c.authority:a.authority)+d(c.protocol||c.authority||"/"===c.pathname.charAt(0)?c.pathname:c.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+c.pathname:a.pathname)+(c.protocol||c.authority||c.pathname?c.search:c.search||a.search)+c.hash:null}function d(){document.removeEventListener("DOMContentLoaded",d,!1),window.removeEventListener("load",d,!1),e()}function e(){for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("module"==c.type){var d=c.getAttribute("name"),e=c.getAttribute("src"),f=c.innerHTML;(d?k.define(d,f,{address:e}):k.module(f,{address:e})).then(function(){},function(a){nextTick(function(){throw a})})}}}var f,g="undefined"!=typeof window,h=a.Loader||require("./loader"),i=a.Promise||require("./promise");if(g)f=function(a,b,c){function d(){b(f.responseText)}function e(){c(f.statusText+": "+a||"XHR error")}var f=new XMLHttpRequest,g=!0;if(!("withCredentials"in f)){var h=/^(\w+:)?\/\/([^\/]+)/.exec(a);h&&(g=h[2]===window.location.host,h[1]&&(g&=h[1]===window.location.protocol))}g||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),f.send(null)};else{var j=require("fs");f=function(a,b,c){return j.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var k=new h({global:g?window:a,strict:!0,normalize:function(a,b){if("string"!=typeof a)throw new TypeError("Module name must be a string");var c=a.split("/");if(0==c.length)throw new TypeError("No module name provided");var d=0,e=!1,f=0;if("."==c[0]){if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');e=!0}else{for(;".."==c[d];)if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');d&&(e=!0),f=d}for(var g=d;g<c.length;g++){var h=c[g];if(""==h||"."==h||".."==h)throw new TypeError('Illegal module name"'+a+'"')}if(!e)return a;{var i=[],j=(b||"").split("/");j.length-1-f}return i=i.concat(j.splice(0,j.length-1-f)),i=i.concat(c.splice(d)),i.join("/")},locate:function(a){var b,d=a.name,e="";for(var f in this.paths){var g=f.split("*");if(g.length>2)throw new TypeError("Only one wildcard in a path is permitted");1==g.length?d==f&&f.length>e.length&&(e=f):d.substr(0,g[0].length)==g[0]&&d.substr(d.length-g[1].length)==g[1]&&(e=f,b=d.substr(g[0].length,d.length-g[1].length-g[0].length))}var h=this.paths[e];return b&&(h=h.replace("*",b)),c(this.baseURL,h)},fetch:function(a){var b,d,e=new i(function(a,c){b=a,d=c});return f(c(this.baseURL,a.address),function(a){b(a)},d),e}});if(g){var l=window.location.href.split("#")[0].split("?")[0];k.baseURL=l.substring(0,l.lastIndexOf("/")+1)}else k.baseURL="./";if(k.paths={"*":"*.js"},a.System=k,g){var m=document.getElementsByTagName("script");m=m[m.length-1],"complete"===document.readyState?setTimeout(e):document.addEventListener&&(document.addEventListener("DOMContentLoaded",d,!1),window.addEventListener("load",d,!1)),m.getAttribute("data-init")&&window[m.getAttribute("data-init")]()}"object"==typeof exports&&(module.exports=k)}("undefined"!=typeof global?global:this);