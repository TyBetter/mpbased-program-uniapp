// 首页新闻block点击跳转详情页，通过路由参数获取新闻ID，向后端请求新闻详情。
<template>
    <div class="container">
        <h1> hello world </h1>
        <u-popup v-model="isShow" mode="center" width="500rpx" height="600px" mask="false">
            <div>
                welcome! this is news {{newsId}}!
            </div>
        </u-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            newsId: null
        }
    },
    onLoad(option) {
        console.log(option);
        new Promise((resolve, reject) => {
            if (option.itemId) {
                this.newsId = option.itemId;
            } else {
                this.newsId = 666;
            }
            resolve();
        }).then(() => {
            this.isShow = true;
            let st = setTimeout(() => {
                this.isShow = false;
                clearTimeout(st);
            }, 1000);
        }).catch(err => {
            console.log(err);
        })
        
        
    }
}
</script>