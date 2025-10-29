import api from './axiosConfig';

const movieApi = {
  getData: async () => {
    try {
      const response = await api.get('/film');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    }
  },

  getDataById: async (id) => {
    try {
      const response = await api.get(`/film/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movie: ${error.message}`);
    }
  },

  // ADD
  addData: async (movieData) => {
    try {
      const response = await api.post('/film', movieData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add movie: ${error.message}`);
    }
  },

  // UPDATE
  updateData: async (id, movieData) => {
    try {
      const response = await api.put(`/film/${id}`, movieData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update movie: ${error.message}`);
    }
  },

  // DELETE
  deleteData: async (id) => {
    try {
      const response = await api.delete(`/film/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete movie: ${error.message}`);
    }
  }
};

export default movieApi;