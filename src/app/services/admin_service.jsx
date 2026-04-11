import axios from 'axios';
import { env } from '../../environments/env';

const API_URL = env.API_URL;

class AdminAPIService {
    static async signInAdmin(data) {
        const response = await axios.post(`${API_URL}/admin/signin`, data);
        return response.data;
    }

    static async AddProduct(data) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('admintoken')}`,"Content-Type": "multipart/form-data" };
        const response = await axios.post(`${API_URL}/admin/addProduct`, data, { headers });
        return response.data;
    }

    static async updateProduct(data) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('admintoken')}` };
        const response = await axios.post(`${API_URL}/admin/updateProduct`, data, { headers });
        return response.data;
    }

    static async deleteProduct(data) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('admintoken')}` };
        const response = await axios.post(`${API_URL}/admin/deleteProduct`, data, { headers });
        return response.data;
    }

    static async getdashboardata(data) {
        const headers = { Authorization: `Bearer ${localStorage.getItem('admintoken')}` };
        const response = await axios.post(`${API_URL}/admin/getDashboardInsights`, data, { headers });
        return response.data;
    }
}

export default AdminAPIService;
