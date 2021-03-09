!function(t,s){"object"==typeof exports&&"object"==typeof module?module.exports=s():"function"==typeof define&&define.amd?define([],s):"object"==typeof exports?exports.PlanetarySystem=s():t.PlanetarySystem=s()}(self,(function(){return(()=>{"use strict";var t={d:(s,e)=>{for(var i in e)t.o(e,i)&&!t.o(s,i)&&Object.defineProperty(s,i,{enumerable:!0,get:e[i]})},o:(t,s)=>Object.prototype.hasOwnProperty.call(t,s)},s={};t.d(s,{default:()=>m});const e={createNode(t,s){const e=document.createElement("div");return e.className=t,s&&(e.style.width=e.style.height=s+"px"),e},createImage(t){const s=document.createElement("img");return s.src=t,s},createLabel(t){const s=document.createElement("p");return s.textContent=t,s},getSceneHeight(t,{perspective:s,angle:e}){const i=e*Math.PI/180;return 2*(t/2+(t/2*Math.cos(i)-t/2)*s/(s+t/2*Math.sin(i)))}};class i{constructor(t){this.size=t.size||t.system.options.sizes.sun,this.angle=t.angle||0,this.distance=t.distance||0,this.system=t.system,this.image=t.image,this.scale=t.scale||1,this.$node=e.createNode("ps-item ps-sun",this.size),this.$image=e.createImage(this.image),this.$node.appendChild(this.$image),this.system.$items.appendChild(this.$node),this.translate=gsap.to(this,{duration:this.system.options.durations.translate,distance:Math.sqrt(2)*(this.system.options.sizes.canvas-this.size)/2,paused:!0,ease:Power1.easeInOut,onUpdate:()=>{this.setTransform()}}),this.$node.addEventListener("click",(()=>{this.system.emit("deactivate")})),this.system.on("activate",(()=>{this.translate.play()})),this.system.on("deactivate",(()=>{this.translate.reverse()})),this.setTransform(),this.system.on("camera",(()=>this.setTransform()))}get x(){return this.distance*Math.cos(this.angle*Math.PI/180)}get y(){return this.distance*Math.sin(this.angle*Math.PI/180)}setTransform(){this.$node.style.transform=`translate(${this.x-this.size/2}px, ${this.y-this.size/2}px) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`}}class n{constructor(t){this.size=t.system.normalOrbitSizes.moon,this.planet=t.planet,this.system=t.system,this.opacity=0,this.angle=this.planet.angle,this.$node=e.createNode(`ps-orbit ps-orbit-${this.planet.orbit.index} ps-planet-${this.planet.index} ps-moon-orbit`,this.size),this.system.$orbits.appendChild(this.$node),this.fade=gsap.to(this,{duration:this.system.options.durations.fade,opacity:1,paused:!0,ease:Power1.easeInOut,onUpdate:()=>{this.setTransform(),this.setOpacity()}}),this.system.on("enter",(t=>{t.moonOrbit===this&&(this.setSize(),this.setTransform(),this.fade.play())})),this.system.on("leave",(t=>{t.moonOrbit===this&&this.fade.reverse()})),this.system.on("activate",(t=>{t.moonOrbit===this?this.resize(this.system.activeOrbitSizes[0]):(this.resize(this.system.activeOrbitSizes.moon),this.fade.reverse())})),this.system.on("deactivate",(()=>{this.resize(this.system.normalOrbitSizes.moon),this.fade.reverse()})),this.setOpacity()}resize(t){this._resize&&this._resize.kill(),this._resize=gsap.to(this,{duration:this.system.options.durations.translate,size:t,ease:Power1.easeInOut,onUpdate:()=>{this.opacity&&(this.setSize(),this.setTransform())}})}setOpacity(){this.$node.style.opacity=this.opacity}setSize(){this.$node.style.width=this.$node.style.height=this.size+"px"}setTransform(){this.$node.style.transform=`translate(${this.planet.x-this.size/2}px, ${this.planet.y-this.size/2}px)`}}class a{constructor(t){this.index=t.index,this.planet=t.planet,this.system=t.system,this.size=t.size||t.system.options.sizes.moon,this.scale=t.scale||1,this.angle=360*t.index/t.planet.moons.length,this.distance=t.system.normalOrbitSizes.moon/2,this.opacity=0,this.image=t.image,this.label=t.label,this.note=t.note,this.$node=e.createNode(`ps-item ps-ring-${this.planet.orbit.index} ps-planet-${this.planet.index} ps-moon-${this.index} ps-moon`,this.size),this.$image=e.createImage(this.image),this.$label=e.createLabel(this.label),this.$node.appendChild(this.$image),this.$node.appendChild(this.$label),this.system.$items.appendChild(this.$node),this.spin=gsap.to(this,{duration:2*Math.PI*this.distance*this.system.options.speed,angle:this.angle+360,repeat:-1,paused:!0,ease:Power0.easeNone,onUpdate:()=>{this.setTransform()}}),this.fade=gsap.to(this,{opacity:1,duration:this.system.options.durations.fade,paused:!0,ease:Power1.easeInOut,onStart:()=>{this.system.paused?this.setTransform():this.spin.play()},onUpdate:()=>{this.setOpacity()},onReverseComplete:()=>{this.spin.pause()}}),this.$node.addEventListener("mouseenter",(()=>{this.planet.active&&(this.$node.classList.add("hovered"),this.system.emit("moon:enter",this))})),this.$node.addEventListener("mouseleave",(()=>{this.planet.active&&(this.$node.classList.remove("hovered"),this.system.emit("moon:leave",this))})),this.$node.addEventListener("click",(()=>{this.planet.active&&this.system.emit("click",this)})),this.system.on("pause",(()=>{this.spin.pause()})),this.system.on("resume",(()=>{this.spin.play()})),this.system.on("timescale",(t=>{this.spin.timeScale(t)})),this.system.on("enter",(t=>{t.moons.includes(this)&&this.fade.play()})),this.system.on("leave",(t=>{t.moons.includes(this)&&this.fade.reverse()})),this.system.on("activate",(t=>{t.moons.includes(this)?this.move(this.system.activeOrbitSizes[0]/2,this.system.options.sizes.planet/this.size):(this.move(this.system.activeOrbitSizes.moon/2,1),this.fade.reverse())})),this.system.on("deactivate",(()=>{this.move(this.system.normalOrbitSizes.moon/2,1),this.fade.reverse()})),this.system.on("moon:enter",(t=>{t.planet.moons.includes(this)&&(this.system.paused||this.spin.pause())})),this.system.on("moon:leave",(t=>{t.planet.moons.includes(this)&&(this.system.paused||this.spin.resume())})),this.system.on("camera",(()=>{this.system.paused&&this.setTransform()})),this.setOpacity(),this.setTransform()}move(t,s){this._move&&this._move.kill(),this._move=gsap.to(this,{duration:this.system.options.durations.translate,distance:t,scale:s,ease:Power1.easeInOut,onUpdate:()=>{this.opacity&&this.setTransform()}})}setOpacity(){this.$node.style.opacity=this.opacity}get x(){return this.planet.x+this.distance*Math.cos(this.angle*Math.PI/180)}get y(){return this.planet.y+this.distance*Math.sin(this.angle*Math.PI/180)}setTransform(){this.$node.style.transform=`translate3d(${this.x-this.size/2}px, ${this.y-this.size/2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`}}class h{constructor(t){this.index=t.index,this.orbit=t.orbit,this.system=t.system,this.moons=t.moons||[],this.size=t.size||t.system.options.sizes.planet,this.scale=t.scale||1,this.angle=t.orbit.angle+360*this.index/t.orbit.planets.length,this.distance=t.orbit.size/2,this.image=t.image,this.label=t.label,this.note=t.note,this.active=!1,this.moonOrbit=new n({planet:this,system:this.system}),this.moons=this.moons.map(((t,s)=>new a({...t,index:s,planet:this,system:this.system}))),this.$node=e.createNode(`ps-item ps-planet ps-planet-${this.index} ps-orbit-${this.orbit.index}`,this.size),this.$image=e.createImage(this.image),this.$label=e.createLabel(this.label),this.$node.appendChild(this.$image),this.$node.appendChild(this.$label),this.system.$items.appendChild(this.$node),this.spin=gsap.to(this,{duration:2*Math.PI*this.distance*this.system.options.speed,angle:this.angle+360,repeat:-1,ease:Power0.easeNone,onUpdate:()=>{this.setTransform()}}),this.$node.addEventListener("mouseenter",(()=>{this.active||(this.$node.classList.add("hovered"),this.system.emit("enter",this))})),this.$node.addEventListener("mouseleave",(()=>{this.$node.classList.remove("hovered"),this.active||this.system.emit("leave",this)})),this.$node.addEventListener("click",(()=>{this.active?this.system.emit("click",this):this.system.emit("activate",this)})),this.system.on("pause",(()=>{this.spin.pause()})),this.system.on("resume",(()=>{this.spin.play()})),this.system.on("timescale",(t=>{this.spin.timeScale(t)})),this.system.on("enter",(t=>{t.orbit===this.orbit&&(this.system.paused||this.spin.pause())})),this.system.on("leave",(t=>{t.orbit===this.orbit&&(this.system.paused||this.spin.resume())})),this.system.on("activate",(t=>{t===this?(this.active=!0,this.$node.classList.add("active"),this.move(0,this.system.options.sizes.sun/this.size)):(this.active=!1,this.$node.classList.remove("active"),this.move(this.system.activeOrbitSizes[this.orbit.index+1]/2,1))})),this.system.on("deactivate",(()=>{this.active=!1,this.move(this.system.normalOrbitSizes[this.orbit.index]/2,1),this.system.paused||this.spin.resume()})),this.system.on("camera",(()=>{this.system.paused&&this.setTransform()}))}move(t,s){this._move&&this._move.kill(),this._move=gsap.to(this,{duration:this.system.options.durations.translate,distance:t,scale:s,ease:Power1.easeInOut,onUpdate:()=>{this.setTransform()}})}get x(){return this.distance*Math.cos(this.angle*Math.PI/180)}get y(){return this.distance*Math.sin(this.angle*Math.PI/180)}setTransform(){this.$node.style.transform=`translate3d(${this.x-this.size/2}px, ${this.y-this.size/2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`}}class o{constructor(t){this.index=t.index,this.size=t.system.normalOrbitSizes[this.index],this.angle=t.angle||360*Math.random(),this.planets=t.planets||[],this.system=t.system,this.$node=e.createNode(`ps-orbit ps-orbit-${this.index} ps-planet-orbit`,this.size),this.system.$orbits.appendChild(this.$node),this.planets=this.planets.map(((t,s)=>new h({...t,index:s,orbit:this,system:this.system}))),this.resize=gsap.to(this,{size:this.system.activeOrbitSizes[this.index+1],duration:this.system.options.durations.translate,paused:!0,ease:Power1.easeInOut,onUpdate:()=>{this.setStyle()}}),this.system.on("activate",(()=>{this.resize.play()})),this.system.on("deactivate",(()=>{this.resize.reverse()})),this.setStyle()}setStyle(){this.$node.style.width=this.$node.style.height=this.size+"px",this.$node.style.transform=`translate(-${this.size/2}px, -${this.size/2}px)`}}class r{constructor(t){var s;this.x=0,this.y=0,this.minScale=0,this.maxScale=0,this.zoom=0,this.system=t,this.padding={},function(t){let s=!1;function e(t){return t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0]||t}function i(i){const n=e(i);s={clientX:n.clientX,clientY:n.clientY,sceneX:t.x,sceneY:t.y}}function n(i){if(!s)return;const n=e(i);t.x=s.sceneX+n.clientX-s.clientX,t.y=s.sceneY+n.clientY-s.clientY,t.render(),i.preventDefault()}function a(){s=!1}t.system.$node.addEventListener("mousedown",i),document.addEventListener("mousemove",n),document.addEventListener("mouseup",a),document.addEventListener("mouseleave",a),t.system.$node.addEventListener("touchstart",i),document.addEventListener("touchmove",n,{passive:!1}),document.addEventListener("touchend",a),document.addEventListener("touchcancel",a)}(this),(s=this).system.$node.addEventListener("wheel",(t=>{if(t.preventDefault(),t.deltaY>0&&0===s.zoom)return;if(t.deltaY<0&&1===s.zoom)return;const e=-t.deltaY/1e3,i={x:t.clientX,y:t.clientY};s.zoomTo(i,s.zoom+e)})),function(t){function s(){const s=getComputedStyle(t.system.$node);t.padding.top=parseFloat(s.getPropertyValue("padding-top")),t.padding.right=parseFloat(s.getPropertyValue("padding-right")),t.padding.bottom=parseFloat(s.getPropertyValue("padding-bottom")),t.padding.left=parseFloat(s.getPropertyValue("padding-left"));const e=t.system.$node.offsetWidth-t.padding.right-t.padding.left,i=t.system.$node.offsetHeight-t.padding.bottom-t.padding.top,n=t.system.$scene.offsetWidth,a=t.system.$scene.offsetHeight;t.zoom=.4,t.minScale=Math.min(e/n,i/a),t.maxScale=Math.min(e,i)/2/t.system.options.sizes.sun,t.x=(e-n*t.scale)/2,t.y=(i-a*t.scale)/2,t.render(),t.system.emit("zoom",t.zoom)}s(),window.addEventListener("resize",s),t.system.on("camera",s)}(this)}get scale(){return this.minScale*Math.pow(this.maxScale/this.minScale,this.zoom)}zoomTo(t,s){const{left:e,top:i}=this.system.$node.getBoundingClientRect(),n=t.x-e-this.padding.left,a=t.y-i-this.padding.top,h=(n-this.x)/this.scale,o=(a-this.y)/this.scale;s=Math.max(s,0),s=Math.min(s,1),this.zoom=s,this.x=n-h*this.scale,this.y=a-o*this.scale,this.render(),this.system.emit("zoom",this.zoom)}render(){this.system.$scene.style.transform=`translate(${this.x}px, ${this.y}px) scale(${this.scale})`}}class m{constructor(t,s){this.options=s,this.listeners=[],this.$node=t,this.$node.classList.add("ps-system"),this.$scene=e.createNode("ps-scene"),this.$orbits=e.createNode("ps-canvas ps-canvas--orbits"),this.$items=e.createNode("ps-canvas ps-canvas--items"),this.$scene.appendChild(this.$orbits),this.$scene.appendChild(this.$items),this.$node.appendChild(this.$scene),this.setCamera(s.camera),this.normalOrbitSizes=this.getOrbitSizes(this.maxOrbit),this.activeOrbitSizes=this.getOrbitSizes(this.maxOrbit+1),this.active=null,this.paused=!1,this.timeScale=1,this.scene=new r(this),this.sun=new i({...s.sun,system:this}),this.orbits=s.orbits.map(((t,s)=>new o({...t,index:s,system:this})))}getOrbitSizes(t){const{canvas:s,sun:e,moon:i}=this.options.sizes,n=(s-e)/(2*t+1);let a=Array.from({length:t},((t,s)=>e+(s+1)*n*2));return a.moon=n-i,a}get maxOrbit(){return this.options.orbits.length}setCamera(t){const s=t.angle?`perspective(${t.perspective}px) translateY(50%) rotateX(${t.angle}deg) translateY(-50%)`:"";this.$orbits.style.transform=this.$items.style.transform=s,this.$scene.style.width=this.options.sizes.canvas+"px",this.$scene.style.height=e.getSceneHeight(this.options.sizes.canvas,t)+"px",this.camera=t,this.emit("camera",t)}on(t,s){this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(s)}off(t,s){if(!this.listeners[t])return;const e=this.listeners[t].indexOf(s);e>-1&&this.listeners[t].splice(e,1)}emit(t,s){this.listeners[t]&&this.listeners[t].forEach((t=>t(s)))}resume(){this.paused=!1,this.emit("resume")}pause(){this.paused=!0,this.emit("pause")}setTimeScale(t){this.timeScale=t,this.emit("timescale",this.timeScale)}}return s.default})()}));
//# sourceMappingURL=planetary-system.js.map