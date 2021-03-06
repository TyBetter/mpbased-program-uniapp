<template>
    <div class="container">

        <listTitle titleText="项目"/>

        <!-- 无项目时显示 -->
        <blank
            text="可查看的项目"
            v-if="list.length === 0"
        ></blank>

        <div 
            class="projectList"
            v-else
        >
            <ul class="list">
                <li 
                    class="items"
                    v-for="item in list"
                    :key="item.id"
                    @click.capture="onProjectItemClick"
                >
                    <listitem
                        :itemTitle="item.title"
                        :itemBrief="item.brief"
                        :itemTime="item.time"
                        :itemId="item.id"
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
                                <view class="u-order-desc">{{item.brief}}</view>
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
            list: [
                {
					title: "你好你好",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 1
				},
				{
					title: "hello",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 2
				},
				{
					title: "hello",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 3
				},
				{
					title: "hello",
					brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
					time: "181818",
					id: 4
				}
            ],
            popupCustomStyle: {
                paddingTop: "30rpx"
            },
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
    // onload() {
    //     this.isBlank = this.list.length === 0 ? true : false;
    // },
    methods: {
        onProjectItemClick() {
            // 此处向后端发送请求，根据ID获取点击项目的进度状态，修改this.progressList
            // 使用promise异步处理
            this.popupShow = true;
        }
    },
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