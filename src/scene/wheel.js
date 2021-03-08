export default function (scene) {

    scene.system.$node.addEventListener('wheel', event => {

        event.preventDefault();

        if (event.deltaY > 0 && scene.zoom === 0) return;
        if (event.deltaY < 0 && scene.zoom === 1) return;

        const delta = -event.deltaY / 1000;
        const origin = { x: event.clientX, y: event.clientY };

        scene.zoomTo(origin, scene.zoom + delta);

    })

}