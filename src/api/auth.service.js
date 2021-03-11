import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_URL

class AuthService {

    async loginAsync(request_data) {

        try {
          const response = await axios
            .post(API_URL + '/login',request_data);
          return response;
        }
        catch (error) {
          return error.response;
        }
    }
}

export default new AuthService();