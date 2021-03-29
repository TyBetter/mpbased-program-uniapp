// 首页新闻block点击跳转详情页，通过路由参数获取新闻ID，向后端请求新闻详情。
<template>
    <div class="container">
        <u-modal 
            v-model="modalShow" 
            @confirm="judgeConfirm" 
            ref="uModal" 
            :async-close="true"
            :mask-close-able="true"
            content='确认后无法修改，是否确认提交？'
        ></u-modal>

        <div class="title">
            {{projectTitle}}
        </div>
        <div class="time">
            评审截止时间：{{projectTime}}
        </div>
        
        <div class="content" v-html='projectContent'></div>
        <!-- <rich-text :nodes='projectContent'></rich-text> -->

        <div class="buttons">
            <span class="status">
                {{judgeStatus === 'true' ? '已评审' : '未评审'}}
            </span>
            <u-button 
                type="primary" 
                @click="onPassBtnClicked" 
                plain 
                :custom-style="customStyle"
                :disabled="judgeStatus === 'true'"
            >
                评审通过
            </u-button>

            <u-button 
                @click="onRefuseBtnClicked" 
                plain 
                :custom-style="customRefuseStyle"
                :disabled="judgeStatus === 'true'"
            >
                评审不通过
            </u-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            projectId: null,
            projectTitle: null,
            projectContent: null,
            projectTime: null,
            judgeStatus: false,
            customStyle: {
                color: 'rgba(94, 150, 255, 0.842)'
            },
            customRefuseStyle: {
                color: 'rgba(255, 71, 71, 0.699)'
            },
            modalShow: false,
            isPass: '',
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
                this.projectId = option.itemId;
                this.projectTime = option.time;
                this.judgeStatus = option.status;
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
            })
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
        
        
    },
    methods: {
        onPassBtnClicked() {
            this.isPass = 'true';
            this.modalShow = true;
        },
        onRefuseBtnClicked() {
            this.isPass = 'false';
            this.modalShow = true;
        },
        judgeConfirm() {
            const _this = this;
            uni.getStorage({
                key: 'user',
                success: res => {
                    let userId = res.data.userId;
                    console.log('userId', res);
                    _this.$axios({
                        method: 'GET',
                        url: '/judgeProject',
                        params: {
                            userId,
                            projectId: this.projectId,
                            isPass: this.isPass
                        }
                    }).then(res => {
                        if (res.msg === 'success') {
                            this.judgeStatus = "true";
                            this.modalShow = false;
                            uni.showToast({
                                title: "提交成功",
                                duration: 1000,
                                icon: 'none'
                            });
                        } else {
                            this.modalShow = false;
                            uni.showToast({
                                title: "提交失败，请稍后再试",
                                duration: 1000,
                                icon: 'none'
                            });
                        }
                    }).catch(err => {
                        console.warn(err);
                        this.modalShow = false;
                        uni.showToast({
                            title: "提交失败，请稍后再试",
                            duration: 1000,
                            icon: 'none'
                        });
                    })
                },
                fail: err => {
                    console.warn('获取本地信息出错', err);
                    this.modalShow = false;
                    uni.showToast({
                        title: "提交失败，请稍后再试",
                        duration: 1000,
                        icon: 'none'
                    });
                }
            })
           
        }
    },
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

        

        .buttons {
            margin-top: 100rpx;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            .status {
                color: rgba(94, 150, 255, 0.842);
            }
        }
    }
</style>