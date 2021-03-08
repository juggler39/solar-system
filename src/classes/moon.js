import Utils from '@/utils'

export default class Moon {

    constructor(config) {

        Object.assign(this, config);
        this.angle = this.index * 360 / this.planet.moons.length;
        this.size = config.size || this.system.config.sizes.moon;
        this.distance = this.system.orbitSizes.moon / 2;
        this.scale = 1;
        this.$node = Utils.createNode(`ps-item ps-orbit-${this.planet.orbit.index} ps-planet-${this.planet.index} ps-moon-${this.index} ps-moon`, this.size);

        const $img = document.createElement('img');
        $img.src = config.image;
        this.$node.appendChild($img);

        const $title = document.createElement('p');
        $title.textContent = config.title;
        this.$node.appendChild($title);
    }

    get x () {
        return this.planet.x + this.distance * Math.cos(this.angle * Math.PI / 180);
    }

    get y () {
        return this.planet.y + this.distance * Math.sin(this.angle * Math.PI / 180)
    }

    render () {
        // this.$node.style.transform = `translate3d(${this.x - this.size / 2}px, ${this.y - this.size / 2}px, 0) rotateX(-${this.system.camera.angle}deg) scale(${this.scale})`
    }

}