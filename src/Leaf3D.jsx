
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from "three";

export default function LeafShape({ current = 0 }) {
  const root = useRef();
  const leaf = useRef();
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    shape.moveTo(0, 1.65);
    shape.bezierCurveTo(0.8, 1.2, 1.05, 0.1, 0.55, -0.85);
    shape.bezierCurveTo(0.35, -1.2, 0.1, -1.55, 0, -1.7);
    shape.bezierCurveTo(-0.1, -1.55, -0.35, -1.2, -0.55, -0.85);
    shape.bezierCurveTo(-1.05, 0.1, -0.8, 1.2, 0, 1.65);

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 48
    });
  }, []);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 512, 1024);
    gradient.addColorStop(0, "#a4bd62");
    gradient.addColorStop(0.35, "#557c32");
    gradient.addColorStop(0.7, "#315b2d");
    gradient.addColorStop(1, "#173d25");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 1024);

    // Central leaf vein
    ctx.strokeStyle = "rgba(220, 207, 135, 0.8)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(256, 30);
    ctx.lineTo(256, 990);
    ctx.stroke();

    // Natural side veins
    for (let i = 0; i < 13; i++) {
      const y = 100 + i * 65;
      const length = 65 + Math.sin(i * 0.7) * 30;

      [-1, 1].forEach((side) => {
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "rgba(213, 216, 155, 0.55)";
        ctx.moveTo(256, y);
        ctx.quadraticCurveTo(
          256 + side * length * 0.45,
          y - 35,
          256 + side * length,
          y - 80
        );
        ctx.stroke();
      });
    }

    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;

    return map;
  }, []);

  useEffect(() => {
    if (!root.current) return;

    const startX = -viewport.width / 2 - 2;
    const endX = viewport.width / 2 + 2;

    gsap.set(root.current.position, {
      x: startX,
      y: 1.2,
      z: 0
    });

    const flight = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { ease: "sine.inOut" }
    });

    flight.to(root.current.position, {
      x: endX,
      y: -0.6,
      z: 0.5,
      duration: 11
    });

    const rotation = gsap.to(root.current.rotation, {
      z: 0.28,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      flight.kill();
      rotation.kill();
    };
  }, [viewport.width]);

  useFrame((state) => {
    if (!leaf.current) return;

    const t = state.clock.elapsedTime;

    leaf.current.rotation.y =
      Math.sin(t * 1.1) * 0.38;

    leaf.current.rotation.x =
      Math.cos(t * 0.8) * 0.16;

    leaf.current.rotation.z =
      Math.sin(t * 0.65) * 0.08;
  });

  return (
    <group ref={root}>
      <group ref={leaf} scale={0.65}>
        <mesh geometry={geometry} castShadow>
          <meshPhysicalMaterial
            map={texture}
            color="#ffffff"
            roughness={0.42}
            metalness={0.02}
            clearcoat={0.65}
            clearcoatRoughness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0, 0.09]}>
          <cylinderGeometry args={[0.012, 0.022, 3.05, 10]} />
          <meshStandardMaterial
            color="#d3c47e"
            roughness={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
