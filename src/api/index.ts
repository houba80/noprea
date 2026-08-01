import axios from 'axios';

// 🟢 التعديل الجديد: لو على جهازك هيكلم 5000، لو على السيرفر هيكلم الدومين الجديد بتاع الباك إند
const BACKEND_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://api.nopreahotel.com'; // 👈 حطينا رابط الـ API المخصوص

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`, 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); 
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = (credentials: any) => API.post('/auth/login', credentials);

export const fetchRooms = () => API.get('/rooms');
export const createRoom = (newRoom: any) => API.post('/rooms', newRoom);
export const updateRoom = (id: string, updatedRoom: any) => API.put(`/rooms/${id}`, updatedRoom);
export const deleteRoom = (id: string) => API.delete(`/rooms/${id}`);

export const fetchGallery = () => API.get('/gallery');
export const createGalleryItem = (newItem: any) => API.post('/gallery', newItem);
export const updateGalleryItem = (id: string, updatedItem: any) => API.put(`/gallery/${id}`, updatedItem);
export const deleteGalleryItem = (id: string) => API.delete(`/gallery/${id}`);

export const fetchReviews = () => API.get('/reviews');
export const createReview = (newReview: any) => API.post('/reviews', newReview);
export const updateReview = (id: string, updatedReview: any) => API.put(`/reviews/${id}`, updatedReview);
export const deleteReview = (id: string) => API.delete(`/reviews/${id}`);

export const uploadImage = (formData: FormData) => API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const uploadBulkImages = (formData: FormData) => API.post('/upload/bulk', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const sendEnquiry = (enquiryData: any) => API.post('/contact', enquiryData);
export const subscribeNewsletter = (emailData: { email: string }) => API.post('/newsletter', emailData);

export const fetchUsers = () => API.get('/users');
export const createUser = (userData: any) => API.post('/users', userData);
export const updateUser = (id: string, userData: any) => API.put(`/users/${id}`, userData);
export const deleteUser = (id: string) => API.delete(`/users/${id}`);
export const updateProfile = (data: any) => API.put('/users/profile', data);

export const fetchMedia = () => API.get('/media');
export const deleteMedia = (filename: string) => API.delete(`/media/${filename}`);

export const fetchActivityLogs = () => API.get('/activity');
export const logActivity = (action: string) => {
  const username = localStorage.getItem('username') || 'Admin';
  return API.post('/activity', { action, username });
};

export const fetchRetreats = () => API.get('/retreats');
export const createRetreat = (data: any) => API.post('/retreats', data);
export const updateRetreat = (id: string, data: any) => API.put(`/retreats/${id}`, data);
export const deleteRetreat = (id: string) => API.delete(`/retreats/${id}`);

export default API;