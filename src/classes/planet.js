import Utils from '@/utils'
import Orbit from '@/classes/orbit'
import Moon from '@/classes/moon'

export default class Planet {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.index = options.index;
        this.orbit = options.orbit;
        this.system = options.system;
        this.moons = options.moons || [];

        this.size = options.size || options.system.options.sizes.planet;
        this.scale = options.scale || 1;
        this.angle = options.orbit.angle + this.index * 360 / options.orbit.planets.length;
        this.distance = options.orbit.size / 2;

        this.image = options.image;
        this.label = options.label;
        this.note = options.note;


        // create moon orbit

        this.moonOrbit = new Orbit({
            index: this.orbit.index,
            class: `ps-planet-${this.index} ps-planet-ring`,
            origin: this,
            size: this.system.orbitSizes.moon,
            system: this.system
        })


        // create moons

        this.moons = this.moons.map((options, index) => {
            return new Moon({
                ...options,
                index,
                planet: this,
                system: this.system
            })
        })


        // create nodes

        this.$node = Utils.createNode(`ps-item ps-planet ps-planet-${this.index} ps-ring-${this.orbit.index}`, this.size);
        this.$image = Utils.createImage(this.image);
        this.$label = Utils.createLabel(this.label);
        this.$node.appendChild(this.$image);
        this.$node.appendChild(this.$label);
        this.system.$items.appendChild(this.$node);


        // render

        this.render();
        
    }



    // ----------------------
    // Coordinates
    // ----------------------

    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }



    // ----------------------
    // Renderer
    // ----------------------

    render () {
        this.$node.style.transform = `translate3d(${this.x - this.size / 2}px, ${this.y - this.size / 2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }


}

