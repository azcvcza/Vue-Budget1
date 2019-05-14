<template>
 <div id="accounts-create-edit-view">
 You can create and edit accounts with me, yippee!
 </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
 name: 'accounts-create-edit-view',

 methods: {
 ...mapActions([
 'addAccount'
 ])
 }
};
</script>

<style scoped lang='scss'>
#accounts-create-edit-view {
}
</style>