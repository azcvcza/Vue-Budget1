<template>
	<div id="accounts-list-view" class="container">
		I'm a list of accounts!
		<router-link :to="{ name: 'createEditAccount' }">
			<span class="tag is-link">Add an account</span>
		</router-link>
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
						<td>{{account.name}}</td>
						<td>
							<span class="tag is-small is-info">{{ categories[account.category] }}</span>
						</td>
						<td>${{account.balance}}</td>
						<td>
							<router-link :to="{ name: 'editAccount', params: { accountId: account.id } }">
								<span class="tag is-link">修改</span>
							</router-link>
							<a @click="confirmDeleteAccount(account)">
								<span class="tag is-danger">删除</span>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import { CATEGORIES } from "../../../const";

	export default {
		name: "accounts-list-view",

		data() {
			return {
				categories: CATEGORIES
			};
    },
    mounted() {
      this.loadAccounts();
    },
		methods: {
			// this imports our vuex actions and maps them to methods on this component
			...mapActions(["deleteAccount","loadAccounts"]),

			confirmDeleteAccount(account) {
				// note that these are backticks and not quotation marks
				if (confirm(`Are you sure you want to delete ${account.name}?`)) {
					this.deleteAccount(account);
				}
			}
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