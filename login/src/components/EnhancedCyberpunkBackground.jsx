import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EnhancedCyberpunkBackground = ({ colors = {
  neonBlue: '#00F6FF',
  neonPink: '#FF2E97',
  darkPurple: '#1A0B2E',
} }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles, dataStreams;
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      sceneRef.current = scene;
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);

      // Create data streams effect
      const createDataStreams = () => {
        const geometry = new THREE.BufferGeometry();
        const streamCount = 50;
        const positions = new Float32Array(streamCount * 3);
        const velocities = new Float32Array(streamCount);
        
        for(let i = 0; i < streamCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 40;
          positions[i * 3 + 1] = Math.random() * 40 + 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
          velocities[i] = Math.random() * 0.2 + 0.1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
          size: 0.05,
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        });
        
        dataStreams = new THREE.Points(geometry, material);
        scene.add(dataStreams);
        return { positions, velocities };
      };

      // Create particle field
      const createParticleField = () => {
        const geometry = new THREE.BufferGeometry();
        const particleCount = 5000; // Increased particle count
        const positions = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 50;
          positions[i + 1] = (Math.random() - 0.5) * 50;
          positions[i + 2] = (Math.random() - 0.5) * 50;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
          size: 0.05,
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true
        });
        
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
      };

      // Initialize effects
      const { positions: streamPositions, velocities: streamVelocities } = createDataStreams();
      createParticleField();

      // Position camera
      camera.position.z = 30;

      // Handle mouse movement
      const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Animation
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        // Animate particles with enhanced mouse interaction
        if (particles) {
          particles.rotation.y += 0.0005;
          particles.rotation.x += 0.0002;
          particles.position.x = mouseX * 0.5;
          particles.position.y = mouseY * 0.5;
        }
        
        // Animate data streams
        if (dataStreams) {
          const positions = dataStreams.geometry.attributes.position.array;
          for(let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= streamVelocities[i/3];
            if(positions[i + 1] < -20) {
              positions[i + 1] = 20;
            }
          }
          dataStreams.geometry.attributes.position.needsUpdate = true;
        }

        // Enhanced camera movement
        if (camera) {
          camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
          camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
          camera.lookAt(scene.position);
        }

        renderer.render(scene, camera);
      };
      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    };

    init();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        rendererRef.current.domElement.remove();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [colors]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10" />
  );
};

export default EnhancedCyberpunkBackground;