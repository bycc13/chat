import Vue from "vue";

const messageRoutes = [
    {
        path: "message",
        component: resolve => require(["@/views/message/index.vue"], resolve),
    },
    {
        path: "message/privateChat",
        component: resolve => require(["@/views/mall/index.vue"], resolve),
    }
];

export default messageRoutes;
