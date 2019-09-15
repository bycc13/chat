import Vue from "vue";
import Vuex from "vuex";
import request from "./modules/request";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        userInfo (state, value) {
            state.userInfo = value;
        }
    },
    actions: {
        loginSuccess ({ commit }, obj) {
            commit("userInfo", obj);
        },
        // 检测是否登录，范围isLogined标识，true为已登陆，false为未登录
        async checkLoginState ({ state, commit, dispatch }, obj) {
            let userInfo = null;
            try {
                userInfo = await dispatch("getUserInfo");
                dispatch("loginSuccess", userInfo.data);
                return isLogined = true;
            } catch (e) {
                return isLogined = false;
            }
        }
    },
    modules: {
        request
    }
});
export default store;
