/* NeoFrame V4.2.4 — PTR assembly + corrected reversible pinned process */
document.addEventListener('DOMContentLoaded',()=>{
 const track=document.getElementById('processTrack');
 const processSection=document.getElementById('proceso');
 if(track && processSection){
   const steps=[...track.querySelectorAll('.process-step')];
   const progressBar=track.querySelector('.process-progress');
   const clampProcess=(v)=>Math.max(0,Math.min(1,v));
   const updateProcess=()=>{
     if(matchMedia('(prefers-reduced-motion: reduce)').matches){
       track.style.setProperty('--process-progress','1');
       steps.forEach(step=>step.classList.add('is-active'));
       return;
     }
     const r=processSection.getBoundingClientRect();
     // La secuencia comienza cuando la sección alcanza aproximadamente
     // la mitad del viewport y consume ~1.15 pantallas de scroll.
     const start=innerHeight*0.50;
     const duration=innerHeight*1.15;
     const p=clampProcess((start-r.top)/duration);
     track.style.setProperty('--process-progress',String(p));
     if(progressBar) progressBar.style.width=`calc((100% - 80px) * ${p})`;
     steps.forEach((step,i)=>{
       const threshold=i/(steps.length-1);
       step.classList.toggle('is-active',p>=threshold-.015);
     });
   };
   updateProcess();
   addEventListener('scroll',updateProcess,{passive:true});
   addEventListener('resize',updateProcess,{passive:true});
 }
 const canvas=document.getElementById('assemblyCanvas'), section=document.getElementById('ensamblaje');
 if(!canvas||!section||!window.THREE)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const scene=new THREE.Scene(); scene.fog=new THREE.FogExp2(0x020b16,.027);
 const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,100); camera.position.set(13,8.3,15); camera.lookAt(1,2,0);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)); const sizeRenderer=()=>{const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||innerHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}; sizeRenderer(); renderer.outputColorSpace=THREE.SRGBColorSpace;
 scene.add(new THREE.HemisphereLight(0x8fcfff,0x06111d,1.45)); const key=new THREE.DirectionalLight(0xffffff,2.2);key.position.set(6,12,9);scene.add(key); const rim=new THREE.PointLight(0x1685df,35,25);rim.position.set(-4,6,-4);scene.add(rim);
 const grid=new THREE.GridHelper(24,24,0x164b74,0x0a2745);grid.position.y=-.08;grid.material.opacity=.22;grid.material.transparent=true;scene.add(grid);
 const steel=new THREE.MeshStandardMaterial({color:0x6f8494,metalness:.88,roughness:.27}); const edgeMat=new THREE.LineBasicMaterial({color:0x9fd7ff,transparent:true,opacity:.26});
 const pieces=[]; const group=new THREE.Group(); group.position.x=2.0; scene.add(group);
 function hollowPTR(w,h,len){const shape=new THREE.Shape();shape.moveTo(-w/2,-h/2);shape.lineTo(w/2,-h/2);shape.lineTo(w/2,h/2);shape.lineTo(-w/2,h/2);shape.closePath();const t=Math.min(w,h)*.18,hole=new THREE.Path();hole.moveTo(-w/2+t,-h/2+t);hole.lineTo(-w/2+t,h/2-t);hole.lineTo(w/2-t,h/2-t);hole.lineTo(w/2-t,-h/2+t);hole.closePath();shape.holes.push(hole);const geo=new THREE.ExtrudeGeometry(shape,{depth:len,bevelEnabled:false,steps:1});geo.translate(0,0,-len/2);return geo}
 function addPTR(a,b,size=.13,phase=0,seed=1){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b),mid=A.clone().add(B).multiplyScalar(.5),len=A.distanceTo(B);const mesh=new THREE.Mesh(hollowPTR(size,size,len),steel);mesh.position.copy(mid);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),B.clone().sub(A).normalize());const edges=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,25),edgeMat);mesh.add(edges);group.add(mesh);const finalPos=mesh.position.clone(),finalQuat=mesh.quaternion.clone();const r=()=>Math.sin(seed++*91.73);const start=finalPos.clone().add(new THREE.Vector3(r()*8+(r()>0?6:-6),3+Math.abs(r())*8,r()*9));const axis=new THREE.Vector3(r(),r(),r()).normalize();const startQuat=new THREE.Quaternion().setFromAxisAngle(axis,2.2+r()*2.2).multiply(finalQuat);pieces.push({mesh,phase,finalPos,finalQuat,start,startQuat});return mesh}
 // Dimensions: 8m x 5m, wall 3m, ridge 4.35m. Visual concept only, not engineering design.
 const X=4,Z=2.5,H=3,R=4.35;
 // base frame
 [[[-X,0,-Z],[X,0,-Z]],[[-X,0,Z],[X,0,Z]],[[-X,0,-Z],[-X,0,Z]],[[X,0,-Z],[X,0,Z]]].forEach((v,i)=>addPTR(...v,.18,.03,i+1));
 // floor joists
 for(let x=-3.2,i=0;x<=3.2;x+=.8,i++)addPTR([x,0,-Z],[x,0,Z],.11,.07,20+i);
 // primary columns corners + intermediate side/rear
 // Primary columns: corners + rear intermediates only. Front and side openings are framed separately below.
 const cols=[[-X,-Z],[X,-Z],[-X,Z],[X,Z],[-2,-Z],[0,-Z],[2,-Z]];
 cols.forEach((p,i)=>addPTR([p[0],0,p[1]],[p[0],H,p[1]],i<4?.18:.13,.18,50+i));
 // top plates
 [[[-X,H,-Z],[X,H,-Z]],[[-X,H,Z],[X,H,Z]],[[-X,H,-Z],[-X,H,Z]],[[X,H,-Z],[X,H,Z]]].forEach((v,i)=>addPTR(...v,.16,.27,80+i));
 // front wall (z=+Z): door left x=-2.25 width1.15, window right x=1.65 width1.8
 const frontXs=[-3.25,-2.825,-1.675,-.7,.75,2.55,3.25];frontXs.forEach((x,i)=>addPTR([x,0,Z],[x,H,Z],.1,.34,100+i));
 // door header and window frame, no members crossing openings
 addPTR([-2.825,2.25,Z],[-1.675,2.25,Z],.11,.39,120);addPTR([.75,1.0,Z],[2.55,1.0,Z],.1,.39,121);addPTR([.75,2.25,Z],[2.55,2.25,Z],.1,.39,122);
 // rear wall regular framing
 for(let x=-3.25,i=0;x<=3.25;x+=1.08,i++)addPTR([x,0,-Z],[x,H,-Z],.1,.34,140+i);
 // side walls: window centered each side; verticals around opening + sill/header
 [-X,X].forEach((x,side)=>{[-1.9,-1.15,1.15,1.9].forEach((z,i)=>addPTR([x,0,z],[x,H,z],.1,.36,170+side*20+i));addPTR([x,1,-1.15],[x,1,1.15],.1,.4,180+side*20);addPTR([x,2.2,-1.15],[x,2.2,1.15],.1,.4,181+side*20)});
 // gable trusses at x positions: correct ridge runs longitudinally along X
 [-4,-2,0,2,4].forEach((x,i)=>{addPTR([x,H,-Z],[x,R,0],.13,.52,210+i*3);addPTR([x,R,0],[x,H,Z],.13,.52,211+i*3);addPTR([x,H,-Z],[x,H,Z],.1,.5,212+i*3)});
 // ridge + purlins longitudinal
 addPTR([-X,R,0],[X,R,0],.13,.64,250);[-1.65,1.65].forEach((z,i)=>{const y=H+(R-H)*(1-Math.abs(z)/Z);addPTR([-X,y,z],[X,y,z],.1,.65,251+i)});
 // bracing selected rear/side panels
 addPTR([-4,.1,-Z],[-2,2.9,-Z],.07,.73,270);addPTR([-2,.1,-Z],[0,2.9,-Z],.07,.73,271);addPTR([4,.1,-1.9],[4,2.9,-1.15],.07,.73,272);
 // particles at joints
 const pg=new THREE.BufferGeometry(), count=90, pos=new Float32Array(count*3);for(let i=0;i<count;i++){pos[i*3]=(Math.random()-.5)*9;pos[i*3+1]=Math.random()*4.6;pos[i*3+2]=(Math.random()-.5)*5.5}pg.setAttribute('position',new THREE.BufferAttribute(pos,3));const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x66c6ff,size:.045,transparent:true,opacity:.35}));group.add(pts);
 function ease(t){return 1-Math.pow(1-t,3)} function clamp(v,a=0,b=1){return Math.max(a,Math.min(b,v))}
 const titles=[['01','Base estructural','El bastidor y los apoyos definen la huella.'],['02','Pilares y vigas','Los PTR principales levantan el volumen.'],['03','Muros y vanos','Puertas y ventanas quedan enmarcadas sin interferencias.'],['04','Techumbre','Cerchas y correas completan la cubierta a dos aguas.'],['05','Estructura completa','El esqueleto modular queda listo para continuar la obra.']];let last=-1;
 function update(p){pieces.forEach(o=>{const local=clamp((p-o.phase)/.16),e=ease(local);o.mesh.position.lerpVectors(o.start,o.finalPos,e);o.mesh.quaternion.slerpQuaternions(o.startQuat,o.finalQuat,e);o.mesh.scale.setScalar(.72+.28*e)});const mobile=innerWidth<=650;if(mobile){camera.position.x=16.8-p*2.4;camera.position.z=20.5-p*1.6;camera.position.y=10.5+p*.5;camera.lookAt(1,1.8,0)}else{camera.position.x=13-p*3.4;camera.position.z=15-p*2.2;camera.position.y=8.3+p*.8;camera.lookAt(1,2.05,0)}pts.rotation.y=p*.8;document.getElementById('assemblyProgress').style.width=(p*100)+'%';let idx=p<.18?0:p<.38?1:p<.6?2:p<.82?3:4;if(idx!==last){last=idx;const t=titles[idx];document.getElementById('assemblyStageNumber').textContent=t[0];document.getElementById('assemblyStageTitle').textContent=t[1];document.getElementById('assemblyStageText').textContent=t[2]}}
 function scrollProgress(){const r=section.getBoundingClientRect(),travel=section.offsetHeight-innerHeight;return clamp(-r.top/Math.max(travel,1))}
 let target=reduced?1:0,current=target;function tick(){if(!reduced)target=scrollProgress();current+= (target-current)*.075;update(current);renderer.render(scene,camera);requestAnimationFrame(tick)}
 pieces.forEach(o=>{o.mesh.position.copy(o.start);o.mesh.quaternion.copy(o.startQuat)});tick();
 addEventListener('resize',sizeRenderer,{passive:true});
 });
