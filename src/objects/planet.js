import Utils from '@/utils'
import MoonOrbit from '@/objects/moon-orbit'
import Moon from '@/objects/moon'

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

        this.active = false;


        // create moon orbit

        this.moonOrbit = new MoonOrbit({
            planet: this,
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

        this.$node = Utils.createNode(`ps-item ps-planet ps-planet-${this.index} ps-orbit-${this.orbit.index}`, this.size);
        this.$image = Utils.createImage(this.image);
        this.$label = Utils.createLabel(this.label);
        this.$node.appendChild(this.$image);
        this.$node.appendChild(this.$label);
        this.system.$items.appendChild(this.$node);


        // spin animations

        this.spin = gsap.to(this, {
            duration: 2 * Math.PI * this.distance * this.system.options.speed,
            angle: this.angle + 360,
            repeat: -1,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.setTransform();
            }
        });


        // DOM listeners

        this.$node.addEventListener('mouseenter', () => {
            if (this.active) return;
            this.$node.classList.add('hovered');
            this.system.emit('enter', this);
        })

        this.$node.addEventListener('mouseleave', () => {
            this.$node.classList.remove('hovered');
            if (this.active) return;
            this.system.emit('leave', this);
        })

        this.$node.addEventListener('click', () => {
            if (this.active) this.system.emit('click', this);
            else this.system.emit('activate', this);
        })


        // event listeners

        this.system.on('pause', () => {
            this.spin.pause();
        })

        this.system.on('resume', () => {
            this.spin.play();
        })

        this.system.on('timescale', value => {
            this.spin.timeScale(value);
        })

        this.system.on('enter', planet => {
            if (planet.orbit !== this.orbit) return;
            if (!this.system.paused) this.spin.pause();
        })

        this.system.on('leave', planet => {
            if (planet.orbit !== this.orbit) return;
            if (!this.system.paused) this.spin.resume();
        })

        this.system.on('activate', planet => {
            if (planet === this) {
                this.active = true;
                this.$node.classList.add('active');
                this.move(0, this.system.options.sizes.sun / this.size);
            }
            else {
                this.active = false;
                this.$node.classList.remove('active');
                this.move(this.system.activeOrbitSizes[this.orbit.index + 1] / 2, 1);
            }
        })

        this.system.on('deactivate', () => {
            this.active = false;
            this.move(this.system.normalOrbitSizes[this.orbit.index] / 2, 1);
            if (!this.system.paused) this.spin.resume();
        });

        
    }



    // ----------------------
    // Helpers
    // ----------------------

    move (distance, scale) {
        this._move && this._move.kill();
        this._move = gsap.to(this, {
            duration: this.system.options.durations.translate,
            distance,
            scale,
            ease: Power1.easeInOut,
            onUpdate: () => {
                this.setTransform();
            }
        });
    }



    // ----------------------
    // Styles setters
    // ----------------------

    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    setTransform () {
        this.$node.style.transform = `translate3d(${this.x - this.size / 2}px, ${this.y - this.size / 2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }


}

