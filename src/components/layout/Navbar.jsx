import { useState, useEffect, useRef } from "react";
import { User, Crown, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import Avatar from "@ui/Avatar";
import Button from "@ui/Button";

const Navbar = ({ onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    onNavigate('home');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    onNavigate('profile');
  };

  const handlePremiumClick = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#181A1C] backdrop-blur-sm border-b border-border">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between h-[80px] md:h-[94px]">
          <div className="flex items-center space-x-4 md:space-x-10">
            <button onClick={() => onNavigate('home')} className="flex items-center flex-shrink-0">
              <img
                src="/Assets/img/logo.svg"
                alt="CHILL"
                className="h-6 md:h-8" />
            </button>

            <nav className="flex items-center space-x-4 md:space-x-10">
              <button className="text-xs md:text-sm lg:text-base font-semibold transition-colors duration-200 text-white hover:text-gray-400">
                Series
              </button>
              <button className="text-xs md:text-sm lg:text-base font-semibold transition-colors duration-200 text-white hover:text-gray-400">
                Film
              </button>
              <button
                onClick={() => onNavigate('mylist')}
                className="text-xs md:text-sm lg:text-base font-semibold transition-colors duration-200 text-white hover:text-gray-400"
              >
                Daftar Saya
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10">
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full"
                    />
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-white transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 md:w-44 bg-[#181A1C] border border-border rounded-lg shadow-lg py-1">
                    <button
                      onClick={handleProfileClick}
                      className="w-full px-3 py-2 text-left text-white hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2 text-xs md:text-sm md:font-semibold"
                    >
                      <User className="w-4 h-4" />
                      <span>Profil Saya</span>
                    </button>
                    <button
                      onClick={handlePremiumClick}
                      className="w-full px-3 py-2 text-left text-white hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2 text-xs md:text-sm md:font-semibold"
                    >
                      <Crown className="w-4 h-4" />
                      <span>Ubah Premium</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-left text-white hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2 text-xs md:text-sm md:font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('login')}
                className="w-full px-6 py-2"
              >
                Masuk
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;