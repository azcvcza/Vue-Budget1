export const addAccount = ({ commit }, data) => {
    commit('ADD_ACCOUNT', { accounts: data });
};