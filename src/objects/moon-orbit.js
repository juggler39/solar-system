import Utils from '@/utils'

export default class MoonOrbit {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // options

        this.size = options.system.normalOrbitSizes.moon;
        this.planet = options.planet;
        this.system = options.system;
        this.opacity = 0;
        this.angle = this.planet.angle;


        // create node

        this.$node = Utils.createNode(`ps-orbit ps-orbit-${this.planet.orbit.index} ps-planet-${this.planet.index} ps-moon-orbit`, this.size);
        this.system.$orbits.appendChild(this.$node);


        // fade animation

        this.fade = gsap.to(this, {
            duration: this.system.options.durations.fade,
            opacity: 1,
            paused: true,
            ease: Power1.easeInOut,
            onUpdate: () => {
                this.setTransform();
                this.setOpacity();
            }
        })


        // event listeners

        this.system.on('enter', planet => {
            if (planet.moonOrbit !== this) return;
            this.setSize();
            this.setTransform();
            this.fade.play();
        })

        this.system.on('leave', planet => {
            if (planet.moonOrbit !== this) return;
            this.fade.reverse();
        })

        this.system.on('activate', planet => {
            if (planet.moonOrbit === this) this.resize(this.system.activeOrbitSizes[0]);
            else {
                this.resize(this.system.activeOrbitSizes.moon);
                this.fade.reverse();
            }
        })

        this.system.on('deactivate', () => {
            this.resize(this.system.normalOrbitSizes.moon);
            this.fade.reverse();
        })

        this.setOpacity();

    }



    // ----------------------
    // Helpers
    // ----------------------

    resize (size) {
        this._resize && this._resize.kill();
        this._resize = gsap.to(this, {
            duration: this.system.options.durations.translate,
            size,
            onUpdate: () => {
                if (!this.opacity) return;
                this.setSize();
                this.setTransform();
            }
        });
    }



    // ----------------------
    // Style setters
    // ----------------------

    setOpacity () {
        this.$node.style.opacity = this.opacity;
    }

    setSize () {
        this.$node.style.width = this.$node.style.height = this.size + 'px';
    }

    setTransform () {
        this.$node.style.transform = `translate(${this.planet.x - this.size / 2}px, ${this.planet.y - this.size / 2}px)`
    }

}