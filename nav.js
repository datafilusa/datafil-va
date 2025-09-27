// navbar.js - Burger Menu + Search Overlay + Inline Search Results
document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------
  // Burger Menu
  // ---------------------------
  const burger = document.getElementById('burgerMenu');
  const navButtons = document.getElementById('navButtons');

  if (burger && navButtons) {
    // Toggle menu on burger click
    burger.addEventListener('click', e => {
      e.stopPropagation();
      navButtons.classList.toggle('show');
    });

    // Close menu if clicked outside
    document.addEventListener('click', e => {
      if (!navButtons.contains(e.target) && !burger.contains(e.target)) {
        navButtons.classList.remove('show');
      }
    });

    // Close menu on resize if desktop (matches your CSS breakpoint 1500px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1500) {
        navButtons.classList.remove('show');
      }
    });
  }

  // ---------------------------
  // Search Overlay
  // ---------------------------
  const searchIcon = document.getElementById('searchIcon');
  const searchOverlay = document.getElementById('searchOverlay');
  const overlaySearchInput = document.getElementById('overlaySearchInput');
  const overlaySearchButton = document.getElementById('overlaySearchButton');

  if (searchOverlay && overlaySearchInput) {
    searchOverlay.style.display = 'none';
    overlaySearchInput.value = '';

    // Open overlay on icon click
    if (searchIcon) {
      searchIcon.addEventListener('click', () => {
        searchOverlay.style.display = 'flex';
        overlaySearchInput.focus();
      });
    }

    // Close overlay if clicked outside search box
    searchOverlay.addEventListener('click', e => {
      const searchBox = document.querySelector('.search-box');
      if (searchBox && !searchBox.contains(e.target)) closeSearchOverlay();
    });

    // Close overlay on ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearchOverlay();
    });

    function closeSearchOverlay() {
      searchOverlay.style.display = 'none';
      overlaySearchInput.value = '';
    }

    // Perform search
    function performSearch() {
      const keyword = overlaySearchInput.value.trim();
      if (!keyword) {
        alert('Please enter a search term.');
        overlaySearchInput.focus();
        return;
      }
      closeSearchOverlay();
      window.location.href = `search.html?q=${encodeURIComponent(keyword)}`;
    }

    overlaySearchButton.addEventListener('click', performSearch);
    overlaySearchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') performSearch();
    });
  }

  // ---------------------------
  // Inline Search Results (if #searchResultsContainer exists)
  // ---------------------------
  const resultsContainer = document.getElementById('searchResultsContainer');
  if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get('q');

    if (!keyword) {
      resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
    } else {
      fetch('searchData.json')
        .then(res => res.json())
        .then(pages => {
          const words = keyword.toLowerCase().split(' ').filter(w => w.trim() !== '');
          const results = pages.filter(page =>
            words.some(w =>
              page.title.toLowerCase().includes(w) ||
              page.snippet.toLowerCase().includes(w) ||
              (page.keywords && page.keywords.some(k => k.toLowerCase().includes(w)))
            )
          );

          if (results.length === 0) {
            resultsContainer.innerHTML = `<p class="no-results">No results found for "<strong>${keyword}</strong>"</p>`;
            return;
          }

          resultsContainer.innerHTML = '';

          results.forEach((page, index) => {
            const item = document.createElement('div');
            item.classList.add('search-item');

            item.innerHTML = `
              <img src="${page.image}" alt="${page.title}" class="search-icon">
              <div class="search-content">
                <strong>${highlightKeywords(page.title, words)}</strong>
                <p>${highlightKeywords(page.snippet, words)}</p>
              </div>
            `;

            // Stagger slide-up animation
            item.style.animationDelay = `${index * 0.1}s`;

            // Click navigates to page
            item.addEventListener('click', () => {
              window.location.href = page.url;
            });

            resultsContainer.appendChild(item);
          });
        })
        .catch(err => {
          console.error('Error loading search data:', err);
          resultsContainer.innerHTML = '<p>Error loading search data.</p>';
        });
    }
  }

  // ---------------------------
  // Highlight keywords helper
  // ---------------------------
  function highlightKeywords(text, words) {
    if (!words || words.length === 0) return text;
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

});



