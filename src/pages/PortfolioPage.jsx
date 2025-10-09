import { useLocation, useParams } from 'react-router-dom';
// --- THIS IS THE FIX ---
// These paths are now corrected to find the template components.
import ModernPortfolio from './ModernPortfolio.jsx';
import ClassicPortfolio from './ClassicPortfolio.jsx';
import { useEffect, useState } from 'react';

const LoaderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;

const PortfolioPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const template = queryParams.get('template') || 'modern';

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = 'http://localhost:3000';

    useEffect(() => {
        let isMounted = true;
        let pollingTimeout;
        const fetchResumeData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/resume/${id}`);
                if (!response.ok) throw new Error('Portfolio not found or still processing.');
                const data = await response.json();
                if (isMounted) {
                    if (data.name?.full === 'Processing...') {
                        pollingTimeout = setTimeout(fetchResumeData, 3000);
                    } else {
                        setResume(data);
                        setLoading(false);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };
        fetchResumeData();
        return () => { isMounted = false; clearTimeout(pollingTimeout); };
    }, [id]);
    
    const handleDownloadCode = () => {
        window.location.href = `${apiUrl}/api/portfolio/${id}/download?template=${template}`;
    };

    if (loading) return (
        <div className="min-h-screen relative overflow-hidden text-white">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2940&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-slate-900/80 to-black/80" />

            {/* subtle cyber grid */}
            <div className="pointer-events-none absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.25)" strokeWidth="1" />
                        </pattern>
                        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="rgba(34,211,238,0.5)" />
                            <stop offset="100%" stopColor="rgba(59,130,246,0.5)" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#glow)" strokeWidth="1" opacity="0.25">
                        <animate attributeName="x2" values="0;100%" dur="5s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="0;100%" dur="5s" repeatCount="indefinite" />
                    </line>
                </svg>
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="max-w-2xl text-center">
                    <div className="mx-auto mb-6 flex items-center justify-center text-cyan-300">
                        <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center">
                            <div className="text-cyan-300"><LoaderIcon /></div>
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        Creating your portfolio with AI
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-slate-300">
                        Analyzing your resume, extracting highlights, and composing a sleek, modern portfolio.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-2 text-cyan-300/90">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:200ms]" />
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse [animation-delay:400ms]" />
                    </div>
                </div>
            </div>
        </div>
    );
    if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-500">Error: {error}</div>;

    if (template === 'classic') {
        return <ClassicPortfolio resume={resume} onDownloadCode={handleDownloadCode} />;
    }
    
    return <ModernPortfolio resume={resume} onDownloadCode={handleDownloadCode} />;
};

export default PortfolioPage;

