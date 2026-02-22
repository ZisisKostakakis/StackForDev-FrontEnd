<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>About — StackForDev</title>
	<meta name="description" content="Learn how StackForDev helps you generate custom Docker development environments." />
</svelte:head>

<section class="about">
	<div class="about-header">
		<h1>About StackForDev</h1>
		<p class="subtitle">
			A platform for generating custom Docker development environments — so you can start coding, not configuring.
		</p>
	</div>

	<div class="bento">
		<div class="bento-card bento-wide" use:reveal>
			<h2>What it does</h2>
			<p>
				StackForDev generates production-ready Dockerfiles tailored to your specific language and dependency stack.
				Start with a fresh machine that has only Docker installed and jump straight into coding — no dependency
				conflicts, no configuration headaches.
			</p>
		</div>

		<div class="bento-card" use:reveal={{ delay: 100 }}>
			<h2>How it works</h2>
			<ol>
				<li>Choose your programming language and version</li>
				<li>Select a curated dependency stack</li>
				<li>Optionally add custom dependencies</li>
				<li>Generate your Dockerfile with one click</li>
				<li>Build the image and start developing</li>
			</ol>
		</div>

		<div class="bento-card" use:reveal={{ delay: 200 }}>
			<h2>Why Docker?</h2>
			<p>
				Docker containers isolate your development environments, ensuring each project has its own dependencies
				without conflicts. Switch between projects effortlessly and keep your machine clean.
			</p>
		</div>

		<div class="bento-card bento-wide" use:reveal={{ delay: 300 }}>
			<div class="cta-content">
				<div>
					<h2>Ready to get started?</h2>
					<p>Configure your environment in just a few clicks.</p>
				</div>
				<a href="/customise" class="btn-primary">Customise your environment</a>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		display: flex;
		flex-direction: column;
		gap: var(--space-10);
		padding: var(--space-12) 0 var(--space-16);
	}

	.about-header {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	h1 {
		font-size: var(--text-4xl);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.subtitle {
		font-size: var(--text-lg);
		max-width: 36rem;
		margin: 0 auto;
		color: var(--color-text-secondary);
	}

	/* ── Bento Grid ── */
	.bento {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.bento-card {
		background-color: var(--color-bg-raised);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		transition: border-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
	}

	.bento-card:hover {
		border-color: var(--color-text-tertiary);
		box-shadow: var(--shadow-sm);
	}

	.bento-wide {
		grid-column: 1 / -1;
	}

	h2 {
		font-size: var(--text-xl);
		font-weight: 600;
	}

	.bento-card p {
		font-size: var(--text-base);
		line-height: 1.7;
	}

	ol {
		margin: 0;
		padding-left: var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	ol li {
		font-size: var(--text-base);
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	ol li::marker {
		color: var(--accent);
		font-weight: 600;
	}

	/* ── CTA Card ── */
	.cta-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
		flex-wrap: wrap;
	}

	.cta-content > div {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
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
		white-space: nowrap;
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

	/* ── Container queries ── */
	@container (max-width: 550px) {
		.bento {
			grid-template-columns: 1fr;
		}

		.cta-content {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (max-width: 480px) {
		.about {
			padding: var(--space-8) 0 var(--space-12);
		}
	}
</style>
