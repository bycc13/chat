<template>
    <!-- 私聊 -->
    <div class="wrapper">
        <ul>
            <li
                v-for="item in chats"
                :key="item.id">
                <ChatItem @click.self.right="setOption(item)" :chatInfo="item"></ChatItem>
            </li>
        </ul>
        
		<!-- 发送消息 -->
		<send-box
			:userChatId="userChatId"
			@successSend="successSend">
		</send-box>

		<!-- 右击设置 -->
		<chat-right-option
			:visible.sync="optionVisible"
            :options="chatInfo.rightOption"
			:chatId="chatInfo.chatId"
            type="in"
            @withdraw="onWithdraw">
        </chat-right-option>
    </div>
</template>

<script>
import ChatItem from "@/components/ChatItem";
import ChatRightOption from "@/components/ChatRightOption";
import SendBox from "@/components/SendBox";
// todo: 动态获取后可替换
import DATA from "@/config/data.json";

export default {
    name: "PrivateChat",

	components: {
		ChatItem,
		ChatRightOption,
		SendBox
	},

	computed: {
		userChatId () {
			return this.$route.query.chatId
		}
	},

	data() {
		return {
			widthdrawInfo: "", // 撤回的信息
			optionVisible: false,
			chatInfo: {}, // 当前选中的聊天信息
			chats: [] // 聊天记录
		}
	},

	watch: {
		chats () {
			this.refresh();
		}
	},

	methods: {
		setOption (val) {
			this.chatInfo = val;
			this.optionVisible = true;
		},
		// 撤回
		onWithdraw (id) {
			const index = this.chats.findIndex((item) => {
				item.chatId === id;
			});
			// 保存撤回信息，供再次修改
			this.widthdrawInfo = this.chats[index];
			this.chats.splice(index, 1);
		},
		getChats () {
			// todo:动态获取后可替换
			this.chats = DATA.CHATS.records;
			// 动态获取聊天记录
            this.$dispatch("getPrivateChat", {
                chatId: this.chatId
            }).then(res => {
				this.chats = res.data;
			}).catch(() => {
                // 错误捕获
            });
		},
		// 信息发送成功
		successSend (val) {
			this.chats.push(val);
		},
		//将未读信息归零
		resetUnred() {
			this.$dispatch("resetUnred")
                .then()
                .catch(() => {
                    // 错误捕获
                });
		},
		// 消息置底
		refresh () {
			setTimeout(() => {
				window.scrollTo(0, document.body.scrollHeight + 10000)
			}, 0)
		}
	},
	created () {
		this.resetUnred();
		this.getChats();
	}
}
</script>

<style lang="less" scoped>
</style>
