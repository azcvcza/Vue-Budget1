    import * as actions from './actions';
    import mutations from './mutations';
    import getters from './getter';

    const state = {
        transactions: [],
        businesses: [],
    };

    export default {
        getters,
        state,
        actions,
        mutations
    };