import Utils from '@/utils'
import Planet from '@/classes/planet'

export default class Orbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

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


        // render

        this.render();
        
    }



    // ----------------------
    // Renderer
    // ----------------------

    render () {
        this.$node.style.width = this.$node.style.height = this.size + 'px';
        this.$node.style.transform = `translate(${this.origin.x - this.size / 2}px, ${this.origin.y - this.size / 2}px)`
    }



}