import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Demo {
  title: string;
  description: string;
  technologies: string[];
  demoUrl: string;
  features: string[];
  imageUrl: string;
}

const demos: Demo[] = [
  {
    title: "Sistema de Viáticos",
    description: "Sistema de gestión y control de viáticos empresariales, permitiendo el registro, aprobación y seguimiento de gastos.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "JSON Server"],
    demoUrl: "https://sistema-viaticos.vercel.app/",
    features: [
      "Registro de viáticos",
      "Aprobación de gastos",
      "Dashboard de seguimiento",
      "Reportes y estadísticas"
    ],
    imageUrl: "/demos/viaticos-preview.png"
  },
  {
    title: "Sistema de Marcación",
    description: "Sistema de control de asistencia que permite registrar las entradas y salidas del personal, con funcionalidades de reportes y validaciones automáticas. El sistema está orientado a la gestión eficiente de recursos humanos en empresas y organizaciones.",
    technologies: ["Laravel", "Inertia.js", "React", "TailwindCSS"],
    demoUrl: "https://control-asistencia-4o5o.onrender.com/",
    features: [
      "Registro de entradas y salidas de empleados",
      "Validación automática de horarios",
      "Generación de reportes de asistencia",
      "Dashboard administrativo con métricas clave",
      "Interfaz moderna y responsiva"
    ],
    imageUrl: "/demos/marcacion-preview.png"
  },
  {
    title: "Sistema de Monitoreo de Fatiga",
    description: "Sistema web para la gestión y monitoreo de la fatiga laboral en trabajadores. Permite registrar, visualizar y analizar alertas de fatiga, así como administrar la información de los empleados y generar reportes automáticos.",
    technologies: ["Laravel", "Inertia.js", "React", "TailwindCSS"],
    demoUrl: "https://sistema-monitoreo-fatiga-app.fly.dev/login",
    features: [
      "Registro y gestión de trabajadores",
      "Monitoreo en tiempo real de alertas de fatiga",
      "Dashboard administrativo con métricas clave",
      "Generación de reportes automáticos",
      "Interfaz moderna, responsiva y modo oscuro",
      "Autenticación y control de sesiones"
    ],
    imageUrl: "/demos/monitor-fatiga-preview.png"
  }
];

export function InteractiveDemos() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      let newScroll;
      if (direction === "right") {
        newScroll = Math.min(scrollLeft + scrollAmount, scrollWidth - clientWidth);
      } else {
        newScroll = Math.max(scrollLeft - scrollAmount, 0);
      }
      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-12">
      <div className="relative mx-auto" style={{maxWidth: '90vw'}}>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 z-10 hidden md:flex opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
          style={{ transform: 'translateY(-50%)' }}
          onClick={() => scroll("left")}
          aria-label="Anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 md:pb-0 snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          {demos.map((demo, index) => (
            <Card
              key={index}
              className="min-w-[320px] max-w-xs md:min-w-[380px] md:max-w-sm flex-shrink-0 snap-center overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={demo.imageUrl}
                  alt={demo.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-1">
                <CardHeader>
                  <CardTitle>{demo.title}</CardTitle>
                  <CardDescription className="mb-2">{demo.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {demo.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="list-disc list-inside space-y-2 mb-4 overflow-y-auto">
                    {demo.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <CardFooter className="p-0 pt-2">
                      <Button asChild className="w-full">
                        <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                          Ver Demo
                        </a>
                      </Button>
                    </CardFooter>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 z-10 hidden md:flex opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
          style={{ transform: 'translateY(-50%)' }}
          onClick={() => scroll("right")}
          aria-label="Siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
} 