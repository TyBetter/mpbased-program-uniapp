// 首页新闻block点击跳转详情页，通过路由参数获取新闻ID，向后端请求新闻详情。
<template>
    <div class="container">
        <div class="title">
            {{newsTitle}}
        </div>
        <div class="time">
            {{newsTime}}
        </div>
        <div class="content" v-html='newsContent'>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsId: null,
            newsTitle: null,
            newsContent: null,
            newsTime: null
        }
    },
    onLoad(option) {
        const _this = this;
        console.log(option);
        uni.showLoading({
            title: "请稍候"
        });
        new Promise((resolve, reject) => {
            if (option.itemId) {
                this.newsId = option.itemId;
                resolve();
            } else { // 未读取到路由参数
                uni.showToast({
                    title: '加载失败，请稍后再试',
                    mask: true,
                    duration: 1500,
                    icon: none
                });
                reject();
            }
        }).then(() => {
			_this.$axios({
				method: 'GET',
				url: '/newsDetail',
				params: {
                    id: this.newsId
                }
			}).then(res => {
                if (res !== null) {
                    this.newsTitle = res.title;
                    this.newsContent = res.content;
                    this.newsTime = res.time;
                    uni.hideLoading();
                } else {
                    uni.showToast({
                        title: '未知错误，请稍后再试',
                        mask: true,
                        duration: 1500,
                        icon: none
                    });
                }
			}).catch(err => {
                console.warn(err);
                uni.showToast({
                    title: '未知错误，请稍后再试',
                    mask: true,
                    duration: 1500,
                    icon: none
                });
            })
        }).catch(err => {
            console.log(err);
            uni.showToast({
                title: '未知错误，请稍后再试',
                mask: true,
                duration: 1500,
                icon: none
            });
        })
        
        
    }
}
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .title {
            font-size: 45rpx;
            height: 110rpx;
            line-height: 110rpx;
            letter-spacing: 1px;
            width: 100%;
            margin-bottom: 20rpx;
        }

        .time {
            font-size: 30rpx;
            height: 40rpx;
            width: 100%;
            line-height: 40rpx;
            color: #777;
            letter-spacing: 0.5px;
            padding-bottom: 15rpx;
            border-bottom: 0.5px solid rgba(129, 129, 129, 0.822);
            box-sizing: content-box;
            margin-bottom: 30rpx;
        }
    }
</style>