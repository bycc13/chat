<template>
    <div class="option-wrapper" v-show="visible">
        <ul>
            <li
                v-for="item in options"
                :key="item.id"
                class="option-item"
                @click.prevent="setOption(item)">
                {{ item.name }}
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
        options: {
            type: Array,
            default: () => {
                return [];
            }
        },
        chatId: {
            type: Number,
            default: null
        },
        // 右击类型，message为聊天框右击，chat为聊天记录右击
        type: {
            type: String,
            default: "message"
        }
    },
	data() {
		return {}
	},
	methods: {
        setOption (option) {
            // 撤回
            if (option.type === "withdraw") {
                // 删除数据库中的消息
                this.$dispatch("setRightOption")
                .then()
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
