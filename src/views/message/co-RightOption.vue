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
    prop: {
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
        // 右击类型，message为聊天框右击，chat为聊天记录右击
        type: {
            type: Array,
            default: "message"
        }
    },
	data() {
		return {
		}
	},
	methods: {
        setOption (val) {
            // 撤回
            if (val.type === "withdraw") {
                // 删除数据库中的消息
                this.$dispatch("setRightOption")
                .then()
                .catch(err => {
                    // 错误捕获
                });
                this.$emit("withdraw", val);
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
