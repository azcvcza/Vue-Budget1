<template>
	<div id="budget-create-edit-view">
		<nav class="level">
			<div class="level-left">
				<h1 class="title is-2">Add Budget</h1>
			</div>
			<div class="level-right">
				<div class="level-item">
					<router-link :to="{ name: 'budgetsList' }" class="button">View all budgets &#8630;</router-link>
				</div>
			</div>
		</nav>
		<div class="tile is-ancestor">
			<div class="tile is-child notification is-primary">
				<div v-if="editing">
					<p class="title">now is editing budget</p>
					<nav class="level">
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Budgeted</p>
								<p class="title">${{ selectedBudget.budgeted }}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Spent</p>
								<p class="title">${{ selectedBudget.spent }}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Income</p>
								<p class="title">${{ selectedBudget.income }}</p>
							</div>
						</div>
					</nav>

					<table class="table is-bordered">
						<thead>
							<tr>
								<th>Category</th>
								<th>Budgeted</th>
								<th>Spent</th>
								<th>Remaining</th>
							</tr>
						</thead>
						<tbody>
							<template>
								<!--v-for="value, key in selectedBudget.budgetCategories" this doesn't work-->
            <component
              :is="budgetCategoryComponent(value)"
              v-model="value"
              v-on:update-budget-category="saveBudgetCategory"
              v-on:edit-budget-category="activeBudgetCategory = value"
            ></component>
          </template>
							<CreateUpdateBudgetCategory v-on:add-budget-category="addBudgetCategory"></CreateUpdateBudgetCategory>
						</tbody>
						<tfoot>
							<tr>
								<td></td>
								<td>${{ selectedBudget.budgeted }}</td>
								<td>${{ selectedBudget.spent }}</td>
								<td>${{ selectedBudget.budgeted - selectedBudget.spent }}</td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div v-else>
					<p class="title">now is creating budget</p>
				</div>
			</div>
			<div class="tile is-child notification is-info">
				<form class="form" @submit.prevent="processSave">
					<label for="month" class="label">Month</label>
					<p class="control">
						<datepicker
							name="month"
							input-class="input"
							format="MMMM yyyy"
							v-model="selectedBudget.month"
						></datepicker>
						<span class="icon">
							<i class="fa fa-calendar" aria-hidden></i>
						</span>
					</p>
					<p class="control">Budgeted: ${{ selectedBudget.budgeted }}</p>
					<p class="control">Spent: ${{ selectedBudget.spent }}</p>
					<p class="control">Income: ${{ selectedBudget.income }}</p>
					<p class="help" v-if="!editing">To add budget items you must first save the budget.</p>
					<div class="field is-grouped">
						<div class="control">
							<button class="button is-link">Submit</button>
						</div>
						<div class="control">
							<router-link :to="{ name: 'budgetsList' }">
								<button class="button is-warning">Cancel</button>
							</router-link>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import BudgetCategory from "./BudgetCategory";
	import { mapActions, mapGetters } from "vuex";
	import Datepicker from "vuejs-datepicker";
	import CreateUpdateBudgetCategory from "./CreateUpdateBudgetCategory";
	export default {
		name: "budget-create-edit-view",
		components: {
			Datepicker,
			CreateUpdateBudgetCategory,
			BudgetCategory
		},
		data: () => {
			return {
				selectedBudget: {},
				editing: false,
				activeBudgetCategory: null
			};
		},
		mounted() {
			if ("budgetId" in this.$route.params) {
				this.loadBudgets().then(() => {
					let selectedBudget = this.getBudgetById(this.$route.params.budgetId);
					if (selectedBudget) {
						this.editing = true;
						this.selectedBudget = Object.assign({}, selectedBudget);
					}
				});
			}
		},
		methods: {
			...mapActions([
				"createBudget",
				"updateBudget",
				"loadBudgets",
				"createBudgetCategory",
				"updateBudgetCategory"
			]),
			resetAndGo() {
				this.selectedBudget = {};
				this.$router.push({ name: "budgetsList" });
			},
			saveNewBudget() {
				this.createBudget(this.selectedBudget)
					.then(() => {
						this.resetAndGo();
					})
					.catch(err => {
						alert(err);
					});
			},
			saveBudget() {
				this.updateBudget(this.selectedBudget)
					.then(() => {
						this.resetAndGo();
					})
					.catch(err => {
						alert(err);
					});
			},
			processSave() {
				this.$route.params.budgetId ? this.saveBudget() : this.saveNewBudget();
			},
			addBudgetCategory(budgetCategory) {
				if (!budgetCategory.category) return;
				this.createBudgetCategory({
					budget: this.selectedBudget,
					budgetCategory: {
						category: budgetCategory.category.id,
						budgeted: budgetCategory.budgeted,
						spent: 0
					}
				}).then(() => {
					this.selectedBudget = Object.assign(
						{},
						this.getBudgetById(this.$route.params.budgetId)
					);
				});
			},
			saveBudgetCategory(budgetCategory) {
				// format it how our action expects
				budgetCategory.category = budgetCategory.category.id;
				this.updateBudgetCategory({
					budget: this.selectedBudget,
					budgetCategory: budgetCategory
				}).then(() => {
					this.selectedBudget = Object.assign(
						{},
						this.getBudgetById(this.$route.params.budgetId)
					);
				});
			},
			budgetCategoryComponent(budgetCategory) {
				return this.activeBudgetCategory &&
					this.activeBudgetCategory === budgetCategory
					? "create-update-budget-category"
					: "budget-category";
			}
		},
		computed: {
			...mapGetters(["getBudgetById", "getCategoryById"])
		}
	};
</script>