<template>
    <div class="container">
        <!-- <div class="icon">
            <img src="./../../static/user_login.png" alt=""/>
        </div> -->
        <h1 class="title">您还未登录</h1>
        <div class="btn">
            <u-button 
                type="primary" 
                @click="onLoginBtnClick" 
                plain 
                :custom-style="customStyle"
            >
                点击登录
            </u-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            customStyle: {
                color: 'rgba(94, 150, 255, 0.842)'
            }
        }
    },
    methods: {
        onLoginBtnClick() {
            uni.navigateTo({
                url: "./../login/login",
                success: () => console.log("navigate successfully"),
                fail: err => console.warn(err)
            })
        }
    },
}
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-wrap: wrap;
        width: 100%;

        // .icon {
        //     width: 100%;
        //     padding-left: 50rpx;
        //     margin-top: 30rpx;

        //     img {
        //         width: 150rpx;
        //         height: 150rpx;
                
        //     }
        // }

        .title {
            width: 100%;
            height: 300rpx;
            font-size: 60rpx;
            letter-spacing: 0.5px;
            padding-left: 50rpx;
            padding-top: 200rpx;
        }

        .btn {
            width: 80%;
            margin-top: 200rpx;
        }
    }
</style>