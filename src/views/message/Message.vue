<template>
    <!-- 消息列表 -->
    <div class="wrapper">
        <!-- 消息列表为空 -->
        <div class="empty">none</div>

        <ul class="message">
            <li
                class="message-item"
                v-for="item in messages"
                :key="item.id"
                @click.right="setOption(item)"
                @click="routeToChat(item)">
                <div :class="['message-item__avatar', item.onTop ? 'on-top' : '']">
                    <img :src="item.group_avator" alt="群头像" class="img">
                    <span class="unread" v-if="item.unread">{{item.unread}}</span>
                </div>

                <div class="message-item__content">
                    <div>
                        <span>{{item.name}}</span>
                        <span>{{item.time}}</span>
                    </div>

                    <div class="message">
                        <span>{{item.message}}</span>
                        <!-- 免打扰图标 -->
                        <span></span>
                    </div>
                </div>
            </li>
        </ul>

        <right-oiption
            :visible.sync="optionVisible"
            :options="rightOption"
            type="out">
        </right-oiption>
    </div>
</template>

<script>
import RightOption from "./co-RightOption";

export default {
	name: "Message",
	data() {
		return {
            optionVisible: false,
            messages: [],
			rightOption: []
		}
	},
    components: {
        RightOption
    },
	methods: {
		routeToChat (val) {
			const path = val.type === "private" ? `/privateChat/${val.id}` : `/groupChat/${val.id}`
			this.$router.push(path)
		},
		setOption(val) {
			this.rightOption = val.options;
            this.optionVisible = true;
		},
		// // 获取私聊和群的消息
		// getMsgBySocket() {
		// 	socket.removeAllListeners('getPrivateMsg');
		// 	socket.removeAllListeners('getGroupMsg');
		// 	socket.on('getPrivateMsg', (data) => {
		// 		console.log('首页获取私聊消息', data);
		// 		data.type = 'private'
		// 		this.$store.commit('updateListMutation', data)
		// 	})
		// 	socket.on('getGroupMsg', (data) => {
		// 		console.log('首页获取群消息', data);
		// 		data.type = 'group'
		// 		this.$store.commit('updateListMutation', data)
		// 	})
		// }
        getMessages () {
            this.$dispatch("getMessages").then(res => {
                this.messages = JSON.parse(JSON.stringify(res.data));
            }).catch(err => {
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
    // height: 100vh;
    padding-top: 0.8rem;
    background-color: #fff;
    z-index: 1;
    ul {
        background-color: #fff;
        padding-bottom: 0.5rem;
        li {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            align-items: center;
            margin: 0 0.2rem;
            list-style-type: none;
            a {
                position: relative;
                .img {
                    width: 0.8rem;
                    height: 0.8rem;
                    margin-right: 0.04rem;
                    border-radius: 50%;
                    display: inline-block;
                }
                span {
                    font-size: 0.2rem;
                    border-radius: 50%;
                    padding: 0 0.088rem;
                    position: absolute;
                    top: 0.2rem;
                    left: 0.7rem;
                    color: #fff;
                    z-index: 2;
                }
                .private-unread {
                    background-color: red;
                }
                .group-unread {
                    background-color: #98d1f2;
                }
                //  ::after {
                //   content: "";
                //   width: 0.26rem;
                //   height: 0.26rem;
                //   display: inline-block;
                //   border-radius: 50%;
                //   background-color: red;
                //   position: absolute;
                //   left: -0.08rem;
                //   z-index: -1;
                // }
            }
            .content {
                display: inline-block;
                margin-left: 0.2rem;
                max-width: 80%;
                .title {
                    font-size: 0.32rem;
                    span {
                        font-size: 0.28rem;
                        color: #676767;
                        position: absolute;
                        right: 0.5rem;
                    }
                }
                .message {
                    color: #676767;
                    font-size: 0.24rem;
                    max-height: 0.72rem;
                    overflow: hidden;
                    position: relative;
                }
                .message :after {
                    content: "...";
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }
        }
    }
}
</style>
