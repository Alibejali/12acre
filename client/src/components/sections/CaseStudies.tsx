import { motion } from "framer-motion";
import { 
  Cpu, 
  Globe, 
  Building2, 
  Users,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const caseStudies = [
  {
    id: "bms-controls",
    icon: Cpu,
    category: "Strategic Sourcing & Manufacturing",
    title: "Custom BMS Control Panel Program",
    client: "Global Technology Company",
    challenge: "A leading hyperscale technology company required a reliable supply chain for custom Building Management System (BMS) control panels to support their aggressive data center expansion roadmap. With complex specifications and tight delivery windows, traditional sourcing approaches were failing to meet demand.",
    solution: "We developed and executed a comprehensive strategic sourcing strategy that combined vendor management, logistics optimization, and operational excellence. By modeling demand and supply patterns, we built an entirely new custom manufactured control panel supply chain worth over $120M.",
    outcomes: [
      "Delivered 1,000+ custom BMS control panels on schedule",
      "Maintained 100% on-time delivery during global supply chain disruptions",
      "Ensured limited risk and highest availability through multi-vendor strategy",
      "Created scalable framework supporting continued hyperscale growth"
    ],
    impact: "$120M+ supply chain built from ground up"
  },
  {
    id: "infrastructure-risk",
    icon: Globe,
    category: "Risk Management & Due Diligence",
    title: "Global Infrastructure Investment Platform",
    client: "Fortune 10 Technology Company",
    challenge: "A major technology company needed to evaluate country-level risks before making significant infrastructure investments globally, including a transformative subsea cable project designed to bring connectivity to an entire continent. The stakes were enormous—billions in investment requiring rigorous due diligence.",
    solution: "We developed a comprehensive platform to handle workflow, secure documents, and support organizational programs for infrastructure investment decisions. This included building a team of risk managers to evaluate geopolitical, regulatory, and operational risks across multiple countries.",
    outcomes: [
      "Led prioritization for network investment and connectivity projects totaling $450M+",
      "Enabled due diligence for continent-spanning subsea cable project",
      "Created standardized risk evaluation framework for global infrastructure decisions",
      "Reduced time-to-decision for major capital expenditures"
    ],
    impact: "$450M+ in projects prioritized and de-risked"
  },
  {
    id: "hyperscale-platform",
    icon: Building2,
    category: "Platform Development & Operations",
    title: "Hyperscale Data Center Source-to-Pay Platform",
    client: "Major Social Media Company",
    challenge: "Supporting hyperscale data center construction required managing billions in strategic sourcing across A&E services, mission-critical equipment, and professional services globally. Existing tools couldn't handle the complexity, compliance requirements, or scale needed.",
    solution: "We championed comprehensive S2P (Source-to-Pay) tooling priorities and recommended integrated solutions for optimized organizational performance. This included developing strategic sourcing strategies exceeding $4B to scale global data center construction.",
    outcomes: [
      "Implemented $4B+ strategic sourcing strategy across global operations",
      "Standardized compliance and payment workflows for hyperscale construction",
      "Optimized vendor relationships through strategic commercial negotiations",
      "Enabled global scaling of data center construction programs"
    ],
    impact: "$4B+ in sourcing strategy implemented"
  },
  {
    id: "support-center",
    icon: Users,
    category: "Team Building & Operations",
    title: "24/7 Global Construction Support Center",
    client: "Major National Retailer",
    challenge: "A national retail brand with thousands of locations needed a centralized support operation to handle construction and facilities issues across their portfolio. The existing approach was fragmented, reactive, and couldn't scale with the company's growth.",
    solution: "We transformed the support operation from a limited daytime service into a fully operational 24/7 contact center. This included optimizing service levels, expanding coverage, offshoring operations for cost efficiency, and training teams to handle the full complexity of construction and facilities management.",
    outcomes: [
      "Expanded from limited hours to full 24/7 operation",
      "Successfully offshored and trained international support teams",
      "Optimized service levels and response times across all contact types",
      "Scaled program to cover all brand portfolios (3,000+ locations)"
    ],
    impact: "3,000+ retail locations supported globally"
  }
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Case Studies</h2>
          <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proven Results at <span className="text-primary">Enterprise Scale</span>
          </h3>
          <p className="text-muted-foreground text-lg">
            Real-world examples of how we've helped Fortune 100 companies solve complex operational challenges.
          </p>
        </div>

        <div className="grid gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-3 gap-0">
                    {/* Left Column - Header */}
                    <div className="bg-primary/5 p-8 flex flex-col justify-center border-r border-border">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <study.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-primary tracking-widest uppercase mb-2">
                        {study.category}
                      </span>
                      <h4 className="font-display text-2xl font-bold text-foreground mb-3">
                        {study.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {study.client}
                      </p>
                      <div className="mt-auto pt-4 border-t border-border/50">
                        <p className="text-sm font-bold text-primary">{study.impact}</p>
                      </div>
                    </div>

                    {/* Right Columns - Content */}
                    <div className="lg:col-span-2 p-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-destructive"></span>
                            Challenge
                          </h5>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            {study.challenge}
                          </p>
                          
                          <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            Solution
                          </h5>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            Key Outcomes
                          </h5>
                          <ul className="space-y-3">
                            {study.outcomes.map((outcome, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
