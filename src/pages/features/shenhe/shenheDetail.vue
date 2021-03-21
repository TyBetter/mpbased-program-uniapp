// 首页新闻block点击跳转详情页，通过路由参数获取新闻ID，向后端请求新闻详情。
<template>
    <div class="container">
        <div class="title">
            {{projectTitle}}
        </div>
        <div class="time">
            {{projectTime}}
        </div>
        
        <div class="content" v-html='projectContent'></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projectId: null,
            projectTitle: null,
            projectContent: null,
            projectTime: null
        }
    },
    onLoad(option) {
        const _this = this;
        console.log(option);
        uni.showLoading({
            title: "请稍候"
        });
        new Promise((resolve, reject) => {
            if (option.itemId && option.time) {
                console.log('option.itemId',option.itemId);
                this.projectId = option.itemId;
                this.projectTime = option.time;
                resolve();
            } else { // 未读取到路由参数
                let st = setTimeout(() => {
                    uni.navigateBack();
                    clearTimeout(st);
                }, 1800);

                uni.showToast({
                    title: '加载失败，请重试',
                    mask: true,
                    duration: 1500,
                    icon: 'none'
                });
                reject();
            }
        }).then(() => {
			_this.$axios({
				method: 'GET',
				url: '/projectDetail',
				params: {
                    projectId: this.projectId
                }
			}).then(res => {
                if (res.msg === 'success' && res.data) {
                    this.projectTitle = res.data.title;
                    this.projectContent = res.data.content;

                    uni.hideLoading();

                } else {
                    let st = setTimeout(() => {
                        uni.navigateBack();
                        clearTimeout(st);
                    }, 1800);

                    uni.showToast({
                        title: '未知错误，请稍后再试',
                        mask: true,
                        duration: 1500,
                        icon: 'none'
                    });
                }
			}).catch(err => {
                console.warn(err);
                let st = setTimeout(() => {
                    uni.navigateBack();
                    clearTimeout(st);
                }, 1800);

                uni.showToast({
                    title: '未知错误，请稍后再试',
                    mask: true,
                    duration: 1500,
                    icon: 'none'
                });
            });

        }).catch(err => {
            console.log(err);
            let st = setTimeout(() => {
                uni.navigateBack();
                clearTimeout(st);
            }, 1800);

            uni.showToast({
                title: '未知错误，请稍后再试',
                mask: true,
                duration: 1500,
                icon: 'none'
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