import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Ali is a catalyst for change who drives operational rigor to enable reliability. Her ability to thrive in ambiguity while maintaining keen business acumen is unmatched.",
    author: "M.E.",
    role: "Director",
    company: "Meta"
  },
  {
    quote: "She cultivated high-performing global teams and built resilient supply chains for our custom manufactured equipment. A true servant leader.",
    author: "J.P.",
    role: "VP",
    company: "Facebook"
  },
  {
    quote: "Ali defined requirements and launched critical applications to track workflow and risks for our data center construction. Her impact was immediate and lasting.",
    author: "Project Lead",
    role: "Construction Manager",
    company: "Facebook"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Testimonials</h2>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h3>
          <p className="text-muted-foreground">
            A legacy of delivering impactful results for the world's leading technology companies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <Card className="h-full border-none bg-muted/30 shadow-none hover:bg-muted/50 transition-colors">
                      <CardContent className="p-8 flex flex-col h-full">
                        <Quote className="w-8 h-8 text-secondary mb-6" />
                        <blockquote className="text-lg font-medium text-foreground mb-6 flex-grow">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-auto">
                          <cite className="not-italic font-bold text-primary block">
                            {testimonial.author}
                          </cite>
                          <span className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-background border-border hover:bg-muted" />
              <CarouselNext className="-right-12 bg-background border-border hover:bg-muted" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
