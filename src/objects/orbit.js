import Utils from '@/utils'
import Planet from '@/objects/planet'

export default class Orbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.moon = options.index;
        this.index = options.index;
        this.class = options.class;
        this.size = options.size;
        this.origin = options.origin;
        this.angle = options.angle || Math.random() * 360;
        this.planets = options.planets || [];
        this.system = options.system;


        // create node

        this.$node = Utils.createNode(`ps-ring ps-ring-${this.index} ${this.class}`, this.size);
        this.system.$rings.appendChild(this.$node);


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
                this.setSize();
                this.setTransform();
            }
        })


        // event listers

        this.system.on('activate', () => {
            this.resize.play()
        })


        // render

        this.setSize();
        this.setTransform();

    }



    // ----------------------
    // Style setters
    // ----------------------

    setSize () {
        this.$node.style.width = this.$node.style.height = this.size + 'px';
    }

    setTransform () {
        this.$node.style.transform = `translate(${this.origin.x - this.size / 2}px, ${this.origin.y - this.size / 2}px)`
    }


}