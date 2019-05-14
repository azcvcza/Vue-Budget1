<template>
	<div id="accounts-list-view"  class="container">
		I'm a list of accounts!
		<router-link :to="{ name: 'createEditAccount' }"><span class="tag is-link">Add an account</span></router-link>
		<div>
			<table class="table is-bordered is-striped is-hoverable is-fullwidth">
				<tr>
					<th>姓名</th>
					<th>种类</th>
          <th>花费</th>
					<th>编辑</th>
				</tr>
        <tbody>
          	<tr v-for="account,key in accounts">
					<td>
						{{account.name}}
						
					</td>
          <td><span class="tag is-small is-info">{{ categories[account.category] }}</span></td>
					<td>${{account.balance}}</td>
					<td></td>
				</tr>
        </tbody>
			
			</table>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { CATEGORIES } from "../../../const";

	export default {
		name: "accounts-list-view",

		data() {
			return {
				categories: CATEGORIES
			};
		},

		computed: {
			...mapState({
				accounts: state => state.accounts.accounts
			})
		}
	};
</script>

<style scoped lang='scss'>
#accounts-list-view {
	
}
</style>