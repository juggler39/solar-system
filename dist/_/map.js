const Map = (() => {



    // ----------------------
    // Elements
    // ----------------------

    const $map = document.querySelector('.map');
    const $view = $map.querySelector('.view');
    const $system = $view.querySelector('.system');



    // ----------------------
    // Config
    // ----------------------

    let map = {

        minScale: 0,
        maxScale: 0,
        maxValue: 1,
        zoom: 0,
        x: 0,
        y: 0,

        get scale () {
            return getScale(this.zoom);
        }

    }



    // ----------------------
    // Helpers
    // ----------------------

    function render () {
        $system.style.transform = `translate(${map.x}px, ${map.y}px) scale(${map.scale})`;
        $map.dispatchEvent(new Event('map:update'));
    }

    function getScale (zoom) {
        return map.minScale * Math.pow(map.maxScale / map.minScale, zoom);
    }

    function resize () {
        map.zoom = 0.5;
        map.minScale = Math.min($view.offsetWidth / $system.offsetWidth, $view.offsetHeight / $system.offsetHeight);
        map.maxScale = Math.min($view.offsetWidth, $view.offsetHeight) / 2 / planetarySystem.config.sizes.sun;
        map.x = ($view.offsetWidth - $system.offsetWidth * map.scale) / 2;
        map.y = ($view.offsetHeight - $system.offsetHeight * map.scale) / 2;
        render();
    }

    function zoomTo (origin, zoom, duration = 0.5) {

        const x0 = (origin.x - map.x) / map.scale;
        const y0 = (origin.y - map.y) / map.scale;

        zoom = Math.max(zoom, 0);
        zoom = Math.min(zoom, 1);

        map.zoom = zoom;
        map.x = origin.x - x0 * map.scale;
        map.y = origin.y - y0 * map. scale;

        render();

    }



    // ----------------------
    // Wheel
    // ----------------------

    $map.addEventListener('wheel', event => {

        if (event.deltaY > 0 && map.zoom === 0) return;
        if (event.deltaY < 0 && map.zoom === 1) return;

        event.preventDefault();

        const totalDelta = 1000;
        const totalTime = 3;
        const delta = -event.deltaY / totalDelta;
        const duration = totalTime * Math.abs(delta);

        const { left, top } = $view.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        zoomTo({ x, y }, map.zoom + delta, duration);

    })



    // --------------------
    // Movement
    // --------------------

    let drag = false;

    $system.addEventListener('mousedown', event => {
        drag = {
            pageX: event.pageX,
            pageY: event.pageY,
            mapX: map.x,
            mapY: map.y
        }
    })

    document.addEventListener('mousemove', event => {
        if (!drag) return;
        map.x = drag.mapX + event.pageX - drag.pageX;
        map.y = drag.mapY + event.pageY - drag.pageY;
        render();
    })

    document.addEventListener('mouseup', () => {
        drag = false;
    })

    document.addEventListener('mouseleave', () => {
        drag = false;
    })



    // --------------------
    // Initialization
    // --------------------

    resize();



    // --------------------
    // Exports
    // --------------------

    return {
        config: map,
        resize,
        zoomTo
    }


})();