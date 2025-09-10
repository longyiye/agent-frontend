<template>
	<div class="chat-page">
		<header class="header">
			<div class="title">AI 恋爱大师</div>
			<div class="chat-id">ID: {{ chatId }}</div>
		</header>
		<section class="messages" ref="listRef">
			<div v-for="(m, i) in chatMessages" :key="i" class="msg" :class="m.role">
				<div class="bubble">{{ m.content }}</div>
			</div>
		</section>
		<footer class="input">
			<input v-model="input" @keyup.enter="send" placeholder="输入消息并回车..." />
			<button :disabled="!input || isStreaming" @click="send">发送</button>
		</footer>
	</div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useSseChat } from '../composables/useSseChat';

const listRef = ref(null);
const input = ref('');
const chatMessages = ref([]);
const chatId = crypto.randomUUID();

function scrollToBottom() {
	nextTick(() => {
		listRef.value?.scrollTo({ top: listRef.value.scrollHeight, behavior: 'smooth' });
	});
}

const { isStreaming, error, start, stop } = useSseChat({ url: '' });

function send() {
	const userText = input.value.trim();
	if (!userText) return;
	chatMessages.value.push({ role: 'user', content: userText });
	input.value = '';
	scrollToBottom();

	// 恋爱大师 SSE 接口
	const base = 'http://localhost:8123/api/ai/love_app/chat/sse';
	const qs = new URLSearchParams({ message: userText, chatId }).toString();
	const url = `${base}?${qs}`;

	let aiIndex = chatMessages.value.push({ role: 'ai', content: '' }) - 1;
	start((chunk) => {
		if (chunk === '[DONE]') {
			stop();
			return;
		}
		chatMessages.value[aiIndex].content += chunk;
		scrollToBottom();
	}, url);
}
</script>

<style scoped>
.chat-page {
	max-width: 960px;
	height: 100vh;
	margin: 0 auto;
	display: grid;
	grid-template-rows: auto 1fr auto;
	padding: 0 16px;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	border-bottom: 1px solid #eee;
}
.title { font-weight: 700; }
.chat-id { color: #666; font-size: 12px; }
.messages {
	overflow: auto;
	padding: 16px 0;
	display: flex;
	flex-direction: column;
	gap: 12px;
}
.msg { display: flex; }
.msg.user { justify-content: flex-end; }
.msg.ai { justify-content: flex-start; }
.bubble {
	max-width: 70%;
	padding: 10px 12px;
	border-radius: 12px;
	background: #f5f5f5;
}
.msg.user .bubble { background: #4f7cff; color: #fff; }
.input {
	display: flex;
	gap: 8px;
	padding: 12px 0;
	border-top: 1px solid #eee;
}
.input input {
	flex: 1;
	border: 1px solid #ddd;
	border-radius: 8px;
	padding: 10px 12px;
}
.input button {
	padding: 10px 16px;
	border: none;
	border-radius: 8px;
	background: #4f7cff;
	color: #fff;
	cursor: pointer;
}
.input button:disabled { opacity: .6; cursor: not-allowed; }
</style>


