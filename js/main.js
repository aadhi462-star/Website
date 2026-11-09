(() => {
    const projects = window.PROJECTS || [];
    const grid = document.getElementById('project-grid');
    const filtersEl = document.getElementById('filters');
    const emptyEl = document.getElementById('empty');
    const dialog = document.getElementById('project-dialog');
    const dialogBody = document.getElementById('dialog-body');

    const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const initials = title => title.split(/\s+/).filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0]).join('').toUpperCase();

    function cover(p) {
        if (p.image) return `<div class="cover cover-img"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`;
        return `<div class="cover cover-mono" style="--c:${esc(p.color || '#e2571c')}"><span>${esc(initials(p.title))}</span></div>`;
    }

    function card(p, i) {
        const meta = [p.category, p.year].filter(Boolean).map(esc).join(' · ');
        return `
            <article class="project${p.featured ? ' project-featured' : ''}" data-category="${esc(p.category)}" style="--n:${i % 3}">
                <button class="project-hit" type="button" data-id="${esc(p.id)}" aria-label="Open ${esc(p.title)} details"></button>
                ${cover(p)}
                <div class="project-body">
                    <p class="meta">${meta}</p>
                    <h3>${esc(p.title)}</h3>
                    <p>${esc(p.summary)}</p>
                    <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                    <span class="project-more">View details <span aria-hidden="true">→</span></span>
                </div>
            </article>`;
    }

    function renderFilters() {
        const cats = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
        filtersEl.innerHTML = cats.map((c, i) => {
            const n = c === 'All' ? projects.length : projects.filter(p => p.category === c).length;
            return `<button type="button" class="chip-btn" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)} <span>${n}</span></button>`;
        }).join('');
    }

    function applyFilter(cat) {
        let shown = 0;
        grid.querySelectorAll('.project').forEach(el => {
            const match = cat === 'All' || el.dataset.category === cat;
            el.hidden = !match;
            if (match) shown++;
        });
        emptyEl.hidden = shown > 0;
        filtersEl.querySelectorAll('.chip-btn').forEach(b => b.setAttribute('aria-pressed', b.dataset.cat === cat));
    }

    let currentId = null;
    const visibleIds = () => [...grid.querySelectorAll('.project:not([hidden]) .project-hit')].map(b => b.dataset.id);

    function openProject(id, push = true, dir = 0) {
        const p = projects.find(x => x.id === id);
        if (!p) return;
        currentId = id;
        const meta = [p.category, p.year, p.role].filter(Boolean).map(esc).join(' · ');
        const paras = (p.details && p.details.length ? p.details : [p.summary]).map(t => `<p>${esc(t)}</p>`).join('');
        const links = (p.links || []).map(l =>
            `<a class="btn btn-primary" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} <span aria-hidden="true">↗</span></a>`).join('');
        dialogBody.innerHTML = `
            ${cover(p)}
            <div class="dialog-content">
                <p class="meta">${meta}</p>
                <h2 id="dialog-title">${esc(p.title)}</h2>
                ${paras}
                <ul class="tags">${(p.tags || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
                ${links ? `<div class="dialog-links">${links}</div>` : ''}
            </div>`;
        const ids = visibleIds();
        const pos = ids.indexOf(id);
        document.getElementById('dialog-count').textContent = pos >= 0 ? `${pos + 1} / ${ids.length}` : '';
        dialogBody.classList.remove('swap');
        if (dir) {
            dialogBody.style.setProperty('--dir', `${dir * 16}px`);
            void dialogBody.offsetWidth; // restart the animation
            dialogBody.classList.add('swap');
            dialog.scrollTop = 0;
        }
        if (!dialog.open) dialog.showModal();
        if (push) history.replaceState(null, '', `#work/${p.id}`);
    }

    function stepProject(step) {
        const ids = visibleIds();
        if (!ids.length) return;
        const i = ids.indexOf(currentId);
        openProject(ids[(i + step + ids.length) % ids.length], true, step);
    }

    function closeProject() {
        if (dialog.open) dialog.close();
    }

    // Render
    grid.innerHTML = projects.map(card).join('');
    renderFilters();
    document.getElementById('stat-projects').textContent = projects.length;
    document.getElementById('year').textContent = new Date().getFullYear();

    filtersEl.addEventListener('click', e => {
        const b = e.target.closest('.chip-btn');
        if (b) applyFilter(b.dataset.cat);
    });
    grid.addEventListener('click', e => {
        const b = e.target.closest('.project-hit');
        if (b) openProject(b.dataset.id);
    });

    dialog.querySelector('.dialog-close').addEventListener('click', closeProject);
    dialog.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => stepProject(+b.dataset.step)));
    dialog.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') stepProject(1);
        if (e.key === 'ArrowLeft') stepProject(-1);
    });
    dialog.addEventListener('click', e => { if (e.target === dialog) closeProject(); }); // backdrop
    dialog.addEventListener('close', () => {
        if (location.hash.startsWith('#work/')) history.replaceState(null, '', '#work');
    });

    // Deep link: index.html#work/startapath opens that project
    const deep = location.hash.match(/^#work\/(.+)$/);
    if (deep) {
        document.getElementById('work').scrollIntoView();
        openProject(decodeURIComponent(deep[1]), false);
    }

    // Theme toggle
    const root = document.documentElement;
    document.querySelector('.theme-toggle').addEventListener('click', () => {
        const isDark = root.dataset.theme
            ? root.dataset.theme === 'dark'
            : matchMedia('(prefers-color-scheme: dark)').matches;
        root.dataset.theme = isDark ? 'light' : 'dark';
        try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    });

    // Header shadow once scrolled
    const header = document.querySelector('.site-header');
    const toTop = document.querySelector('.to-top');
    let scrollQueued = false;
    const onScroll = () => {
        scrollQueued = false;
        header.classList.toggle('scrolled', scrollY > 8);
        toTop.classList.toggle('show', scrollY > innerHeight * 0.8);
    };
    addEventListener('scroll', () => {
        if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    // Highlight the nav link of the section in view
    const navLinks = [...document.querySelectorAll('.nav a')];
    const spy = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['work', 'experience', 'about', 'contact'].forEach(id => spy.observe(document.getElementById(id)));

    // Reveal on scroll (project cards are revealed too)
    grid.querySelectorAll('.project').forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pointer spotlight + card glow. Pointer events only record the latest
    // position; the DOM is touched at most once per animation frame.
    if (matchMedia('(pointer: fine)').matches && !reduceMotion) {
        const spot = document.querySelector('.bg-spot');
        let px = 0, py = 0, target = null, queued = false;
        const paint = () => {
            queued = false;
            spot.style.setProperty('--px', `${px}px`);
            spot.style.setProperty('--py', `${py}px`);
            if (target) {
                const r = target.getBoundingClientRect();
                target.style.setProperty('--mx', `${px - r.left}px`);
                target.style.setProperty('--my', `${py - r.top}px`);
            }
        };
        addEventListener('pointermove', e => {
            px = e.clientX; py = e.clientY;
            target = e.target.closest ? e.target.closest('.project, .exp-card') : null;
            if (!queued) { queued = true; requestAnimationFrame(paint); }
        }, { passive: true });
        document.documentElement.classList.add('has-pointer');
    }

    // Pause background animation while the tab is hidden
    document.addEventListener('visibilitychange', () =>
        root.classList.toggle('is-hidden', document.hidden));

    // Count up the hero stats once
    if (!reduceMotion) {
        document.getElementById('stat-projects').dataset.count = projects.length;
        document.querySelectorAll('[data-count]').forEach(el => {
            const end = +el.dataset.count, t0 = performance.now() + 500, dur = 900;
            const tick = now => {
                const k = Math.min(1, Math.max(0, (now - t0) / dur));
                el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
                if (k < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }

    // Copy email with a toast confirmation
    const toast = document.getElementById('toast');
    let toastTimer;
    const showToast = msg => {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    };
    document.querySelector('.copy-email').addEventListener('click', async e => {
        const email = e.currentTarget.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied to clipboard');
        } catch (err) {
            showToast(email);
        }
    });
})();
