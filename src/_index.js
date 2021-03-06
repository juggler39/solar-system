import './styles.css'
import Utils from './utils'
import { SunRing } from './rings'
import { Planet } from './items'

export default class PlanetarySystem {



    // ----------------------
    // Constructor
    // ----------------------

    constructor ($node, config) {


        // properties

        this.sizes = config.sizes;
        this.rings = [];
        this.planets = [];

        this.$node = $node;
        this.$node.style.width = this.$node.style.height = config.sizes.canvas + 'px';
        this.$node.classList.add('ps-scene');

        this.$orbits = Utils.createNode('ps-canvas ps-canvas--orbits');
        this.$planets = Utils.createNode('ps-canvas ps-canvas--planets');
        this.$node.appendChild(this.$orbits);
        this.$node.appendChild(this.$planets);

        this.maxOrbit = Math.max(...config.planets.map(planet => planet.orbit));
        this.orbitSizes = this.getOrbitSizes(this.maxOrbit);
        this.orbits = this.getOrbits(config);

                
        //
        // function createRing (index) {
        //     const ring = new SunRing({
        //         origin: { x: 0, y: 0 },
        //         orbit: index,
        //         size: orbitSizes[index]
        //     });
        // }
        
        
        
        // create planet

        function createPlanet (startAngle, config, index, planets) {
            const angle = startAngle + index * 360 / planets.length;
            const planet = new Planet({ ...config, distance, angle, index });
            this.planets.push(planet);
        }

         

        let orbits = [];

        const createPlanets = () => {
            return orbit.planets.map(config => {
                const planet = new Planet(config);
                planet.children = createPlanets();

            })
        }


        this.planets = orbits.forEach((orbit, index) => {
            createPlanets


        }).flat();



        
        //
        // this.orbits.forEach(orbit => {
        //     orbit.planets.forEach((config, index) => {
        //         this.planets.push(new Planet(config, index));
        //     });
        // })
        //
        // this.planets.forEach(planet => {
        //     this.$items.appendChild(planet.$node);
        //     // planet.moons.forEach(moon => this.$items.appendChild(moon.$node));
        // })
        //
        //
        //
        // // create sun rings
        //
        // const createSunRing = index => {
        //     const ring = new SunRing({
        //         origin: { x: 0, y: 0 },
        //         orbit: index,
        //         size: orbitSizes[index]
        //     });
        //     this.rings.push(ring);
        //     this.$rings.appendChild(ring.$node);
        // }
        //
        //
        //
        // orbits.forEach((planets, index) => {
        //     createSunRing(index);
        //     const startAngle = Math.random() * 360;
        //     return planets.map((...args) => createPlanet(startAngle, ...args));
        // })

  
        this.setCamera(config.camera);

    }



    // ----------------------
    // Camera
    // ----------------------

    setCamera (camera) {
        const transform = camera.angle ? `perspective(${camera.perspective}px) translateY(50%) rotateX(${camera.angle}deg) translateY(-50%)` : '';
        this.$rings.style.transform = this.$items.style.transform = transform;
        this.camera = camera;
    }



    // ----------------------
    // Calculate orbit sizes
    // ----------------------

    getOrbitSizes (maxOrbit) {
        const minSunDist = (this.sizes.canvas - this.sizes.sun) / (maxOrbit * 2 + 1);
        let orbits = [0];
        for (let i = 1; i <= maxOrbit; i++) {
            orbits.push(this.sizes.sun + i * minSunDist * 2);
        }
        orbits.moon = minSunDist - this.sizes.moon;
        return orbits;
    }



    // ----------------------
    // Parse configuration
    // ----------------------

    getOrbits (config) {
        let orbits = [];
        for (let i = 0; i < config.planets.length; i++) {

            const planet = config.planets[i];

            if (!orbits[planet.orbit]) {
                orbits[planet.orbit] = {};
                orbits[planet.orbit].startAngle = Math.random() * 360;
                orbits[planet.orbit].planets = [];
            }

            orbits[planet.orbit].planets.push(planet);

            planet.system = this;
            planet.size = planet.size || (i ? config.sizes.planet : config.sizes.sun);
            planet.moons = planet.moons || [];

            planet.moons.forEach(moon => {
                moon.size = moon.size || config.sizes.moon
                moon.system = this;
            });



        }
        return orbits
    }


}