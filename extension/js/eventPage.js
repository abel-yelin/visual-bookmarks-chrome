!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=9)}({0:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e){var t="";switch(e.name){case"QuotaExceededError":t="QuotaExceededError";break;case"NotFoundError":t="NotFoundError";break;case"SecurityError":t="SecurityError";break;case"InvalidModificationError":t="InvalidModificationError";break;case"InvalidStateError":t="InvalidStateError";break;default:t="Unknown Error"}console.error(t)}var t=null;return{init:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500,r=arguments[1];navigator.webkitPersistentStorage.requestQuota(1048576*n,function(n){window.webkitRequestFileSystem(window.PERSISTENT,n,function(e){t=e,r&&r()},e)},e)},usedAndRemaining:function(e){navigator.webkitPersistentStorage.queryUsageAndQuota(function(t,n){e&&e(t,n)})},createDir:function(n,r){t.root.getDirectory(n,{create:!0},function(e){r&&r(e)},e)},getDir:function(n,r){t.root.getDirectory(n,{},function(e){r&&r(e)},e)},deleteDir:function(n,r,o){var r=r||{};void 0===r.recursive&&(r.recursive=!1),t.root.getDirectory(n,{},function(t){r.recursive?t.removeRecursively(function(){o&&o()},e):t.remove(function(){o&&o()},e)},e)},createFile:function(e,n,r){t.root.getFile(e,{create:!0},function(e){e.createWriter(function(t){t.onwriteend=function(){r&&r(e)},t.onerror=function(e){console.log(e)};var o=new Blob([n.file],{type:n.fileType});t.write(o)})})},deleteFile:function(n,r){t.root.getFile(n,{create:!1},function(t){t.remove(function(){r&&r()},e)},e)},purge:function(){t.root.createReader().readEntries(function(t){for(var n,r=0;n=t[r];++r)n.isDirectory?n.removeRecursively(function(){},e):n.remove(function(){},e);console.info("Local storage emptied.")},e)}}}();t.default=r},1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={transitionEnd:function(){var e={transition:"transitionend",webkitTransition:"webkitTransitionEnd"},t=document.createElement("fake");for(var n in e)if(void 0!==t.style[n])return e[n];return!1},debounce:function(e,t,n){var r=null;return function(){var o=this,i=arguments,c=function(){r=null,n||e.apply(o,i)},a=n&&!r;clearTimeout(r),r=setTimeout(c,t),a&&e.apply(o,i)}},trigger:function(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!1),t.dispatchEvent(n)},templater:function(e,t){return e.replace(/\{(.*?)\}/g,function(e,n){return t[n]||""})},notifications:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5e3;window.timerNotice&&(chrome.notifications.clear(e),clearTimeout(window.timerNotice)),chrome.notifications.create(e,{type:"basic",iconUrl:"icons/icon128.png",title:"Visual bookmarks",message:e},function(){window.timerNotice=setTimeout(function(){chrome.notifications.clear(e)},t)})},imageLoaded:function(e,t){var n=new Image;n.onload=function(){t.done&&t.done(e)},n.onerror=function(){t.fail&&t.fail(e)},n.src=e},base64ToBlob:function(e,t,n){for(var r=e,o=t||"",i=atob(r.split(",")[1]),c=(r.split(",")[0].split(":")[1].split(";")[0],new ArrayBuffer(i.length)),a=new Uint8Array(c),u=0;u<i.length;u++)a[u]=i.charCodeAt(u);var f=new Blob([c],{type:o});return n?n(f):f},resizeScreen:function(e,t){var n=new Image;n.onload=function(){300<n.height&&(n.width*=300/n.height,n.height=300);var e=document.createElement("canvas"),r=e.getContext("2d");e.width=n.width,e.height=n.height,r.drawImage(n,0,0,n.width,n.height),t(e.toDataURL("image/jpg"))},n.src=e},rand:function(e,t){return Math.round(e-.5+Math.random()*(t-e+1))},getDomain:function(e){return e.replace(/https?:\/\/(www.)?/i,"").replace(/\/.*/i,"")}}},9:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){var n={url:e,focused:!1,left:1e5,top:1e5,width:1,height:1,type:"popup"},r=void 0,o=!1;chrome.windows.create(n,function(e){function n(){if(1==o)return clearTimeout(i),!1;chrome.tabs.get(r.id,function(r){"complete"==r.status?setTimeout(function(){chrome.tabs.captureVisibleTab(e.id,function(n){t({capture:n,title:r.title}),clearTimeout(i);try{chrome.windows.remove(e.id)}catch(e){}})},300):setTimeout(function(){n()},500)})}if(!e.tabs||!e.tabs.length)return chrome.windows.remove(e.id),console.error("not found page"),!1;r=e.tabs[0],chrome.tabs.update(r.id,{muted:!0});try{chrome.tabs.executeScript(r.id,{code:'document.addEventListener("DOMContentLoaded", function(){document.body.style.overflow = "hidden";});',runAt:"document_start"})}catch(e){console.warn(e)}var i=setTimeout(function(){chrome.windows.remove(e.id),t({error:"long_load",url:r.url}),o=!0},15e3);chrome.windows.update(e.id,{width:1170,height:720,top:1e5,left:1e5},function(){n()})})}var i=n(0),c=r(i),a=n(1),u=r(a);c.default.init(500),chrome.runtime.onMessage.addListener(function(e,t,n){if(e.captureUrl)return o(e.captureUrl,function(t){if(t&&t.error){try{n({warning:"Timeout waiting for a screenshot"})}catch(e){}return console.warn("Timeout waiting for a screenshot "+t.url),!1}u.default.resizeScreen(t.capture,function(t){var r=u.default.base64ToBlob(t,"image/jpg"),o=u.default.getDomain(e.captureUrl)+"_"+e.id+".jpg";c.default.createDir("images",function(t){c.default.createFile(t.fullPath+"/"+o,{file:r,fileType:r.type},function(t){var r=JSON.parse(localStorage.getItem("custom_dials"));r[e.id]=t.toURL(),localStorage.setItem("custom_dials",JSON.stringify(r)),console.info("Image file saved as "+t.toURL());try{n(t.toURL())}catch(e){}})})})}),!0}),chrome.browserAction.onClicked.addListener(function(e){var t=[chrome.extension.getURL("newtab.html"),"chrome://newtab/"];chrome.tabs.query({currentWindow:!0},function(e){for(var n,r=0;n=e[r];r++)if(n.url&&~t.indexOf(n.url))return chrome.tabs.update(n.id,{active:!0});return chrome.tabs.create({url:chrome.extension.getURL("newtab.html")})})})}});