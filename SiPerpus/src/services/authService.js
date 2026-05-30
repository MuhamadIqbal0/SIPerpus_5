// frontend/src/services/authService.js

import api from './api'

export const authService = {
  // Login user
  async login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password
    })

    return response.data
    // { success, data: { token, user } }
  },

  // Ambil data user yang sedang login
  async getMe() {
    const response = await api.get('/auth/me')

    return response.data
  },

  // Register user baru
  async register(data) {
    const response = await api.post('/auth/register', data)

    return response.data
  }
}
