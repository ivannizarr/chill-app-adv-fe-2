import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@context/AuthContext';

export const useProfileForm = () => {
  const { user, login } = useAuth();
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || 'William',
    email: user?.email || 'william1980@gmail.com',
    password: '**************'
  });

  const handleEdit = (field) => {
    if (editingField === field) {
      const updatedUser = {
        ...user,
        [field]: formData[field]
      };
      login(updatedUser);
      setEditingField(null);

      const fieldLabels = {
        name: 'Nama',
        email: 'Email',
        password: 'Password'
      };

      toast.success(`${fieldLabels[field]} berhasil diubah!`);
    } else {
      setEditingField(field);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAll = () => {
    const updatedUser = {
      ...user,
      ...formData
    };
    login(updatedUser);
    setEditingField(null);
    toast.success('Profil berhasil disimpan!');
  };

  const handleSubscribe = () => {
    toast.success('Fitur berlangganan akan segera hadir!');
  };

  return {
    user,
    formData,
    editingField,
    handleEdit,
    handleInputChange,
    handleSaveAll,
    handleSubscribe
  };
};