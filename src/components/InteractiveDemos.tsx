import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react"; // Added useState
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  // DialogTrigger, // Not strictly needed as we control open state manually
  // DialogClose, // Can be part of DialogFooter if needed, or manual close
} from "@/components/ui/dialog";

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
  viewMoreText: string; // New
  closeButtonText: string; // New
}

export function InteractiveDemos({ demos, viewDemoButtonText, previousButtonAriaLabel, nextButtonAriaLabel, viewMoreText, closeButtonText }: InteractiveDemosProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<DemoDataItem | null>(null);

  const handleViewMoreClick = (demo: DemoDataItem) => {
    setSelectedDemo(demo);
    setIsModalOpen(true);
  };

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
                  {/* Added truncate-2-lines class. Note: This class needs to be defined in globals.css */}
                  <CardDescription className="mb-2 truncate-2-lines h-[3em]">{demo.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {demo.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="list-disc list-inside space-y-1 mb-3 text-sm text-muted-foreground">
                    {demo.features.slice(0, 2).map((feature, i) => (
                      <li key={i} className="truncate"> {/* Simple truncate for single line */}
                        {feature}
                      </li>
                    ))}
                    {demo.features.length > 2 && (
                       <li className="text-xs text-muted-foreground/80">...and more.</li>
                    )}
                  </ul>
                  <div className="mt-auto">
                    <CardFooter className="p-0 pt-2 flex flex-col sm:flex-row gap-2 items-stretch">
                      <Button asChild className="w-full sm:w-auto flex-grow">
                        <a href={demo.demoUrl} target="_blank" rel="noopener noreferrer">
                          {viewDemoButtonText}
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full sm:w-auto flex-grow" onClick={() => handleViewMoreClick(demo)}>
                        {viewMoreText}
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

      {selectedDemo && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{selectedDemo.title}</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Using DialogDescription for semantic correctness, though not strictly necessary for styling */}
              <DialogDescription asChild> 
                <p className="text-sm text-muted-foreground">{selectedDemo.description}</p>
              </DialogDescription>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Features:</h4> {/* Consider if "Features" needs translation */}
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedDemo.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Technologies:</h4> {/* Consider if "Technologies" needs translation */}
                <div className="flex flex-wrap gap-2">
                  {selectedDemo.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-between gap-2 flex-col-reverse sm:flex-row">
              <Button variant="outline" asChild>
                <a href={selectedDemo.demoUrl} target="_blank" rel="noopener noreferrer">
                  {viewDemoButtonText} {/* Use the existing prop for this */}
                </a>
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>{closeButtonText}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}