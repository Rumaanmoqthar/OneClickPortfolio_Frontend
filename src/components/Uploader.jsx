import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- SVG Icons ---
const UploadCloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>;
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const AlertCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const CpuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>;
const LoaderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState(''); // New state for template choice
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:3000';

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setSelectedFile(file);
      setStatus('idle');
      setMessage('');
    } else {
      setSelectedFile(null);
      setStatus('error');
      setMessage('Please select a valid file (PDF, DOC, DOCX).');
    }
  };

  const handleUpload = async (selectedTemplate) => {
    if (!selectedFile) {
      setStatus('error');
      setMessage('No file selected. Please upload your resume first.');
      return;
    }
    setStatus('uploading');
    setTemplate(selectedTemplate); // Set which button was clicked
    setMessage(`Generating your ${selectedTemplate} portfolio...`);

    const formData = new FormData();
    formData.append('resume', selectedFile);
    formData.append('template', selectedTemplate); // Send template choice to backend

    try {
      const response = await fetch(`${apiUrl}/api/upload-resume`, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An unexpected error occurred.');
      }
      
      setStatus('success');
      setMessage('Success! Redirecting to your new portfolio...');

      if (result.resumeId) {
        // We pass the template choice in the URL to the portfolio page
        setTimeout(() => {
          navigate(`/portfolio/${result.resumeId}?template=${selectedTemplate}`);
        }, 2000);
      } else {
        throw new Error("Could not retrieve portfolio ID from the server.");
      }

    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('error');
      setMessage(error.message || 'Could not connect to the server.');
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white/50 dark:bg-gray-900/50 border border-gray-300/50 dark:border-gray-700/50 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
      <div className="text-center mb-8">
        <CpuIcon className="mx-auto h-14 w-14 text-amber-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">AI-Powered Portfolio Generator</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload your resume, choose a style, and get a professional portfolio in seconds.
        </p>
      </div>

      <label htmlFor="file-upload" className="cursor-pointer relative flex flex-col items-center justify-center w-full h-40 border-2 border-gray-400/50 dark:border-gray-600/50 border-dashed rounded-xl bg-white/20 dark:bg-black/20 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 group">
        <div className="flex flex-col items-center justify-center p-6 text-gray-600 dark:text-gray-400">
          {selectedFile ? (
            <><FileIcon className="w-10 h-10 mb-3 text-emerald-500" /><p className="font-semibold text-gray-800 dark:text-gray-200">{selectedFile.name}</p></>
          ) : (
            <><UploadCloudIcon className="w-10 h-10 mb-3 text-gray-500 group-hover:text-amber-500" /><p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p><p className="text-xs">PDF, DOC, or DOCX</p></>
          )}
        </div>
        <input id="file-upload" type="file" className="opacity-0 absolute inset-0 w-full h-full" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      </label>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleUpload('classic')}
          disabled={!selectedFile || status === 'uploading' || status === 'success'}
          className="w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-slate-500/40 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50"
        >
          {status === 'uploading' && template === 'classic' ? 'Analyzing...' : 'Generate Classic Portfolio'}
        </button>
        <button
          onClick={() => handleUpload('modern')}
          disabled={!selectedFile || status === 'uploading' || status === 'success'}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50"
        >
          {status === 'uploading' && template === 'modern' ? 'Analyzing...' : 'Generate Modern Portfolio'}
        </button>
      </div>

      {message && (
        <div className={`mt-6 p-4 rounded-xl flex items-center gap-4 text-sm border ${
          status === 'success' ? 'bg-emerald-900/20 text-emerald-300 border-emerald-500/30' : ''
        } ${
          status === 'error' ? 'bg-red-900/20 text-red-300 border-red-500/30' : ''
        } ${
          status === 'uploading' ? 'bg-sky-900/20 text-sky-300 border-sky-500/30' : ''
        }`}>
          {status === 'success' && <CheckCircleIcon className="h-6 w-6" />}
          {status === 'error' && <AlertCircleIcon className="h-6 w-6" />}
          {status === 'uploading' && <LoaderIcon className="h-6 w-6" />}
          <div><p className="font-semibold">{message}</p></div>
        </div>
      )}
    </div>
  );
};

export default Uploader;
