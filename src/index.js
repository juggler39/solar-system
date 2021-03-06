import './index.css'
import Utils from '@/utils'
import Sun from '@/objects/sun'
import PlanetOrbit from '@/objects/planet-orbit'
import Scene from '@/scene/scene'


export default class PlanetarySystem {



    // ----------------------
    // Constructor
    // ----------------------

    constructor ($node, options) {

        this.options = options;
        this.listeners = [];


        // create nodes

        this.$node = $node;
        this.$node.classList.add('ps-system');
        this.$scene = Utils.createNode('ps-scene');
        this.$orbits = Utils.createNode('ps-canvas ps-canvas--orbits');
        this.$items = Utils.createNode('ps-canvas ps-canvas--items');
        this.$scene.appendChild(this.$orbits);
        this.$scene.appendChild(this.$items);
        this.$node.appendChild(this.$scene);


        // configuration

        this.setCamera(options.camera);
        this.normalOrbitSizes = this.getOrbitSizes(this.maxOrbit);
        this.activeOrbitSizes = this.getOrbitSizes(this.maxOrbit + 1);
        this.active = null;
        this.paused = false;
        this.timeScale = 1;
        this.scene = new Scene(this);



        // listeners

        // this.on('activate', planet => this.active = planet);
        // this.on('deactivate', () => this.active = null);


        // create sun

        this.sun = new Sun({
            ...options.sun,
            system: this
        });


        // create orbits

        this.orbits = options.orbits.map((options, index) => new PlanetOrbit({
            ...options,
            index,
            system: this
        }));

        // console.log(this.normalOrbitSizes);
        // console.log(this.activeOrbitSizes);


    }



    // ----------------------
    // Calculate orbit sizes
    // ----------------------

    getOrbitSizes (length) {
        const { canvas, sun, moon } = this.options.sizes;
        const minSunDist = (canvas - sun) / (length * 2 + 1);
        let orbits = Array.from({ length }, (x, i) => sun + (i + 1) * minSunDist * 2);
        orbits.moon = minSunDist - moon;
        return orbits;
    }
    
    get maxOrbit () {
        return this.options.orbits.length;
    }



    // ----------------------
    // Setting camera
    // ----------------------

    setCamera (camera) {
        const transform = camera.angle ? `perspective(${camera.perspective}px) translateY(50%) rotateX(${camera.angle}deg) translateY(-50%)` : '';
        this.$orbits.style.transform = this.$items.style.transform = transform;
        this.$scene.style.width = this.options.sizes.canvas + 'px';
        this.$scene.style.height = Utils.getSceneHeight(this.options.sizes.canvas, camera) + 'px';
        this.camera = camera;
        this.emit('camera', camera);
    }



    // ----------------------
    // Events
    // ----------------------

    on (event, handler) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(handler);
    }

    off (event, handler) {
        if (!this.listeners[event]) return;
        const index = this.listeners[event].indexOf(handler);
        if (index > -1) this.listeners[event].splice(index, 1);
    }

    emit (event, param) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(handler => handler(param));
    }



    // ----------------------
    // Animation
    // ----------------------

    resume () {
        this.paused = false;
        this.emit('resume');
    }

    pause () {
        this.paused = true;
        this.emit('pause');
    }

    setTimeScale (timeScale) {
        this.timeScale = timeScale;
        this.emit('timescale', this.timeScale);
    }



}