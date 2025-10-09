import Header from '../components/Header';
import Uploader from '../components/Uploader';
import Footer from '../components/Footer';
import useTheme from '../hooks/useTheme';

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent dark:from-gray-900/80 dark:to-transparent"></div>
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Uploader />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
