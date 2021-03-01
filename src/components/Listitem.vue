<template>
    <div class="container" @click="onItemClick">
        <h2 class="title">{{itemTitle}}</h2>
        <div class="content">
            <p class="brief">{{itemBrief}}</p>
            <p class="time">{{itemTime}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Listitem",
    props: {
        itemTitle: {
            type: String,
            value: "hello world"
        },
        itemBrief: {
            type: String ,
            value: "hello world"
        },
        itemTime: {
            type: String ,
            value: "2/12 12:12:12"
        },
        itemUrl: {
            type: String,
            value: "@/index/index"
        }

    },
    methods: {
        onItemClick: e => {
            uni.navigateTo({
                url: itemUrl,
                success: e => {
                    console.log("navigate successfully")
                },
                fail: error => console.log(error)
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .container {
        height: 290rpx;
        width: 100%;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        padding: 5rpx 15rpx 5rpx 15rpx;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        background-color: rgba(192, 192, 192, 0.205);
        box-sizing: border-box;
        border-radius: 5rpx;
        flex-direction: column;
        justify-content: flex-start;

        .title {
            font-size: 60rpx;
            width: 100%;
            height: 80rpx;
            padding-bottom: 3rpx;
            border-bottom: 0.5px solid rgba(129, 129, 129, 0.822);
        }

        .content {
            display: flex;
            width: 100%;
            height: 160rpx;
            margin-top: 20rpx;
            align-items: center;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-between;

            .brief {
                font-size: 30rpx;
                letter-spacing: 1px;
                width: 100%;
                font-weight: 250;
            }

            .time {
                font-size: 25rpx;
                letter-spacing: 1.5rpx;
                width: 100%;
                font-weight: 150;
            }
        }
    }
</style>