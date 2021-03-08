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
            moon: true,
            index: this.orbit.index,
            class: `ps-planet-${this.index} ps-planet-ring`,
            origin: this,
            size: this.system.normalOrbitSizes.moon,
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


        // spin animations

        this.spin = gsap.to(this, {
            duration: 2 * Math.PI * this.distance * this.system.options.speed,
            angle: this.angle + 360,
            repeat: -1,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.setTransform();
                if (this.moonOrbit.opacity) this.moonOrbit.setTransform();
            }
        });


        // DOM listeners

        this.$node.addEventListener('mouseenter', () => {
            if (this.active) return;
            this.system.emit('enter', this);
        })

        this.$node.addEventListener('mouseleave', () => {
            if (this.active) return;
            this.system.emit('leave', this);
        })

        this.$node.addEventListener('click', () => {
            if (this.active) return; // show note
            this.system.emit('activate', this);
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
                this.setDistance(0);
                if (!this.system.paused) this.spin.pause();
            }
            else {
                this.active = false;
                this.setDistance(this.system.activeOrbitSizes[this.orbit.index + 1] / 2);
                if (!this.system.paused) this.spin.resume();
            }
        })


        // // mouseenter listener
        //
        // this.$node.addEventListener('mouseenter', () => {
        //     this.orbit.planets.forEach(planet => planet.spin.pause());
        //     this.moonOrbit.setTransform();
        //     this.moonOrbit.fade.play();
        //     this.moons.forEach(moon => moon.fade.play());
        // })
        //
        //
        // // mouseleave listener
        //
        // this.$node.addEventListener('mouseleave', () => {
        //     this.orbit.planets.forEach(planet => {
        //         if (!planet.active) planet.spin.play();
        //     });
        //     if (!this.active) {
        //         this.moonOrbit.fade.reverse();
        //         this.moons.forEach(moon => moon.fade.reverse());
        //     }
        // })
        //
        //
        // // click listener
        //
        // this.$node.addEventListener('click', () => {
        //     this.system.emit('activate', this);
        // })
        //
        // this.system.on('activate', planet => {
        //     if (planet === this) {
        //         this.active = true;
        //         this.spin.pause();
        //         this.setDistance(0);
        //         // move to the center
        //     }
        //     else {
        //         this.active = false;
        //         this.spin.resume();
        //         this.setDistance(this.system.activeOrbitSizes[this.orbit.index + 1] / 2);
        //     }
        // });
        //
        // this.system.on('deactivate', planet => {
        //
        // });

        
    }



    // ----------------------
    // Helpers
    // ----------------------

    setDistance (distance) {
        this.translate && this.translate.kill();
        this.translate = gsap.to(this, {
            duration: this.system.options.durations.translate,
            distance,
            onUpdate: () => {
                this.setTransform();
                if (this.moonOrbit.opacity) this.moonOrbit.setTransform();
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

