<template>
	<div id="accounts-create-edit-view">
		<nav class="level">
			<div class="level-left">
				<h4 class="title is-2">Add Account</h4>
			</div>
			<div class="level-right">
				<div class="level-item">
					<router-link :to="{ name: 'accountsList' }">
						<span class="tag is-link">View all accounts</span>
					</router-link>
				</div>
			</div>
		</nav>

		<form class="form" @submit.prevent="processSave">
			<div class="control">
				<label for="name" class="label">Name</label>
				<input type="text" class="input" name="name" v-model="selectedAccount.name">
			</div>

			<div class="control has-addons">
				<label for="category" class="label">Category</label>
				<span class="select">
					<select name="category" v-model="selectedAccount.category">
						<option v-for="value, key in categories" :value="key">{{ value }}</option>
					</select>
				</span>
			</div>

			<div class="control">
				<label for="balance" class="label">Balance</label>
				<input type="text" class="input" name="balance" v-model="selectedAccount.balance">
				<span
					class="help"
				>Use negative values for accounts that carry a negative balance, e.g. credit cards</span>
				<span class="icon">
					<i class="fa fa-usd" aria-hidden="true"></i>
				</span>
			</div>
			<div class="field is-grouped">
				<div class="control">
					<button class="button is-link" v-if="!this.editing">Submit</button>
					<button class="button is-link" v-else>Update</button>
				</div>
				<div class="control">
					<router-link :to="{ name: 'accountsList' }">
						<button class="button is-danger">Cancel</button>
					</router-link>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import { CATEGORIES } from "../../../const";

	export default {
		name: "accounts-create-edit-view",
		props: ["accountId"],
		data: () => {
			return {
				categories: CATEGORIES,
				selectedAccount: {},
				editing: false
			};
		},

		mounted() {
			if (this.accountId) {
				this.loadAccount();
			}
		},

		methods: {
			...mapActions(["createAccount", "updateAccount", "loadAccounts"]),

			resetAndGo() {
				this.selectedAccount = {};
				this.$router.push({ name: "accountsList" });
			},

			saveNewAccount() {
				this.createAccount(this.selectedAccount).then(() => {
					this.resetAndGo();
				});
			},

			saveAccount() {
				this.updateAccount(this.selectedAccount).then(() => {
					this.resetAndGo();
				});
			},

			processSave() {
				this.editing ? this.saveAccount() : this.saveNewAccount();
			},
			loadAccount() {
				let vm = this;
				this.loadAccount().then(() => {
					let selectedAccount = vm.getAccountById(vm.accountId);
					if (selectedAccount) {
						vm.editing = true;
						vm.selectedAccount = Object.assign({}, selectedAccount);
					}
					// TODO: the object does not exist, how do we handle this scenario?
				});
			}
		},

		computed: {
			...mapGetters(["getAccountById"])
		},
		watch: {
			accountId(newId) {
				if (newId) {
					this.loadAccount();
				}
				this.editing = false;
				this.selectedAccount = {};
			}
		}
	};
</script>

<style scoped lang='scss'>
#accounts-create-edit-view {
}
</style>