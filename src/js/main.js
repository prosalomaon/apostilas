// Main logic for Banco de Dados II educational material

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  function getMermaidTheme(isDark) {
    return isDark ? 'dark' : 'base';
  }

  function getMermaidVariables(isDark) {
    return {
      primaryColor: isDark ? '#0f1116' : '#ffffff',
      primaryTextColor: isDark ? '#f4f4f5' : '#000000',
      primaryBorderColor: isDark ? '#8f98a5' : '#000000',
      lineColor: isDark ? '#f4f4f5' : '#000000',
      secondaryColor: isDark ? '#1f2937' : '#f0f0f0',
      tertiaryColor: isDark ? '#0f1116' : '#ffffff'
    };
  }

  function applyTheme(theme) {
    const darkMode = theme === 'dark';
    document.body.classList.toggle('dark-theme', darkMode);
    localStorage.setItem('theme', theme);

    if (themeToggleButton) {
      themeToggleButton.textContent = darkMode ? 'Modo Claro' : 'Modo Escuro';
      themeToggleButton.title = darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro';
    }

    if (typeof mermaid !== 'undefined') {
      updateMermaidTheme(darkMode);
    }
  }

  function updateMermaidTheme(darkMode) {
    mermaid.initialize({
      startOnLoad: false,
      theme: getMermaidTheme(darkMode),
      themeVariables: getMermaidVariables(darkMode)
    });

    const mermaidElements = document.querySelectorAll('.mermaid');
    if (mermaidElements.length) {
      mermaid.init(undefined, mermaidElements);
    }
  }

  function toggleTheme() {
    applyTheme(document.body.classList.contains('dark-theme') ? 'light' : 'dark');
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', toggleTheme);
  }

  // Initialize Highlight.js if present
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // Initialize Mermaid if present
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: getMermaidTheme(savedTheme === 'dark'),
      themeVariables: getMermaidVariables(savedTheme === 'dark')
    });
  }

  applyTheme(savedTheme);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  console.log('Banco de Dados II - Apostila Inicializada');
});
