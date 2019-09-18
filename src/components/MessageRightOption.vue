<template>
    <!-- 消息列表右击设置 -->
    <div class="wrapper" v-show="visible">
        <ul class="option">
            <li
                class="option-item"
                @click.prevent="setOption('top')">
                {{ options.isTop ? "取消置顶" : "置顶" }}
            </li>
            <li
                class="option-item"
                @click.prevent="setOption('disturb')">
                {{ options.isDisturb ? "开启新消息提醒" : "消息免打扰" }}
            </li>
            <li
                class="option-item"
                @click.prevent="setOption('changeName')">
                修改群名称
            </li>
            <li
                class="option-item"
                @click.prevent="setOption('delete')">
                删除聊天
            </li>
        </ul>
    </div>
</template>

<script>
export default {
	name: "MessageRightOption",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        chatId: {
            type: Number,
            default: null
        }
    },
	data() {
		return {}
	},
	methods: {
        setOption (type) {
            if (type === "delete") {
                this.$emit("delete", this.chatId);
            }
            // 修改配置
            this.$dispatch("setMessageRightOption", {
                type: type,
                chatId: this.chatId
            }).then()
            .catch(() => {
                // 错误捕获
            });
            // todo 界面修改设置
            this.onClose();
        },
        onClose () {
            this.$emit("update:visible", false);
        }
	}
}
</script>

<style lang="less" scoped>
</style>
