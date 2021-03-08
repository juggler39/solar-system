import Utils from '@/utils'

export default class Moon {



    // ----------------------
    // Constructor
    // ----------------------

    constructor(options) {


        // options

        this.index = options.index;
        this.planet = options.planet;
        this.system = options.system;

        this.size = options.size || options.system.options.sizes.moon;
        this.scale = options.scale || 1;
        this.angle = options.index * 360 / options.planet.moons.length;
        this.distance = options.system.orbitSizes.moon / 2;

        this.image = options.image;
        this.label = options.label;
        this.note = options.note;


        // create nodes

        this.$node = Utils.createNode(`ps-item ps-ring-${this.planet.orbit.index} ps-planet-${this.planet.index} ps-moon-${this.index} ps-moon`, this.size);
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
        return this.planet.x + this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.planet.y + this.distance * Math.sin(this.angle * Math.PI / 180)
    }



    // ----------------------
    // Renderer
    // ----------------------

    render () {
        this.$node.style.transform = `translate3d(${this.x - this.size / 2}px, ${this.y - this.size / 2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }

}