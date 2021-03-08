import Utils from '@/utils'

export default class Sun {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.size = options.size || options.system.options.sizes.sun;
        this.angle = options.angle || 0;
        this.distance = options.distance || 0;
        this.system = options.system;
        this.image = options.image;
        this.scale = options.scale || 1;


        // create nodes

        this.$node = Utils.createNode('ps-item ps-sun', this.size);
        this.$image = Utils.createImage(this.image);
        this.$node.appendChild(this.$image);
        this.system.$items.appendChild(this.$node);


        // translate animation

        this.translate = gsap.to(this, {
            duration: this.system.options.durations.translate,
            distance: Math.sqrt(2) * (this.system.options.sizes.canvas - this.size) / 2,
            paused: true,
            ease: Power1.easeInOut,
            onUpdate: () => {
                this.setTransform();
            }
        })


        // DOM listeners

        this.$node.addEventListener('click', () => {
            this.system.emit('deactivate');
        })


        // event listeners

        this.system.on('activate', () => {
            this.translate.play();
        });

        this.system.on('deactivate', () => {
            this.translate.reverse();
        });


        // render

        this.setTransform();

    }



    // ----------------------
    // Style setters
    // ----------------------

    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    setTransform () {
        this.$node.style.transform = `translate(${this.x - this.size / 2}px, ${this.y - this.size / 2}px) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }



}