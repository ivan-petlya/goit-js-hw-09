!function(){var t=document.querySelector("body"),o=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;o.addEventListener("click",(function(){n=setInterval((function(){o.disabled=!0;var e="#".concat(Math.floor(16777215*Math.random()).toString(16));t.style.backgroundColor=e,console.log('new color set, button "start" disabled')}),1e3)})),e.addEventListener("click",(function(){clearInterval(n),o.disabled=!1,console.log('change color stop, button "sart" is active again')}))}();
//# sourceMappingURL=01-color-switcher.5c2eab17.js.map
