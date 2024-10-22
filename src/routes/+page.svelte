<script lang="ts">
  import stackForDev from "$lib/images/stack-for-dev.webp";
  import stackForDevFallback from "$lib/images/stack-for-dev.png";
  import stackForDevOnOff from "$lib/images/stack-for-dev-on-off.png";

  let isZoomed = false;
  let isZoomingOut = false;

  const toggleZoom = () => {
    if (isZoomed) {
      isZoomingOut = true;
      setTimeout(() => {
        isZoomed = false;
        isZoomingOut = false;
      }, 300);
    } else {
      isZoomed = true;
    }
  };
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
    <p class="lead">
      StackForDev is your go-to platform for easily customizing your local
      development environment. With just Docker installed on a fresh laptop, you
      can quickly set up isolated development environments by running different
      containers.
    </p>
    <p>
      This allows you to switch between projects effortlessly, ensuring that
      each project has its own set of dependencies without conflicts. No more
      time wasted fixing dependency issues.
    </p>
    <p class="highlight">
      Select your preferred programming language and dependencies, and create
      tailored Docker images to streamline your workflow. Start building your
      ideal development setup today!
    </p>
    <div class="image-container">
      <picture>
        <source srcset={stackForDevOnOff} type="image/webp" />
        <img
          src={stackForDevOnOff}
          alt="Docker Switch On/Off"
          class="on-off-image {isZoomed ? 'zoomed' : ''} {isZoomingOut
            ? 'zooming-out'
            : ''}"
          on:click={toggleZoom}
          on:keydown={(e) => e.key === "Enter" && toggleZoom()}
          role="button"
          tabindex="0"
        />
      </picture>
      <p class="zoom-hint">
        <svg class="zoom-icon" viewBox="0 0 24 24" width="16" height="16">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
          <path fill="currentColor" d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
        </svg>
        Click image to zoom
      </p>
      {#if isZoomed || isZoomingOut}
        <div
          class="overlay {isZoomingOut ? 'fading-out' : ''}"
          on:click={toggleZoom}
          on:keydown={(e) => e.key === "Escape" && toggleZoom()}
        />
      {/if}
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
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(90deg, #ff5733 0%, #33b5ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .description p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1rem 0;
    color: #2c3e50;
  }

  .description .lead {
    font-size: 1.2rem;
    font-weight: 500;
    color: #1a202c;
  }

  .description .highlight {
    background: linear-gradient(
      90deg,
      rgba(51, 181, 255, 0.1) 0%,
      rgba(255, 87, 51, 0.1) 100%
    );
    padding: 1rem;
    border-radius: 8px;
    margin: 1.5rem 0;
  }

  .image-container {
    margin: 1rem 0;
    position: relative;
  }

  .on-off-image {
    width: 75%;
    height: auto;
    max-width: 100%;
    display: block;
    margin: 0 auto;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center center;
    will-change: transform;
  }

  .on-off-image:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  .on-off-image.zoomed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    width: 80%;
    max-height: 85vh;
    z-index: 1000;
    object-fit: contain;
    background: white;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: zoomIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .on-off-image.zooming-out {
    animation: zoomOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes zoomIn {
    from {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 1;
    }
  }

  @keyframes zoomOut {
    from {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -50%) scale(0.8);
      opacity: 0;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 999;
    cursor: pointer;
    transition: background-color 0.3s ease;
    animation: fadeIn 0.3s ease forwards;
  }

  .overlay.fading-out {
    animation: fadeOut 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from {
      background: rgba(0, 0, 0, 0);
    }
    to {
      background: rgba(0, 0, 0, 0.8);
    }
  }

  @keyframes fadeOut {
    from {
      background: rgba(0, 0, 0, 0.8);
    }
    to {
      background: rgba(0, 0, 0, 0);
    }
  }

  /* Add responsive adjustments */
  @media (max-width: 768px) {
    .on-off-image {
      width: 85%;
    }

    .on-off-image.zoomed {
      width: 90%;
      padding: 10px;
    }
  }

  .cta-button {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.8rem 1.6rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    background: linear-gradient(135deg, #ff5733 0%, #33b5ff 100%);
    border-radius: 30px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }

  .cta-button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, #33b5ff 0%, #ff5733 100%);
  }

  .cta-button:active {
    transform: translateY(1px) scale(0.98);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  button {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #ff5733 0%, #33b5ff 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #33b5ff 0%, #ff5733 100%);
  }

  button:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
</style>
