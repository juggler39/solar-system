export default {

    createNode (className, size) {
        const $node = document.createElement('div');
        $node.className = className;
        if (size) $node.style.width = $node.style.height = size + 'px';
        return $node;
    },

    getSceneHeight (size, { perspective, angle }) {
        const a = -angle * Math.PI / 180;
        const y = size - size * Math.cos(a);
        const z = size * Math.sin(a);
        return size - size / 2 - (y - size / 2) * perspective / (perspective - z);
    },
    
}