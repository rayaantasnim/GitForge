document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();
  gsap.registerPlugin(ScrollTrigger);

  // Audio Effect Simulator
  let soundEnabled = true;
  const soundBtn = document.getElementById("sound-toggle");
  const soundIcon = document.getElementById("sound-icon");

  const playBeep = (freq = 800, duration = 0.05) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.00001,
        ctx.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundIcon.setAttribute(
      "data-lucide",
      soundEnabled ? "volume-2" : "volume-x",
    );
    lucide.createIcons();
  });

  // Navigation Drawer Controller
  const hamburger = document.getElementById("hamburger-trigger");
  const closeBtn = document.getElementById("close-trigger");
  const navOverlay = document.getElementById("nav-overlay");
  const navBackdrop = document.getElementById("nav-backdrop");
  const overlayLinks = document.querySelectorAll(".nav-overlay-link");

  const openDrawer = () => {
    playBeep(900);
    document.body.classList.add("menu-open");
    navBackdrop.classList.remove("pointer-events-none");
    navBackdrop.classList.add("opacity-100");
    navOverlay.classList.remove("translate-x-full");
  };

  const closeDrawer = () => {
    playBeep(600);
    document.body.classList.remove("menu-open");
    navBackdrop.classList.add("pointer-events-none");
    navBackdrop.classList.remove("opacity-100");
    navOverlay.classList.add("translate-x-full");
  };

  hamburger.addEventListener("click", openDrawer);
  closeBtn.addEventListener("click", closeDrawer);
  navBackdrop.addEventListener("click", closeDrawer);

  overlayLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Command Palette Modal (Ctrl+K)
  const cmdModal = document.getElementById("cmd-modal");
  const cmdTrigger = document.getElementById("cmd-trigger");
  const cmdInput = document.getElementById("cmd-input");
  const cmdItems = document.querySelectorAll(".cmd-item");

  const openCmd = () => {
    cmdModal.classList.remove("opacity-0", "pointer-events-none");
    cmdInput.focus();
  };

  const closeCmd = () => {
    cmdModal.classList.add("opacity-0", "pointer-events-none");
  };

  cmdTrigger.addEventListener("click", openCmd);
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openCmd();
    }
    if (e.key === "Escape") closeCmd();
  });

  cmdModal.addEventListener("click", (e) => {
    if (e.target === cmdModal) closeCmd();
  });

  cmdItems.forEach((item) => item.addEventListener("click", closeCmd));

  // Terminal Code Snippets Switcher & Run Code Simulator
  const termCode = document.getElementById("code-terminal");
  const termOutput = document.getElementById("term-output");
  const runBtn = document.getElementById("run-code-btn");
  const langTabs = document.querySelectorAll(".lang-tab");

  const snippets = {
    cpp: `// GitForge SIMD AST Execution Thread\n#include <gitforge/core_simd.hpp>\n\nauto execute_ast_pass(RepoState& state) {\n    SIMDVector<uint64_t> delta_vec = state.vfs_map();\n    return delta_vec.parallel_transform_subms();\n}`,
    wasm: `;; WebAssembly AST SIMD Kernel Vectorizer\n(module\n  (func $vector_parse (param $ptr i32) (result i32)\n    v128.load (local.get $ptr)\n    i32x4.dot_i16x8_s\n  )\n)`,
    rust: `// Rust Peer Mesh CRDT Synchronization\npub async fn stream_deltas(peer: &WebRTCPeer) -> Result<(), Error> {\n    let delta = peer.calc_vector_clock().await?;\n    peer.broadcast_crdt(delta);\n    Ok(())\n}`,
  };

  langTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      playBeep(750);
      langTabs.forEach(
        (t) => (t.className = "lang-tab text-gray-400 hover:text-white pb-0.5"),
      );
      tab.className =
        "lang-tab text-neon-cyan font-bold border-b-2 border-neon-cyan pb-0.5";
      const lang = tab.getAttribute("data-lang");
      termCode.textContent = snippets[lang];
    });
  });

  runBtn.addEventListener("click", () => {
    playBeep(1200, 0.1);
    termOutput.innerHTML = `> Executing active thread vector pass...<br><span class="text-neon-cyan">> Processed 1,482,920 AST nodes in 0.11ms [SIMD PASS OK]</span>`;
  });

  // Benchmark Latency Slider
  const slider = document.getElementById("repo-slider");
  const repoVal = document.getElementById("repo-size-val");
  const gfTime = document.getElementById("gf-time");
  const legacyTime = document.getElementById("legacy-time");
  const gfBar = document.getElementById("gf-bar");
  const legacyBar = document.getElementById("legacy-bar");

  slider.addEventListener("input", (e) => {
    const gb = parseInt(e.target.value);
    repoVal.textContent = gb + " GB";
    const gfSec = (gb * 0.007).toFixed(2);
    const legacySec = Math.round(gb * 7.4);
    gfTime.textContent = gfSec + " sec";
    legacyTime.textContent = legacySec + " sec";

    gfBar.style.width = Math.max(3, gb * 0.2) + "%";
    legacyBar.style.width = Math.min(100, gb * 1.2) + "%";
  });

  // Subsystem Inspector Node Switcher
  const nodeBtns = document.querySelectorAll(".node-btn");
  const nodeTitle = document.getElementById("node-title");
  const nodeDesc = document.getElementById("node-desc");
  const nodeStat1 = document.getElementById("node-stat1");
  const nodeStat2 = document.getElementById("node-stat2");

  const nodeData = {
    kernel: {
      title: "WASM SIMD Kernel Engine",
      desc: "Processes abstract syntax trees in parallel WebAssembly vector registers. Achieves sub-millisecond incremental re-parsing without UI locks.",
      s1: "0.12ms / MB",
      s2: "18.4 MB Static",
    },
    vfs: {
      title: "Sparse VFS Memory Mapper",
      desc: "Streams sparse repository delta blobs on demand into virtual browser memory maps, eliminating multi-gigabyte disk write cycles.",
      s1: "100 GB/s Virtual",
      s2: "4.2 MB Delta Buffer",
    },
    webrtc: {
      title: "WebRTC CRDT Peer Mesh",
      desc: "Connects collaborative editor nodes directly over WebRTC peer-to-peer data channels with conflict-free vector state convergence.",
      s1: "0.08ms P2P Latency",
      s2: "Sub-kb State Packets",
    },
    runner: {
      title: "MicroVM Cloud Build Runner",
      desc: "Spins up ephemeral serverless containers bound to hardware accelerators for high-performance builds and zero-trust sandbox execution.",
      s1: "< 10ms Cold Start",
      s2: "Isolated GPU Binding",
    },
  };

  nodeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      playBeep(850);
      nodeBtns.forEach((b) =>
        b.classList.remove("border-neon-cyan", "glow-cyan", "active"),
      );
      btn.classList.add("border-neon-cyan", "glow-cyan", "active");
      const key = btn.getAttribute("data-node");
      const d = nodeData[key];
      nodeTitle.textContent = d.title;
      nodeDesc.textContent = d.desc;
      nodeStat1.textContent = d.s1;
      nodeStat2.textContent = d.s2;
    });
  });

  // Animated Hero Canvas Particles
  const canvas = document.getElementById("hero-canvas");
  const ctx = canvas.getContext("2d");
  let width,
    height,
    particles = [];

  const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 45; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
    });
  }

  const animateCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0, 240, 255, 0.4)";

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateCanvas);
  };
  animateCanvas();

  // GSAP Scroll Animations for Content Rows
  document.querySelectorAll(".content-row").forEach((row) => {
    gsap.from(row, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: row,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
});
