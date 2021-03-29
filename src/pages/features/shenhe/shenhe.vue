<template>
    <div class="container">
        <list-title titleText="待审核项目"/>
        <ul class="list">
            <li 
                class="list-item"
                v-for="(item) in list" 
                :key="item.projectId"
            >
                <listitem 
                    :itemTitle="item.title"
                    :itemBrief="item.brief"
                    :itemId="item.projectId"
                    :itemTime="item.time"
                    type="shenhe"
                />
            </li>
        </ul>

        <blank 
            text="待审核项目"
            v-if="list.length === 0"    
        />
    </div>
</template>

<script>
import Listitem from '../../../components/Listitem.vue'
import ListTitle from '../../../components/listTitle.vue'
import blank from './../../../components/blank.vue'

export default {
    components: { blank, ListTitle, Listitem },
    data() {
        return {
            list: []
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
                    url: '/reviewProjectsList',
                    params: {
                        userId: res.data.userId,
                        identity: res.data.userType,
                        type: 'school'
                    }
                }).then(res => {
                    if (res.msg === 'success') {
                        _this.list = res.data;
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