import { useState, useEffect } from 'react';
import { useMyList } from '@hooks/useMyList';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import MyList from '@pages/MyList';
import Profile from '@pages/Profile';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'login';
  });
  const { myList, addToMyList, removeFromMyList, clearMyList } = useMyList();

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'mylist':
        return (
          <MyList
            onNavigate={setCurrentPage}
            myList={myList}
            onRemoveFromMyList={removeFromMyList}
            onClearMyList={clearMyList}
          />
        );
      case 'profile':
        return (
          <Profile
            onNavigate={setCurrentPage}
            myList={myList}
          />
        );
      case 'home':
      default:
        return (
          <Home
            onNavigate={setCurrentPage}
            myList={myList}
            onAddToMyList={addToMyList}
            onRemoveFromMyList={removeFromMyList}
          />
        );
    }
  };

  return renderPage();
};

export default AppContent;