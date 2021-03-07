import './styles.css'
import Utils from './utils'
import Orbit from './orbit'


export default class PlanetarySystem {



    // ----------------------
    // Constructor
    // ----------------------

    constructor ($node, config) {

        this.config = config;

        this.$node = $node;
        this.$node.classList.add('ps-scene');

        this.$orbits = Utils.createNode('ps-canvas ps-canvas--orbits');
        this.$planets = Utils.createNode('ps-canvas ps-canvas--planets');
        this.$node.appendChild(this.$orbits);
        this.$node.appendChild(this.$planets);
        
        this.orbits = config.orbits.map((config, index) => {
            return new Orbit({
                ...config,
                index,
                class: 'ps-sun-orbit',
                origin: { x: 0, y: 0 },
                size: this.orbitSizes[index],
                system: this
            });
        });

        this.orbits.forEach(orbit => {
            this.$orbits.appendChild(orbit.$node);
            orbit.planets.forEach(planet => {
                this.$planets.appendChild(planet.$node);
                this.$orbits.appendChild(planet.moonOrbit.$node);
                planet.moons.forEach(moon => this.$planets.appendChild(moon.$node));
            })
        })

        this.setCamera(config.camera);
        this.render();

    }



    // ----------------------
    // Calculate orbit sizes
    // ----------------------

    getOrbitSizes (max = this.maxOrbit) {
        const { canvas, sun, moon } = this.config.sizes;
        const minSunDist = (canvas - sun) / (max * 2 + 1);
        let orbits = [0];
        for (let i = 1; i <= max; i++) { orbits.push(sun + i * minSunDist * 2) }
        orbits.moon = minSunDist - moon;
        return orbits;
    }
    
    get maxOrbit () {
        return this.config.orbits.length - 1;
    }

    get orbitSizes () {
        return this.getOrbitSizes();
    }



    // ----------------------
    // Camera
    // ----------------------

    setCamera (camera) {
        const transform = camera.angle ? `perspective(${camera.perspective}px) translateY(50%) rotateX(${camera.angle}deg) translateY(-50%)` : '';
        this.$orbits.style.transform = this.$planets.style.transform = transform;
        this.$node.style.width = this.config.sizes.canvas + 'px';
        this.$node.style.height = Utils.getSceneHeight(this.config.sizes.canvas, camera) + 'px';
        this.camera = camera;
    }



    // ----------------------
    // Renderer
    // ----------------------

    render () {
        this.orbits.forEach(orbit => {
            orbit.render();
            orbit.planets.forEach(planet => {
                planet.render();
                planet.moonOrbit.render();
                planet.moons.forEach(moon => moon.render());
            })
        })

    }


}