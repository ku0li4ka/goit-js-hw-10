import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as y,i as u}from"./assets/vendor-431c4315.js";const f=document.getElementById("datetime-picker"),o=document.getElementById("data-start"),g=document.querySelector("[data-days]"),T=document.querySelector("[data-hours]"),p=document.querySelector("[data-minutes]"),E=document.querySelector("[data-seconds]");function n(e){return e<10?`0${e}`:e}function D(e){const r=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:l,minutes:m,seconds:h}}function d(e){g.textContent=n(e.days),T.textContent=n(e.hours),p.textContent=n(e.minutes),E.textContent=n(e.seconds)}function C(e){return e.getTime()>Date.now()}const i=y(f,{enableTime:!0,time_24hr:!0,minuteIncrement:1,onClose:function(e){const t=e[0];t&&C(t)?o.disabled=!1:(o.disabled=!0,u.error({title:"Error",message:"Please choose a date in the future"}))}});o.addEventListener("click",()=>{const e=i.selectedDates[0];o.disabled=!0,i.destroy();const t=e.getTime(),c=setInterval(()=>{const a=Date.now(),s=t-a;if(s<=0)clearInterval(c),d({days:0,hours:0,minutes:0,seconds:0}),u.success({title:"Countdown Finished",message:"The countdown has ended!"});else{const r=D(s);d(r)}},1e3)});
//# sourceMappingURL=commonHelpers.js.map
