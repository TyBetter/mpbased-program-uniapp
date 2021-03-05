<template>
    <div class="container">

        <!-- 已登录页面 -->
        <div class="logged" v-if="islogged">
             <div class="head">
                您好<span class="douhao">，</span>{{username}}
            </div>

            <div class="contentList">
                <ul class="list">
                    <li 
                        class="items" 
                        id="publish" 
                        @click.capture="onListItemClick" 
                        v-if="userType === 'manager' || userType === 'all'"
                    >
                        <u-icon name="plus" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                        <span class="letter">发布项目</span>
                        <span class="rightArrow">></span>
                    </li>

                    <li 
                        class="items" 
                        id="shenhe" 
                        @click.capture="onListItemClick" 
                        v-if="userType === 'manager' || userType === 'all'"
                    >
                        <u-icon name="checkmark" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                        <span class="letter">项目审核</span>
                        <span class="rightArrow">></span>
                    </li>

                    <li 
                        class="items" 
                        id="judge" 
                        @click.capture="onListItemClick" 
                        v-if="userType === 'teacher' || userType === 'all'"
                    >
                        <u-icon name="eye" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                        <span class="letter">项目评审</span>
                        <span class="rightArrow">></span>
                    </li>

                    <li 
                        class="items" 
                        id="progress" 
                        @click.capture="onListItemClick" 
                        v-if="userType === 'teacher' || userType === 'all'"
                    >
                        <u-icon name="list" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                        <span class="letter">进度查看</span>
                        <span class="rightArrow">></span>
                    </li>
                </ul>
            </div>
        </div>
       
        <!-- 未登录页面 -->
        <div class="unlogged" v-else>
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

        <!-- 登录表单 -->
        <u-popup 
            v-model="login" 
            mode="center" 
            border-radius="14"
            :custom-style="popupCustomStyle"
            height="450"
            zoom="false"
        >
            <div class="form">
                <div class="formBlock">
                    <span class="title">账号</span>
                    <input type="text" v-model.lazy="account" placeholder="请输入账号">
                </div>

                <div class="formBlock">
                    <span class="title">密码</span>
                    <input type="password" v-model.lazy="password" placeholder="请输入密码">
                </div>

                <u-button 
                    type="primary" 
                    @click="submit" 
                    plain 
                    :custom-style="loginBtnCustomStyle"
                >
                    登录
                </u-button>
            </div>
        </u-popup>
        

    </div>
</template>

<script>
export default {
    data() {
        return {
            username: null, // 已登陆页面显示用户名
            customStyle: {
                color: 'rgba(94, 150, 255, 0.842)'
            },
            loginBtnCustomStyle: {
                color: 'rgba(94, 150, 255, 0.842)',
                width: "550rpx",
            },
            popupCustomStyle: {
                display: "flex",
                width: "90%",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5%",
                overflow: "hidden"
            },
            islogged: false, // 是否已登录
            userType: "all", // 用户身份
            login: false, // 是否显示登录表单弹窗
            account: null, // 登录表单输入账号
            password: null, // 登录表单输入密码
        }
    },
    methods: {
        onListItemClick(e) {
            switch(e.target.id) {
                case "publish": {
                    uni.navigateTo({
                        url: "./../features/publish/publish",
                        success: () => {
                            console.log("navigate successfully");
                        },
                        fail: err => {
                            console.warn(err);
                        }
                    })
                    return ;
                }
                case "shenhe": {
                    uni.navigateTo({
                        url: "./../features/shenhe/shenhe",
                        success: () => {
                            console.log("navigate successfully");
                        },
                        fail: err => {
                            console.warn(err);
                        }
                    })
                    return ;
                }
                case "judge": {
                    uni.navigateTo({
                        url: "./../features/judge/judge",
                        success: () => {
                            console.log("navigate successfully");
                        },
                        fail: err => {
                            console.warn(err);
                        }
                    })
                    return ;
                }
                case "progress": {
                    uni.navigateTo({
                        url: "./../features/progress/progress",
                        success: () => {
                            console.log("navigate successfully");
                        },
                        fail: err => {
                            console.warn(err);
                        }
                    })
                    return ;
                }
                default: {
                    console.warn(e.target.id);
                }
            }
        },
        onLoginBtnClick() {
            this.login = true;
        },
        submit() { // 登录表单提交
            uni.showLoading({
                title: "请稍候"
            });
			if (!this.account || !this.password) {
                uni.hideLoading();
                uni.showToast({
                    title: "请完整输入账号和密码",
                    mask: true,
                    duration: 1500
                });
                return ;
            }
            // axios发送post请求给后端
            let user = {
                account: this.account,
                userType: "all"
            }
            uni.setStorage({
                key: "user",
                data: user,
                success: () => {
                    this.username = this.account;
                    uni.hideLoading();
                    this.login = false;
                    this.islogged = true;
                },
                fail: err => console.warn(`login failed, ${err}`)
            })   
		}
    },
    onLoad() {
        uni.showLoading({
            title: "请稍候"
        });
        uni.getStorage({ // 读取本地数据判断是否已登录
            key: "user",
            complete: res => {
                if (res.data) {
                    this.islogged = true;
                    this.username = res.data.account;
                    this.usertype = res.data.userType;
                    uni.hideLoading();
                } else {
                    uni.hideLoading();
                }
            }
        })
    }
}
</script>

<style lang="less" scoped>
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .logged { // 已登录页面样式
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            flex-wrap: wrap;

            .head {
                width: 100%;
                height: 300rpx;
                font-size: 60rpx;
                letter-spacing: 0.5px;
                padding-left: 50rpx;
                padding-top: 200rpx;
                .douhao {
                    color: rgba(94, 150, 255, 0.842);
                }
            }

            .contentList {
                width: 100%;
                margin-top: 100rpx;
                .list {
                    width: 100%;
                    height: 100%;
                    padding-left: 50rpx;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    .items {
                        display: flex;
                        align-items: center;
                        height: 100rpx;
                        width: 100%;
                        line-height: 100rpx;
                        letter-spacing: 1px;
                        font-size: 35rpx;
                        border-bottom: 0.5px solid rgba(129, 129, 129, 0.822);

                        .letter {
                            margin-left: 10rpx;
                            margin-right: 60%;
                        }

                        .rightArrow {
                            font-weight: 100;
                            font-size: 38rpx;
                            color: rgba(153, 153, 153, 0.507);
                        }
                    }

                    .items:last-child {
                        border: none;
                    }
                }
            }
        }

        .unlogged { // 未登录页面样式
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;

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

        .form { // 表单样式
            width: 90%;
            margin-left: 5%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 80rpx;

            .formBlock {
                font-size: 35rpx;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 0.5px solid rgba(129, 129, 129, 0.822);
                margin-bottom: 50rpx;
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