import Vue from 'vue';

export default {
    CREATE_ACCOUNT(state, payload) {
        state.accounts[payload.account.id] = payload.account;
    },

    UPDATE_ACCOUNT(state, payload) {
        state.accounts[payload.account.id] = payload.account;
    },
    UPDATE_ACCOUNT_BALANCE(state, payload) {
        state.accounts[payload.account.id].balance += parseFloat(payload.amount);
    },
    DELETE_ACCOUNT(state, payload) {
        Vue.delete(state.accounts, payload.account.id);
    },

    LOAD_ACCOUNTS(state, payload) {
        state.accounts = payload;
    }
};