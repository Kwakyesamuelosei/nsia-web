import AuthService from '../../api/auth.service'
import Cookies from 'js-cookie'
import router from '../../router'

const state = {
     // set token null if user is not logged in
    authUser: Cookies.getJSON('authUser') || null ,
    
}

const getters = {
     // return boolen if token is exist or not
    isLoggedIn: (state) => {
        // console.log("authToken typeof | ", typeof(state.authToken))
        if( state.authUser === undefined || state.authUser === null){
            return false;
        }else if( state.authUser === "undefined" || state.authUser === "null"){
            return false;
        }else{
          return true;
        }
    },
    userDetails:(state) => {
        return state.authUser
    }
}

const actions = {
     
    async login({ commit },request_data){
        const response = await AuthService.loginAsync(request_data)
        if(response.status === 200){
            commit('setAuthUser', response.data.data);
            Cookies.set('authUser', response.data.data, { expires: 1 });
            return response
        }else{
            commit('setAuthUser', null);
            Cookies.remove('authUser');
            return response
        }
        
    },

    //log out user
    logout: () => {
        Cookies.remove('authUser')
        router.push('/login').catch(()=>{});
    }
}

 const mutations = {
     //update state authToken
    setAuthUser: (state, authUser) => {
        state.authUser = authUser;
    },
      

      
 }

 export default{
    state,
    getters,
    actions,
    mutations
}