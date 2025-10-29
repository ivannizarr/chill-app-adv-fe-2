import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children, showFooter = true, onNavigate }) => {

  return (
    <div className="min-h-screen bg-background font-lato">
      <Navbar onNavigate={onNavigate} />

      <main className="pt-16 sm:pt-20 md:pt-[94px]">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;