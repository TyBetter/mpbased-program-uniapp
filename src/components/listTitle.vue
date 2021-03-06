
// 列表标题

<template>
    <div class="title">
        {{titleText}}列表
    </div>
</template>

<script>
export default {
    name: "listTitle",
    props: {
        titleText: {
            type: String,
            value: null
        }
    }
}
</script>

<style lang="less" scoped>
    .title {
        width: 100%;
        height: 240rpx;
        line-height: 240rpx;
        font-size: 60rpx;
        letter-spacing: 0.5px;
        padding-left: 50rpx;
        color: rgba(94, 150, 255, 0.842);
    }

</style>