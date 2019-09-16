import Vue from "vue";
import Vuex from "vuex";
import request from "./modules/request";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userInfo: {},
        lang: "ch"
    },
    mutations: {
        userInfo (state, value) {
            state.userInfo = value;
        },
        language (state, value) {
            state.lang = value;
        }
    },
    actions: {
        loginSuccess ({ commit }, obj) {
            commit("userInfo", obj);
        },
        setLanguage ({ commit }, obj) {
            commit("language", obj);
        },
        // 检测是否登录
        async checkLoginState ({ dispatch }) {
            let userInfo = null;
            try {
                userInfo = await dispatch("getUserInfo");
                dispatch("loginSuccess", userInfo.data);
                return
            } catch (e) {
                // 错误捕获
            }
        }
    },
    modules: {
        request
    }
});
export default store;
