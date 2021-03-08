export default class MoonOrbitt {



    // ----------------------
    // Constructor
    // ----------------------

    constructor (options) {


        // // options
        //
        // super(options);
        // this.opacity = 0;
        //
        //
        // // resize animation
        //
        // this.resize = gsap.to(this, {
        //     size: this.system.activeOrbitSizes[this.index + 1],
        //     duration: this.system.options.durations.translate,
        //     paused: true,
        //     ease: Power1.easeInOut,
        //     onUpdate: () => {
        //         this.setSize();
        //         this.setTransform();
        //     }
        // })
        //
        //
        // // spin animations
        //
        // this.spin = gsap.to(this, {
        //     duration: 2 * Math.PI * this.origin.distance * this.system.options.speed,
        //     angle: this.origin.angle + 360,
        //     repeat: -1,
        //     ease: Power0.easeNone,
        //     onUpdate: () => {
        //         if (this.opacity) this.setTransform();
        //     }
        // });
        //
        //
        // // fade animation
        //
        // this.fade = gsap.to(this, {
        //     opacity: 1,
        //     duration: this.system.options.durations.fade,
        //     paused: true,
        //     ease: Power1.easeInOut,
        //     onUpdate: () => {
        //         this.setOpacity();
        //     }
        // })
        //
        //
        // // event listeners
        //
        // this.system.on('pause', planet => {
        //     this.spin.pause();
        //     this.setTransform();
        // })
        //
        // this.system.on('enter', planet => {
        //     if (planet.moonOrbit === this) this.fade.play();
        // })
        //
        // this.system.on('leave', planet => {
        //     if (planet.moonOrbit === this) this.fade.reverse();
        // })
        //
        //
        // // render
        //
        // this.setOpacity();


    }



    // ----------------------
    // Style setters
    // ----------------------

    setOpacity () {
        this.$node.style.opacity = this.opacity;
    }

}