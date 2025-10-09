import { useRef } from 'react';

// --- SVG Icons (Copy from your existing Portfolio.jsx) ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.92 4.8 4.8 0 0 0 .38 2.22a7.12 7.12 0 0 0 .38 2.22A2 2 0 0 1 11 11.08l-1.55 1.55a16 16 0 0 0 6.55 6.55L17.92 16a2 2 0 0 1 2-1.84 7.12 7.12 0 0 0 2.22.38 4.8 4.8 0 0 0 2.22.38A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;

const getBackgroundImage = (jobRole = '') => {
  const role = jobRole.toLowerCase();
  if (role.includes('backend') || role.includes('server')) return 'https://images.unsplash.com/photo-1592609931095-54a2168ae293?q=80&w=2940&auto=format&fit=crop';
  if (role.includes('frontend') || role.includes('ui') || role.includes('design')) return 'https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=2835&auto=format&fit=crop';
  if (role.includes('full-stack')) return 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop';
  return 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2940&auto=format&fit=crop';
};

// MODIFICATION: Component now accepts props
const ModernTemplate = ({ resume, onDownloadCode }) => {
    const portfolioRef = useRef();
    if (!resume) return null;
    const backgroundImageUrl = getBackgroundImage(resume.currentJobRole);

    return (
        <div 
          className="min-h-screen bg-cover bg-center bg-fixed p-0" 
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          {/* translucent sidebar layout like iPortfolio */}
          <div className="min-h-screen bg-black/70">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Left sidebar */}
              <aside className="lg:col-span-1 p-8 lg:py-16 border-b lg:border-b-0 lg:border-r border-white/10 text-white">
                <div className="relative flex flex-col items-center lg:items-start gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-center text-xs text-white/50 overflow-hidden">
                      Profile<br/>Picture
                    </div>
                    <span className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-md -z-10"></span>
                  </div>
                  <div className="text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold">{resume.name.full}</h1>
                    <p className="text-cyan-300 mt-1">{resume.currentJobRole}</p>
                  </div>
                  <div className="space-y-2 text-white/80 text-sm">
                    <div className="flex items-center gap-2"><MailIcon /><a href={`mailto:${resume.email}`} className="hover:text-cyan-300 transition-colors">{resume.email}</a></div>
                    <div className="flex items-center gap-2"><PhoneIcon />{resume.phone}</div>
                    <div className="flex items-center gap-2"><MapPinIcon />{resume.address?.city || 'Global'}</div>
                  </div>
                  <div className="pt-2 w-full">
                    <button onClick={onDownloadCode} className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-5 py-2.5 rounded-md transition-colors shadow-lg shadow-cyan-600/20">
                      <CodeIcon/> Download Code
                    </button>
                  </div>
                </div>
              </aside>

              {/* Right content */}
              <div ref={portfolioRef} className="lg:col-span-2 p-8 lg:py-16 text-white space-y-12">
                <Section title="About">
                  <p className="text-white/90 leading-relaxed text-lg">{resume.jobDescription}</p>
                </Section>

                <Section title="Skills">
                  <div className="flex flex-wrap gap-3">
                    {resume.skills?.map((skill, index) => (
                      <span key={index} className="bg-white/10 text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full">{skill}</span>
                    ))}
                  </div>
                </Section>

                <Section title="Experience">
                  <div className="relative space-y-8 pl-6 border-l-2 border-white/10">
                    {resume.experience?.map((exp, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -left-[30px] top-1 h-4 w-4 bg-cyan-400 rounded-full border-4 border-black/60"></div>
                        <p className="text-base text-white/70">{exp.fromDate} - {exp.toDate}</p>
                        <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-cyan-300 transition-colors">{exp.role}</h3>
                        <p className="text-cyan-300">{exp.companyName}</p>
                        <p className="text-base text-white/80 mt-2 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Education">
                  <div className="relative space-y-8 pl-6 border-l-2 border-white/10">
                    {resume.education?.map((edu, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -left-[30px] top-1 h-4 w-4 bg-cyan-400 rounded-full border-4 border-black/60"></div>
                        <p className="text-base text-white/70">{edu.fromDate} - {edu.toDate}</p>
                        <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-cyan-300 transition-colors">{edu.institution}</h3>
                        <p className="text-cyan-300 text-base">{edu.degree}</p>
                        {edu.description && (
                          <p className="text-base text-white/80 mt-2 leading-relaxed">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Section>

                <Section title="Interests">
                  <p className="text-white/90 leading-relaxed text-lg">
                    {resume.hobbies || resume.currentJobRole}
                  </p>
                </Section>

                <footer className="pt-6 border-t border-white/10 text-white/60 text-sm">
                  <p>{resume.hobbies || 'Passion for technology and continuous learning.'}</p>
                </footer>
              </div>
            </div>
            <div className="max-w-6xl mx-auto p-8">
              <a href="/" className="block text-center bg-gray-700/80 text-white font-semibold py-2.5 px-5 rounded-md hover:bg-gray-600 transition-colors border border-gray-600/50">Generate New</a>
            </div>
          </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-6">{title}</h2>
        {children}
    </section>
);

export default ModernTemplate;
