(() => {


    const $system = document.getElementById('system');
    const system = new PlanetarySystem(config);


    const $ = PlanetaryUtils;
    const config = PlanetaryConfig;
    const maxOrbit = Math.max(...config.planets.map(planet => planet.orbit));
    const orbitNormalSizes = $.getOrbitSizes(maxOrbit);
    const orbitActiveSizes = $.getOrbitSizes(maxOrbit + 1);


    
    const orbits = $.getOrbits();

    orbits.forEach((planets, orbit) => {

        const $sunOrbit = $.append('ps-orbit', orbitNormalSizes.orbits[orbit]);
        const startAngle = Math.random() * 360;

        planets.forEach((planetConfig, i) => {
            const distance = orbitNormalSizes.orbits[orbit] / 2;
            const angle = startAngle + i * 360 / planets.length;
            const planet = new Planet({ ...planetConfig, angle, distance, i });
            planet.update();




            planetConfig.moons && planetConfig.moons.forEach((moonConfig, i) => {
                const distance = orbitNormalSizes.moon / 2;
                const angle = startAngle + i * 360 / planetConfig.moons.length;
                const moon = new Moon({ ...moonConfig, planet, angle, distance, i });
                moon.update();

                // const $moonOrbit = $.append('ps-moon-orbit', orbitNormalSizes.moon);
                // $moonOrbit.style.transform = `translate(${planet.x - orbitNormalSizes.moon / 2}px, ${planet.y - orbitNormalSizes.moon / 2}px)`

            }) 
        })
    })


    planet.$node.addEventListener('click', () => {
        if (planet.orbit === 0) {

        }
        else {
            gsap.to(planet, {distance: 0});
            planets.forEach(planet => {
                gsap.to(planet, {distance: orbitActiveSizes[planet.orbit]});
            })

        }

        // console.log('here');
    })



    //
    // const orbitPlanetsLength =  $.getOrbitPlanetsLength();
    //
    //
    // console.log(orbitPlanetsLength, orbitNormalSizes)
    //
    // const planets = config.planets.map(config => {
    //
    //     const distance = orbitNormalSizes[config.orbit] / 2;
    //     const angle = 0;
    //
    //     const planet = new Planet({
    //         ...config,
    //         angle,
    //         distance
    //     });
    //
    // })


    $system.style.width = config.size.canvas + 'px';
    $system.style.height = config.size.canvas + 'px';
    //
    //
    // const maxOrbit = Math.max(...config.planets.map(planet => planet.orbit));
    // const minSunDist = (config.size.canvas - config.size.sun) / (maxOrbit * 2 + 1);
    // const moonOrbitSize = minSunDist - config.size.moon;
    //
    // for (let i = maxOrbit; i > 0; i--) {
    //     const orbitSize = config.size.sun + i * minSunDist * 2;
    //     const $orbit = append('orbit', orbitSize);
    //     const $moonOrbit = append('moon-orbit', moonOrbitSize);
    //     $moonOrbit.style.transform = `translate(-50%, -50%) translateX(${orbitSize / 2}px)`
    //     const $planet = append('planet', config.size.planet);
    //     $planet.style.transform = `translate(-50%, -50%) translateX(${orbitSize / 2}px)`
    //
    //     const $moonRight = append('moon', config.size.moon);
    //     $moonRight.style.transform = `translate(-50%, -50%) translateX(${orbitSize / 2 + moonOrbitSize / 2}px)`
    //
    //     const $moonLeft = append('moon', config.size.moon);
    //     $moonLeft.style.transform = `translate(-50%, -50%) translateX(${orbitSize / 2 - moonOrbitSize / 2}px)`
    // }
    //
    // append('sun', config.size.sun);


//
// for (let i = maxOrbit; i > 0; i--) {
//     append('moon-orbit', config.size.sun + i * minSunDist * 2);
// }



})();

