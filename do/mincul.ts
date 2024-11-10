import React, { useState, memo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { BoxBufferGeometry, MeshStandardMaterial } from 'three';

extend({ BoxBufferGeometry, MeshStandardMaterial });

const AnimatedMesh = memo(() => {
  const meshRef = useRef();
  const [color, setColor] = useState('red');
  const { position, rotation, scale } = useSpring({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <a.mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={() => setColor(color === 'red' ? 'blue' : 'red')}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  );
});

const App = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <AnimatedMesh />
    </Canvas>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
