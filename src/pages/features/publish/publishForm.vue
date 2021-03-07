// 发布新项目的表单页面
<template>
	<div class="container">
		<u-form 
            :model="form" 
            ref="uForm"
        >
			<u-form-item 
                label="标题" 
                prop="name"
            >
				<u-input 
                    v-model="form.name" 
                />
			</u-form-item>

			<u-form-item 
                label="简介" 
                prop="intro"
            >
				<u-input 
                    type="textarea" 
                    v-model="form.intro" 
                    auto-height=true
                />
			</u-form-item>


		</u-form>
		<view>
			<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
			<u-button @click="show = true">打开</u-button>
		</view>

		<u-button @click="submit">发布</u-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				intro: '',
				time: '',
				fenpei: [{}]
			},
			rules: {
				name: [
					{ 
						required: true, 
						message: '请输入标题', 
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change','blur'],
					}
				],
				intro: [
					{
						// min: 5, 
						// message: '简介不能少于5个字', 
						trigger: 'change'
					}
				]
			},
			schoolList: ['工商管理学院','旅游与城乡规划学院','财务与会计学院','统计与数学学院','经济学院','金融学院','食品与生物工程学院','环境科学与工程学院','信息与电子工程学院','计算机与信息工程学院','管理工程与电子商务学院（跨境电商学院）','法学院（知识产权学院）','人文与传播学院','公共管理学院','外国语学院','东方语言与哲学学院','艺术设计学院','马克思主义学院','泰隆金融学院','国际商学院','章乃器学院','MBA学院','国际教育学院','继续教育学院','人民武装学院','杭州商学院'], // 学院列表
			show: true,
			list: [
				{
					value: '1',
					label: '江'
				},
				{
					value: '2',
					label: '湖'
				}
			],
		};
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) { //此处发送给后端在数据库中显示数据，并且显示到首页
					console.log('验证通过');
				} else {
					uni.showToast({
                        title: "表单验证失败",
                        duration: 1000,
                        icon: "none"
                    })
				}
			});
		},
		confirm(e) {
			console.log(e[0]);
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>