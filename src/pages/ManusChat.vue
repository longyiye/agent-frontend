<template>
	<div class="chat-page chat-container">
		<header class="header chat-header glass">
			<div class="title">AI 超级智能体</div>
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
import { useSseChat } from '../composables/useSseChat';

const listRef = ref(null);
const input = ref('');
const chatMessages = ref([]);

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

	// Manus 接口（SseEmitter）
	const base = 'http://localhost:8123/api/ai/manus/chat';
	const qs = new URLSearchParams({ message: userText }).toString();
	const url = `${base}?${qs}`;

	start((chunk) => {
		if (!chunk) return;
		if (chunk === '[DONE]') {
			stop();
			return;
		}
		const lines = String(chunk).split(/\r?\n/).filter(Boolean);
		for (const line of lines) {
			chatMessages.value.push({ role: 'ai', content: line });
		}
		scrollToBottom();
	}, url);
}
</script>

<style scoped>
/* 局部微调，主体样式复用全局 */
.chat-page { max-width: 1040px; margin: 0 auto; padding: 0 16px; }
.title { font-weight: 800; }
</style>


