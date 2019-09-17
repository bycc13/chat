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
        <div class="input-msg">
			<textarea
				v-model="inputText"
				@keydown.enter.prevent="sendMessage"
				ref="message"></textarea>
            <p
				class="btn"
				:class="{'enable':inputText!=''}"
				@click="sendMessage">
				{{ lang.send[$store.state.lang] }}
			</p>
        </div>

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
import ChatItem from "./co-ChatItem.vue";
import ChatRightOption from "@/components/ChatRightOption";
import { lang } from "@/config/constant";

export default {
    name: "GroupChat",

	components: {
		ChatItem,
		ChatRightOption
	},

	computed: {
		groupChatId () {
			return this.$route.query.chatId
		}
	},

	data() {
		return {
			inputText: '',
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
            this.$dispatch("getGroupChat", {
                chatId: this.chatId
            }).then(res => {
				this.chats = res.data;
			}).catch(() => {
                // 错误捕获
            });
		},
		//发送信息
		sendMessage () {
			const data = {
				from: this.$store.state.userInfo.userId, // 自己id
				to: this.groupChatId, // 对方id
				message: this.inputText, //消息内容
				time: Date.parse(new Date()) / 1000 // 发送时间
			}
			this.$dispatch("senMessage", {
				obj: data
			}).then()
			.catch(() => {
				// 错误捕获
			});
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
