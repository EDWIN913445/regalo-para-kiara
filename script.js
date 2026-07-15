"use strict";
const welcome=document.querySelector("#welcome");
const site=document.querySelector("#site");
const openGift=document.querySelector("#openGift");
const musicButton=document.querySelector("#musicButton");
const shareButton=document.querySelector("#shareButton");
const finalButton=document.querySelector("#finalButton");
const finalMessage=document.querySelector("#finalMessage");
const hearts=document.querySelector("#hearts");

let player=null;
let playerReady=false;
let pendingPlay=false;
let musicPlaying=false;

window.onYouTubeIframeAPIReady=function(){
  player=new YT.Player("youtubePlayer",{
    videoId:"YwodhCjFbQ8",
    playerVars:{playsinline:1,rel:0,modestbranding:1,loop:1,playlist:"YwodhCjFbQ8"},
    events:{
      onReady:()=>{playerReady=true;player.setVolume(62);if(pendingPlay)playMusic();},
      onStateChange:(event)=>{
        musicPlaying=event.data===YT.PlayerState.PLAYING;
        musicButton.textContent=musicPlaying?"âšâš":"â™«";
        musicButton.classList.toggle("is-muted",!musicPlaying);
      }
    }
  });
};

function burst(amount=28){
  const symbols=["ðŸ’—","ðŸ’–","ðŸ’•","â™¥","âœ¨"];
  for(let i=0;i<amount;i++){
    const h=document.createElement("span");
    h.className="heart";
    h.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    h.style.left=Math.random()*100+"%";
    h.style.fontSize=16+Math.random()*28+"px";
    h.style.animationDuration=4+Math.random()*5+"s";
    h.style.animationDelay=Math.random()*.8+"s";
    hearts.appendChild(h);
    setTimeout(()=>h.remove(),10000);
  }
}

function playMusic(){
  if(!playerReady){pendingPlay=true;return;}
  pendingPlay=false;
  player.setVolume(62);
  player.playVideo();
}

openGift.addEventListener("click",()=>{
  site.hidden=false;
  observeReveal();
  playMusic();
  burst(38);
  welcome.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(1.04)"}],{duration:650,fill:"forwards"});
  setTimeout(()=>{welcome.remove();document.documentElement.scrollTop=0;},620);
});

musicButton.addEventListener("click",()=>{
  if(!playerReady){pendingPlay=true;return;}
  if(musicPlaying){player.pauseVideo();}else{player.playVideo();}
});

shareButton.addEventListener("click",async()=>{
  const data={title:"Para Kiara ðŸ’—",text:"AbrÃ­ este regalo que viajÃ³ desde PerÃº hasta Argentina.",url:location.href};
  try{if(navigator.share){await navigator.share(data)}else{await navigator.clipboard.writeText(location.href);shareButton.textContent="Enlace copiado";setTimeout(()=>shareButton.textContent="Compartir",1800)}}catch{}
});

finalButton.addEventListener("click",()=>{
  finalMessage.hidden=false;
  finalButton.textContent="Nos veremos en Argentina ðŸ‡¦ðŸ‡·";
  burst(55);
  finalMessage.scrollIntoView({behavior:"smooth",block:"center"});
});

function observeReveal(){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.13});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}
setInterval(()=>{if(!site.hidden)burst(1)},1800);
