/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):e(t)}(this,function(t){var e=function(){function $(t){return null==t?String(t):S[C.call(t)]||"object"}function F(t){return"function"==$(t)}function k(t){return null!=t&&t==t.window}function M(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function R(t){return"object"==$(t)}function Z(t){return R(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function z(t){var e=!!t&&"length"in t&&t.length,n=r.type(t);return"function"!=n&&!k(t)&&("array"==n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function q(t){return a.call(t,function(t){return null!=t})}function H(t){return t.length>0?r.fn.concat.apply([],t):t}function I(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function V(t){return t in l?l[t]:l[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||h[I(t)]?e:e+"px"}function B(t){var e,n;return c[t]||(e=f.createElement(t),f.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),c[t]=n),c[t]}function U(t){return"children"in t?u.call(t.children):r.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,r=t?t.length:0;for(n=0;r>n;n++)this[n]=t[n];this.length=r,this.selector=e||""}function J(t,r,i){for(n in r)i&&(Z(r[n])||L(r[n]))?(Z(r[n])&&!Z(t[n])&&(t[n]={}),L(r[n])&&!L(t[n])&&(t[n]=[]),J(t[n],r[n],i)):r[n]!==e&&(t[n]=r[n])}function W(t,e){return null==e?r(t):r(t).filter(e)}function Y(t,e,n,r){return F(e)?e.call(t,n,r):e}function G(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function K(t,n){var r=t.className||"",i=r&&r.baseVal!==e;return n===e?i?r.baseVal:r:void(i?r.baseVal=n:t.className=n)}function Q(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?r.parseJSON(t):t):t}catch(e){return t}}function tt(t,e){e(t);for(var n=0,r=t.childNodes.length;r>n;n++)tt(t.childNodes[n],e)}var e,n,r,i,O,P,o=[],s=o.concat,a=o.filter,u=o.slice,f=t.document,c={},l={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,g=/^(?:body|html)$/i,v=/([A-Z])/g,y=["val","css","html","text","data","width","height","offset"],x=["after","prepend","before","append"],b=f.createElement("table"),E=f.createElement("tr"),j={tr:f.createElement("tbody"),tbody:b,thead:b,tfoot:b,td:E,th:E,"*":f.createElement("div")},w=/complete|loaded|interactive/,T=/^[\w-]*$/,S={},C=S.toString,N={},A=f.createElement("div"),D={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},L=Array.isArray||function(t){return t instanceof Array};return N.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=A).appendChild(t),r=~N.qsa(i,e).indexOf(t),o&&A.removeChild(t),r},O=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return a.call(t,function(e,n){return t.indexOf(e)==n})},N.fragment=function(t,n,i){var o,s,a;return d.test(t)&&(o=r(f.createElement(RegExp.$1))),o||(t.replace&&(t=t.replace(m,"<$1></$2>")),n===e&&(n=p.test(t)&&RegExp.$1),n in j||(n="*"),a=j[n],a.innerHTML=""+t,o=r.each(u.call(a.childNodes),function(){a.removeChild(this)})),Z(i)&&(s=r(o),r.each(i,function(t,e){y.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},N.Z=function(t,e){return new X(t,e)},N.isZ=function(t){return t instanceof N.Z},N.init=function(t,n){var i;if(!t)return N.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&p.test(t))i=N.fragment(t,RegExp.$1,n),t=null;else{if(n!==e)return r(n).find(t);i=N.qsa(f,t)}else{if(F(t))return r(f).ready(t);if(N.isZ(t))return t;if(L(t))i=q(t);else if(R(t))i=[t],t=null;else if(p.test(t))i=N.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==e)return r(n).find(t);i=N.qsa(f,t)}}return N.Z(i,t)},r=function(t,e){return N.init(t,e)},r.extend=function(t){var e,n=u.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){J(t,n,e)}),t},N.qsa=function(t,e){var n,r="#"==e[0],i=!r&&"."==e[0],o=r||i?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&r?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:u.call(s&&!r&&t.getElementsByClassName?i?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},r.contains=f.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},r.type=$,r.isFunction=F,r.isWindow=k,r.isArray=L,r.isPlainObject=Z,r.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},r.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},r.inArray=function(t,e,n){return o.indexOf.call(e,t,n)},r.camelCase=O,r.trim=function(t){return null==t?"":String.prototype.trim.call(t)},r.uuid=0,r.support={},r.expr={},r.noop=function(){},r.map=function(t,e){var n,i,o,r=[];if(z(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&r.push(n);else for(o in t)n=e(t[o],o),null!=n&&r.push(n);return H(r)},r.each=function(t,e){var n,r;if(z(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;return t},r.grep=function(t,e){return a.call(t,e)},t.JSON&&(r.parseJSON=JSON.parse),r.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){S["[object "+e+"]"]=e.toLowerCase()}),r.fn={constructor:N.Z,length:0,forEach:o.forEach,reduce:o.reduce,push:o.push,sort:o.sort,splice:o.splice,indexOf:o.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=N.isZ(e)?e.toArray():e;return s.apply(N.isZ(this)?this.toArray():this,n)},map:function(t){return r(r.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return r(u.apply(this,arguments))},ready:function(t){return w.test(f.readyState)&&f.body?t(r):f.addEventListener("DOMContentLoaded",function(){t(r)},!1),this},get:function(t){return t===e?u.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return o.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return F(t)?this.not(this.not(t)):r(a.call(this,function(e){return N.matches(e,t)}))},add:function(t,e){return r(P(this.concat(r(t,e))))},is:function(t){return this.length>0&&N.matches(this[0],t)},not:function(t){var n=[];if(F(t)&&t.call!==e)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):z(t)&&F(t.item)?u.call(t):r(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return r(n)},has:function(t){return this.filter(function(){return R(t)?r.contains(this,t):r(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!R(t)?t:r(t)},last:function(){var t=this[this.length-1];return t&&!R(t)?t:r(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?r(t).filter(function(){var t=this;return o.some.call(n,function(e){return r.contains(e,t)})}):1==this.length?r(N.qsa(this[0],t)):this.map(function(){return N.qsa(this,t)}):r()},closest:function(t,e){var n=[],i="object"==typeof t&&r(t);return this.each(function(r,o){for(;o&&!(i?i.indexOf(o)>=0:N.matches(o,t));)o=o!==e&&!M(o)&&o.parentNode;o&&n.indexOf(o)<0&&n.push(o)}),r(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=r.map(n,function(t){return(t=t.parentNode)&&!M(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return W(e,t)},parent:function(t){return W(P(this.pluck("parentNode")),t)},children:function(t){return W(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||u.call(this.childNodes)})},siblings:function(t){return W(this.map(function(t,e){return a.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return r.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=B(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=F(t);if(this[0]&&!e)var n=r(t).get(0),i=n.parentNode||this.length>1;return this.each(function(o){r(this).wrapAll(e?t.call(this,o):i?n.cloneNode(!0):n)})},wrapAll:function(t){if(this[0]){r(this[0]).before(t=r(t));for(var e;(e=t.children()).length;)t=e.first();r(t).append(this)}return this},wrapInner:function(t){var e=F(t);return this.each(function(n){var i=r(this),o=i.contents(),s=e?t.call(this,n):t;o.length?o.wrapAll(s):i.append(s)})},unwrap:function(){return this.parent().each(function(){r(this).replaceWith(r(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=r(this);(t===e?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return r(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return r(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;r(this).empty().append(Y(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,r){var i;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(R(t))for(n in t)G(this,n,t[n]);else G(this,t,Y(this,r,e,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(i=this[0].getAttribute(t))?i:e},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){G(this,t)},this)})},prop:function(t,e){return t=D[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=D[t]||t,this.each(function(){delete this[t]})},data:function(t,n){var r="data-"+t.replace(v,"-$1").toLowerCase(),i=1 in arguments?this.attr(r,n):this.attr(r);return null!==i?Q(i):e},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=Y(this,t,e,this.value)})):this[0]&&(this[0].multiple?r(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(e){if(e)return this.each(function(t){var n=r(this),i=Y(this,e,t,n.offset()),o=n.offsetParent().offset(),s={top:i.top-o.top,left:i.left-o.left};"static"==n.css("position")&&(s.position="relative"),n.css(s)});if(!this.length)return null;if(f.documentElement!==this[0]&&!r.contains(f.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+t.pageXOffset,top:n.top+t.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(t,e){if(arguments.length<2){var i=this[0];if("string"==typeof t){if(!i)return;return i.style[O(t)]||getComputedStyle(i,"").getPropertyValue(t)}if(L(t)){if(!i)return;var o={},s=getComputedStyle(i,"");return r.each(t,function(t,e){o[e]=i.style[O(e)]||s.getPropertyValue(e)}),o}}var a="";if("string"==$(t))e||0===e?a=I(t)+":"+_(t,e):this.each(function(){this.style.removeProperty(I(t))});else for(n in t)t[n]||0===t[n]?a+=I(n)+":"+_(n,t[n])+";":this.each(function(){this.style.removeProperty(I(n))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(r(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?o.some.call(this,function(t){return this.test(K(t))},V(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var n=K(this),o=Y(this,t,e,n);o.split(/\s+/g).forEach(function(t){r(this).hasClass(t)||i.push(t)},this),i.length&&K(this,n+(n?" ":"")+i.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===e)return K(this,"");i=K(this),Y(this,t,n,i).split(/\s+/g).forEach(function(t){i=i.replace(V(t)," ")}),K(this,i.trim())}})},toggleClass:function(t,n){return t?this.each(function(i){var o=r(this),s=Y(this,t,i,K(this));s.split(/\s+/g).forEach(function(t){(n===e?!o.hasClass(t):n)?o.addClass(t):o.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===e?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===e?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=g.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(r(t).css("margin-top"))||0,n.left-=parseFloat(r(t).css("margin-left"))||0,i.top+=parseFloat(r(e[0]).css("border-top-width"))||0,i.left+=parseFloat(r(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||f.body;t&&!g.test(t.nodeName)&&"static"==r(t).css("position");)t=t.offsetParent;return t})}},r.fn.detach=r.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});r.fn[t]=function(i){var o,s=this[0];return i===e?k(s)?s["inner"+n]:M(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(e){s=r(this),s.css(t,Y(this,i,e,s[t]()))})}}),x.forEach(function(n,i){var o=i%2;r.fn[n]=function(){var n,a,s=r.map(arguments,function(t){var i=[];return n=$(t),"array"==n?(t.forEach(function(t){return t.nodeType!==e?i.push(t):r.zepto.isZ(t)?i=i.concat(t.get()):void(i=i.concat(N.fragment(t)))}),i):"object"==n||null==t?t:N.fragment(t)}),u=this.length>1;return s.length<1?this:this.each(function(e,n){a=o?n:n.parentNode,n=0==i?n.nextSibling:1==i?n.firstChild:2==i?n:null;var c=r.contains(f.documentElement,a);s.forEach(function(e){if(u)e=e.cloneNode(!0);else if(!a)return r(e).remove();a.insertBefore(e,n),c&&tt(e,function(e){if(!(null==e.nodeName||"SCRIPT"!==e.nodeName.toUpperCase()||e.type&&"text/javascript"!==e.type||e.src)){var n=e.ownerDocument?e.ownerDocument.defaultView:t;n.eval.call(n,e.innerHTML)}})})})},r.fn[o?n+"To":"insert"+(i?"Before":"After")]=function(t){return r(t)[n](this),this}}),N.Z.prototype=X.prototype=r.fn,N.uniq=P,N.deserializeValue=Q,r.zepto=N,r}();return t.Zepto=e,void 0===t.$&&(t.$=e),function(e){function h(t){return t._zid||(t._zid=n++)}function p(t,e,n,r){if(e=d(e),e.ns)var i=m(e.ns);return(a[h(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||i.test(t.ns))&&(!n||h(t.fn)===h(n))&&(!r||t.sel==r)})}function d(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function m(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function g(t,e){return t.del&&!f&&t.e in c||!!e}function v(t){return l[t]||f&&c[t]||t}function y(t,n,i,o,s,u,f){var c=h(t),p=a[c]||(a[c]=[]);n.split(/\s/).forEach(function(n){if("ready"==n)return e(document).ready(i);var a=d(n);a.fn=i,a.sel=s,a.e in l&&(i=function(t){var n=t.relatedTarget;return!n||n!==this&&!e.contains(this,n)?a.fn.apply(this,arguments):void 0}),a.del=u;var c=u||i;a.proxy=function(e){if(e=T(e),!e.isImmediatePropagationStopped()){e.data=o;var n=c.apply(t,e._args==r?[e]:[e].concat(e._args));return n===!1&&(e.preventDefault(),e.stopPropagation()),n}},a.i=p.length,p.push(a),"addEventListener"in t&&t.addEventListener(v(a.e),a.proxy,g(a,f))})}function x(t,e,n,r,i){var o=h(t);(e||"").split(/\s/).forEach(function(e){p(t,e,n,r).forEach(function(e){delete a[o][e.i],"removeEventListener"in t&&t.removeEventListener(v(e.e),e.proxy,g(e,i))})})}function T(t,n){return(n||!t.isDefaultPrevented)&&(n||(n=t),e.each(w,function(e,r){var i=n[e];t[e]=function(){return this[r]=b,i&&i.apply(n,arguments)},t[r]=E}),t.timeStamp||(t.timeStamp=Date.now()),(n.defaultPrevented!==r?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(t.isDefaultPrevented=b)),t}function S(t){var e,n={originalEvent:t};for(e in t)j.test(e)||t[e]===r||(n[e]=t[e]);return T(n,t)}var r,n=1,i=Array.prototype.slice,o=e.isFunction,s=function(t){return"string"==typeof t},a={},u={},f="onfocusin"in t,c={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};u.click=u.mousedown=u.mouseup=u.mousemove="MouseEvents",e.event={add:y,remove:x},e.proxy=function(t,n){var r=2 in arguments&&i.call(arguments,2);if(o(t)){var a=function(){return t.apply(n,r?r.concat(i.call(arguments)):arguments)};return a._zid=h(t),a}if(s(n))return r?(r.unshift(t[n],t),e.proxy.apply(null,r)):e.proxy(t[n],t);throw new TypeError("expected function")},e.fn.bind=function(t,e,n){return this.on(t,e,n)},e.fn.unbind=function(t,e){return this.off(t,e)},e.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var b=function(){return!0},E=function(){return!1},j=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,w={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,e,n){return this.on(e,t,n)},e.fn.undelegate=function(t,e,n){return this.off(e,t,n)},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,a,u,f){var c,l,h=this;return t&&!s(t)?(e.each(t,function(t,e){h.on(t,n,a,e,f)}),h):(s(n)||o(u)||u===!1||(u=a,a=n,n=r),(u===r||a===!1)&&(u=a,a=r),u===!1&&(u=E),h.each(function(r,o){f&&(c=function(t){return x(o,t.type,u),u.apply(this,arguments)}),n&&(l=function(t){var r,s=e(t.target).closest(n,o).get(0);return s&&s!==o?(r=e.extend(S(t),{currentTarget:s,liveFired:o}),(c||u).apply(s,[r].concat(i.call(arguments,1)))):void 0}),y(o,t,u,a,n,l||c)}))},e.fn.off=function(t,n,i){var a=this;return t&&!s(t)?(e.each(t,function(t,e){a.off(t,n,e)}),a):(s(n)||o(i)||i===!1||(i=n,n=r),i===!1&&(i=E),a.each(function(){x(this,t,i,n)}))},e.fn.trigger=function(t,n){return t=s(t)||e.isPlainObject(t)?e.Event(t):T(t),t._args=n,this.each(function(){t.type in c&&"function"==typeof this[t.type]?this[t.type]():"dispatchEvent"in this?this.dispatchEvent(t):e(this).triggerHandler(t,n)})},e.fn.triggerHandler=function(t,n){var r,i;return this.each(function(o,a){r=S(s(t)?e.Event(t):t),r._args=n,r.target=a,e.each(p(a,t.type||t),function(t,e){return i=e.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),i},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return 0 in arguments?this.bind(t,e):this.trigger(t)}}),e.Event=function(t,e){s(t)||(e=t,t=e.type);var n=document.createEvent(u[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),T(n)}}(e),function(e){function p(t,n,r){var i=e.Event(n);return e(t).trigger(i,r),!i.isDefaultPrevented()}function d(t,e,n,i){return t.global?p(e||r,n,i):void 0}function m(t){t.global&&0===e.active++&&d(t,null,"ajaxStart")}function g(t){t.global&&!--e.active&&d(t,null,"ajaxStop")}function v(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||d(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void d(e,n,"ajaxSend",[t,e])}function y(t,e,n,r){var i=n.context,o="success";n.success.call(i,t,o,e),r&&r.resolveWith(i,[t,o,e]),d(n,i,"ajaxSuccess",[e,n,t]),b(o,e,n)}function x(t,e,n,r,i){var o=r.context;r.error.call(o,n,e,t),i&&i.rejectWith(o,[n,e,t]),d(r,o,"ajaxError",[n,r,t||e]),b(e,n,r)}function b(t,e,n){var r=n.context;n.complete.call(r,e,t),d(n,r,"ajaxComplete",[e,n]),g(n)}function E(t,e,n){if(n.dataFilter==j)return t;var r=n.context;return n.dataFilter.call(r,t,e)}function j(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==c?"html":t==f?"json":a.test(t)?"script":u.test(t)&&"xml")||"text"}function T(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function S(t){t.processData&&t.data&&"string"!=e.type(t.data)&&(t.data=e.param(t.data,t.traditional)),!t.data||t.type&&"GET"!=t.type.toUpperCase()&&"jsonp"!=t.dataType||(t.url=T(t.url,t.data),t.data=void 0)}function C(t,n,r,i){return e.isFunction(n)&&(i=r,r=n,n=void 0),e.isFunction(r)||(i=r,r=void 0),{url:t,data:n,success:r,dataType:i}}function O(t,n,r,i){var o,s=e.isArray(n),a=e.isPlainObject(n);e.each(n,function(n,u){o=e.type(u),i&&(n=r?i:i+"["+(a||"object"==o||"array"==o?n:"")+"]"),!i&&s?t.add(u.name,u.value):"array"==o||!r&&"object"==o?O(t,u,r,n):t.add(n,u)})}var i,o,n=+new Date,r=t.document,s=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,a=/^(?:text|application)\/javascript/i,u=/^(?:text|application)\/xml/i,f="application/json",c="text/html",l=/^\s*$/,h=r.createElement("a");h.href=t.location.href,e.active=0,e.ajaxJSONP=function(i,o){if(!("type"in i))return e.ajax(i);var c,p,s=i.jsonpCallback,a=(e.isFunction(s)?s():s)||"Zepto"+n++,u=r.createElement("script"),f=t[a],l=function(t){e(u).triggerHandler("error",t||"abort")},h={abort:l};return o&&o.promise(h),e(u).on("load error",function(n,r){clearTimeout(p),e(u).off().remove(),"error"!=n.type&&c?y(c[0],h,i,o):x(null,r||"error",h,i,o),t[a]=f,c&&e.isFunction(f)&&f(c[0]),f=c=void 0}),v(h,i)===!1?(l("abort"),h):(t[a]=function(){c=arguments},u.src=i.url.replace(/\?(.+)=\?/,"?$1="+a),r.head.appendChild(u),i.timeout>0&&(p=setTimeout(function(){l("timeout")},i.timeout)),h)},e.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:null,global:!0,xhr:function(){return new t.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:f,xml:"application/xml, text/xml",html:c,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:j},e.ajax=function(n){var u,f,s=e.extend({},n||{}),a=e.Deferred&&e.Deferred();for(i in e.ajaxSettings)void 0===s[i]&&(s[i]=e.ajaxSettings[i]);m(s),s.crossDomain||(u=r.createElement("a"),u.href=s.url,u.href=u.href,s.crossDomain=h.protocol+"//"+h.host!=u.protocol+"//"+u.host),s.url||(s.url=t.location.toString()),(f=s.url.indexOf("#"))>-1&&(s.url=s.url.slice(0,f)),S(s);var c=s.dataType,p=/\?.+=\?/.test(s.url);if(p&&(c="jsonp"),s.cache!==!1&&(n&&n.cache===!0||"script"!=c&&"jsonp"!=c)||(s.url=T(s.url,"_="+Date.now())),"jsonp"==c)return p||(s.url=T(s.url,s.jsonp?s.jsonp+"=?":s.jsonp===!1?"":"callback=?")),e.ajaxJSONP(s,a);var P,d=s.accepts[c],g={},b=function(t,e){g[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(s.url)?RegExp.$1:t.location.protocol,N=s.xhr(),O=N.setRequestHeader;if(a&&a.promise(N),s.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",d||"*/*"),(d=s.mimeType||d)&&(d.indexOf(",")>-1&&(d=d.split(",",2)[0]),N.overrideMimeType&&N.overrideMimeType(d)),(s.contentType||s.contentType!==!1&&s.data&&"GET"!=s.type.toUpperCase())&&b("Content-Type",s.contentType||"application/x-www-form-urlencoded"),s.headers)for(o in s.headers)b(o,s.headers[o]);if(N.setRequestHeader=b,N.onreadystatechange=function(){if(4==N.readyState){N.onreadystatechange=j,clearTimeout(P);var t,n=!1;if(N.status>=200&&N.status<300||304==N.status||0==N.status&&"file:"==C){if(c=c||w(s.mimeType||N.getResponseHeader("content-type")),"arraybuffer"==N.responseType||"blob"==N.responseType)t=N.response;else{t=N.responseText;try{t=E(t,c,s),"script"==c?(1,eval)(t):"xml"==c?t=N.responseXML:"json"==c&&(t=l.test(t)?null:e.parseJSON(t))}catch(r){n=r}if(n)return x(n,"parsererror",N,s,a)}y(t,N,s,a)}else x(N.statusText||null,N.status?"error":"abort",N,s,a)}},v(N,s)===!1)return N.abort(),x(null,"abort",N,s,a),N;var A="async"in s?s.async:!0;if(N.open(s.type,s.url,A,s.username,s.password),s.xhrFields)for(o in s.xhrFields)N[o]=s.xhrFields[o];for(o in g)O.apply(N,g[o]);return s.timeout>0&&(P=setTimeout(function(){N.onreadystatechange=j,N.abort(),x(null,"timeout",N,s,a)},s.timeout)),N.send(s.data?s.data:null),N},e.get=function(){return e.ajax(C.apply(null,arguments))},e.post=function(){var t=C.apply(null,arguments);return t.type="POST",e.ajax(t)},e.getJSON=function(){var t=C.apply(null,arguments);return t.dataType="json",e.ajax(t)},e.fn.load=function(t,n,r){if(!this.length)return this;var a,i=this,o=t.split(/\s/),u=C(t,n,r),f=u.success;return o.length>1&&(u.url=o[0],a=o[1]),u.success=function(t){i.html(a?e("<div>").html(t.replace(s,"")).find(a):t),f&&f.apply(i,arguments)},e.ajax(u),this};var N=encodeURIComponent;e.param=function(t,n){var r=[];return r.add=function(t,n){e.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(N(t)+"="+N(n))},O(r,t,n),r.join("&").replace(/%20/g,"+")}}(e),function(t){t.fn.serializeArray=function(){var e,n,r=[],i=function(t){return t.forEach?t.forEach(i):void r.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(r,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(t(o).val())}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(e),function(){try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;t.getComputedStyle=function(t,e){try{return n(t,e)}catch(r){return null}}}}(),e});
Number.parseInt = window.parseInt;
Number.parseFloat = window.parseFloat;
Number.isNaN = window.isNaN;
var app={
  exchange: 0,
  set_exchange: function (exchange) {
    this.exchange = exchange.rates['CNY'];
    app.react_callback();
  },
  itemKinds: [{
    id: 0,
    name: '漫画单行本/小说/大型本/画集写真',
  },{
    id: 1,
    name: '杂志',
  },{
    id: 2,
    name: 'DVD/CD/BD/光盘游戏',
  },{
    id: 3,
    name: '玩具、模型',
  },{
    id: 99,
    name: '其他',
  }],
  generalPrices: {
    'EMS': function (weight) {
      'use strict';
      if(weight<=500)
        return 1400;
      if(weight<=600)
        return 1540;
      if(weight<=700)
        return 1680;
      if(weight<=800)
        return 1820;
      if(weight<=900)
        return 1960;
      if(weight<=1000)
        return 2100;
      if(weight<=1250)
        return 2400;
      if(weight<=1500)
        return 2700;
      if(weight<=1750)
        return 3000;
      if(weight<=5500){
        var singlePrice = [3300,3800,4300,4800,5300,5800,6300,6800];
        return singlePrice[Math.ceil(weight/500)-4];
      }
      if(weight<=30000){
        var singlePrice = [7300,8100,8900,9700,10500,11300,12100,12900
          ,13700,14500,15300,16100,16900,17700,18500,19300,20100,20900,21700,22500,23300,24100,24900,25700,26500];
        return singlePrice[Math.ceil(weight/1000)-6];
      }
    },
    'SAL': function (weight) {
      var singlePrice = [1800,2400,3000,3600,4200,4700,5200,5700,6200,6700
        ,7000,7300,7600,7900,8200,8500,8800,9100,9400,9700,10000,10300,10600
        ,10900,11200,11500,11800,12100,12400,12700]
      return singlePrice[Math.ceil((weight == 0 ? 1 : weight)/1000)-1];
    },
    'AIR': function (weight) {
      'use strict';
      if(weight<=10000){
        var singlePrice=[1700,2050,2400,2750,3100,3450,3800,4150,4500
          ,4850,5150,5450,5750,6050,6350,6650,6950,7250,7550,7850];
        return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/500)-1]
      }
      var singlePrice=[8250,8650,9050,9450,9850,10250,10650,11050,11450
        ,11850,12250,12650,13050,13450,13850,14250,14650,15050,15450,15850];
      return singlePrice[Math.ceil(weight/1000)-11];
    },
    'mSAL': function (weight) {
      'use strict';
      var singlePrice = [160,240,320,400,480,560,640,720,800,880,960,1040,1120,1200,1280,1360,1440,1520,1600,1680];
      return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/100)-1];
    },
    'mAIR': function (weight) {
      'use strict';
      if(weight<=1000){
        var singlePrice = [120,190,260,330,400,470,540,610,680,750,820,890,960,1030,1100,1170,1240,1310,1380,1450];
        return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/50)-1];
      }
      var singlePrice = [1625,1800,1975,2150];
      return singlePrice[Math.ceil(weight/250)-5];
    },
    'SHIP': function (weight) {
      'use strict';
      var singlePrice = [1600,1900,2200,2500,2800,3100,3400,3700,4000,4300,4550,4800,5050,5300,5550,5800,6050,6300,6550,6800,7050,7300,7550,7800,8050,8300,8550,8800,9050,9300];
      return singlePrice[Math.ceil((weight <= 0 ? 1 : weight)/1000)-1];
    }
  },
  shoppingSite: [{
    id: 0,
    name: '萌购',
    itemremark: '(商品价格* 8%（+日本国内运费）)* 支付宝汇率[1] + 代购手续费 0%~6%',
    itemprice: function (price) {
      return Math.ceil(price*1.08*app.exchange*1.03);
    },
    japanShipmentPrice: function (shipment) {
      return Math.ceil(shipment*app.exchange*1.03);
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value) : 0;
      },
      is_rmb: true,
    }],
    //重量计算
    weightCalc: function (weight) {
      return Math.ceil(weight/50)*50;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      if(weight<=3000)
        return 300;
      return weight*0.1;
    },
    methods: [{
      id: 0,
      name: '萌购团发',
      price: function (weight,itemKind) {
        //设定单价
        var singlePrice = [3,2.5,3,3];
        singlePrice[99] = 5;

        return Math.ceil(Math.ceil(weight/50)*singlePrice[itemKind]);
      },
      remark: '物品重量/50g*团发单价',
      chinaMethod: [{

      }],
      total: function (items) {
        var that = this;//萌购团发对象
        return items.reduce(function (previous,current) {
          return previous + that.price(current.weight,current.itemKind);
        },0);
      },
      no_wrapper: true,
    },{
      id: 1,
      name: '萌购直发（EMS）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[0].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['EMS'](weight)*app.exchange*1.03);
      },
      remark: '日本邮政EMS价格*支付宝汇率',
    },{
      id: 2,
      name: '萌购直发（SAL）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return Math.ceil(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 3,
      name: '萌购直发（AIR）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return Math.ceil(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 4,
      name: '萌购国际小包',
      price: function (weight) {
        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        if(weight<=500){
          return 30;
        }
        return Math.ceil((weight-500)/100)*5+30;
      },
      remark: '萌购国际小包价格'
    },{
      id: 5,
      name: '香港邮政E特快',
      price: function (weight) {
        //设定单价
        var singlePrice = [60,85,110,135,160,185,210,235,260,285,310,335,360];

        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return singlePrice[(Math.ceil((weight<=500 ? 501 : weight)/500)-2)];
      },
      remark: '萌购E特快价格'
    }],
    accordings: [{
      key: '费用构成/代购手续费',
      value: 'http://www.030buy.net/help/article?article_id=31',
      newWindow: true
    },{
      key: '团发运费',
      value: 'http://www.030buy.net/help/article?article_id=30',
      newWindow: true
    },{
      key: '重量计算/包装重量计算 [2]',
      value: 'http://www.030buy.cc/help/article?article_id=34',
      newWindow: true
    }]
  },{                                                                        // 030buy end masadora start
    id: 1,
    name: '玛莎多拉',
    itemremark: '(商品价格*8%(+日本国内运费)+ 手续费(+2%保价费))* 支付宝汇率[1]',
    itemprice: function (price) {
      return Math.ceil(price*1.08*app.exchange*1.03);
    },
    japanShipmentPrice: function (shipment) {
      return Math.ceil(shipment*app.exchange*1.03);
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value)*app.exchange*1.03 : 0;
      },
      is_rmb: false,
    },{
      id: 1,
      name: '保价费',
      default_value: false,
      input_type: 'checkbox',
      input_calc: function (elem,item) {
        return elem.checked ? Math.ceil(item.price*0.02)*app.exchange*1.03 : 0;
      },
      is_rmb: false,
    }],
    //重量计算
    weightCalc: function (weight) {
      return Math.ceil(weight/50)*50;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      if(weight<=1000)
        return 200;
      return weight*0.2;
    },
    methods: [{
      id: 0,
      name: '玛莎直发拼团',
      price: function (weight,itemKind) {
        return 0;
      },
      otherType: 'text',
      other_input_calc: function (elem,item) {
        return Number.parseFloat(elem.value)*Math.ceil(item.weight/50);
      },
      otherUnit: '元/50g',
      remark: '物品重量*直发拼团单价',
      chinaMethod: [{

      }],
      no_wrapper: true,
    },{
      id: 1,
      name: '玛莎直发（EMS）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);//1 is masadora's id
        return Math.ceil(app.generalPrices['EMS'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政EMS价格*1.1包装手续费*支付宝汇率',
    },{
      id: 2,
      name: '玛莎直发（SAL）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);//1 is masadora's id
        return Math.ceil(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 3,
      name: '玛莎直发（AIR航空便）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 4,
      name: '玛莎直发（SAL小型包裹）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['mSAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政小型包裹SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 5,
      name: '玛莎直发（AIR小型包裹）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['mAIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: '日本邮政小型包裹AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 6,
      name: '玛莎直发（海运）',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[1].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['SHIP'](weight)*1.2*app.exchange*1.03);
      },
      remark: '海运*1.2包装手续费*支付宝汇率',
    }],
    accordings: [{
      key: '费用构成/包装手续费',
      value: 'http://www.masadora.net/help/%E8%B4%AD%E7%89%A9%E6%8C%87%E5%8D%97-%E8%B4%B9%E7%94%A8%E6%9E%84%E6%88%90.htm',
      newWindow: true
    },{
      key: '重量计算/包装重量计算 [3]',
      value: 'http://www.masadora.net/help/%E5%8F%91%E9%80%81%E8%AF%B4%E6%98%8E-%E5%8F%91%E9%80%81%E6%96%B9%E5%BC%8F.htm',
      newWindow: true
    }]
  },{                                                                          //masadora end 任你购start
    id: 2,
    name: '任你购',
    itemremark: '(商品价格* 8%（+日本国内运费）)* 支付宝汇率[1] (+ 代购手续费 5%)',
    itemprice: function (price) {
      return Math.ceil(price*1.08*app.exchange*1.03);
    },
    japanShipmentPrice: function (shipment) {
      return Math.ceil(shipment*app.exchange*1.03);
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value) : 0;
      },
      is_rmb: true,
    }],
    //重量计算
    weightCalc: function (weight) {
      return Math.ceil(weight/50)*50;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      if(weight<=3000)
        return 300;
      return weight*0.1;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['EMS'](weight)*app.exchange*1.03);
      },
      remark: 'EMS价格*支付宝汇率',
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.03);
      },
      remark: 'SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.03);
      },
      remark: 'AIR价格*1.1包装手续费*支付宝汇率',
    },{
      id: 3,
      name: '萌购国际小包',
      price: function (weight) {
        weight += app.shoppingSite[2].wrapperCalc(weight);
        if(weight<=500){
          return 30;
        }
        return Math.ceil((weight-500)/100)*5+30;
      },
      remark: '萌购国际小包价格'
    },{
      id: 4,
      name: '香港邮政E特快',
      price: function (weight) {
        //设定单价
        var singlePrice = [60,85,110,135,160,185,210,235,260,285,310,335,360];

        weight += app.shoppingSite[0].wrapperCalc(weight);//0 is 030buy's id
        return singlePrice[(Math.ceil((weight<=500 ? 501 : weight)/500)-2)];
      },
      remark: '萌购E特快价格'
    },{
      id: 5,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil((app.generalPrices['mSAL'](weight)+200)*app.exchange*1.03);
      },
      remark: '小型包裹SAL价格*1.1包装手续费*支付宝汇率',
    },{
      id: 6,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[2].wrapperCalc(weight);
        return Math.ceil((app.generalPrices['mAIR'](weight)+200)*app.exchange*1.03);
      },
      remark: '小型包裹AIR价格*1.1包装手续费*支付宝汇率',
    }],
    accordings: [{
      key: '费用构成/代购手续费',
      value: 'http://rennigou.jp/help/01_03',
      newWindow: true
    }],
  },{                                                                                         //任你购end 2poi start
    id: 3,
    name: '2poi',
    itemremark: '(商品价格* 8%（+日本国内运费）)* 汇率*1.04（国际结算手续费）(+代购手续费 5%)',
    itemprice: function (price) {
      return Math.ceil(price*1.08*app.exchange*1.04);
    },
    japanShipmentPrice: function (shipment) {
      return Math.ceil(shipment*app.exchange*1.04);
    },
    otherBuyFees: [{
      id: 0,
      name: '代购手续费',
      input_type: 'text',
      input_calc: function (elem) {
        return Number.parseInt(elem.value) ? Number.parseInt(elem.value) : 0;
      },
      is_rmb: true,
    }],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['EMS'](weight)*app.exchange*1.04*1000)/1000;//处理总体以日元结算的费用时，精确到小数点后3位
      },
      remark: 'EMS价格*汇率*1.04（国际结算手续费）',
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['SAL'](weight)*1.1*app.exchange*1.04*1000)/1000;
      },
      remark: 'SAL价格*1.1包装手续费*汇率*1.04（国际结算手续费）',
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['AIR'](weight)*1.1*app.exchange*1.04*1000)/1000;
      },
      remark: 'AIR价格*1.1包装手续费*汇率*1.04（国际结算手续费）',
    },{
      id: 3,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round((app.generalPrices['mSAL'](weight)+200)*app.exchange*1.04*1000)/1000;
      },
      remark: '（小型包裹SAL价格+200日元）*汇率*1.04（国际结算手续费）',
    },{
      id: 4,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round((app.generalPrices['mAIR'](weight)+200)*app.exchange*1.04*1000)/1000;
      },
      remark: '（小型包裹AIR价格+200日元）*汇率*1.04（国际结算手续费）',
    }],
    accordings: [{
      key: '费用构成/代购手续费/国际结算手续费',
      value: 'http://2poi.jp/help/02_03',
      newWindow: true
    },{
      key: '2poi备注',
      value: '#according-4'
    }],
  },{                                                                                         //2poi end fromJapan start
    id: 4,
    name: 'fromJapan',
    itemremark: '（商品价格*8%（+日本国内运费）)*汇率[5]*1.05（系统使用费）',
    itemprice: function (price) {
      return Math.round(price*1.08*app.exchange*1.05*1000)/1000;
    },
    japanShipmentPrice: function (shipment) {
      return Math.round(shipment*app.exchange*1.05*1000)/1000;
    },
    otherBuyFees: [],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['EMS'](weight)*app.exchange*1.05*1000)/1000;
      },
      remark: 'EMS价格*1.05（系统使用费）',
    },{
      id: 1,
      name: 'SAL',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['SAL'](weight)*app.exchange*1.05*1000)/1000;
      },
      remark: 'SAL价格*1.05（系统使用费）',
    },{
      id: 2,
      name: 'AIR',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['AIR'](weight)*app.exchange*1.05*1000)/1000;
      },
      remark: 'AIR价格*1.05（系统使用费）',
    },{
      id: 3,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['mSAL'](weight)*app.exchange*1.05*1000)/1000;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return Math.round(410*app.exchange*1.05*1000)/1000;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹SAL价格*1.05（系统使用费）',
    },{
      id: 4,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['mAIR'](weight)*app.exchange*1.05*1000)/1000;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return Math.round(410*app.exchange*1.05*1000)/1000;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹AIR价格*1.05（系统使用费）',
    }],
    accordings: [{
      key: '费用构成',
      value: 'http://www.fromjapan.co.jp/cn/title/charge',
      newWindow: true
    },{
      key: 'fromJapan备注',
      value: '#according-6'
    }],
  },{                                                                                         //fromJapan end cdJapan start
    id: 5,
    name: 'cdJapan',
    itemremark: '商品价格*汇率[5]',
    itemprice: function (price) {
      return Math.round(price*app.exchange*1000)/1000;
    },
    japanShipmentPrice: function (shipment) {
      return Math.round(shipment*app.exchange*1000)/1000;
    },
    otherBuyFees: [],
    //重量计算
    weightCalc: function (weight) {
      return weight;
    },
    //包装计算器
    wrapperCalc: function (weight) {
      return 0;
    },
    methods: [{
      id: 0,
      name: 'EMS',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['EMS'](weight)*app.exchange*1000)/1000;
      },
      remark: 'EMS价格',
    },{
      id: 1,
      name: 'SAL小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['mSAL'](weight)*app.exchange*1000)/1000;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return Math.round(410*app.exchange*1000)/1000;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹SAL价格',
    },{
      id: 2,
      name: 'AIR小型包裹',
      price: function (weight) {
        //包装计算
        weight += app.shoppingSite[3].wrapperCalc(weight);
        return Math.round(app.generalPrices['mAIR'](weight)*app.exchange*1000)/1000;
      },
      otherType: 'checkbox',//410日元挂号服务
      other_input_calc: function (elem,item) {
        if(elem.checked)
          return Math.round(410*app.exchange*1000)/1000;
        return 0;
      },
      otherUnit: '410日元挂号服务',
      remark: '小型包裹AIR价格',
    }],
    accordings: [{
      key: '运费计算',
      value: 'http://www.cdjapan.co.jp/guide/help/shipping/shipping_charge',
      newWindow: true
    },{
      key: 'cdJapan备注',
      value: '#according-7'
    }],
  }],                                                                       //shoppingSite end
  remarks: [{
    id: 1,
    words: '支付宝汇率：萌购与玛莎使用支付宝平台转换日元并以日元结算，支付宝需要支付3%国际结算手续费，即汇率*1.03，由于本站汇率实时更新，可能会与支付宝汇率相差0.5%',
    link:'https://global.alipay.com/product/websitepayment.htm'
  },{
    id: 2,
    words: '包装重量：萌购与玛莎与一些代购平台打包后会重新称重，并使用包装重量计算，此工具已计入包装重量'
  },{
    id: 3,
    words: '玛莎多拉的包装计算方式为：少于1000g为200g，大于1000g为20%'
  },{
    id: 4,
    words: '2poi的虎穴无代购手续费与日本国内运费，其他网站代购手续费正实行免费，代购手续费一栏可以保持为0。2poi的重量计算为实际重量计算，因此，包裹的重量为实际重量，实际的2poi国际运费会比计算器中的费用略大，请知悉。'
  },{
    id:5,
    words: '汇率：银行卡汇率，各银行不同（即时购汇），使用信用卡支付时也有可能会被银行收取货币转换费，计算器使用的汇率为当前实时汇率，因此可能会比真实费用少，请向发卡行咨询更多信息。'
  },{
    id: 6,
    words: 'fromJapan计算重量为实际重量，计算器所算得包裹重量与运费未计入包装。fromJapan存在会员等级折扣，由FJ点数支付的部分也免除5%系统使用费，暂时未提供计算。'
  },{
    id: 7,
    words: 'cdJapan计算重量为实际重量，包装重量约为30~100g。cdJapan的小型SAL与AIR与实际付款可能存在50日元+的误差，请以官方计算器为准。'
  },{
    id:8,
    words: '此发送方式还需要支付国内运费，暂时无法将国内运费加入比较，请等待版本更新。',
  },{
    id: 9,
    words: '除团发以外的直邮方法均有可能会被海关收税，请您参阅。'
  },{
    id:9,
    words: '此计算器数值仅供参考，并非代表真实价格，可能存在不可抗力的费用或是计算误差等。'
  }],
  cart:[],
};

app.ajax_load_exchange = function () {
  return $.ajax({
    url: 'https://api.fixer.io/latest?base=JPY&symbols=CNY',
    dataType: 'jsonp',
    jsonpCallback: 'app.set_exchange',
    timeout: 5000,
  });
};
