<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div class="app">
	<Header />
	<main>
		{@render children()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		padding: var(--space-4) var(--space-4);
		container-type: inline-size;
	}

	@media (min-width: 480px) {
		main {
			padding: var(--space-8) var(--space-6);
		}
	}
</style>
