<template>
  <tr class="budget-item">
    <!--
    {{BudgetCategoryValue}}
    -->
    <td><span class="subtitle is-5">{{ getCategoryById(BudgetCategoryValue.category).name }}</span></td>
    <td><span class="subtitle is-5">${{ BudgetCategoryValue.budgeted }}</span></td>
    <td><span class="subtitle is-5">${{ BudgetCategoryValue.spent }}</span></td>
    <td><span class="subtitle is-5">${{ BudgetCategoryValue.budgeted - BudgetCategoryValue.spent }}</span></td>
    <td><a class='button is-primary' @click="$emit('edit-budget-category')">Edit</a></td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'budget-item',
  props: ['BudgetCategoryValue'],
  mounted() {
    //console.log('in budgetcategory,get data :',this.props)
    // console.log('in budgetcategory,bcValue:',this.BudgetCategoryValue)
  },
  computed: {
    ...mapGetters(['getCategoryById'])
  }
};
</script>