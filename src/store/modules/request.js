import Vue from "vue";

const actions = {
    // 获取用户信息
    async getUserInfo ({ state, commit, dispatch }) {
        return await Vue.axios.get("/user/getUserInfo");
    },
    // 获取消息列表
    async getMessages ({ state, commit, dispatch }, obj = {}) {
        return await Vue.axios.get("/message/getMessages");
    },
    // 右键修改聊天设置
    async setRightOption ({ state }, obj = {}) {
        return await Vue.axios.post("/message/getMessages", {
            params: {
                code: obj.code
            }
        });
    }
};

const defaultState = {
    requesting: false
};

const getters = {};

const mutations = {
    requesting: (state, value) => {
        state.requesting = value;
    }
};

export default {
    state: defaultState,
    getters,
    mutations,
    actions
};