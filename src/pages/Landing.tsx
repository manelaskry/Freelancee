import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Shield, ArrowRight, CheckCircle, Zap, Globe } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">WorkFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="font-medium">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-1.5 mb-8">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Trusted Escrow Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight mb-6">
            Hire Talent.
            <br />
            <span className="text-accent">Get Paid Safely.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Connect with top freelancers, manage projects with secure escrow payments, 
            and grow your business — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 h-12 gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-base px-8 h-12">
                I already have an account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-4">
            Everything you need to work smarter
          </h2>
          <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
            From finding talent to releasing payments — we've got every step covered.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Find & Connect",
                desc: "Browse freelancer profiles, check reviews, and send project invitations instantly.",
              },
              {
                icon: Shield,
                title: "Secure Escrow",
                desc: "Client funds are locked until work is approved. Both parties are protected.",
              },
              {
                icon: Globe,
                title: "Dispute Resolution",
                desc: "Admin-moderated dispute system ensures fair outcomes for every project.",
              },
            ].map((f, i) => (
              <div key={i} className="group rounded-xl border border-border bg-background p-7 transition-all hover:shadow-lg hover:border-accent/30">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <f.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-14">
            How it works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Post or Browse", desc: "Share a job or find opportunities in the feed." },
              { step: "02", title: "Connect & Agree", desc: "Message, negotiate, and invite freelancers." },
              { step: "03", title: "Fund Escrow", desc: "Client deposits funds — safely held by the platform." },
              { step: "04", title: "Deliver & Get Paid", desc: "Submit work, get approved, and receive payment." },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-heading font-bold text-accent/20 mb-3">{s.step}</div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Freelancers" },
              { value: "5K+", label: "Projects" },
              { value: "99%", label: "Satisfaction" },
              { value: "24/7", label: "Support" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-heading font-bold mb-1">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of clients and freelancers building together.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-10 h-12 gap-2">
              Create Your Account <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-accent flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-heading font-semibold text-foreground">WorkFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 WorkFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
