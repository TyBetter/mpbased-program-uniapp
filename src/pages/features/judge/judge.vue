<template>
    <div class="container">

        <listTitle
            titleText="待评审"
        ></listTitle>


        <!-- 无项目时显示 -->
        <blank
            text="待评审项目"
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
                    :key="item.projectId"
                >
                    <listitem
                        :itemTitle="item.title"
                        :itemBrief="item.brief"
                        :itemTime="item.deadline"
                        :status="item.judgeStatus"
                        :itemId="item.projectId"
                        type="judge"
                    ></listitem>
                </li>
            </ul>
        </div>
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
            list: []
        }
    },
    mounted() {
        uni.showLoading();
		const _this = this;
        uni.getStorage({
            key: 'user',
            success: res => {
                let userId = res.data.userId;
                this.$axios({
                    method: 'GET',
                    url: '/judgeProjectsList',
                    params: {
                        userId
                    }
                }).then(res => {
                    if( res.msg === 'success') {
                        uni.hideLoading();
                        _this.list = res.data;
                    } else {
                        console.warn('返回数据出错');
                        uni.showToast({
                            title: '未知错误',
                            durantion: 1500,
                            mask: true,
                            icon: 'none'
                        });
                    }
                }).catch(err => {
                    console.warn('err', err);
                    uni.showToast({
                        title: '未知错误',
                        durantion: 1500,
                        mask: true,
                        icon: 'none'
                    });
                });
            },
            fail: err => {
                console.warn('读取本地内存出错', err);
                uni.showToast({
                    title: '未知错误',
                    durantion: 1500,
                    mask: true,
                    icon: 'none'
                });
            }
        })
		
	}
    
}
</script>

<style lang="less" scoped>

</style>