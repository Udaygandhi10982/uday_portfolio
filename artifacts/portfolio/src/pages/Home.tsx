import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion";
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
  Heart,
  Moon,
  Sun,
  Download,
  Eye,
  Phone,
  Globe,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  FileText,
  Send,
  MapPin,
  User,
  BookOpen,
  Trophy,
  Zap
} from "lucide-react";
import { 
  SiCplusplus, 
  SiPython, 
  SiHtml5, 
  SiCss,
  SiMysql, 
  SiJupyter,
  SiX
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// ═══════════════════════════════════════════════
//  PROJECT TYRE ITEM (3D CYLINDRICAL)
// ═══════════════════════════════════════════════
const ProjectTyreItem = ({ 
  project, 
  index, 
  activeIndex,
  onSelect 
}: { 
  project: any; 
  index: number; 
  activeIndex: number;
  onSelect: () => void;
}) => {
  const offset = index - activeIndex;
  const isVisible = Math.abs(offset) <= 2;
  const isActive = Math.abs(offset) < 0.1;

  // Tyre effect math
  // as offset increases, it rotates further back and fades
  return (
    <motion.div
      animate={{
        rotateX: offset * -35,
        translateZ: Math.abs(offset) * -100,
        y: offset * 110,
        scale: 1 - Math.abs(offset) * 0.1,
        opacity: isVisible ? (1 - Math.abs(offset) * 0.4) : 0,
        filter: `blur(${Math.abs(offset) * 1}px)`,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        mass: 0.5 
      }}
      className={`absolute w-full p-6 rounded-[1.5rem] border transition-all duration-500 cursor-pointer ${
        isActive 
          ? "border-primary/50 bg-primary/10 shadow-[0_10px_40px_-10px_rgba(var(--primary-rgb),0.3)] z-20" 
          : "border-border/20 bg-card/10 z-10"
      }`}
      onClick={onSelect}
      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
    >
      <div className="flex flex-col gap-2">
        <h4 className={`text-lg font-bold transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
          {project.title}
        </h4>
        <p className="text-[10px] text-muted-foreground/60 uppercase font-bold tracking-wider">
          {project.tags.slice(0, 2).join(" • ")}
        </p>
      </div>
      
      {isActive && (
        <motion.div 
          layoutId="active-indicator-tyre"
          className="absolute -left-1 top-4 bottom-4 w-[3px] bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]"
        />
      )}
    </motion.div>
  );
};

//  SECTION HEADING COMPONENT
// ═══════════════════════════════════════════════
const SectionHeading = ({ 
  children, 
  subtitle,
  icon: Icon 
}: { 
  children: React.ReactNode;
  subtitle?: string;
  icon?: React.ElementType;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-3">
      {Icon && (
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--app-font-heading)' }}>
        {children}
      </h2>
    </div>
    {subtitle && (
      <p className="text-muted-foreground text-lg max-w-2xl ml-[52px]">{subtitle}</p>
    )}
  </motion.div>
);

// ═══════════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════════
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ═══════════════════════════════════════════════
//  NAVBAR COMPONENT
// ═══════════════════════════════════════════════
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ["home", "projects", "skills", "about", "certificates", "achievements", "resume", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    
    const isDark = document.documentElement.classList.contains("dark") || 
                  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Certificates", href: "#certificates" },
    { name: "Achievements", href: "#achievements" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-background/70 backdrop-blur-xl border-b border-border/50 py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tighter flex items-center gap-2 group" style={{ fontFamily: 'var(--app-font-heading)' }}>
            <span className="text-primary text-2xl group-hover:drop-shadow-[0_0_12px_hsl(217_91%_60%/0.6)] transition-all duration-300">UG</span>
            <span className="text-foreground/80 text-sm font-normal hidden sm:inline">Uday Gandhi</span>
          </a>
          
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeSection === link.href.slice(1) 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border hover:bg-secondary hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a 
              href="#contact" 
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.4)] hover:shadow-[0_0_30px_-5px_hsl(217_91%_60%/0.6)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Let's Build
            </a>
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-border hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 lg:hidden"
          >
            <nav className="flex flex-col items-center gap-2 p-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full text-center py-3 text-lg font-medium text-muted-foreground hover:text-primary transition-colors rounded-xl hover:bg-primary/5"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 w-full text-center py-3 text-lg font-semibold bg-primary text-primary-foreground rounded-xl"
              >
                Let's Build
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ═══════════════════════════════════════════════
//  MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════
export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // ─── SKILLS DATA ───
  const technicalSkills = [
    { name: "C++", icon: SiCplusplus, color: "#00599C", level: 85 },
    { name: "Java", icon: FaJava, color: "#007396", level: 80 },
    { name: "Python", icon: SiPython, color: "#3776AB", level: 90 },
    { name: "HTML", icon: SiHtml5, color: "#E34F26", level: 88 },
    { name: "CSS", icon: SiCss, color: "#1572B6", level: 82 },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", level: 78 },
  ];

  const tools = [
    { name: "GitHub", icon: Github, color: "#ffffff" },
    { name: "VS Code", icon: Code2, color: "#007ACC" },
    { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
    { name: "Automation Anywhere 360", icon: Terminal, color: "#0066cc" },
  ];

  const softSkills = [
    "Critical Reasoning", "Ownership & Accountability", "Time & Priority Management", 
    "Self-Assured", "Problem Solving", "Adaptability", "Communication"
  ];

  // ─── PROJECTS DATA ───
  const projects = [
    {
      title: "AI-Threat Detection System",
      date: "July 2025 - August 2025",
      description: "Developed an AI/ML model trained on a Kaggle dataset for Safe/Threat classification achieving 90% accuracy. Built Python-based visualizations and a manual detection feature evaluating 8 key inputs.",
      tags: ["Python", "Machine Learning", "Data Visualization"],
      github: "https://github.com/Udaygandhi10982/Ai_cyber_threat_detection",
      link: undefined
    },
    {
      title: "Sentiment Analysis on Social Media",
      date: "February 2025 - April 2025",
      description: "Engineered a tri-class sentiment prediction model (Positive/Negative/Neutral) on Twitter data achieving 85% accuracy.",
      tags: ["Python", "scikit-learn", "NLTK"],
      github: "https://github.com/Udaygandhi10982/Sentiment_Analysis",
      link: undefined
    },
    {
      title: "Bill Splitter",
      date: "February 2025 - April 2025",
      description: "Built a web-based bill splitter featuring an AI 'Cuisine Helper' module. Integrated the Twilio API for seamless SMS/email sharing.",
      tags: ["HTML", "CSS", "JavaScript", "Twilio API"],
      github: "https://github.com/Udaygandhi10982/bill_splitter_",
      link: undefined
    },
    {
      title: "Tic Tac Toe",
      date: "January 2025",
      description: "Interactive classic game featuring a responsive UI and intelligent game logic. Built to demonstrate proficiency in core web technologies.",
      tags: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Udaygandhi10982/rock-paper-scissors",
      link: undefined
    },
    {
      title: "Court Hearing",
      date: "November 2025 - December 2025",
      description: "A specialized management platform for tracking court hearing schedules and judicial records, streamlining legal coordination.",
      tags: ["Python", "Database", "Management System"],
      github: "https://github.com/Udaygandhi10982/Court_Hearing-",
      link: undefined
    },
    {
      title: "Cross-Lingual QA",
      date: "January 2026 - Present",
      description: "An NLP system for question answering across multiple languages using multilingual knowledge graphs and advanced language models.",
      tags: ["NLP", "AI", "Multilingual", "Python"],
      github: "https://github.com/Udaygandhi10982/Cross-Lingual-Question-Answering-over-Multilingual-Knowledge",
      link: undefined
    }
  ];

  // ─── CERTIFICATIONS DATA ───
  const certifications = [
    { name: "RPL Basics and Introduction to UiPath", issuer: "UiPath", date: "Feb 2026", link: "https://www.coursera.org/account/accomplishments/certificate/HGNIK23M268E" },
    { name: "Employability & Core Technical Skills", issuer: "Infosys Springboard", date: "Aug 2025", link: "https://drive.google.com/drive/folders/1QVmZRRGT1dqG2YlsgcJkR4WHgY6ZAiiI" },
    { name: "Privacy and Security on Social Media", issuer: "NPTEL", date: "Jan - Apr 2025", link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs79/Course/NPTEL25CS79S64310165404486404.pdf" },
  ];

  // ─── EXPERIENCE DATA ───
  const experiences = [
    {
      title: "AI-ML Application Training Intern",
      company: "Lovely Professional University",
      date: "Jul - Aug 2025",
      description: "Focused on predictive analytics and machine learning applications. Developed and trained models on complex datasets, achieving high accuracy rates and building visualization tools.",
      icon: Code2,
      current: true
    },
    {
      title: "Software Engineer Intern",
      company: "Test Yantra Software Solutions",
      date: "Jun - Aug 2023",
      description: "Worked extensively with Java and SQL to build and optimize software solutions. Collaborated with a team of developers to deliver features and maintain code quality.",
      icon: Database,
      current: false
    }
  ];

  // ─── EXTRA-CURRICULAR / ACHIEVEMENTS DATA ───
  const achievements = [
    { 
      title: "AWS Cloud Fundamentals Workshop", 
      date: "Nov 2025", 
      desc: "Explored core cloud concepts including architecture, deployment models, and basic AWS services through hands-on sessions.",
      icon: Globe
    },
    { 
      title: "NSS Volunteer", 
      date: "Oct 2023 – Jul 2024", 
      desc: "Coordinated outreach activities and environmental initiatives, contributing to community engagement programs.",
      icon: Heart
    },
    { 
      title: "Blood Donation Camp Organizer", 
      date: "Sep 2023", 
      desc: "Organized a campus-wide blood donation drive, managing logistics, volunteer coordination, and donor participation.",
      icon: Award
    },
  ];

  // ─── EDUCATION DATA ───
  const education = [
    {
      degree: "B.Tech — Computer Science & Engineering",
      institution: "Lovely Professional University",
      year: "2024 - Present",
      detail: "CGPA: 6.74",
      icon: GraduationCap
    },
    {
      degree: "Diploma — Computer Science",
      institution: "Gulzar Group of Institute",
      year: "2021 - 2024",
      detail: "CGPA: 7.20",
      icon: BookOpen
    },
    {
      degree: "Matriculation (10th)",
      institution: "USPC Jain Public School",
      year: "2020 - 2021",
      detail: "Percentage: 63%",
      icon: BookOpen
    }
  ];

  const [expandedExp, setExpandedExp] = useState<number | null>(null);
  const [expandedAchievement, setExpandedAchievement] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const wheelRef = useRef<HTMLDivElement>(null);
  const lastWheelTime = useRef(0);
  const lastTouchY = useRef(0);

  useEffect(() => {
    const el = wheelRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent background page from scrolling while over the tyre
      if (e.cancelable) e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime.current < 100) return;

      if (Math.abs(e.deltaY) > 8) {
        lastWheelTime.current = now;
        if (e.deltaY > 0) {
          setActiveProject(prev => Math.min(prev + 1, projects.length - 1));
        } else {
          setActiveProject(prev => Math.max(prev - 1, 0));
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [projects.length]);

  const toggleExp = (index: number) => {
    setExpandedExp(expandedExp === index ? null : index);
  };

  const toggleAchievement = (index: number) => {
    setExpandedAchievement(expandedAchievement === index ? null : index);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(e.currentTarget.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-blue-400 to-primary origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <NavBar />

      <main>
        
        {/* ═══════════════════════════════════════════════ */}
        {/*  HERO SECTION                                   */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden py-20">
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-[900px] mx-auto text-center space-y-10">
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs md:text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Open for Collaboration
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold tracking-tighter leading-[0.9] md:leading-[1]" 
                style={{ fontFamily: 'var(--app-font-heading)' }}
              >
                Hi, I'm <br />
                <span className="text-gradient bg-gradient-to-r from-primary via-blue-400 to-purple-500">Uday Gandhi</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-2xl text-muted-foreground max-w-[750px] leading-relaxed mx-auto font-medium"
              >
                A curious mind turned CS student — exploring, learning, and building to understand how things work.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-5 pt-4"
              >
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-2 px-10 py-4.5 rounded-2xl bg-primary text-primary-foreground font-bold transition-all shadow-[0_0_30px_-5px_hsl(217_91%_60%/0.5)] hover:shadow-[0_0_45px_-5px_hsl(217_91%_60%/0.7)]"
                >
                  View My Work 
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
                <motion.a 
                  href="https://drive.google.com/file/d/1LbyVTAiCBJggakz8GOh1oq5gflxplXzj/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-10 py-4.5 rounded-2xl bg-secondary border border-border text-foreground font-bold hover:border-primary/50 hover:bg-secondary/80 transition-all font-sans"
                >
                  <Download className="w-5 h-5" />
                  Download CV
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  ABOUT SECTION                                  */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="about" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={User} subtitle="Getting to know the developer behind the code.">About Me</SectionHeading>
            
            <div className="grid lg:grid-cols-5 gap-16 items-center">
              {/* Photo relocated to front of About section */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto lg:mx-0">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[40px]" />
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/50 bg-card p-1.5 shadow-2xl">
                    <img 
                      src="https://i.ibb.co/HL0mf2rs/Whats-App-Image-2026-04-11-at-2-11-40-AM.jpg" 
                      alt="Uday Gandhi Profile" 
                      className="w-full h-full object-cover object-top transition-all duration-500"
                    />
                  </div>
                  {/* Minimal accent */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3 space-y-6"
              >
                <p className="text-muted-foreground leading-relaxed text-lg">
                  I'm a Computer Science student who enjoys solving problems with code — especially when AI can make the solution smarter. I'm curious by nature, take ownership of my work, and adapt quickly to new tools and technologies. Beyond the screen, I've led community initiatives, organized events, and believe the best ideas come from blending technical skills with real-world empathy. I'm here to learn, build, and keep growing.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: Zap, text: "Focused on AI-ML & Intelligent Systems" },
                    { icon: Code2, text: "Proficient in Python, C++, and Java" },
                    { icon: Sparkles, text: "Exploring RAG & Cloud Deployments" },
                    { icon: Globe, text: "Enthusiast for Modern UX/UI Design" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/40"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  PROJECTS SECTION                               */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="projects" className="py-24 relative overflow-hidden">
          <div className="section-divider mb-16" />
          {/* Background Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <SectionHeading icon={Terminal} subtitle="Deep dive into some of my key engineering solutions and technical explorations.">
              Project Showcase
            </SectionHeading>

            <div className="mt-16 grid lg:grid-cols-12 gap-12 items-center relative">
              {/* Left Side: Tyre Picker */}
              <div 
                ref={wheelRef}
                className="lg:col-span-5 relative h-[450px] flex items-center justify-center p-6 touch-none cursor-ns-resize"
                style={{ 
                  perspective: "1200px",
                  maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)"
                }}
                onTouchStart={(e) => {
                  lastTouchY.current = e.touches[0].clientY;
                }}
                onTouchMove={(e) => {
                  const deltaY = lastTouchY.current - e.touches[0].clientY;
                  if (Math.abs(deltaY) > 30) {
                    if (deltaY > 0) {
                      setActiveProject(prev => Math.min(prev + 1, projects.length - 1));
                    } else {
                      setActiveProject(prev => Math.max(prev - 1, 0));
                    }
                    lastTouchY.current = e.touches[0].clientY;
                  }
                }}
              >
                <div className="relative w-full max-w-[320px] h-full flex items-center justify-center">
                  {projects.map((project, i) => (
                    <ProjectTyreItem 
                      key={project.title}
                      project={project}
                      index={i}
                      activeIndex={activeProject}
                      onSelect={() => setActiveProject(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Sticky Preview Card */}
              <div className="lg:col-span-7 lg:sticky lg:top-32 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative p-7 md:p-10 rounded-[2rem] bg-card/60 backdrop-blur-2xl border border-border/80 shadow-2xl card-shine overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-primary/5 blur-[60px]" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[9px] font-bold tracking-[0.2em] uppercase border border-primary/20">Selected Project</span>
                        <span className="text-[11px] text-muted-foreground font-medium">{projects[activeProject].date}</span>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl font-extrabold mb-5 tracking-tight">
                        {projects[activeProject].title}
                      </h3>

                      <p className="text-base text-muted-foreground leading-relaxed mb-8 line-clamp-4">
                        {projects[activeProject].description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {projects[activeProject].tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-lg bg-background/50 border border-border/50 text-[10px] font-bold text-muted-foreground lowercase">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <a 
                          href={projects[activeProject].github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary border border-border hover:text-primary hover:border-primary/50 transition-all font-bold text-xs"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                        {projects[activeProject].link && (
                          <a 
                            href={projects[activeProject].link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all font-bold text-xs"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  SKILLS SECTION                                 */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="skills" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={Zap} subtitle="A breakdown of my technical arsenal and professional soft skills.">
              Mastered Capabilities
            </SectionHeading>

            <div className="space-y-12">
              {/* Technical Skills Block Layout - UNIQUE & PROMINENT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-12 rounded-3xl bg-card border border-border relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors duration-700" />
                
                <h3 className="text-2xl font-bold mb-10 flex items-center gap-3" style={{ fontFamily: 'var(--app-font-heading)' }}>
                  <Code2 className="w-7 h-7 text-primary" />
                  Technical Expertise
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                  {technicalSkills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/40 hover:bg-secondary/50 transition-all shadow-sm hover:shadow-xl"
                    >
                      <div className="w-12 h-12 rounded-xl bg-background border border-border/50 flex items-center justify-center mb-4 group-hover:border-primary/20 transition-all shadow-inner">
                        <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
                      </div>
                      <span className="text-sm font-bold tracking-tight">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Tools - Compact Tiles */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-card border border-border/50 group hover:border-primary/20 transition-all"
                >
                  <h4 className="text-lg font-bold mb-8 flex items-center gap-2" style={{ fontFamily: 'var(--app-font-heading)' }}>
                    <Terminal className="w-5 h-5 text-primary" /> Tools & Platforms
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {tools.map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/40 border border-border/50 text-xs font-semibold hover:bg-secondary hover:border-primary/30 transition-all cursor-default"
                      >
                        <tool.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{tool.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Soft Skills Chips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 rounded-3xl bg-card border border-border/50 group hover:border-primary/20 transition-all"
                >
                  <h4 className="text-lg font-bold mb-8 flex items-center gap-2" style={{ fontFamily: 'var(--app-font-heading)' }}>
                    <Heart className="w-5 h-5 text-primary" /> Soft Skills
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {softSkills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, type: "spring", stiffness: 260, damping: 20 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="px-4 py-2.5 rounded-xl bg-secondary/40 border border-border/50 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-primary/30 transition-all cursor-default tracking-tight"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  EXPERIENCE SECTION                             */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="experience" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={Briefcase}>Experience</SectionHeading>
            
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  onClick={() => toggleExp(i)}
                  className="relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all cursor-pointer group card-shine"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <exp.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                        <div className="text-sm text-muted-foreground">{exp.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium px-3 py-1.5 rounded-lg text-primary bg-primary/10 border border-primary/20">
                        {exp.date}
                      </span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expandedExp === i ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  <div className={`transition-all duration-400 ease-in-out overflow-hidden ${expandedExp === i ? 'max-h-96 opacity-100 mt-4 pl-[52px]' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  CERTIFICATIONS SECTION                         */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="certificates" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={Award} subtitle="Professional achievements and validated expertise.">
              Certifications
            </SectionHeading>

            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert, i) => (
                <motion.a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="cert-card p-6 rounded-2xl group block"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                      Issued {cert.date.split(' ').pop()}
                    </span>
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--app-font-heading)' }}>
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Certificate <ArrowUpRight className="w-3 h-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  ACHIEVEMENTS SECTION                           */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="achievements" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={Trophy} subtitle="A track record of continuous learning, problem-solving, and professional growth.">
              Achievements
            </SectionHeading>

            <div className="space-y-4">
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  onClick={() => toggleAchievement(i)}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:bg-secondary/10 transition-all cursor-pointer group"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mt-0.5">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${expandedAchievement === i ? 'rotate-90' : ''}`} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                    <div className={`transition-all duration-400 ease-in-out overflow-hidden ${expandedAchievement === i ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  EDUCATION SECTION                              */}
        {/* ═══════════════════════════════════════════════ */}
        <section className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={GraduationCap} subtitle="My core academic journey and academic excellence.">
              Education
            </SectionHeading>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-border to-transparent" />
              
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative flex items-start gap-6 pl-2"
                  >
                    <div className="relative z-10 flex items-center justify-center w-[44px] h-[44px] rounded-full bg-card border-2 border-primary/30 shadow-lg shrink-0">
                      <edu.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="pb-2">
                      <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--app-font-heading)' }}>{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <span className="text-xs text-primary mt-1 inline-block">{edu.year}</span>
                      {edu.detail && <span className="text-xs text-muted-foreground ml-3">• {edu.detail}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  RESUME SECTION                                 */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="resume" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={FileText} subtitle="Get a comprehensive overview of my professional experience and skills.">
              Resume
            </SectionHeading>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 rounded-3xl bg-card border border-border text-center max-w-2xl mx-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Deep dive into my technical journey, detailed project breakdowns, and academic milestones in a single document.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.a 
                    href="https://drive.google.com/uc?export=download&id=1LbyVTAiCBJggakz8GOh1oq5gflxplXzj"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-all shadow-[0_0_25px_-5px_hsl(217_91%_60%/0.5)] hover:shadow-[0_0_35px_-5px_hsl(217_91%_60%/0.7)] w-full sm:w-auto justify-center"
                  >
                    <Download className="w-5 h-5" /> Download PDF
                  </motion.a>
                  <motion.a 
                    href="https://drive.google.com/file/d/1LbyVTAiCBJggakz8GOh1oq5gflxplXzj/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-secondary border border-border text-foreground font-semibold hover:border-primary/50 transition-all w-full sm:w-auto justify-center"
                  >
                    <Eye className="w-5 h-5" /> View Online
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════ */}
        {/*  CONTACT SECTION                                */}
        {/* ═══════════════════════════════════════════════ */}
        <section id="contact" className="py-16 relative">
          <div className="section-divider mb-16" />
          <div className="container mx-auto px-6 max-w-6xl">
            <SectionHeading icon={Send} subtitle="Open to opportunities, collaborations, and conversations. I usually respond within 24 hours.">
              Get In Touch
            </SectionHeading>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { 
                  label: "Email", 
                  sublabel: "Drop a line", 
                  icon: Mail, 
                  href: "mailto:udaygandhi10982@gmail.com",
                  value: "udaygandhi10982@gmail.com"
                },
                { 
                  label: "Mobile", 
                  sublabel: "Call me", 
                  icon: Phone, 
                  href: "tel:+918360774127",
                  value: "+91 83607 74127"
                },
                { 
                  label: "Network", 
                  sublabel: "LinkedIn", 
                  icon: Linkedin, 
                  href: "https://linkedin.com/in/gandhiuday",
                  value: "linkedin.com/in/gandhiuday"
                },
                { 
                  label: "Repos", 
                  sublabel: "GitHub", 
                  icon: Github, 
                  href: "https://github.com/Udaygandhi10982",
                  value: "github.com/Udaygandhi10982"
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="contact-card p-6 rounded-2xl group block text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm font-bold mb-1">{item.label}</div>
                  <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">{item.sublabel}</div>
                </motion.a>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto p-8 rounded-3xl bg-card border border-border"
            >
              <h3 className="text-xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--app-font-heading)' }}>
                Fill out the form below and I'll be in touch.
              </h3>
              <form className="space-y-5" onSubmit={handleFormSubmit} action="https://formspree.io/f/mpqkqvgb" method="POST">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Subject</label>
                  <input 
                    name="subject"
                    type="text" 
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                  <textarea 
                    name="message"
                    rows={5} 
                    required
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all resize-none placeholder:text-muted-foreground/50"
                  />
                </div>
                
                <AnimatePresence>
                  {formStatus === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                    formStatus === "submitting" 
                      ? "bg-secondary text-muted-foreground cursor-not-allowed" 
                      : "bg-primary text-primary-foreground shadow-[0_0_25px_-5px_hsl(217_91%_60%/0.4)] hover:shadow-[0_0_35px_-5px_hsl(217_91%_60%/0.6)]"
                  }`}
                >
                  {formStatus === "submitting" ? (
                    <div className="w-5 h-5 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ═══════════════════════════════════════════════ */}
      {/*  FOOTER                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <footer className="py-10 relative">
        <div className="section-divider mb-10" />
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--app-font-heading)' }}>UG</span>
              <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Uday Gandhi. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com/Udaygandhi10982" },
                { icon: Linkedin, href: "https://linkedin.com/in/gandhiuday" },
                { icon: Mail, href: "mailto:udaygandhi10982@gmail.com" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-2.5 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}