// 新建项目按钮&已发布项目列表
<template>
    <div class="container">
        <div class="btnHead">
            <u-button 
                type="primary" 
                @click="plus" 
                plain 
                :custom-style="customStyle"
            >
                <u-icon name="plus"></u-icon>
                发布新项目
            </u-button>
        </div>


        <!-- 无项目时显示 -->
        <blank
            text="已发布的项目"
            v-if="projectList.length === 0"
        ></blank>

        <div 
            class="pro-list"
            v-else
        >
            <ul class="list">
                <li class="items" v-for="item in projectList" :key="item.id">
                    <Listitem
                        :itemTitle="item.title"
                        :itemBrief="item.brief"
                        :itemTime="item.time"
                        :itemId="item.id"
                        type="projectPublish"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Listitem from "./../../../components/Listitem";


export default {
    components: {
        Listitem
    },
    methods: {
        plus() {
            uni.navigateTo({
                url: "./publishForm",
                success: () => console.log("navigate successsfully"),
                fail: () => {
                    uni.showToast({
                        title: "跳转失败",
                        duration: 1000
                    })
                }
            });
        }
    },
    data() {
        return {
            customStyle: {
                color: 'rgba(94, 150, 255, 0.842)',
                width: "550rpx",
            },
            projectList: [
                {
                    id: 1,
                    title: "hello",
                    brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
                    time: "12:12:12 12/2"
                },
                {
                    id: 2,
                    title: "hello",
                    brief: "",
                    time: "12:12:12 12/2"
                },
                {
                    id: 3,
                    title: "hello",
                    brief: "nihaonihaonihaonihaonihaonihaonihaonihaonihaonihao",
                    time: "12:12:12 12/2"
                },
                {
                    id: 4,
                    title: "hello",
                    brief: "nihaonihaonihaonihaonihaonihaonihaonihaonihaonihao",
                    time: "12:12:12 12/2"
                },
                {
                    id: 5,
                    title: "hello",
                    brief: "nihaonihaonihaonihaonihaonihaonihaonihaonihaonihao",
                    time: "12:12:12 12/2"
                },
                {
                    id: 6,
                    title: "hello",
                    brief: "nihaonihaonihaonihaonihaonihaonihaonihaonihaonihao",
                    time: "12:12:12 12/2"
                },
                {
                    id: 7,
                    title: "hello",
                    brief: "nihaonihaonihaonihaonihaonihaonihaonihaonihaonihao",
                    time: "12:12:12 12/2"
                }
            ]
        }
    },
}
</script>

<style lang="less" scoped>
    .container {
        

        .btnHead {
            margin-top: 60rpx;
            margin-bottom: 80rpx;
        }
    }
</style>