<script lang="ts">
  let selectedLanguage = "";
  let selectedDependency = "";
  let selectedDependencies = [];
  let customExtras = "";
  let selectedDependencyDescription = "";
  let languages = ["Python", "JavaScript", "Go"];
  let dependencies = {
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
  };

  function updateSelectedDependency(event) {
    const selectedValue = event.target.value;
    selectedDependency = selectedValue;
    selectedDependencyDescription =
      dependencies[selectedLanguage].find((dep) => dep.name === selectedValue)
        ?.description || "";
    selectedDependencies = selectedValue ? [selectedValue] : [];
  }
</script>

<svelte:head>
  <title>customise Your Environment</title>
</svelte:head>

<section class="customise">
  <h1>customise Your Development Environment</h1>
  <p>
    Select your preferred programming language and any dependencies you need.
  </p>

  <div class="card language-selection">
    <h2>Select Language</h2>
    <select
      bind:value={selectedLanguage}
      on:change={() => {
        selectedDependencies = []; // Clear dependencies on language change
        selectedDependencyDescription = ""; // Clear description
        selectedDependency = ""; // Clear selected dependency
      }}
    >
      <option value="" disabled>Select a language</option>
      {#each languages as language}
        <option value={language}>{language}</option>
      {/each}
    </select>
  </div>

  <div class="card dependencies-selection">
    <h2>Select Dependencies Stack</h2>
    <select
      bind:value={selectedDependency}
      on:change={updateSelectedDependency}
    >
      <option value="" disabled>Select a dependency</option>
      {#if selectedLanguage}
        {#each dependencies[selectedLanguage] as dep}
          <option value={dep.name}>{dep.name}</option>
        {/each}
      {/if}
    </select>
    {#if selectedDependencyDescription}
      <p class="dependency-description">{selectedDependencyDescription}</p>
    {/if}
  </div>

  <div class="card custom-extras">
    <h2>Custom Extras</h2>
    <textarea
      bind:value={customExtras}
      placeholder="Specify any additional dependencies or requirements here..."
    ></textarea>
  </div>

  <div class="card summary">
    <h2>Summary</h2>
    <p><strong>Language:</strong> {selectedLanguage}</p>
    <p>
      <strong>Dependencies:</strong>
      {selectedDependencies.join(", ") || "None"}
    </p>
    <p><strong>Custom Extras:</strong> {customExtras || "None"}</p>
  </div>

  <div class="button-group">
    <button class="generate-button">Generate Docker Image</button>
    <button
      class="reset-button"
      on:click={() => {
        selectedLanguage = "";
        selectedDependencies = [];
        customExtras = "";
        selectedDependencyDescription = "";
        selectedDependency = "";
      }}>Reset Selection</button
    >
  </div>
</section>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #fff;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .customise {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    background: #f9f9f9; /* Light background for the section */
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #ff5733;
  }

  p {
    margin-bottom: 2rem;
    color: #555;
  }

  .card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .card h2 {
    margin-bottom: 1rem;
    color: #ff5733;
    font-size: 1.5rem;
  }

  select,
  textarea {
    margin: 0.5rem 0;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
    box-sizing: border-box;
    background: #fff; /* White background for inputs */
  }

  .dependency-description {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
    text-align: center; /* Center the description text */
  }

  .summary {
    margin-top: 2rem;
    font-size: 1.1rem;
    text-align: left;
  }

  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .generate-button,
  .reset-button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
    color: white;
    background: linear-gradient(90deg, #ff5733 0%, #33b5ff 100%);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition:
      background 0.3s ease,
      transform 0.2s ease;
  }

  .generate-button:hover,
  .reset-button:hover {
    background: linear-gradient(90deg, #33b5ff 0%, #ff5733 100%);
    transform: scale(1.05);
  }

  .generate-button:active,
  .reset-button:active {
    transform: scale(0.95);
  }

  textarea {
    height: 100px;
  }
</style>
