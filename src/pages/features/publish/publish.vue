// 新建项目按钮&已发布项目列表
<template>
    <div class="container">
        <!-- <div class="btnHead">
            <u-button 
                type="primary" 
                @click="plus" 
                plain 
                :custom-style="customStyle"
            >
                <u-icon name="plus"></u-icon>
                发布新项目
            </u-button>
        </div> -->

        <list-title titleText="已发布公告"/>


        <!-- 无项目时显示 -->
        <blank
            text="已发布的项目"
            v-if="newsList.length === 0"
        ></blank>

        <div 
            class="pro-list"
            v-else
        >
            <ul class="list">
                <li class="items" v-for="item in newsList" :key="item.newsId">
                    <Listitem
                        :itemTitle="item.title"
                        :itemBrief="item.brief"
                        :itemTime="item.time"
                        :itemId="item.newsId"
                        type="projectPublish"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Listitem from "./../../../components/Listitem";
import blank from "./../../../components/blank";
import ListTitle from '../../../components/listTitle.vue'

export default {
    components: {
        Listitem, blank, ListTitle
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
            newsList: []
        }
    },
    mounted() {
		const _this = this;
        uni.showLoading();
        uni.getStorage({
            key: 'user',
            success: res => {
                this.$axios({
                    method: 'GET',
                    url: '/newsFromMe',
                    params: {
                        userId: res.data.userId
                    }
                }).then(res => {
                    if (res.msg === 'success') {
                        _this.newsList = res.data;
                        uni.hideLoading();
                    }
                }).catch(err => {
                    console.warn('获取后台数据出错', err)
                    let st = setTimeout(() => {
                        uni.navigateBack();
                        clearTimeout(st);
                    }, 1800)
                    uni.showToast({
                        title: '未知错误',
                        duration: 1500,
                        mask: true,
                        icon: 'none'
                    });
                });
            },
            fail: err => {
                console.warn('获取本地数据出错', err);

                let st = setTimeout(() => {
                    uni.navigateBack();
                    clearTimeout(st);
                }, 1800);

                uni.showToast({
                    title: '未知错误',
                    duration: 1500,
                    mask: true,
                    icon: 'none'
                });
            }
        })
		
	},
}
</script>

<style lang="less" scoped>
    .container {
        background-color: #f3f3f3;
        min-height: 100vh;

        .btnHead {
            margin-top: 60rpx;
            margin-bottom: 80rpx;
        }
    }
</style>