(() => {


    // ----------------------
    // Globals
    // ----------------------

    const $map = document.getElementById('map');
    const system = new PlanetarySystem($map, planetaryConfig);
    console.log(system)




    // ----------------------
    // Speed
    // ----------------------

    const $slower = document.getElementById('slower');
    const $faster = document.getElementById('faster');

    $slower.addEventListener('click', () => {
        system.setTimeScale(system.timeScale / 1.5);
    })

    $faster.addEventListener('click', () => {
        system.setTimeScale(system.timeScale * 1.5);
    })



    // ----------------------
    // Play / Stop
    // ----------------------

    const $stop = document.getElementById('stop');
    const $play = document.getElementById('play');

    $stop.addEventListener('click', () => {
        system.pause();
        $stop.classList.add('u-hidden');
        $play.classList.remove('u-hidden');
    })

    $play.addEventListener('click', () => {
        system.resume();
        $play.classList.add('u-hidden');
        $stop.classList.remove('u-hidden');
    })



    // ----------------------
    // Zoom
    // ----------------------

    const $zoomIn = document.getElementById('zoom-in');
    const $zoomOut = document.getElementById('zoom-out');
    const $zoomVal = document.getElementById('zoom-val');

    function getZoomOrigin () {
        const { left, top, width, height } = $map.getBoundingClientRect();
        return { x: left + width, y: top + height }
    }

    $zoomIn.addEventListener('click', () => {
        system.scene.zoomTo(getZoomOrigin(), system.scene.zoom + 0.1);
    })

    $zoomOut.addEventListener('click', () => {
        system.scene.zoomTo(getZoomOrigin(), system.scene.zoom - 0.1);
    })

    system.on('zoom', value => {
        $zoomVal.textContent = Math.floor(100 * value) + '%';
    })

    $zoomVal.textContent = Math.floor(100 * system.scene.zoom) + '%';



    // ----------------------
    // 2D / 3D
    // ----------------------

    const $d2 = document.getElementById('d2');
    const $d3 = document.getElementById('d3');

    $d2.addEventListener('click', () => {
        system.setCamera({ angle: 0 });
        $d2.classList.add('u-hidden');
        $d3.classList.remove('u-hidden');
    })

    $d3.addEventListener('click', () => {
        system.setCamera(planetaryConfig.camera);
        $d3.classList.add('u-hidden');
        $d2.classList.remove('u-hidden');
    })



    // ----------------------
    // Nav
    // ----------------------

    const $nav = document.getElementById('nav');

    // system.orbits.forEach(orbit => {
    //     orbit.planets.forEach(planet => {
    //         if (!planet.title) return;
    //         const $link = document.createElement('a')
    //         $link.textContent = planet.title;
    //         $link.addEventListener('click', () => planet.select());
    //         $nav.appendChild($link);
    //     })
    // })

    // system.on('planet:select', planet => {
    // })
    //
    // system.on('planet:deselect', planet => {
    //     Array.from($nav.children).forEach($link => {
    //
    //     })
    // })



    // ----------------------
    // Note
    // ----------------------

    const $note = document.getElementById('note');
    const $noteTitle = $note.querySelector('h1');
    const $noteText = $note.querySelector('p');
    const $noteClose = $note.querySelector('a');

    function showNote (item) {
        const rect = item.$node.getBoundingClientRect();
        $note.style.left = rect.left + rect.width / 2 + 'px'
        $note.style.top = rect.top + rect.height / 2 + 'px'
        $noteTitle.textContent = item.label;
        $noteText.textContent = item.note;
        $note.style.display = 'block';
    }

    function hideNote () {
        $note.style.display = 'none';
    }

    function outsideNote (event) {
        console.log('outsideNote')
        let parent = event.target;
        while (parent) {
            if (parent === $note) return;
            parent = parent.parentNode;
        }
        hideNote();
    }

    system.on('click', showNote);
    $noteClose.addEventListener('click', hideNote);
    document.addEventListener('click', outsideNote, true);



    // ----------------------
    // Stars
    // ----------------------

    const $stars = document.getElementById('stars');
    const starsCtx = $stars.getContext('2d');

    const starArea = 64 * 64;
    let stars = [];

    function minmax (min, max) {
        return min + Math.random() * (max - min);
    }

    function createStar () {
        let star = {};
        star.x = Math.random() * $stars.width;
        star.y = Math.random() * $stars.height;
        star.size = minmax(1, 3);
        star.alpha = 1;
        const duration = minmax(1, 3);
        const seek = Math.random() * duration;
        star.animation = gsap.to(star, { duration, alpha: 0, repeat: -1, yoyo: true }).seek(seek);
        return star;
    }

    function animateStars () {
        starsCtx.clearRect(0, 0, $stars.width, $stars.height);
        stars.forEach(star => {
            starsCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
            starsCtx.fillRect(star.x, star.y, star.size, star.size);
        })
        requestAnimationFrame(animateStars);
    }

    function resizeStars () {
        const w = $stars.parentNode.offsetWidth;
        const h = $stars.parentNode.offsetHeight;
        $stars.width = w;
        $stars.height = h;
        stars.forEach(star => star.animation.kill());
        stars = new Array(Math.round(w * h / starArea)).fill().map(createStar);
    }

    resizeStars();
    animateStars();
    window.addEventListener('resize', resizeStars);

})();