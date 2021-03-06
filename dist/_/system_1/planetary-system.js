const PlanetarySystem = (() => {


    
    // ----------------------
    // Helpers
    // ----------------------

    function createNode (className, size) {
        const $node = document.createElement('div');
        $node.className = className;
        $node.style.width = size + 'px';
        $node.style.height = size + 'px';
        return $node;
    }
    

    
    // ----------------------
    // Shape
    // ----------------------
    
    class Shape {
        
        constructor (config) {
            this.size = config.size;
            this.distance = config.distance;
            this.angle = config.angle;
            this.index = config.index;
            this.scale = config.index;
            this.$node = createNode('ps-planet', this.size);
        }
        
        render () {
            this.$node.style.transform = `translate(${this.x - this.size / 2}px, ${this.y - this.size / 2}px)`
        }
        
    }


    
    // ----------------------
    // Planet
    // ----------------------
    
    class Planet extends Shape {
        
        constructor(config) {
            super(config);
            this.orbit = config.orbit;
        }

        get x () {
            return this.distance * Math.cos(this.angle * Math.PI / 180);
        }

        get y () {
            return this.distance * Math.sin(this.angle * Math.PI / 180)
        }
        
    }


    
    // ----------------------
    // Moon
    // ----------------------
    
    class Moon extends Shape {
        
        constructor(config) {
            super(config);
            this.planet = config.planet;
        }

        get x () {
            return this.planet.x + this.distance * Math.cos(this.angle * Math.PI / 180);
        }

        get y () {
            return this.planet.y + this.distance * Math.sin(this.angle * Math.PI / 180)
        }
    }


    
    // ----------------------
    // Moon
    // ----------------------
    
    return class PlanetarySystem {
        
        constructor () {
        }
        
    }
    
})();