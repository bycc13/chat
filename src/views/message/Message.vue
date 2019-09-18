<template>
    <!-- 消息列表 -->
    <div class="wrapper">
        <!-- 消息列表为空 -->
        <div class="empty" v-if="isEmpty">none</div>

        <ul class="message" v-else>
            <li
                class="message-item"
                v-for="item in messages"
                :key="item.id"
                @click.right="setOption(item)"
                @click="routeToChat(item)">
                <div :class="['message-item__avatar', item.onTop ? 'on-top' : '']">
                    <img :src="item.avatar" alt="群头像" class="img">
                    <span class="unread" v-if="item.unread">{{item.unread}}</span>
                </div>

                <div class="message-item__content">
                    <div class="top-line">
                        <span class="name">{{item.name}}</span>
                        <span class="time">{{item.time}}</span>
                    </div>

                    <p class="bottom-line">
                        {{item.message}}
                    </p>
                </div>
            </li>
        </ul>

        <!-- 右击设置 -->
        <message-right-option
            :visible.sync="optionVisible"
            :options="rightOption"
            type="out"
            @delete="deleteChat">
        </message-right-option>
    </div>
</template>

<script>
import MessageRightOption from "@/components/MessageRightOption";
// todo: 动态获取后可替换
import DATA from "@/config/data.json";

export default {
	name: "Message",
	data() {
		return {
            optionVisible: false,
            messages: [],
			rightOption: {}
		}
	},
    components: {
        MessageRightOption
    },
    computed: {
        isEmpty () {
            return this.messages.length === 0 ? true : false;
        }
    },
	methods: {
		routeToChat (val) {
			const path = val.type === "private" ? `/privateChat/${val.chatId}` : `/groupChat/${val.chatId}`
			this.$router.push(path)
		},
		setOption(val) {
			this.rightOption = val.options;
            this.optionVisible = true;
        },
        deleteChat (id) {
            const index = this.messages.findIndex((item) => {
				item.chatId === id;
			});
			this.messages.splice(index, 1);
        },
        getMessages () {
            this.messages = DATA.MESSAGES;
            // 动态赋值
            this.$dispatch("getMessages").then(res => {
                this.messages = JSON.parse(JSON.stringify(res.data));
            }).catch(() => {
                // 错误捕获
            });
        }

	},
	created() {
        this.getMessages();
	}
}
</script>

<style lang="less" scoped>
.wrapper {
    padding-top: .2rem;
    background-color: #fff;
    .message {
        background-color: #fff;
        padding-bottom: .5rem;
        &-item {
            display: flex;
            margin: 0 .2rem;
            height: 1.3rem;
            border-bottom: 1px solid #eee;
            &__avatar {
                position: relative;
                .img {
                    width: 1rem;
                    height: 1rem;
                    margin-right: .05rem;
                    border-radius: 50%;
                }
                .unread {
                    position: absolute;
                    right: 0;
                    top: -.1rem;
                    width: .4rem;
                    height: .4rem;
                    background: red;
                    border-radius: 50%;
                    color: #fff;
                    font-size: .3rem;
                }
            }
            &__content {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: .2rem;
                width: calc(~"100% - 1.1rem");
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                .top-line,
                .bottom-line {
                    display: flex;
                    justify-content: space-between;
                }
                .top-line {
                    margin-bottom: .1rem;
                    font-size: .4rem;
                }
                .bottom-line {
                    font-size: .2rem;
                    line-height: .3rem;
                }
            }
        }
    }
}
</style>
