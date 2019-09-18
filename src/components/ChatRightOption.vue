<template>
    <!-- 聊天记录右击设置 -->
    <div class="option-wrapper" v-show="visible">
        <ul class="option">
            <li
                class="option-item"
                @click.prevent="setOption('copy')">
                复制
            </li>
            <li
                class="option-item"
                @click.prevent="setOption('forward')">
                转发
            </li>
            <li
                class="option-item"
                @click.prevent="setOption('collection')">
                收藏
            </li>
            <li
                class="option-item"
                @click.prevent="setOption('withdraw')">
                撤回
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
	name: "co-RightOption",
    props: {
        visible: {
            type: Boolean,
            default: false
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
        setOption (option) {
            // 收藏、撤回、删除需要修改数据库
            const reqArr = ["collection", "withdraw", "delete"]
            if (reqArr.includes(option.type)) {
                this.$dispatch("setRightOption", {
                    type: option.type
                }).then()
                .catch(() => {
                    // 错误捕获
                });
                this.$emit("withdraw", this.chatId);
            }
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
