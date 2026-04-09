import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Code2,
  Terminal,
  Database,
  Briefcase,
  GraduationCap,
  Award,
  Heart
} from "lucide-react";
import { 
  SiCplusplus, 
  SiPython, 
  SiHtml5, 
  SiCss,
  SiMysql, 
  SiJupyter
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// --- Components ---

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon?: React.ElementType }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex items-center gap-3 mb-8"
  >
    {Icon && <Icon className="w-6 h-6 text-primary" />}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{children}</h2>
  </motion.div>
);

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tighter flex items-center gap-2 group">
          <span className="text-primary group-hover:glow-effect transition-all duration-300">UG.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_15px_-3px_rgba(43,127,255,0.4)]"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
};

// --- Main Page Component ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const skills = [
    { name: "C++", icon: SiCplusplus, color: "#00599C" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "HTML", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS", icon: SiCss, color: "#1572B6" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "GitHub", icon: Github, color: "#ffffff" },
    { name: "VS Code", icon: Code2, color: "#007ACC" },
    { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
  ];

  const projects = [
    {
      title: "AI-Threat Detection System",
      date: "July 2025 - August 2025",
      description: "Developed an AI/ML model trained on a Kaggle dataset for Safe/Threat classification achieving 90% accuracy. Built Python-based visualizations and a manual detection feature evaluating 8 key inputs.",
      tags: ["Python", "Machine Learning", "Data Visualization"],
      github: "https://github.com/Udaygandhi10982/AI_Threat_Detection"
    },
    {
      title: "Sentiment Analysis on Social Media",
      date: "February 2025 - April 2025",
      description: "Engineered a tri-class sentiment prediction model (Positive/Negative/Neutral) on Twitter data achieving 85% accuracy.",
      tags: ["Python", "scikit-learn", "NLTK"],
      github: "https://github.com/Udaygandhi10982/Sentiment_Analysis"
    },
    {
      title: "AI-Enhanced Bill Splitter",
      date: "February 2025 - April 2025",
      description: "Built a web-based bill splitter featuring an AI 'Cuisine Helper' module. Integrated the Twilio API for seamless SMS/email sharing.",
      tags: ["HTML", "CSS", "JavaScript", "Twilio API"],
      github: "https://github.com/Udaygandhi10982/Bill_splitter"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      <NavBar />

      <main className="container mx-auto px-6 max-w-5xl pt-32 pb-20">
        
        {/* HERO SECTION */}
        <section className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12 py-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for opportunities
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]">
              Hi, I'm <br />
              <span className="text-gradient bg-gradient-to-r from-primary to-blue-400">Uday Gandhi</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
              A passionate Computer Science engineering student building intelligent systems and robust software solutions.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                View Work <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/Udaygandhi10982" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a 
                href="https://linkedin.com/in/gandhiuday" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px]" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-card p-2 shadow-2xl">
                <img 
                  src="/avatar.png" 
                  alt="Uday Gandhi" 
                  className="w-full h-full object-cover rounded-xl grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="py-20 border-t border-border/50">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading icon={Terminal}>About Me</SectionHeading>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm currently pursuing my Computer Science undergrad at Lovely Professional University (Punjab, India), expected to graduate in August 2024. Prior to this, I completed a Diploma in Computer Science from Gulzar Group of Institutes.
                </p>
                <p>
                  I pride myself on my critical reasoning, ownership, and ability to manage time effectively. Whether it's training an ML model or architecting a backend solution, I approach problems with a self-assured, systematic mindset.
                </p>
              </div>
            </div>

            <div>
              <SectionHeading icon={Code2}>Technical Arsenal</SectionHeading>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-colors group cursor-default"
                  >
                    <skill.icon className="w-4 h-4 text-muted-foreground group-hover:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': skill.color } as any} />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-20 border-t border-border/50">
          <SectionHeading icon={Briefcase}>Experience</SectionHeading>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="text-lg font-bold text-foreground">AI-ML Application Training Intern</h3>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Jul - Aug 2025</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">Lovely Professional University</div>
                <p className="text-sm text-muted-foreground">
                  Focused on predictive analytics and machine learning applications. Developed and trained models on complex datasets, achieving high accuracy rates and building visualization tools.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 text-primary">
                <Database className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-card border border-border/50 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <h3 className="text-lg font-bold text-foreground">Software Engineer Intern</h3>
                  <span className="text-xs font-medium text-muted-foreground border border-border px-2 py-1 rounded">Jun - Aug 2023</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">Test Yantra Software Solutions</div>
                <p className="text-sm text-muted-foreground">
                  Worked extensively with Java and SQL to build and optimize software solutions. Collaborated with a team of developers to deliver features and maintain code quality.
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-20 border-t border-border/50">
          <SectionHeading icon={Terminal}>Featured Projects</SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-medium text-muted-foreground">{project.date}</div>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium tracking-wide uppercase px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS & EXTRACURRICULAR */}
        <section className="py-20 border-t border-border/50 grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading icon={GraduationCap}>Certifications</SectionHeading>
            <ul className="space-y-4">
              {[
                { name: "RPL Basics and Introduction to UiPath", issuer: "UiPath", date: "Feb 2026" },
                { name: "Employability & Core Technical Skills", issuer: "Infosys Springboard", date: "Aug 2025" },
                { name: "Privacy and Security on Social Media", issuer: "NPTEL", date: "Jan - Apr 2025" },
              ].map((cert, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm md:text-base">{cert.name}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <span className="font-medium text-foreground/70">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <SectionHeading icon={Heart}>Extra-Curricular</SectionHeading>
            <ul className="space-y-4">
              {[
                { title: "AWS Cloud Fundamentals Workshop", date: "Nov 2025", desc: "Participated in hands-on cloud architecture sessions." },
                { title: "NSS Volunteer", date: "Oct 2023 - Jul 2024", desc: "Managed outreach and environmental initiatives." },
                { title: "Blood Donation Camp Organizer", date: "Sep 2023", desc: "Orchestrated a successful campus-wide donation drive." },
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  <div>
                    <div className="font-medium text-sm md:text-base">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 mb-2">{item.date}</div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section id="contact" className="py-32 border-t border-border/50 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Let's build something.</h2>
            <p className="text-lg text-muted-foreground">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <a 
                href="mailto:udaygandhi10982@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_rgba(43,127,255,0.5)] hover:shadow-[0_0_30px_-5px_rgba(43,127,255,0.6)] w-full sm:w-auto"
              >
                <Mail className="w-5 h-5" /> Say Hello
              </a>
              <a 
                href="tel:+918360774127"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors border border-border w-full sm:w-auto"
              >
                +91 8360774127
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Uday Gandhi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Udaygandhi10982" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/gandhiuday" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:udaygandhi10982@gmail.com" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}