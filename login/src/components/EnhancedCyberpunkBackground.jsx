import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EnhancedCyberpunkBackground = ({ colors = {
  neonBlue: '#00F6FF',
  neonPink: '#FF2E97',
  darkPurple: '#1A0B2E',
} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles, dataStreams;
    let animationFrameId;

    const init = () => {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

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
          size: 0.1,
          color: colors.neonBlue,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
        
        dataStreams = new THREE.Points(geometry, material);
        scene.add(dataStreams);
        return { positions, velocities };
      };

      // Create particle field
      const createParticleField = () => {
        const geometry = new THREE.BufferGeometry();
        const particleCount = 3000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        for(let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
          
          // Alternate between blue and pink particles
          const color = new THREE.Color(i % 2 === 0 ? '#00F6FF' : '#FF2E97');
          colors[i * 3] = color.r;
          colors[i * 3 + 1] = color.g;
          colors[i * 3 + 2] = color.b;
          
          sizes[i] = Math.random() * 0.1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const material = new THREE.PointsMaterial({
          size: 0.1,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
        
        particles = new THREE.Points(geometry, material);
        scene.add(particles);
      };

      // Initialize effects
      const { positions: streamPositions, velocities: streamVelocities } = createDataStreams();
      createParticleField();

      // Position camera
      camera.position.z = 30;

      // Animation
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        // Animate particles
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        
        // Animate data streams
        const positions = dataStreams.geometry.attributes.position.array;
        for(let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= streamVelocities[i/3];
          if(positions[i + 1] < -20) {
            positions[i + 1] = 20;
          }
        }
        dataStreams.geometry.attributes.position.needsUpdate = true;

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
        window.removeEventListener('resize', handleResize);
      };
    };

    init();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (containerRef.current && renderer) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [colors]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10" />
  );
};

export default EnhancedCyberpunkBackground;