<script lang="ts">
  import { page } from "$app/stores";
</script>

<header>
  <nav>
    <ul>
      <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
        <a href="/">Home</a>
      </li>
      <li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="https://github.com/ZisisKostakakis" class="github-link">Github Profile</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, rgba(255, 87, 51, 0.05) 0%, rgba(51, 181, 255, 0.05) 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  nav {
    display: flex;
    justify-content: center;
    --background: rgba(255, 255, 255, 0.9);
    width: 100%;
    max-width: 1200px;
  }

  svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  }

  ul {
    position: relative;
    padding: 0 1rem;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    border-radius: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  li {
    position: relative;
    height: 100%;
  }

  li[aria-current="page"]::before {
    --size: 6px;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid #ff5733;
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1.5rem;
    color: #2c3e50;
    font-weight: 500;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  nav a:hover {
    color: #ff5733;
    transform: translateY(-1px);
  }

  .cta-link {
    color: white;
    background: linear-gradient(135deg, #ff5733 0%, #33b5ff 100%);
    border-radius: 20px;
    padding: 0.5rem 1.2rem;
    margin: 0 0.5rem;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .cta-link:hover {
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #33b5ff 0%, #ff5733 100%);
  }

  @media (max-width: 768px) {
    nav a {
      padding: 0 1rem;
      font-size: 0.8rem;
    }

    .cta-link {
      padding: 0.4rem 1rem;
    }

    ul {
      padding: 0 0.5rem;
    }
  }
</style>
