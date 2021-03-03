<template>
	<div class="container">
		<u-swiper :list="list"></u-swiper>
		<ul class="list">
			<li class="listItem" 
				v-for="(item, index) in itemList" 
				:key="index"
			>
				<Listitem 
					:itemTitle="item.title | titleEllipsis"
					:itemBrief="item.brief | briefEllipsis"
					:itemTime="item.time"
					:itemId="index"
					type="newsIndex"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
	import Listitem from '../../components/Listitem.vue';

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
				itemList: [
					{
						title: "你好你好",
						brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
						time: "181818"
					},
					{
						title: "hello",
						brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
						time: "181818"
					},
					{
						title: "hello",
						brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
						time: "181818"
					},
					{
						title: "hello",
						brief: "你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好",
						time: "181818"
					}
				]
			}
		},
		onLoad() {
			
		},
		mounted() {
		},
		methods: {
			
		},
		filters: {
			titleEllipsis (value) { // 控制字符长度
			if (!value) return ''
			if (value.length > 8) {
				return value.slice(0,8) + '...'
			}
			return value
			},
			briefEllipsis (value) {
				if (!value) return ''
				if (value.length > 60) {
					return value.slice(0,60) + '...'
				}
				return value
			}
		}
	}
</script>

<style scoped>
	.wrap {
		padding: 40rpx;
	}
</style>
