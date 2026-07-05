/* Ranjith P — Portfolio interactions */
(function () {
  // year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // mobile nav
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  // smooth scroll (native handles most; ensure hash offset)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document
    .querySelectorAll(".section, .skill, .project, .cert, .interests > div")
    .forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });

  // Matrix rain background
  const canvas = document.getElementById("matrix-bg");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let W, H, cols, drops;
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホSOCIRIDS<>{}[]/\\";
    const fontSize = 14;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.floor(W / fontSize);
      drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(5,6,10,0.08)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = fontSize + "px 'JetBrains Mono', monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        // gradient color
        ctx.fillStyle = Math.random() > 0.85 ? "#00e5ff" : "#7c5cff";
        ctx.fillText(text, x, y);
        if (y > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    setInterval(draw, 55);
  }
})();
