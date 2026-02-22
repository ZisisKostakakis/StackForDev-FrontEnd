<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>StackForDev — Docker dev environments, simplified</title>
	<meta name="description" content="Generate custom Docker development environments in seconds. Choose your language, pick your stack, get a Dockerfile." />
</svelte:head>

<section class="hero">
	<h1>
		Dev environments,<br />
		<span class="accent">simplified.</span>
	</h1>
	<p class="subtitle">
		Generate custom Docker development environments in seconds.
		Choose your language, pick your stack, get a Dockerfile.
	</p>
	<div class="hero-actions">
		<a href="/customise" class="btn-primary">Get started</a>
		<a href="/about" class="btn-ghost">Learn more</a>
	</div>
</section>

<section class="features">
	<div class="feature-card" use:reveal>
		<div class="feature-icon">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="16 18 22 12 16 6" />
				<polyline points="8 6 2 12 8 18" />
			</svg>
		</div>
		<h3>Choose Language</h3>
		<p>Python, JavaScript, Go, Rust, or Java — select your preferred language and version.</p>
	</div>

	<div class="feature-card" use:reveal={{ delay: 100 }}>
		<div class="feature-icon">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="3" y="3" width="7" height="7" />
				<rect x="14" y="3" width="7" height="7" />
				<rect x="14" y="14" width="7" height="7" />
				<rect x="3" y="14" width="7" height="7" />
			</svg>
		</div>
		<h3>Pick Stack</h3>
		<p>Curated dependency stacks for web, data science, ML, microservices, and more.</p>
	</div>

	<div class="feature-card" use:reveal={{ delay: 200 }}>
		<div class="feature-icon">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<polyline points="14 2 14 8 20 8" />
				<line x1="16" y1="13" x2="8" y2="13" />
				<line x1="16" y1="17" x2="8" y2="17" />
				<polyline points="10 9 9 9 8 9" />
			</svg>
		</div>
		<h3>Get Dockerfile</h3>
		<p>Receive a production-ready Dockerfile with build and run instructions instantly.</p>
	</div>
</section>

<style>
	/* ── Hero ── */
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: var(--space-16) 0 var(--space-20);
		gap: var(--space-6);
	}

	h1 {
		font-size: var(--text-5xl);
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.03em;
		color: var(--color-text);
	}

	.accent {
		color: var(--accent);
	}

	.subtitle {
		font-size: var(--text-lg);
		max-width: 32rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	.hero-actions {
		display: flex;
		gap: var(--space-3);
		margin-top: var(--space-2);
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-base);
		font-weight: 600;
		color: white;
		background-color: var(--accent);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: background-color var(--duration-fast) var(--ease-out),
			transform var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
		box-shadow: var(--shadow-sm);
	}

	.btn-primary:hover {
		background-color: var(--accent-hover);
		color: white;
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.btn-primary:active {
		transform: translateY(0);
		box-shadow: var(--shadow-xs);
	}

	.btn-ghost {
		display: inline-flex;
		align-items: center;
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text-secondary);
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out);
	}

	.btn-ghost:hover {
		color: var(--color-text);
		border-color: var(--color-text-tertiary);
		background-color: var(--color-bg-inset);
	}

	/* ── Features ── */
	.features {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
		padding-bottom: var(--space-16);
	}

	.feature-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background-color: var(--color-bg-raised);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		transition: border-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out),
			transform var(--duration-fast) var(--ease-out);
	}

	.feature-card:hover {
		border-color: var(--color-text-tertiary);
		box-shadow: var(--shadow-md);
		transform: translateY(-2px);
	}

	.feature-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-md);
		background-color: var(--accent-subtle);
		color: var(--accent);
	}

	.feature-card h3 {
		font-size: var(--text-lg);
		font-weight: 600;
	}

	.feature-card p {
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	/* ── Container queries ── */
	@container (max-width: 600px) {
		.features {
			grid-template-columns: 1fr;
		}
	}

	@container (min-width: 601px) and (max-width: 800px) {
		.features {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.hero {
			padding: var(--space-10) 0 var(--space-12);
		}

		.hero-actions {
			flex-direction: column;
			width: 100%;
		}

		.btn-primary,
		.btn-ghost {
			justify-content: center;
		}
	}
</style>
