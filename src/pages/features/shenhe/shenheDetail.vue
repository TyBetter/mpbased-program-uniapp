// 首页新闻block点击跳转详情页，通过路由参数获取新闻ID，向后端请求新闻详情。
// 审核功能还未完全实现
<template>
    <div class="container">
        <u-modal 
            v-model="modalShow" 
            @confirm="reviewConfirm" 
            ref="uModal" 
            :async-close="true"
            :mask-close-able="true"
            content='确认后无法修改，是否确认提交？'
        ></u-modal>

        <u-popup 
            v-model="popupShow" 
            mode='bottom' 
            border-radius='14'
            height='900'
            safe-area-inset-bottom=true
            closeable=true
            close-icon-color='rgba(94, 150, 255, 0.842)'
        >
            <div class="popup">
                <div class="checkbox">
                    <div class="label">
                        请选择评审专家
                    </div>

                    <scroll-view scroll-y="true" style="height: 450rpx;">
                        <checkbox-group
                            @change='onJudgeSelectedChange'
                            class="checkList"
                        >
                            <label 
                                v-for="item in judgeList" 
                                :key="item.userId"
                                class="checkListItem"
                            >
                                <checkbox :value="item.userId" />{{item.username}}
                            </label>
                        </checkbox-group>
                    </scroll-view>
                </div>

                <u-field 
                    @click="() => this.showCalendar = true"
                    :disabled="true" label="截止日期" placeholder="请选择截止日期"
                    right-icon="calendar"
                    border-bottom=false
                    v-model="deadline"
                    required=true
                >
                </u-field>

                <div class="submit">
                    <u-button 
                        type='primary'
                        @click='handleSubmit'
                    >
                        提交
                    </u-button>
                </div>
            </div>
		</u-popup>

        <u-calendar 
            mode="date" 
            @change='onCalendarChange'
            v-model="showCalendar"
        ></u-calendar>

        <div class="title">
            {{projectTitle}}
        </div>
        <div class="time">
            {{projectTime}}
        </div>
        
        <div class="content" v-html='projectContent'></div>

        <div class="buttons">
            <span class="status">
                {{reviewStatus === 'true' ? '已审核' : '未审核'}}
            </span>

            <u-button 
                type="primary" 
                @click="onPassBtnClicked" 
                plain 
                :custom-style="customStyle"
                :disabled="reviewStatus === 'true'"
            >
                审核通过
            </u-button>

            <u-button 
                @click="onRefuseBtnClicked" 
                plain 
                :custom-style="customRefuseStyle"
                :disabled="reviewStatus === 'true'"
            >
                审核不通过
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
            reviewStatus: 'false',
            customStyle: {
                color: 'rgba(94, 150, 255, 0.842)'
            },
            customRefuseStyle: {
                color: 'rgba(255, 71, 71, 0.699)'
            },
            modalShow: false,
            isPass: '',
            projectSchoolId: null, // 项目所属学院
            teacherUserId: null, // 项目所属教师Id
            userId: null,
            identity: '',
            judgeList: [], // 评审专家列表
            deadline: '', // 评审截止时间 用户输入
            popupShow: false,
            showCalendar: false,
            judgeSelectedList: []
        }
    },
    onLoad(option) {
        const _this = this;
        console.log(option);
        uni.showLoading({
            title: "请稍候"
        });
        this.getLocalStorage().then(res => {
            this.userId = res.userId;
            this.identity = res.userType
        })
        new Promise((resolve, reject) => {
            if (option.itemId && option.time && option.status) {
                this.projectId = option.itemId;
                this.projectTime = option.time;
                this.reviewStatus = option.status;
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
        
        
    },
    methods: {
        handleSubmit() { // popup提交按钮
            if (this.judgeSelectedList.length === 0 && this.deadline) {
                this.popupShow = false;
                this.modalShow = true;
            } else {
                uni.showToast({
                    title: '请完整填写信息',
                    duration: 1500,
                    mask: true,
                    icon: 'none'
                });
            }
        },
        onPassBtnClicked() { // 审核通过按钮
            this.isPass = 'true';
            if (this.identity === 'test' || this.identity === 'uniManager') {
                this.getJudges().then(() => {
                    this.popupShow = true;
                    console.log(this.judgeList);
                }).catch(err => {
                    console.error(err);
                })
            } else {
                this.modalShow = true;
            }
            // this.modalShow = true;
        },
        onRefuseBtnClicked() { // 审核不通过按钮
            this.isPass = 'false';
            this.modalShow = true;
        },
        reviewConfirm() { // modal确认按钮
            this.projectReivew({
                isPass: this.isPass,
                judgeList: this.judgeSelectedList,
                deadline: new Date(this.deadline).toLocaleDateString()
            });
        },
        getCurrentTime() {
            let date = new Date();
            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        },
        projectReivew({isPass, judgeList=[], deadline=''}) { // 根据身份生成参数，请求接口
            let params = {};
            if (this.identity === 'schoolManager') {
                params = {
                    projectId: Number.parseInt(this.projectId),
                    time: this.getCurrentTime(),
                    isPass,
                    identity: 'schoolManager'
                };
            } else if (this.identity === 'test' || this.identity === 'uniManager') { 
                if (isPass === 'true') { // 需要指定评审专家和deadline
                    if (this.identity === 'test')  {
                        params =  {
                            projectId: Number.parseInt(this.projectId),
                            time: this.getCurrentTime(),
                            type: 'uni',
                            isPass,
                            identity: 'test',
                            judgeList,
                            deadline
                        };
                    } else {
                        params = {
                            projectId: Number.parseInt(this.projectId),
                            time: this.getCurrentTime(),
                            isPass,
                            identity: 'uniManager',
                            judgeList,
                            deadline
                        };
                    }
                } else { // 不需要指定评审专家，直接拒绝
                    if (this.identity === 'test')  {
                        params =  {
                            projectId: Number.parseInt(this.projectId),
                            time: this.getCurrentTime(),
                            type: 'uni',
                            isPass,
                            identity: 'test'
                        };
                    } else {
                        params = {
                            projectId: Number.parseInt(this.projectId),
                            time: this.getCurrentTime(),
                            isPass,
                            identity: 'uniManager'
                        };
                    }
                }
            }

            this.$axios({
                method: 'POST',
                url: '/reviewProject',
                data: params
            }).then(() => {
                uni.showToast({
                    title: "审核成功",
                    duration: 1500,
                    icon: 'none'
                });
                this.modalShow = false;
                this.reviewStatus = 'true';
            }).catch(() => {
                uni.showToast({
                    title: "审核失败，请稍后再试",
                    duration: 1500,
                    icon: 'none'
                });
            }); 
        },
        getJudges() { // 获取评审专家名单
            const _this = this;
            return new Promise((resolve, reject) => {
                this.getProjectSchoolId().then(() => {
                    _this.$axios({ // 向后端验证
                        method: 'GET',
                        url: '/getJudgesList',
                        params: {
                            schoolId: Number.parseInt(_this.projectSchoolId)
                        }
                    }).then(res => {
                        if (Array.isArray(res.data) && res.data !== []) {
                            _this.judgeList = res.data.filter(item => item.userId !== _this.teacherUserId);
                            _this.judgeList.map(item => item.checked = 0);
                            resolve();
                        }  else if (Array.isArray(res.data) && res.data === []) {
                            _this.judgeList = [];
                            resolve();
                        } else {
                            uni.showToast({
                                title: "获取评审专家列表出错",
                                duration: 1500,
                                icon: 'none'
                            });
                            reject();
                        }
                    }).catch(err => {
                        uni.showToast({
                            title: "获取评审专家列表出错",
                            duration: 1500,
                            icon: 'none'
                        });
                        reject(err);
                    })
                })
            });
        },
        getProjectSchoolId() { // 获取项目所属学院
            const _this = this;
            return new Promise((resolve, reject) => {
                if (this.projectId) {
                    this.$axios({ // 向后端验证
                        method: 'GET',
                        url: '/getProjectSchoolId',
                        params: {
                            projectId: this.projectId
                        }
                    }).then(res => {
                        if (res.msg === 'success') {
                            _this.projectSchoolId = res.data.schoolId;
                            _this.teacherUserId = res.data.teacherUserId
                            resolve();
                        } else {
                            reject()
                        }
                    }).catch(err => {
                        reject(err);
                    });
                }
            });
        },
        getLocalStorage() {
            return new Promise((resolve, reject) => {
                uni.getStorage({
                    key: 'user',
                    success: res => resolve(res.data),
                    fail: err => reject(err)
                });
            })
        },
        onCalendarChange(e) {
            console.log(e.result); //string yyyy-mm-dd
            this.deadline = e.result;
        },
        onJudgeSelectedChange(e) {
            console.log(e.detail); // array
            this.judgeSelectedList = e.detail;
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

    .popup {
        width: 100%;
        height: 100%;
        padding: 24px;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        

        .checkbox {
            // height: 30%;
            width: 100%;
            margin-bottom: 50rpx;

            .label {
                color: rgba(94, 150, 255, 0.842);
                font-size: 20px;
                letter-spacing: 1px;
                margin-bottom: 30rpx;
            }

            .label::before {
                content: '*';
                color: red;
            }

            .checkList {
                display: flex;
                align-items: center;
                width: 100%;
                flex-wrap: wrap;
                justify-content: flex-start;

                .checkListItem {
                    border-bottom: 1px solid rgba(190, 190, 190, 0.63);
                    height: 35px;
                    line-height: 35px;
                    padding: 5px;
                    width: 100%;
                }

                .checkListItem:last-child {
                    border-bottom: none;
                }
            }
        }

        .submit {
            width: 100%;
            text-align: center;
            margin: 30rpx 0;
        }
    }

    .popup:last-child {
        width: 100%;
    }
</style>