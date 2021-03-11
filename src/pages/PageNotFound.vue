<template>
    <div>
       <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
            <template #extra>
            <a-button @click="showOverPage" style="width: 400px;margin:40px;height: 50px;border-raduis:5px; background: #001529; color:#fff;">
                Go Back Home
            </a-button>
            </template>
        </a-result>
    </div>
</template>

<script>
    export default {
        name: "PageNotFound",
        methods:{
            showOverPage(){
                this.$router.push(`/overview`).catch(()=>{});
            }
        }
    }
</script>

<style scoped>

</style>
