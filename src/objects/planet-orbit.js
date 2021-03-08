import Utils from '@/utils'
import Planet from '@/objects/planet'

export default class Orbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.index = options.index;
        this.size = options.system.normalOrbitSizes[this.index];
        this.angle = options.angle || Math.random() * 360;
        this.planets = options.planets || [];
        this.system = options.system;


        // create node

        this.$node = Utils.createNode(`ps-orbit ps-orbit-${this.index} ps-planet-orbit`, this.size);
        this.system.$orbits.appendChild(this.$node);


        // create planets

        this.planets = this.planets.map((options, index) => new Planet({
            ...options,
            index,
            orbit: this,
            system: this.system
        }))


        // resize animation

        this.resize = gsap.to(this, {
            size: this.system.activeOrbitSizes[this.index + 1],
            duration: this.system.options.durations.translate,
            paused: true,
            ease: Power1.easeInOut,
            onUpdate: () => {
                this.setStyle();
            }
        })


        // event listeners

        this.system.on('activate', () => {
            this.resize.play()
        })

        this.system.on('deactivate', () => {
            this.resize.reverse()
        })


        // render

        this.setStyle();

    }



    // ----------------------
    // Style setters
    // ----------------------

    setStyle () {
        this.$node.style.width = this.$node.style.height = this.size + 'px';
        this.$node.style.transform = `translate(-${this.size / 2}px, -${this.size / 2}px)`
    }


}