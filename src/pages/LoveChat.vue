<template>
	<div class="chat-page chat-container">
		<header class="header chat-header glass">
			<div class="title">AI 恋爱大师</div>
			<div class="chat-id">ID: {{ chatId }}</div>
		</header>
		<section class="messages chat-stream" ref="listRef">
			<div v-for="(m, i) in chatMessages" :key="i" class="chat-row" :class="m.role">
				<div class="bubble" :class="m.role">{{ m.content }}</div>
			</div>
		</section>
		<footer class="input chat-input glass">
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
/* 局部微调，主体样式复用全局 */
.chat-page { max-width: 1040px; margin: 0 auto; padding: 0 16px; }
.title { font-weight: 800; }
.chat-id { color: var(--muted); font-size: 12px; }
</style>


