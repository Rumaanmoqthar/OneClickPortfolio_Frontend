import { useRef } from 'react';

// --- SVG Icons ---
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.92 4.8 4.8 0 0 0 .38 2.22a7.12 7.12 0 0 0 .38 2.22A2 2 0 0 1 11 11.08l-1.55 1.55a16 16 0 0 0 6.55 6.55L17.92 16a2 2 0 0 1 2-1.84 7.12 7.12 0 0 0 2.22.38 4.8 4.8 0 0 0 2.22.38A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CodeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;


const ClassicTemplate = ({ resume, onDownloadCode }) => {
    const portfolioRef = useRef();
    if (!resume) return null;

    const featuredSkills = (resume.skills || []).slice(0, 6);

    return (
        <div className="bg-gray-50 font-sans">
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
                <div className="absolute -top-40 -right-24 h-96 w-96 rounded-full bg-blue-200/60 blur-3xl opacity-70"></div>
                <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-indigo-200/60 blur-3xl opacity-70"></div>
                <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 sm:pt-28 sm:pb-20">
                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="relative">
                            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white shadow-md ring-2 ring-white/60 flex items-center justify-center text-gray-400 text-xs overflow-hidden">
                                Profile Pic
                            </div>
                            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-400/30 via-indigo-400/30 to-purple-400/30 blur-md -z-10"></span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
                            {resume.name.full}
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600">{resume.currentJobRole}</p>
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-2"><MailIcon /><a href={`mailto:${resume.email}`} className="hover:text-blue-700 transition-colors">{resume.email}</a></span>
                            <span className="flex items-center gap-2"><PhoneIcon />{resume.phone}</span>
                            <span className="flex items-center gap-2"><MapPinIcon />{resume.address?.city || 'Global'}</span>
                        </div>
                        {featuredSkills.length > 0 && (
                            <div className="mt-6 flex flex-wrap justify-center gap-2">
                                {featuredSkills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1.5 rounded-full bg-white/70 backdrop-blur text-gray-800 text-sm ring-1 ring-gray-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CONTENT CARD */}
            <div ref={portfolioRef} className="max-w-6xl mx-auto -mt-6 sm:-mt-10 mb-6 sm:mb-12 px-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl ring-1 ring-gray-200/80 overflow-hidden">
                    <main className="p-8 sm:p-12 space-y-12">
                        <Section title="About Me">
                            <p className="text-gray-700 leading-relaxed">{resume.jobDescription}</p>
                        </Section>

                        <Section title="Experience">
                            <div className="relative space-y-8">
                                {resume.experience?.map((exp, index) => (
                                    <div key={index} className="relative pl-6 group">
                                        <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"></div>
                                        <div className="flex flex-wrap justify-between gap-2 items-baseline">
                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">{exp.role}</h3>
                                            <div className="text-sm text-gray-500 font-medium">{exp.fromDate} - {exp.toDate}</div>
                                        </div>
                                        <p className="text-gray-700">{exp.companyName}</p>
                                        <p className="mt-2 text-gray-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="Education">
                            <div className="relative space-y-8 pl-6">
                                {resume.education?.map((edu, index) => (
                                    <div key={index} className="relative group">
                                        <div className="absolute -left-6 top-2 h-3 w-3 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"></div>
                                        <div className="flex flex-wrap justify-between gap-2 items-baseline">
                                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">{edu.institution}</h3>
                                            <div className="text-sm text-gray-500 font-medium">{edu.fromDate} - {edu.toDate}</div>
                                        </div>
                                        <p className="text-gray-700">{edu.degree}</p>
                                        {edu.description && (
                                            <p className="mt-2 text-gray-600 leading-relaxed">{edu.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="Skills & Expertise">
                            <div className="flex flex-wrap gap-3">
                                {resume.skills?.map((skill, index) => (
                                    <span key={index} className="bg-gradient-to-r from-gray-100 to-gray-50 ring-1 ring-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    </main>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 pb-12 flex justify-center">
                <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={onDownloadCode} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 font-semibold shadow-lg shadow-blue-600/20 hover:from-blue-700 hover:to-indigo-700 transition-colors">
                        <CodeIcon/><span>Download Code</span>
                    </button>
                    <a href="/" className="inline-flex items-center rounded-full bg-gray-900 text-white px-6 py-3 font-semibold shadow-sm hover:bg-gray-800 transition-colors">Generate New</a>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
        {children}
    </section>
);

export default ClassicTemplate;
