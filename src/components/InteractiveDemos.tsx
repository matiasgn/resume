import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DemoDataItem {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  demoUrl: string;
  imageUrl: string;
}

interface InteractiveDemosProps {
  // language: 'es' | 'en'; // This prop might not be strictly needed if all text is pre-translated
  demos: DemoDataItem[]; // Renamed from translatedDemos for clarity
  viewDemoButtonText: string;
  previousButtonAriaLabel: string;
  nextButtonAriaLabel: string;
}

export function InteractiveDemos({ demos, viewDemoButtonText, previousButtonAriaLabel, nextButtonAriaLabel }: InteractiveDemosProps) {
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
          aria-label={previousButtonAriaLabel}
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
                          {viewDemoButtonText}
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
          aria-label={nextButtonAriaLabel}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
} 