<template>
    <div class="container">

        <div class="head">
            您好<span class="douhao">，</span>{{username}}
        </div>

        <div class="contentList">
            <ul class="list">
                <li class="items" id="publish" @click.capture="onListItemClick">
                    <u-icon name="plus" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                    <span class="letter">发布项目</span>
                    <span class="rightArrow">></span>
                </li>

                <li class="items" id="shenhe" @click.capture="onListItemClick">
                    <u-icon name="checkmark" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                    <span class="letter">项目审核</span>
                    <span class="rightArrow">></span>
                </li>

                <li class="items" id="judge" @click.capture="onListItemClick">
                    <u-icon name="eye" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                    <span class="letter">项目评审</span>
                    <span class="rightArrow">></span>
                </li>

                <li class="items" id="progress" @click.capture="onListItemClick">
                    <u-icon name="list" color="rgba(94, 150, 255, 0.842)" size=50></u-icon>
                    <span class="letter">进度查看</span>
                    <span class="rightArrow">></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "李华Lihua"
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
        }
    },
    onLoad() {

    }
}
</script>

<style lang="less" scoped>
    .container {
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
</style>