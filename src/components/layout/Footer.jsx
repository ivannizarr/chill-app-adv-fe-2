import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [genreOpen, setGenreOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const genreColumns = [
    ['Aksi', 'Anak-anak', 'Anime', 'Britania'],
    ['Drama', 'Fantasi Ilmiah & Fantasi', 'Kejahatan', 'KDrama'],
    ['Komedi', 'Petualangan', 'Perang', 'Romantis'],
    ['Sains & Alam', 'Thriller']
  ];

  const helpLinks = [
    'FAQ', 'Kontak Kami', 'Privasi', 'Syarat & Ketentuan'
  ];

  return (
    <footer className="bg-[#181A1C] border-t border-border">
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12">
          {/* Logo & Copyright */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/Assets/img/logo.svg" alt="CHILL" className="h-8" />
            </div>
            <p className="text-gray-400 text-sm">
              ©{currentYear} Chill All Rights Reserved.
            </p>
          </div>

          {/* Genre Section */}
          <div className="md:col-span-4">
            {/* Mobile Genre Dropdown */}
            <div className="md:hidden">
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className="flex items-center justify-between w-full text-white font-semibold mb-4"
              >
                Genre
                <ChevronDown className={`w-4 h-4 transition-transform ${genreOpen ? 'rotate-0' : '-rotate-90'}`} />
              </button>
              {genreOpen && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {genreColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className="space-y-2">
                      {column.map((genre, index) => (
                        <button
                          key={index}
                          className="block text-gray-400 text-sm hover:text-white transition-colors duration-200 text-left"
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Genre Grid */}
            <div className="hidden md:block">
              <h3 className="text-white font-semibold mb-4">Genre</h3>
              <div className="grid grid-cols-4 gap-8">
                {genreColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-2">
                    {column.map((genre, index) => (
                      <button
                        key={index}
                        className="block text-gray-400 text-sm hover:text-white transition-colors duration-200 text-left"
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="md:col-span-1">
            {/* Mobile Help Dropdown */}
            <div className="md:hidden">
              <button
                onClick={() => setHelpOpen(!helpOpen)}
                className="flex items-center justify-between w-full text-white font-semibold mb-4"
              >
                Bantuan
                <ChevronDown className={`w-4 h-4 transition-transform ${helpOpen ? 'rotate-0' : '-rotate-90'}`} />
              </button>
              {helpOpen && (
                <div className="space-y-2 mb-6">
                  {helpLinks.map((link, index) => (
                    <button
                      key={index}
                      className="block text-gray-400 text-sm hover:text-white transition-colors duration-200 text-left"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop - Help List */}
            <div className="hidden md:block">
              <h3 className="text-white font-semibold mb-4">Bantuan</h3>
              <div className="space-y-2">
                {helpLinks.map((link, index) => (
                  <button
                    key={index}
                    className="block text-gray-400 text-sm hover:text-white transition-colors duration-200 text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;