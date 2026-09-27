/**
 * 10X HUB — Interactive Engine
 * Handles modal dialogs, resource filtering, artifact hotspot inspection,
 * form submission, live directory updates, and toast feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initShowcaseHotspots();
  initCurriculumDirectory();
  initRedSectionForm();
  initModals();
  initSwatchCopy();
});

/* ============================================================
   TOAST NOTIFICATION ENGINE
   ============================================================ */
function showToast(message, duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-pill';
  toast.innerHTML = `
    <span style="width:8px; height:8px; border-radius:50%; background-color:#ff1841; display:inline-block;"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fading');
    setTimeout(() => {
      toast.remove();
    }, 250);
  }, duration);
}

/* ============================================================
   HEADER & NAVIGATION
   ============================================================ */
function initHeader() {
  const toggleBtn = document.getElementById('poster-toggle-btn');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Toggle switch (High Contrast / Grid Overlay Mode)
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isActive = toggleBtn.classList.toggle('active');
      document.body.classList.toggle('grid-overlay-mode', isActive);
      const modeName = isActive ? 'Grid Poster Spec Mode' : 'Clean Editorial Void';
      showToast(`View Mode: ${modeName}`);
    });
  }

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Smooth scroll active state
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ============================================================
   SHOWCASE ARTIFACT & HOTSPOTS
   ============================================================ */
const HOTSPOT_DATA = {
  controls: {
    title: 'Header Controls & 3×3 Brand Matrix',
    desc: 'Features the 9-dot brand mark, a 44px pill-shaped binary toggle switch, and the primary Ember Red (#ff1841) pill CTA button with right-arrow.'
  },
  headline: {
    title: 'Massive Edge-to-Edge Typography: 10X HUB',
    desc: 'Rendered at poster scale (187–298px) in custom madefor-text display variant with extreme negative letter-spacing (-0.064em) and weight 400.'
  },
  subtitle: {
    title: 'Word-Spaced Horizontally Distributed Subtitle',
    desc: 'A sentence spread across 1440px with wide word intervals in #949494 Steel, creating a calibrated typographic balance under the display heading.'
  },
  tagline: {
    title: 'Editorial Mission Statement',
    desc: '"Resources by designers for designers" set at 45px weight 400 in pure white, providing an asymmetric anchor against the Obsidian black void.'
  },
  badge: {
    title: 'Wix Studio Persistent Attribution Badge',
    desc: 'A minimalist 999px pill badge featuring the studio icon and 10px Arial microcopy, anchoring the platform provenance.'
  }
};

function initShowcaseHotspots() {
  const pins = document.querySelectorAll('.hotspot-pin');
  const titleEl = document.getElementById('hotspot-title');
  const descEl = document.getElementById('hotspot-desc');

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const key = pin.getAttribute('data-target');
      const data = HOTSPOT_DATA[key];
      if (data && titleEl && descEl) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        showToast(`Inspecting: ${data.title}`);
      }
    });
  });
}

/* ============================================================
   COLOR SWATCH COPY TO CLIPBOARD
   ============================================================ */
function initSwatchCopy() {
  const swatches = document.querySelectorAll('.token-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      if (hex) {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex} to clipboard!`);
        }).catch(() => {
          showToast(`Selected: ${hex}`);
        });
      }
    });
  });
}

/* ============================================================
   CURRICULUM & RESOURCE DIRECTORY
   ============================================================ */
const INITIAL_RESOURCES = [
  {
    id: 'res-1',
    category: 'typography',
    categoryLabel: 'Typography',
    title: 'Fluid Variable Type Scale Engine',
    format: 'CSS Calc / Clamp',
    description: 'Algorithmic viewport-proportional typography calculator specifically tuned for brutalist poster scale headlines down to 10px micro-copy.',
    author: 'Elena Rostova',
    bookmarked: false
  },
  {
    id: 'res-2',
    category: 'systems',
    categoryLabel: 'Design Systems',
    title: 'Multi-Brand Token Architecture',
    format: 'Figma / Style-Dictionary',
    description: 'Cross-platform semantic token taxonomy with W3C Design Tokens Community Group specification alignment and zero runtime overhead.',
    author: 'Marcus Vance',
    bookmarked: true
  },
  {
    id: 'res-3',
    category: 'prototyping',
    categoryLabel: 'Prototyping & Motion',
    title: 'WebGL Reactive Mesh Distortions',
    format: 'Three.js / GLSL',
    description: 'Hardware-accelerated fluid canvas distortion shaders responding to cursor velocity and touch momentum for high-impact landing pages.',
    author: 'Tatsuki Sato',
    bookmarked: false
  },
  {
    id: 'res-4',
    category: 'engineering',
    categoryLabel: 'Design Engineering',
    title: 'Framer Layout Transition Rig',
    format: 'React / Framer Motion',
    description: 'Zero-jank shared element transitions and gesture choreographies packaged into drop-in production React hooks.',
    author: 'Astrid Lind',
    bookmarked: false
  },
  {
    id: 'res-5',
    category: 'web',
    categoryLabel: 'Framer / Web',
    title: 'Wix Studio Component Primitives',
    format: 'Studio Addon',
    description: 'Production layout primitives, hairline border boxes, and brutalist section wrappers optimized for Wix Studio custom modules.',
    author: '10X Collective',
    bookmarked: false
  },
  {
    id: 'res-6',
    category: 'systems',
    categoryLabel: 'Design Systems',
    title: 'Design Ops Governance Blueprint',
    format: 'Notion / PDF',
    description: 'A battle-tested governance framework for managing token breaking changes, deprecation cycles, and team contributions.',
    author: 'Liam Chen',
    bookmarked: false
  },
  {
    id: 'res-7',
    category: 'prototyping',
    categoryLabel: 'Prototyping & Motion',
    title: 'Spring Physics Micro-Interactions',
    format: 'Figma Prototype Kit',
    description: 'Over 120 interactive components tuned with natural damping constants, bouncy button states, and progressive disclosure cards.',
    author: 'Nora Diaz',
    bookmarked: false
  },
  {
    id: 'res-8',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    title: 'AI Prompt Chains for Tokens & Iconography',
    format: 'Prompt Library',
    description: 'Structured LLM workflows to convert loose moodboards and brand guides into clean CSS custom properties and SVG icon sets.',
    author: 'Devon Reed',
    bookmarked: false
  }
];

let allResources = [...INITIAL_RESOURCES];
let currentFilter = 'all';

function renderResources(items) {
  const grid = document.getElementById('resource-grid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: #777;">
        <p style="font-size: 18px; margin-bottom: 8px;">No resources match your query.</p>
        <p style="font-size: 13px;">Try searching for "tokens", "motion", or "typography".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(res => `
    <article class="resource-card" data-id="${res.id}">
      <div class="card-top-meta">
        <span class="card-category-tag">${res.categoryLabel}</span>
        <span class="card-format-tag">${res.format}</span>
      </div>
      <div>
        <h3 class="card-title">${res.title}</h3>
        <p class="card-description" style="margin-top: 8px;">${res.description}</p>
      </div>
      <div class="card-footer">
        <span class="card-author-pill">By ${res.author}</span>
        <div class="card-actions-group">
          <button class="btn-card-inspect" onclick="openResourceModal('${res.id}')">Inspect ↗</button>
          <button class="btn-card-bookmark ${res.bookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${res.id}')" title="Bookmark Resource" aria-label="Bookmark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="${res.bookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function initCurriculumDirectory() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const searchInput = document.getElementById('resource-search-input');

  renderResources(allResources);

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFilters();
    });
  }
}

function applyFilters() {
  const searchInput = document.getElementById('resource-search-input');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  const filtered = allResources.filter(res => {
    const matchesFilter = currentFilter === 'all' || res.category === currentFilter;
    const matchesQuery = !query || 
      res.title.toLowerCase().includes(query) ||
      res.description.toLowerCase().includes(query) ||
      res.author.toLowerCase().includes(query) ||
      res.categoryLabel.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  renderResources(filtered);
}

window.toggleBookmark = function(id) {
  const item = allResources.find(r => r.id === id);
  if (item) {
    item.bookmarked = !item.bookmarked;
    showToast(item.bookmarked ? `Saved "${item.title}" to library` : `Removed "${item.title}" from library`);
    applyFilters();
  }
};

/* ============================================================
   THE RED FULL-WIDTH SECTION RESOURCE SUBMISSION FORM
   ============================================================ */
function initRedSectionForm() {
  const form = document.getElementById('red-resource-form');
  const tagButtons = document.querySelectorAll('.tag-pill-btn');
  const dropzone = document.getElementById('red-form-dropzone');
  const fileInput = document.getElementById('red-file-input');

  // Tag selection toggles
  tagButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('selected');
    });
  });

  // Dropzone click triggers hidden file input
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        showToast(`Attached file: ${fileInput.files[0].name}`);
        const label = dropzone.querySelector('.dropzone-text');
        if (label) label.textContent = `Attached: ${fileInput.files[0].name}`;
      }
    });
  }

  // Submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const title = document.getElementById('form-title').value.trim();
      const category = document.getElementById('form-category').value;
      const url = document.getElementById('form-url').value.trim();
      const desc = document.getElementById('form-desc').value.trim();

      if (!name || !email || !title || !url) {
        showToast('Please fill in all required fields marked with *');
        return;
      }

      // Add to live resources list
      const newResource = {
        id: `res-${Date.now()}`,
        category: category || 'systems',
        categoryLabel: category === 'typography' ? 'Typography' : 
                       category === 'prototyping' ? 'Prototyping & Motion' : 
                       category === 'engineering' ? 'Design Engineering' : 'Design Systems',
        title: title,
        format: 'Community Contribution',
        description: desc || 'A verified community resource submission to the 10X Hub global archive.',
        author: name,
        bookmarked: false
      };

      allResources.unshift(newResource);
      applyFilters();

      // Clear form
      form.reset();
      tagButtons.forEach(btn => btn.classList.remove('selected'));
      const label = dropzone ? dropzone.querySelector('.dropzone-text') : null;
      if (label) label.textContent = 'Drag & drop preview spec or click to browse';

      showToast(`Resource "${title}" submitted to Hub Review Queue!`);

      // Scroll smoothly down to the directory to see it in action
      const curriculum = document.getElementById('curriculum');
      if (curriculum) {
        setTimeout(() => {
          curriculum.scrollIntoView({ behavior: 'smooth' });
        }, 600);
      }
    });
  }
}

/* ============================================================
   MODALS SYSTEM
   ============================================================ */
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(contentHtml) {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body-container');
  if (overlay && body) {
    body.innerHTML = contentHtml;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.openSubmissionModal = function() {
  openModal(`
    <h2 class="modal-title">Direct Resource Submission</h2>
    <p class="modal-subtitle">Contribute your file or design engineering repository directly to the 10X HUB archive.</p>
    <form id="modal-quick-submit" onsubmit="handleModalSubmit(event)" class="modal-form-fields">
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Full Name *</label>
        <input type="text" required class="modal-underline-input" style="width:100%;" placeholder="e.g. Elena Rostova" />
      </div>
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Work Email *</label>
        <input type="email" required class="modal-underline-input" style="width:100%;" placeholder="elena@studio.design" />
      </div>
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Resource Title *</label>
        <input type="text" required class="modal-underline-input" style="width:100%;" placeholder="e.g. Fluid Variable Poster Engine" />
      </div>
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Community Link or GitHub URL *</label>
        <input type="url" required class="modal-underline-input" style="width:100%;" placeholder="https://..." />
      </div>
      <button type="submit" class="btn-ember-pill" style="width:100%; margin-top:10px;">
        Submit to Editorial Review →
      </button>
    </form>
  `);
};

window.openReserveModal = function(sessionName, instructor) {
  openModal(`
    <h2 class="modal-title">Reserve Cohort Seat</h2>
    <p class="modal-subtitle">Direct enrollment for: <strong style="color:#ffffff;">${sessionName}</strong> led by ${instructor}.</p>
    <form id="modal-reserve-form" onsubmit="handleReservationSubmit(event, '${sessionName}')" class="modal-form-fields">
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Full Name *</label>
        <input type="text" required class="modal-underline-input" style="width:100%;" placeholder="Your Name" />
      </div>
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Email Address for Calendar Invite *</label>
        <input type="email" required class="modal-underline-input" style="width:100%;" placeholder="designer@company.com" />
      </div>
      <div>
        <label style="font-size:12px; color:#bebcbc; display:block; margin-bottom:4px;">Role & Company</label>
        <input type="text" class="modal-underline-input" style="width:100%;" placeholder="Senior Product Designer @ Tech Corp" />
      </div>
      <button type="submit" class="btn-ember-pill" style="width:100%; margin-top:10px;">
        Confirm Reservation (Free for Pro) →
      </button>
    </form>
  `);
};

window.openResourceModal = function(id) {
  const item = allResources.find(r => r.id === id);
  if (!item) return;

  openModal(`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
      <span class="section-pill-tag" style="margin:0;">${item.categoryLabel} // SPEC SHEET</span>
      <span style="font-size:12px; color:#bebcbc;">${item.format}</span>
    </div>
    <h2 class="modal-title" style="font-size:26px;">${item.title}</h2>
    <p style="font-size:14px; color:#bebcbc; margin-bottom:20px;">Created by ${item.author} for the 10X HUB design community.</p>
    
    <div style="background:#141414; border:1px solid #282828; border-radius:12px; padding:20px; margin-bottom:24px;">
      <h4 style="font-size:13px; color:#949494; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px;">Overview & Manifest</h4>
      <p style="font-size:14px; color:#e8e6e6; line-height:1.5;">${item.description}</p>
      
      <div style="margin-top:16px; padding-top:16px; border-top:1px solid #222; display:flex; gap:16px; font-size:12px; color:#949494;">
        <span>Tokens: W3C Compliant</span>
        <span>License: MIT / CC-BY</span>
        <span>Version: 2.4.0</span>
      </div>
    </div>

    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <button class="btn-ember-pill" onclick="handleCopyKit('${item.title}')">
        Copy Figma / Code Spec →
      </button>
      <button class="btn-ghost-pill" onclick="closeModal()">
        Back to Index
      </button>
    </div>
  `);
};

window.handleModalSubmit = function(e) {
  e.preventDefault();
  closeModal();
  showToast('Resource received! Editorial review initiated.');
};

window.handleReservationSubmit = function(e, sessionName) {
  e.preventDefault();
  closeModal();
  showToast(`Seat reserved for "${sessionName}"! Calendar invite sent.`);
};

window.handleCopyKit = function(title) {
  navigator.clipboard.writeText(`https://10xdesigners.co/vault/${encodeURIComponent(title)}`).then(() => {
    showToast(`Copied spec URL for "${title}" to clipboard!`);
  }).catch(() => {
    showToast(`Spec ready for "${title}"`);
  });
};
