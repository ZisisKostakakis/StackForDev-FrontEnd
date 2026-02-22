<script lang="ts">
	let { code, title = 'Dockerfile', lang = 'dockerfile' }: { code: string; title?: string; lang?: string } = $props();
	let copied = $state(false);

	function copy() {
		navigator.clipboard.writeText(code);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="code-block">
	<div class="code-header">
		<span class="code-title">{title}</span>
		<button class="copy-btn" onclick={copy} aria-label="Copy code">
			{#if copied}
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" /></svg>
				<span>Copied</span>
			{:else}
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
				<span>Copy</span>
			{/if}
		</button>
	</div>
	<pre><code class="language-{lang}">{code}</code></pre>
</div>

<style>
	.code-block {
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--color-border);
	}

	.code-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-2) var(--space-4);
		background-color: var(--color-code-bg);
		border-bottom: 1px solid color-mix(in oklch, white, transparent 90%);
	}

	.code-title {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		text-transform: lowercase;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		padding: var(--space-1) var(--space-2);
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		border-radius: var(--radius-sm);
		transition: color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out);
	}

	.copy-btn:hover {
		color: var(--color-code-text);
		background-color: color-mix(in oklch, white, transparent 90%);
	}

	pre {
		margin: 0;
		padding: var(--space-4);
		background-color: var(--color-code-bg);
		border-radius: 0;
		overflow-x: auto;
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	code {
		color: var(--color-code-text);
		font-family: var(--font-mono);
	}
</style>
