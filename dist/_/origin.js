$map.addEventListener('click', event => {

    const scale = zoom.scale;

    const { top, left } = $view.getBoundingClientRect();

    const origin = {
        x: (event.clientX - left - tx) / scale,
        y: (event.clientY - top - ty) / scale
    }

    $point.style.left = origin.x + 'px';
    $point.style.top = origin.y + 'px';


    if (scale === 1) zoom.scale = 0.5;
    else if (scale === 0.5) zoom.scale = 1;


    console.log(origin.x * zoom.scale);
    //
    // tx = origin.x - origin.x * zoom.scale;
    // ty = origin.y - origin.y * zoom.scale;
    // //
    // console.log(tx, ty)
    // // //
    // $system.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom.scale})`;

})




// --------------------
// Zoom
// --------------------

// new WheelIndicator({
//     elem: $view,
//     callback (event) {
//         const delta = event.deltaY > 0 ? -1 : 1;
//         zoom.value += delta * 0.1;
//         zoom.value = Math.min(zoom.value, 1);
//         zoom.value = Math.max(zoom.value, 0);
//         render();
//     }
// });


let tx = 512 - 512 * zoom.scale;
let ty = 512 - 512 * zoom.scale;

console.log(tx, ty);

const $point = document.createElement('div');
$point.style.width = $point.style.height = '10px'
$point.style.position = 'absolute';
$point.style.background = '#F00'
$system.appendChild($point)

$map.addEventListener('click', event => {

    const scale = zoom.scale;

    const { top, left } = $view.getBoundingClientRect();

    const origin = {
        x: (event.clientX - left - tx) / scale,
        y: (event.clientY - top - ty) / scale
    }

    $point.style.left = origin.x + 'px';
    $point.style.top = origin.y + 'px';


    if (scale === 1) zoom.scale = 0.5;
    else if (scale === 0.5) zoom.scale = 2;




    tx = origin.x - origin.x * zoom.scale;
    ty = origin.y - origin.y * zoom.scale;

    console.log(tx, ty);

    //
    // console.log(tx, ty)
    // //
    $system.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom.scale})`;

})