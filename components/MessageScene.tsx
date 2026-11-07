'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MessageScene({ burst }: { burst: number }) {
  const host = useRef<HTMLDivElement>(null);
  const burstRef = useRef(burst);
  useEffect(() => { burstRef.current = burst; }, [burst]);
  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 15;
    scene.add(new THREE.HemisphereLight(0xffffff, 0x91a9e5, 3));
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(-4, 5, 8); scene.add(light);
    const bubble = new THREE.Shape();
    bubble.moveTo(-0.8, -0.45); bubble.quadraticCurveTo(-1, -0.45, -1, 0);
    bubble.quadraticCurveTo(-1, 0.65, 0, 0.65); bubble.quadraticCurveTo(1, 0.65, 1, 0);
    bubble.quadraticCurveTo(1, -0.5, 0.4, -0.55); bubble.lineTo(0.7, -0.9);
    bubble.quadraticCurveTo(0.1, -0.8, -0.1, -0.55); bubble.quadraticCurveTo(-0.5, -0.55, -0.8, -0.45);
    const geometry = new THREE.ExtrudeGeometry(bubble, { depth: 0.25, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.12, bevelThickness: 0.12, curveSegments: 24 });
    const materials = [0x2685ff, 0xc1d8ff, 0xc5baff].map(color => new THREE.MeshPhysicalMaterial({ color, metalness: 0.15, roughness: 0.16, clearcoat: 1 }));
    const items = [[-7.5, 2.6, -1, 0.48], [7.6, 2.1, -2, 0.45], [-7.4, -2.5, 0, 0.3], [7.4, -2.6, -1, 0.5]].map(([x,y,z,s], i) => {
      const mesh = new THREE.Mesh(geometry, materials[i % 3]); mesh.position.set(x,y,z); mesh.scale.setScalar(s); mesh.rotation.set(0.15, i % 2 ? -0.4 : 0.4, i % 2 ? 0.18 : -0.2); scene.add(mesh); return { mesh, x, y, initialY: y, scale: s };
    });
    let frame = 0, time = 0, previous = 0, px = 0, py = 0, visible = true, pulse = 0, lastBurst = burstRef.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = (e: PointerEvent) => { if(e.pointerType === 'mouse') { px = (e.clientX / innerWidth - 0.5) * 0.5; py = (e.clientY / innerHeight - 0.5) * 0.3; } };
    window.addEventListener('pointermove', pointer, { passive: true });
    const resize = new ResizeObserver(() => {
      renderer.setSize(el.clientWidth, el.clientHeight); camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix();
      const halfWidth = Math.tan(THREE.MathUtils.degToRad(17.5)) * camera.position.z * camera.aspect;
      items.forEach(item => {
        item.x = Math.sign(item.x) * halfWidth * 0.94;
        item.y = el.clientWidth < 760 ? Math.sign(item.initialY) * 3.9 : item.initialY;
        item.mesh.scale.setScalar(el.clientWidth < 760 ? 0.18 : item.scale);
        item.mesh.position.set(item.x, item.y, item.mesh.position.z);
      });
    }); resize.observe(el);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); observer.observe(el);
    const render = (now: number) => {
      frame = requestAnimationFrame(render);
      const dt = Math.min((now - previous) / 1000, 0.05); previous = now;
      if(!visible || document.hidden) return;
      const motion = !reduced.matches;
      if(motion) time += dt;
      if(lastBurst !== burstRef.current) { pulse = motion ? 1 : 0; lastBurst = burstRef.current; }
      pulse = Math.max(0, pulse - dt * 1.2);
      items.forEach(({ mesh, x, y }, i) => {
        const targetX = x + (motion ? px + Math.sin(time * 0.55 + i) * 0.12 : 0);
        const targetY = y + (motion ? -py + Math.sin(time * 0.7 + i) * 0.18 + pulse * Math.sin(pulse * Math.PI) * 0.7 : 0);
        mesh.position.x += (targetX - mesh.position.x) * 0.05; mesh.position.y += (targetY - mesh.position.y) * 0.05;
        if(motion) mesh.rotation.y = Math.sin(time * 0.4 + i) * 0.35;
      });
      renderer.render(scene, camera);
    }; frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); window.removeEventListener('pointermove', pointer); geometry.dispose(); materials.forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div ref={host} className="message-scene" aria-hidden="true"/>;
}
