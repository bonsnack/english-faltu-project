

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const materials = {
  leaf: new THREE.MeshPhysicalMaterial({
    color: "#477b3e", roughness: 0.65, metalness: 0
  }),
  wood: new THREE.MeshStandardMaterial({
    color: "#765035", roughness: 0.85
  }),
  gold: new THREE.MeshPhysicalMaterial({
    color: "#c49a48", metalness: 0.85, roughness: 0.23
  }),
  glass: new THREE.MeshPhysicalMaterial({
    color: "#b7d9d4", metalness: 0.1,
    roughness: 0.08, transmission: 0.8,
    thickness: 0.5, transparent: true
  }),
  earth: new THREE.MeshStandardMaterial({
    color: "#245d87", roughness: 0.75
  }),
  soil: new THREE.MeshStandardMaterial({
    color: "#79543b", roughness: 1
  }),
  white: new THREE.MeshStandardMaterial({
    color: "#e9e5d9", roughness: 0.7
  }),
  dark: new THREE.MeshStandardMaterial({
    color: "#30332f", roughness: 0.55
  }),
};

function Leaf({ position, rotation = [0, 0, 0], scale = 1 }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}
      material={materials.leaf}>
      <sphereGeometry args={[0.35, 24, 16]} />
    </mesh>
  );
}

function Seedling() {
  return (
    <group>
      <mesh position={[0, -1.15, 0]} material={materials.soil}>
        <cylinderGeometry args={[0.65, 0.48, 0.5, 32]} />
      </mesh>
      <mesh position={[0, -0.2, 0]} material={materials.leaf}>
        <cylinderGeometry args={[0.035, 0.055, 1.5, 12]} />
      </mesh>
      <Leaf position={[-0.35, 0.35, 0]} rotation={[0, 0, 0.6]} />
      <Leaf position={[0.35, 0.65, 0]} rotation={[0, 0, -0.6]} />
      <Leaf position={[0, 0.95, 0]} scale={0.8} />
    </group>
  );
}

function Earth() {
  return (
    <group>
      <mesh material={materials.earth}>
        <sphereGeometry args={[1.25, 64, 64]} />
      </mesh>
      {[[-0.4, 0.4, 0.9], [0.5, -0.25, 0.85], [-0.7, -0.5, 0.6]].map((p, i) => (
        <mesh key={i} position={p} scale={[0.55, 0.35, 0.12]}
          material={materials.leaf}>
          <sphereGeometry args={[1, 32, 24]} />
        </mesh>
      ))}
      <mesh rotation={[1.1, 0.3, 0]} material={materials.gold}>
        <torusGeometry args={[1.55, 0.012, 8, 100]} />
      </mesh>
    </group>
  );
}

function Roots() {
  return (
    <group>
      <mesh position={[0, 0.65, 0]} material={materials.wood}>
        <cylinderGeometry args={[0.2, 0.32, 1.4, 24]} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return (
          <mesh key={i}
            position={[Math.cos(angle) * 0.55, -0.55, Math.sin(angle) * 0.55]}
            rotation={[0, 0, -Math.cos(angle) * 0.9]}>
            <cylinderGeometry args={[0.035, 0.11, 1.3, 12]} />
            <primitive object={materials.wood} attach="material" />
          </mesh>
        );
      })}
      <Leaf position={[-0.35, 1.45, 0]} />
      <Leaf position={[0.3, 1.5, 0]} />
      <Leaf position={[0, 1.9, 0]} />
    </group>
  );
}

function Wealth() {
  return (
    <group>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i}
          position={[(i % 3 - 1) * 0.42, Math.floor(i / 3) * 0.13 - 0.5, 0]}
          material={materials.gold}>
          <cylinderGeometry args={[0.24, 0.24, 0.09, 48]} />
        </mesh>
      ))}
      <mesh position={[0, 0.55, 0]} material={materials.gold}>
        <torusGeometry args={[0.3, 0.09, 16, 48]} />
      </mesh>
    </group>
  );
}

function Network() {
  const nodes = [
    [0, 0, 0], [-0.8, 0.5, 0.2], [0.7, 0.6, -0.2],
    [-0.8, -0.6, 0], [0.8, -0.5, 0.2],
    [0, 1, 0.2], [0, -1, -0.2]
  ];
  const links = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,5],[3,6],[4,6],[1,3],[2,4]];
  return (
    <group>
      {links.map(([a,b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const direction = new THREE.Vector3().subVectors(end, start);
        return (
          <mesh key={i} position={start.clone().add(end).multiplyScalar(0.5)}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0,1,0), direction.clone().normalize()
            )}>
            <cylinderGeometry args={[0.018, 0.018, direction.length(), 8]} />
            <meshStandardMaterial color="#a5bd83" emissive="#365b2c" emissiveIntensity={0.5}/>
          </mesh>
        );
      })}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial color="#c8d69a" emissive="#718c47" emissiveIntensity={1.2}/>
        </mesh>
      ))}
    </group>
  );
}

function Hourglass() {
  return (
    <group>
      <mesh position={[0, 0.95, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 48]} />
      </mesh>
      <mesh position={[0, -0.95, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.65, 0.65, 0.1, 48]} />
      </mesh>
      <mesh material={materials.glass}>
        <cylinderGeometry args={[0.55, 0.55, 1.8, 48, 1, true]} />
      </mesh>
      <mesh position={[0, -0.4, 0]} material={materials.gold}>
        <coneGeometry args={[0.43, 0.8, 48]} />
      </mesh>
      <mesh position={[0, -0.65, 0]} material={materials.soil}>
        <sphereGeometry args={[0.35, 32, 24]} />
      </mesh>
    </group>
  );
}

function Community() {
  return (
    <group>
      {Array.from({ length: 5 }, (_, i) => {
        const x = (i - 2) * 0.48;
        const colors = ["#bd895c", "#8f6044", "#d3a67b", "#a66d4e", "#c28c65"];
        return (
          <group key={i} position={[x, -0.2, i % 2 ? -0.15 : 0.15]}>
            <mesh position={[0, 0.85, 0]}>
              <sphereGeometry args={[0.19, 32, 32]} />
              <meshStandardMaterial color={colors[i]} roughness={0.8}/>
            </mesh>
            <mesh position={[0, 0.2, 0]}>
              <capsuleGeometry args={[0.19, 0.65, 8, 16]} />
              <primitive object={materials.white} attach="material"/>
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function Crops() {
  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} position={[(i - 2.5) * 0.3, -0.6, 0]}>
          <mesh position={[0, 0.75, 0]} material={materials.leaf}>
            <cylinderGeometry args={[0.025, 0.04, 1.6, 10]} />
          </mesh>
          <Leaf position={[-0.16, 0.45, 0]} scale={0.55}/>
          <Leaf position={[0.16, 0.8, 0]} scale={0.55}/>
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={j} position={[0, 1.5 + j * 0.1, 0]}>
              <sphereGeometry args={[0.065, 12, 12]}/>
              <primitive object={materials.gold} attach="material"/>
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Scales() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.07, 0.12, 1.9, 24]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 20]} rotation={[0,0,Math.PI/2]}/>
      </mesh>
      {[-0.65, 0.65].map((x, i) => (
        <group key={i} position={[x, 0.1, 0]}>
          <mesh position={[0, 0.3, 0]} material={materials.gold}>
            <cylinderGeometry args={[0.012, 0.012, 0.8, 8]} />
          </mesh>
          <mesh position={[0, -0.12, 0]} material={materials.gold}>
            <cylinderGeometry args={[0.38, 0.3, 0.08, 40]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.95, 0]} material={materials.gold}>
        <cylinderGeometry args={[0.55, 0.65, 0.15, 40]} />
      </mesh>
    </group>
  );
}

function Human() {
  return (
    <group>
      <mesh position={[0, 0.85, 0]} material={materials.white}>
        <sphereGeometry args={[0.48, 48, 48]} />
      </mesh>
      <mesh position={[0, -0.15, 0]} material={materials.white}>
        <cylinderGeometry args={[0.55, 0.8, 1.3, 48]} />
      </mesh>
      <mesh position={[0, -0.85, 0]} material={materials.white}>
        <cylinderGeometry args={[0.8, 0.9, 0.2, 48]} />
      </mesh>
    </group>
  );
}

function Book() {
  return (
    <group rotation={[0.1, 0, -0.12]}>
      {[-0.52, 0.52].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh material={materials.gold} position={[0, 0, -0.08]}>
            <boxGeometry args={[1, 1.35, 0.12]} />
          </mesh>
          <mesh material={materials.white} position={[0, 0.02, 0]}>
            <boxGeometry args={[0.91, 1.25, 0.09]} />
          </mesh>
          {Array.from({ length: 5 }, (_, j) => (
            <mesh key={j} position={[0, 0.38 - j * 0.16, 0.06]}>
              <boxGeometry args={[0.62, 0.012, 0.008]} />
              <meshStandardMaterial color="#b9b4a6"/>
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 0, -0.1]} material={materials.gold}>
        <boxGeometry args={[0.12, 1.4, 0.2]} />
      </mesh>
    </group>
  );
}

function Climate() {
  return (
    <group>
      <Earth />
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[
          Math.cos(i * 1.25) * 1.5,
          Math.sin(i * 1.25) * 0.8,
          0.1
        ]}>
          <sphereGeometry args={[0.22, 24, 24]}/>
          <meshPhysicalMaterial color="#e3e9e5" roughness={0.9}/>
        </mesh>
      ))}
    </group>
  );
}

function Brain() {
  return (
    <group>
      {[-0.4, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} scale={[0.75, 0.85, 0.7]}
          material={materials.white}>
          <sphereGeometry args={[0.8, 48, 48]} />
        </mesh>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i}
          position={[Math.sin(i * 1.3) * 0.65, Math.cos(i * 1.3) * 0.55, 0.55]}
          rotation={[0, 0, i * 0.4]}>
          <torusGeometry args={[0.25, 0.035, 10, 32]} />
          <meshStandardMaterial color="#b9a5a0" roughness={0.8}/>
        </mesh>
      ))}
    </group>
  );
}

const objects = {
  seedling: Seedling,
  globe: Earth,
  roots: Roots,
  wealth: Wealth,
  network: Network,
  hourglass: Hourglass,
  community: Community,
  crop: Crops,
  scales: Scales,
  head: Human,
  book: Book,
  climate: Climate,
  brain: Brain,
};

export default function TopicObject({ type }) {
  const group = useRef();
  const ObjectComponent = objects[type] || Seedling;

  useEffect(() => {
    if (!group.current) return;

    const timeline = gsap.timeline();
    timeline.fromTo(
      group.current.position,
      { x: 1.2, y: -0.2 },
      { x: 0, y: 0, duration: 1.4, ease: "power3.out" }
    );
    timeline.fromTo(
      group.current.scale,
      { x: 0.65, y: 0.65, z: 0.65 },
      { x: 1, y: 1, z: 1, duration: 1.3, ease: "back.out(1.4)" },
      "-=1.1"
    );

    return () => timeline.kill();
  }, [type]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.position.y += Math.sin(state.clock.elapsedTime) * delta * 0.035;
    }
  });

  return (
    <>
      <group ref={group}>
        <ObjectComponent />
      </group>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.35}
        scale={5}
        blur={2.5}
      />
      <Environment files="/hdri/studio_small_03_1k.hdr" />
    </>
  );
}
