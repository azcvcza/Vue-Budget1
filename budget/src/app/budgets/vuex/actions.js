import moment from 'moment';
import { guid } from '../../../utils';
import { saveBudget, fetchBudgets } from '../api';
const verifyUniqueMonth = (budgets, budget) => {
    let month = moment(budget.month);
    return !Object.values(budgets).find((o) => {
        if (o.id === budget.id) {
            return false;
        }
        return month.isSame(o.month, 'month');
    })
}

export const createBudget = ({ commit }, data) => {
    if (!verifyUniqueMonth(state.budgets, data)) {
        return Promise.reject(new Error('A budget already exists for this month.'));
    }

    let id = guid();
    let budget = Object.assign({ id: id }, data);

    commit('CREATE_BUDGET', { budget: budget });
    saveBudget(budget).then((value) => {
        // we saved the budget, what's next?
    });
};

export const updateBudget = ({ commit }, data) => {
    if (!verifyUniqueMonth(state.budgets, data)) {
        return Promise.reject(new Error('A budget already exists for this month.'));
    }

    commit('UPDATE_BUDGET', { budget: data });
    saveBudget(data);
};

export const loadBudgets = (state) => {
    if (!state.budgets || Object.keys(state.budgets).length === 0) {
        return fetchBudgets().then((res) => {
            state.commit('LOAD_BUDGETS', res);
        });
    }
};