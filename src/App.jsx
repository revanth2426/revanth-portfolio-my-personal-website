import React, { useState, useEffect, useRef } from 'react';

// Typewriter Effect Component for the main title
const TypewriterEffect = ({ text, delay }) => {
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

  return <span>{currentText}</span>;
};

// Section Observer Component for fade-in effect on scroll
const SectionObserver = ({ children, id }) => {
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
      className={`bg-white p-6 rounded-2xl shadow-lg mb-8 transition-opacity duration-1000 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </section>
  );
};

// Main App component
const App = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Effect to show/hide Scroll to Top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Navigation items for the sticky navigation bar
  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Education', id: 'education' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Links', id: 'links' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Global styles for smooth scrolling on anchor links */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Header Section - Sticky and visually prominent */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 md:p-8 shadow-xl rounded-b-3xl sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            {/* Typewriter effect for the main name */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-1">
              <TypewriterEffect text="REVANTH NAIK DESAVATH" delay={70} />
            </h1>
            <p className="text-xl md:text-2xl font-light">JAVA/SAILPOINT DEVELOPER, HYDERABAD</p>
          </div>
          <div className="text-center md:text-right text-lg">
            <p className="mb-1">+91 9059373841</p>
            <p className="mb-1">naikrevanth001@gmail.com</p>
            <a href="https://www.linkedin.com/in/revanth2426" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-300">
              LinkedIn Profile
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Bar - Sticky below the header */}
      <nav className="bg-gray-800 text-white shadow-md py-3 sticky top-[96px] md:top-[112px] z-40">
        <div className="container mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3 py-1 rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Sections - Each wrapped with SectionObserver for fade-in */}
      <main className="container mx-auto p-6 md:p-8">

        {/* About Me Section */}
        <SectionObserver id="about">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">ABOUT ME</h2>
          <p className="text-lg leading-relaxed">
            Highly motivated and passionate software engineer with 1.8+ years of experience in SailPoint IdentityIQ.
            I thrive in innovative and collaborative work environments, always striving for growth and achievement.
            With a strong commitment to continuous improvement, I am dedicated to doing things the right way,
            learning from others, and consistently putting in effort to enhance both my work and my approach to working with people.
          </p>
        </SectionObserver>

        {/* Experience Section */}
        <SectionObserver id="experience">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">EXPERIENCE</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">ZENZZ SOLUTIONS PVT LTD | SECURITY CONSULTANT - Remote</h3>
            <p className="text-gray-600 text-md mb-2">October 2023 - Present</p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li className="hover:text-blue-600 transition-colors duration-200">Led the version upgrade of SailPoint IIQ from v8.2 to v8.4p2.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Developed custom REST connectors, overcoming limitations of the OOTB Web Services connector.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Implemented complex provisioning workflows, lifecycle events, automated email notifications using Bean Shell, enabling streamlined identity lifecycle management.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Designed and deployed Before/After provisioning rules tailored for JDBC and REST APIs to handle specific attribute transformations and provisioning flows.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Onboarded multiple enterprise applications using OOTB connectors enhanced with custom rule logic, reducing access delays and provisioning errors.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Automated role-based access control (RBAC) provisioning for new hires based on department, location, and job, decreasing onboarding time by approximately 40%.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Conducted UAT testing, defect resolution, and performance tuning, resulting in more stable production deployments and faster access processing.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Authored detailed technical designs, process flows, and implementation documentation on Confluence, which improved internal team onboarding and collaboration efficiency by -40%.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Organized and delivered training sessions (roadshows) to business users and clients, increasing awareness and adoption of SailPoint features.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Optimized aggregation logic by refactoring inefficient code blocks and tuning data-fetch strategies, leading to a -35% improvement in job completion times.</li>
            </ul>
          </div>
        </SectionObserver>

        {/* Projects Section */}
        <SectionObserver id="projects">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">PROJECTS</h2>
          <div className="mb-6 pb-4 border-b border-gray-200 last:border-b-0">
            <h3 className="text-2xl font-semibold text-gray-900">FRAUD DETECTION USING MACHINE LEARNING</h3>
            <p className="text-gray-600 text-md mb-2">Undergraduate Major Project | Apr 2023 - May 2023</p>
            <p className="text-lg mb-2">
              This project aims to use machine learning techniques to identify and prevent fraudulent credit card transactions,
              protecting customers from unauthorized usage of their accounts.
            </p>
            <ul className="list-disc list-inside text-lg space-y-1">
              <li className="hover:text-blue-600 transition-colors duration-200">Implemented K-Nearest Neighbors (KNN), Support Vector Machine (SVM), and Logistic Regression to analyze a dataset of credit card transactions, identifying fraudulent activities with 95% accuracy.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Enhanced fraud detection capabilities, improving prediction accuracy and ensuring the security of customers' financial transactions.</li>
              <li><span className="font-semibold">Technologies:</span> Python, Scikit-learn, Pandas, Matplotlib</li>
              <li><span className="font-semibold">Tools:</span> Jupyter Notebook</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">FLOOD DETECTION USING MACHINE LEARNING</h3>
            <p className="text-gray-600 text-md mb-2">Undergraduate Minor Project | Nov 2023 - Dec 2023</p>
            <ul className="list-disc list-inside text-lg space-y-1">
              <li className="hover:text-blue-600 transition-colors duration-200">Designed a flood prediction model using Linear Regression, improving risk assessment accuracy by 80%.</li>
              <li className="hover:text-blue-600 transition-colors duration-200">Analyzed and compared prediction performance to identify the most promising flood detection methods.</li>
              <li><span className="font-semibold">Technologies:</span> Python, Scikit-learn, Pandas, Matplotlib</li>
              <li><span className="font-semibold">Tools:</span> Jupyter Notebook</li>
            </ul>
          </div>
        </SectionObserver>

        {/* Skills Section */}
        <SectionObserver id="skills">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">LANGUAGES & FRAMEWORKS</h3>
              <ul className="list-disc list-inside text-lg space-y-1">
                <li className="hover:text-blue-600 transition-colors duration-200">SailPoint IdentityIQ (IIQ)</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Java, Bean Shell Scripting</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Python Programming Language</li>
                <li className="hover:text-blue-600 transition-colors duration-200">MySQL</li>
                <li className="hover:text-blue-600 transition-colors duration-200">HTML/CSS</li>
                <li className="hover:text-blue-600 transition-colors duration-200">API Development & Testing</li>
                <li className="hover:text-blue-600 transition-colors duration-200">PowerShell, Postman</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Apache Tomcat Server</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">TOOLS/APPLICATIONS</h3>
              <ul className="list-disc list-inside text-lg space-y-1">
                <li className="hover:text-blue-600 transition-colors duration-200">Eclipse IDE</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Edit Plus</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Visual Studio</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Jupyter Notebook</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">STRENGTHS</h3>
              <ul className="list-disc list-inside text-lg space-y-1">
                <li className="hover:text-blue-600 transition-colors duration-200">Adaptability</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Team Player</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Organizational Skills</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Strong Work Ethic</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Attention to Detail</li>
                <li className="hover:text-blue-600 transition-colors duration-200">Continuous Learner</li>
              </ul>
            </div>
          </div>
        </SectionObserver>

        {/* Education Section */}
        <SectionObserver id="education">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">EDUCATION</h2>
          <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
            <h3 className="text-2xl font-semibold text-gray-900">GURUKUL KANGRI UNIVERSITY</h3>
            <p className="text-gray-700 text-lg">BACHELOR OF TECHNOLOGY (BTech) - Computer Science Engineering</p>
            <p className="text-gray-600 text-md">2019-2023 | CGPA: 8.4/10 | Haridwar, UK, IN</p>
          </div>
          <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
            <h3 className="text-2xl font-semibold text-gray-900">MASTERS JUNIOR COLLEGE</h3>
            <p className="text-gray-700 text-lg">INTERMEDIATE, MPC</p>
            <p className="text-gray-600 text-md">2017-2019 | CGPA: 9.88/10 | Kurnool AP, IN</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">A.P.T.W.R. SCHOOL OF EXCELLENCE</h3>
            <p className="text-gray-700 text-lg">HIGHSCHOOL</p>
            <p className="text-gray-600 text-md">2016-2017 | CGPA: 9.3/10 | Kurnool AP, IN</p>
          </div>
        </SectionObserver>

        {/* Certifications Section */}
        <SectionObserver id="certifications">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">CERTIFICATIONS</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li className="hover:text-blue-600 transition-colors duration-200">Java Full Stack Development, JSpiders.</li>
            <li className="hover:text-blue-600 transition-colors duration-200">Python Zero to Hero, Udemy.</li>
            <li className="hover:text-blue-600 transition-colors duration-200">Getting started with Python, Coursera.</li>
          </ul>
        </SectionObserver>

        {/* Links Section */}
        <SectionObserver id="links">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 border-b-2 border-blue-300 pb-2">LINKS</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li><a href="https://github.com/revanth2426" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-300">GitHub: github.com/revanth2426</a></li>
            <li><a href="https://www.linkedin.com/in/revanth2426" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline hover:text-blue-800 transition-colors duration-300">LinkedIn: linkedin.com/in/revanth2426</a></li>
          </ul>
        </SectionObserver>

      </main>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          {/* SVG for up arrow icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 p-6 text-center rounded-t-3xl mt-8">
        <p>&copy; {new Date().getFullYear()} Revanth Naik Desavath. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
