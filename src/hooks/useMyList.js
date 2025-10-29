import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useMyListContext } from '@context/MyListContext';

export const useMyList = () => {
  const { myList, addToMyList: addToMyListContext, removeFromMyList: removeFromMyListContext, clearMyList: clearMyListContext, isInMyList } = useMyListContext();
  const toastTimeoutRef = useRef(null);

  const addToMyList = (movie) => {
    if (isInMyList(movie.id)) {
      toast.error('Film sudah ada di daftar Anda!');
      return;
    }

    addToMyListContext(movie);
    toast.success(`${movie.title} ditambahkan ke Daftar Saya`);
  };

  const removeFromMyList = (movieId) => {
    const movie = myList.find(item => item.id === movieId);
    removeFromMyListContext(movieId);

    if (movie) {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      toastTimeoutRef.current = setTimeout(() => {
        toast.success(`${movie.title} dihapus dari Daftar Saya`);
      }, 10);
    }
  };

  const clearMyList = () => {
    clearMyListContext();
    toast.success('Semua film telah dihapus dari daftar Anda');
  };

  return {
    myList,
    addToMyList,
    removeFromMyList,
    clearMyList,
    isInMyList
  };
};