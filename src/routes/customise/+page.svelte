<script lang="ts">
  import { PUBLIC_API_URL, PUBLIC_API_KEY } from "$env/static/public";

  let selectedLanguage = "";
  let selectedDependency = "";
  let selectedDependencies: string[] = [];
  let customExtras = "";
  let customDependencies: string[] = [];
  let selectedDependencyDescription = "";
  let selectedVersion = "";
  let languages = ["Python", "JavaScript", "Go"];
  let isLoading = false;
  let errorMessage = "";
  let generatedDockerfile = "";
  let copied = false;

  const languageVersions: Record<string, string[]> = {
    Python: ["3.12", "3.11", "3.10", "3.9"],
    JavaScript: ["22", "20", "18"],
    Go: ["1.23", "1.22", "1.21"],
  };

  const dependencies = {
    Python: [
      {
        name: "Django Stack",
        description:
          "Includes Django, Django REST framework, psycopg2, Pillow, djangorestframework-simplejwt, and requests. A solid stack for building robust web applications quickly.",
      },
      {
        name: "Flask Stack",
        description:
          "Includes Flask, Flask-RESTful, Flask-SQLAlchemy, Flask-Migrate, and requests. A lightweight stack for developing RESTful APIs with Python.",
      },
      {
        name: "Data Science Stack",
        description:
          "Includes Pandas, NumPy, Matplotlib, Scikit-learn, and Jupyter. Perfect for data manipulation, analysis, and visualization.",
      },
      {
        name: "Web Scraping Stack",
        description:
          "Includes Beautiful Soup, Scrapy, requests, lxml, and pandas. Ideal for web scraping and data extraction projects.",
      },
      {
        name: "Machine Learning Stack",
        description:
          "Includes scikit-learn, TensorFlow, Keras, NumPy, and Matplotlib. A comprehensive stack for building machine learning models.",
      },
    ],
    JavaScript: [
      {
        name: "Express Stack",
        description:
          "Includes Express, Mongoose, body-parser, cors, and dotenv. A well-rounded stack for building REST APIs with Node.js.",
      },
      {
        name: "React Stack",
        description:
          "Includes React, React Router, Redux, Axios, and styled-components. A popular stack for creating dynamic user interfaces.",
      },
      {
        name: "Vue.js Stack",
        description:
          "Includes Vue.js, Vue Router, Vuex, Axios, and Vuetify. Great for building user-friendly single-page applications.",
      },
      {
        name: "Node.js API Stack",
        description:
          "Includes Node.js, Express, MongoDB, Mongoose, and JWT. An efficient stack for creating secure APIs.",
      },
      {
        name: "Full-Stack JavaScript",
        description:
          "Includes Node.js, Express, MongoDB, React, and Redux. A powerful stack for developing full-stack applications.",
      },
    ],
    Go: [
      {
        name: "Gin Stack",
        description:
          "Includes Gin, Gorm, PostgreSQL, Redis, and JWT. A high-performance stack for building REST APIs and web services.",
      },
      {
        name: "Beego Stack",
        description:
          "Includes Beego, ORM, Go Swagger, and NATS. A full-featured stack for rapid application development.",
      },
      {
        name: "Web Framework Stack",
        description:
          "Includes Echo, Gorilla Mux, Gorm, JWT, and Viper. Excellent for creating scalable web applications.",
      },
      {
        name: "Microservices Stack",
        description:
          "Includes Go Kit, Go Micro, NATS, gRPC, and Docker. Perfect for developing microservices architecture.",
      },
      {
        name: "Data Processing Stack",
        description:
          "Includes Go, Ginkgo, Gomega, PostgreSQL, and Redis. Suitable for building data processing applications.",
      },
    ],
  } as const;

  function updateSelectedDependency(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    selectedDependency = selectedValue;
    selectedDependencyDescription =
      dependencies[selectedLanguage as keyof typeof dependencies].find(
        (dep) => dep.name === selectedValue
      )?.description || "";
    selectedDependencies = selectedValue ? [selectedValue] : [];
  }

  function handleCustomInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    customExtras = target.value;

    customDependencies = customExtras
      .split(",")
      .map((dep) => dep.trim())
      .filter((dep) => dep.length > 0);
  }

  async function generateDockerfile() {
    if (!selectedLanguage || !selectedDependency || !selectedVersion) {
      errorMessage = "Please select a language, dependency stack, and version.";
      return;
    }

    isLoading = true;
    errorMessage = "";
    generatedDockerfile = "";

    try {
      const res = await fetch(`${PUBLIC_API_URL}/generate-dockerfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          config: {
            language: selectedLanguage,
            dependency_stack: selectedDependency,
            extra_dependencies: customDependencies,
            language_version: selectedVersion,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        errorMessage = data.error || `Request failed with status ${res.status}`;
        return;
      }

      generatedDockerfile = data.dockerfile;
    } catch (e) {
      errorMessage = e instanceof Error ? e.message : "Network error. Please try again.";
    } finally {
      isLoading = false;
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }

  function getDockerRunCommand(): string {
    const lang = selectedLanguage.toLowerCase();
    const ver = selectedVersion;
    const tag = `stackfordev-${lang}:${ver}`;
    return `docker run --rm -it -v $(pwd):/usr/src/app ${tag} bash`;
  }
</script>

<svelte:head>
  <title>Customise Your Environment</title>
  <meta
    name="description"
    content="Customize your development environment with StackForDev"
  />
</svelte:head>

<section class="customise">
  <h1>Customise Your Environment</h1>
  <p class="lead">
    Select your preferred programming language and dependencies to create your
    perfect development environment.
  </p>

  <div class="content">
    <div class="card">
      <h2>Select Language</h2>
      <select
        bind:value={selectedLanguage}
        on:change={() => {
          selectedDependencies = [];
          selectedDependencyDescription = "";
          selectedDependency = "";
          selectedVersion = "";
          generatedDockerfile = "";
          errorMessage = "";
        }}
      >
        <option value="" disabled>Select a language</option>
        {#each languages as language}
          <option value={language}>{language}</option>
        {/each}
      </select>
    </div>

    <div class="card">
      <h2>Select Dependencies Stack</h2>
      <select
        bind:value={selectedDependency}
        on:change={updateSelectedDependency}
        disabled={!selectedLanguage}
      >
        <option value="" disabled>Select a dependency</option>
        {#if selectedLanguage}
          {#each dependencies[selectedLanguage as keyof typeof dependencies] as dep}
            <option value={dep.name}>{dep.name}</option>
          {/each}
        {/if}
      </select>
      {#if selectedDependencyDescription}
        <p class="description">{selectedDependencyDescription}</p>
      {/if}
    </div>

    <div class="card">
      <h2>Select Version</h2>
      <select bind:value={selectedVersion} disabled={!selectedLanguage}>
        <option value="" disabled>Select a version</option>
        {#if selectedLanguage}
          {#each languageVersions[selectedLanguage] as version}
            <option value={version}>{selectedLanguage} {version}</option>
          {/each}
        {/if}
      </select>
    </div>

    <div class="card">
      <h2>Custom Extras</h2>
      <p class="hint">Enter additional dependencies, separated by commas</p>
      <textarea
        bind:value={customExtras}
        on:input={handleCustomInput}
        placeholder="Example: numpy, pandas, requests, ..."
      />
      {#if customDependencies.length > 0}
        <div class="dependencies-list">
          {#each customDependencies as dependency}
            <span class="dependency-tag">{dependency}</span>
          {/each}
        </div>
      {/if}
    </div>

    <div class="card highlight">
      <h2>Summary</h2>
      <p><strong>Language:</strong> {selectedLanguage || "None"} {selectedVersion ? `(${selectedVersion})` : ""}</p>
      <p>
        <strong>Dependencies:</strong>
        {#if selectedDependencies.length > 0}
          <div class="dependencies-list">
            {#each selectedDependencies as dependency}
              <span class="dependency-tag">{dependency}</span>
            {/each}
          </div>
        {:else}
          None
        {/if}
      </p>
      <p>
        <strong>Custom Extras:</strong>
        {#if customDependencies.length > 0}
          <div class="dependencies-list">
            {#each customDependencies as dependency}
              <span class="dependency-tag">{dependency}</span>
            {/each}
          </div>
        {:else}
          None
        {/if}
      </p>
    </div>

    <div class="button-group">
      <button
        class="cta-button"
        on:click={generateDockerfile}
        disabled={isLoading || !selectedLanguage || !selectedDependency || !selectedVersion}
      >
        {isLoading ? "Generating..." : "Generate Docker Image"}
      </button>
      <button
        class="secondary-button"
        on:click={() => {
          selectedLanguage = "";
          selectedDependencies = [];
          customExtras = "";
          customDependencies = [];
          selectedDependencyDescription = "";
          selectedDependency = "";
          selectedVersion = "";
          generatedDockerfile = "";
          errorMessage = "";
        }}
      >
        Reset Selection
      </button>
    </div>

    {#if errorMessage}
      <div class="card error-card">
        <p class="error-message">{errorMessage}</p>
      </div>
    {/if}

    {#if generatedDockerfile}
      <div class="card result-card">
        <h2>Generated Dockerfile</h2>
        <div class="dockerfile-container">
          <button class="copy-button" on:click={() => copyToClipboard(generatedDockerfile)}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <pre><code>{generatedDockerfile}</code></pre>
        </div>

        <h3>Run your container</h3>
        <div class="dockerfile-container">
          <button class="copy-button" on:click={() => copyToClipboard(getDockerRunCommand())}>
            Copy
          </button>
          <pre><code>{getDockerRunCommand()}</code></pre>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .customise {
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
    margin-bottom: 1.5rem;
    background: linear-gradient(90deg, #ff5733 0%, #33b5ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
  }

  .lead {
    font-size: 1.2rem;
    font-weight: 500;
    color: #1a202c;
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .highlight {
    background: linear-gradient(
      90deg,
      rgba(51, 181, 255, 0.1) 0%,
      rgba(255, 87, 51, 0.1) 100%
    );
  }

  select,
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 1rem;
    color: #2c3e50;
    background: white;
    transition: all 0.3s ease;
  }

  select:focus,
  textarea:focus {
    outline: none;
    border-color: #33b5ff;
    box-shadow: 0 0 0 2px rgba(51, 181, 255, 0.2);
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }

  .description {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(51, 181, 255, 0.1);
    border-radius: 8px;
    font-size: 0.9rem;
    color: #2c3e50;
    line-height: 1.6;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .cta-button {
    padding: 0.8rem 1.6rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    background: linear-gradient(135deg, #ff5733 0%, #33b5ff 100%);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .cta-button:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    background: linear-gradient(135deg, #33b5ff 0%, #ff5733 100%);
  }

  .secondary-button {
    padding: 0.8rem 1.6rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #2c3e50;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .secondary-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: #f8f9fa;
  }

  .hint {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    font-size: 1rem;
    color: #2c3e50;
    background: white;
    transition: all 0.3s ease;
    min-height: 100px;
    resize: vertical;
    margin-bottom: 1rem;
  }

  .dependencies-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .dependency-tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    background: linear-gradient(
      135deg,
      rgba(255, 87, 51, 0.1) 0%,
      rgba(51, 181, 255, 0.1) 100%
    );
    border-radius: 15px;
    font-size: 0.9rem;
    color: #2c3e50;
    border: 1px solid rgba(51, 181, 255, 0.2);
    transition: all 0.3s ease;
  }

  .dependency-tag:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(
      135deg,
      rgba(255, 87, 51, 0.2) 0%,
      rgba(51, 181, 255, 0.2) 100%
    );
  }

  .error-card {
    border: 1px solid #e53e3e;
    background: rgba(229, 62, 62, 0.05);
  }

  .error-message {
    color: #e53e3e;
    font-weight: 500;
  }

  .result-card h2,
  .result-card h3 {
    margin-bottom: 0.75rem;
  }

  .result-card h3 {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #2c3e50;
  }

  .dockerfile-container {
    position: relative;
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
  }

  .dockerfile-container pre {
    margin: 0;
    padding: 1rem;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .dockerfile-container code {
    color: #d4d4d4;
    font-family: "Fira Code", "Cascadia Code", monospace;
  }

  .copy-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
    color: #d4d4d4;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .copy-button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .cta-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .highlight p {
    margin: 1rem 0;
  }

  .highlight strong {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    .customise {
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .lead {
      font-size: 1.1rem;
    }

    .button-group {
      flex-direction: column;
    }

    .cta-button,
    .secondary-button {
      width: 100%;
    }

    .dependencies-list {
      gap: 0.3rem;
    }

    .dependency-tag {
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
    }
  }
</style>
