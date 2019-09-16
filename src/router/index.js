import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: "/message",
            component: resolve => require(["@/views/message/Message.vue"], resolve),
        },
        {
            path: "/message/privateChat/:chatId",
            component: resolve => require(["@/views/message/PrivateChat.vue"], resolve),
        }
    ]
});

export default router;
