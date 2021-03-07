const planetarySystem = (() => {



    // ----------------------
    // Constants
    // ----------------------

    const $system = document.querySelector('.system');
    const $note = document.querySelector('.note');
    const $nav = document.querySelector('.nav');
    const config = planetaryConfig;
    const system = new PlanetarySystem($system, config);
    const sun = system.orbits[0].planets[0];
    const orbits = system.orbits.slice(1);
    const planets = orbits.map(orbit => orbit.planets).flat();



    // ----------------------
    // Variables
    // ----------------------

    let links = [];
    let selected = null;
    let spins = [];



    // ----------------------
    // Helpers
    // ----------------------

    function setSpin (item) {
        item.spin = gsap.to(item, {
            duration: 2 * Math.PI * item.distance * config.speed,
            angle: item.angle + 360,
            repeat: -1,
            ease: Power0.easeNone
        });
        spins.push(item.spin);
    }

    function setTranslate (item, options) {
        item.translate && item.translate.kill();
        item.translate = gsap.to(item, options);
    }

    function toggleClass (planet, className, value) {
        planet.$node.classList.toggle(className, value);
        planet.moonOrbit.$node.classList.toggle(className, value);
        planet.moons.forEach(moon => moon.$node.classList.toggle(className, value));
    }


    // ----------------------
    // Nav
    // ----------------------

    planets.forEach(planet => {
        const $link = $nav.appendChild(document.createElement('a'));
        $link.textContent = planet.title;
        $link.addEventListener('click', () => planet.$node.click());
        links.push($link);
    })





    // ----------------------
    // Select
    // ----------------------

    function select (planet) {

        selected = planet;
        const duration = 1;
        const orbitSizes = system.getOrbitSizes(system.maxOrbit + 1);

        links[planets.indexOf(planet)].classList.add('active');
        toggleClass(selected, 'selected', true);

        sun.angle = 135;

        setTranslate(sun, {
            duration,
            distance: Math.sqrt(2) * (config.sizes.canvas - config.sizes.sun) / 2
        })

        setTranslate(selected, {
            duration,
            scale: config.sizes.sun / selected.size,
            distance: 0
        })

        setTranslate(selected.moonOrbit, {
            duration,
            size: orbitSizes[1]
        })

        selected.moons.forEach(moon => setTranslate(moon, {
            duration,
            scale: config.sizes.planet / moon.size,
            distance: orbitSizes[1] / 2
        }));

        planets.forEach(planet => planet !== selected && setTranslate(planet, {
            duration,
            scale: 1,
            distance: orbitSizes[planet.orbit.index + 1] / 2
        }))

        orbits.forEach(orbit => setTranslate(orbit, {
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

        links[planets.indexOf(selected)].classList.remove('active');
        toggleClass(selected, 'selected', false);

        setTranslate(selected, {
            duration,
            scale: 1,
            distance: orbitSizes[selected.orbit.index] / 2
        })

        setTranslate(selected.moonOrbit, {
            duration,
            size: orbitSizes.moon
        })

        selected.moons.forEach(moon => setTranslate(moon, {
            duration,
            scale: 1,
            distance: orbitSizes.moon / 2
        }));

        if (full) {

            setTranslate(sun, {
                duration,
                distance: 0
            })

            planets.forEach(planet => planet !== selected && setTranslate(planet, {
                duration,
                scale: 1,
                distance: orbitSizes[planet.orbit.index] / 2
            }))

            orbits.forEach(orbit => setTranslate(orbit, {
                duration,
                size: orbitSizes[orbit.index]
            }))

        }

        selected = null;

    }



    // ----------------------
    // Note
    // ----------------------

    function showNote (item) {
        const $h1 = $note.querySelector('h1');
        const $p = $note.querySelector('p');
        $h1.textContent = item.title;
        if (item.note) $p.textContent = item.note;
        $note.style.display = 'block';
    }

    function hideNote () {
        $note.style.display = 'none'
    }

    $note.querySelector('a').addEventListener('click', () => {
        hideNote();
    })



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
            if (selected === planet) showNote(planet);
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

            moon.$node.addEventListener('click', () => {
                showNote(moon);
            })

        })

    })

    sun.$node.addEventListener('click', () => {
        if (selected) deselect(true);
    })



    // ----------------------
    // Speed
    // ----------------------

    $system.addEventListener('system:slower', () => {
        spins.forEach(spin => {
            spin.timeScale(spin.timeScale() / 2)
        });
    })

    $system.addEventListener('system:faster', () => {
        spins.forEach(spin => {
            spin.timeScale(spin.timeScale() * 2)
        });
    })

    $system.addEventListener('system:pause', () => {
        spins.forEach(spin => spin.pause());
    })

    $system.addEventListener('system:play', () => {
        spins.forEach(spin => spin.play());
    })




    // ----------------------
    // Animate
    // ----------------------

    function animate () {
        system.render();
        requestAnimationFrame(animate);
    }

    animate();


    return system;

})();


