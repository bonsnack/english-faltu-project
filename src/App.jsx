
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import TopicObject from "./TopicObject";
import "./App.css";

const slides = [
  {
    category: "INTRODUCTION",
    title: "I Learned in the Forest",
    description:
      "What if the forest is more than a collection of trees? Vandana Shiva invites us to see nature as our greatest teacher.",
    point: "The forest teaches us how life survives through diversity and cooperation.",
    visual: "seedling"
  },
  {
    category: "POLITICS",
    title: "Who Owns Nature?",
    description:
      "Nature is not simply a resource to be controlled. Forests, rivers and seeds sustain every living community.",
    point: "Environmental decisions affect everyone, not just those in power.",
    visual: "globe"
  },
  {
    category: "GEOGRAPHY",
    title: "The Earth's Living Infrastructure",
    description:
      "Forests regulate rainfall, protect soil, store carbon and support the water cycle. They are essential systems of our planet.",
    point: "A healthy forest helps maintain the balance of Earth's ecosystems.",
    visual: "roots"
  },
  {
    category: "ECONOMICS",
    title: "The Invisible Wealth of Forests",
    description:
      "Forests provide food, medicine, clean water and livelihoods. Their value cannot be measured only through money.",
    point: "Nature's wealth is essential to human survival.",
    visual: "wealth"
  },
  {
    category: "SCIENCE",
    title: "The Hidden Network of Life",
    description:
      "Plants, fungi, animals and microorganisms interact in complex ways. Underground fungal networks can connect plant roots.",
    point: "Life depends on relationships between different organisms.",
    visual: "network"
  },
  {
    category: "HISTORY",
    title: "Humanity's Changing Relationship",
    description:
      "Across history, human communities have depended on forests. Industrialisation has also increased pressure on natural ecosystems.",
    point: "Our relationship with nature shapes our future.",
    visual: "hourglass"
  },
  {
    category: "SOCIOLOGY",
    title: "Women and Environmental Justice",
    description:
      "In many communities, women play important roles in protecting forests, collecting resources and passing on ecological knowledge.",
    point: "Environmental protection is also a question of social justice.",
    visual: "community"
  },
  {
    category: "AGRICULTURE",
    title: "Diversity Is Survival",
    description:
      "Traditional farming systems often preserve many varieties of seeds and crops. Biodiversity can make agriculture more resilient.",
    point: "A diverse food system is better prepared for change.",
    visual: "crop"
  },
  {
    category: "LAW",
    title: "Can Nature Have Rights?",
    description:
      "Some legal systems have recognised rights for natural ecosystems. These ideas challenge the belief that nature exists only for human use.",
    point: "Protecting nature can become a legal responsibility.",
    visual: "scales"
  },
  {
    category: "PHILOSOPHY",
    title: "Are Humans Above Nature?",
    description:
      "The chapter encourages us to question the idea that humans are separate from or superior to the natural world.",
    point: "Humans are part of nature, not outside it.",
    visual: "head"
  },
  {
    category: "EDUCATION",
    title: "Nature as a University",
    description:
      "A forest teaches through observation, experience and relationships. Learning does not happen only inside classrooms.",
    point: "Curiosity and observation are powerful ways to learn.",
    visual: "book"
  },
  {
    category: "CLIMATE SCIENCE",
    title: "Local Forests, Global Impact",
    description:
      "Forests absorb carbon, influence rainfall and support biodiversity. Their destruction can intensify environmental problems.",
    point: "Protecting local ecosystems contributes to global climate action.",
    visual: "climate"
  },
  {
    category: "HUMAN PSYCHOLOGY",
    title: "The Illusion of Human Superiority",
    description:
      "Modern life can make us forget our dependence on the natural world. Recognising that connection can change how we behave.",
    point: "Respect for nature begins with understanding our dependence on it.",
    visual: "brain"
  },
  {
    category: "CONCLUSION",
    title: "WE ARE PART OF NATURE.",
    description:
      "The forest is not separate from us. Its lessons remind us to respect diversity, protect life and live responsibly.",
    point: "When we protect nature, we protect our own future.",
    visual: "seedling"
  }
];



const palettes = [
  // 1. Royal Amethyst
  { start: "#160D2B", end: "#542A83", accent: "#D8B4FE" },

  // 2. Ruby Red
  { start: "#25070D", end: "#941E3A", accent: "#FFB4C2" },

  // 3. Emerald Green
  { start: "#061F19", end: "#087653", accent: "#9AF0C5" },

  // 4. Burnished Amber
  { start: "#281400", end: "#A6530B", accent: "#FFD08A" },

  // 5. Sapphire Blue
  { start: "#07142E", end: "#174A9C", accent: "#A9CEFF" },

  // 6. Champagne Gold
  { start: "#29200B", end: "#B18A32", accent: "#FFF0B0" },

  // 7. Deep Magenta
  { start: "#290820", end: "#A51D72", accent: "#FFB5E4" },

  // 8. Olive Gold
  { start: "#202000", end: "#77751B", accent: "#F0ED9A" },

  // 9. Arctic Cyan
  { start: "#071D29", end: "#087FA5", accent: "#A8EDFF" },

  // 10. Deep Teal
  { start: "#032326", end: "#087E83", accent: "#9CF5ED" },

  // 11. Terracotta
  { start: "#2A100B", end: "#B64B32", accent: "#FFC0A5" },

  // 12. Midnight Steel
  { start: "#101827", end: "#465A78", accent: "#C3D8F5" },

  // 13. Electric Indigo
  { start: "#100B35", end: "#3937B8", accent: "#B9B8FF" },

  // 14. Icy Mint
  { start: "#09262B", end: "#399A91", accent: "#B8FFF0" }
];



export default function App() {
  const [current, setCurrent] = useState(0);

  const slide = slides[current];
  const palette = palettes[current];

  const next = () => {
    setCurrent((previous) => Math.min(previous + 1, slides.length - 1));
  };

  const previous = () => {
    setCurrent((previous) => Math.max(previous - 1, 0));
  };

  const fullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "f" || event.key === "F") fullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      className="presentation"
      style={{
        "--slide-start": palette.start,
        "--slide-end": palette.end,
        "--slide-accent": palette.accent
      }}
    >
      <header className="topbar">
        <div className="brand">
          <span>FOREST LEARN</span>
          {current === 0 && <span className="brand-author">AKSHAT SHAH</span>}
        </div>
        <div className="slide-counter">
          {String(current + 1).padStart(2, "0")} / 14
        </div>
        <button className="fullscreen-button" onClick={fullscreen} aria-label="Fullscreen">
          <Maximize2 size={19} />
        </button>
      </header>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      <section className="slide-content" key={current}>
        <div className="text-panel">
          <p className="category">{slide.category}</p>

          <h1>{slide.title}</h1>

          <p className="description">{slide.description}</p>

          <div className="key-point">
            <span className="key-label">KEY IDEA</span>
            <p>{slide.point}</p>
          </div>
        </div>

        <div className="visual-panel">
          <div className="visual-number">
            {String(current + 1).padStart(2, "0")}
          </div>

          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 38 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.05} />
            <directionalLight position={[4, 5, 6]} intensity={2.1} />
            <pointLight position={[-4, 1, 3]} intensity={1.4} color="#d8c58b" />
            <pointLight position={[2, -3, -2]} intensity={0.8} color="#6e9b68" />
            <TopicObject type={slide.visual} current={current} />
          </Canvas>
        </div>
      </section>

      <footer className="navigation">
        <div className="chapter-name">
          EVERYTHING I NEED TO KNOW I LEARNED IN THE FOREST
        </div>

        <div className="nav-controls">
          <button onClick={previous} disabled={current === 0} aria-label="Previous slide">
            <ChevronLeft size={20} />
          </button>

          <button onClick={next} disabled={current === slides.length - 1} aria-label="Next slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </footer>
    </main>
  );
}
