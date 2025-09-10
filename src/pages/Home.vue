<template>
	<div class="home">
		<div class="hero glass">
			<h1>AI 应用合集</h1>
			<p class="sub">探索恋爱话术与超级智能体，实时对话，灵感不停。</p>
		</div>
		<nav class="nav">
			<router-link to="/love" class="card glass">
				<div class="icon gradient-pink"></div>
				<div class="title">AI 恋爱大师</div>
				<div class="desc">情感交流与话术灵感，甜度加倍</div>
			</router-link>
			<router-link to="/manus" class="card glass">
				<div class="icon gradient-cyan"></div>
				<div class="title">AI 超级智能体</div>
				<div class="desc">多步骤推理与执行，分步呈现</div>
			</router-link>
		</nav>
	</div>
</template>

<script setup>
</script>

<style scoped>
.home { max-width: 1040px; margin: 40px auto; padding: 0 16px; }
.hero { padding: 28px 24px; text-align: center; }
.hero h1 { margin: 0 0 6px; }
.hero .sub { margin: 0; color: var(--muted); }
.nav {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 18px;
	margin-top: 24px;
}
.card {
	display: block;
	padding: 22px 20px;
	border-radius: 16px;
	text-decoration: none;
	color: var(--text);
	text-align: left;
	font-weight: 600;
	transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.card:hover { transform: translateY(-3px); box-shadow: var(--glow); }
.card .icon { width: 42px; height: 42px; border-radius: 12px; margin-bottom: 12px; }
.gradient-pink { background: linear-gradient(135deg, #ff72b6, #7c5cff); box-shadow: 0 0 24px rgba(255,114,182,.35); }
.gradient-cyan { background: linear-gradient(135deg, #00e0ff, #7c5cff); box-shadow: 0 0 24px rgba(0,224,255,.35); }
.card .title { font-size: 18px; margin-bottom: 6px; }
.card .desc { font-size: 13px; font-weight: 500; color: var(--muted); }
</style>


