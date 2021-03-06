const PlanetaryUtils = (() => {

    const config = PlanetaryConfig;
    const $system = document.getElementById('system');
    
    return {

        append (className, size) {
            const $div = document.createElement('div');
            $div.className = className;
            $div.style.width = size + 'px';
            $div.style.height = size + 'px';
            return $system.appendChild($div);
        },

        getOrbitSizesNew (maxOrbit) {
            const step = (config.size.canvas - config.size.sun - config.size.moon) / (maxOrbit * 2);
            const first = config.size.sun + config.size.moon + step;
            let orbits = [0];
            for (let i = 0; i < maxOrbit; i++) {
                orbits.push(first + i * step * 2);
            }
            return {
                orbits,
                moon: step - config.size.moon
            }
        },

        getOrbitSizes (maxOrbit) {
            const minSunDist = (config.size.canvas - config.size.sun) / (maxOrbit * 2 + 1);
            let orbits = [0];
            for (let i = 1; i <= maxOrbit; i++) {
                orbits.push(config.size.sun + i * minSunDist * 2);
            }            
            return {
                orbits,
                moon: minSunDist - config.size.moon
            }
        },
        
        getOrbits () {
            let orbits = [];
            for (let i = 0; i < config.planets.length; i++) {
                const planet = config.planets[i];
                if (!orbits[planet.orbit]) orbits[planet.orbit] = [];
                orbits[planet.orbit].push(planet);
            }    
            return orbits
        }
        
    }
    
})();