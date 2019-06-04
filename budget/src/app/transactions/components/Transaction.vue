<template>
  <tr class="transaction">
    
    <td>
      <span class="subtitle is-5">{{ TransactionValue.date | moment('YYYY-MM-DD') }}</span>
    </td>
    <td><span class="subtitle is-5">{{ getBusinessById(TransactionValue.business).name }}</span></td>
    <td><span class="subtitle is-5">{{ getCategoryById(TransactionValue.category).name }}</span></td>
    <td><span class="subtitle is-5">{{ getAccountById(TransactionValue.account).name }}</span></td>
    <td><span class="subtitle is-5">{{ TransactionValue.note }}</span></td>
    <td><span class="subtitle is-5" v-if="TransactionValue.amount < 0">${{ TransactionValue.amount }}</span></td>
    <td><span class="subtitle is-5" v-if="TransactionValue.amount > 0">${{ TransactionValue.amount }}</span></td>
    <td><a class='button is-primary' @click.prevent="$emit('edit-transaction')">Edit</a></td>
  </tr>
</template>

<script>
import { moment } from '../../../filter';
import { mapGetters } from 'vuex';
export default {
  name: 'transaction',
  props: ['TransactionValue'],
  filters: {
    moment
  },
  
  computed: {
    ...mapGetters([
      'getCategoryById',
      'getAccountById',
      'getBusinessById'
    ])
  }
};
</script>