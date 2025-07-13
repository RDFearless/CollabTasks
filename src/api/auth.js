import api from './axios.js';

export class AuthService {
    async register({fullname, email, username, password}) {
        try {
            // register
            return await api.post('/users/register', {
                fullname,
                email,
                username,
                password
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async login({email, username, password}) {
        try {
            return await api.post('/users/login', {
                email,
                username,
                password
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async logout() {
        try {
            return await api.post('/users/logout');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async getCurrentUser() {
        try {
            return await api.get('/users/profile');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async updateUser({fullname, email, username}) {
        try {
            return await api.patch('/users/profile', {
                fullname,
                email,
                username
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
        
    }
    
    async changePassword({oldPassword, newPassword}) {
        try {
            return await api.patch('/users/change-password', {
                oldPassword,
                newPassword
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async accessRefreshToken() {
        try {
            return await api.post('/users/refresh-token');
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;