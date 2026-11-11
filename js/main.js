(() => {
    // Projects marked draft stay in projects.js but off the page until their content is confirmed
    const projects = (window.PROJECTS || []).filter(p => !p.draft);
    const journal = window.JOURNAL || [];
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

    // Layout per position: a lead piece, a staggered pair, then alternating rows; extensions get their own band
    const layoutOf = (p, i) => p.category === 'Extension' ? 'ext' : i === 0 ? 'lead' : i === 1 ? 'pair-a' : i === 2 ? 'pair-b' : 'alt';

    function caseHTML(p, i) {
        const link = (p.links || [])[0];
        const meta = [
            p.platforms && `<span><b>Works on</b>${esc(p.platforms)}</span>`,
            p.inspiredBy && `<span><b>Inspired by</b><a class="link-line" href="${esc(p.inspiredBy.url)}" target="_blank" rel="noopener noreferrer">${esc(p.inspiredBy.label)}</a></span>`
        ].filter(Boolean);
        return `
        <article class="case case--${layoutOf(p, i)}" id="case-${esc(p.id)}">
            <div class="case-media">
                <button type="button" class="case-frame" data-open="${esc(p.id)}" aria-label="Open case study: ${esc(p.title)}">
                    <span class="case-chrome" aria-hidden="true"><i></i><i></i><i></i><span class="mono">${esc(link ? host(link.url) : (p.tags || [])[0] || '')}</span></span>
                    <span class="case-shot"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="1440" height="900"></span>
                    <span class="case-open" aria-hidden="true">Case study ${arrow}</span>
                </button>
            </div>
            <div class="case-text reveal">
                <p class="case-num mono"><b>Nº ${numberOf(p)}</b><span>${esc(p.category || '')}</span><i class="sep" aria-hidden="true"></i>${p.status ? `<span class="status-pill"><span class="sr-only">Status: </span>${esc(p.status)}</span>` : ''}</p>
                <h3 class="case-title">${esc(p.title)}</h3>
                <p class="case-summary">${esc(p.oneLiner || p.summary)}</p>
                ${meta.length ? `<p class="case-meta">${meta.join('')}</p>` : ''}
                <div class="case-actions">
                    <button type="button" class="link-line primary" data-open="${esc(p.id)}">Read case study</button>
                    ${link ? `<a class="link-line" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.label)} ${arrow}</a>` : ''}
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
    // A link to a project that isn't on the page (e.g. a draft) becomes plain text rather than a broken button
    $$('.demo [data-open]').forEach(b => { if (!order.some(p => p.id === b.dataset.open)) b.replaceWith(b.textContent); });
    $('#index').innerHTML = rest.map(indexHTML).join('');
    $('#work-count').textContent = projects.length ? `(${pad(projects.length)}) projects` : '';
    if (!projects.length) $('#empty-state').hidden = false;
    if (!rest.length) $('#index-wrap').hidden = true;

    /* ─── Case study sheet ─────────────────────────────────── */
    const sheet = $('#sheet');
    const sheetBody = $('#sheet-body');
    let currentId = null;

    // Case study: intro, then numbered sections in a fixed order. Only fields that exist are shown.
    function sheetHTML(p) {
        const facts = [['Category', p.category], ['Status', p.status], ['Role', p.role], ['Works on', p.platforms], ['Year', p.year]].filter(([, v]) => v);
        const list = items => `<ul>${items.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`;
        const blocks = [
            p.problem && ['Problem', `<p class="lead">${esc(p.problem)}</p>`],
            p.why && ['Why I built it', `<p>${esc(p.why)}</p>`],
            p.contribution && ['My contribution', `<p>${esc(p.contribution)}</p>`],
            p.approach && ['Approach', `<p>${esc(p.approach)}</p>`],
            p.details && p.details.length && ['How it works', p.details.map(t => `<p>${esc(t)}</p>`).join('')],
            p.gallery && p.gallery.length && ['Walkthrough', `<div class="sheet-gallery">${p.gallery.map(g => `<img src="${esc(g.src || g)}" alt="${esc(g.alt || 'Screenshot of ' + p.title)}" loading="lazy">`).join('')}</div>`],
            p.challenges && p.challenges.length && ['Challenges', list(p.challenges)],
            p.learnings && p.learnings.length && ['Learnings', list(p.learnings)],
            p.tags && p.tags.length && ['Tools & skills', `<p>${esc(p.tags.join(' · '))}</p>`],
            p.inspiredBy && ['Inspired by', `<p><a class="link-line" href="${esc(p.inspiredBy.url)}" target="_blank" rel="noopener noreferrer">${esc(p.inspiredBy.label)} ${arrow}</a></p>`]
        ].filter(Boolean);
        const links = (p.links || []).map(l =>
            `<a class="btn btn-accent" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ${arrow}</a>`).join('');
        return `
            <p class="sheet-cat mono">Nº ${numberOf(p)} — Case study</p>
            <h2 class="sheet-title" id="sheet-title">${esc(p.title)}</h2>
            <p class="sheet-summary">${esc(p.summary)}</p>
            ${links ? `<div class="sheet-links">${links}</div>` : ''}
            <div class="sheet-media">${p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}">` : typeCover(p)}</div>
            ${facts.length ? `<dl class="sheet-facts">${facts.map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
            ${blocks.map(([h, body], k) => `<section class="sheet-block"><h3><b>${pad(k + 1)}</b>${h}</h3><div>${body}</div></section>`).join('')}`;
    }

    let opener = null;
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
        if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
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
        if (b) { opener = b; openProject(b.dataset.open); }
    });
    const deep = location.hash.match(/^#work\/(.+)$/);
    if (deep) openProject(decodeURIComponent(deep[1]), { push: false });

    /* ─── Journal (only shown when entries exist) ──────────── */
    if (journal.length) {
        const fmt = d => { const t = new Date(d + 'T00:00:00'); return isNaN(t) ? d : t.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); };
        const entries = [...journal].sort((a, b) => String(b.date).localeCompare(String(a.date)));
        $('#journal-list').innerHTML = entries.map(j => `
            <li class="jn-entry reveal">
                <details>
                    <summary>
                        <span class="jn-date mono">${esc(fmt(j.date))}</span>
                        <span class="jn-title">${esc(j.title)}</span>
                        <span class="jn-tags">${(j.tags || []).map(t => `<span class="mono">${esc(t)}</span>`).join('')}</span>
                        <span class="jn-toggle" aria-hidden="true">+</span>
                    </summary>
                    <div class="jn-body">
                        ${(j.body || []).map(t => `<p>${esc(t)}</p>`).join('')}
                        ${j.link ? `<p><a class="link-line" href="${esc(j.link.url)}" target="_blank" rel="noopener">${esc(j.link.label)} ${arrow}</a></p>` : ''}
                    </div>
                </details>
            </li>`).join('');
        $('#journal-count').textContent = `(${pad(entries.length)}) ${entries.length === 1 ? 'note' : 'notes'}`;
        $('#journal').hidden = false;
        $$('a[href="#journal"]').forEach(a => { a.hidden = false; });
        // Keep the journal entries inside <details> as one block for the reveal
        $$('.jn-entry details').forEach(d => d.addEventListener('toggle', () => d.closest('.jn-entry').classList.add('in')));
    }

    /* ─── Header: scrolled state, hide on scroll down, progress ─ */
    const header = $('.site-header');
    let lastY = scrollY, scrollQueued = false;
    const onScroll = () => {
        scrollQueued = false;
        const y = scrollY;
        header.classList.toggle('scrolled', y > 10);
        header.classList.toggle('tucked', y > 480 && y > lastY + 4);
        if (y < lastY - 4 || y < 480) header.classList.remove('tucked');
        lastY = y;
        const max = document.documentElement.scrollHeight - innerHeight;
        header.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);
        parallax();
        if (typeof updateStep === 'function') updateStep();
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
        if (!link || !nav.offsetParent || link.hidden) return;
        indicator.style.setProperty('--x', `${link.offsetLeft}px`);
        indicator.style.setProperty('--w', `${link.offsetWidth}px`);
        indicator.style.setProperty('--o', 1);
    };
    const setActive = id => {
        activeLink = navLinks.find(a => a.dataset.nav === id) || activeLink;
        navLinks.forEach(a => { a.classList.toggle('active', a === activeLink); a.toggleAttribute('aria-current', a === activeLink); });
        moveIndicator(activeLink);
    };
    navLinks.forEach(a => a.addEventListener('pointerenter', () => moveIndicator(a)));
    nav.addEventListener('pointerleave', () => moveIndicator(activeLink));
    const spy = new IntersectionObserver(entries => {
        // Journey, Experience and Snapshot have no nav link of their own; they belong to About
        const group = { journey: 'about', experience: 'about', snapshot: 'about' };
        entries.forEach(en => { if (en.isIntersecting) setActive(group[en.target.id] || en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'about', 'journey', 'experience', 'snapshot', 'work', 'process', 'journal', 'contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el && !el.hidden) spy.observe(el);
    });
    document.fonts && document.fonts.ready.then(() => moveIndicator(activeLink));
    addEventListener('resize', () => moveIndicator(activeLink));

    /* ─── Theme toggle (circular reveal from the button) ───── */
    const themeBtn = $('.theme-btn');
    const metaTheme = $('meta[name="theme-color"]');
    const isDark = () => root.dataset.theme === 'dark';
    const syncTheme = () => {
        themeBtn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
        metaTheme.setAttribute('content', isDark() ? '#101817' : '#F5F3EC');
    };
    syncTheme();
    themeBtn.addEventListener('click', () => {
        const next = isDark() ? 'light' : 'dark';
        const apply = () => {
            root.dataset.theme = next;
            try { localStorage.setItem('jr-theme', next); } catch (e) {}
            syncTheme();
        };
        if (document.startViewTransition && !reduceMotion) {
            const r = themeBtn.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            const radius = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
            document.startViewTransition(apply).ready.then(() => {
                root.animate(
                    { clipPath: [`circle(0px at ${cx}px ${cy}px)`, `circle(${radius}px at ${cx}px ${cy}px)`] },
                    { duration: 650, easing: 'cubic-bezier(.16, 1, .3, 1)', pseudoElement: '::view-transition-new(root)' }
                );
            });
        } else {
            root.classList.add('theme-anim');
            apply();
            setTimeout(() => root.classList.remove('theme-anim'), 350);
        }
    });
    // With no saved choice, keep following the system setting
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        let saved = null;
        try { saved = localStorage.getItem('jr-theme'); } catch (err) {}
        if (saved) return;
        root.dataset.theme = e.matches ? 'dark' : 'light';
        syncTheme();
    });

    /* ─── Mobile menu ──────────────────────────────────────── */
    const menu = $('#menu');
    // Number only the links that are showing (Journal appears later)
    $$('.menu-links a:not([hidden]) .mono').forEach((n, k) => { n.textContent = pad(k + 1); });
    $('.menu-btn').addEventListener('click', () => { menu.showModal(); document.body.style.overflow = 'hidden'; });
    $('.menu-close').addEventListener('click', () => menu.close());
    menu.addEventListener('close', () => { document.body.style.overflow = ''; }); // also runs on Escape
    $$('.menu-links a').forEach(a => a.addEventListener('click', e => {
        e.preventDefault();
        menu.close();
        const target = document.querySelector(a.getAttribute('href'));
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        history.replaceState(null, '', a.getAttribute('href'));
    }));

    /* ─── Hero: four stages, one word, four type treatments ── */
    const STAGES = [
        // Short lines here; the Process section has the full version of each step
        ['Explore', 'Open it up and test it to its limits.'],
        ['Experiment', 'Prototype the idea with AI tools.'],
        ['Understand', 'Put it into clear words.'],
        ['Build', 'Put it online for anyone to use.']
    ];
    const stageEl = $('.stage');
    const word = $('#stage-word');
    const stBtns = $$('.st-btn');
    const stageCard = $('.stage-card');
    const CYCLE = parseFloat(getComputedStyle(root).getPropertyValue('--cycle')) || 3600;
    const rand = (a, b) => (a + Math.random() * (b - a)).toFixed(2);
    let stage = -1, timer = 0, held = false, heroVisible = true;
    function showStage(i) {
        stage = i;
        const name = STAGES[i][0];
        // One span per letter; random offsets feed the Experiment and Understand treatments
        word.innerHTML = [...name].map((c, k) =>
            `<span class="ch" style="--i:${k};--rx:${rand(-.25, .25)}em;--ry:${rand(-.3, .3)}em;--rr:${rand(-14, 14)}deg">${esc(c)}</span>`).join('');
        word.className = `stage-word s-${name.toLowerCase()}`;
        stBtns.forEach((b, k) => {
            b.classList.remove('on');
            b.setAttribute('aria-pressed', k === i);
        });
        void stageCard.offsetWidth; // restart the progress fill on the new button
        stBtns[i].classList.add('on');
        $('#loop-num').textContent = `${pad(i + 1)} / 04`;
        $('#loop-title').textContent = name;
        $('#loop-text').textContent = STAGES[i][1];
        stageCard.classList.remove('swap'); void stageCard.offsetWidth; stageCard.classList.add('swap');
    }
    const schedule = () => {
        clearTimeout(timer);
        if (held || reduceMotion || !heroVisible || document.hidden) return;
        timer = setTimeout(() => { showStage((stage + 1) % 4); schedule(); }, CYCLE);
    };
    const hold = i => { held = true; stageEl.classList.add('held'); if (i !== stage) showStage(i); clearTimeout(timer); };
    const release = () => { held = false; stageEl.classList.remove('held'); showStage(stage); schedule(); };
    stBtns.forEach(b => {
        const i = +b.dataset.stage;
        b.addEventListener('click', () => hold(i));
        b.addEventListener('focus', () => hold(i));
        b.addEventListener('blur', release);
    });
    stageEl.addEventListener('pointerenter', () => { if (!held) { held = true; stageEl.classList.add('held'); clearTimeout(timer); } });
    stageEl.addEventListener('pointerleave', () => { if (!stageEl.contains(document.activeElement)) release(); });
    if (reduceMotion) stageEl.classList.add('static');
    showStage(0);
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; schedule(); }).observe(stageEl);
    document.addEventListener('visibilitychange', () => {
        root.classList.toggle('page-hidden', document.hidden);
        schedule();
    });

    /* ─── Process: steps activate as they cross the middle ─── */
    const steps = $$('.step');
    const pvNum = $('#pv-num');
    const pvBtns = $$('[data-goto-step]');
    let activeStep = -1;
    const setStep = i => {
        if (i === activeStep) return;
        activeStep = i;
        steps.forEach((s, k) => { s.classList.toggle('on', k === i); s.classList.toggle('done', k < i); });
        pvBtns.forEach((b, k) => { b.classList.toggle('on', k === i); b.classList.toggle('done', k < i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
        pvNum.textContent = pad(i + 1);
    };
    setStep(0);
    // The active step is the last one whose top has passed the middle of the screen
    function updateStep() {
        const mid = innerHeight * 0.5;
        let i = 0;
        steps.forEach((s, k) => { if (s.getBoundingClientRect().top < mid) i = k; });
        setStep(i);
    }
    pvBtns.forEach(b => b.addEventListener('click', () => {
        const target = steps[+b.dataset.gotoStep];
        const y = target.getBoundingClientRect().top + scrollY - innerHeight * 0.3;
        scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
    }));

    /* ─── Process demos: one small interaction per step ───── */
    // Explore: take a product apart into its layers
    $$('[data-demo="explode"]').forEach(d => {
        const btn = $('.demo-btn', d), box = $('.explode', d);
        btn.addEventListener('click', () => {
            const open = box.classList.toggle('open');
            btn.setAttribute('aria-pressed', open);
            btn.textContent = open ? 'Put it back' : 'Take it apart';
        });
    });
    // Experiment: free-form output changes shape on every run; the schema doesn't
    $$('[data-demo="schema"]').forEach(d => {
        const free = $('.sc-free', d), fixed = $$('.sc-fixed i', d), count = $('.run-count', d);
        let runs = 1;
        const w = () => `${Math.round(30 + Math.random() * 65)}%`;
        $('.demo-btn', d).addEventListener('click', () => {
            runs++;
            const n = 3 + Math.floor(Math.random() * 5);
            free.innerHTML = Array.from({ length: n }, () => Math.random() < .22 ? '<b></b>' : `<i style="--w:${w()}"></i>`).join('');
            free.classList.remove('swap'); void free.offsetWidth; free.classList.add('swap');
            fixed.forEach(i => i.style.setProperty('--w', w()));
            count.textContent = `Run ${pad(runs)}`;
        });
    });
    // Understand: the same fact, three levels of plain
    $$('[data-demo="explain"]').forEach(d => {
        const LEVELS = [
            ['Technical', 'A Manifest V3 service worker turns each reminder into a Chrome alarm, which fires a notification with snooze.'],
            ['Simpler', 'A background script hands each reminder to Chrome, which shows it as a notification you can snooze.'],
            ['Plain', 'Your meeting reminder rings even when the extension is closed.']
        ];
        const range = $('.explain-range', d), text = $('.explain-text', d);
        range.addEventListener('input', () => {
            const [label, line] = LEVELS[+range.value];
            range.setAttribute('aria-valuetext', label);
            text.textContent = line;
            text.classList.remove('swap'); void text.offsetWidth; text.classList.add('swap');
        });
    });
    // Build: idea to live, one stop at a time
    $$('[data-demo="ship"]').forEach(d => {
        const STOPS = [
            'Started as a prototype in Google AI Studio.',
            'Rebuilt as a React 19 + TypeScript app with Vite.',
            'Added voice advisors, version history and a full PDF report.',
            'Live at startapath-ai-businessvalidator.onslate.in.'
        ];
        const list = $('.ship', d), btns = $$('.ship button', d), detail = $('.ship-detail', d), next = $('.demo-btn', d);
        let at = 0;
        const go = i => {
            at = i;
            list.style.setProperty('--sp', i / (STOPS.length - 1));
            btns.forEach((b, k) => { b.classList.toggle('on', k === i); b.classList.toggle('done', k < i); b.setAttribute('aria-pressed', k === i); });
            detail.textContent = STOPS[i];
            next.textContent = i === STOPS.length - 1 ? 'Start over' : 'Next step';
        };
        btns.forEach((b, k) => b.addEventListener('click', () => go(k)));
        next.addEventListener('click', () => go((at + 1) % STOPS.length));
    });

    /* ─── Journey: an accessible tab list ──────────────────── */
    const stops = $$('.jr-stop');
    const panels = $$('.jr-panel');
    const jrFill = $('#jr-fill');
    let journeyI = -1;
    function selectStop(i, focus = false) {
        if (i === journeyI) return;
        journeyI = i;
        stops.forEach((s, k) => {
            const on = k === i;
            s.setAttribute('aria-selected', on);
            s.tabIndex = on ? 0 : -1;
            s.classList.toggle('passed', k < i);
        });
        panels.forEach((p, k) => {
            p.hidden = k !== i;
            if (k === i) { p.classList.remove('swap'); void p.offsetWidth; p.classList.add('swap'); }
        });
        layoutJourneyLine();
        const s = stops[i];
        if (focus) s.focus();
        // Keep the selected stop visible on the scrolling rail (tablet / mobile)
        const wrap = $('.jr-track-wrap');
        if (wrap.scrollWidth > wrap.clientWidth) wrap.scrollTo({ left: s.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    // The line runs from the first dot to the last; the fill stops at the selected dot
    const jrLine = $('.jr-line');
    function layoutJourneyLine() {
        const track = $('.jr-track');
        const dot = s => track.offsetLeft + s.offsetLeft + 12 + 6.5; // dot: left 12px, 13px wide
        const first = dot(stops[0]), lastX = dot(stops[stops.length - 1]);
        jrLine.style.setProperty('--jl', `${first}px`);
        jrLine.style.setProperty('--jw', `${lastX - first}px`);
        jrFill.style.setProperty('--jf', journeyI < 0 ? 0 : (dot(stops[journeyI]) - first) / (lastX - first));
    }
    // Phones show the timeline vertically
    const mqPhone = matchMedia('(max-width: 767px)');
    const syncOrientation = () => $('.jr-track').setAttribute('aria-orientation', mqPhone.matches ? 'vertical' : 'horizontal');
    syncOrientation();
    mqPhone.addEventListener('change', syncOrientation);
    addEventListener('resize', layoutJourneyLine);
    stops.forEach((s, k) => {
        s.addEventListener('click', () => {
            selectStop(k);
            // On phones the panel sits below the list: bring it into view if it's off-screen
            const panel = panels[k];
            if (mqPhone.matches && panel.getBoundingClientRect().top > innerHeight * .8) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        });
        s.addEventListener('keydown', e => {
            const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
            if (e.key in keys) { e.preventDefault(); selectStop((journeyI + keys[e.key] + stops.length) % stops.length, true); }
            if (e.key === 'Home') { e.preventDefault(); selectStop(0, true); }
            if (e.key === 'End') { e.preventDefault(); selectStop(stops.length - 1, true); }
        });
    });
    selectStop(stops.length - 1); // open on "Now"
    document.addEventListener('click', e => {
        const b = e.target.closest('[data-journey]');
        if (!b) return;
        const i = +b.dataset.journey;
        $('#journey').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        selectStop(i);
        setTimeout(() => stops[i].focus({ preventScroll: true }), reduceMotion ? 0 : 700);
    });

    /* ─── Scroll reveals (staggered per batch) ─────────────── */
    const io = new IntersectionObserver(entries => {
        const visible = entries.filter(en => en.isIntersecting);
        visible.forEach((en, k) => {
            en.target.style.setProperty('--delay', `${Math.min(k, 6) * 80}ms`);
            en.target.classList.add('in');
            io.unobserve(en.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('.reveal, [data-split], .case, .section, .section-index').forEach(el => io.observe(el));

    /* ─── Parallax (transform only, tablet and up) ─────────── */
    const parallaxEls = reduceMotion ? [] : $$('[data-parallax]');
    function parallax() {
        if (!parallaxEls.length || innerWidth < 768) return;
        const mid = innerHeight / 2;
        parallaxEls.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.bottom < -200 || r.top > innerHeight + 200) return;
            el.style.translate = `0 ${((r.top + r.height / 2 - mid) * parseFloat(el.dataset.parallax)).toFixed(1)}px`;
        });
    }
    onScroll();

    /* ─── Pointer effects: magnetic buttons ────────────────── */
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
            setTimeout(() => { btn.classList.remove('copied'); label.textContent = 'Copy email'; }, 2200);
        } catch (err) {
            showToast(btn.dataset.email);
        }
    });

    $('#year').textContent = new Date().getFullYear();
    window.__jrReady = true;
})();
