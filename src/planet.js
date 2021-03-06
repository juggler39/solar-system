import Utils from './utils'
import Orbit from './orbit'
import Moon from './moon'

const defaults = {
    moons: []
}

function getSize (planet) {
    if (planet.size) return planet.size;
    const sizes = planet.system.config.sizes;
    if (planet.index === 0 && planet.orbit.index === 0) return sizes.sun;
    return sizes.planet;
}

export default class Planet {
    
    constructor (config) {

        Object.assign(this, defaults, config);
        this.angle = this.orbit.angle + this.index * 360 / this.orbit.planets.length;
        this.distance = this.orbit.size / 2;
        this.size = getSize(this);
        this.$node = Utils.createNode(`ps-item ps-orbit-${this.orbit.index} ps-planet-${this.index} ps-planet`, this.size);

        this.moonOrbit = new Orbit({
            index: this.orbit.index,
            class: `ps-planet-${this.index} ps-planet-orbit`,
            origin: this,
            size: this.system.orbitSizes.moon,
            system: this.system
        })

        this.moons = this.moons.map((config, index) => {
            return new Moon({
                ...config,
                index,
                planet: this,
                system: this.system
            })
        })
        
    }

    get x () {
        return this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    render () {
        this.$node.style.transform = `translate(${this.x - this.size / 2}px, ${this.y - this.size / 2}px) rotateX(-${this.system.camera.angle}deg)`
    }
    
}
