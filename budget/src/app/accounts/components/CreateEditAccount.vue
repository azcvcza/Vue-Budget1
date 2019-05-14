<template>
 <div id="accounts-create-edit-view">
 You can create and edit accounts with me, yippee!

 <router-link :to="{ name: 'accountsListView' }"><span class="tag is-link">View all accounts</span></router-link>
	
 <form class="form " @submit.prevent="saveNewAccount">
 
 <div class="control">
	 <label for="name" class="label">Name</label>
 <input type="text" class="input" name="name" v-model="newAccount.name">
 </div>
 
 <div class="control has-addons">
	 <label for="category" class="label">Category</label>
 <span class="select">
 <select name="category" v-model="newAccount.category">
 <option v-for="value, key in categories" :value="key">{{ value }}</option>
 </select>
 </span>
 </div>
 
 <div class="control">
	 <label for="balance" class="label">Balance</label>
 <input type="text" class="input" name="balance" v-model="newAccount.balance">
 </div>
 <div class="field is-grouped">
  <div class="control">
 <button class="button is-link">Submit</button>
 </div>
 <div class="control">
 <router-link :to="{ name: 'accountsListView' }"><button class="button is-danger">Cancel</button></router-link>
 </div>
</div>
 
 

 </form>
 </div>
</template>

<script>
import { mapActions } from 'vuex';
import { CATEGORIES } from '../../../const';

export default {
 name: 'accounts-create-edit-view',

 data: () => {
 return {
 categories: CATEGORIES,
 newAccount: {}
 };
 },

 methods: {
 ...mapActions([
 'addAccount'
 ]),

 saveNewAccount () {
 this.addAccount(this.newAccount).then(() => {
 this.newAccount = {};
 });
 }
 }
};
</script>

<style scoped lang='scss'>
#accounts-create-edit-view {
}
</style>