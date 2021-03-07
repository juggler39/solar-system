export default {

    createNode (className, size, tag = 'div') {
        const $node = document.createElement(tag);
        $node.className = className;
        if (size) $node.style.width = $node.style.height = size + 'px';
        return $node;
    },

    getSceneHeight (size, { perspective, angle }) {
        const a = angle * Math.PI / 180;
        const y = size / 2 * Math.cos(a); // size/2 - sun in the center
        const z = size / 2 * Math.sin(a);
        const h = size / 2 + (y - size / 2) * perspective / (perspective + z);
        return h * 2;
    }
    
}