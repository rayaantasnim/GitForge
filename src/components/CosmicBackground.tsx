import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PAGES_DATA } from '../data/pagesData';

interface CosmicBackgroundProps {
  activeSlug: string;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ activeSlug }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetColorsRef = useRef<THREE.Color[]>([]);
  const currentColorsRef = useRef<THREE.Color[]>([]);

  // Update target colors when activeSlug changes
  useEffect(() => {
    const pageConfig = PAGES_DATA[activeSlug] || PAGES_DATA.core;
    targetColorsRef.current = pageConfig.theme.particleColors.map((hex) => new THREE.Color(hex));
  }, [activeSlug]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software rendering
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050a, 0.0009);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      2500
    );
    camera.position.z = 450;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Procedural Particle Glow Texture via 2D Canvas (Zero 404 dependencies)
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.18, 'rgba(220, 245, 255, 0.9)');
      gradient.addColorStop(0.45, 'rgba(120, 180, 255, 0.35)');
      gradient.addColorStop(0.75, 'rgba(60, 40, 120, 0.12)');
      gradient.addColorStop(1, 'rgba(5, 5, 10, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // 1. Layer A: Infinite Deep-Space Micro-Starfield (Distant Static Stars)
    const microStarCount = isSoftwareGl ? 1000 : 2200;
    const microStarGeo = new THREE.BufferGeometry();
    const microPositions = new Float32Array(microStarCount * 3);
    const microColors = new Float32Array(microStarCount * 3);

    for (let i = 0; i < microStarCount; i++) {
      const i3 = i * 3;
      microPositions[i3] = (Math.random() - 0.5) * 2200;
      microPositions[i3 + 1] = (Math.random() - 0.5) * 2200;
      microPositions[i3 + 2] = -300 - Math.random() * 1200;

      const brightness = 0.5 + Math.random() * 0.5;
      microColors[i3] = brightness * 0.8;
      microColors[i3 + 1] = brightness * 0.9;
      microColors[i3 + 2] = brightness * 1.0;
    }

    microStarGeo.setAttribute('position', new THREE.BufferAttribute(microPositions, 3));
    microStarGeo.setAttribute('color', new THREE.BufferAttribute(microColors, 3));

    const microStarMat = new THREE.PointsMaterial({
      size: 2.2,
      map: glowTexture || undefined,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const microStarfield = new THREE.Points(microStarGeo, microStarMat);
    scene.add(microStarfield);

    // 2. Layer B: Volumetric Infinite Deep-Space Nebula Cloud (Dynamic Particulates)
    const nebulaCount = isSoftwareGl ? 1400 : 3200;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    const nebulaBasePositions = new Float32Array(nebulaCount * 3);

    // Initialize with active theme palette
    const initialPalette = (PAGES_DATA[activeSlug] || PAGES_DATA.core).theme.particleColors.map(
      (c) => new THREE.Color(c)
    );
    currentColorsRef.current = initialPalette.map((c) => c.clone());
    targetColorsRef.current = initialPalette.map((c) => c.clone());

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      // Ellipsoidal galactic nebula cloud distribution
      const radius = 100 + Math.pow(Math.random(), 1.5) * 650;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.85;

      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * 0.65 + (Math.random() - 0.5) * 90;
      const z = radius * Math.cos(phi) * Math.sin(theta) * 0.9;

      nebulaPositions[i3] = x;
      nebulaPositions[i3 + 1] = y;
      nebulaPositions[i3 + 2] = z;

      nebulaBasePositions[i3] = x;
      nebulaBasePositions[i3 + 1] = y;
      nebulaBasePositions[i3 + 2] = z;

      const col = initialPalette[i % initialPalette.length];
      nebulaColors[i3] = col.r;
      nebulaColors[i3 + 1] = col.g;
      nebulaColors[i3 + 2] = col.b;
    }

    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeo.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMat = new THREE.PointsMaterial({
      size: 6.8,
      map: glowTexture || undefined,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const nebulaCloud = new THREE.Points(nebulaGeo, nebulaMat);
    scene.add(nebulaCloud);

    // Mouse Tracking with Smooth Parallax Damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      // Smooth color morphing to target colors
      const colorAttr = nebulaGeo.getAttribute('color') as THREE.BufferAttribute;
      const targetColors = targetColorsRef.current;
      const currentColors = currentColorsRef.current;

      if (targetColors.length > 0 && currentColors.length > 0) {
        let colorsChanged = false;

        for (let j = 0; j < currentColors.length; j++) {
          const target = targetColors[j % targetColors.length];
          const curr = currentColors[j];
          const diff = Math.abs(curr.r - target.r) + Math.abs(curr.g - target.g) + Math.abs(curr.b - target.b);
          if (diff > 0.005) {
            curr.lerp(target, 0.04);
            colorsChanged = true;
          }
        }

        if (colorsChanged) {
          const arr = colorAttr.array as Float32Array;
          for (let i = 0; i < nebulaCount; i++) {
            const i3 = i * 3;
            const chosenCol = currentColors[i % currentColors.length];
            arr[i3] = chosenCol.r;
            arr[i3 + 1] = chosenCol.g;
            arr[i3 + 2] = chosenCol.b;
          }
          colorAttr.needsUpdate = true;
        }
      }

      // Subtle volumetric drift (no procedural string lines)
      nebulaCloud.rotation.y = elapsedTime * 0.018 + mouse.x * 0.25;
      nebulaCloud.rotation.x = Math.sin(elapsedTime * 0.012) * 0.08 + mouse.y * 0.2;
      microStarfield.rotation.y = elapsedTime * 0.005 + mouse.x * 0.08;

      // Depth camera float
      camera.position.x = mouse.x * 75;
      camera.position.y = mouse.y * 60;
      camera.position.z = 450 + Math.sin(elapsedTime * 0.2) * 20;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      microStarGeo.dispose();
      microStarMat.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      if (glowTexture) glowTexture.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeTheme = (PAGES_DATA[activeSlug] || PAGES_DATA.core).theme;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-1000 ease-out"
      style={{
        background: activeTheme.nebulaGradient
      }}
    />
  );
};
