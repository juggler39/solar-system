(() => {

    const system = window.planetarySystem;
    const $map = document.querySelector('.map');
    const $view = $map.querySelector('.view');
    const $system = $view.querySelector('.system');



    // ----------------------
    // Speed
    // ----------------------

    const $slower = document.querySelector('.controls a:nth-child(1)');
    const $faster = document.querySelector('.controls a:nth-child(2)');
    const $stop = document.querySelector('.controls a:nth-child(3)');

    $stop.addEventListener('click', () => {
        if ($stop.textContent === 'Stop') {
            $stop.textContent = 'Play';
            planetarySystem.pause();
        }
        else {
            $stop.textContent = 'Stop';
            planetarySystem.play();
        }
    })

    $slower.addEventListener('click', () => {
        const scale = planetarySystem.timeScale;
        planetarySystem.setTimeScale(scale / 2);
    })

    $faster.addEventListener('click', () => {
        const scale = planetarySystem.timeScale;
        planetarySystem.setTimeScale(scale * 2);
    })



    // ----------------------
    // Zoom
    // ----------------------

    const $zoomIn = document.querySelector('.zoom a:first-child');
    const $zoomOut = document.querySelector('.zoom a:last-child');
    const $zoomVal = document.querySelector('.zoom p');

    $zoomIn.addEventListener('click', () => {
        Map.zoomTo({
            x: $view.offsetWidth / 2,
            y: $view.offsetHeight / 2
        }, Map.config.zoom + 0.1);
    })

    $zoomOut.addEventListener('click', () => {
        Map.zoomTo({
            x: $view.offsetWidth / 2,
            y: $view.offsetHeight / 2
        }, Map.config.zoom - 0.1);
    })

    $map.addEventListener('map:update', () => {
        $zoomVal.textContent = Math.floor(100 * Map.config.zoom) + '%'
    })

    $zoomVal.textContent = Math.floor(100 * Map.config.zoom) + '%'



    // ----------------------
    // 2D / 3D
    // ----------------------

    const $dimension = document.querySelector('.controls a:nth-child(4)');

    $dimension.addEventListener('click', () => {
        if ($dimension.textContent === '2D') {
            $dimension.textContent = '3D'
            planetarySystem.setCamera({ ...planetaryConfig.camera, angle: 0 });
        }
        else {
            $dimension.textContent = '2D'
            planetarySystem.setCamera({ ...planetaryConfig.camera });
        }
        Map.resize();
    })


})();