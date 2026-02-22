<script lang="ts">
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import type { ActionData } from './$types';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	let { form }: { form: ActionData } = $props();

	let selectedLanguage = $state('');
	let selectedDependency = $state('');
	let selectedDependencies: string[] = $state([]);
	let customExtras = $state('');
	let customDependencies: string[] = $state([]);
	let selectedDependencyDescription = $state('');
	let selectedVersion = $state('');
	let languages = ['Python', 'JavaScript', 'Go', 'Rust', 'Java'];
	let isLoading = $state(false);
	let errorMessage = $state('');
	let generatedDockerfile = $state('');

	const languageIcons: Record<string, string> = {
		Python: 'Py',
		JavaScript: 'JS',
		Go: 'Go',
		Rust: 'Rs',
		Java: 'Jv'
	};

	const languageVersions: Record<string, string[]> = {
		Python: ['3.12', '3.11', '3.10', '3.9'],
		JavaScript: ['22', '20', '18'],
		Go: ['1.23', '1.22', '1.21'],
		Rust: ['1.82', '1.81', '1.80'],
		Java: ['21', '17', '11']
	};

	const dependencies = {
		Python: [
			{ name: 'Django Stack', description: 'Includes Django, Django REST framework, psycopg2, Pillow, djangorestframework-simplejwt, and requests. A solid stack for building robust web applications quickly.' },
			{ name: 'Flask Stack', description: 'Includes Flask, Flask-RESTful, Flask-SQLAlchemy, Flask-Migrate, and requests. A lightweight stack for developing RESTful APIs with Python.' },
			{ name: 'Data Science Stack', description: 'Includes Pandas, NumPy, Matplotlib, Scikit-learn, and Jupyter. Perfect for data manipulation, analysis, and visualization.' },
			{ name: 'Web Scraping Stack', description: 'Includes Beautiful Soup, Scrapy, requests, lxml, and pandas. Ideal for web scraping and data extraction projects.' },
			{ name: 'Machine Learning Stack', description: 'Includes scikit-learn, TensorFlow, Keras, NumPy, and Matplotlib. A comprehensive stack for building machine learning models.' }
		],
		JavaScript: [
			{ name: 'Express Stack', description: 'Includes Express, Mongoose, body-parser, cors, and dotenv. A well-rounded stack for building REST APIs with Node.js.' },
			{ name: 'React Stack', description: 'Includes React, React Router, Redux, Axios, and styled-components. A popular stack for creating dynamic user interfaces.' },
			{ name: 'Vue.js Stack', description: 'Includes Vue.js, Vue Router, Vuex, Axios, and Vuetify. Great for building user-friendly single-page applications.' },
			{ name: 'Node.js API Stack', description: 'Includes Node.js, Express, MongoDB, Mongoose, and JWT. An efficient stack for creating secure APIs.' },
			{ name: 'Full-Stack JavaScript', description: 'Includes Node.js, Express, MongoDB, React, and Redux. A powerful stack for developing full-stack applications.' }
		],
		Go: [
			{ name: 'Gin Stack', description: 'Includes Gin, Gorm, PostgreSQL, Redis, and JWT. A high-performance stack for building REST APIs and web services.' },
			{ name: 'Beego Stack', description: 'Includes Beego, ORM, Go Swagger, and NATS. A full-featured stack for rapid application development.' },
			{ name: 'Web Framework Stack', description: 'Includes Echo, Gorilla Mux, Gorm, JWT, and Viper. Excellent for creating scalable web applications.' },
			{ name: 'Microservices Stack', description: 'Includes Go Kit, Go Micro, NATS, gRPC, and Docker. Perfect for developing microservices architecture.' },
			{ name: 'Data Processing Stack', description: 'Includes Go, Ginkgo, Gomega, PostgreSQL, and Redis. Suitable for building data processing applications.' }
		],
		Rust: [
			{ name: 'Actix-Web Stack', description: 'Includes Actix-web, Serde, and Tokio. A high-performance async web framework stack for building fast HTTP services.' },
			{ name: 'CLI Tools Stack', description: 'Includes Clap and Anyhow. A lightweight stack for building robust command-line applications in Rust.' },
			{ name: 'WebAssembly Stack', description: 'Includes wasm-bindgen-cli. A stack for compiling Rust to WebAssembly and interoperating with JavaScript.' }
		],
		Java: [
			{ name: 'Spring Boot Stack', description: 'Spring Boot with embedded Tomcat, auto-configuration, and production-ready features. The standard stack for building Java microservices and REST APIs.' },
			{ name: 'Maven Build Stack', description: 'Maven wrapper with dependency management via pom.xml. Ideal for projects following the Maven build lifecycle.' },
			{ name: 'Gradle Build Stack', description: 'Gradle build tooling with Groovy/Kotlin DSL support. Great for flexible, high-performance Java builds.' }
		]
	} as const;

	let completedSteps = $derived(
		(selectedLanguage ? 1 : 0) + (selectedDependency ? 1 : 0) + (selectedVersion ? 1 : 0)
	);

	function handleCustomInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		customExtras = target.value;
		customDependencies = customExtras.split(',').map((dep) => dep.trim()).filter((dep) => dep.length > 0);
	}

	$effect(() => {
		if (selectedLanguage && selectedDependency) {
			selectedDependencyDescription =
				dependencies[selectedLanguage as keyof typeof dependencies].find(
					(dep) => dep.name === selectedDependency
				)?.description || '';
			selectedDependencies = selectedDependency ? [selectedDependency] : [];
		} else {
			selectedDependencyDescription = '';
			selectedDependencies = [];
		}
	});

	function generateDockerfile() {
		if (!selectedLanguage || !selectedDependency || !selectedVersion) {
			errorMessage = 'Please select a language, dependency stack, and version.';
			return;
		}
		errorMessage = '';
		generatedDockerfile = '';
	}

	$effect(() => {
		if (form?.dockerfile) generatedDockerfile = form.dockerfile;
		if (form?.error) errorMessage = form.error;
	});

	function getDockerRunCommand(): string {
		const lang = selectedLanguage.toLowerCase();
		const ver = selectedVersion;
		const tag = `stackfordev-${lang}:${ver}`;
		return `docker run --rm -it -v $(pwd):/usr/src/app ${tag} bash`;
	}

	function resetAll() {
		selectedLanguage = '';
		selectedDependencies = [];
		customExtras = '';
		customDependencies = [];
		selectedDependencyDescription = '';
		selectedDependency = '';
		selectedVersion = '';
		generatedDockerfile = '';
		errorMessage = '';
	}
</script>

<svelte:head>
	<title>Customise — StackForDev</title>
	<meta name="description" content="Customize your development environment with StackForDev" />
</svelte:head>

<section class="customise">
	<div class="page-header">
		<h1>Customise your environment</h1>
		<p class="subtitle">Select your language, stack, and version to generate a Dockerfile.</p>
	</div>

	<!-- Step Progress -->
	<div class="progress-bar">
		<div class="progress-track">
			<div class="progress-fill" style="width: {(completedSteps / 3) * 100}%"></div>
		</div>
		<span class="progress-label">{completedSteps} of 3 steps complete</span>
	</div>

	<div class="steps">
		<!-- Step 1: Language -->
		<div class="step-card">
			<div class="step-header">
				<span class="step-number">1</span>
				<h2>Language</h2>
			</div>
			<div class="radio-grid">
				{#each languages as language}
					<label class="radio-card" class:selected={selectedLanguage === language}>
						<input
							type="radio"
							name="language"
							value={language}
							bind:group={selectedLanguage}
							onchange={() => {
								selectedDependencies = [];
								selectedDependencyDescription = '';
								selectedDependency = '';
								selectedVersion = '';
								generatedDockerfile = '';
								errorMessage = '';
							}}
						/>
						<span class="radio-icon">{languageIcons[language]}</span>
						<span class="radio-label">{language}</span>
					</label>
				{/each}
			</div>
		</div>

		<!-- Step 2: Dependencies -->
		{#if selectedLanguage}
			<div class="step-card" transition:slide={{ duration: 250 }}>
				<div class="step-header">
					<span class="step-number">2</span>
					<h2>Dependency Stack</h2>
				</div>
				<div class="dep-grid">
					{#each dependencies[selectedLanguage as keyof typeof dependencies] as dep}
						<label class="dep-card" class:selected={selectedDependency === dep.name}>
							<input
								type="radio"
								name="dependency"
								value={dep.name}
								bind:group={selectedDependency}
							/>
							<span class="dep-name">{dep.name}</span>
							<span class="dep-desc">{dep.description}</span>
						</label>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Step 3: Version -->
		{#if selectedLanguage && selectedDependency}
			<div class="step-card" transition:slide={{ duration: 250 }}>
				<div class="step-header">
					<span class="step-number">3</span>
					<h2>Version</h2>
				</div>
				<label class="select-wrapper" for="version-select">
					<select id="version-select" bind:value={selectedVersion}>
						<option value="" disabled selected>Select a version</option>
						{#each languageVersions[selectedLanguage] as version}
							<option value={version}>{selectedLanguage} {version}</option>
						{/each}
					</select>
				</label>
			</div>
		{/if}

		<!-- Custom Extras -->
		{#if selectedVersion}
			<div class="step-card" transition:slide={{ duration: 250 }}>
				<div class="step-header">
					<h2>Custom extras <span class="optional">(optional)</span></h2>
				</div>
				<label class="textarea-wrapper" for="custom-extras">
					<span class="hint">Enter additional dependencies, separated by commas</span>
					<textarea
						id="custom-extras"
						bind:value={customExtras}
						oninput={handleCustomInput}
						placeholder="e.g. numpy, pandas, requests"
						rows="3"
					></textarea>
				</label>
				{#if customDependencies.length > 0}
					<div class="tag-list">
						{#each customDependencies as dependency}
							<span class="tag">{dependency}</span>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<!-- Summary -->
		{#if selectedVersion}
			<div class="step-card summary-card" transition:slide={{ duration: 250 }}>
				<h2>Summary</h2>
				<div class="summary-grid">
					<div class="summary-item">
						<span class="summary-label">Language</span>
						<span class="summary-value">{selectedLanguage} {selectedVersion}</span>
					</div>
					<div class="summary-item">
						<span class="summary-label">Stack</span>
						<span class="summary-value">{selectedDependency || 'None'}</span>
					</div>
					{#if customDependencies.length > 0}
						<div class="summary-item">
							<span class="summary-label">Extras</span>
							<div class="tag-list">
								{#each customDependencies as dep}
									<span class="tag tag-sm">{dep}</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Actions -->
		<form
			method="POST"
			action="?/generate"
			use:enhance={() => {
				generateDockerfile();
				isLoading = true;
				return async ({ update }) => {
					await update();
					isLoading = false;
				};
			}}
		>
			<input
				type="hidden"
				name="config"
				value={JSON.stringify({
					language: selectedLanguage,
					dependency_stack: selectedDependency,
					extra_dependencies: customDependencies,
					language_version: selectedVersion
				})}
			/>
			<div class="action-bar">
				<button
					type="submit"
					class="btn-primary"
					disabled={isLoading || !selectedLanguage || !selectedDependency || !selectedVersion}
				>
					{#if isLoading}
						<span class="spinner"></span>
						Generating...
					{:else}
						Generate Dockerfile
					{/if}
				</button>
				<button type="button" class="btn-ghost" onclick={resetAll}>
					Reset
				</button>
			</div>
		</form>

		<!-- Error -->
		{#if errorMessage}
			<div class="error-card" transition:slide={{ duration: 250 }}>
				<p>{errorMessage}</p>
			</div>
		{/if}

		<!-- Result -->
		{#if isLoading && !generatedDockerfile}
			<div class="skeleton-block" transition:slide={{ duration: 250 }}>
				<div class="skeleton-line wide"></div>
				<div class="skeleton-line"></div>
				<div class="skeleton-line"></div>
				<div class="skeleton-line short"></div>
			</div>
		{/if}

		{#if generatedDockerfile}
			<div class="result" transition:slide={{ duration: 250 }}>
				<CodeBlock code={generatedDockerfile} title="Dockerfile" />
				<CodeBlock code={getDockerRunCommand()} title="Run command" lang="bash" />
			</div>
		{/if}
	</div>
</section>

<style>
	.customise {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		padding: var(--space-10) 0 var(--space-16);
		max-width: 48rem;
		margin: 0 auto;
		width: 100%;
	}

	.page-header {
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	h1 {
		font-size: var(--text-4xl);
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.subtitle {
		font-size: var(--text-lg);
		color: var(--color-text-secondary);
	}

	/* ── Progress ── */
	.progress-bar {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.progress-track {
		flex: 1;
		height: 4px;
		background-color: var(--color-border);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background-color: var(--accent);
		border-radius: var(--radius-full);
		transition: width var(--duration-normal) var(--ease-out);
	}

	.progress-label {
		font-size: var(--text-xs);
		color: var(--color-text-tertiary);
		white-space: nowrap;
	}

	/* ── Steps ── */
	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.step-card {
		background-color: var(--color-bg-raised);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.step-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.step-number {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--accent);
		background-color: var(--accent-subtle);
		border-radius: var(--radius-full);
	}

	h2 {
		font-size: var(--text-lg);
		font-weight: 600;
	}

	.optional {
		font-size: var(--text-sm);
		font-weight: 400;
		color: var(--color-text-tertiary);
	}

	/* ── Radio Cards (Language) ── */
	.radio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
		gap: var(--space-3);
	}

	.radio-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-4) var(--space-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: border-color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
	}

	.radio-card input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.radio-card:hover {
		border-color: var(--color-text-tertiary);
		background-color: var(--color-bg-inset);
	}

	.radio-card.selected {
		border-color: var(--accent);
		background-color: var(--accent-subtle);
		box-shadow: 0 0 0 1px var(--accent);
	}

	.radio-card:has(:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.radio-icon {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}

	.radio-label {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
	}

	/* ── Dependency Cards ── */
	.dep-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
		gap: var(--space-3);
	}

	.dep-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-4);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: border-color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
	}

	.dep-card input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.dep-card:hover {
		border-color: var(--color-text-tertiary);
		background-color: var(--color-bg-inset);
	}

	.dep-card.selected {
		border-color: var(--accent);
		background-color: var(--accent-subtle);
		box-shadow: 0 0 0 1px var(--accent);
	}

	.dep-card:has(:focus-visible) {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.dep-name {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
	}

	.dep-desc {
		font-size: var(--text-xs);
		color: var(--color-text-secondary);
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* ── Select ── */
	.select-wrapper {
		display: block;
	}

	select {
		width: 100%;
		padding: var(--space-3);
		font-size: var(--text-base);
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text);
		transition: border-color var(--duration-fast) var(--ease-out);
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right var(--space-3) center;
	}

	select:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 2px var(--accent-subtle);
	}

	/* ── Textarea ── */
	.textarea-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-tertiary);
	}

	textarea {
		width: 100%;
		padding: var(--space-3);
		font-size: var(--text-base);
		background-color: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		color: var(--color-text);
		resize: vertical;
		transition: border-color var(--duration-fast) var(--ease-out);
	}

	textarea:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 2px var(--accent-subtle);
	}

	/* ── Tags ── */
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.tag {
		display: inline-block;
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--accent);
		background-color: var(--accent-subtle);
		border-radius: var(--radius-full);
	}

	.tag-sm {
		font-size: var(--text-xs);
		padding: var(--space-1) var(--space-2);
	}

	/* ── Summary ── */
	.summary-card {
		background-color: var(--color-bg-inset);
		border: 1px solid var(--color-border);
	}

	.summary-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.summary-item {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
	}

	.summary-label {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-tertiary);
		min-width: 5rem;
	}

	.summary-value {
		font-size: var(--text-base);
		font-weight: 500;
		color: var(--color-text);
	}

	/* ── Action Bar ── */
	.action-bar {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
		padding-top: var(--space-2);
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-base);
		font-weight: 600;
		color: white;
		background-color: var(--accent);
		border-radius: var(--radius-lg);
		transition: background-color var(--duration-fast) var(--ease-out),
			transform var(--duration-fast) var(--ease-out),
			box-shadow var(--duration-fast) var(--ease-out);
		box-shadow: var(--shadow-sm);
	}

	.btn-primary:hover:not(:disabled) {
		background-color: var(--accent-hover);
		transform: translateY(-1px);
		box-shadow: var(--shadow-md);
	}

	.btn-primary:active:not(:disabled) {
		transform: translateY(0);
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-ghost {
		padding: var(--space-3) var(--space-6);
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		transition: color var(--duration-fast) var(--ease-out),
			border-color var(--duration-fast) var(--ease-out),
			background-color var(--duration-fast) var(--ease-out);
	}

	.btn-ghost:hover {
		color: var(--color-text);
		border-color: var(--color-text-tertiary);
		background-color: var(--color-bg-inset);
	}

	/* ── Spinner ── */
	.spinner {
		width: 1rem;
		height: 1rem;
		border: 2px solid color-mix(in oklch, white, transparent 60%);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* ── Skeleton ── */
	.skeleton-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background-color: var(--color-bg-raised);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
	}

	.skeleton-line {
		height: 0.75rem;
		width: 80%;
		background: linear-gradient(
			90deg,
			var(--color-border) 25%,
			var(--color-bg-inset) 50%,
			var(--color-border) 75%
		);
		background-size: 200% 100%;
		border-radius: var(--radius-sm);
		animation: shimmer 1.5s ease-in-out infinite;
	}

	.skeleton-line.wide { width: 100%; }
	.skeleton-line.short { width: 50%; }

	@keyframes shimmer {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	/* ── Error ── */
	.error-card {
		padding: var(--space-4);
		border: 1px solid var(--error);
		background-color: var(--error-subtle);
		border-radius: var(--radius-lg);
	}

	.error-card p {
		color: var(--error);
		font-weight: 500;
		font-size: var(--text-sm);
	}

	/* ── Result ── */
	.result {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	/* ── Responsive ── */
	@container (max-width: 480px) {
		.radio-grid {
			grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
		}

		.dep-grid {
			grid-template-columns: 1fr;
		}

		.action-bar {
			flex-direction: column;
		}

		.btn-primary,
		.btn-ghost {
			width: 100%;
			justify-content: center;
		}
	}

	@media (max-width: 480px) {
		.customise {
			padding: var(--space-6) 0 var(--space-10);
		}
	}
</style>
