import Vue from "vue";

const actions = {
    // 获取用户信息
    async getUserInfo () {
        return await Vue.axios.get("/user/getUserInfo");
    },
    // 获取消息列表
    async getMessages () {
        return await Vue.axios.get("/message/getMessages");
    },
    // 获取消息列表
    async resetUnred (obj = {}) {
        return await Vue.axios.post(`/message/unred/${obj.chatId}`);
    },
    // 右键修改聊天设置
    async setRightOption (obj = {}) {
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