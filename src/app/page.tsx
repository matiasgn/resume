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

      {/* Botón flotante de cambio de tema */}
      <div className="fixed top-2 right-2 md:top-4 md:right-4 z-30">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-background/80 dark:bg-[#181A1B]/80 backdrop-blur-md border border-border shadow-sm hover:bg-background/90 dark:hover:bg-[#181A1B]/90"
        >
          {mounted && (theme === "dark" ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />)}
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
                Desarrollador Full Stack
              </motion.h2>
              <motion.p 
                className="max-w-3xl mx-auto text-center text-muted-foreground mt-4 text-sm md:text-base"
                initial={animatedSection === 'presentacion' ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Desarrollador Full Stack con experiencia en gestión documental, sistemas de trazabilidad y software educativo. Actualmente en Xinerlink, trabajando en la nube. Me apasiona la tecnología y disfruto experimentar con hardware y software, especialmente usando placas electrónicas. También me interesa el arte digital y los proyectos creativos.
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
            <h2 className="text-2xl font-semibold text-foreground">Formación</h2>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Ingeniería de Ejecución en Informática",
                description: "AIEP República, Santiago (2021 - 2023)"
              },
              {
                title: "Analista Programador",
                description: "DuocUC Alonso de Ovalle (2014 - 2017)"
              },
              {
                title: "Técnico en Electricidad Industrial",
                description: "Talleres San Vicente de Paul (2011 - 2013)"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={animatedSection === 'formacion' ? { opacity: 0, x: -20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
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
            <h2 className="text-2xl font-semibold text-foreground">Experiencia profesional</h2>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Desarrollador Full Stack",
                company: "Xinerlink",
                description: "Xinerlink (Remoto) | Ago 2021 - Actualidad",
                content: `Participé en el desarrollo y mantenimiento de soluciones de gestión documental para áreas de RRHH y clientes como Caja Los Andes. Me encargué de la integración de servicios en la nube (AWS Lambda, Amplify, DynamoDB, S3) y de la automatización de procesos relacionados con la gestión y migración de grandes volúmenes de documentos y datos. Realicé integraciones con Google Drive y colaboré en la optimización de la trazabilidad y seguridad de la información. Trabajé en equipos multidisciplinarios, aportando mejoras continuas y asegurando la calidad del software entregado.`,
                technologies: ["SQL Server", "Ubuntu Server", "Laravel", "Node.js", "AWS Lambda", "Amplify", "DynamoDB", "S3", "Google Drive", "Migración de documentos"]
              },
              {
                title: "Desarrollador Full Stack (Freelance)",
                company: "USACH",
                description: "USACH (Remoto) | Ago 2023 - Ene 2024",
                content: `Trabajé sobre un sistema existente en Laravel con Inertia y Vue.js, orientado a la trazabilidad documental. Me encargué de modificar el sistema, agregar nuevos módulos y funcionalidades, y adaptar el flujo de trabajo a los requerimientos de la universidad. Mi labor incluyó tanto el análisis del código heredado como la integración entre frontend y backend para asegurar la correcta trazabilidad de los documentos.`,
                technologies: ["Laravel 10", "Inertia", "Vue 3"]
              },
              {
                title: "Desarrollador Full Stack",
                company: "Lirmi",
                description: "Lirmi (Remoto) | Abr 2021 - Ago 2021",
                content: `Desarrollé y mejoré módulos de un sistema de gestión curricular enfocado en planificación, evaluación y libro de clases digital. Me encargué de implementar nuevas funcionalidades, optimizar módulos existentes y adaptar el sistema a las necesidades de los usuarios. Trabajé con VueJS, Laravel, Bulma y PostgreSQL, colaborando con el equipo para asegurar una experiencia educativa digital robusta y eficiente.`,
                technologies: ["VueJS", "Laravel", "Bulma", "PostgreSQL"]
              },
              {
                title: "Analista Programador",
                company: "Xinerlink",
                description: "Xinerlink, Santiago | Nov 2018 - Abr 2021",
                content: `En esta etapa inicial en Xinerlink, me enfoqué en el desarrollo de aplicaciones web utilizando principalmente PHP puro y jQuery, conectando con procedimientos almacenados (SP) en colaboración con un DBA. Mi trabajo se centró en el frontend, empleando Bootstrap y AdminLTE para crear interfaces intuitivas y funcionales. El principal desafío fue extraer y mostrar datos del gestor documental OnBase en sistemas web personalizados, facilitando el acceso y la gestión de información para los usuarios internos.`,
                technologies: ["PHP POO", "jQuery", "SQL Server", "Transact-SQL", "Highchart", "AdminLTE"]
              },
              {
                title: "Programador",
                company: "Ventas Técnicas",
                description: "Ventas Técnicas, Santiago | Jun 2018 - Nov 2018",
                content: `Me encargué del mantenimiento y evolución de un sistema que permitía a los clientes revisar métricas de call center y el desempeño de sus campañas. Realicé modificaciones en procedimientos almacenados (SP) y desarrollé interfaces de datos para clientes, así como la automatización de correos para campañas de empresas como WOM y Claro. Además, mantuve y mejoré el portal de indicadores utilizando Highchart, asegurando la disponibilidad y claridad de la información para la toma de decisiones.`,
                technologies: ["Transact-SQL", "C#", "Highchart", "PHP", "Visual Studio", ".NET"]
              },
              {
                title: "Práctica Analista Programador",
                company: "Rheem Chile",
                description: "Rheem Chile, Estación Central | Feb 2018 - Mar 2018",
                content: `Desarrollé desde cero un sistema para la gestión de mantención industrial, realizando el levantamiento de requerimientos, modelado y desarrollo completo de la aplicación. El sistema fue diseñado para el departamento de mantenimiento, permitiendo registrar y gestionar actividades y tareas. Realicé pruebas en red local y utilicé PHP7 (POO), MySQL, AdminLTE, Bootstrap y jQuery para crear una solución robusta y adaptable a las necesidades del área.`,
                technologies: ["PHP7 (POO)", "MySQL", "AdminLTE", "Bootstrap", "jQuery"]
              }
            ].map((item, index) => (
              <motion.div
                key={`${item.title}-${item.company}`}
                initial={animatedSection === 'experiencia' ? { opacity: 0, x: 20 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm">
                    {item.content}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.technologies?.map((tech) => (
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
            <h2 className="text-2xl font-semibold text-foreground">Habilidades</h2>
          </div>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={animatedSection === 'habilidades' ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {[
              "Laravel", "Vue.js", "JavaScript", "Node.js", "SQL", "Git", "Linux", "Python", "C#", "Creatividad", "Proactividad",
              "AWS Lambda", "Amplify", "DynamoDB", "S3", "Google Drive", "Migración de documentos", "IoT", "DMX", "Art-Net", "ESP32", "WLED", "Resolume"
            ].map((skill, index) => (
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
          <h2 className="text-2xl font-semibold text-foreground">Hobbies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-5 w-5 text-miku dark:text-mikuLight" />
                <CardTitle className="text-lg">Iluminación LED</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Creo efectos de luz dinámicos y sincronizados con música usando tiras LED inteligentes y microcontroladores.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-2">
                <Zap className="h-5 w-5 text-miku dark:text-mikuLight" />
                <CardTitle className="text-lg">Sistemas Profesionales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Utilizo protocolos estándar de la industria (DMX, Art-Net) para controlar luces de escenario y crear instalaciones a gran escala.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-2">
                <Video className="h-5 w-5 text-miku dark:text-mikuLight" />
                <CardTitle className="text-lg">Visuales en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Integro software de visualización con sistemas de iluminación para crear espectáculos audiovisuales interactivos.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4 bg-miku/5 dark:bg-mikuLight/5 border-miku/20 dark:border-mikuLight/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-5 w-5 text-miku dark:text-mikuLight" />
                <p className="text-sm">
                  Esta pasión me permite combinar mi experiencia técnica con la creatividad, creando experiencias inmersivas que conectan la tecnología con el arte.
                </p>
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
            <h2 className="text-2xl font-semibold text-foreground">Contacto</h2>
          </div>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href="mailto:matiasguerrero.n@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">matiasguerrero.n@hotmail.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href="tel:+56953466236" className="text-muted-foreground hover:text-primary transition-colors">+56 9 5346 6236</a>
                </div>
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a href="https://github.com/matiasguerreron" target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-muted-foreground"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  <a href="https://www.linkedin.com/in/matiasguerreron/" target="_blank" rel="noopener" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button asChild className="group">
                  <a href="mailto:matiasguerrero.n@hotmail.com">
                    Enviar email
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white border-none group">
                  <a href="https://wa.me/56953466236" target="_blank" rel="noopener">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </>
  );
}
