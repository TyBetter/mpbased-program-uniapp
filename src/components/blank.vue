<template>
    <div class="container">
        <p>暂时没有{{text}}</p>
    </div>
</template>

<script>
export default {
    name: "blank",
    props: {
        text: {
            type: String,
            value: ""
        }
    },
    data() {
        return {
            
        }
    },
}
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        width: 100%;
        height: 80rpx;
        padding: 15rpx 0 15rpx 0;
        justify-content: center;
        align-items: center;
        margin-top: 60rpx;
        border-top: 0.5px solid rgba(129, 129, 129, 0.822);

        p {
            font-size: 25rpx;
            color: rgb(155, 155, 155);
            font-weight: 200;
            letter-spacing: 1px;
        }
    }
</style>