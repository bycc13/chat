<template>
    <!-- 发送消息工具 -->
    <div class="wrapper" v-show="visible">
        <ul class="tool">
            <li class="tool-item" @click="onImage">添加图片</li>
            <li class="tool-item" @click="onTakePhoto">拍照</li>
            <!-- 此处添加其他额外功能 -->
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SendTool",
        props: {
            visible: {
                type:Boolean,
                default: false
            }
        },
        data () {
            return {};
        },
        methods: {
            onImage () {
                // 选择图片
            },
            onTakePhoto () {
                // 拍照
            }
            
        }
    }
</script>

<style lang="less" scoped>
    .tool {
        position: fixed;
        height: 3rem;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        padding: .2rem;
        background: #eee;
    }
</style>