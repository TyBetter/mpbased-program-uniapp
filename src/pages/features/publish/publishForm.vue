// 发布新项目的表单页面
<template>
	<div class="container">
		<div class="form">
			<div class="formItem">
				<div class="label">
					项目名称
				</div>
				<div class="input">
					<input 
						type="text"
						placeholder="请输入项目名称"
						v-model="projectName"
					>
				</div>
			</div>

			<div class="formItem">
				<div class="label">
					项目简介
				</div>
				<div class="input text-area">
					<input 
						type="text"
						placeholder="请输入项目简介"
						v-model="projectBrief"
					>
				</div>
			</div>
			
			<div class="formItem">
				<div class="label">
					项目内容
				</div>
				<div class="input text-area">
					<input 
						type="text"
						placeholder="请输入项目内容"
						v-model="projectContent"
					>
				</div>
			</div>

			<div class="formItem">
				<div class="label">
					截止日期
				</div>
				<div class="input">
					<input 
						type="text"
						disabled
						placeholder="请选择项目截止日期"
					>
					<span class="icon">
						<u-icon name="calendar" color="#2979ff" size="60"></u-icon>
					</span>
				</div>
			</div>


		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			projectName: '',
			projectBrief: '',
			projectContent: '',
			projectDeadlin: '',
			schoolList: ['工商管理学院','旅游与城乡规划学院','财务与会计学院','统计与数学学院','经济学院','金融学院','食品与生物工程学院','环境科学与工程学院','信息与电子工程学院','计算机与信息工程学院','管理工程与电子商务学院（跨境电商学院）','法学院（知识产权学院）','人文与传播学院','公共管理学院','外国语学院','东方语言与哲学学院','艺术设计学院','马克思主义学院','泰隆金融学院','国际商学院','章乃器学院','MBA学院','国际教育学院','继续教育学院','人民武装学院','杭州商学院'], // 学院列表

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
		},
		change() {

		}
	},
};
</script>

<style lang="less" scoped>
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px;
	flex-wrap: wrap;
	height: 100%;

	.form {
        display: flex;
        width: 100%;
		align-items: center;
		height: 100%;
		flex-wrap: wrap;

		.formItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			margin-bottom: 15rpx;
			padding: 5px;
			width: 100%;
			border-bottom: 1px solid rgba(159, 212, 255, 0.774);

			.label {
				width: 20%;
				height: 80rpx;
				line-height: 80rpx;
				margin-right: 5%;
			}
			
			.input {
				width: 75%;
				height: 100%;

				input {
					height: 100%;
				}

				.icon {
					float: right;
				}

			}

			.input::after {
				content: '';
				display: block;
				// visibility: hidden;
				clear: both;
			}
		}
    }
}
	
</style>