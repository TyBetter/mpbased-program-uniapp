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
				itemList:[]
			}
		},
		onLoad() {
			
		},
		mounted() {
			const _this = this;
			this.$axios({
				method: 'GET',
				url: '/newsIndex',
				params: {}
			}).then(res => {
				_this.itemList = res;
			}).catch(err => console.warn('err', err))
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.banner {
		height: 200rpx;
		width: 100%;
	}
	.wrap {
		padding: 40rpx;
	}
</style>
