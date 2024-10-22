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

  <p>
    StackForDev is an innovative platform designed to simplify and streamline
    your local development environment. Whether you are a beginner or an
    experienced developer, StackForDev empowers you to create customized Docker
    images tailored to your specific programming language and project
    requirements. Imagine starting with a fresh laptop that has only Docker
    installed; you can jump straight into coding without the hassle of
    configuring your machine for every project. Docker allows you to run your
    applications in isolated containers, making it easy to manage dependencies
    and ensuring a consistent development experience across different systems.
  </p>

  <h2>How It Works</h2>
  <p>
    After selecting your preferred programming language and stack of
    dependencies, StackForDev sends a request to an API. This API runs backend
    code that utilizes your choices to craft a custom Dockerfile specifically
    tailored to your development environment. Once the Dockerfile is created,
    you will receive it for download, along with detailed instructions on how to
    build the Docker image and run the container. This ensures you can set up
    your development environment quickly and easily.
  </p>

  <h2>Getting Started</h2>
  <p>
    To start using StackForDev, simply navigate to our <a href="/customise"
      >customise Your Environment</a
    > page. There, you can select your desired programming language, choose a dependency
    stack, and generate your custom Docker image in just a few clicks. It’s that
    simple!
  </p>
</section>

<style>
  .about {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
  }

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.8rem;
    color: #ff5733;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  ul li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #33b5ff;
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }

  .image-container {
    margin: 2rem 0;
    text-align: center; /* Center the image */
  }

  .image-container img {
    max-width: 100%; /* Ensure the image is responsive */
    height: auto; /* Maintain aspect ratio */
  }
</style>
