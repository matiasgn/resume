"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Sun, Moon, Lightbulb, Zap, Video, Sparkles, 
  GraduationCap, Briefcase, Code2, Mail, Phone, 
  Github, MessageCircle, ArrowRight
} from "lucide-react";

const SECTIONS = [
  { id: "presentacion", label: "Presentación" },
  { id: "formacion", label: "Formación" },
  { id: "experiencia", label: "Experiencia" },
  { id: "habilidades", label: "Habilidades" },
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
  const hobbiesRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const refs = {
    presentacion: presentacionRef,
    formacion: formacionRef,
    experiencia: experienciaRef,
    habilidades: habilidadesRef,
    hobbies: hobbiesRef,
    contacto: contactoRef,
  };

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
  }, []);

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
    hobbies: Record<'es' | 'en', string>;
    contacto: Record<'es' | 'en', string>;
    presentacionText: Record<'es' | 'en', string>;
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
    hobbies: {
      es: "Hobbies",
      en: "Hobbies"
    },
    contacto: {
      es: "Contacto",
      en: "Contact"
    },
    presentacionText: {
      es: "Desarrollador Full Stack con experiencia en el desarrollo de soluciones empresariales y sistemas de gestión documental. Me apasiona la tecnología en todas sus formas, desde el desarrollo web hasta la electrónica y la automatización. Actualmente trabajo en Xinerlink, donde participo en proyectos en la nube y desarrollo de integraciones. En mi tiempo libre, me dedico a crear proyectos innovadores como sistemas de iluminación LED para espectáculos audiovisuales. Siempre estoy aprendiendo y explorando nuevas formas de combinar el software con el hardware para crear experiencias interactivas únicas.",
      en: "Full Stack Developer with experience in enterprise solutions and document management systems. I'm passionate about technology in all its forms, from web development to electronics and automation. Currently working at Xinerlink, where I participate in cloud projects and integration development. In my free time, I create innovative projects such as LED lighting systems for audiovisual shows. I'm always learning and exploring new ways to combine software with hardware to create unique interactive experiences."
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
          title: "Desarrollador Full Stack",
          company: "Xinerlink",
          description: "Xinerlink (Remoto) | Ago 2021 - Actualidad",
          content: `Participé en el desarrollo y mantenimiento de soluciones de gestión documental para áreas de RRHH y clientes como Caja Los Andes. Me encargué de la integración de servicios en la nube (AWS Lambda, Amplify, DynamoDB, S3) y de la automatización de procesos relacionados con la gestión y migración de grandes volúmenes de documentos y datos. Realicé integraciones con Google Drive y colaboré en la optimización de la trazabilidad y seguridad de la información. Trabajé en equipos multidisciplinarios, aportando mejoras continuas y asegurando la calidad del software entregado.`,
          technologies: ["SQL Server", "Ubuntu Server", "Laravel", "Node.js", "AWS Lambda", "Amplify", "DynamoDB", "S3", "Google Drive", "Migración de documentos"]
        },
        en: {
          title: "Full Stack Developer",
          company: "Xinerlink",
          description: "Xinerlink (Remote) | Aug 2021 - Present",
          content: `I participated in the development and maintenance of document management solutions for HR departments and clients such as Caja Los Andes. I was responsible for integrating cloud services (AWS Lambda, Amplify, DynamoDB, S3) and automating processes related to the management and migration of large volumes of documents and data. I implemented Google Drive integrations and contributed to optimizing traceability and information security. I worked in multidisciplinary teams, continuously improving and ensuring the quality of delivered software.`,
          technologies: ["SQL Server", "Ubuntu Server", "Laravel", "Node.js", "AWS Lambda", "Amplify", "DynamoDB", "S3", "Google Drive", "Document migration"]
        }
      },
      {
        es: {
          title: "Desarrollador Full Stack (Freelance)",
          company: "USACH",
          description: "USACH (Remoto) | Ago 2023 - Ene 2024",
          content: `Trabajé sobre un sistema existente en Laravel con Inertia y Vue.js, orientado a la trazabilidad documental. Me encargué de modificar el sistema, agregar nuevos módulos y funcionalidades, y adaptar el flujo de trabajo a los requerimientos de la universidad. Mi labor incluyó tanto el análisis del código heredado como la integración entre frontend y backend para asegurar la correcta trazabilidad de los documentos.`,
          technologies: ["Laravel 10", "Inertia", "Vue 3"]
        },
        en: {
          title: "Full Stack Developer (Freelance)",
          company: "USACH",
          description: "USACH (Remote) | Aug 2023 - Jan 2024",
          content: `Worked on an existing Laravel system with Inertia and Vue.js, focused on document traceability. I was responsible for modifying the system, adding new modules and features, and adapting the workflow to the university's requirements. My work included analyzing legacy code and integrating frontend and backend to ensure proper document traceability.`,
          technologies: ["Laravel 10", "Inertia", "Vue 3"]
        }
      },
      {
        es: {
          title: "Desarrollador Full Stack",
          company: "Lirmi",
          description: "Lirmi (Remoto) | Abr 2021 - Ago 2021",
          content: `Desarrollé y mejoré módulos de un sistema de gestión curricular enfocado en planificación, evaluación y libro de clases digital. Me encargué de implementar nuevas funcionalidades, optimizar módulos existentes y adaptar el sistema a las necesidades de los usuarios. Trabajé con VueJS, Laravel, Bulma y PostgreSQL, colaborando con el equipo para asegurar una experiencia educativa digital robusta y eficiente.`,
          technologies: ["VueJS", "Laravel", "Bulma", "PostgreSQL"]
        },
        en: {
          title: "Full Stack Developer",
          company: "Lirmi",
          description: "Lirmi (Remote) | Apr 2021 - Aug 2021",
          content: `Developed and improved modules for a curriculum management system focused on planning, assessment, and digital gradebooks. I implemented new features, optimized existing modules, and adapted the system to user needs. Worked with VueJS, Laravel, Bulma, and PostgreSQL, collaborating with the team to ensure a robust and efficient digital educational experience.`,
          technologies: ["VueJS", "Laravel", "Bulma", "PostgreSQL"]
        }
      },
      {
        es: {
          title: "Analista Programador",
          company: "Xinerlink",
          description: "Xinerlink, Santiago | Nov 2018 - Abr 2021",
          content: `En esta etapa inicial en Xinerlink, me enfoqué en el desarrollo de aplicaciones web utilizando principalmente PHP puro y jQuery, conectando con procedimientos almacenados (SP) en colaboración con un DBA. Mi trabajo se centró en el frontend, empleando Bootstrap y AdminLTE para crear interfaces intuitivas y funcionales. El principal desafío fue extraer y mostrar datos del gestor documental OnBase en sistemas web personalizados, facilitando el acceso y la gestión de información para los usuarios internos.`,
          technologies: ["PHP OOP", "jQuery", "SQL Server", "Transact-SQL", "Highchart", "AdminLTE"]
        },
        en: {
          title: "Programmer Analyst",
          company: "Xinerlink",
          description: "Xinerlink, Santiago | Nov 2018 - Apr 2021",
          content: `In this initial stage at Xinerlink, I focused on developing web applications mainly using pure PHP and jQuery, connecting to stored procedures (SP) in collaboration with a DBA. My work was centered on the frontend, using Bootstrap and AdminLTE to create intuitive and functional interfaces. The main challenge was extracting and displaying data from the OnBase document manager in custom web systems, facilitating access and information management for internal users.`,
          technologies: ["PHP OOP", "jQuery", "SQL Server", "Transact-SQL", "Highchart", "AdminLTE"]
        }
      },
      {
        es: {
          title: "Programador",
          company: "Ventas Técnicas",
          description: "Ventas Técnicas, Santiago | Jun 2018 - Nov 2018",
          content: `Me encargué del mantenimiento y evolución de un sistema que permitía a los clientes revisar métricas de call center y el desempeño de sus campañas. Realicé modificaciones en procedimientos almacenados (SP) y desarrollé interfaces de datos para clientes, así como la automatización de correos para campañas de empresas como WOM y Claro. Además, mantuve y mejoré el portal de indicadores utilizando Highchart, asegurando la disponibilidad y claridad de la información para la toma de decisiones.`,
          technologies: ["Transact-SQL", "C#", "Highchart", "PHP", "Visual Studio", ".NET"]
        },
        en: {
          title: "Programmer",
          company: "Ventas Técnicas",
          description: "Ventas Técnicas, Santiago | Jun 2018 - Nov 2018",
          content: `I was responsible for maintaining and evolving a system that allowed clients to review call center metrics and campaign performance. I made changes to stored procedures (SP) and developed data interfaces for clients, as well as automating emails for campaigns for companies like WOM and Claro. I also maintained and improved the indicators portal using Highchart, ensuring the availability and clarity of information for decision-making.`,
          technologies: ["Transact-SQL", "C#", "Highchart", "PHP", "Visual Studio", ".NET"]
        }
      },
      {
        es: {
          title: "Práctica Analista Programador",
          company: "Rheem Chile",
          description: "Rheem Chile, Estación Central | Feb 2018 - Mar 2018",
          content: `Desarrollé desde cero un sistema para la gestión de mantención industrial, realizando el levantamiento de requerimientos, modelado y desarrollo completo de la aplicación. El sistema fue diseñado para el departamento de mantenimiento, permitiendo registrar y gestionar actividades y tareas. Realicé pruebas en red local y utilicé PHP7 (POO), MySQL, AdminLTE, Bootstrap y jQuery para crear una solución robusta y adaptable a las necesidades del área.`,
          technologies: ["PHP7 (OOP)", "MySQL", "AdminLTE", "Bootstrap", "jQuery"]
        },
        en: {
          title: "Programming Analyst Intern",
          company: "Rheem Chile",
          description: "Rheem Chile, Estación Central | Feb 2018 - Mar 2018",
          content: `Developed from scratch a system for industrial maintenance management, gathering requirements, modeling, and full application development. The system was designed for the maintenance department, allowing the registration and management of activities and tasks. I performed local network tests and used PHP7 (OOP), MySQL, AdminLTE, Bootstrap, and jQuery to create a robust and adaptable solution for the area's needs.`,
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
  };

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
                  <span className="relative z-10">{section.label}</span>
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
            <div className="relative bg-background/80 backdrop-blur-sm p-4 md:p-8 rounded-lg border border-border">
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
                {language === "es" ? "Desarrollador Full Stack" : "Full Stack Developer"}
              </motion.h2>
              <motion.p 
                className="max-w-3xl mx-auto text-center text-muted-foreground mt-4 text-sm md:text-base"
                initial={animatedSection === 'presentacion' ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {t.presentacionText[language]}
              </motion.p>
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
                <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
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
                    {item[language].content}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item[language].technologies?.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
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
          className="w-full max-w-4xl mt-8 md:mt-12 flex flex-col gap-4 mb-16 scroll-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={animatedSection === 'habilidades' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'habilidades') setAnimatedSection(null); }}
        >
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-miku dark:text-mikuLight" />
            <h2 className="text-2xl font-semibold text-foreground">{t.habilidades[language]}</h2>
          </div>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={animatedSection === 'habilidades' ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {t.skills[language].map((skill, index) => (
              <motion.div
                key={skill}
                initial={animatedSection === 'habilidades' ? { opacity: 0, scale: 0.8 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Badge className="hover:scale-105 transition-transform">{skill}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          ref={refs.hobbies}
          id="hobbies"
          className="w-full max-w-4xl mt-8 md:mt-12 flex flex-col gap-4 mb-24 scroll-mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={animatedSection === 'hobbies' ? { opacity: 1, y: 0 } : {}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => { if (animatedSection === 'hobbies') setAnimatedSection(null); }}
        >
          <h2 className="text-2xl font-semibold text-foreground">{t.hobbies[language]}</h2>
          
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-miku dark:text-mikuLight" />
                    <h3 className="text-lg font-semibold">{t.artisticLighting[language]}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {t.artisticLightingDesc[language]}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
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
                  <a href="mailto:matiasguerrero.n@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">{t.email[language]}</a>
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
                  <a href="mailto:matiasguerrero.n@hotmail.com">{t.sendEmail[language]}</a>
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
