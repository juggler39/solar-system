class Planet {
    
    constructor (config) {
        this.orbit = config.orbit;
        this.size = config.size || PlanetaryConfig.size.planet;
        this.distance = config.distance;
        // if (config.orbit === 1) this.distance = config.distance / 2 + 20;
        this.angle = config.angle;
        this.index = config.i;
        this.scale = 1;
        this.$node = PlanetaryUtils.append('ps-planet', this.size);
        this.$node.textContent = this.index;
        this.spin = gsap.to(this, {
            duration: 2 * Math.PI * this.distance * PlanetaryConfig.speed,
            angle: this.angle + 360,
            repeat: -1,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.update();
            }
        })
        this.translate = gsap.to(this, {})
    }
    
    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }
    
    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    update () {
        this.$node.style.transform = `translate(${this.x - this.size / 2}px, ${this.y - this.size / 2}px)`
    }
    
}


class Moon {

    constructor (config) {
        this.planet = config.planet;
        this.size = config.size || PlanetaryConfig.size.moon;
        this.distance = config.distance;
        this.angle = config.angle;
        this.index = config.i;
        this.scale = 1;
        this.$node = PlanetaryUtils.append('ps-moon', this.size);
        this.$node.textContent = this.index;
        this.spin = gsap.to(this, {
            duration: 2 * Math.PI * this.distance * PlanetaryConfig.speed,
            angle: this.angle + 360,
            repeat: -1,
            ease: Power0.easeNone,
            onUpdate: () => {
                this.update();
            }
        })
    }

    get x () {
        return this.planet.x + this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.planet.y + this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    update () {
        this.$node.style.transform = `translate(${this.x - this.size / 2}px, ${this.y - this.size / 2}px)`
    }

}

(() => {

    const planet = {
        orbit: 1,
        size: 48,
        scale: 1,
        distance: 300,
        angle: 60,
        x: 0, // calculated
        y: 0 // calculated
    }

    const moon = {
        planet: planet,
        size: 48,
        scale: 1,
        distance: 300,
        angle: 60,
        x: 0, // calculated
        y: 0 // calculated
    }

    const planetText = {
        planet: planet,
        x: 0, // calculated
        y: 0 // calculated
    }

    const moonText = {
        moon: moon,
        x: 0, // calculated
        y: 0 // calculated
    }
    
})();