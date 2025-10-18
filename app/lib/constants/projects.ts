export interface Project {
  id: number;
  category: string;
  title: string;
  images: string[];
  tech: string[];
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    category: "Página Web Corporativa",
    title: "Deprotec",
    images: [
      "/images/projects/deprotec/deprotec1.webp",
      "/images/projects/deprotec/deprotec2.webp",
      "/images/projects/deprotec/deprotec3.webp",
      "/images/projects/deprotec/deprotec4.webp",
      "/images/projects/deprotec/deprotec5.webp"
    ],
    tech: ["Laravel", "Livewire", "MySQL"]
  },
  {
    id: 2,
    category: "Sistema Web Empresarial",
    title: "Panificadora C & V",
    images: [
      "/images/projects/panificadora-cv/panificadora-cv1.webp",
      "/images/projects/panificadora-cv/panificadora-cv2.webp",
      "/images/projects/panificadora-cv/panificadora-cv3.webp",
      "/images/projects/panificadora-cv/panificadora-cv4.webp",
      "/images/projects/panificadora-cv/panificadora-cv5.webp",
      "/images/projects/panificadora-cv/panificadora-cv6.webp",
      "/images/projects/panificadora-cv/panificadora-cv7.webp",
      "/images/projects/panificadora-cv/panificadora-cv8.webp"
    ],
    tech: ["Angular", "Spring Boot", "PostgreSQL"]
  },
  {
    id: 3,
    category: "Landing Page",
    title: "Placatic",
    images: [
      "/images/projects/placatic/placatic1.webp",
      "/images/projects/placatic/placatic2.webp",
      "/images/projects/placatic/placatic3.webp"
    ],
    tech: ["WordPress", "PHP", "MySQL"]
  },
  {
    id: 4,
    category: "Sistema Web Empresarial",
    title: "Lavaquick Express",
    images: [
      "/images/projects/lavaquick/lavaquick1.webp",
      "/images/projects/lavaquick/lavaquick2.webp",
      "/images/projects/lavaquick/lavaquick3.webp",
      "/images/projects/lavaquick/lavaquick4.webp",
      "/images/projects/lavaquick/lavaquick5.webp",
      "/images/projects/lavaquick/lavaquick6.webp",
      "/images/projects/lavaquick/lavaquick7.webp",
      "/images/projects/lavaquick/lavaquick8.webp",
      "/images/projects/lavaquick/lavaquick9.webp"
    ],
    tech: ["Laravel", "MySQL", "Splade"]
  },
  {
    id: 5,
    category: "Sistema Web Institucional",
    title: "Simepar Sofía",
    images: [
      "/images/projects/simeparsofia/simeparsofia1.webp",
      "/images/projects/simeparsofia/simeparsofia2.webp",
      "/images/projects/simeparsofia/simeparsofia3.webp",
      "/images/projects/simeparsofia/simeparsofia4.webp",
      "/images/projects/simeparsofia/simeparsofia5.webp",
      "/images/projects/simeparsofia/simeparsofia6.webp",
      "/images/projects/simeparsofia/simeparsofia7.webp",
      "/images/projects/simeparsofia/simeparsofia8.webp"
    ],
    tech: ["PHP", "HTML", "JavaScript", "MySQL"]
  }
];
