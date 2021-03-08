(() => {

    const article = document.querySelector('article');
    const canvas = article.querySelector('.stars');
    const ctx = canvas.getContext('2d');

    const area = 4000;
    let stars = [];

    function minmax (min, max) {
        return min + Math.random() * (max - min);
    }

    function create () {
        let star = {};
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
        star.size = minmax(1, 3);
        star.alpha = 1;
        const duration = minmax(1, 3);
        const seek = Math.random() * duration;
        star.animation = gsap.to(star, { duration, alpha: 0, repeat: -1, yoyo: true }).seek(seek);
        return star;
    }

    function animate () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            ctx.fillStyle = `rgba(10, 105, 210, ${star.alpha})`
            ctx.fillRect(star.x, star.y, star.size, star.size);
        })
        requestAnimationFrame(animate)
    }

    function resize () {
        const w = article.offsetWidth;
        const h = article.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        stars.forEach(star => star.animation.kill());
        stars = new Array(Math.round(w * h / area)).fill().map(create);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);


})();