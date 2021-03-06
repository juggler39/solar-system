(() => {


    


    const $system = document.getElementById('system');
    const config = planetaryConfig;
    const system = new PlanetarySystem($system, config);
    const sun = system.orbits[0].planets[0];
    const orbits = system.orbits.slice(1);
    const planets = orbits.map(orbit => orbit.planets).flat();

    let selected = null;



    function animate () {
        system.render();
        requestAnimationFrame(animate);
    }

    function setSpin (item) {
        item.spin = gsap.to(item, {
            duration: 2 * Math.PI * item.distance * config.speed,
            angle: item.angle + 360,
            repeat: -1,
            ease: Power0.easeNone
        })
    }

    function toggleClass (planet, className, value) {
        planet.$node.classList.toggle(className, value);
        planet.moonOrbit.$node.classList.toggle(className, value);
        planet.moons.forEach(moon => moon.$node.classList.toggle(className, value));
    }

    function activate () {

    }

    function deactivate () {

    }



    // ----------------------
    // Select
    // ----------------------

    function select (planet) {

        selected = planet;
        const duration = 1;
        const orbitSizes = system.getOrbitSizes(system.maxOrbit + 1);

        // selected.orbit.planets.forEach(planet => planet.spin.resume());
        toggleClass(selected, 'selected', true);

        sun.angle = 135;

        gsap.to(sun, {
            duration,
            // distance: Math.sqrt(2) * (config.sizes.canvas - config.sizes.sun) / 2
            distance: config.sizes.canvas / 2
        })

        gsap.to(selected, {
            duration,
            distance: 0
        })

        gsap.to(selected.moonOrbit, {
            duration,
            size: orbitSizes[1]
        })

        selected.moons.forEach(moon => gsap.to(moon, {
            duration,
            distance: orbitSizes[1] / 2
        }));

        planets.forEach(planet => planet !== selected && gsap.to(planet, {
            duration,
            distance: orbitSizes[planet.orbit.index + 1] / 2
        }))

        orbits.forEach(orbit => gsap.to(orbit, {
            duration,
            size: orbitSizes[orbit.index + 1]
        }))

    }



    // ----------------------
    // Deselect
    // ----------------------

    function deselect (full) {

        if (!selected) return;

        const duration = 1;
        const orbitSizes = system.getOrbitSizes();

        // selected.moons.forEach(moon => moon.spin.resume());
        toggleClass(selected, 'selected', false);

        gsap.to(selected.moonOrbit, {
            duration,
            size: orbitSizes.moon
        })

        selected.moons.forEach(moon => gsap.to(moon, {
            duration,
            distance: orbitSizes.moon / 2
        }));

        gsap.to(selected, {
            duration,
            distance: orbitSizes[selected.orbit.index] / 2
        })

        if (full) {

            gsap.to(sun, {
                duration,
                distance: 0
            })

            planets.forEach(planet => planet !== selected && gsap.to(planet, {
                duration,
                distance: orbitSizes[planet.orbit.index] / 2
            }))

            orbits.forEach(orbit => gsap.to(orbit, {
                duration,
                size: orbitSizes[orbit.index]
            }))

        }

        selected = null;

    }



    // ----------------------
    // Events
    // ----------------------

    planets.forEach(planet => {

        setSpin(planet);
        planet.moons.forEach(setSpin);

        planet.$node.addEventListener('mouseenter', () => {
            if (planet === selected) return;
            toggleClass(planet, 'active', true);
            planet.orbit.planets.forEach(planet => planet.spin.pause());
        })

        planet.$node.addEventListener('mouseleave', () => {
            toggleClass(planet, 'active', false);
            planet.orbit.planets.forEach(planet => planet.spin.resume());
        })

        planet.$node.addEventListener('click', () => {
            if (selected === planet) return;
            deselect();
            select(planet);
        })

        planet.moons.forEach(moon => {

            moon.$node.addEventListener('mouseenter', () => {
                if (moon.planet !== selected) return;
                moon.planet.moons.forEach(moon => moon.spin.pause());
            })

            moon.$node.addEventListener('mouseleave', () => {
                if (moon.planet !== selected) return;
                moon.planet.moons.forEach(moon => moon.spin.resume());
            })

        })

    })

    sun.$node.addEventListener('click', () => {
        if (selected) deselect(true);
    })


    const $dimension = document.getElementById('dimension');

    $dimension.addEventListener('click', () => {
        if ($dimension.textContent === '2D') {
            $dimension.textContent = '3D'
            system.setCamera({ ...config.camera, angle: 0 });
        }
        else {
            $dimension.textContent = '2D'
            system.setCamera({ ...config.camera });
        }
    })


    animate();



})();


