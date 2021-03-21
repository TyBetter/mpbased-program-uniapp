<template>
    <div class="container">

        <listTitle titleText="项目"/>

        <!-- 无项目时显示 -->
        <blank
            text="可查看的项目"
            v-if="isBlank"
        ></blank>

        <div 
            class="projectList"
            v-else
        >
            <ul class="list">
                <li 
                    class="items"
                    v-for="item in list"
                    :key="item.projectId"
                >
                    <listitem
                        :itemTitle="item.title"
                        :itemBrief="item.brief"
                        :itemTime="item.time"
                        :itemId="item.projectId"
                        @child-id='onProjectItemClick'
                        type="progress"
                    ></listitem>
                </li>
            </ul>
        </div>

        <!-- 点击弹出popup显示项目进度 -->
        <u-popup 
            v-model="popupShow" 
            mode="bottom" 
            height="60%"
            border-radius="14"
            :custom-style="popupCustomStyle"
            safe-area-inset-bottom="true"
        >
            <div class="timeline">
                <u-time-line>
                    <u-time-line-item
                        v-for="(item, index) in progressList" 
                        :key="index"
                    >
                        <template v-slot:content>
                            <view>
                                <view class="u-order-title">{{item.status}}</view>
                                <!-- <view class="u-order-desc">{{item.brief}}</view> -->
                                <view class="u-order-time">{{item.time}}</view>
                            </view>
                        </template>
                    </u-time-line-item>
                </u-time-line>
            </div>
        </u-popup>

    </div>
</template>

<script>
import blank from '../../../components/blank.vue';
import Listitem from './../../../components/Listitem.vue';
import listTitle from './../../../components/listTitle.vue';

export default {
    components: { blank, Listitem, listTitle },
    data() {
        return {
            isBlank: false, // 空页面显示
            popupShow: false, // 控制进度popup显示
            list: [],
            popupCustomStyle: {
                paddingTop: "30rpx"
            },
            progressList: []
        }
    },
    onLoad() {
        uni.showLoading();
        const _this = this;
        uni.getStorage({
            key: "user",
            success: (res) => {
                _this.$axios({
                    method: "GET",
                    url: "/project",
                    params: {
                        userId: res.data.userId
                    }
                }).then(res => { // 通过userId向后端请求项目列表
                    if (res.msg === 'success') { // 请求成功
                        _this.list = res.data;
                        _this.isBlank = res.data.length === 0 ? true : false;
                        uni.hideLoading();
                    } else {
                        uni.showToast({
                            title: res.msg,
                            duration: 1500,
                            mask: true,
                            icon: 'none'
                        });
                    }
                }).catch(err => {
                    console.warn('err catched', err);
                    uni.showToast({
                        title: "未知错误",
                        duration: 1500,
                        mask: true,
                        icon: 'none'
                    });
                })
            },
            fail: () => {
                console.warn('读取本地用户信息出错');
                uni.hideLoading();
            },
            complete: () => {
                uni.hideLoading();
            }
        })
        
    },
    methods: {
        onProjectItemClick(projectId) { // 子组件传递项目Id
            // 此处向后端发送请求，根据ID获取点击项目的进度状态，修改this.progressList
            // 使用promise异步处理
            if (projectId) {
                uni.showLoading();
                this.$axios({
                    method: 'GET',
                    url: '/progress',
                    params: {
                        projectId
                    }
                }).then(res => {
                    if (res.msg === 'success' && res.data.length !== 0) {
                        this.progressList = this.stuatusArrProduce(res.data);
                        uni.hideLoading();
                        this.popupShow = true;
                    } else {
                        uni.hideLoading();
                        uni.showToast({
                            title: '未知错误',
                            duration: 1500,
                            icon: 'none',
                            mask: true
                        });
                    }
                })
            } else { // 未读取到项目ID
                uni.hideLoading();
                uni.showToast({
                    title: '未知错误',
                    duration: 1500,
                    icon: 'none',
                    mask: true
                });
            }
        },
        stuatusArrProduce(statusData) {
            const statusList = ['已提交', '二级学院审核通过', '校教务处审核通过', '专家评审通过', '已立项'];
            switch(statusData.status) {
                case 1: return [{
                    status: statusList[0],
                    time: statusData.uploadTime
                }];
                case 2: return [
                    {
                        status: statusList[0],
                        time: statusData.uploadTime
                    },
                    {
                        status: statusList[1],
                        time: statusData.schoolPassTime
                    }
                ];
                case 3: return [
                    {
                        status: statusList[0],
                        time: statusData.uploadTime
                    },
                    {
                        status: statusList[1],
                        time: statusData.schoolPassTime
                    },
                    {
                        status: statusList[2],
                        time: statusData.uniPassTime
                    }
                ];
                case 4: return [
                    {
                        status: statusList[0],
                        time: statusData.uploadTime
                    },
                    {
                        status: statusList[1],
                        time: statusData.schoolPassTime
                    },
                    {
                        status: statusList[2],
                        time: statusData.uniPassTime
                    },
                    {
                        status: statusList[3],
                        time: statusData.judgePassTime
                    }
                ];
                case 5: return [
                    {
                        status: statusList[0],
                        time: statusData.uploadTime
                    },
                    {
                        status: statusList[1],
                        time: statusData.schoolPassTime
                    },
                    {
                        status: statusList[2],
                        time: statusData.uniPassTime
                    },
                    {
                        status: statusList[3],
                        time: statusData.judgePassTime
                    },
                    {
                        status: statusList[4],
                        time: statusData.finalTime
                    }
                ];
                default: {
                    uni.showToast({
                        title: '未知错误',
                        duration: 1500,
                        icon: 'none',
                        mask: true
                    });
                    return ;
                }
            }
        },
    }
}
</script>

<style lang="less" scoped>
    .u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}

    .timeline {
        padding-left: 30rpx;
        padding-top: 40rpx;
    }
</style>