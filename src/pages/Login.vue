<template>
    <div class="loginWrapper">
       
        <div class="loginContainer">
            <div class="formContainer">
                 <div>
                 <div style="text-align:center; font-size:20px">Log In</div>
                <a-form-model
                    ref="loginForm"
                    :model="loginModel"
                    :rules="rules"
                >
                <a-row>
                    <a-col :span="22" :offset="1">
                        <a-form-model-item label="Email" ref="email" prop="email">
                            <a-input
                                class="input"
                                v-model="loginModel.email"
                            />
                        </a-form-model-item>
                    </a-col>
                  
                </a-row>
                <a-row>
                    <a-col :span="22" :offset="1">
                        <a-form-model-item label="Password" ref="password" prop="password">
                            <a-input
                                class="input"
                                v-model="loginModel.password"
                                type="password"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
            
                <div style="display:flex;justify-content: center;padding-bottom: 10px;">
                    <a-spin class="spinner" :spinning="loading" />
                </div>

                <a-form-model-item style="display: flex;justify-content: center;align-items: center;padding-top:10px;">
                    <a-button @click="handleLogin" style="background: #001529;height:40px;color:#fff;width:263px;border-radius:5px;">
                        Login
                    </a-button>
                </a-form-model-item>

                </a-form-model>
            </div>
            </div>
           
           
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

    export default {
        name:"Login",
        data(){
            return{
                loading: false,
                loginModel: {
                    email:'',
                    password:''
                },
                rules: {
                  
                    password: [
                        { required: true, message: 'Please enter password', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: 'Please enter email', trigger: 'change' },
                        {
                            pattern: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
                            message: 'Please enter valid email',
                            trigger: 'change'
                        },
                    ],
                    
                },
            }
        },
        methods:{
            ...mapActions(['login']),
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
            handleLogin(){
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        
                        let request_data = {
                            email: this.loginModel.email,
                            password: this.loginModel.password
                        }
                        this.login(request_data).then(response => {
                            this.loading = false;
                            if(response.status === 200){
                                this.showSuccessAlert("Login Successfully")
                                this.$router.push('/overview');
                            }else{
                                this.showErrorAlert(response.data.msg)
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
            }
        }
    }
</script>

<style scoped>

.loginWrapper{
    width: 100%;
    height: 100%;
}
.loginContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    
}
.formContainer{
    background: #b0b4b9b8;
    padding: 20px
}
.input{
    /* color: #fff; */
}
</style>