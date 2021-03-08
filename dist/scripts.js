(() => {


    // ----------------------
    // Globals
    // ----------------------

    const config = planetaryConfig;
    const system = new PlanetarySystem(config);
    const $map = document.querySelector('.map');
    const $view = $map.querySelector('.view');
    const $system = $view.querySelector('.system');



    // ----------------------
    // Speed
    // ----------------------

    const $slower = document.getElementById('slower');
    const $faster = document.getElementById('faster');

    $slower.addEventListener('click', () => {
        system.setSpeed(system.speed / 1.5);
    })

    $faster.addEventListener('click', () => {
        system.setSpeed(system.speed * 1.5);
    })



    // ----------------------
    // Play / Stop
    // ----------------------

    const $stop = document.getElementById('stop');
    const $play = document.getElementById('play');

    $stop.addEventListener('click', () => {
        system.pause();
        $stop.classList.add('hidden');
        $play.classList.remove('hidden');
    })

    $play.addEventListener('click', () => {
        system.resume();
        $play.classList.add('hidden');
        $stop.classList.remove('hidden');
    })



    // ----------------------
    // Zoom
    // ----------------------

    const $zoomIn = document.getElementById('zoom-in');
    const $zoomOut = document.getElementById('zoom-out');
    const $zoomVal = document.getElementById('zoom-val');

    const origin = {
        x: system.sizes.canvas / 2,
        y: system.sizes.canvas / 2,
    }

    $zoomIn.addEventListener('click', () => {
        system.zoomTo(origin, system.zoom + 0.1);
    })

    $zoomOut.addEventListener('click', () => {
        system.zoomTo(origin, system.zoom - 0.1);
    })

    system.on('zoom', value => {
        $zoomVal.textContent = Math.floor(100 * value) + '%';
    })

    $zoomVal.textContent = Math.floor(100 * system.zoom) + '%';



    // ----------------------
    // 2D / 3D
    // ----------------------

    const $d2 = document.getElementById('d2');
    const $d3 = document.getElementById('d3');

    $d2.addEventListener('click', () => {
        system.setCamera({ angle: 0 });
        $d2.classList.add('hidden');
        $d3.classList.remove('hidden');
    })

    $d3.addEventListener('click', () => {
        system.setCamera(config.camera);
        $d3.classList.add('hidden');
        $d2.classList.remove('hidden');
    })



    // ----------------------
    // Nav
    // ----------------------

    const $nav = document.getElementById('nav');

    system.orbits.forEach(orbit => {
        orbit.planets.forEach(planet => {
            if (!planet.title) return;
            const $link = document.createElement('a')
            $link.textContent = planet.title;
            $link.addEventListener('click', () => planet.select());
            $nav.appendChild($link);
        })
    })

    system.on('planet:select', planet => {
    })

    system.on('planet:deselect', planet => {
        Array.from($nav.children).forEach($link => {

        })
    })



    // ----------------------
    // Note
    // ----------------------

    const $note = document.getElementById('note');
    const $noteTitle = $note.querySelector('h1');
    const $noteText = $note.querySelector('p');
    const $noteClose = $note.querySelector('a');

    function showNote () {

    }

    system.on('planet:click', planet => {
        showNote(planet);
    })

    system.on('moon:click', moon => {
        showNote(moon);
    })



    // ----------------------
    // Stars
    // ----------------------

    const $stars = document.getElementById('stars');
    const starsCtx = $stars.getContext('2d');

    const area = 4000;
    let stars = [];

    function minmax (min, max) {
        return min + Math.random() * (max - min);
    }

    function create () {
        let star = {};
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
        star.size = minmax(1, 3);
        star.alpha = 1;
        const duration = minmax(1, 3);
        const seek = Math.random() * duration;
        star.animation = gsap.to(star, { duration, alpha: 0, repeat: -1, yoyo: true }).seek(seek);
        return star;
    }

    function animate () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(10, 105, 210, ${star.alpha})`
            ctx.fillRect(star.x, star.y, star.size, star.size);
        })
        requestAnimationFrame(animate)
    }

    function resize () {
        const w = article.offsetWidth;
        const h = article.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        stars.forEach(star => star.animation.kill());
        stars = new Array(Math.round(w * h / area)).fill().map(create);
    }

    // resize();
    // animate();
    // window.addEventListener('resize', resize);

})();