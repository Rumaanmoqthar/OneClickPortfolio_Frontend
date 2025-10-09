const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 text-center">
      <p className="text-xs text-gray-500 dark:text-gray-600">
        © {new Date().getFullYear()} Rumaan Moqthar
      </p>
    </footer>
  );
};

export default Footer;
