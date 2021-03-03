<template>
    <div class="container">
        
        <div class="head">
            你好，{{userName}}
        </div>

        <div class="contentList">
            <ul class="list">
                <li class="items" id="publish" @click="onListItemClick">
                    发布项目
                </li>

                <li class="items" id="shenhe" @click="onListItemClick">
                    项目审核
                </li>

                <li class="items" id="judge" @click="onListItemClick">
                    项目评审
                </li>

                <li class="items" id="progress" @click="onListItemClick">
                    项目进度查看
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: {
                type: String,
                value: null
            }
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

                }
            }
        }
    },
    onLoad() {

    }
}
</script>

<style lang="less" scoped>

</style>