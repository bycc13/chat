<template>
    <!-- 发送消息组件 -->
    <div class="wrapper">
        <div class="send-box">
			<textarea
				v-model="inputText"
				@keydown.enter.prevent="sendTex"
				ref="message">
            </textarea>

            <div class="send-box__btn">
                <div @click.prevent="isShowTool = true">+</div>
                <p
                    class="btn btn-send"
                    :class="{'enable': inputText !== ''}"
                    @click="sendTex">
                    发送
                </p>
            </div>
        </div>

        <!-- todo:发送内容工具，可发送图片录像等  -->
        <send-tool
            :visible.sync="isShowTool">
        </send-tool>
    </div>
</template>

<script>
// todo: 动态获取后可替换
import DATA from "@/config/data.json";
import SendTool from "@/components/SendTool";

export default {
    name: "SendBox",

	computed: {},

    props: {
        userChatId: {
            type: Number,
            default: null
        },
        showTool: {
            type: Boolean,
            default: false
        }
    },

	data() {
		return {
			inputText: "",
            isShowTool: false
		}
	},

	components: {
        SendTool
    },

	methods: {
		//发送信息
		sendTex () {
			const data = {
                ...DATA.USER_INFO,
                type: "text",
                isMe: true,
				from: this.$store.state.userInfo.userId, // 自己id
				to: this.userChatId, // 对方id
				message: this.inputText, //消息内容
				time: Date.parse(new Date()) / 1000 // 发送时间
			};
            // todo:向数据库添加信息
			this.$dispatch("senMessage", {
				obj: data
			}).then()
			.catch(() => {
				// 错误捕获
			});
            this.$emit("successSend", data);
		}
	}
}
</script>

<style lang="less" scoped>
    .send-box {
        display: flex;
        justify-content: space-between;
        padding: .2rem;
    }
</style>
