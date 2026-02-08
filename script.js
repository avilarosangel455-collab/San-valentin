const screens={
  start:startScreen=document.getElementById("startScreen"),
  quiz:quizScreen=document.getElementById("quizScreen"),
  envelope:envelopeScreen=document.getElementById("envelopeScreen"),
  final:finalScreen=document.getElementById("finalScreen")
};

const question=document.getElementById("question");
const options=document.getElementById("options");
const message=document.getElementById("message");
const music=document.getElementById("music");
const correctSound=document.getElementById("correctSound");
const card=document.querySelector(".card");
const startText=document.getElementById("startText");

/* SHOW */
function show(screen){
  Object.values(screens).forEach(s=>s.classList.add("hidden"));
  screens[screen].classList.remove("hidden");
}

/* MUSIC AUTOPLAY */
window.addEventListener("load",()=>{
  music.volume=0.35;
  music.play().catch(()=>{
    document.addEventListener("click",()=>music.play(),{once:true});
  });
});

/* HEARTS */
setInterval(()=>{
  for(let i=0;i<3;i++){
    const h=document.createElement("div");
    h.className="heart";
    h.style.left=Math.random()*innerWidth+"px";
    h.style.animationDuration=6+Math.random()*6+"s";
    hearts.appendChild(h);
    setTimeout(()=>h.remove(),14000);
  }
},400);

/* TYPE */
function typeText(el,text,speed=40,cb){
  el.textContent="";
  let i=0;
  const t=setInterval(()=>{
    el.textContent+=text[i];
    i++;
    if(i>=text.length){
      clearInterval(t);
      cb && cb();
    }
  },speed);
}

/* QUIZ */
const quiz=[
 {q:"¿Cuál es nuestra canción?",o:[
  "Mon Laferte - Amárrame",
  "Olivia Dean - So Easy (To Fall in Love)",
  "Phillip Phillips - Gone Gone Gone"],
  a:"Olivia Dean - So Easy (To Fall in Love)"},
 {q:"¿Dónde fue nuestro primer beso?",o:["Casa de Fer","Universidad","Casa de Yari"],a:"Casa de Fer"},
 {q:"¿En que mes nos hicimos novios?",o:["Enero","Octubre","Diciembre"],a:"Diciembre"}
];

let i=0;

function load(){
  options.innerHTML="";
  message.textContent="";
  typeText(question,quiz[i].q,35,()=>{
    quiz[i].o.forEach(op=>{
      const b=document.createElement("button");
      b.textContent=op;
      b.onclick=()=>check(op);
      options.appendChild(b);
    });
  });
}

function check(op){
  if(op===quiz[i].a){
    correctSound.currentTime=0;
    correctSound.play();
    message.textContent="Correcto mi vida, 1,000 besos de regalo💖";
    setTimeout(()=>{
      i++;
      i<quiz.length ? load() : valentine();
    },800);
  }else{
    message.textContent="Grosero que inservible (INVINCIBLE REFERENCIA) 💕";
    card.classList.add("shake");
    setTimeout(()=>card.classList.remove("shake"),300);
  }
}

/* VALENTINE */
function valentine(){
  message.textContent = "";   // ← ESTA LÍNEA ES LA CLAVE
  options.innerHTML="";

  typeText(question,"¿Do you want to be my Valentine? 💘",35,()=>{
    const yes=document.createElement("button");
    yes.textContent="YES 💖";
    yes.onclick=()=>show("envelope");

    const no=document.createElement("button");
    no.textContent="NO ";
    no.onmouseenter=()=>move(no);

    options.append(yes,no);
  });
}


function move(el){
  el.style.position="absolute";
  el.style.left=Math.random()*(innerWidth-150)+"px";
  el.style.top=Math.random()*(innerHeight-80)+"px";
}

/* START */
startBtn.onclick=()=>{
  show("quiz");
  load();
};

typeText(startText,"Hola mi vidaa, te tengo una pequeña sorpresa",50);

/* ENVELOPE FIX */
let opened=false;
envelope.onclick=()=>{
  if(opened) return;
  opened=true;
  envelope.classList.add("open");
};

finalBtn.onclick=()=>show("final");

