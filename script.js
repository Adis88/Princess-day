(() => {
  const screens = [...document.querySelectorAll(".screen")];
  const stars = document.getElementById("stars");
  let audio = null, soundOn = false;

  for (let i=0;i<36;i++) {
    const s=document.createElement("span"); s.className="star"; s.textContent=i%3===0?"✧":"·";
    s.style.left=Math.random()*100+"%"; s.style.top=Math.random()*100+"%";
    s.style.setProperty("--t",(2+Math.random()*4)+"s"); s.style.setProperty("--d",(-Math.random()*5)+"s");
    stars.appendChild(s);
  }
  function go(id) {
    screens.forEach(el=>{const active=el.id===id;el.classList.toggle("active",active);el.setAttribute("aria-hidden",String(!active));});
    window.scrollTo({top:0,behavior:"smooth"});
    if(id==="final") burstHearts();
  }
  document.querySelectorAll("[data-next]").forEach(btn=>btn.addEventListener("click",()=>go(btn.dataset.next)));
  document.getElementById("again").addEventListener("click",()=>go("welcome"));

  function burstHearts(){
    for(let i=0;i<18;i++){
      const h=document.createElement("span");h.className="heart";h.textContent=i%2?"✧":"♡";
      h.style.left=(8+Math.random()*84)+"vw";h.style.bottom=(-10+Math.random()*12)+"px";
      h.style.fontSize=(13+Math.random()*17)+"px";h.style.animationDelay=(Math.random()*.9)+"s";
      document.body.appendChild(h);setTimeout(()=>h.remove(),5000);
    }
  }
  function chime(freq,delay){
    if(!audio)return;
    const osc=audio.createOscillator(), gain=audio.createGain();
    osc.type="sine";osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,audio.currentTime+delay);
    gain.gain.exponentialRampToValueAtTime(.055,audio.currentTime+delay+.03);
    gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+delay+.65);
    osc.connect(gain);gain.connect(audio.destination);osc.start(audio.currentTime+delay);osc.stop(audio.currentTime+delay+.7);
  }
  const soundBtn=document.getElementById("sound");
  soundBtn.addEventListener("click",()=>{
    soundOn=!soundOn;
    if(soundOn){
      const AudioCtx=window.AudioContext||window.webkitAudioContext;
      if(AudioCtx){audio=audio||new AudioCtx();audio.resume();[523.25,659.25,783.99].forEach((f,i)=>chime(f,i*.16));}
      soundBtn.querySelector("span").textContent="Sound on";
    }else soundBtn.querySelector("span").textContent="Sound off";
  });
})();