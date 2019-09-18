<template>
    <div class="wrapper">
        <div :class="['chat', isMe ? 'is-me' : '']" >
            <img
                :src="chatInfo.avatar"
                class="chat-avatar">
            
            <div class="chat-content">
                <span
                    class="chat-content__name"
                    v-if="chatInfo.isShowName">
                    {{ chatInfo.userName }}
                </span>
                
                <img
                    v-if="chatInfo.type === 'image'"
                    :src="chatInfo.imageUrl"
                    class="chat-content__img"
                    @click="onPreview(chatInfo)">

                <div
                    class="chat-content__message"
                    v-else-if="chatInfo.type === 'text'">
                    <span>{{ chatInfo.message }}</span>
                </div>

                <div v-else-if="chatInfo.type === 'video'"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatItem",

        props: {
            chatInfo: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
    
        computed: {
            isMe () {
                // 判断当前聊天记录是不是自己
                // return this.chatInfo.userId === this.$store.state.userInfo.userId;
                return this.chatInfo.userId === 1;
            }
        },
    
        methods: {
            onPreview (item) {
                if (item.imageUrl) {
                    // 查看大图
                }
            },
            
        }
    }
</script>

<style lang="less" scoped>
    .chat {
        display: flex;
        padding: .2rem;
        border-bottom: 1px solid #eee;

        &-avatar {
            width: 1rem;
            height: 1rem;
            margin-right: .05rem;
            border-radius: 50%;
        }

        &-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            &__name {
                font-size: .4rem;
            }

            &__img {
                width: 3rem;
                height: 3rem;
            }

            &__message {
                font-size: .4rem;
            }
        }

        &.is-me {
            flex-direction: row-reverse;

            .chat-avatar {
                margin-left: .05rem;
            }
    
            .chat-content {
                align-items: flex-end;
            }
        }
    }
</style>