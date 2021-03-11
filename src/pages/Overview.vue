<template>
    <div>
    <a-result :title="displayUsername">
        <template #icon>
        <a-icon type="smile" theme="twoTone" />
        </template>
        <template #extra>
        </template>
    </a-result>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: "Overview",
        computed:{
            ...mapGetters(['userDetails']),
            displayUsername(){
                let name = `${this.userDetails?.first_name} ${this.userDetails?.last_name}`
                let title = `Welcome ${name}, to Nsia Employee App`
                return title
            }
        }
    }
</script>

<style scoped>

</style>