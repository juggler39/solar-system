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
        this.distance = options.system.normalOrbitSizes.moon / 2;
        this.opacity = 0;

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


        // spin animation

        this.spin = gsap.to(this, {
            duration: 2 * Math.PI * this.distance * this.system.options.speed,
            angle: this.angle + 360,
            repeat: -1,
            paused: true,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.setTransform();
            }
        });


        // fade animation

        this.fade = gsap.to(this, {
            opacity: 1,
            duration: this.system.options.durations.fade,
            paused: true,
            ease: Power1.easeInOut,
            onStart: () => {
                if (!this.system.paused) this.spin.play();
                else this.setTransform();
            },
            onUpdate: () => {
                this.setOpacity();
            },
            onReverseComplete: () => {
                this.spin.pause();
            }
        })


        // event listeners

        this.system.on('pause', () => {
            this.spin.pause();
        })

        this.system.on('timescale', value => {
            this.spin.timeScale(value);
        })

        this.system.on('enter', planet => {
            if (planet.moons.includes(this)) this.fade.play();
        })

        this.system.on('leave', planet => {
            if (planet.moons.includes(this)) this.fade.reverse();
        })

        this.system.on('activate', planet => {
            if (planet.moons.includes(this)) {
                this.move(this.system.activeOrbitSizes[0] / 2, this.system.options.sizes.planet / this.size);
            }
            else {
                this.move(this.system.activeOrbitSizes.moon / 2, 1);
                this.fade.reverse();
            }
        })

        this.system.on('deactivate', () => {
            this.move(this.system.normalOrbitSizes.moon / 2, 1);
            this.fade.reverse();
        })


        // render

        this.setOpacity();

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
                if (!this.opacity) return;
                this.setTransform();
            }
        });
    }



    // ----------------------
    // Styles setters
    // ----------------------

    setOpacity () {
        this.$node.style.opacity = this.opacity;
    }

    get x () {
        return this.planet.x + this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.planet.y + this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    setTransform () {
        this.$node.style.transform = `translate3d(${this.x - this.size / 2}px, ${this.y - this.size / 2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }

}