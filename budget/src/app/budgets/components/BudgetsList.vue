<template>
  <div id="budgets-list">
    I'm a list of budgets!
    <router-link to="{name='createBudget'}">Add a budget</router-link>
    <router-link to="{name='accountListView'}">View accounts</router-link>
    <table>
      <tr>
        <th>月份</th>
        <th>信息</th>
        <th>花费</th>
        <th>收入</th>
        <th>编辑</th>
      </tr>
      <tbody>
        <tr v-for="budget,key in budgets">
          <td>{{budget.month}}</td>
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
import {mapState,mapActions} from 'vuex';
export default {
  name: 'budgets-list',
  
  mounted() {
     this.loadBudgets();
  },
  methods:{
    ...mapActions([
      'loadBudgets'
    ])
  },
  computed: {
    ...mapState({
      'budgets':state=>state.budgets.budgets
    })
  },
};
</script>

<style scoped lang='scss'>
#budgets-list-view {
	background-color: #0000ff;
	color: #ffffff;
}
</style>