<template>
    <div id='qrCode'>
        <iframe id="role_permission" :src="ifUrl" width="100%" height="840px" style="overflow-y: auto;"></iframe>
    </div>
</template>

<script>
import Util from '../../script/util.js'
// import CommonData from '../../script/data.js'

export default {
    name: 'material',
    data() {
        return{
            ifUrl: Util.scrmUrl + 'welcome?token=' + localStorage.php_token+ '#/publicAccount/list'
        }
    },
    created:function(){
        this.ifUrl = this.ifUrl + '?php_token=' + localStorage.php_token;
    },
    methods: {
        
    }
}
</script>

<style scoped>
iframe{border: none;}

</style>