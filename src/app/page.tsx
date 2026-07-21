"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { InteractiveDemos } from "@/components/InteractiveDemos";
import { 
  Sun, Moon, Sparkles, 
  GraduationCap, Briefcase, Code2, Mail, Phone, 
  Github, Monitor
} from "lucide-react";

// Define originalDemosData outside the component as it's constant
const originalDemosData = [
  {
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "JSON Server"],
    demoUrl: "https://sistema-viaticos.vercel.app/",
    imageUrl: "/demos/viaticos-preview.png"
  },
  {
    technologies: ["Laravel", "Inertia.js", "React", "TailwindCSS"],
    demoUrl: "https://control-asistencia-4o5o.onrender.com/",
    imageUrl: "/demos/marcacion-preview.png"
  },
  {
    technologies: ["Laravel", "Inertia.js", "React", "TailwindCSS"],
    demoUrl: "https://sistema-monitoreo-fatiga-app.fly.dev/login",
    imageUrl: "/demos/monitor-fatiga-preview.png"
  }
];

// Define SectionKey type based on SECTIONS ids
type SectionKey = 
  | 'presentacion' 
  | 'formacion' 
  | 'experiencia' 
  | 'habilidades' 
  | 'maquetas' 
  | 'hobbies' 
  | 'contacto';

const SECTIONS = [
  { id: "presentacion", label: "Presentación" },
  { id: "formacion", label: "Formación" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
  { id: "maquetas", label: "Maquetas" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contacto", label: "Contacto" },
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("presentacion");
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const activeSectionRef = useRef(activeSection);

  // Estado para animación de entrada de sección
  const [animatedSection, setAnimatedSection] = useState<string | null>("presentacion");

  // Actualizar la ref cuando cambia activeSection
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => { setMounted(true); }, []);

  // Declarar cada ref individualmente
  const presentacionRef = useRef<HTMLDivElement>(null);
  const formacionRef = useRef<HTMLDivElement>(null);
  const experienciaRef = useRef<HTMLDivElement>(null);
  const habilidadesRef = useRef<HTMLDivElement>(null);
  const maquetasRef = useRef<HTMLDivElement>(null);
  const hobbiesRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const refs = useMemo(() => ({
    presentacion: presentacionRef,
    formacion: formacionRef,
    experiencia: experienciaRef,
    habilidades: habilidadesRef,
    maquetas: maquetasRef,
    hobbies: hobbiesRef,
    contacto: contactoRef,
  }), []);

  // Modificar el useEffect del IntersectionObserver para incluir 'refs' en el array de dependencias
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentSection = entry.target.id;
            const currentRect = entry.target.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const currentDistance = Math.abs(currentRect.top - viewportHeight / 2);

            const currentActiveRect = refs[activeSectionRef.current as keyof typeof refs]?.current?.getBoundingClientRect();
            const currentActiveDistance = currentActiveRect 
              ? Math.abs(currentActiveRect.top - viewportHeight / 2) 
              : Infinity;

            // Actualizar si la nueva sección está más cerca del centro de la pantalla
            if (currentDistance < currentActiveDistance) {
              setActiveSection(currentSection);
            }
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    // Observar todas las secciones
    Object.values(refs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [refs]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setAnimatedSection(id);
    const element = refs[id as keyof typeof refs]?.current;
    if (element) {
      const navHeight = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Traducciones para toda la página
  const t: {
    presentacion: Record<'es' | 'en', string>;
    formacion: Record<'es' | 'en', string>;
    experiencia: Record<'es' | 'en', string>;
    habilidades: Record<'es' | 'en', string>;
    maquetas: Record<'es' | 'en', string>;
    hobbies: Record<'es' | 'en', string>;
    contacto: Record<'es' | 'en', string>;
    presentacionText: Record<'es' | 'en', string>;
    professionalSummary: Record<'es' | 'en', string>;
    skillsByCategory: Record<'es' | 'en', Record<string, string[]>>;
    featuredProjects: Array<Record<'es' | 'en', { title: string; description: string; link: string }>>;
    hobbiesList: Record<'es' | 'en', string[]>;
    education: Array<Record<'es' | 'en', { title: string; description: string }>>;
    experiences: Array<Record<'es' | 'en', { title: string; company: string; description: string; content: string; technologies: string[] }>>;
    skills: Record<'es' | 'en', string[]>;
    artisticLighting: Record<'es' | 'en', string>;
    artisticLightingDesc: Record<'es' | 'en', string>;
    verSesion: Record<'es' | 'en', string>;
    canalYoutube: Record<'es' | 'en', string>;
    instagram: Record<'es' | 'en', string>;
    email: Record<'es' | 'en', string>;
    phone: Record<'es' | 'en', string>;
    github: Record<'es' | 'en', string>;
    linkedin: Record<'es' | 'en', string>;
    sendEmail: Record<'es' | 'en', string>;
    whatsapp: Record<'es' | 'en', string>;
    interactiveDemos: Array<Record<'es' | 'en', {
      title: string;
      description: string;
      features: string[];
    }>>;
    viewDemoButtonText: Record<'es' | 'en', string>;
    previousButtonAriaLabel: Record<'es' | 'en', string>;
    nextButtonAriaLabel: Record<'es' | 'en', string>;
    viewMoreText: Record<'es' | 'en', string>;
    closeButtonText: Record<'es' | 'en', string>;
  } = {
    presentacion: {
      es: "Presentación",
      en: "About Me"
    },
    formacion: {
      es: "Formación",
      en: "Education"
    },
    experiencia: {
      es: "Experiencia profesional",
      en: "Professional Experience"
    },
    habilidades: {
      es: "Habilidades",
      en: "Skills"
    },
    maquetas: {
      es: "Maquetas Interactivas",
      en: "Interactive Demos"
    },
    hobbies: {
      es: "Hobbies",
      en: "Hobbies"
    },
    contacto: {
      es: "Contacto",
      en: "Contact"
    },
    presentacionText: {
      es: "Con experiencia en el desarrollo de soluciones empresariales y sistemas de gestión documental. Me apasiona la tecnología en todas sus formas, desde el desarrollo web hasta la electrónica y la automatización. Actualmente trabajo en Xinerlink, donde participo en proyectos en la nube y desarrollo de integraciones. En mi tiempo libre, me dedico a crear proyectos innovadores como sistemas de iluminación LED para espectáculos audiovisuales. Siempre estoy aprendiendo y explorando nuevas formas de combinar el software con el hardware para crear experiencias interactivas únicas.",
      en: "With experience in the development of enterprise solutions and document management systems. I am passionate about technology in all its forms, from web development to electronics and automation. Currently working at Xinerlink, where I participate in cloud projects and integration development. In my free time, I create innovative projects such as LED lighting systems for audiovisual shows. I am always learning and exploring new ways to combine software with hardware to create unique interactive experiences."
    },
    professionalSummary: {
      es: "Desarrollador fullstack con foco en Laravel y Vue.js. Experiencia liderando proyectos escalables, con especial interés en automatización, IoT y optimización de procesos. Apasionado por la mejora continua y el aprendizaje autodidacta.",
      en: "Fullstack developer focused on Laravel and Vue.js. Experience leading scalable projects, with a special interest in automation, IoT, and process optimization. Passionate about continuous improvement and self-taught learning."
    },
    skillsByCategory: {
      es: {
        Frontend: ["Vue.js", "React", "HTML", "CSS", "JavaScript", "Bulma", "Material UI", "Tailwind", "jQuery"],
        Backend: ["Laravel", "PHP", "Node.js", "C#", "SQL", "MySQL", "PostgreSQL", "Amplify", "AWS Lambda", "API REST", "Python"],
        DevOps: ["Docker", "AWS", "S3", "Git", "GCP"],
        IA: ["LLMs", "MCP", "RAG", "Vertex AI"],
        Otros: ["Arduino", "IoT", "Automatización", "Art-Net", "DMX"]
      },
      en: {
        Frontend: ["Vue.js", "React", "HTML", "CSS", "JavaScript", "Bulma", "Material UI", "Tailwind", "jQuery"],
        Backend: ["Laravel", "PHP", "Node.js", "C#", "SQL", "MySQL", "PostgreSQL", "Amplify", "AWS Lambda", "REST API", "Python"],
        DevOps: ["Docker", "AWS", "S3", "Git", "GCP"],
        AI: ["LLMs", "MCP", "RAG", "Vertex AI"],
        Others: ["Arduino", "IoT", "Automation", "Art-Net", "DMX"]
      }
    },
    featuredProjects: [
      {
        es: {
          title: "DOCS IA",
          description: "Plataforma en desarrollo para la gestión y cuadratura de documentos laborales obligatorios, integrando IA (Gemini API) para extracción y categorización automática de datos desde documentos. Permite consultar múltiples fuentes (incluyendo sistemas de terceros), realizar búsquedas avanzadas de trabajadores, contratos y documentos asociados, y descargar información de forma masiva. El frontend está desarrollado con React y Amplify; el backend utiliza funciones serverless en GCP, AWS Lambda, S3 y DynamoDB. Actualmente participo en el equipo a cargo del buscador principal y funcionalidades clave de consulta y descarga.",
          link: ""
        },
        en: {
          title: "DOCS IA",
          description: "A platform in development for managing and reconciling mandatory HR documents, integrating AI (Gemini API) for automatic data extraction and categorization from documents. Enables advanced search across multiple sources (including third-party systems), search for employees, contracts, and associated documents, and bulk downloads. The frontend is built with React and Amplify; the backend uses serverless functions on GCP, AWS Lambda, S3, and DynamoDB. I am currently part of the team responsible for the main search engine and key query/download features.",
          link: ""
        }
      }
    ],
    hobbiesList: {
      es: [
        "Iluminación artística y tecnología creativa",
        "Participación en comunidades tech (Discord, foros)",
        "Contribuciones open source",
        "Proyectos personales de automatización",
        "Música y DJing"
      ],
      en: [
        "Artistic lighting and creative technology",
        "Participation in tech communities (Discord, forums)",
        "Open source contributions",
        "Personal automation projects",
        "Music and DJing"
      ]
    },
    education: [
      {
        es: { title: "Ingeniería de Ejecución en Informática", description: "AIEP República, Santiago (2021 - 2023)" },
        en: { title: "Computer Engineering Technician", description: "AIEP República, Santiago (2021 - 2023)" }
      },
      {
        es: { title: "Analista Programador", description: "DuocUC Alonso de Ovalle (2014 - 2017)" },
        en: { title: "Programming Analyst", description: "DuocUC Alonso de Ovalle (2014 - 2017)" }
      },
      {
        es: { title: "Técnico en Electricidad Industrial", description: "Talleres San Vicente de Paul (2011 - 2013)" },
        en: { title: "Industrial Electricity Technician", description: "Talleres San Vicente de Paul (2011 - 2013)" }
      }
    ],
    experiences: [
      {
        es: {
          title: "Desarrollador Full stack",
          company: "Xinerlink",
          description: "Xinerlink (Remoto) | Ago 2021 - Actualidad",
          content: `<ul class='list-disc pl-5'>
            <li class='mb-2'>Participación en el diseño e implementación de <strong>Xavi</strong>, una plataforma de agentes de IA para RRHH basada en <strong>LLMs, MCP y RAG</strong>, integrando sistemas corporativos mediante APIs.</li>
            <li class='mb-2'>Desarrollo de un asistente conversacional con <strong>RAG</strong> sobre <strong>Google Cloud Platform (Vertex AI)</strong> para consultar una base de conocimiento corporativa utilizando documentación interna.</li>
            <li class='mb-2'>Implementación de funcionalidades de IA en el gestor documental para analizar documentos, extraer información relevante y mejorar la búsqueda inteligente.</li>
            <li class='mb-2'>Desarrollo y mantenimiento de plataformas de RRHH y gestión documental utilizando Laravel, Node.js, SQL Server y AWS.</li>
            <li>Desarrollo e integración de APIs REST y microservicios, participando en el diseño de soluciones y arquitectura de sistemas.</li>
          </ul>`,
          technologies: ["LLMs", "MCP", "RAG", "Vertex AI", "Laravel", "Node.js", "SQL Server", "AWS"]
        },
        en: {
          title: "Full Stack Developer",
          company: "Xinerlink",
          description: "Xinerlink (Remote) | Aug 2021 - Present",
          content: `<ul class='list-disc pl-5'>
            <li class='mb-2'>Participated in the design and implementation of <strong>Xavi</strong>, an AI agent platform for HR based on <strong>LLMs, MCP, and RAG</strong>, integrating corporate systems via APIs.</li>
            <li class='mb-2'>Developed a conversational assistant with <strong>RAG</strong> on <strong>Google Cloud Platform (Vertex AI)</strong> to query a corporate knowledge base using internal documentation.</li>
            <li class='mb-2'>Implemented AI features in the document management system to analyze documents, extract relevant information, and improve smart search.</li>
            <li class='mb-2'>Developed and maintained HR and document management platforms using Laravel, Node.js, SQL Server, and AWS.</li>
            <li>Developed and integrated REST APIs and microservices, participating in solution design and system architecture.</li>
          </ul>`,
          technologies: ["LLMs", "MCP", "RAG", "Vertex AI", "Laravel", "Node.js", "SQL Server", "AWS"]
        }
      },
      {
        es: {
          title: "Desarrollador Full Stack (Freelance)",
          company: "Freelance",
          description: "Freelance (Remoto) | Ago 2023 - Actualidad",
          content: `<div><div class='font-semibold mb-1'>BionicVision</div><div class='mb-4'>Desarrollo de plataforma de gestión de asistencia y RR.HH. para permisos, vacaciones y reportabilidad. Implementación de integraciones vía API con sistemas como <strong>BioTime, SIRH, SMC y SATurno</strong>, centralizando información y automatizando procesos operacionales.</div><div class='font-semibold mb-1'>USACH: Sistema trazabilidad documental (STD2)</div><div>Se utilizaron las tecnologías Laravel 10, Inertia y Vue 3 en la creación de nuevos módulos, implementación de mejoras y la introducción de nuevas funcionalidades.</div></div>`,
          technologies: ["Laravel 10", "Inertia", "Vue 3", "APIs Rest"]
        },
        en: {
          title: "Full Stack Developer (Freelance)",
          company: "Freelance",
          description: "Freelance (Remote) | Aug 2023 - Present",
          content: `<div><div class='font-semibold mb-1'>BionicVision</div><div class='mb-4'>Development of attendance and HR management platform for permits, vacations, and reporting. Implemented API integrations with systems like <strong>BioTime, SIRH, SMC, and SATurno</strong>, centralizing information and automating operational processes.</div><div class='font-semibold mb-1'>USACH: Document traceability system (STD2)</div><div>Used Laravel 10, Inertia, and Vue 3 to create new modules, implement improvements, and introduce new features.</div></div>`,
          technologies: ["Laravel 10", "Inertia", "Vue 3", "REST APIs"]
        }
      },
      {
        es: {
          title: "Desarrollador Full Stack",
          company: "Lirmi",
          description: "Lirmi (Remoto) | Abr 2021 - Ago 2021",
          content: `Desarrollo de software de gestión curricular con enfoque en planificación, evaluación y libro de clases digital. Uso de tecnologías VueJS y Laravel. Responsable de la resolución de incidencias y la implementación de mejoras continuas en la plataforma.`,
          technologies: ["VueJS", "Laravel"]
        },
        en: {
          title: "Full Stack Developer",
          company: "Lirmi",
          description: "Lirmi (Remote) | Apr 2021 - Aug 2021",
          content: `Developed curriculum management software focused on planning, evaluation, and digital class books. Used VueJS and Laravel technologies. Responsible for resolving incidents and implementing continuous improvements on the platform.`,
          technologies: ["VueJS", "Laravel"]
        }
      },
      {
        es: {
          title: "Analista Programador",
          company: "Xinerlink",
          description: "Xinerlink, Santiago | Nov 2018 - Abr 2021",
          content: `Encargado de proponer soluciones innovadoras, crear maquetas, desarrollar tanto en el backend como en el frontend, y asegurar la integración efectiva con otros sistemas en entornos de desarrollo.`,
          technologies: ["PHP", "jQuery", "SQL Server"]
        },
        en: {
          title: "Programmer Analyst",
          company: "Xinerlink",
          description: "Xinerlink, Santiago | Nov 2018 - Apr 2021",
          content: `In charge of proposing innovative solutions, creating mockups, developing both backend and frontend, and ensuring effective integration with other systems in development environments.`,
          technologies: ["PHP", "jQuery", "SQL Server"]
        }
      },
      {
        es: {
          title: "Programador",
          company: "Ventas Técnicas",
          description: "Ventas Técnicas, Santiago | Jun 2018 - Nov 2018",
          content: `Responsable de la generación de informes KPI mediante Transact-SQL, desarrollo de interfaces de datos, mantenimiento del portal de indicadores con gráficos Highchart y gestión de sistemas internos de procesos.`,
          technologies: ["Transact-SQL", "Highchart", "C#", "PHP"]
        },
        en: {
          title: "Programmer",
          company: "Ventas Técnicas",
          description: "Ventas Técnicas, Santiago | Jun 2018 - Nov 2018",
          content: `Responsible for generating KPI reports using Transact-SQL, developing data interfaces, maintaining the indicators portal with Highchart graphs, and managing internal process systems.`,
          technologies: ["Transact-SQL", "Highchart", "C#", "PHP"]
        }
      },
      {
        es: {
          title: "Práctica Analista Programador",
          company: "Rheem Chile",
          description: "Rheem Chile, Estación Central | Feb 2018 - Mar 2018",
          content: `Participación integral en el desarrollo de un sistema para el departamento de mantención industrial, centrado en la gestión de actividades de técnicos. Utilización de PHP7 (POO) con base de datos MySQL y empleo de la plantilla AdminLTE con Bootstrap y jQuery para el frontend. Funciones incluyeron la toma de requerimientos, moldeamiento y desarrollo del sistema.`,
          technologies: ["PHP7 (OOP)", "MySQL", "AdminLTE", "Bootstrap", "jQuery"]
        },
        en: {
          title: "Programming Analyst Intern",
          company: "Rheem Chile",
          description: "Rheem Chile, Estación Central | Feb 2018 - Mar 2018",
          content: `Comprehensive participation in the development of a system for the industrial maintenance department, focused on managing technicians' activities. Used PHP7 (OOP) with MySQL database and AdminLTE template with Bootstrap and jQuery for the frontend. Functions included requirements gathering, modeling, and system development.`,
          technologies: ["PHP7 (OOP)", "MySQL", "AdminLTE", "Bootstrap", "jQuery"]
        }
      }
    ],
    skills: {
      es: [
        "Laravel", "Vue.js", "JavaScript", "Node.js", "SQL", "Git", "Linux", "Python", "C#", "Creatividad", "Proactividad",
        "AWS Lambda", "Amplify", "DynamoDB", "S3", "Google Drive", "Migración de documentos", "IoT", "DMX", "Art-Net", "ESP32", "WLED", "Resolume"
      ],
      en: [
        "Laravel", "Vue.js", "JavaScript", "Node.js", "SQL", "Git", "Linux", "Python", "C#", "Creativity", "Proactivity",
        "AWS Lambda", "Amplify", "DynamoDB", "S3", "Google Drive", "Document migration", "IoT", "DMX", "Art-Net", "ESP32", "WLED", "Resolume"
      ]
    },
    email: { es: "Correo electrónico", en: "Email" },
    phone: { es: "Teléfono", en: "Phone" },
    github: { es: "GitHub", en: "GitHub" },
    linkedin: { es: "LinkedIn", en: "LinkedIn" },
    sendEmail: { es: "Enviar email", en: "Send email" },
    whatsapp: { es: "Hablar por WhatsApp", en: "Chat on WhatsApp" },
    artisticLighting: {
      es: "Iluminación Artística",
      en: "Artistic Lighting"
    },
    artisticLightingDesc: {
      es: "Proyecto personal donde combino mi pasión por la tecnología y el arte, creando experiencias audiovisuales inmersivas. Desarrollo sistemas de iluminación LED personalizados usando tiras WS2811 y controladores ESP32 en red, integrados con Resolume para crear espectáculos sincronizados con música.",
      en: "Personal project where I combine my passion for technology and art, creating immersive audiovisual experiences. I develop custom LED lighting systems using WS2811 strips and networked ESP32 controllers, integrated with Resolume to create music-synchronized shows."
    },
    verSesion: {
      es: "Ver Sesión",
      en: "Watch Session"
    },
    canalYoutube: {
      es: "Canal YouTube",
      en: "YouTube Channel"
    },
    instagram: {
      es: "Instagram",
      en: "Instagram"
    },
    interactiveDemos: [
      {
        es: {
          title: "Sistema de Viáticos",
          description: "Sistema de gestión y control de viáticos empresariales, permitiendo el registro, aprobación y seguimiento de gastos.",
          features: [
            "Registro de viáticos",
            "Aprobación de gastos",
            "Dashboard de seguimiento",
            "Reportes y estadísticas"
          ]
        },
        en: {
          title: "Expense Report System",
          description: "Business expense management and control system, allowing the recording, approval, and tracking of expenses.",
          features: [
            "Expense report registration",
            "Expense approval",
            "Tracking dashboard",
            "Reports and statistics"
          ]
        }
      },
      {
        es: {
          title: "Sistema de Marcación",
          description: "Sistema de control de asistencia que permite registrar las entradas y salidas del personal, con funcionalidades de reportes y validaciones automáticas. El sistema está orientado a la gestión eficiente de recursos humanos en empresas y organizaciones.",
          features: [
            "Registro de entradas y salidas de empleados",
            "Validación automática de horarios",
            "Generación de reportes de asistencia",
            "Dashboard administrativo con métricas clave",
            "Interfaz moderna y responsiva"
          ]
        },
        en: {
          title: "Time Clock System",
          description: "Attendance control system that allows recording employee clock-ins and clock-outs, with reporting functionalities and automatic validations. The system is aimed at efficient human resources management in companies and organizations.",
          features: [
            "Employee clock-in/out registration",
            "Automatic schedule validation",
            "Attendance report generation",
            "Admin dashboard with key metrics",
            "Modern and responsive interface"
          ]
        }
      },
      {
        es: {
          title: "Sistema de Monitoreo de Fatiga",
          description: "Sistema web para la gestión y monitoreo de la fatiga laboral en trabajadores. Permite registrar, visualizar y analizar alertas de fatiga, así como administrar la información de los empleados y generar reportes automáticos.",
          features: [
            "Registro y gestión de trabajadores",
            "Monitoreo en tiempo real de alertas de fatiga",
            "Dashboard administrativo con métricas clave",
            "Generación de reportes automáticos",
            "Interfaz moderna, responsiva y modo oscuro",
            "Autenticación y control de sesiones"
          ]
        },
        en: {
          title: "Fatigue Monitoring System",
          description: "Web system for managing and monitoring occupational fatigue in workers. It allows recording, visualizing, and analyzing fatigue alerts, as well as managing employee information and generating automatic reports.",
          features: [
            "Worker registration and management",
            "Real-time monitoring of fatigue alerts",
            "Admin dashboard with key metrics",
            "Automatic report generation",
            "Modern, responsive interface with dark mode",
            "Authentication and session control"
          ]
        }
      }
    ],
    viewDemoButtonText: {
      es: "Ver Demo",
      en: "View Demo"
    },
    previousButtonAriaLabel: {
      es: "Anterior",
      en: "Previous"
    },
    nextButtonAriaLabel: {
      es: "Siguiente",
      en: "Next"
    },
    viewMoreText: {
      es: "Ver Más",
      en: "View More"
    },
    closeButtonText: {
      es: "Cerrar",
      en: "Close"
    }
  };

  // Prepare props for InteractiveDemos
  const demosPropData = t.interactiveDemos.map((translatedDemo, index) => {
    const originalDemo = originalDemosData[index]; // Assumes arrays are in the same order
    return {
      title: translatedDemo[language].title,
      description: translatedDemo[language].description,
      features: translatedDemo[language].features,
      technologies: originalDemo.technologies,
      demoUrl: originalDemo.demoUrl,
      imageUrl: originalDemo.imageUrl,
    };
  });

  return (
    <>
      {/* Navbar fijo */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-background/80 dark:bg-[#181A1B]/80 backdrop-blur-md border-b border-border flex justify-center shadow-sm transition-colors">
        <div className="w-full max-w-7xl px-4">
          <ul className="flex gap-2 md:gap-4 py-2 md:py-3 relative overflow-x-auto scrollbar-hide">
            {/* Indicador deslizante */}
            <motion.div 
              className="absolute bottom-0 h-0.5 bg-miku dark:bg-mikuLight rounded-full"
              initial={false}
              animate={{
                width: '60px',
                x: SECTIONS.findIndex(s => s.id === activeSection) * (60 + 8),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
            {SECTIONS.map((section) => (
              <li key={section.id} className="relative whitespace-nowrap">
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`px-3 md:px-4 py-1 rounded-full font-medium transition-colors duration-200 relative overflow-hidden text-sm md:text-base
                    ${activeSection === section.id ? "text-miku dark:text-mikuLight" : "text-muted-foreground hover:text-miku dark:hover:text-mikuLight"}
                  `}
                  tabIndex={0}
                >
                  {activeSection === section.id && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-miku/20 dark:bg-mikuLight/20 z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t[section.id as SectionKey][language]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Botón flotante de cambio de tema y selector de idioma */}
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-30 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-background/80 dark:bg-[#181A1B]/80 backdrop-blur-md border border-border shadow-sm hover:bg-background/90 dark:hover:bg-[#181A1B]/90"
        >
          {mounted && (theme === "dark" ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />)}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-background/80 dark:bg-[#181A1B]/80 backdrop-blur-md border border-border shadow-sm hover:bg-background/90 dark:hover:bg-[#181A1B]/90 text-xs font-bold"
          aria-label="Cambiar idioma"
        >
          {language === "es" ? "EN" : "ES"}
        </Button>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center bg-background px-4 pt-16 md:pt-20">
        <motion.header
          ref={refs.presentacion}
          className="flex flex-col items-center gap-4 mt-8 md:mt-12 mb-8 scroll-mt-24 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={animatedSection === 'presentacion' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'presentacion') setAnimatedSection(null); }}
        >
          <div className="relative w-full">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-miku to-mikuLight opacity-20 blur-lg"></div>
            <div className="relative bg-background/60 dark:bg-[#181a1b]/60 backdrop-blur-xl p-6 md:p-10 rounded-2xl border border-border/50 shadow-2xl">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-foreground text-center"
                initial={animatedSection === 'presentacion' ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Matias Guerrero
              </motion.h1>
              <motion.h2 
                className="text-lg md:text-xl text-muted-foreground text-center mt-2"
                initial={animatedSection === 'presentacion' ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {language === "es" ? "Desarrollador Full Stack | Automatización e IA" : "Full Stack Developer | Automation & AI"}
              </motion.h2>
              <motion.p
                className="max-w-2xl mx-auto text-center text-foreground font-medium mt-2 text-base md:text-lg"
                initial={animatedSection === 'presentacion' ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {t.presentacionText[language]}
              </motion.p>
              
              <motion.div 
                className="flex justify-center mt-8"
                initial={animatedSection === 'presentacion' ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button asChild className="gap-2 bg-miku hover:bg-miku/90 text-white dark:bg-mikuLight dark:text-black font-semibold rounded-full px-6 py-6 shadow-lg hover:shadow-miku/50 transition-all">
                  <a href="/Matias_Guerrero_CV.pdf" download="Matias_Guerrero_CV.pdf">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    Descargar CV PDF
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.section
          ref={refs.formacion}
          id="formacion"
          className="w-full max-w-4xl mt-8 md:mt-12 flex flex-col gap-6 scroll-mt-32"
          initial={{ opacity: 0, y: 10 }}
          animate={animatedSection === 'formacion' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'formacion') setAnimatedSection(null); }}
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-miku dark:text-mikuLight" />
            <h2 className="text-2xl font-semibold text-foreground">{t.formacion[language]}</h2>
          </div>
          <div className="grid gap-4">
            {t.education.map((item, index) => (
              <motion.div
                key={item[language].title}
                initial={animatedSection === 'formacion' ? { opacity: 0, x: -20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-background/40 dark:bg-[#181a1b]/40 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl hover:shadow-miku/10 dark:hover:shadow-mikuLight/10 transition-all duration-300 hover:translate-y-[-2px]">
                  <CardHeader>
                    <CardTitle>{item[language].title}</CardTitle>
                    <CardDescription>{item[language].description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={refs.experiencia}
          id="experiencia"
          className="w-full max-w-4xl mt-8 md:mt-12 flex flex-col gap-6 scroll-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={animatedSection === 'experiencia' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'experiencia') setAnimatedSection(null); }}
        >
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-miku dark:text-mikuLight" />
            <h2 className="text-2xl font-semibold text-foreground">{t.experiencia[language]}</h2>
          </div>
          <div className="grid gap-4">
            {t.experiences.map((item, index) => (
              <motion.div
                key={`${item[language].title}-${item[language].company}`}
                initial={animatedSection === 'experiencia' ? { opacity: 0, x: 20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <CardHeader>
                    <CardTitle>{item[language].title}</CardTitle>
                    <CardDescription>{item[language].description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    {item[language].content.startsWith('<') ? (
                      <span dangerouslySetInnerHTML={{ __html: item[language].content }} />
                    ) : (
                      item[language].content
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item[language].technologies?.map((tech) => (
                        <Badge key={tech} variant="secondary" className="hover:bg-miku/10 hover:text-miku dark:hover:bg-mikuLight/10 dark:hover:text-mikuLight transition-colors cursor-default">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={refs.habilidades}
          id="habilidades"
          className={`py-20 ${animatedSection === "habilidades" ? "animate-fade-in" : ""}`}
        >
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Code2 className="h-6 w-6 text-miku dark:text-mikuLight" />
              <h2 className="text-2xl font-semibold text-foreground">{t.habilidades[language]}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center">
              {Object.entries(t.skillsByCategory[language]).map(([cat, skills]) => (
                <div key={cat} className="max-w-md">
                  <h3 className="font-semibold text-miku dark:text-mikuLight mb-2 text-base">{cat}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} className="hover:scale-105 hover:bg-miku/90 dark:hover:bg-mikuLight/90 transition-all">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Sección de Maquetas Interactivas */}
        <section
          ref={maquetasRef}
          id="maquetas"
          className={`py-20 ${animatedSection === "maquetas" ? "animate-fade-in" : ""}`}
        >
          <div className="w-full max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Monitor className="h-6 w-6 text-miku dark:text-mikuLight" />
              <h2 className="text-2xl font-semibold text-foreground">
                {t.maquetas[language]}
              </h2>
            </div>
            <InteractiveDemos
              demos={demosPropData}
              viewDemoButtonText={t.viewDemoButtonText[language]}
              previousButtonAriaLabel={t.previousButtonAriaLabel[language]}
              nextButtonAriaLabel={t.nextButtonAriaLabel[language]}
              viewMoreText={t.viewMoreText[language]}
              closeButtonText={t.closeButtonText[language]}
            />
          </div>
        </section>

        {/* Sección de Hobbies */}
        <motion.section
          ref={refs.hobbies}
          id="hobbies"
          className="w-full max-w-4xl mx-auto px-4 mt-8 md:mt-12 flex flex-col gap-4 mb-24 scroll-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={animatedSection === 'hobbies' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'hobbies') setAnimatedSection(null); }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-miku dark:text-mikuLight" />
            <h2 className="text-2xl font-semibold text-foreground">{t.hobbies[language]}</h2>
          </div>
          <Card className="bg-background/40 dark:bg-[#181a1b]/40 backdrop-blur-md border-border/50 shadow-lg hover:shadow-xl hover:shadow-miku/10 dark:hover:shadow-mikuLight/10 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{t.artisticLighting[language]}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t.artisticLightingDesc[language]}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  <Badge variant="secondary">WS2811</Badge>
                  <Badge variant="secondary">ESP32</Badge>
                  <Badge variant="secondary">Resolume</Badge>
                  <Badge variant="secondary">DMX</Badge>
                  <Badge variant="secondary">Art-Net</Badge>
                  <Badge variant="secondary">WLED</Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://www.youtube.com/watch?v=cuT-VU4PR54&t=4630s" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                    {t.verSesion[language]}
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://www.youtube.com/@FRACTAL_SESSIONS" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                    {t.canalYoutube[language]}
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href="https://www.instagram.com/fractal_sessions/" target="_blank" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    {t.instagram[language]}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          ref={refs.contacto}
          id="contacto"
          className="w-full max-w-4xl mt-8 md:mt-12 flex flex-col gap-4 mb-24 scroll-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={animatedSection === 'contacto' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'contacto') setAnimatedSection(null); }}
        >
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-miku dark:text-mikuLight" />
            <h2 className="text-2xl font-semibold text-foreground">{t.contacto[language]}</h2>
          </div>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:matiasguerrero.dev@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">{t.email[language]}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href="tel:+56953466236" className="text-muted-foreground hover:text-primary transition-colors">{t.phone[language]}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a href="https://github.com/matiasguerreron" target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors">{t.github[language]}</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <a href="https://www.linkedin.com/in/matiasguerreron/" target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors">{t.linkedin[language]}</a>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button asChild className="group">
                  <a href="mailto:matiasguerrero.dev@gmail.com">{t.sendEmail[language]}</a>
                </Button>
                <Button asChild variant="outline" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white border-none group">
                  <a href="https://wa.me/56953466236" target="_blank" rel="noopener">{t.whatsapp[language]}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </>
  );
}
