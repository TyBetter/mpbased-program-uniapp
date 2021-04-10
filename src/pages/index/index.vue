<template>
	<div class="container">
		<img src="./../../static/banner.jpg" alt="" srcset="" class="banner">
		<ul class="list">
			<li class="listItem" 
				v-for="(item, index) in itemList" 
				:key="index"
			>
				<Listitem 
					:itemTitle="item.title"
					:itemBrief="item.brief"
					:itemTime="item.time"
					:itemId="item.newsId"
					type="newsIndex"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
	import Listitem from '../../components/Listitem.vue';
	// import { getNames } from './../../api/index';

	export default {
		components: {
			Listitem
		},
		data() {
			return {
				itemList:[],
				schoolId: ''
			}
		},
		onLoad() {
			uni.getStorage({ // 读取本地数据判断是否已登录
				key: "user",
				complete: res => {
					if (res.data) {
						this.islogged = true;
						this.schoolId = res.data.schoolId;
					}
				}
			});
		},
		mounted() {
			this.getNewsList();
		},
		methods: {
			getNewsList() { // 若已登录则获取本学院news，否则获取校级news
				uni.showLoading();
				const _this = this;
				this.$axios({
					method: 'GET',
					url: '/newsIndex',
					params: {}
				}).then(res => {
					_this.itemList = res;
					uni.hideLoading();
				}).catch(err => {
					console.warn('err', err);
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		background-color: #f3f3f3;
	}
	
	.banner {
		height: 200rpx;
		width: 100%;
	}
	.wrap {
		padding: 40rpx;
	}
</style>
