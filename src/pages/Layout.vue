<template>

        <a-layout id="vueLayout">
            <a-layout-sider>
            <div class="logo">
                <!-- <img class="img_size" src="../assets/logo.png" /> -->
                <p>Nsia Web</p>
            </div>
            <a-menu class="top" @select="OnSelect" mode="inline">
                <a-menu-item  class="overview" key="overview">
                    <a-icon class="menuIcon" type="home" />
                    <span>Home</span>
                </a-menu-item>
               
                <a-menu-item key="employee">
                    <a-icon class="menuIcon" type="usergroup-add" />
                    <span>Employees</span>
                </a-menu-item>
                
            </a-menu>
            </a-layout-sider>
            <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <div style="float: right; padding-right:18px;">
                    <a-dropdown style="color: #4d4f5c; margin-right: 10px;" :trigger="['click']">
                        <a  style="text-decoration: none;" class="ant-dropdown-link" @click="e => e.preventDefault()">
                        {{ displayUsername }} <a-icon type="down" />
                        </a>
                            
                        <a-menu slot="overlay">
                            <a-menu-item key="0">
                                <a style="text-decoration: none;" @click="handlleLogout">
                                    Logout
                                </a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                    <a-avatar icon="user" />
                </div>
            </a-layout-header>
            <a-layout-content
                :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px' }"
            >
               <router-view/>
            </a-layout-content>
            </a-layout>
        </a-layout>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "Layout",
        data() {
            return {
                agentProfile:{}
            };
        },
        components:{
           
        },
        computed: {
            ...mapGetters(['userDetails']),
            displayUsername(){
                let name = `${this.userDetails?.first_name} ${this.userDetails?.last_name}`
                return name
            }
        },
        methods:{
            ...mapActions(['logout']),
            OnSelect({ key }){
                // console.log("key |", key)
                this.$router.push(`/${key}`).catch(()=>{});
            },

            handlleLogout(){
                this.logout();
            }
        },
        created(){
            // if(this.IsAgentProfileAvailable){
            //     this.agentProfile = this.IsAgentProfileAvailable
            // }
        }
        
    }
</script>

<style scoped>

.ant-layout {
    display: flex;
    flex: auto;
    height: 100vh;
    background: #f0f2f5;
}

.menuIcon{
    font-size: 22px;
}
.ant-layout-sider {
    position: relative;
    min-width: 0;
    background: #001529;
    transition: all 0.2s;
}

.img_size{
    max-width: 75%;
    padding-bottom: 2px;
}
.overview{
    margin-top: 30px;
}
.retail{
    margin-top: 31px;
    pointer-events: none;
}


.ant-menu {
    box-sizing: border-box;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    margin-bottom: 0;
    padding-left: 16px;
    padding-right: 16px;
    color:#ccccccad;
    line-height: 23px;
    list-style: none;
    background: #001529;
    outline: none;
    transition: background 0.3s, width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    zoom: 1;
}

.ant-menu-submenu >>> .ant-menu {
    background-color: #001529;
    border-radius: 4px;
    color: #ccccccad;
}


.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background: #ded7d745;
    color: #ffffff;
    border-radius: 5px;
    padding-top: 4px;
}
.ant-menu-submenu-selected {
    color: #ccccccad;
}
/* .subReport:hover{
    color: #ccccccad;
} */




.subReport >>> .ant-menu-item:active, .ant-menu-submenu-title:active {
    background: none;
    color: #fff;
}


.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left {
    border-right:none
}

.ant-menu-inline .ant-menu-selected::after, .ant-menu-inline .ant-menu-item-selected::after {
    opacity: 0;
}
/* 
.subReport > .ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover {
    color:#ffffff;
} */
#vueLayout .logo {
  height: 32px;
  margin: 16px;
  font-size: 24px;
  text-align: center;
  line-height: 45px;
  color: #fff;
}

</style>



