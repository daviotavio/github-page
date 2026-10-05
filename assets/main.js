// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Contagem animada das métricas, só quando entram na tela
const metrics = document.querySelectorAll(".metric-num");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  metrics.forEach(el => el.textContent = el.dataset.count);
} else {
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });

  metrics.forEach(el => obs.observe(el));
}
