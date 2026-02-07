(function () {
  const root = document.documentElement;
  const body = document.body;
  const header = document.querySelector('[data-site-header]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';
  const THEME_KEY = 'theme';

  const readStorage = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (_error) {
      return null;
    }
  };

  const writeStorage = (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (_error) {
      return;
    }
  };

  const featureEnabled = (name, defaultValue) => {
    if (!body) {
      return defaultValue;
    }

    const value = body.dataset[name];
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }

    return value === 'true';
  };

  const dispatchThemeEvent = () => {
    document.dispatchEvent(
      new CustomEvent('site-theme-changed', {
        detail: { theme: root.dataset.theme || THEME_LIGHT }
      })
    );
  };

  const applyTheme = (theme, persistChoice) => {
    root.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === THEME_DARK));
    }

    if (themeLabel) {
      themeLabel.textContent = theme === THEME_DARK ? 'Light' : 'Dark';
    }

    if (persistChoice) {
      writeStorage(THEME_KEY, theme);
    }

    dispatchThemeEvent();
  };

  const initTheme = () => {
    const storedTheme = readStorage(THEME_KEY);

    if (storedTheme === THEME_DARK || storedTheme === THEME_LIGHT) {
      applyTheme(storedTheme, false);
    } else {
      applyTheme(prefersDark.matches ? THEME_DARK : THEME_LIGHT, false);
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const nextTheme = root.dataset.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        applyTheme(nextTheme, true);
      });
    }

    if (typeof prefersDark.addEventListener === 'function') {
      prefersDark.addEventListener('change', (event) => {
        if (!readStorage(THEME_KEY)) {
          applyTheme(event.matches ? THEME_DARK : THEME_LIGHT, false);
        }
      });
    }
  };

  const initHeaderAndMenu = () => {
    const closeMenu = () => {
      if (!header || !menuToggle) {
        return;
      }

      header.classList.remove('menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    const updateHeaderState = () => {
      if (!header) {
        return;
      }

      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    if (!header || !navMenu || !menuToggle) {
      return;
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      if (!header.classList.contains('menu-open')) {
        return;
      }

      if (!header.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) {
        closeMenu();
      }
    });
  };

  const initReveal = () => {
    const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
    if (revealItems.length === 0) {
      return;
    }

    revealItems.forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
    });

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      revealItems.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((element) => revealObserver.observe(element));
  };

  const initArchiveSearchAndFilters = () => {
    const searchInput = document.querySelector('[data-post-search]');
    const searchableCards = Array.from(document.querySelectorAll('[data-search-item]'));
    const searchEmpty = document.querySelector('[data-search-empty]');
    const categoryButtons = Array.from(document.querySelectorAll('[data-filter-button]'));
    const resultCount = document.querySelector('[data-search-result-count]');

    if (searchableCards.length === 0) {
      return;
    }

    let activeCategory = 'all';

    const setActiveCategory = (nextCategory) => {
      activeCategory = nextCategory;

      categoryButtons.forEach((button) => {
        const isActive = button.dataset.filterValue === activeCategory;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    };

    const cardMatchesCategory = (cardCategories) => {
      if (activeCategory === 'all') {
        return true;
      }

      return cardCategories.includes(activeCategory);
    };

    const filterCards = () => {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let visibleCount = 0;

      searchableCards.forEach((card) => {
        const text = card.dataset.searchText || '';
        const categoryBlob = card.dataset.searchCategories || '';
        const categories = categoryBlob.split('|').filter(Boolean);
        const textMatch = query.length === 0 || text.includes(query);
        const categoryMatch = cardMatchesCategory(categories);
        const isMatch = textMatch && categoryMatch;

        card.hidden = !isMatch;
        if (isMatch) {
          visibleCount += 1;
        }
      });

      if (searchEmpty) {
        searchEmpty.hidden = visibleCount !== 0;
      }

      if (resultCount) {
        const suffix = visibleCount === 1 ? 'post' : 'posts';
        resultCount.textContent = `${visibleCount} ${suffix} on this page`;
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', filterCards);
    }

    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextCategory = button.dataset.filterValue || 'all';
        setActiveCategory(nextCategory);
        filterCards();
      });
    });

    filterCards();
  };

  const initPostToc = () => {
    const tocContainer = document.querySelector('[data-post-toc]');
    const tocWrap = document.querySelector('[data-post-toc-wrap]');
    const postContent = document.querySelector('[data-post-content]');

    if (!tocContainer || !tocWrap || !postContent) {
      return;
    }

    const headings = Array.from(postContent.querySelectorAll('h2, h3'));
    if (headings.length === 0) {
      tocWrap.classList.add('is-hidden');
      return;
    }

    const slugify = (text) =>
      text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    const usedIds = new Set();
    const tocLinks = [];

    headings.forEach((heading) => {
      if (!heading.id) {
        const baseId = slugify(heading.textContent || 'section') || 'section';
        let nextId = baseId;
        let suffix = 2;

        while (usedIds.has(nextId) || document.getElementById(nextId)) {
          nextId = `${baseId}-${suffix}`;
          suffix += 1;
        }

        heading.id = nextId;
      }

      usedIds.add(heading.id);

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent || heading.id;
      link.className = heading.tagName === 'H3' ? 'level-3' : 'level-2';
      tocContainer.appendChild(link);
      tocLinks.push(link);
    });

    let scheduled = false;
    const setActiveTocItem = () => {
      if (scheduled) {
        return;
      }

      scheduled = true;
      window.requestAnimationFrame(() => {
        const threshold = 140;
        let activeId = headings[0].id;

        headings.forEach((heading) => {
          if (heading.getBoundingClientRect().top <= threshold) {
            activeId = heading.id;
          }
        });

        tocLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${activeId}`);
        });

        scheduled = false;
      });
    };

    setActiveTocItem();
    window.addEventListener('scroll', setActiveTocItem, { passive: true });
    window.addEventListener('resize', setActiveTocItem);
  };

  const initReadingProgress = () => {
    if (!featureEnabled('featureReadingProgress', true)) {
      return;
    }

    const progress = document.querySelector('[data-reading-progress]');
    const progressBar = document.querySelector('[data-reading-progress-bar]');
    const postContent = document.querySelector('[data-post-content]');

    if (!progress || !progressBar || !postContent) {
      return;
    }

    let frameRequested = false;

    const setProgress = () => {
      if (frameRequested) {
        return;
      }

      frameRequested = true;
      window.requestAnimationFrame(() => {
        const contentTop = window.scrollY + postContent.getBoundingClientRect().top;
        const contentHeight = postContent.scrollHeight;
        const viewportHeight = window.innerHeight;
        const denominator = Math.max(contentHeight - viewportHeight * 0.55, 1);
        const rawValue = (window.scrollY - contentTop + viewportHeight * 0.25) / denominator;
        const value = Math.max(0, Math.min(1, rawValue));
        const percent = Math.round(value * 100);

        progressBar.style.transform = `scaleX(${value})`;
        progress.setAttribute('aria-valuenow', String(percent));
        frameRequested = false;
      });
    };

    setProgress();
    window.addEventListener('scroll', setProgress, { passive: true });
    window.addEventListener('resize', setProgress);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return;
    }

    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', 'true');
    helper.style.position = 'absolute';
    helper.style.left = '-9999px';
    document.body.appendChild(helper);
    helper.select();
    document.execCommand('copy');
    document.body.removeChild(helper);
  };

  const initCodeCopy = () => {
    if (!featureEnabled('featureCodeCopy', true)) {
      return;
    }

    const postContent = document.querySelector('[data-post-content]');
    if (!postContent) {
      return;
    }

    const codeBlocks = Array.from(postContent.querySelectorAll('pre code'));
    if (codeBlocks.length === 0) {
      return;
    }

    codeBlocks.forEach((code) => {
      const pre = code.closest('pre');
      if (!pre || pre.dataset.skipCopy === 'true') {
        return;
      }

      if ((code.className || '').includes('language-mermaid')) {
        pre.dataset.skipCopy = 'true';
        return;
      }

      const container = pre.parentElement && pre.parentElement.classList.contains('highlight') ? pre.parentElement : pre;
      if (!container || container.querySelector('.code-copy-button')) {
        return;
      }

      container.classList.add('code-block');

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = 'Copy';
      button.setAttribute('aria-label', 'Copy code to clipboard');

      button.addEventListener('click', async () => {
        const sourceText = code.textContent || '';
        try {
          await copyText(sourceText.replace(/\n$/, ''));
          button.textContent = 'Copied';
          button.classList.add('is-copied');
          button.classList.remove('is-error');
        } catch (_error) {
          button.textContent = 'Failed';
          button.classList.add('is-error');
          button.classList.remove('is-copied');
        }

        window.setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('is-copied');
          button.classList.remove('is-error');
        }, 1400);
      });

      container.appendChild(button);
    });
  };

  const initMermaid = () => {
    if (!window.mermaid) {
      return;
    }

    const sourceCodeBlocks = Array.from(
      document.querySelectorAll('.post-content pre code.language-mermaid, .post-content pre code[class*="language-mermaid"]')
    );

    sourceCodeBlocks.forEach((code) => {
      const pre = code.closest('pre');
      if (!pre) {
        return;
      }

      const wrapper = pre.parentElement && pre.parentElement.classList.contains('highlight') ? pre.parentElement : pre;
      const content = (code.textContent || '').trim();
      if (!content) {
        return;
      }

      const holder = document.createElement('div');
      holder.className = 'mermaid-render';
      holder.dataset.source = content;
      holder.textContent = content;

      wrapper.replaceWith(holder);
    });

    const render = () => {
      const targets = Array.from(document.querySelectorAll('.mermaid-render'));
      if (targets.length === 0) {
        return;
      }

      targets.forEach((target) => {
        const source = target.dataset.source || target.textContent || '';
        target.removeAttribute('data-processed');
        target.textContent = source;
      });

      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: root.dataset.theme === THEME_DARK ? 'dark' : 'default'
      });
      window.mermaid.run({ querySelector: '.mermaid-render' }).catch(() => {
        return;
      });
    };

    render();
    document.addEventListener('site-theme-changed', render);
  };

  const init = () => {
    initTheme();
    initHeaderAndMenu();
    initReveal();
    initArchiveSearchAndFilters();
    initPostToc();
    initReadingProgress();
    initMermaid();
    initCodeCopy();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
    return;
  }

  init();
})();
