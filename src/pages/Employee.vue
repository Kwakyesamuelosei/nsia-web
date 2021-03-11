<template>
     <div>
        <div class="actions">
           
            <div>
                <h3 style="font-size:28px;line-height:45px">Employee</h3>
            </div>
            <div>
                <a-button @click="showAddEmployeeModal" style="width:159px; height:38px;border-raduis:5px; background: #001529; color:#fff;" icon="plus">
                    Add Employee
                </a-button>
            </div>
                
        </div>
            
            <div>
                <a-table
                :columns="columns"
                :data-source="employees"
                :loading='tableLoading'
                :pagination="pagination"
                class="employeeTable"
                >
                    <template slot="action" slot-scope="data">     
                      <a @click="showEditDetails(data)" >
                          <a-icon type="edit"/>
                      </a>
                    </template>
                </a-table>
          </div>
          <a-modal
            class="modalStyle"
            :visible="addEmployeeVisible"
            :footer="null"
            @cancel="handleAddEmployeeCancel"
            >
            
            <p style="display:flex;justify-content: center;font-weight: bolder;padding-top: 10px;">Add Employee</p>
            <div>
                <a-form-model
                    ref="addEmployeeForm"
                    :model="addEmployeeModel"
                    :rules="rules"
                >
                <a-row>
                    <a-col :span="10" :offset="1">
                        <a-form-model-item label="First Name" ref="first_name" prop="first_name">
                            <a-input
                                class=""
                                v-model="addEmployeeModel.first_name"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="10" :offset="2">
                        <a-form-model-item label="Last Name" ref="last_name" prop="last_name">
                            <a-input
                                class=""
                                v-model="addEmployeeModel.last_name"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="10" :offset="1">
                        <a-form-model-item label="Email" ref="email" prop="email">
                            <a-input
                                class=""
                                v-model="addEmployeeModel.email"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="10" :offset="2">
                        <a-form-model-item label="Phone Number" ref="phone_number" prop="phone_number">
                            <a-input
                                class=""
                                v-model="addEmployeeModel.phone_number"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="10" :offset="1">
                        <a-form-model-item label="Gender" ref="gender" prop="gender">
                            <a-select v-model="addEmployeeModel.gender" placeholder="please select your gender">
                                <a-select-option value="Male">
                                    Male
                                </a-select-option>
                                <a-select-option value="Female">
                                    Female
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>

                </a-row>

                <div style="display:flex;justify-content: center;padding-bottom: 10px;">
                    <a-spin class="spinner" :spinning="loading" />
                </div>

                <a-form-model-item style="display: flex;justify-content: center;align-items: center;padding-top:40px;">
                    <a-button @click="handleAddEmployeeSubmit" style="background: #418a49;height:59px;color:#fff;width:263px;border-radius:5px;">
                        Add Employee
                    </a-button>
                </a-form-model-item>

                </a-form-model>
            </div>
        </a-modal>

        <a-modal
            class="modalStyle"
            :visible="updateEmployeeVisible"
            :footer="null"
            @cancel="handleUpdateEmployeeCancel"
            >
            
            <p style="display:flex;justify-content: center;font-weight: bolder;padding-top: 10px;">Edit Employee</p>
            <div>
                <a-form-model
                    ref="updateEmployeeForm"
                    :model="updateEmployeeModel"
                    :rules="rules"
                >
                <a-row>
                    <a-col :span="10" :offset="1">
                        <a-form-model-item label="First Name" ref="first_name" prop="first_name">
                            <a-input
                                class=""
                                v-model="updateEmployeeModel.first_name"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="10" :offset="2">
                        <a-form-model-item label="Last Name" ref="last_name" prop="last_name">
                            <a-input
                                class=""
                                v-model="updateEmployeeModel.last_name"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
            
                <div style="display:flex;justify-content: center;padding-bottom: 10px;">
                    <a-spin class="spinner" :spinning="loading" />
                </div>

                <a-form-model-item style="display: flex;justify-content: center;align-items: center;padding-top:40px;">
                    <a-button @click="handleUpdateEmployeeSubmit" style="background: #418a49;height:59px;color:#fff;width:263px;border-radius:5px;">
                        Edit Employee
                    </a-button>
                </a-form-model-item>

                </a-form-model>
            </div>
        </a-modal>
    </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import { mapActions } from 'vuex';

const columns = [
  {
    title: "First Name",
    // width: 150,
    dataIndex: 'first_name',
    key: 'first_name'
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    // width: 130,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    //  width: 50,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: "gender",
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    
  },
  {
    title: 'Date Hired',
    dataIndex: 'hire_date',
    key: "hire_date",
  },
  {
    title: 'Action',
    dataIndex: 'action',
    // width: 150,
    scopedSlots: { customRender: 'action' }
  }

];
    export default {
        name:"Employee",
        data(){
            return{
                columns,
                employees:[],
                tableLoading: false,
                loading: false,
                addEmployeeVisible: false,
                updateEmployeeVisible: false,
                addEmployeeModel:{
                    first_name:'',
                    last_name:'',
                    phone_number:'',
                    email:'',
                    gender:''
                },
                employe_id: '',
                updateEmployeeModel:{
                    first_name:'',
                    last_name:''
                },
                pagination: {
                    pageSize:10
                },
                rules: {
                    first_name: [
                        { required: true, message: 'Please first name' , trigger: 'change'},
                    ],
                    last_name: [
                        { required: true, message: 'Please enter last name', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: 'Please enter email', trigger: 'change' },
                        {
                            pattern: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
                            message: 'Please enter valid email',
                            trigger: 'change'
                        },
                    ],
                    phone_number: [
                        { required: true, message: 'Please enter phone number', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please enter gender', trigger: 'change' }
                    ],
                },
            }
        },
        methods:{
            ...mapActions(['getEmployees','addEmployee','updateEmployee']),
            showAddEmployeeModal(){
                this.addEmployeeVisible = true;
            },
            showEditDetails(data){
                this.updateEmployeeModel.first_name = data.first_name
                this.updateEmployeeModel.last_name = data.last_name
                this.employe_id = data.id
                this.updateEmployeeVisible = true;
            },
            handleUpdateEmployeeCancel(){
                this.updateEmployeeVisible = false;
            },
            handleAddEmployeeCancel(){
                this.addEmployeeVisible = false;
            },
            showSuccessAlert(message) {
                this.$notification['success']({
                    message: message,
                });
            },
            showErrorAlert(message) {
                this.$notification['error']({
                    message: message
                });
            },
            handleUpdateEmployeeSubmit(){
                this.$refs.updateEmployeeForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        
                        let request_data = {
                            data: {
                                first_name: this.updateEmployeeModel.first_name,
                                last_name: this.updateEmployeeModel.last_name
                            },
                            employe_id: this.employe_id 
                        }
                        this.updateEmployee(request_data).then(response => {
                            this.loading = false;
                            if(response.status === 200){
                                this.getAllEmployees();
                                this.updateEmployeeVisible = false;
                                this.showSuccessAlert("Employee Details Updated Successfully")
                            }else{
                                this.showErrorAlert(response.data.messages)
                            }
                        },
                        error =>{
                            this.loading = false
                            this.showErrorAlert(JSON.stringify(error))
                        })
                    } else {
                        this.loading = false;
                        return false;
                    }
                });
            },
            handleAddEmployeeSubmit(){
                this.$refs.addEmployeeForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                    
                        let request_data = {
                            first_name: this.addEmployeeModel.first_name,
                            last_name: this.addEmployeeModel.last_name,
                            phone_number: this.addEmployeeModel.phone_number,
                            email: this.addEmployeeModel.email,
                            gender: this.addEmployeeModel.gender
                        }
                        this.addEmployee(request_data).then(response => {
                            this.loading = false;
                            if(response.status === 200){
                                this.getAllEmployees();
                                this.addEmployeeVisible = false;
                                this.showSuccessAlert("New Employee Added Successfully")
                                this.$refs.addEmployeeForm.resetFields();
                            }else{
                                this.showErrorAlert(response.data.messages)
                            }
                        },
                        error =>{
                            this.loading = false
                            this.showErrorAlert(JSON.stringify(error))
                        })
                    } else {
                        this.loading = false;
                        return false;
                    }
                });
            },
            async getAllEmployees(){
                this.tableLoading = true
                let response = await this.getEmployees()
                if(response.status === 200){
                    this.tableLoading = false
                    let employees = response.data.data.map(employee => ({
                        key: employee.id,
                        first_name: employee.first_name,
                        last_name: employee.last_name,
                        email: employee.email,
                        phone_number: employee.phone_number,
                        hire_date: moment(employee.hire_date).format("DD-MMM-YYYY"),
                        gender: employee.gender,
                        action:employee
                    }))
                    this.employees = _.reverse(employees)
                }else{
                    this.tableLoading = false
                    console.log("Error | ", response)
                }
            }
        },
        created(){
            if(this.getAllEmployees){
                this.getAllEmployees();
            }
        }
    }
</script>

<style scoped>
.actions{
    display: flex;
    justify-content: space-between;
}

.ant-table-wrapper {
    zoom: 1;
    background: #fff;
    margin-bottom: 30px;
}
.employeeTable >>> .ant-table-thead th {
    background: #c7c7c763;
    height: 63px;
}

.employeeTable >>> .ant-pagination-item-active {
    background: #418a49;
    border-color: #418a49;
}

.employeeTable >>> .ant-pagination-item-active a {
    color: #fff;
}
.employeeTable >>> .ant-table-pagination {
    float: none;
    margin: 16px 0;
    display: flex;
    justify-content: center;
}
</style>