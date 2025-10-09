import { FiStar, FiSun, FiMoon } from 'react-icons/fi';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <FiStar className="text-amber-500 text-2xl" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">OneClick Portfolio</h1>
      </div>
      <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
        {theme === 'dark' ? <FiSun className="text-amber-400" /> : <FiMoon className="text-gray-800" />}
      </button>
    </header>
  );
};

export default Header;
