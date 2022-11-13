const AccountModule = {
    state: {
        account: {
            _id: "",
            email: "",
            username: "",
            password: "",
        }
  },
    getters: {
        getAccountInfor(state){
            return state.account;
        }
    },

    mutations: {
        SET_ACCOUNT(state, accountInfor){
            //state.account = accountInfor;
            state.account._id = accountInfor._id;
            state.account.username = accountInfor.username;
            state.account.email = accountInfor.email;
            state.account.password = accountInfor.password;
        }
    },
    actions: {

    }
}

export default AccountModule;