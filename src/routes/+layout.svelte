<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			<a href="https://github.com/ZisisKostakakis" class="github-link cta-button">Github Profile</a>
		</p>
	</footer>
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
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
		display: inline-block;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		font-size: 1.1rem;
		color: white;
		background: linear-gradient(90deg, #ff5733 0%, #33b5ff 100%);
		border-radius: 30px;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		transition: background 0.4s ease, transform 0.2s ease, box-shadow 0.2s;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	footer a:hover {
		background: linear-gradient(90deg, #33b5ff 0%, #ff5733 100%);
		transform: scale(1.05);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	}

	footer a:active {
		transform: scale(0.95);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	footer a:after {
		content: '';
		position: absolute;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		transform: scale(0);
		pointer-events: none;
		animation: ripple 0.6s linear;
	}

	footer a:focus {
		outline: none;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
