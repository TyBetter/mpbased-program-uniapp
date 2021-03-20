<template>
    <div class="container">
        <div class="form">
            <div class="formBlock">
                <span class="title">账号</span>
                <input type="text" v-model.lazy="userId" placeholder="请输入账号">
            </div>

            <div class="formBlock">
                <span class="title">密码</span>
                <input type="password" v-model.lazy="pwd" placeholder="请输入密码">
            </div>

            <u-button 
                type="primary" 
                @click="submit" 
                plain 
                :custom-style="customStyle"
            >
                登录
            </u-button>
        </div>

    </div>
	
</template>

<script>
export default {
	data() {
		return {
			userId: null,
            pwd: null,
            customStyle: {
                color: 'rgba(94, 150, 255, 0.842)',
                width: "550rpx",
            }
		};
	},
	methods: {
		submit() {
            uni.showLoading({
                title: "请稍候"
            });
			if (!this.userId || !this.pwd) {
                uni.hideLoading();
                uni.showToast({
                    title: "请完整输入账号和密码",
                    mask: true,
                    duration: 1500
                });
                return ;
            }
            // axios发送请求给后端
            this.$axios({
                method: 'GET',
                url: '/login',
                params: {
                    userId: this.userId,
                    pwd: this.pwd
                }
            }).then(res => {
                if (res.msg === 'success') { // 身份验证成功
                    let user = {
                        userId: res.data.userId,
                        account: res.data.username,
                        userType: res.data.identity
                    }
                    uni.setStorage({ // 用户信息存入本地
                        key: "user",
                        data: user,
                        success: () => {
                            uni.hideLoading();
                            uni.navigateTo({
                                url: "./../account/account",
                                success: () => console.log("login successfully"),
                                fail: err => console.warn(err)
                            });
                        },
                        fail: err => console.warn(`login failed, ${err}`)
                    })
                } else {
                    uni.showToast({
                        title: res.msg,
                        duration: 2000,
                        mask: true,
                        icon: none
                    })
                }
            }).catch(err=> {
                console.warn('login err', err);
            })
               
		}
	},
	onReady() {

	}
};
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        justify-content: center;
        flex-wrap: wrap;

        .form {
            width: 80%;
            margin-top: 200rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

            .formBlock {
                font-size: 35rpx;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 0.5px solid rgba(129, 129, 129, 0.822);
                margin-bottom: 30rpx;
                padding: 8rpx 5rpx 8rpx 5rpx;


                span {
                    margin-right: 15rpx;
                    width: 15%;
                }

                input {
                    width: 80%;
                }
            }

        }
    }
</style>