export default {

    createNode (className, size) {
        const $node = document.createElement('div');
        $node.className = className;
        if (size) $node.style.width = $node.style.height = size + 'px';
        return $node;
    }
    
}