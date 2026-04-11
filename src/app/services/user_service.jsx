import axios from 'axios';
import { env } from '../../environments/env';

const API_URL = env.API_URL

class UserAPIService {
    static async generateOtp(data) {
        const response = await axios.post(`${API_URL}/user/generateOtp`, data)
        return response.data;
    }

    static async signUpUser(data) {
      const response = await axios.post(`${API_URL}/user/signup`, data)
      return response.data;
    }

    static async signInUser(data) {
      const response = await axios.post(`${API_URL}/user/signin`, data)
      return response.data;
    }

    static async FPemailVerify(data) {
      const response = await axios.post(`${API_URL}/user/OTPforPass`, data)
      return response.data;
    }

    static async FPverifyOtp(data) {
      const response = await axios.post(`${API_URL}/user/verifyOtp`, data)
      return response.data;
    }

    static async FPpassReset(data) {
      const response = await axios.post(`${API_URL}/user/updatePass`, data)
      return response.data;
    }

    static async getProducts(data) {
      const response = await axios.post(`${API_URL}/user/getProducts`, data)
      return response.data;
    }

    static async getCartItems(data) {
      const response = await axios.post(`${API_URL}/user/getCartItems`, data)
      return response.data;
    }

    static async addToCart(data) {
      const response = await axios.post(`${API_URL}/user/addToCart`, data);
      return response.data;
    }

    static async removeCartItem(data) {
      const response = await axios.post(`${API_URL}/user/removeFromCart`, data);
      return response.data;
    }

    static async buyNow(data) {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.post(`${API_URL}/user/buynow`, data, { headers });
      return response.data;
    }

    static async placeCartOrder(data) {
      const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
      const response = await axios.post(`${API_URL}/user/placeCartOrder`, data, { headers });
      return response.data;
    }

    static async getOrderList(data) {
      const response = await axios.post(`${API_URL}/user/getOrder`, data)
      return response.data;
    }




  }
  
export default UserAPIService;
