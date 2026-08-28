import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Code2, 
  Briefcase, 
  FileBadge, 
  Mail, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Flame, 
  Layers, 
  Laptop, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Menu,
  X,
  QrCode,
  MapPin
} from 'lucide-react';
import ContactForm from './components/ContactForm';
import InteractiveQRCode from './components/InteractiveQRCode';
import { Project, Certification } from './types';

import avatarImg from "./assets/jo's picture.jpeg";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'skills' | 'projects' | 'experience' | 'contact'>('home');
  const [showQRPlayground, setShowQRPlayground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic Background States - loaded from localStorage to keep current theme active
  const [backgroundImage] = useState<string>(() => {
    return localStorage.getItem('app-bg-image') || '';
  });
  const [bgOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('app-bg-opacity');
    return saved ? parseFloat(saved) : 0.15;
  });
  const [bgBlur] = useState<number>(() => {
    const saved = localStorage.getItem('app-bg-blur');
    return saved ? parseInt(saved, 10) : 0;
  });

  const navigateToPage = (page: 'home' | 'skills' | 'projects' | 'experience' | 'contact') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Projects data
  const projects: Project[] = [
    {
      id: 'kamesh-art-academy',
      title: 'Kamesh Art Academy – Full-Stack Web Application',
      description: 'Built and deployed a full-stack web application for an art academy with authentication, role-based admin access, artwork management, and database integration.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Database', 'Git', 'GitHub', 'AI-Assisted Development'],
      highlights: [
        'Built and deployed a full-stack website with authentication, role-based admin access, artwork management, and database integration.',
        'Tested important user flows, authentication, access control, UI functionality, and deployment behavior.',
        'Integrated responsive user interface with robust database management and Git version tracking.'
      ],
      githubUrl: 'https://github.com/jophotohub',
      demoUrl: 'https://kamesh-art-academy.onrender.com/',
      interactive: false
    },
    {
      id: 'skillsphere',
      title: 'SkillSphere – AI-Powered Career Guidance & Skill Development Platform',
      description: 'Developed a platform that helps students create profiles, identify skill gaps, explore career paths, receive learning recommendations, and track their progress.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'SQL/Database', 'Git', 'GitHub', 'AI-Assisted Development'],
      highlights: [
        'Implemented student profile management, skill-gap identification, and personalized learning recommendations.',
        'Integrated career exploration engine and progress tracking workflows.',
        'Built responsive UI with seamless frontend and backend database functionality.'
      ],
      githubUrl: 'https://github.com/jophotohub',
      demoUrl: 'https://skillsphere-hpku.onrender.com/',
      interactive: false
    },
    {
      id: 'qrcode-generator',
      title: 'QR Code Generator',
      description: 'Built a responsive web application that generates QR codes from user-provided input.',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      highlights: [
        'User input handling',
        'QR code generation',
        'Responsive design',
        'Simple and user-friendly interface'
      ],
      githubUrl: 'https://github.com/jophotohub',
      interactive: true
    }
  ];

  // Certifications data
  const certifications: Certification[] = [
    {
      title: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      year: '2026',
    },
    {
      title: 'AI Tools for Jobs – Skill Training Program',
      issuer: 'FIIT Formacion Pvt. Ltd.',
      year: '2026',
    },
    {
      title: 'Fundamentals of Computer Networking',
      issuer: 'Microsoft Learn',
      year: '2026',
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative flex flex-col justify-between">
      
      {/* Dynamic Background Image Layer */}
      {backgroundImage && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 transition-all duration-500 ease-in-out"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: bgOpacity,
            filter: `blur(${bgBlur}px)`,
          }}
        />
      )}

      {/* Premium Ambient Glowing Blobs */}
      <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[5%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-[5%] w-[550px] h-[550px] bg-cyan-600/5 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Persistent Navigation Header */}
      <header id="main-navigation" className="sticky top-0 z-40 w-full bg-[#030712]/85 backdrop-blur-md border-b border-slate-800/80 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Monogram */}
          <div 
            onClick={() => navigateToPage('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8.5 h-8.5 rounded-full border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm text-blue-400 bg-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
              J
            </div>
            <span className="font-sans font-extrabold text-sm tracking-wider text-white group-hover:text-blue-400 transition-colors">
              JOTHIRANJAN U.
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-full px-1.5 py-1">
            {[
              { id: 'home', label: 'HOME' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'projects', label: 'PROJECTS' },
              { id: 'experience', label: 'EXPERIENCE' },
              { id: 'contact', label: 'CONTACT' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => navigateToPage(link.id as any)}
                className={`relative px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider transition-all cursor-pointer ${
                  currentPage === link.id 
                    ? 'text-white bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigateToPage('contact')}
              className="text-[11px] font-mono font-bold tracking-wider px-4 py-2 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-600/10 hover:border-blue-500 transition-all cursor-pointer"
            >
              HIRE ME
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-slate-800 bg-[#030712]/95 backdrop-blur-lg px-6 py-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2 font-mono text-xs tracking-widest text-center">
                {[
                  { id: 'home', label: 'HOME & ABOUT' },
                  { id: 'skills', label: 'SKILLS & TECH' },
                  { id: 'projects', label: 'FEATURED PROJECTS' },
                  { id: 'experience', label: 'EXPERIENCE' },
                  { id: 'contact', label: 'CONTACT' }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => navigateToPage(link.id as any)}
                    className={`py-2 rounded-lg transition-all ${
                      currentPage === link.id
                        ? 'text-blue-400 bg-blue-600/10 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex-grow w-full">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE (Hero + About Me) */}
          {currentPage === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Hero Main Card (Span 7) - Left Corner Profile Photo Integrated */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-6">
                    {/* Aligned Avatar & Name Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      {/* Integrated Profile Photo near Name */}
                      <div className="relative p-0.5 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full shadow-xl flex-shrink-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[3.5px] border-slate-950 bg-slate-900">
                          <img
                            src={avatarImg}
                            alt="Jothiranjan U. Profile Photo"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {/* Active Pulse indicator */}
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse" />
                      </div>

                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full text-[11px] font-mono text-blue-400 tracking-wider uppercase">
                          <Flame className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                          Web Developer | Full Stack Development | Software Testing
                        </div>
                        
                        <div className="space-y-1">
                          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight leading-[1.15]">
                            Hi, I'm <span className="text-blue-400 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Jothiranjan U.</span>
                          </h1>
                          <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wider">
                            Final-Year BCA Student @ National College, Trichy
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 max-w-xl font-sans leading-relaxed pt-2">
                      "Eager to learn. Passionate to build. Ready to grow." <br />
                      I am a final-year Bachelor of Computer Applications (BCA) student building websites and full-stack web applications with HTML, CSS, JavaScript, Bootstrap, Node.js, and databases. Actively developing my skills in software testing, user-flow verification, and quality assurance to deliver robust, production-ready software.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-8">
                    <button
                      onClick={() => navigateToPage('projects')}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-md shadow-blue-950/20"
                    >
                      <Code2 className="w-4 h-4" />
                      View My Work
                    </button>
                    <button
                      onClick={() => navigateToPage('contact')}
                      className="px-5 py-2.5 bg-slate-800/50 border border-slate-700 text-white font-sans font-bold text-xs rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Mail className="w-4 h-4 text-slate-400" />
                      Contact Me
                    </button>
                  </div>
                </div>

                {/* Developer Highlights Card (Span 5) */}
                <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-5">
                    <h3 className="text-sm font-mono text-blue-400 tracking-wider uppercase">Focus & Status</h3>
                    
                    <div className="space-y-4">
                      {/* Academic Background */}
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 bg-blue-600/10 border border-blue-500/20 rounded-xl text-blue-400">
                          <Laptop className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-mono">Education</p>
                          <h4 className="text-sm font-sans font-bold text-white mt-0.5">BCA (Final Year)</h4>
                          <p className="text-xs text-slate-400 mt-0.5">National College, Trichy (Grad 2027)</p>
                        </div>
                      </div>

                      {/* Current Geolocation */}
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 bg-rose-600/10 border border-rose-500/20 rounded-xl text-rose-400">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-mono">Location</p>
                          <h4 className="text-sm font-sans font-bold text-white mt-0.5">Trichy, Tamil Nadu</h4>
                          <p className="text-xs text-slate-400 mt-0.5">India (IST Timezone)</p>
                        </div>
                      </div>

                      {/* Availability Status */}
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 bg-emerald-600/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-mono">Status</p>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mt-1 animate-pulse">
                            Open for Opportunities
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Micro Stats Row */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 text-center mt-4">
                    <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50">
                      <span className="block text-xs font-bold text-blue-400">BCA</span>
                      <span className="block text-[8px] text-slate-500 uppercase mt-0.5">Final Year</span>
                    </div>
                    <div className="bg-slate-950/40 p-2.5 border border-slate-800/50 rounded-xl">
                      <span className="block text-xs font-bold text-blue-400">3 Live</span>
                      <span className="block text-[8px] text-slate-500 uppercase mt-0.5">Projects</span>
                    </div>
                    <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50">
                      <span className="block text-xs font-bold text-blue-400">SIH</span>
                      <span className="block text-[8px] text-slate-500 uppercase mt-0.5">Participant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Me Section integrated into Home View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center gap-2 text-blue-400">
                      <User className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">About Me</span>
                    </div>
                    <h3 className="text-2xl font-sans font-bold text-white tracking-tight">My Professional Journey</h3>
                    <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-sans">
                      <p>
                        I am a final-year Bachelor of Computer Applications (BCA) student at <strong className="text-white font-semibold">National College, Trichy</strong> (Expected Graduation: 2027), passionate about Web Development, Full Stack Development, and Software Testing.
                      </p>
                      <p>
                        I have hands-on experience building responsive websites and full-stack web applications using <strong className="text-blue-400 font-semibold">HTML, CSS, JavaScript, Bootstrap</strong>, and AI-assisted development tools. I also have basic knowledge of <strong className="text-blue-400 font-semibold">Node.js, Express.js, SQL, and Java</strong>, utilizing Git and GitHub for version control and source code management. Additionally, I can build and customize websites using Wix.
                      </p>
                      <p>
                        I am actively developing my skills in <strong className="text-blue-400 font-semibold">Software Testing</strong>, including manual testing, functional testing, UI testing, user-flow testing, authentication testing, access-control testing, bug identification, debugging, and quality assurance fundamentals.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 md:pl-8 min-w-[240px]">
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500">Academic Background</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-bold text-white">Bachelor of Computer Applications (BCA)</p>
                          <p className="text-[11px] font-mono text-slate-400">National College, Trichy</p>
                          <p className="text-[10px] text-blue-400 font-mono mt-0.5">Final Year (Graduation: 2027)</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Career Interests</p>
                          <p className="text-[11px] font-mono text-slate-400">Web Dev, Full Stack Dev, Software Testing, QA</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Languages</p>
                          <p className="text-[11px] font-mono text-slate-400">Tamil, English</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => navigateToPage('skills')}
                        className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors group cursor-pointer"
                      >
                        Explore My Technical Stack 
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SKILLS PAGE (Tech Stack, Hackathons, Credentials) */}
          {currentPage === 'skills' && (
            <motion.div
              key="skills-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">01 / CAPABILITIES</span>
                <h2 className="text-3xl font-sans font-bold text-white tracking-tight">Skills &amp; Credentials</h2>
                <p className="text-xs font-sans text-slate-400 max-w-md">
                  A curated breakdown of my technical stack, software testing competencies, and verified certifications.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Tech Stack Card (Span 7) */}
                <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Laptop className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase tracking-widest font-semibold">Technical Skills</span>
                      </div>
                      <span className="text-[10px] bg-blue-600/20 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-mono">Core Competencies</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Frontend */}
                      <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl space-y-3">
                        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Frontend</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Web Design'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Backend & Database */}
                      <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl space-y-3">
                        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Backend &amp; Database</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {['Node.js (Basic)', 'Express.js (Basic)', 'SQL (Basic)', 'Database Integration'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-blue-950/40 px-2 py-1 rounded text-blue-300 border border-blue-900/40">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Programming */}
                      <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl space-y-3">
                        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Programming</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {['JavaScript', 'Java (Basic)'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Software Testing */}
                      <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl space-y-3">
                        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Software Testing</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Manual Testing', 
                            'Functional Testing', 
                            'UI Testing', 
                            'User Flow Testing', 
                            'Authentication Testing', 
                            'Access Control Testing', 
                            'Bug Identification', 
                            'Debugging', 
                            'QA Fundamentals'
                          ].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-emerald-950/40 px-2 py-1 rounded text-emerald-300 border border-emerald-900/40">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Deployment */}
                      <div className="p-4 bg-slate-800/30 border border-slate-800 rounded-2xl space-y-3 sm:col-span-2">
                        <h4 className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Tools &amp; Deployment</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {['Git', 'GitHub', 'Visual Studio Code', 'Wix', 'Render', 'Vercel', 'Version Control'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-300 border border-slate-700/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Practices &amp; Strengths</span>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[11px] bg-slate-800/40 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">AI-Assisted Web Development</span>
                      <span className="text-[11px] bg-slate-800/40 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">AI-Assisted Application Development</span>
                      <span className="text-[11px] bg-slate-800/40 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">Adaptive Learner</span>
                      <span className="text-[11px] bg-slate-800/40 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">Team Collaborator</span>
                      <span className="text-[11px] bg-slate-800/40 text-slate-300 px-3 py-1 rounded-xl border border-slate-800">Problem Solver</span>
                    </div>
                  </div>
                </div>

                {/* Credentials & Certifications (Span 5) */}
                <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Credentials</span>
                    </div>
                    <h3 className="text-xl font-sans font-bold text-white tracking-tight">Certifications</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Verified credentials completing modern Artificial Intelligence, AI tools, and networking foundations.
                    </p>
                  </div>

                  <div className="space-y-3 mt-6 pt-4 border-t border-slate-800/80">
                    {certifications.map((cert, i) => (
                      <div key={i} className="p-3 bg-slate-850/50 border border-slate-800 rounded-xl flex items-center gap-3 hover:border-blue-500/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/20 flex-shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-mono text-slate-500 uppercase truncate">{cert.issuer} • {cert.year}</p>
                          <h4 className="text-xs font-sans font-bold text-white truncate">{cert.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Hackathons Detail Row inside Skills Page */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Award className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Achievement</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xl font-sans font-bold text-white tracking-tight">Smart India Hackathon</h3>
                      <span className="text-[10px] uppercase font-mono bg-blue-600/20 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/20 self-start sm:self-center">
                        Participant
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      Participated in a team project and contributed to application development, UI-related work, testing, debugging, and identifying functional or visual issues.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/80">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">My Primary Role</span>
                      <p className="text-xs font-semibold text-white">Application Development &amp; UI Testing</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Key Contribution</span>
                      <p className="text-xs font-semibold text-white">Team Project, Testing &amp; Functional Issue Identification</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* PROJECTS PAGE (Featured Projects) */}
          {currentPage === 'projects' && (
            <motion.div
              key="projects-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">02 / PORTFOLIO</span>
                <h2 className="text-3xl font-sans font-bold text-white tracking-tight">Featured Projects</h2>
                <p className="text-xs font-sans text-slate-400 max-w-md">
                  Live deployed web applications and platforms demonstrating full-stack engineering and software testing.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 p-8 rounded-3xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                          {project.interactive ? 'Interactive Web App' : 'Full-Stack Application'}
                        </span>
                        <div className="flex flex-wrap gap-1.5 justify-end">
                          {project.techStack.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-[9px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700/50">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl font-sans font-extrabold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <p className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">Key Features</p>
                        <ul className="space-y-1.5">
                          {project.highlights.map((highlight, index) => (
                            <li key={index} className="text-xs text-slate-300 flex items-start gap-2 font-sans">
                              <span className="text-blue-400 text-xs mt-0.5">•</span>
                              <span className="flex-1 leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-800/85 flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-800/50 border border-slate-700 hover:bg-slate-800 rounded-xl text-xs font-sans font-semibold text-white cursor-pointer transition-all flex-1"
                          >
                            <Github className="w-3.5 h-3.5 text-slate-400" />
                            GitHub
                          </a>
                        )}
                        
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-500 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all flex-1 shadow-md shadow-blue-950/20"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                            Live Project
                          </a>
                        )}

                        {project.interactive && (
                          <button
                            type="button"
                            onClick={() => setShowQRPlayground(!showQRPlayground)}
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-500 rounded-xl text-xs font-sans font-bold cursor-pointer transition-all flex-1 shadow-md shadow-blue-950/20"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                            {showQRPlayground ? 'Hide Demo' : 'Live Demo'}
                          </button>
                        )}
                      </div>

                      {project.interactive && (
                        <AnimatePresence>
                          {showQRPlayground && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-2"
                            >
                              <div className="pt-2 flex justify-center">
                                <InteractiveQRCode onClose={() => setShowQRPlayground(false)} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* EXPERIENCE PAGE (Hackathons + Certifications) */}
          {currentPage === 'experience' && (
            <motion.div
              key="experience-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">03 / INITIATIVES</span>
                <h2 className="text-3xl font-sans font-bold text-white tracking-tight">Experience &amp; Milestones</h2>
                <p className="text-xs font-sans text-slate-400 max-w-md">
                  Practical development sprints, hackathon participation, and verified certifications.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Smart India Hackathon Box (Span 8) */}
                <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Award className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Hackathons</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xl font-sans font-bold text-white tracking-tight">Smart India Hackathon</h3>
                      <span className="text-[10px] uppercase font-mono bg-blue-600/20 text-blue-400 px-2.5 py-0.5 rounded border border-blue-500/20 self-start sm:self-center">
                        Participant
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                      Participated in a team project and contributed to application development, UI-related work, testing, debugging, and identifying functional or visual issues.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-800/80">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">My Primary Role</span>
                      <p className="text-xs font-semibold text-white">Application Development &amp; UI Testing</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">Main Contribution</span>
                      <p className="text-xs font-semibold text-white">Development, UI Testing &amp; Issue Identification</p>
                    </div>
                  </div>
                </div>

                {/* Certifications (Span 4) */}
                <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase tracking-widest font-semibold">Credentials</span>
                    </div>
                    <h3 className="text-xl font-sans font-bold text-white tracking-tight">Certifications</h3>
                  </div>

                  <div className="space-y-3 mt-6 pt-4 border-t border-slate-800/80">
                    {certifications.map((cert, i) => (
                      <div key={i} className="p-3 bg-slate-850/50 border border-slate-800 rounded-xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/20 flex-shrink-0">
                          <Award className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] font-mono text-slate-500 uppercase truncate">{cert.issuer} • {cert.year}</p>
                          <h4 className="text-xs font-sans font-bold text-white truncate">{cert.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* CONTACT PAGE (SMTP Contact form) */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">04 / CORRESPONDENCE</span>
                <h2 className="text-3xl font-sans font-bold text-white tracking-tight">Get In Touch</h2>
                <p className="text-xs font-sans text-slate-400 max-w-md">
                  Drop a direct line via the secure SMTP email handler.
                </p>
              </div>

              <div className="w-full">
                <ContactForm />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Mini Footnote */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-xs font-mono text-slate-500 w-full mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Jothiranjan U. All rights reserved.</p>
          <p className="text-[10px]">National College, Trichy • BCA Final Year (Graduation: 2027)</p>
        </div>
      </footer>

    </div>
  );
}
