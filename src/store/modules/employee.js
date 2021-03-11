import EmployeeService from '../../api/employee.service'
import Cookies from 'js-cookie'

const state = {
    employee: Cookies.getJSON('employee') || null ,
}

const getters = {}

const actions = {
    async getEmployees(){
        const response = await EmployeeService.getEmployeesAsync()
        return response
    },
    async addEmployee({ commit },request_data){
        commit('setEmployee',null)
        const response = await EmployeeService.addEmployeeAsync(request_data)
        return response
    },
    async updateEmployee({ commit },request_data){
        commit('setEmployee',null)
        const response = await EmployeeService.updateEmployeeAsync(request_data)
        return response
    }
}

 const mutations = {
    
    setEmployee: (state, employee) => {
        state.employee = employee;
    }
 }

 export default{
    state,
    getters,
    actions,
    mutations
}