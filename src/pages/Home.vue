<template>
	<div class="home">
		<h1>AI 应用合集</h1>
		<nav class="nav">
			<router-link to="/love" class="card">AI 恋爱大师</router-link>
			<router-link to="/manus" class="card">AI 超级智能体</router-link>
		</nav>
	</div>
</template>

<script setup>
</script>

<style scoped>
.home {
	max-width: 960px;
	margin: 40px auto;
	padding: 0 16px;
}
.nav {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 16px;
	margin-top: 24px;
}
.card {
	display: block;
	padding: 16px;
	border-radius: 12px;
	background: #ffffff;
	border: 1px solid #eee;
	text-decoration: none;
	color: #333;
	text-align: center;
	font-weight: 600;
	transition: all .2s ease;
}
.card:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 20px rgba(0,0,0,.08);
}
</style>


