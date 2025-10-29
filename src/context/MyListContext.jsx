import { createContext, useState, useContext, useEffect } from 'react';

const MyListContext = createContext();

export const useMyListContext = () => {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyListContext must be used within a MyListProvider');
  }
  return context;
};

export const MyListProvider = ({ children }) => {
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem('myList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie) => {
    const movieToAdd = {
      ...movie,
      addedAt: new Date().toISOString(),
      uniqueId: `mylist-${movie.id}-${Date.now()}`
    };
    setMyList(prevList => [movieToAdd, ...prevList]);
  };

  const removeFromMyList = (movieId) => {
    setMyList(prevList => prevList.filter(item => item.id !== movieId));
  };

  const clearMyList = () => {
    setMyList([]);
  };

  const isInMyList = (movieId) => {
    return myList.some(item => item.id === movieId);
  };

  return (
    <MyListContext.Provider value={{
      myList,
      addToMyList,
      removeFromMyList,
      clearMyList,
      isInMyList
    }}>
      {children}
    </MyListContext.Provider>
  );
};