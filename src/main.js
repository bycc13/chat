import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./init.js";

Vue.store = store;
Vue.router = router;

Vue.dispatch = store.dispatch;
Vue.prototype.$dispatch = store.dispatch;

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app");
