<template>
	<div class="container">
		<u-swiper :list="list"></u-swiper>
		<ul class="list">
			<li class="listItem" 
				v-for="(item, index) in itemList" 
				:key="index"
			>
				<Listitem 
					:itemTitle="item.title"
					:itemBrief="item.brief"
					:itemTime="item.time"
					:itemId="item.id"
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
				list: [
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风,画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼,心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉,萧萧黄叶闭疏窗,沉思往事立残阳'
					}
				],
				itemList:[]
				// itemList: [
				// 	{
				// 		title: "你好你好",
				// 		brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
				// 		time: "181818",
				// 		id: 1
				// 	},
				// 	{
				// 		title: "hello",
				// 		brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
				// 		time: "181818",
				// 		id: 2
				// 	},
				// 	{
				// 		title: "hello",
				// 		brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
				// 		time: "181818",
				// 		id: 3
				// 	},
				// 	{
				// 		title: "hello",
				// 		brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
				// 		time: "181818",
				// 		id: 4
				// 	}
				// ]
			}
		},
		onLoad() {
			
		},
		mounted() {
			const _this = this;
			this.$axios({
				method: 'GET',
				url: '/indexitems',
				params: {}
			}).then(res => {
				console.log('res',res);
				_this.itemList = res;
			}).catch(err => console.warn(err))
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.wrap {
		padding: 40rpx;
	}
</style>
