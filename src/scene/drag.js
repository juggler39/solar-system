export default function (scene) {



    // ----------------------
    // Variables
    // ----------------------

    let drag = false;



    // ----------------------
    // Handlers
    // ----------------------

    function start (event) {
        drag = {
            clientX: event.clientX,
            clientY: event.clientY,
            sceneX: scene.x,
            sceneY: scene.y
        }
    }

    function move (event) {
        if (!drag) return;
        scene.x = drag.sceneX + event.clientX - drag.clientX;
        scene.y = drag.sceneY + event.clientY - drag.clientY;
        scene.render();
    }

    function end () {
        drag = false;
    }



    // ----------------------
    // Listeners
    // ----------------------

    scene.system.$node.addEventListener('mousedown', start);
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', end);
    document.addEventListener('mouseleave', end);


}