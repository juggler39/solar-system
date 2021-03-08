export default class Zoom {

    constructor (system) {

        this.system = system;
        this.minScale = 0;
        this.maxScale = 0;
        this.value = 0;

        this.resize();
        this.system.$node.addEventListener('wheel', () => this.wheel())
        window.addEventListener('resize', () => this.resize());



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


    }

    wheel (event) {

        if (event.deltaY > 0 && this.value === 0) return;
        if (event.deltaY < 0 && this.value === 1) return;

        event.preventDefault();

        const totalDelta = 1000;
        const delta = -event.deltaY / totalDelta;

        const { left, top } = $view.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;

        zoomTo({ x, y }, map.zoom + delta, duration);

    }



    // ----------------------
    // Resize
    // ----------------------

    resize () {

        const style = getComputedStyle(this.system.$node);
        const pt = parseFloat(style.getPropertyValue('padding-top'));
        const pr = parseFloat(style.getPropertyValue('padding-right'));
        const pb = parseFloat(style.getPropertyValue('padding-bottom'));
        const pl = parseFloat(style.getPropertyValue('padding-left'));

        const freeWidth = this.system.$node.offsetWidth - pr - pl;
        const freeHeight = this.system.$node.offsetHeight - pt - pb;
        const sceneWidth = this.system.$scene.offsetWidth;
        const sceneHeight = this.system.$scene.offsetHeight;

        this.value = 0.4;
        this.minScale = Math.min(freeWidth / sceneWidth, freeHeight / sceneHeight);
        this.maxScale = Math.min(freeWidth, freeHeight) / 2 / this.system.options.sizes.sun;

        this.system.scene.x = (freeWidth - sceneWidth * this.scale) / 2;
        this.system.scene.y = (freeHeight - sceneHeight * this.scale) / 2;
        this.system.emit('zoom', this.value);

    }

    get scale () {
        return this.minScale * Math.pow(this.maxScale / this.minScale, this.value);
    }

}