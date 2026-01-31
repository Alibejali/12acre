import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
                <img 
                  src="/logo-dark.png" 
                  alt="12Acre Logo" 
                  className="h-8 w-8 object-contain opacity-80" 
                />
                <span className="font-display font-bold text-xl tracking-tight text-foreground">
                  12Acre
                </span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Bound ambition. Harnessing finite resources to cultivate vast opportunities.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Program Controls</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Strategic Sourcing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Risk Management</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Construction Mgmt</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; 2007-{new Date().getFullYear()} 12Acre Consulting. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Minority Woman-Owned Business Enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
