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
    quote: "12acre delivered exceptional project management on our tower construction program. Their professionalism and technical expertise were evident from day one — they executed on an aggressive timeline without compromising quality. The level of precision and coordination they brought to every site was outstanding.",
    author: "J.L.",
    role: "President",
    company: "Internet & Telecom Provider"
  },
  {
    quote: "12acre delivered a comprehensive strategy, cost-benefit analysis, and a detailed program and project plan for our programmatic retrofit rollout. They minimized the impact to our operational stores, limited disruptions to store staff, and maintained budgets even while managing second and third shift labor. An invaluable partner for complex, large-scale retail programs.",
    author: "R.M.",
    role: "Executive Brand Director",
    company: "Global Retailer"
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
            A legacy of delivering impactful results across industries.
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
