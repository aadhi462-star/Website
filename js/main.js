(() => {
    const projects = window.PROJECTS || [];
    const root = document.documentElement;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(pointer: fine)').matches;
    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];

    const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const pad = n => String(n).padStart(2, '0');
    const host = url => { try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
    const arrow = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';

    /* ─── Split headings into masked words ─────────────────── */
    function splitWords(el) {
        let n = 0;
        const walk = node => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(part => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) { frag.append(' '); return; }
                        const wm = document.createElement('span');
                        wm.className = 'wm';
                        const w = document.createElement('span');
                        w.className = 'w';
                        w.style.setProperty('--wi', n++);
                        w.textContent = part;
                        wm.append(w);
                        frag.append(wm);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === 1) {
                    walk(child);
                }
            });
        };
        walk(el);
    }
    $$('[data-split]').forEach(splitWords);

    /* ─── Loader (first visit per session only) ────────────── */
    const loader = $('.loader');
    let firstVisit = false;
    try { firstVisit = !sessionStorage.getItem('jr-seen'); sessionStorage.setItem('jr-seen', '1'); } catch (e) {}
    if (firstVisit && !reduceMotion) {
        loader.classList.add('on');
        document.body.style.overflow = 'hidden';
        const num = $('#loader-num');
        const t0 = performance.now(), dur = 1100;
        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            num.textContent = '100';
            loader.classList.add('done');
            document.body.style.overflow = '';
            setTimeout(() => loader.remove(), 1000);
        };
        const tick = now => {
            if (finished) return;
            const k = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            num.textContent = pad(Math.round(eased * 100));
            loader.style.setProperty('--p', eased);
            if (k < 1) requestAnimationFrame(tick);
            else finish();
        };
        requestAnimationFrame(tick);
        // Never let the loader hold the page if frames are throttled (background tab etc.)
        setTimeout(finish, dur + 400);
    } else {
        loader.remove();
    }

    /* ─── Work: case studies + index ───────────────────────── */
    const featured = projects.filter(p => p.featured && p.image);
    const rest = projects.filter(p => !(p.featured && p.image));
    const order = [...featured, ...rest]; // reading order used by the case-study sheet
    const numberOf = p => pad(order.indexOf(p) + 1);

    const typeCover = p => `
        <div class="type-cover">
            <span class="mono"><span>Nº ${numberOf(p)}</span><span>${esc(p.category || '')}</span></span>
            <strong>${esc(p.title)}</strong>
        </div>`;

    function caseHTML(p) {
        const link = (p.links || [])[0];
        const meta = [
            p.role && ['Role', p.role],
            p.problem && ['Problem', p.problem],
            p.tags && p.tags.length && ['Built with', p.tags.join(', ')],
            p.inspiredBy && ['Inspired by', p.inspiredBy.label]
        ].filter(Boolean);
        return `
        <article class="case" id="case-${esc(p.id)}">
            <div class="case-media" data-parallax-img>
                <button type="button" class="case-frame" data-open="${esc(p.id)}" aria-label="Open case study: ${esc(p.title)}">
                    <span class="case-chrome" aria-hidden="true"><i></i><i></i><i></i><span class="mono">${esc(link ? host(link.url) : (p.tags || [])[0] || '')}</span></span>
                    <span class="case-shot"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="1440" height="900"></span>
                    <span class="case-open" aria-hidden="true">Case study ${arrow}</span>
                </button>
            </div>
            <div class="case-text reveal">
                <p class="case-num mono"><b>Nº ${numberOf(p)}</b><span>${esc(p.category || '')}</span></p>
                <h3 class="case-title">${esc(p.title)}</h3>
                <p class="case-summary">${esc(p.summary)}</p>
                ${meta.length ? `<dl class="case-meta">${meta.map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
                <div class="case-actions">
                    <button type="button" class="link-line primary" data-open="${esc(p.id)}">Read case study</button>
                    ${link ? `<a class="link-line" href="${esc(link.url)}" target="_blank" rel="noopener">${esc(link.label)} ${arrow}</a>` : ''}
                </div>
            </div>
        </article>`;
    }

    function indexHTML(p) {
        return `
        <li class="index-row reveal">
            <button type="button" class="index-btn" data-open="${esc(p.id)}" data-preview="${esc(p.id)}">
                <span class="ix-title"><span class="mono">${numberOf(p)}</span>${esc(p.title)}</span>
                <span class="ix-cat mono">${esc(p.category || '')}</span>
                <span class="ix-tags">${esc((p.tags || []).slice(0, 3).join(' · '))}</span>
                <span class="ix-arrow" aria-hidden="true">${arrow}</span>
            </button>
        </li>`;
    }

    $('#cases').innerHTML = featured.map(caseHTML).join('');
    $('#index').innerHTML = rest.map(indexHTML).join('');
    $('#work-count').textContent = projects.length ? `(${pad(projects.length)}) projects` : '';
    if (!projects.length) $('#empty-state').hidden = false;
    if (!rest.length) $('.index-head').hidden = true;

    /* ─── Case study sheet ─────────────────────────────────── */
    const sheet = $('#sheet');
    const sheetBody = $('#sheet-body');
    let currentId = null;

    function sheetHTML(p) {
        const facts = [
            ['Category', p.category],
            ['Role', p.role],
            ['Year', p.year]
        ].filter(([, v]) => v);
        const blocks = [
            p.problem && ['Problem', `<p class="lead">${esc(p.problem)}</p>`],
            p.contribution && ['Contribution', `<p>${esc(p.contribution)}</p>`],
            p.details && p.details.length && ['Overview', p.details.map(t => `<p>${esc(t)}</p>`).join('')],
            p.tags && p.tags.length && ['Tools & skills', `<p>${esc(p.tags.join(' · '))}</p>`],
            p.inspiredBy && ['Inspired by', `<p><a class="link-line" href="${esc(p.inspiredBy.url)}" target="_blank" rel="noopener">${esc(p.inspiredBy.label)} ${arrow}</a></p>`]
        ].filter(Boolean);
        const links = (p.links || []).map(l =>
            `<a class="btn btn-accent" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ${arrow}</a>`).join('');
        return `
            <p class="sheet-cat mono">Nº ${numberOf(p)} — Case study</p>
            <h2 class="sheet-title" id="sheet-title">${esc(p.title)}</h2>
            <p class="sheet-summary">${esc(p.summary)}</p>
            ${links ? `<div class="sheet-links">${links}</div>` : ''}
            <div class="sheet-media">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}">` : typeCover(p)}</div>
            ${facts.length ? `<dl class="sheet-facts">${facts.map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
            ${blocks.map(([h, body]) => `<section class="sheet-block"><h3>${h}</h3><div>${body}</div></section>`).join('')}`;
    }

    function openProject(id, { dir = 0, push = true } = {}) {
        const p = order.find(x => x.id === id);
        if (!p) return;
        currentId = id;
        const i = order.indexOf(p);
        sheetBody.innerHTML = sheetHTML(p);
        sheetBody.scrollTop = 0;
        $('#sheet-count').textContent = `${pad(i + 1)} / ${pad(order.length)}`;
        $('#prev-title').textContent = order[(i - 1 + order.length) % order.length].title;
        $('#next-title').textContent = order[(i + 1) % order.length].title;
        if (dir) {
            sheetBody.classList.remove('swap');
            sheetBody.style.setProperty('--dir', `${dir * 28}px`);
            void sheetBody.offsetWidth;
            sheetBody.classList.add('swap');
        }
        if (!sheet.open) {
            sheet.classList.remove('closing');
            sheet.showModal();
            document.body.style.overflow = 'hidden';
        }
        sheetBody.focus({ preventScroll: true });
        if (push) history.replaceState(null, '', `#work/${p.id}`);
    }

    function closeSheet() {
        if (!sheet.open) return;
        if (reduceMotion) { sheet.close(); return; }
        sheet.classList.add('closing');
        setTimeout(() => sheet.close(), 320);
    }
    sheet.addEventListener('close', () => {
        sheet.classList.remove('closing');
        document.body.style.overflow = '';
        if (location.hash.startsWith('#work/')) history.replaceState(null, '', '#work');
        // Return focus to whatever opened this project
        const opener = $(`[data-open="${CSS.escape(currentId || '')}"]`);
        if (opener) opener.focus({ preventScroll: true });
    });
    sheet.addEventListener('cancel', e => { e.preventDefault(); closeSheet(); });
    sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });
    $('.sheet-close').addEventListener('click', closeSheet);
    const step = s => {
        const i = order.findIndex(p => p.id === currentId);
        openProject(order[(i + s + order.length) % order.length].id, { dir: s });
    };
    $$('[data-step]', sheet).forEach(b => b.addEventListener('click', () => step(+b.dataset.step)));
    sheet.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
    });
    document.addEventListener('click', e => {
        const b = e.target.closest('[data-open]');
        if (b) openProject(b.dataset.open);
    });

    // Deep link: #work/<id>
    const deep = location.hash.match(/^#work\/(.+)$/);
    if (deep) openProject(decodeURIComponent(deep[1]), { push: false });

    /* ─── Index hover preview (follows the pointer) ────────── */
    const preview = $('.index-preview');
    if (finePointer && !reduceMotion && preview) {
        const inner = $('.index-preview-inner', preview);
        let tx = 0, ty = 0, x = 0, y = 0, raf = 0, active = false;
        const loop = () => {
            x += (tx - x) * 0.18;
            y += (ty - y) * 0.18;
            preview.style.setProperty('--x', `${x}px`);
            preview.style.setProperty('--y', `${y}px`);
            if (active || Math.abs(tx - x) > .5) raf = requestAnimationFrame(loop);
            else raf = 0;
        };
        $$('[data-preview]').forEach(row => {
            row.addEventListener('pointerenter', e => {
                const p = order.find(q => q.id === row.dataset.preview);
                inner.innerHTML = p.image ? `<img src="${esc(p.image)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">` : typeCover(p);
                if (!active) { x = tx = e.clientX + 24; y = ty = e.clientY - 120; }
                active = true;
                preview.classList.add('show');
                if (!raf) raf = requestAnimationFrame(loop);
            });
            row.addEventListener('pointermove', e => { tx = e.clientX + 24; ty = e.clientY - 120; });
            row.addEventListener('pointerleave', () => { active = false; preview.classList.remove('show'); });
        });
    }

    /* ─── Header: scrolled state, hide on scroll down ──────── */
    const header = $('.site-header');
    let lastY = scrollY, scrollQueued = false;
    const onScroll = () => {
        scrollQueued = false;
        const y = scrollY;
        header.classList.toggle('scrolled', y > 10);
        header.classList.toggle('tucked', y > 480 && y > lastY + 4);
        if (y < lastY - 4 || y < 480) header.classList.remove('tucked');
        lastY = y;
        parallax();
    };
    addEventListener('scroll', () => {
        if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll); }
    }, { passive: true });

    /* ─── Nav: active section + sliding indicator ──────────── */
    const nav = $('.nav');
    const indicator = $('.nav-indicator');
    const navLinks = $$('.nav a');
    let activeLink = navLinks[0];
    const moveIndicator = link => {
        if (!link || !nav.offsetParent) return;
        indicator.style.setProperty('--x', `${link.offsetLeft}px`);
        indicator.style.setProperty('--w', `${link.offsetWidth}px`);
        indicator.style.setProperty('--o', 1);
    };
    const setActive = id => {
        activeLink = navLinks.find(a => a.dataset.nav === id) || activeLink;
        navLinks.forEach(a => a.classList.toggle('active', a === activeLink));
        moveIndicator(activeLink);
    };
    navLinks.forEach(a => a.addEventListener('pointerenter', () => moveIndicator(a)));
    nav.addEventListener('pointerleave', () => moveIndicator(activeLink));
    const spy = new IntersectionObserver(entries => {
        entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'work', 'experience', 'about', 'contact'].forEach(id => spy.observe(document.getElementById(id)));
    document.fonts && document.fonts.ready.then(() => moveIndicator(activeLink));
    addEventListener('resize', () => moveIndicator(activeLink));

    /* ─── Mobile menu ──────────────────────────────────────── */
    const menu = $('#menu');
    $('.menu-btn').addEventListener('click', () => menu.showModal());
    $('.menu-close').addEventListener('click', () => menu.close());
    $$('.menu-links a').forEach(a => a.addEventListener('click', e => {
        e.preventDefault();
        menu.close();
        const target = document.querySelector(a.getAttribute('href'));
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        history.replaceState(null, '', a.getAttribute('href'));
    }));

    /* ─── Scroll reveals (staggered per batch) ─────────────── */
    const io = new IntersectionObserver(entries => {
        const visible = entries.filter(en => en.isIntersecting);
        visible.forEach((en, k) => {
            en.target.style.setProperty('--delay', `${Math.min(k, 6) * 80}ms`);
            en.target.classList.add('in');
            io.unobserve(en.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, [data-split], .case, .exp-item, .section-index, .edu').forEach(el => io.observe(el));

    /* ─── Parallax (transform only, desktop/tablet) ────────── */
    const parallaxEls = reduceMotion ? [] : $$('[data-parallax]');
    function parallax() {
        if (!parallaxEls.length || innerWidth < 768) return;
        const mid = innerHeight / 2;
        parallaxEls.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.bottom < -200 || r.top > innerHeight + 200) return;
            const offset = (r.top + r.height / 2 - mid) * parseFloat(el.dataset.parallax);
            el.style.translate = `0 ${offset.toFixed(1)}px`;
        });
    }
    onScroll();

    /* ─── Magnetic buttons ─────────────────────────────────── */
    if (finePointer && !reduceMotion) {
        $$('[data-magnetic]').forEach(el => {
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                el.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.22}px`);
                el.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.3}px`);
            });
            el.addEventListener('pointerleave', () => {
                el.style.setProperty('--mx', '0px');
                el.style.setProperty('--my', '0px');
            });
        });
    }

    /* ─── Copy email ───────────────────────────────────────── */
    const toast = $('#toast');
    let toastTimer;
    const showToast = msg => {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
    };
    $('.copy-btn').addEventListener('click', async e => {
        const btn = e.currentTarget;
        const label = $('.copy-label', btn);
        try {
            await navigator.clipboard.writeText(btn.dataset.email);
            btn.classList.add('copied');
            label.textContent = 'Copied';
            showToast('Email copied to clipboard');
            setTimeout(() => { btn.classList.remove('copied'); label.textContent = 'Copy'; }, 2200);
        } catch (err) {
            showToast(btn.dataset.email);
        }
    });

    /* ─── Small facts ──────────────────────────────────────── */
    $('#year').textContent = new Date().getFullYear();
    // "Now" marker on the education timeline (2010 → 2027 scale)
    const now = new Date();
    const yearFrac = now.getFullYear() + now.getMonth() / 12;
    const pct = Math.min(100, Math.max(0, (yearFrac - 2010) / 17 * 100));
    $('#edu-now').style.setProperty('--now', `${pct}%`);
})();
