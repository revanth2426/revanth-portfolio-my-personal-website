import React, { useState, useEffect, useRef } from 'react';

// Typewriter Effect Component for the main title
const TypewriterEffect = ({ text, delay, className = '' }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span className={className}>{currentText}</span>;
};

// Section Observer Component for fade-in effect on scroll
const SectionObserver = ({ children, id, className = '' }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Observe once
        }
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      // Apply transition for opacity and transform (for subtle slide-up)
      className={`relative bg-gray-800 p-6 md:p-10 rounded-2xl shadow-xl mb-12 transition-all duration-1000 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </section>
  );
};

// Main App component
const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education & Certifications', id: 'education' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-inter text-gray-100 antialiased">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        /* Custom scrollbar for a sleek look */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #333;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #60a5fa; /* blue-400 */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b82f6; /* blue-500 */
        }

        /* Keyframe for gradient shift animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }

        /* Keyframe for fade-in-up animation */
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Sticky Navigation Bar */}
      <nav className="bg-gray-900 shadow-lg py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo/Name (Visible on all screens) */}
          <a href="#hero" className="text-xl sm:text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300">
            Revanth D.
          </a>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 transition-colors duration-300"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-wrap gap-x-6 gap-y-2 text-lg font-medium">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 px-3 py-1 rounded-md"
                onClick={closeMenu} // Close menu if it was open (though hidden on desktop)
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMenu} // Close menu when clicking outside
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 shadow-lg z-50 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-6">
          <button
            onClick={closeMenu}
            className="text-gray-300 hover:text-blue-400 focus:outline-none absolute top-4 right-4 p-2 rounded-md"
            aria-label="Close navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="mt-12 space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block text-gray-200 hover:text-blue-400 text-xl font-medium py-2 transition-colors duration-300"
                  onClick={closeMenu} // Close menu when a link is clicked
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        {/* Background Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        {/* Particle/Gradient Background (simplified for code, could be more complex with JS) */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-blue-900 animate-gradient-shift z-0"></div>

        <div className="relative z-20 p-6 md:p-8 max-w-full lg:max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg">
            <TypewriterEffect text="REVANTH NAIK DESAVATH" delay={70} />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-blue-300 mb-8 animate-fade-in-up delay-500">
            JAVA/SAILPOINT DEVELOPER | Cybersecurity Enthusiast
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-base sm:text-lg"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="bg-transparent border-2 border-blue-500 hover:bg-blue-500 text-blue-300 hover:text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out text-base sm:text-lg"
            >
              Get in Touch
            </a>
          </div>
          <div className="mt-10 flex justify-center space-x-6 text-2xl sm:text-3xl">
            <a href="https://www.linkedin.com/in/revanth2426" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              {/* LinkedIn Icon (Lucide React or FontAwesome would be used in a real project, using SVG for self-containment) */}
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin inline-block align-middle"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://github.com/revanth2426" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              {/* GitHub Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github inline-block align-middle"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.5 0 4.1-1.7 4.1-3.6 0-.9-.2-1.8-.7-2.4 1.1-.7 1.1-2.2 0-3.2-.7-1-2.7-1.3-3.9-.3 0-.7-.2-1.3-.5-1.9-1.3-.2-2.7-.2-4 0-.3.6-.5 1.2-.5 1.9-1.2-1-3.2-.7-3.9.3-.5.6-.7 1.5-.7 2.4 0 1.9.6 3.6 4.1 3.6a4.8 4.8 0 0 0-1 3.2v4"/></svg>
            </a>
            <a href="mailto:naikrevanth001@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
              {/* Email Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail inline-block align-middle"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="container mx-auto px-4 py-8 md:py-12"> {/* Added responsive padding */}

        {/* About Me Section */}
        <SectionObserver id="about">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-3">ABOUT ME</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0 mb-6 md:mb-0">
              {/* Placeholder for your image */}
              <img
                src="https://placehold.co/200x200/2563eb/ffffff?text=Your+Photo"
                alt="Revanth Naik Desavath"
                className="rounded-full w-40 h-40 sm:w-48 sm:h-48 object-cover shadow-lg border-4 border-blue-500 mx-auto"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/200x200/2563eb/ffffff?text=Image+Error"; }}
              />
            </div>
            <div className="text-base sm:text-lg leading-relaxed text-gray-200 text-center md:text-left">
              <p className="mb-4">
                Highly motivated and passionate software engineer with 1.8+ years of experience in SailPoint IdentityIQ.
                I thrive in innovative and collaborative work environments, always striving for growth and achievement.
              </p>
              <p className="mb-4">
                With a strong commitment to continuous improvement, I am dedicated to doing things the right way,
                learning from others, and consistently putting in effort to enhance both my work and my approach to working with people.
              </p>
              <p>
                My expertise spans Java, SailPoint IIQ, Python, and machine learning, enabling me to tackle complex problems
                and deliver robust solutions in identity and access management, as well as data-driven fraud and flood detection.
              </p>
              {/* You can add a CV download link here if you have one hosted */}
              {/* <a href="/path/to/your/cv.pdf" download className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all duration-300">
                Download CV
              </a> */}
            </div>
          </div>
        </SectionObserver>

        {/* Skills Section */}
        <SectionObserver id="skills">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-3">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3 flex items-center">
                {/* Icon for Languages */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                Languages & Frameworks
              </h3>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 text-gray-200">
                <li>SailPoint IdentityIQ (IIQ)</li>
                <li>Java, Bean Shell Scripting</li>
                <li>Python Programming Language</li>
                <li>MySQL</li>
                <li>HTML/CSS</li>
                <li>API Development & Testing</li>
                <li>PowerShell, Postman</li>
                <li>Apache Tomcat Server</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3 flex items-center">
                {/* Icon for Tools */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011-1V4z"/></svg>
                Tools/Applications
              </h3>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 text-gray-200">
                <li>Eclipse IDE</li>
                <li>Edit Plus</li>
                <li>Visual Studio Code</li>
                <li>Jupyter Notebook</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3 flex items-center">
                {/* Icon for Strengths */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Strengths
              </h3>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 text-gray-200">
                <li>Adaptability</li>
                <li>Team Player</li>
                <li>Organizational Skills</li>
                <li>Strong Work Ethic</li>
                <li>Attention to Detail</li>
                <li>Continuous Learner</li>
              </ul>
            </div>
          </div>
        </SectionObserver>

        {/* Experience Section */}
        <SectionObserver id="experience">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-3">EXPERIENCE</h2>
          <div className="relative border-l-4 border-blue-500 pl-6 sm:pl-8 space-y-8">
            {/* Experience Item 1 */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-8 top-1 transform -translate-x-1/2"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">ZENZZ SOLUTIONS PVT LTD | SECURITY CONSULTANT - Remote</h3>
              <p className="text-gray-400 text-sm sm:text-md mb-3">October 2023 - Present</p>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 text-gray-200">
                <li>Led the version upgrade of SailPoint IIQ from v8.2 to v8.4p2.</li>
                <li>Developed custom REST connectors, overcoming limitations of the OOTB Web Services connector.</li>
                <li>Implemented complex provisioning workflows, lifecycle events, automated email notifications using Bean Shell, enabling streamlined identity lifecycle management.</li>
                <li>Designed and deployed Before/After provisioning rules tailored for JDBC and REST APIs to handle specific attribute transformations and provisioning flows.</li>
                <li>Onboarded multiple enterprise applications using OOTB connectors enhanced with custom rule logic, reducing access delays and provisioning errors.</li>
                <li>Automated role-based access control (RBAC) provisioning for new hires based on department, location, and job, decreasing onboarding time by approximately 40%.</li>
                <li>Conducted UAT testing, defect resolution, and performance tuning, resulting in more stable production deployments and faster access processing.</li>
                <li>Authored detailed technical designs, process flows, and implementation documentation on Confluence, which improved internal team onboarding and collaboration efficiency by -40%.</li>
                <li>Organized and delivered training sessions (roadshows) to business users and clients, increasing awareness and adoption of SailPoint features.</li>
                <li>Optimized aggregation logic by refactoring inefficient code blocks and tuning data-fetch strategies, leading to a -35% improvement in job completion times.</li>
              </ul>
            </div>
          </div>
        </SectionObserver>

        {/* Projects Section */}
        <SectionObserver id="projects">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-3">PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Project 1: Fraud Detection */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-2">FRAUD DETECTION USING MACHINE LEARNING</h3>
              <p className="text-gray-400 text-sm sm:text-md mb-3">Undergraduate Major Project | Apr 2023 - May 2023</p>
              <p className="text-base sm:text-lg mb-4 text-gray-200 flex-grow">
                This project aims to use machine learning techniques to identify and prevent fraudulent credit card transactions,
                protecting customers from unauthorized usage of their accounts.
              </p>
              <ul className="list-disc list-inside text-sm sm:text-md space-y-1 text-gray-300 mt-auto">
                <li>Implemented K-Nearest Neighbors (KNN), Support Vector Machine (SVM), and Logistic Regression to analyze a dataset of credit card transactions, identifying fraudulent activities with 95% accuracy.</li>
                <li>Enhanced fraud detection capabilities, improving prediction accuracy and ensuring the security of customers' financial transactions.</li>
                <li><span className="font-semibold text-blue-200">Technologies:</span> Python, Scikit-learn, Pandas, Matplotlib</li>
                <li><span className="font-semibold text-blue-200">Tools:</span> Jupyter Notebook</li>
              </ul>
            </div>

            {/* Project 2: Flood Detection */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-2">FLOOD DETECTION USING MACHINE LEARNING</h3>
              <p className="text-gray-400 text-sm sm:text-md mb-3">Undergraduate Minor Project | Nov 2023 - Dec 2023</p>
              <p className="text-base sm:text-lg mb-4 text-gray-200 flex-grow">
                Designed a flood prediction model using Linear Regression, improving risk assessment accuracy by 80%.
              </p>
              <ul className="list-disc list-inside text-sm sm:text-md space-y-1 text-gray-300 mt-auto">
                <li>Analyzed and compared prediction performance to identify the most promising flood detection methods.</li>
                <li><span className="font-semibold text-blue-200">Technologies:</span> Python, Scikit-learn, Pandas, Matplotlib</li>
                <li><span className="font-semibold text-blue-200">Tools:</span> Jupyter Notebook</li>
              </ul>
            </div>
          </div>
        </SectionObserver>

        {/* Education & Certifications Section */}
        <SectionObserver id="education">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-3">EDUCATION & CERTIFICATIONS</h2>
          <div className="relative border-l-4 border-blue-500 pl-6 sm:pl-8 space-y-8">
            {/* Education Item 1 */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-8 top-1 transform -translate-x-1/2"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">GURUKUL KANGRI UNIVERSITY</h3>
              <p className="text-gray-300 text-base sm:text-lg">BACHELOR OF TECHNOLOGY (BTech) - Computer Science Engineering</p>
              <p className="text-gray-400 text-sm sm:text-md">2019-2023 | CGPA: 8.4/10 | Haridwar, UK, IN</p>
            </div>
            {/* Education Item 2 */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-8 top-1 transform -translate-x-1/2"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">MASTERS JUNIOR COLLEGE</h3>
              <p className="text-gray-300 text-base sm:text-lg">INTERMEDIATE, MPC</p>
              <p className="text-gray-400 text-sm sm:text-md">2017-2019 | CGPA: 9.88/10 | Kurnool AP, IN</p>
            </div>
            {/* Education Item 3 */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-8 top-1 transform -translate-x-1/2"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">A.P.T.W.R. SCHOOL OF EXCELLENCE</h3>
              <p className="text-gray-300 text-base sm:text-lg">HIGHSCHOOL</p>
              <p className="text-gray-400 text-sm sm:text-md">2016-2017 | CGPA: 9.3/10 | Kurnool AP, IN</p>
            </div>
            {/* Certifications */}
            <div className="relative">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-8 top-1 transform -translate-x-1/2"></div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-2">Certifications</h3>
              <ul className="list-disc list-inside text-base sm:text-lg space-y-2 text-gray-200">
                <li>Java Full Stack Development, JSpiders.</li>
                <li>Python Zero to Hero, Udemy.</li>
                <li>Getting started with Python, Coursera.</li>
              </ul>
            </div>
          </div>
        </SectionObserver>

        {/* Contact Section */}
        <SectionObserver id="contact">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-400 mb-6 border-b-2 border-blue-600 pb-3">CONTACT ME</h2>
          <div className="text-center text-base sm:text-lg space-y-4 text-gray-200">
            <p>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
            <p className="text-lg sm:text-xl font-semibold">Email: <a href="mailto:naikrevanth001@gmail.com" className="text-blue-400 hover:underline">naikrevanth001@gmail.com</a></p>
            <p className="text-lg sm:text-xl font-semibold">Phone: +91 9059373841</p>
            <div className="flex justify-center space-x-6 mt-6 text-3xl sm:text-4xl">
              <a href="https://www.linkedin.com/in/revanth2426" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin inline-block align-middle"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://github.com/revanth2426" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github inline-block align-middle"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.5 0 4.1-1.7 4.1-3.6 0-.9-.2-1.8-.7-2.4 1.1-.7 1.1-2.2 0-3.2-.7-1-2.7-1.3-3.9-.3 0-.7-.2-1.3-.5-1.9-1.3-.2-2.7-.2-4 0-.3.6-.5 1.2-.5 1.9-1.2-1-3.2-.7-3.9.3-.5.6-.7 1.5-.7 2.4 0 1.9.6 3.6 4.1 3.6a4.8 4.8 0 0 0-1 3.2v4"/></svg>
              </a>
            </div>
          </div>
        </SectionObserver>

      </main>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-950 text-gray-400 p-6 text-center rounded-t-3xl mt-12">
        <p>&copy; {new Date().getFullYear()} Revanth Naik Desavath. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
