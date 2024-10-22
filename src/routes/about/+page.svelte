<script lang="ts">
  // Optional: You can import additional components or styles here if needed.
</script>

<svelte:head>
  <title>About StackForDev</title>
  <meta
    name="description"
    content="Learn more about StackForDev, a customizable local development environment platform."
  />
</svelte:head>

<section class="about">
  <h1>About StackForDev</h1>

  <div class="content">
    <p class="lead">
      StackForDev is an innovative platform designed to simplify and streamline
      your local development environment. Whether you are a beginner or an
      experienced developer, StackForDev empowers you to create customized Docker
      images tailored to your specific programming language and project
      requirements.
    </p>

    <p class="highlight">
      Imagine starting with a fresh laptop that has only Docker installed; you can jump straight into coding without the hassle of configuring your machine for every project. Docker allows you to run your applications in isolated containers, making it easy to manage dependencies and ensuring a consistent development experience across different systems.
    </p>

    <h2>How It Works</h2>
    <p>
      After selecting your preferred programming language and stack of
      dependencies, StackForDev sends a request to an API. This API runs backend
      code that utilizes your choices to craft a custom Dockerfile specifically
      tailored to your development environment. Once the Dockerfile is created,
      you will receive it for download, along with detailed instructions on how to
      build the Docker image and run the container.
    </p>

    <h2>Getting Started</h2>
    <p>
      To start using StackForDev, simply use the button below to begin customizing your environment. You can select your desired programming language, choose a dependency stack, and generate your custom Docker image in just a few clicks.
    </p>

    <a href="/customise" class="cta-button">Customise Your Environment</a>
  </div>
</section>

<style>
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .content {
    width: 100%;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    background: linear-gradient(90deg, #ff5733 0%, #33b5ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
  }

  h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1rem 0;
    color: #2c3e50;
  }

  .lead {
    font-size: 1.2rem;
    font-weight: 500;
    color: #1a202c;
  }

  .highlight {
    background: linear-gradient(90deg, rgba(51, 181, 255, 0.1) 0%, rgba(255, 87, 51, 0.1) 100%);
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
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

  @media (max-width: 768px) {
    .about {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }

    .lead {
      font-size: 1.1rem;
    }
  }
</style>
