<template>
	<div id="navigation-view">
		<ul>
			<li>
				<router-link :to="{ name: 'accountsList' }">Accounts</router-link>
				<ul>
					<li v-for="account in accounts">
						<router-link :to="{ name: 'editAccount', params: { accountId: account.id } }">
						|	name:{{ account.name }}-<span>${{ account.balance }}</span>  |
						</router-link>
					</li>
				</ul>
			</li>
			<li>
				<router-link :to="{ name: 'budgetsList' }">Budgets</router-link>
			</li>
			<li><router-link :to="{ name: 'transactionsList' }">Transactions</router-link></li>
		</ul>
	</div>
</template>

<script>
	import { mapActions, mapState } from "vuex";
	export default {
		name: "navigation",
		mounted() {
			this.loadAccounts();
		},
		methods: {
			...mapActions(["loadAccounts"])
		},
		computed: {
			...mapState({
				accounts: state => state.accounts.accounts
			})
		}
	};
</script>

<style scoped lang='scss'>
a {
	color: #ffffff;
}
ul {
	margin-top: 20px;
	li {
		font-size: 1em;
		border: none;
		span {
			
		}
	}
}
</style>