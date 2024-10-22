<script lang="ts">
	import stackForDev from "$lib/images/stack-for-dev.webp";
	import stackForDevFallback from "$lib/images/stack-for-dev.png";
	import stackForDevOnOff from "$lib/images/stack-for-dev-on-off.png";
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="StackForDev app" />
</svelte:head>

<section class="center">
	<span class="welcome">
		<picture>
			<source srcset={stackForDev} type="image/webp" />
			<img src={stackForDevFallback} alt="Welcome" />
		</picture>
	</span>
	<div class="description">
		<h2>Welcome to StackForDev</h2>
		<p>
			StackForDev is your go-to platform for easily customizing your local
			development environment. With just Docker installed on a fresh laptop, you can quickly set up isolated development environments by running different containers. This allows you to switch between projects effortlessly, ensuring that each project has its own set of dependencies without conflicts. No more time wasted fixing dependency issues.
		</p>
		<p>
			Select your preferred programming language and dependencies, and create tailored Docker images to streamline your workflow. Start building your ideal development setup today!
		</p>
		<div class="image-container">
			<picture>
				<source srcset={stackForDevOnOff} type="image/webp" />
				<img src={stackForDevOnOff} alt="Docker Switch On/Off" class="on-off-image" />
			</picture>
		</div>
		<a href="/customise" class="cta-button">customise Your Environment</a>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		flex: 1;
		padding-top: 2rem;
	}

	.welcome {
		display: block;
		position: relative;
		width: 90%;
		height: auto;
		padding: 0;
		text-align: center;
	}

	.welcome img {
		width: 50%;
		height: auto;
		max-width: 100%;
		border-radius: 45%;
		padding: 10px;
		background-color: white;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		margin: 0 auto;
		display: block;
	}

	.description {
		text-align: center;
		margin-top: 1rem;
		max-width: 600px;
		padding: 0 1rem;
	}

	.description h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.description p {
		font-size: 1rem;
		margin: 0.5rem 0;
	}

	.image-container {
		margin: 1rem 0;
	}

	.on-off-image {
		width: 65%;
		height: auto;
		max-width: 100%;
		display: block;
		margin: 0 auto;
		padding: 10px;
		border: 2px solid #ccc; /* Added border */
		border-radius: 10px; /* Added border radius */
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Added shadow */
	}

	.cta-button {
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

	.cta-button:hover {
		background: linear-gradient(90deg, #33b5ff 0%, #ff5733 100%);
		transform: scale(1.05);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
	}

	.cta-button:active {
		transform: scale(0.95);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.cta-button:after {
		content: '';
		position: absolute;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		transform: scale(0);
		pointer-events: none;
		animation: ripple 0.6s linear;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
</style>
