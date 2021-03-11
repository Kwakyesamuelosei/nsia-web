import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_URL

class EmployeeService {
    async getEmployeesAsync() {

        try {
          const response = await axios
            .get(API_URL + '/employees');
          return response;
        }
        catch (error) {
          return error.response;
        }
    }

    async addEmployeeAsync(request_data) {

        try {
          const response = await axios
            .post(API_URL + '/employee',request_data);
          return response;
        }
        catch (error) {
          return error.response;
        }
    }

    async updateEmployeeAsync(request_data) {

        try {
          const response = await axios
            .put(API_URL + `/employee/${request_data.employe_id}`,request_data.data);
          return response;
        }
        catch (error) {
          return error.response;
        }
    }
}

export default new EmployeeService();