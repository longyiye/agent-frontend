import { ref, onBeforeUnmount } from 'vue';

/**
 * 通用 SSE 聊天流 Hook
 * @param {Object} options
 * @param {string} options.url 完整 SSE URL（含查询参数）
 */
export function useSseChat({ url }) {
	const messages = ref([]);
	const isStreaming = ref(false);
	const error = ref(null);
	let eventSource = null;

	function start(onChunk, newUrl) {
		const targetUrl = newUrl || url;
		if (!targetUrl) {
			error.value = '缺少 SSE 地址';
			return;
		}
		stop();
		isStreaming.value = true;
		error.value = null;
		// 直接使用 EventSource（GET）
		try {
			eventSource = new EventSource(targetUrl);
			eventSource.onmessage = (ev) => {
				const data = ev.data ?? '';
				if (onChunk) onChunk(data);
			};
			eventSource.onerror = () => {
				isStreaming.value = false;
				error.value = 'SSE 连接出错';
				stop();
			};
		} catch (e) {
			isStreaming.value = false;
			error.value = e?.message || 'SSE 初始化失败';
		}
	}

	function stop() {
		if (eventSource) {
			eventSource.close();
			eventSource = null;
		}
		isStreaming.value = false;
	}

	onBeforeUnmount(stop);

	return { messages, isStreaming, error, start, stop };
}


