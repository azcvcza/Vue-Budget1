<template>
  <div id="budgets-list">
   
		<nav class="level">
			<div class="level-left">
				<h4 class="title is-2">Budgets</h4>
			</div>
			<div class="level-right">
				<div class="level-item">
					<router-link :to="{name:'createBudget'}"><button class="button is-primary"> Add a budget+</button></router-link>
    
				</div>
			</div>
		</nav>
    
    
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <tr>
        <th>月份</th>
        <th>budget</th>
        <th>花费</th>
        <th>收入</th>
        <th>Balance</th>
        <th>编辑</th>
      </tr>
      <tbody>
        <tr v-for="budget,key in sortedBudgets">
          <td class="">{{budget.month | moment('MMMM YYYY')}}</td>
          <td class="">${{budget.budgeted}}</td>
          <td class="">${{budget.spent}}</td>
          <td class="">${{budget.income}}</td>
          <td class="">${{ budget.budgeted - budget.spent}}</td>
          <td class=""><router-link :to="{ name: 'updateBudget', params: { budgetId: budget.id } }"><button class="button is-primary">Edit</button></router-link></td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { moment } from '../../../filter';
export default {
  name: 'budgets-list',
  filters: {
    moment
  },
  mounted () {
    this.loadBudgets();
  },
  methods: {
    ...mapActions([
      'loadBudgets'
    ])
  },
  computed: {
    ...mapState({
      'budgets': state => state.budgets.budgets
    }),
    sortedBudgets () {
      let sortedKeys = Object.keys(this.budgets).sort((a, b) => {
        return this.budgets[b].month - this.budgets[a].month;
      });
      return sortedKeys.map((key) => {
        return this.budgets[key];
      });
    }
  }
};
</script>
<style scoped lang='scss'>
#budgets-list-view {
	background-color: #0000ff;
	color: #ffffff;
}
</style>