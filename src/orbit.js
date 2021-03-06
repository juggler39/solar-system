import Utils from './utils'
import Planet from './planet'

const defaults = {
    index: 0,
    planets: []
}

export default class Orbit {

    constructor (config) {
        
        Object.assign(this, defaults, config);
        this.angle = Math.random() * 60;
        this.$node = Utils.createNode(`ps-orbit ps-orbit-${this.index} ${this.class}`, this.size);
        
        this.planets = this.planets.map((config, index) => new Planet({
            ...config,
            index,
            orbit: this,
            system: this.system
        }))
        
    }

    render () {
        this.$node.style.transform = `translate(${this.origin.x - this.size / 2}px, ${this.origin.y - this.size / 2}px)`
    }

}