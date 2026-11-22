/* ============ EDIT YOUR DETAILS HERE ============ */
const CONFIG = {
  bride: "Isabella", groom: "Desmond",                  // names
  date: "2027-03-20T14:00:00",                          // wedding date & time (local)
  ceremony:  { title:"Ceremony",  time:"2:00 PM", venue:"Buvel Event Hall", address:"Uromi, Edo State, Nigeria" },
  reception: { title:"Reception", time:"5:00 PM", venue:"Buvel Event Hall", address:"Uromi, Edo State, Nigeria" },
  contact: "09121872862",                               // directions/help number (11 digits, edit me)
  dress: "Kindly dress in these colors",
  dressColors: [ // edit: name + exact color (add or remove as needed)
    {name:"Wine Red",hex:"#7F0220"},{name:"Light Sand",hex:"#F6EAD0"},{name:"Champagne Gold",hex:"#C6A56B"}
  ],
  note: "Please arrive about 30 minutes early so we can begin on time. Come with a joyful heart, your prayers, and your best smile. Seats will be arranged for all our guests, and there will be space for photos after the ceremony.",
  message: "With hearts filled with gratitude and joy, we invite you to join us as we celebrate the beginning of a beautiful new chapter. Your presence, prayers, and love will make our special day even more meaningful as we come together to witness the union of two hearts.",
  whatsapp: "2349121872862",                            // events person's number, country code, no + or spaces
  bank: "First Bank", acctName: "Omonlumen Blessed", acctNo: "3214166652",
  music: "",                                            // e.g. "assets/music/song.mp3" (leave "" for none)
  photos: ["assets/couple/1.jpg","assets/couple/2.jpg","assets/couple/3.jpg","assets/couple/4.jpg"],
  portraits: { groom:"assets/groom/groom.jpg", bride:"assets/bride/bride.jpg" },
  story: [
    ["How we met","Our paths crossed in the simplest way, and from the very first conversation, it felt easy and natural. Isabella's warm smile and Desmond's calm kindness made it clear that something special was beginning."],
    ["Our first memorable moment","We still smile about the day we realized we had stopped talking about everything else and could only talk about each other. That was when friendship quietly turned into something deeper."],
    ["The journey","Through busy seasons, small joys, and prayers together, we grew side by side. We learned to listen, to laugh, and to hold each other up, and every step made our love stronger."],
    ["The proposal","Desmond asked the question that changed everything, and Isabella said yes with a heart full of joy. It was a quiet, beautiful moment that we will treasure for the rest of our lives."],
    ["Our forever begins","Now we are ready to start our life together as husband and wife, and we cannot imagine celebrating without the people we love most. Thank you for being part of our story."]
  ]
};
/* ================================================= */
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const D=new Date(CONFIG.date),reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(reduced)document.documentElement.classList.add('reduce');
const ph=t=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'><rect width='300' height='400' fill='#F3EBDD'/><text x='150' y='205' text-anchor='middle' font-family='Georgia' font-size='22' fill='#A88B55'>${t}</text></svg>`);
const safeImg=(img,src,label)=>{img.onerror=()=>{img.onerror=null;img.src=ph(label)};img.src=src};

// bind text
const initials=(CONFIG.bride[0]+" & "+CONFIG.groom[0]).toUpperCase();
const dateLong=D.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
const vals={bride:CONFIG.bride,groom:CONFIG.groom,initials,initialsShort:CONFIG.bride[0].toUpperCase()+CONFIG.groom[0].toUpperCase(),dateLong,dress:CONFIG.dress,note:CONFIG.note,bank:CONFIG.bank,acctName:CONFIG.acctName,acctNo:CONFIG.acctNo};
$$('[data-bind]').forEach(e=>e.textContent=vals[e.dataset.bind]);
$('#message').textContent=CONFIG.message;
document.title=`${CONFIG.bride} & ${CONFIG.groom} — Wedding Invitation`;

// events
const mapQ=a=>encodeURIComponent(a);
$('#events').innerHTML=[CONFIG.ceremony,CONFIG.reception].map(e=>`<div class="card r"><p class="label">${e.title}</p><p class="script big" style="font-size:1.8rem">${e.venue}</p><p>${dateLong.split(',')[0]}, ${e.time}</p><p style="font-size:.9rem">${e.address}</p>
<a class="btn ghost" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${mapQ(e.venue+' '+e.address)}">View Location</a>
<button class="btn ghost mapbtn" data-q="${mapQ(e.venue+' '+e.address)}">Show Map</button><div class="mapbox"></div></div>`).join('');
$('#swatches').innerHTML=CONFIG.dressColors.map(c=>`<div class="sw"><i style="background:${c.hex}"></i><span>${c.name}</span></div>`).join('');
$('#events').onclick=e=>{const b=e.target.closest('.mapbtn');if(!b)return;const box=b.nextElementSibling;
  if(box.firstChild){box.innerHTML='';b.textContent='Show Map';return}
  box.innerHTML=`<iframe loading="lazy" title="Map" src="https://maps.google.com/maps?q=${b.dataset.q}&output=embed"></iframe>`;b.textContent='Hide Map'};

// photos
$$('img[data-src]').forEach(i=>safeImg(i,CONFIG.portraits[i.dataset.src],i.dataset.ph));
const track=$('#track');
CONFIG.photos.forEach((p,i)=>{const d=document.createElement('div');d.className='slide';const im=new Image();im.loading='lazy';im.alt='Photo '+(i+1);safeImg(im,p,'Photo '+(i+1));d.append(im);track.append(d)});
const step=()=>track.clientWidth;
$('#gPrev').onclick=()=>track.scrollBy({left:-step(),behavior:'smooth'});
$('#gNext').onclick=()=>track.scrollBy({left:step(),behavior:'smooth'});
const lb=$('#lightbox');
track.onclick=e=>{const im=e.target.closest('.slide img');if(im){$('img',lb).src=im.src;lb.hidden=false}};
lb.onclick=()=>lb.hidden=true;
addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});

// story accordion
$('#storyList').innerHTML=CONFIG.story.map(([t,b])=>`<div class="item"><button aria-expanded="false">${t}</button><div class="body"><div><p>${b}</p></div></div></div>`).join('');
if(!CONFIG.story.length)$('#story').remove();
$$('.item>button').forEach(b=>b.onclick=()=>{const o=b.parentNode.classList.toggle('open');b.setAttribute('aria-expanded',o)});
$$('[data-toggle]').forEach(b=>b.onclick=()=>{const t=$(b.dataset.toggle);const o=t.classList.toggle('open');b.textContent=o?'Hide details':'Discover the details'});

// contact
$('#contactNum').textContent=CONFIG.contact.replace(/(\d{4})(\d{3})(\d+)/,'$1 $2 $3');
$('#callBtn').href='tel:'+CONFIG.contact;
$('#waBtn').href='https://wa.me/234'+CONFIG.contact.replace(/\D/g,'').replace(/^0/,'')+'?text='+encodeURIComponent('Hello, I am coming for the wedding and need directions.');

// countdown
const pad=(n,l=2)=>String(n).padStart(l,'0');
function tick(){const ms=D-Date.now();
  if(ms<=0){$('#cd').hidden=true;const f=$('#cdDone');f.hidden=false;f.textContent=Date.now()-D<864e5?"Today, our forever begins.":"Thank you for being part of our beautiful day.";return clearInterval(tm)}
  const s=Math.floor(ms/1e3);$('#cdD').textContent=pad(Math.floor(s/86400),3);$('#cdH').textContent=pad(Math.floor(s%86400/3600));$('#cdM').textContent=pad(Math.floor(s%3600/60));$('#cdS').textContent=pad(s%60)}
const tm=setInterval(tick,1000);tick();

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
const observe=()=>$$('.r,.portrait').forEach(e=>io.observe(e));

// particles
const P=$('#particles');
for(let i=0;i<(innerWidth<600?10:18);i++){const e=document.createElement('i');if(i%3==0)e.className='p';
  e.style.cssText=`left:${Math.random()*100}%;--dx:${Math.random()*80-40}px;animation-duration:${12+Math.random()*12}s;animation-delay:${-Math.random()*20}s`;P.append(e)}

// music
const audio=CONFIG.music?new Audio(CONFIG.music):null,mb=$('#musicBtn');
if(audio){audio.loop=true;audio.volume=.5;mb.hidden=false;
  mb.onclick=()=>{if(audio.paused){audio.play().catch(()=>{});mb.lastChild.textContent='Music Off'}else{audio.pause();mb.lastChild.textContent='Music On'}}}

// envelope
let opened=false;
function reveal(){const intro=$('#intro');intro.classList.add('gone');document.body.classList.remove('locked');$('#main').hidden=false;scrollTo(0,0);
  $$('.hero .r').forEach((e,i)=>setTimeout(()=>e.classList.add('in'),300+i*300));
  [['#nBride',900],['#nGroom',1500]].forEach(([s,t])=>{const el=$(s);el.classList.add('r');setTimeout(()=>el.classList.add('in'),t)});
  $('.names .amp').style.opacity=0;setTimeout(()=>{const a=$('.names .amp');a.style.transition='opacity 1s';a.style.opacity=1},1200);
  observe();if(audio){audio.play().then(()=>mb.lastChild.textContent='Music Off').catch(()=>{})}
  setTimeout(()=>intro.remove(),1200)}
function open(skip){if(opened)return;opened=true;const intro=$('#intro');
  if(skip||reduced)return reveal();
  intro.classList.add('opening');$('#env').classList.add('open');
  setTimeout(()=>$('#env').classList.add('zoom'),2600);setTimeout(reveal,3300)}
$('#openBtn').onclick=()=>open();$('#skipBtn').onclick=()=>open(true);

// RSVP
const att=()=>$('input[name=att]:checked').value;
$$('input[name=att]').forEach(r=>r.onchange=()=>{const d=att().startsWith('Reg');$('#gWrap').style.display=d?'none':'block'});
$('#rsvpForm').onsubmit=e=>{e.preventDefault();const name=$('#fName').value.trim(),dec=att().startsWith('Reg'),g=dec?0:parseInt($('#fGuests').value,10),err=$('#err');
  if(name.length<2)return err.textContent='Please enter your full name.';
  if(!dec&&(!(g>=1)||g>20))return err.textContent='Please enter 1 to 20 guests.';
  err.textContent='';
  const msg=`WEDDING RSVP\n\nName: ${name}\n\nAttendance: ${att()}\n\nNumber of Guests: ${g}\n\nPhone: ${$('#fPhone').value.trim()||'Not provided'}\n\nMessage: ${$('#fMsg').value.trim()||'None'}`;
  $('#ok').textContent='Thank you for your response. WhatsApp will open so you can send your RSVP.';
  setTimeout(()=>{location.href=`https://wa.me/${CONFIG.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`},1800)};

// copy
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),2200)};
$('#copyBtn').onclick=async()=>{const b=$('#copyBtn');let ok=true;
  try{await navigator.clipboard.writeText(CONFIG.acctNo)}catch{const t=document.createElement('textarea');t.value=CONFIG.acctNo;document.body.append(t);t.select();ok=document.execCommand('copy');t.remove()}
  if(!ok)return toast('Copy failed. Please copy the number manually.');
  b.textContent='✓ Copied successfully';b.classList.add('done');toast('Account number copied');
  setTimeout(()=>{b.textContent='Copy Account Number';b.classList.remove('done')},2500)};

$('#top').onclick=()=>scrollTo({top:0,behavior:reduced?'auto':'smooth'});
