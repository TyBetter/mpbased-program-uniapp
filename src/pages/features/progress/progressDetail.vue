
// 采用uView时间轴组件实现项目进度查看，不设置点击事件
// 项目进度在onLoad钩子内通过项目ID向后端获取

// 弃用此页面，使用progress页点击弹窗实现进度查看

<template>
    <div class="container">
        <u-time-line>
            <u-time-line-item
                v-for="(item, index) in progressList" 
                :key="index"
            >
                <template v-slot:content>
                    <view>
                        <view class="u-order-title">{{item.status}}</view>
                        <view class="u-order-desc">{{item.brief}}</view>
                        <view class="u-order-time">{{item.time}}</view>
                    </view>
                </template>
            </u-time-line-item>
        </u-time-line>
    </div>
</template>

<script>
export default {
    data() {
        return {
            progressList: [
                {
                    status: "已提交",
                    brief: "nihaonihaonihaonihao",
                    time: "2020 2/12 2:2:2"
                },
                {
                    status: "二级学院审核",
                    brief: "nihaonihaonihaonihao",
                    time: "2020 2/12 2:2:2"
                },
                {
                    status: "校教务处审核",
                    brief: "nihaonihaonihaonihao",
                    time: "2020 2/12 2:2:2"
                },
                {
                    status: "专家评审",
                    brief: "nihaonihaonihaonihao",
                    time: "2020 2/12 2:2:2"
                },
                {
                    status: "立项",
                    brief: "nihaonihaonihaonihao",
                    time: "2020 2/12 2:2:2"
                }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
    .container {
        padding-top: 240rpx;
        padding-left: 50rpx;
    }

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
</style>