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

            <!-- 名额分配需求不清 -->
            <!-- <u-form-item 
                label="简介" 
                prop="intro"
            >
				<u-field 
                    type="textarea" 
                    v-model="form.intro" 
                />
			</u-form-item> -->

		</u-form>
		<u-button @click="submit">提交</u-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
				intro: '',
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
			}
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
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>