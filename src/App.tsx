import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Camera, Video, MonitorPlay, X, Menu, ChevronDown, Instagram, Linkedin, Youtube, Star, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PORTFOLIO_PROJECTS, EXPERIENCE, SERVICES } from './data/content';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  const currentSrc = target.src;
  
  if (!target.dataset.retryCount) {
    target.dataset.retryCount = '0';
  }
  
  const retryCount = parseInt(target.dataset.retryCount, 10);
  if (retryCount >= 2) return;
  
  target.dataset.retryCount = (retryCount + 1).toString();
  
  if (currentSrc.match(/\.png$/i)) {
    target.src = currentSrc.replace(/\.png$/i, '.jpg');
  } else if (currentSrc.match(/\.jpg$/i)) {
    target.src = currentSrc.replace(/\.jpg$/i, '.jpeg');
  } else if (currentSrc.match(/\.jpeg$/i)) {
    target.src = currentSrc.replace(/\.jpeg$/i, '.png');
  }
};

// Custom Behance Icon since Lucide doesn't have one
const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v2h7V7zm1.72 4.68c-.16-.82-.54-1.51-1.15-2.06-.61-.55-1.4-.83-2.37-.83-1.08 0-1.93.33-2.56.99-.63.66-.96 1.58-.96 2.76 0 1.15.31 2.06.94 2.73.63.67 1.46 1.01 2.5 1.01 1.06 0 1.88-.3 2.47-.9.59-.6.91-1.42.97-2.46h-4.04c.03.48.19.84.48 1.08.29.24.66.36 1.11.36.48 0 .84-.13 1.08-.39.24-.26.38-.64.41-1.14h1.12zm-4.44-1.21c.05-.44.2-.77.47-1 .27-.23.61-.34 1.02-.34.4 0 .73.11.98.33.25.22.4.55.45.98h-2.92zM6.9 11.21c.82-.25 1.46-.68 1.92-1.3.46-.62.69-1.38.69-2.28 0-1.08-.36-1.92-1.08-2.52-.72-.6-1.74-.9-3.06-.9H0v14.4h5.61c1.46 0 2.58-.33 3.36-.99.78-.66 1.17-1.57 1.17-2.73 0-1.04-.3-1.85-.9-2.43-.6-.58-1.38-.96-2.34-1.15zm-2.88-5.31h1.23c.64 0 1.11.13 1.41.39.3.26.45.65.45 1.17 0 .54-.16.94-.48 1.2-.32.26-.81.39-1.47.39H4.02V5.9zm0 7.32h1.44c.7 0 1.22.14 1.56.42.34.28.51.71.51 1.29 0 .62-.18 1.08-.54 1.38-.36.3-.92.45-1.68.45H4.02v-3.54z"/>
  </svg>
);

const projects = PORTFOLIO_PROJECTS;

const Navbar = ({ setShowLogin }: { setShowLogin: (show: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md py-4 shadow-lg shadow-black/20' : 'bg-transparent py-6'}`}>
      <div className="w-full px-4 md:px-6 flex justify-between items-center">
        <a href="#home" className="text-xl font-semibold tracking-widest uppercase text-white">
          Kunal<span className="text-[#ff3b3b]">Gupta</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm uppercase tracking-widest text-neutral-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
          {/* The Secret Login Trigger */}
          <div className="w-px h-4 bg-white/20 ml-2"></div>
          <button 
            onClick={() => setShowLogin(true)} 
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
          >
            <Lock className="w-3 h-3" /> Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-neutral-950 border-t border-neutral-900 py-4 px-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-neutral-300 hover:text-white transition-colors block"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
          className="w-full h-full object-cover opacity-60"
        >
          {/* Note: The attached video cannot be directly hosted by the AI. 
            Please place your video file in the 'public' folder and name it 'hero-video.mp4'.
          */}
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-neutral-950"></div>
      </div>

      <div className="relative z-10 text-center px-4 w-full mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[12rem] leading-[0.85] font-medium tracking-tighter text-white italic"
        >
          I CREATE <br/> THE <span className="text-[#ff3b3b]">VISION</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10"
        >
          <a href="#portfolio" className="group relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/5 backdrop-blur-md transition-transform duration-300 hover:scale-105 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* 1. The Masked Spinning Border */}
            <span className="absolute inset-0 rounded-full pointer-events-none p-[2px]" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}>
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,rgba(255,255,255,0.9)_100%)]"></span>
            </span>
            
            {/* 2. The Text */}
            <span className="relative z-10 text-sm md:text-base font-semibold tracking-widest text-white uppercase drop-shadow-md">
              PORTFOLIO
            </span>
            
            {/* 3. The Hover Sweep */}
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-10 pointer-events-none"></div>
          </a>

          <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/5 backdrop-blur-md transition-transform duration-300 hover:scale-105 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            {/* 1. The Masked Spinning Border */}
            <span className="absolute inset-0 rounded-full pointer-events-none p-[2px]" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}>
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,rgba(255,255,255,0.9)_100%)]"></span>
            </span>
            
            {/* 2. The Text */}
            <span className="relative z-10 text-sm md:text-base font-semibold tracking-widest text-white uppercase drop-shadow-md">
              CONTACT
            </span>
            
            {/* 3. The Hover Sweep */}
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[30deg] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out z-10 pointer-events-none"></div>
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-xs text-neutral-500 tracking-widest uppercase mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-neutral-500 w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeaturedWork = ({ onOpenModal }: { onOpenModal: (project: any) => void }) => {
  return (
    <section className="py-24 md:py-32 bg-neutral-950 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16 md:mb-24"
      >
        <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Selected Works</h2>
        <h3 className="text-3xl md:text-5xl font-light text-white">Featured Projects</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {projects.slice(0, 3).map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group cursor-pointer"
            onClick={() => onOpenModal(project)}
          >
            <div className="relative overflow-hidden aspect-[4/5] mb-6">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white tracking-widest uppercase text-sm border border-white/50 px-6 py-3">
                  View Project
                </span>
              </div>
            </div>
            <h4 className="text-xl text-white mb-1">{project.title}</h4>
            <p className="text-sm text-neutral-500 tracking-wide">{project.category}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(from);
  const ref = React.useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (to - from) + from));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };
    animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], ["-15deg", "15deg"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], ["15deg", "-15deg"]);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 bg-[#0d0d0d] px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 3D Image Container */}
        <div style={{ perspective: '1000px' }} className="flex justify-center items-center">
          <motion.div 
            style={{ rotateX, rotateY }} 
            className="relative w-full aspect-square"
          >
            {/* The Sweeping Glow (Unclipped) */}
            <div className="absolute inset-0 blur-[20px] opacity-60 -z-10 pointer-events-none">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                <div className="absolute inset-[-100%] rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(239,68,68,1)_100%)] animate-[spin_8s_linear_infinite]"></div>
              </div>
            </div>
            
            {/* The Sharp Neon Border (Clipped Mask) */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
              <div className="absolute inset-[-100%] rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(239,68,68,1)_100%)] animate-[spin_8s_linear_infinite]"></div>
            </div>
            
            {/* The Inner Image & Glass Overlays */}
            <div className="absolute inset-[3px] rounded-[calc(2rem-3px)] bg-zinc-950 overflow-hidden relative">
              <img src="/profile.jpg" alt="Kunal Gupta" className="w-full h-full object-cover" onError={handleImageError} />
              
              {/* Inner Frosted Border */}
              <div className="absolute inset-0 border border-white/20 rounded-[calc(2rem-3px)] pointer-events-none"></div>
              
              {/* Inner Depth Shadow */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              
              {/* Glass Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-80 mix-blend-overlay pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-6">About</h2>
          <h3 className="text-3xl md:text-5xl font-light text-white mb-8 leading-tight">
            Transforming Architectural Concepts into Photorealistic Visuals.
          </h3>
          <p className="text-neutral-400 text-lg leading-relaxed mb-12">
            A graduate of Amity University, Noida with a Bachelor of Fine Arts in Animation, I currently work as a Freelance 3D Artist, contributing to creative projects that involves Architectural Visualisation, Interactive Renders and CGI, where I ensured alignment with client goals. My experience spans end-to-end project management, from concept development to delivery. My academic background and professional roles have equipped me with a strong foundation in animation, interactive technology, and video graphics, fostering creativity and precision in all my work.
          </p>
          
          <div className="grid grid-cols-2 gap-8 border-t border-neutral-800 pt-10">
            <div>
              <p className="text-5xl font-light text-white mb-2">
                <AnimatedCounter from={0} to={4} suffix="+" />
              </p>
              <p className="text-sm text-neutral-500 tracking-widest uppercase">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-light text-white mb-2">
                <AnimatedCounter from={0} to={50} suffix="+" />
              </p>
              <p className="text-sm text-neutral-500 tracking-widest uppercase">Projects Completed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineCard = ({ exp, isEven }: { exp: any, isEven: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["0 1", "1.2 1"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 1], 
    isEven ? ["90deg", "0deg"] : ["-90deg", "0deg"]
  );

  return (
    <div ref={cardRef} className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-16 relative`}>
      {/* Timeline Dot */}
      <div className="absolute left-[13px] md:left-1/2 w-4 h-4 rounded-full bg-neutral-900 border-2 border-red-500 md:-translate-x-1/2 mt-6 shadow-[0_0_15px_rgba(239,68,68,0.7)] z-20" />
      
      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block md:w-1/2" />
      
      {/* Card Content */}
      <motion.div 
        style={{ 
          opacity, 
          scale, 
          rotateY, 
          transformOrigin: isEven ? 'right center' : 'left center' 
        }}
        className="w-full md:w-1/2 pl-12 md:pl-0 [perspective:1000px]"
      >
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.7)] transition-all duration-500 group relative overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-black via-red-950/40 to-black bg-[length:200%_200%] animate-gradient-shift" />
          
          <div className="relative z-10">
            <div className="text-red-500 text-sm font-mono tracking-wider mb-2">{exp.period}</div>
            <h4 className="text-xl md:text-2xl text-white font-medium mb-4 group-hover:text-red-50 transition-colors">{exp.role}</h4>
            
            {exp.type === 'skills' ? (
              <div className="flex flex-wrap gap-3 mt-6">
                {exp.skills?.map((skill: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 hover:border-red-500/50 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.7)] transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-neutral-400 leading-relaxed">
                {exp.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = EXPERIENCE;

  return (
    <section id="experience" className="py-24 md:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">My Journey</h2>
          <h3 className="text-3xl md:text-5xl font-light text-white">Experience & Journey</h3>
        </motion.div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Neon Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2" />
          
          {/* Animated Neon Line */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-red-500 md:-translate-x-1/2 origin-top shadow-[0_0_15px_rgba(239,68,68,0.7)] z-0"
          />

          <div className="space-y-12 md:space-y-24 relative z-10">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return <TimelineCard key={exp.id} exp={exp} isEven={isEven} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "Architect, Studio Axis",
      text: "Kunal delivered exceptionally detailed renders for our residential project. The lighting and material realism helped our clients immediately understand the design intent."
    },
    {
      name: "Ritika Sharma",
      role: "Interior Designer",
      text: "The walkthrough animation Kunal created was incredibly cinematic. It elevated our presentation and made the entire space feel alive before construction even started."
    },
    {
      name: "Daniel Thomas",
      role: "Real Estate Developer",
      text: "We needed high-quality visuals for a marketing presentation and Kunal exceeded expectations. The renders looked almost indistinguishable from real photography."
    },
    {
      name: "Neha Kapoor",
      role: "Architect, NK Design Collective",
      text: "Kunal has a great eye for composition and lighting. His ability to transform architectural drawings into compelling visuals is impressive."
    },
    {
      name: "Rahul Verma",
      role: "Urban Planner",
      text: "The level of detail in the environment and atmosphere added real depth to our project visuals. It made the concept much easier to communicate."
    },
    {
      name: "Sanjay Khanna",
      role: "Project Consultant",
      text: "Professional, responsive, and highly skilled. Kunal delivered our visualization package on time and the quality was outstanding."
    },
    {
      name: "Emily Carter",
      role: "Architectural Designer",
      text: "The renders captured the mood and architectural language perfectly. Kunal clearly understands both design and storytelling."
    },
    {
      name: "Karan Malhotra",
      role: "Real Estate Marketing Manager",
      text: "Our marketing campaign benefited greatly from Kunal's visuals. The images looked polished and premium."
    },
    {
      name: "Priya Nair",
      role: "Interior Architect",
      text: "Kunal’s visualizations helped our clients visualize the project instantly. The lighting, materials, and mood were executed beautifully."
    },
    {
      name: "Aditya Singh",
      role: "Architect, Buildform Studio",
      text: "He brings architectural concepts to life with impressive realism. The walkthrough video was smooth, cinematic, and very engaging."
    },
    {
      name: "Michael Brown",
      role: "Property Developer",
      text: "The renders helped us present the project confidently to investors. The quality was comparable to top visualization studios."
    },
    {
      name: "Sneha Patel",
      role: "Landscape Architect",
      text: "Kunal did a fantastic job visualizing the interaction between architecture and landscape. The environment felt natural and immersive."
    },
    {
      name: "Vikram Desai",
      role: "Architectural Consultant",
      text: "Clear communication and strong creative understanding. Kunal quickly understood our design intent and translated it into stunning visuals."
    },
    {
      name: "Laura Bennett",
      role: "Interior Designer",
      text: "The render quality and camera composition were excellent. Every frame felt like a professional architectural photograph."
    },
    {
      name: "Rohit Gupta",
      role: "Real Estate Developer",
      text: "Working with Kunal was smooth from start to finish. The visuals added tremendous value to our design presentation."
    }
  ];

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    
    const scroll = () => {
      if (!isHovered) {
        scrollContainer.scrollLeft += 1;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section id="testimonials" className="py-[60px] bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Client Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-light text-white">Feedback from clients and collaborators.</h3>
        </motion.div>
      </div>

      <div 
        className="relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex w-max gap-6 px-6 pb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-6">
              {testimonials.map((testimonial, idx) => (
                <div 
                  key={`${i}-${idx}`} 
                  className="w-[300px] sm:w-[350px] md:w-[400px] shrink-0 bg-[#111] border border-neutral-800/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-neutral-700/50"
                >
                  <div>
                    <motion.div 
                      className="flex gap-1 mb-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-4 h-4 fill-[#ff3b3b] text-[#ff3b3b]" />
                      ))}
                    </motion.div>
                    <p className="text-neutral-300 text-lg font-light leading-relaxed mb-6 italic max-w-[65ch]">
                      "{testimonial.text}"
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-medium tracking-wide">{testimonial.name}</p>
                    <p className="text-neutral-500 text-sm mt-1">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = SERVICES;

  return (
    <section id="services" className="py-24 md:py-32 bg-neutral-950 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-light text-white">Services Offered</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group border border-neutral-900 hover:border-neutral-700 bg-[#0a0a0a] hover:bg-[#111] transition-all duration-500 overflow-hidden h-[320px]"
            >
              <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-1/2">
                <div className="p-10 h-[320px]">
                  <div className="text-neutral-500 group-hover:text-white transition-colors duration-500 mb-8">
                    {service.icon}
                  </div>
                  <h4 className="text-xl text-white mb-4">{service.title}</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="p-10 h-[320px]">
                  <div className="text-white mb-8">
                    {service.icon}
                  </div>
                  <h4 className="text-xl text-white mb-4">{service.title}</h4>
                  <p className="text-neutral-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const allProjects = projects;

const Portfolio = ({ onOpenModal }: { onOpenModal: (project: any) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(allProjects.length / projectsPerPage);

  const currentProjects = allProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#0d0d0d] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">ALL PROJECTS</h2>
            <h3 className="text-3xl md:text-5xl font-light text-white">Portfolio</h3>
          </div>
        </motion.div>
      </div>

      {!isExpanded ? (
        <div className="relative w-full flex overflow-hidden group">
          <div className="flex w-max animate-scroll-ltr hover-pause gap-6 px-3">
            {[...allProjects, ...allProjects].map((project, index) => (
              <div 
                key={`${project.id}-${index}`}
                className="w-[300px] md:w-[400px] lg:w-[500px] flex-shrink-0 cursor-pointer group/card"
                onClick={() => onOpenModal(project)}
              >
                <div className="relative overflow-hidden aspect-[4/3] rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                    <h4 className="text-lg md:text-xl text-white mb-1 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">{project.title}</h4>
                    <p className="text-xs md:text-sm text-neutral-400 tracking-wide transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 delay-75">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjects.map((project, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={project.id}
                className="w-full cursor-pointer group/card"
                onClick={() => onOpenModal(project)}
              >
                <div className="relative overflow-hidden aspect-[4/3] rounded-lg">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                    <h4 className="text-lg md:text-xl text-white mb-1 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">{project.title}</h4>
                    <p className="text-xs md:text-sm text-neutral-400 tracking-wide transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 delay-75">{project.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === idx + 1 
                      ? 'bg-white text-black' 
                      : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center mt-16">
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (isExpanded) {
              setCurrentPage(1);
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] group bg-neutral-800 hover:bg-transparent transition-colors duration-500"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0d0d0d_0%,#ffffff_50%,#0d0d0d_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white uppercase tracking-wide z-10">
            {isExpanded ? 'View Less' : 'View All'}
          </span>
        </button>
      </div>
    </section>
  );
};

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    emailjs.send(
      'service_013ye2n',
      'template_8jij2cw',
      {
        name: name,
        email: email,
        message: message,
        title: 'New Portfolio Inquiry'
      },
      'W0cQL0QKtMsz_4TTB'
    ).then(() => {
      setName('');
      setEmail('');
      setMessage('');
      setStatus('Message sent successfully!');
      setLoading(false);
    }).catch(() => {
      setStatus('Failed to send message. Please try again later.');
      setLoading(false);
    });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-neutral-950 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm tracking-widest uppercase text-neutral-500 mb-2">Get in touch</h2>
          <h3 className="text-3xl md:text-5xl font-light text-white mb-8">Let's discuss your next project.</h3>
          
          <div className="space-y-8 mt-12">
            <div>
              <p className="text-sm text-neutral-500 tracking-widest uppercase mb-2">Email</p>
              <a href="mailto:kunalguptajkm@gmail.com" className="text-xl text-white hover:text-neutral-300 transition-colors">kunalguptajkm@gmail.com</a>
            </div>
            <div>
              <p className="text-sm text-neutral-500 tracking-widest uppercase mb-2">Phone</p>
              <a href="tel:+918076583225" className="text-xl text-white hover:text-neutral-300 transition-colors">+91 8076583225</a>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-neutral-500 tracking-widest uppercase mb-4">Socials</p>
              <div className="flex space-x-6">
                <a href="https://www.linkedin.com/in/kunal-gupta-b61a75255/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://www.behance.net/kunalgupta31" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
                  <BehanceIcon className="w-6 h-6" />
                </a>
                <a href="https://www.youtube.com/@KreemStudios" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/kreemdesignstudio" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-[#0d0d0d] p-8 md:p-12 border border-neutral-900"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 focus:border-white text-white py-3 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 focus:border-white text-white py-3 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Message</label>
              <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-transparent border-b border-neutral-800 focus:border-white text-white py-3 outline-none transition-colors resize-none"></textarea>
            </div>
            <button disabled={loading} className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-4 text-sm tracking-widest uppercase font-medium mt-4 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SENDING...
                </>
              ) : (
                'Send Message'
              )}
            </button>
            {status && (
              <p className={`text-sm mt-4 text-center ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                {status}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section className="relative w-full bg-zinc-950 pt-24 pb-48 overflow-hidden flex justify-center z-0">
      <style>{`
        @keyframes staccatoFlicker {
          0%, 100% { opacity: 0.8; }
          3% { opacity: 0.2; }
          6% { opacity: 0.9; }
          7% { opacity: 0.1; }
          9% { opacity: 1; }
          10% { opacity: 0.8; }
          50% { opacity: 0.7; }
          52% { opacity: 0.3; }
          54% { opacity: 0.9; }
        }
        .animate-flicker { animation: staccatoFlicker 6s infinite; }
      `}</style>
      
      {/* Mountain Silhouette Floor */}
      <svg className="absolute bottom-0 w-full h-[150px] md:h-[220px] text-black drop-shadow-2xl z-0 pointer-events-none" viewBox="0 0 1440 200" preserveAspectRatio="none">
         <path fill="currentColor" d="M0,200 L0,100 Q360,180 720,120 T1440,150 L1440,200 Z"></path>
      </svg>

      {/* The Billboard Pillars (Legs) */}
      <div className="absolute top-1/2 bottom-12 left-0 w-full flex justify-between px-[25%] md:px-[35%] z-0 pointer-events-none">
        <div className="w-4 md:w-6 h-full bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 border-x border-black"></div>
        <div className="w-4 md:w-6 h-full bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-950 border-x border-black"></div>
      </div>

      {/* The Main Billboard Container */}
      <div className="relative z-10 w-full max-w-5xl mx-4 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.8)_10%,rgba(153,27,27,0.5)_45%,rgba(9,9,11,1)_85%)] border border-zinc-700 rounded-lg shadow-2xl flex flex-col md:flex-row items-center justify-between p-10 md:p-16">
        
        {/* The Wires */}
        <div className="absolute -bottom-10 left-0 w-full flex justify-between px-[10%] z-10">
          <div className="w-[2px] h-10 bg-zinc-600/50"></div>
          <div className="w-[2px] h-10 bg-zinc-600/50"></div>
          <div className="w-[2px] h-10 bg-zinc-600/50"></div>
        </div>

        {/* The Suspended Lighting Slab */}
        <div className="absolute -bottom-12 left-[-2.5%] w-[105%] h-3 bg-gradient-to-b from-zinc-800 to-black border border-white/10 rounded-full z-20">
          {/* The 5 Flickering, Blurred Spotlights */}
          <div className="absolute top-0 left-0 w-full flex justify-evenly px-4 pointer-events-none">
            <div className="relative flex justify-center">
              <div className="absolute top-[-6px] w-5 h-2 bg-white rounded-t-full shadow-[0_-5px_10px_rgba(255,255,255,1)]"></div>
              <div 
                className="absolute bottom-[4px] w-32 md:w-48 h-[140px] md:h-[180px] bg-gradient-to-t from-white/30 via-white/5 to-transparent blur-[12px] origin-bottom mix-blend-screen animate-flicker" 
                style={{ 
                  transform: 'perspective(200px) rotateX(-60deg)', 
                  transformOrigin: 'bottom',
                  animationDelay: '0s' 
                }}>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute top-[-6px] w-5 h-2 bg-white rounded-t-full shadow-[0_-5px_10px_rgba(255,255,255,1)]"></div>
              <div 
                className="absolute bottom-[4px] w-32 md:w-48 h-[140px] md:h-[180px] bg-gradient-to-t from-white/30 via-white/5 to-transparent blur-[12px] origin-bottom mix-blend-screen animate-flicker" 
                style={{ 
                  transform: 'perspective(200px) rotateX(-60deg)', 
                  transformOrigin: 'bottom',
                  animationDelay: '1.2s' 
                }}>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute top-[-6px] w-5 h-2 bg-white rounded-t-full shadow-[0_-5px_10px_rgba(255,255,255,1)]"></div>
              <div 
                className="absolute bottom-[4px] w-32 md:w-48 h-[140px] md:h-[180px] bg-gradient-to-t from-white/30 via-white/5 to-transparent blur-[12px] origin-bottom mix-blend-screen animate-flicker" 
                style={{ 
                  transform: 'perspective(200px) rotateX(-60deg)', 
                  transformOrigin: 'bottom',
                  animationDelay: '0.5s' 
                }}>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute top-[-6px] w-5 h-2 bg-white rounded-t-full shadow-[0_-5px_10px_rgba(255,255,255,1)]"></div>
              <div 
                className="absolute bottom-[4px] w-32 md:w-48 h-[140px] md:h-[180px] bg-gradient-to-t from-white/30 via-white/5 to-transparent blur-[12px] origin-bottom mix-blend-screen animate-flicker" 
                style={{ 
                  transform: 'perspective(200px) rotateX(-60deg)', 
                  transformOrigin: 'bottom',
                  animationDelay: '2s' 
                }}>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute top-[-6px] w-5 h-2 bg-white rounded-t-full shadow-[0_-5px_10px_rgba(255,255,255,1)]"></div>
              <div 
                className="absolute bottom-[4px] w-32 md:w-48 h-[140px] md:h-[180px] bg-gradient-to-t from-white/30 via-white/5 to-transparent blur-[12px] origin-bottom mix-blend-screen animate-flicker" 
                style={{ 
                  transform: 'perspective(200px) rotateX(-60deg)', 
                  transformOrigin: 'bottom',
                  animationDelay: '0.8s' 
                }}>
              </div>
            </div>
          </div>
        </div>

        {/* The Content */}
        <div className="relative z-30 w-full flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="text-3xl md:text-5xl font-bold max-w-2xl text-white [text-shadow:0_0_20px_rgba(255,255,255,0.4)]">
            READY TO BRING YOUR ARCHITECTURAL VISIONS TO LIFE?
          </h2>
          <a 
            href="#contact" 
            className="bg-zinc-950 border border-red-500 text-white hover:bg-red-500 transition-colors px-8 py-4 rounded-full font-medium tracking-wide whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,1)]"
          >
            START YOUR PROJECT
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-lg font-semibold tracking-widest uppercase text-white">Kunal Gupta</p>
          <p className="text-sm text-neutral-500 tracking-wide">3D Architectural Visualiser</p>
        </div>
        
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com/in/kunal-gupta-b61a75255/" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.behance.net/kunalgupta31" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
            <BehanceIcon className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@KreemStudios" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/kreemdesignstudio" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        
        <p className="text-sm text-neutral-600">
          © 2026 Kunal Gupta. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const hasGallery = project.gallery && project.gallery.length > 0;
  const images = hasGallery ? project.gallery : [project.image];
  const showControls = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl bg-neutral-950 overflow-hidden shadow-2xl flex flex-col max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className={`w-full relative shrink-0 ${project.youtubeSrc ? 'aspect-video' : 'aspect-video md:aspect-[21/9]'}`}>
          {project.youtubeSrc ? (
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src={project.youtubeSrc} 
              title={project.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {images[currentImageIndex].endsWith('.mp4') ? (
                  <motion.video
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex]}
                    className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={images[currentImageIndex]} 
                    alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                    className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                    onError={handleImageError}
                  />
                )}
              </AnimatePresence>
              
              {showControls && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-wrap justify-center gap-2 w-full px-4">
                    {images.map((_: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
        
        <div className="p-8 md:p-12 overflow-y-auto">
          {project.behanceLink ? (
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-light text-white mb-2">{project.title}</h3>
                <p className="text-neutral-400 tracking-widest uppercase text-sm mb-6">{project.category}</p>
                <div className="text-neutral-300 leading-relaxed max-w-3xl whitespace-pre-wrap">
                  {project.description || `This is a placeholder description for ${project.title}. In a complete implementation, this would contain detailed information about the project's scope, the challenges faced, the software used (e.g., 3ds Max, Corona Renderer, Unreal Engine), and the creative process behind achieving this specific architectural visualization.`}
                </div>
              </div>
              <div className="hidden md:block w-px bg-white/20 shrink-0"></div>
              <div className="md:hidden h-px w-full bg-white/20 shrink-0"></div>
              <div className="md:w-72 shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <BehanceIcon className="w-6 h-6 text-white" />
                  <h4 className="text-xl font-medium text-white">Behance</h4>
                </div>
                <a 
                  href={project.behanceLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white transition-colors leading-relaxed break-all underline underline-offset-4"
                >
                  {project.behanceLink}
                </a>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-2">{project.title}</h3>
              <p className="text-neutral-400 tracking-widest uppercase text-sm mb-6">{project.category}</p>
              <div className="text-neutral-300 leading-relaxed max-w-3xl whitespace-pre-wrap">
                {project.description || `This is a placeholder description for ${project.title}. In a complete implementation, this would contain detailed information about the project's scope, the challenges faced, the software used (e.g., 3ds Max, Corona Renderer, Unreal Engine), and the creative process behind achieving this specific architectural visualization.`}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Fake a 2-second server connection, then throw a secure error
    setTimeout(() => {
      setStatus('error');
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-neutral-800 p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Animated Top Red Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-70"></div>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-10 text-center mt-4">
          <div className="w-12 h-12 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-light text-white tracking-wide mb-1">System Access</h2>
          <p className="text-xs text-neutral-500 tracking-widest uppercase">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleFakeLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 pl-1">Admin ID</label>
            <input 
              type="text" 
              required
              placeholder="Enter clearance code" 
              className="w-full bg-[#111] border border-neutral-800 focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors text-sm placeholder:text-neutral-700" 
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2 pl-1">Passkey</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full bg-[#111] border border-neutral-800 focus:border-red-500 text-white px-4 py-3 rounded-lg outline-none transition-colors text-sm placeholder:text-neutral-700" 
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-3 rounded-lg text-sm tracking-widest uppercase font-medium mt-4 flex justify-center items-center disabled:opacity-70 disabled:bg-neutral-800 disabled:text-white"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Authenticating...
              </span>
            ) : 'Authenticate'}
          </button>

          {/* Fake Error Message */}
          <AnimatePresence>
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
              >
                <p className="text-red-500 text-xs tracking-widest uppercase font-medium">Access Denied: Invalid Credentials</p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ["ARCHITECTURAL VISUALIZER", "3D ARTIST"];

  // Main 5-second loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 1.5-second subtitle toggler
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
          >
            {/* Abstract Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-40"
              src="/Preloader.mp4"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>

            {/* Main Typography & Loading Line Wrapper */}
            <div className="relative z-10 flex flex-col items-center w-full">
              {/* Name Fade-In */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-white text-3xl md:text-5xl font-black tracking-[0.3em] uppercase mb-2 text-center"
              >
                KUNAL GUPTA
              </motion.h1>
              
              {/* Animated Subtitle Crossfade */}
              <div className="h-8 flex items-center justify-center mb-10 overflow-hidden relative w-full">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={titleIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-zinc-400 text-xs md:text-sm tracking-[0.4em] uppercase font-medium absolute text-center w-full"
                  >
                    {titles[titleIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Minimal Loading Line */}
              <div className="w-64 h-[2px] bg-zinc-800 overflow-hidden rounded-full">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-red-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
        <Navbar setShowLogin={setShowLogin} />
        <Hero />
        <About />
        <Experience />
        <Testimonials />
        <FeaturedWork onOpenModal={setSelectedProject} />
        <Portfolio onOpenModal={setSelectedProject} />
        <Services />
        <Contact />
        <CallToAction />
        <Footer />
        
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
        </AnimatePresence>
      </div>
    </>
  );
}
