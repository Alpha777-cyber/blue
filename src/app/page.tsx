'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronDown, Menu, X, Code, Briefcase, GraduationCap, Award, Sparkles, ArrowRight, ExternalLink, Star, Zap, Target, Terminal, Database, Cloud, Cpu, Globe, Rocket, Users, TrendingUp } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const fullText = "MUNEZERO Alpha";
  const roles = ["Full Stack Developer", "Software Engineer", "UI/UX Designer", "Tech Innovator"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
  }, []);

  // Typing animation for name
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Role typing animation
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    if (!isDeleting && displayedRole.length < currentRole.length) {
      const timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && displayedRole.length === currentRole.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedRole.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }
  }, [displayedRole, isDeleting, currentRoleIndex]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`;
        ctx.fill();

        // Move particles
        particle.y -= 0.5;
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [particles]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { name: 'JavaScript', level: 95, category: 'Frontend', icon: Code },
    { name: 'TypeScript', level: 90, category: 'Frontend', icon: Terminal },
    { name: 'React', level: 92, category: 'Frontend', icon: Globe },
    { name: 'Next.js', level: 88, category: 'Frontend', icon: Rocket },
    { name: 'Node.js', level: 85, category: 'Backend', icon: Cpu },
    { name: 'Python', level: 82, category: 'Backend', icon: Terminal },
    { name: 'AWS', level: 78, category: 'Cloud', icon: Cloud },
    { name: 'Docker', level: 80, category: 'Cloud', icon: Database },
    { name: 'MongoDB', level: 85, category: 'Database', icon: Database },
    { name: 'PostgreSQL', level: 83, category: 'Database', icon: Database }
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovation Labs',
      period: '2022 - Present',
      description: 'Leading development of cutting-edge enterprise applications and mentoring a team of talented developers.',
      achievements: [
        'Improved system performance by 45% through optimization',
        'Led team of 5 developers to deliver 3 major projects',
        'Reduced deployment time by 60% with CI/CD implementation',
        'Increased code quality by 40% with automated testing'
      ],
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Dynamics Inc',
      period: '2020 - 2022',
      description: 'Architected and built scalable web applications serving millions of users worldwide.',
      achievements: [
        'Built 3 major features with 99.9% uptime',
        'Optimized database queries reducing latency by 50%',
        'Implemented comprehensive CI/CD pipeline',
        'Mentored 3 junior developers'
      ],
      technologies: ['Next.js', 'Python', 'Docker', 'MongoDB']
    },
    {
      title: 'Frontend Developer',
      company: 'Creative Agency Pro',
      period: '2018 - 2020',
      description: 'Developed responsive web applications for Fortune 500 clients across various industries.',
      achievements: [
        'Delivered 15+ client projects with 100% satisfaction',
        'Improved page load speed by 50% through optimization',
        'Won Best Design Award for innovative UI solutions',
        'Increased user engagement by 35%'
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL']
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      link: '#',
      stars: 245
    },
    {
      title: 'AI Dashboard',
      description: 'Analytics dashboard with machine learning insights',
      tech: ['React', 'Python', 'TensorFlow', 'AWS'],
      link: '#',
      stars: 189
    },
    {
      title: 'Social Network',
      description: 'Real-time social platform with WebSocket connections',
      tech: ['TypeScript', 'Socket.io', 'MongoDB', 'Redis'],
      link: '#',
      stars: 156
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #0f172a 50%, #000000 100%)' }}
      />
      
      {/* Dynamic Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 50%)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-xl z-50 border-b border-blue-500/20 transition-all duration-300" 
           style={{ transform: scrollY > 50 ? 'translateY(0)' : 'translateY(0)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-blue-400 group ${
                    activeSection === item.id ? 'text-blue-400' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transform transition-transform duration-300 ${
                    activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-white/10 transition-all duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-blue-500/20">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:text-blue-400 hover:bg-white/10 ${
                    activeSection === item.id ? 'text-blue-400 bg-white/10' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm animate-pulse">
                <Zap className="w-4 h-4 mr-2" />
                Available for freelance work
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="text-gray-300">Hi, I'm</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
                <br />
                <span className="text-2xl md:text-3xl text-blue-400">
                  {displayedRole}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                Passionate about crafting exceptional digital experiences with cutting-edge technologies. 
                Transforming ideas into powerful, scalable solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get In Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('projects')}
                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
              >
                View Projects
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="relative group"
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 group-hover:border-blue-500 transition-all duration-300">
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-1 backdrop-blur-sm border border-blue-500/20">
                <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-blue-500/30">
                  <img 
                    src="https://z-cdn-media.chatglm.cn/files/47af10af-f394-40f2-8f79-276b18067b24_e.png?auth_key=1863399961-75efe986f6a04a2f99c32287a10c93fe-0-9125800032c39c245c265bed85b4031d"
                    alt="MUNEZERO Alpha"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-blue-400/50" size={24} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 relative z-10" ref={(el) => sectionRefs.current['about'] = el}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible['about'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                About MUNEZERO Alpha
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Crafting digital excellence with passion and precision
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Clean Architecture',
                description: 'Building scalable, maintainable systems with SOLID principles and best practices.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Target,
                title: 'Problem Solver',
                description: 'Transforming complex business challenges into elegant technical solutions.',
                gradient: 'from-blue-600 to-indigo-600'
              },
              {
                icon: TrendingUp,
                title: 'Innovation Driven',
                description: 'Continuously exploring cutting-edge technologies and modern development practices.',
                gradient: 'from-cyan-500 to-blue-500'
              }
            ].map((item, index) => (
              <Card 
                key={index} 
                className={`group relative bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105 ${
                  isVisible['about'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`} />
                <CardContent className="p-8 text-center relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5`}>
                    <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10" ref={(el) => sectionRefs.current['projects'] = el}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible['projects'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Showcasing innovation and technical excellence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className={`group relative bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105 ${
                  isVisible['projects'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <Rocket className="w-8 h-8 text-blue-400" />
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-gray-400 text-sm">{project.stars}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <a 
                    href={project.link}
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group/link"
                  >
                    View Project
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative z-10" ref={(el) => sectionRefs.current['skills'] = el}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible['skills'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Technical Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Mastering the full stack development spectrum
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {['Frontend', 'Backend', 'Cloud', 'Database'].map((category, catIndex) => (
              <div 
                key={category} 
                className={`bg-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 ${
                  isVisible['skills'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${catIndex * 150}ms` }}
              >
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${
                    category === 'Frontend' ? 'from-blue-500 to-cyan-500' :
                    category === 'Backend' ? 'from-green-500 to-emerald-500' :
                    category === 'Cloud' ? 'from-purple-500 to-pink-500' :
                    'from-orange-500 to-red-500'
                  }`} />
                  {category}
                </h3>
                <div className="space-y-4">
                  {skills.filter(skill => skill.category === category).map((skill, skillIndex) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          {skill.icon && <skill.icon className="w-4 h-4 text-blue-400" />}
                          <span className="text-gray-300 font-medium group-hover:text-blue-400 transition-colors duration-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform transition-all duration-1000 ease-out group-hover:shadow-lg group-hover:shadow-blue-500/50"
                          style={{ 
                            width: isVisible['skills'] ? `${skill.level}%` : '0%',
                            transitionDelay: `${catIndex * 150 + skillIndex * 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative z-10" ref={(el) => sectionRefs.current['experience'] = el}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible['experience'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A track record of excellence and innovation
            </p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className={`group relative bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm ${
                  isVisible['experience'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                    <div className="mb-4 lg:mb-0">
                      <div className="flex items-center mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        <h3 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {exp.title}
                        </h3>
                      </div>
                      <p className="text-blue-400 font-medium text-lg mb-1">{exp.company}</p>
                      <p className="text-gray-500 text-sm">{exp.period}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="text-gray-400 text-sm">Key Achievements</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-3 bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10" ref={(el) => sectionRefs.current['contact'] = el}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible['contact'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`space-y-8 transition-all duration-1000 transform ${
              isVisible['contact'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  I'm always excited to work on new projects and collaborate with innovative teams. 
                  Whether you have a specific project in mind or just want to chat about technology, 
                  feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'munezero.alpha@example.com', href: 'mailto:munezero.alpha@example.com' },
                  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
                  { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' }
                ].map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="group flex items-center space-x-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{contact.label}</p>
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors duration-300">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <Card className={`bg-gray-900/50 border border-gray-800 backdrop-blur-sm transition-all duration-1000 transform ${
              isVisible['contact'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="Project Discussion"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 resize-none text-white placeholder-gray-500"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Send Message
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 bg-black/50 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">
                © 2024 MUNEZERO Alpha. Crafted with passion and precision.
              </span>
            </div>
            
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                Terms of Service
              </a>
              <div className="flex items-center space-x-4">
                {[
                  { icon: Github, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Twitter, href: '#' }
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}