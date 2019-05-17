<template>
  <div id="budgets-list">
    <h2>I'm a list of budgets!</h2>
    <router-link :to="{name:'createBudget'}"><button class="button is-light"> Add a budget</button></router-link>
    <router-link :to="{name:'accountsListView'}"><button class="button is-link">View accounts</button></router-link>
    <table class="table is-bordered is-striped is-hoverable is-fullwidth">
      <tr>
        <th>月份</th>
        <th>信息</th>
        <th>花费</th>
        <th>收入</th>
        <th>编辑</th>
      </tr>
      <tbody>
        <tr v-for="budget,key in sortedBudgets">
          <td>{{budget.month | moment('MMMM YYYY')}}</td>
          <td>{{budget.budgeted}}</td>
          <td>{{budget.spent}}</td>
          <td>{{budget.income}}</td>
          <td><router-link :to="{ name: 'updateBudget', params: { budgetId: budget.id } }">Edit</router-link></td>
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