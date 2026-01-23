import { motion } from "framer-motion";
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  FileCheck 
} from "lucide-react";
import architectureImage from "@/assets/architecture-detail.jpg";

const services = [
  {
    icon: Globe,
    title: "Global Program Controls",
    description: "Managing program level controls, governance, and creating global frameworks for infrastructure delivery."
  },
  {
    icon: TrendingUp,
    title: "Strategic Sourcing",
    description: "Developing sourcing strategies to scale global data center construction and mission-critical equipment."
  },
  {
    icon: ShieldCheck,
    title: "Risk Management",
    description: "Evaluating country-level risks and implementing portfolio risk management frameworks."
  },
  {
    icon: Users,
    title: "Vendor Management",
    description: "Optimizing service delivery of construction support services and managing strategic partner relationships."
  },
  {
    icon: FileCheck,
    title: "Contract Negotiation",
    description: "Modeling and negotiating commercial terms, global discount structures, and commodity index variants."
  },
  {
    icon: Building2,
    title: "Construction Management",
    description: "End-to-end management of large-scale construction programs, retrofits, and office portfolios."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30 relative">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 mb-16 items-end">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Expertise</h2>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Strategic Solutions for <br />
              <span className="text-primary">Complex Environments</span>
            </h3>
          </div>
          <p className="text-muted-foreground max-w-xl pb-2">
            From boutique retail builds to massive hyperscale infrastructure, we provide the grounded expertise needed to navigate complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background p-8 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display text-xl font-bold mb-3">{service.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Break */}
        <div className="mt-20 rounded-2xl overflow-hidden h-64 md:h-80 relative">
          <img 
            src={architectureImage} 
            alt="Architectural Detail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-white text-center px-4">
              Building the Foundation for Growth
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
