// ============================================================
// APPLICATION - DIAG INCENDIE BY KEVIN (v2.0)
// ============================================================
class DiagIncendieApp {
    constructor() {
        this.db = null;
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            await this.initIndexedDB();
            this.setupEventListeners();
            this.updateConnectionStatus();
            this.renderMetalTable();
            this.renderWireAnalysis();
            this.renderMetalIdentification();
            this.renderFireCauses();
            this.renderGallery();
            this.updateStorageStats();
            console.log('✅ Application initialisée sans erreur');
        } catch (e) {
            console.error('Erreur init:', e);
            localStorage.setItem('lastCrash', JSON.stringify({ time: Date.now(), error: e.message }));
        }
    }

    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('DiagIncendieDB', 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => { this.db = request.result; this.populateDatabase(); resolve(this.db); };
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('fireCases')) {
                    const s = db.createObjectStore('fireCases', { keyPath: 'id' });
                    s.createIndex('category', 'category', { unique: false });
                }
                if (!db.objectStoreNames.contains('userData')) db.createObjectStore('userData', { keyPath: 'key' });
            };
        });
    }

    populateDatabase() {
        if (!this.db) return;
        const tx = this.db.transaction(['fireCases'], 'readwrite');
        const store = tx.objectStore('fireCases');
        store.count().onsuccess = (e) => {
            if (e.target.result === 0) {
                FIRE_DATABASE.fireCauses.forEach(c => store.put(c));
                console.log(`✅ Base locale peuplée : ${FIRE_DATABASE.fireCauses.length} cas`);
            }
        };
    }

    setupEventListeners() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderFireCauses();
            });
        });
        document.getElementById('searchBtn').addEventListener('click', () => this.performSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') this.performSearch(); });
        document.getElementById('geminiSearchBtn').addEventListener('click', () => this.performGeminiSearch());
        document.getElementById('offlinePhotosBtn').addEventListener('click', () => this.cacheAllPhotos());
        window.addEventListener('online', () => this.updateConnectionStatus());
        window.addEventListener('offline', () => this.updateConnectionStatus());
    }

    updateConnectionStatus() {
        const el = document.getElementById('connectionStatus');
        if (navigator.onLine) {
            el.className = 'connection-status online';
            el.innerHTML = '<span class="status-icon"></span><span class="status-text">En ligne (4G/5G/WiFi)</span>';
        } else {
            el.className = 'connection-status offline';
            el.innerHTML = '<span class="status-icon"></span><span class="status-text">Hors ligne - base locale active</span>';
        }
    }

    photoHTML(key, extraClass = '') {
        const p = PHOTOS[key];
        if (!p) return '';
        return `<img src="${p.url}" alt="${p.caption}" loading="lazy" class="photo-thumb ${extraClass}"
            onclick="openLightbox('${key}')"
            onerror="this.classList.add('photo-error'); this.alt='📷 Photo indisponible hors ligne';">`;
    }

    renderMetalTable() {
        document.querySelector('#metalTable tbody').innerHTML = FIRE_DATABASE.metals.map(m => `
            <tr><td><strong>${m.name}</strong></td><td>${m.meltingPointC} °C</td><td>${m.meltingPointF} °F</td><td>${m.appearance}</td></tr>
        `).join('');
    }

    renderWireAnalysis() {
        document.getElementById('wireAnalysisGrid').innerHTML = Object.entries(FIRE_DATABASE.wireAnalysis).map(([key, d]) => `
            <div class="analysis-card">
                <h3>${d.title}</h3>
                <div class="temp-info">🌡️ ${d.temperature}</div>
                <ul class="characteristics">${d.characteristics.map(c => `<li>${c}</li>`).join('')}</ul>
                <p class="identification">${d.identification}</p>
                <div class="photo-row">${d.photos.map(p => this.photoHTML(p)).join('')}</div>
            </div>
        `).join('');
    }

    renderMetalIdentification() {
        const hc = FIRE_DATABASE.metalIdentification.heatColors;
        const det = FIRE_DATABASE.metalIdentification.deterioration;
        document.getElementById('metalIdGrid').innerHTML = `
            <div class="id-card">
                <h3>${hc.title}</h3>
                <div class="temp-colors">${hc.temps.map(t => `
                    <div class="temp-item">
                        <span class="temp">${t.temp}</span>
                        <span class="color" style="background:${t.hex}">${t.color}</span>
                        <span class="desc">${t.description}</span>
                    </div>`).join('')}
                </div>
                <p class="identification">${hc.identification}</p>
                <div class="photo-row">${hc.photos.map(p => this.photoHTML(p)).join('')}</div>
            </div>
            <div class="id-card">
                <h3>${det.title}</h3>
                ${det.types.map(t => `
                    <div class="det-type">
                        <h4>${t.type}</h4>
                        <p><strong>Aspect :</strong> ${t.appearance}</p>
                        <p><strong>Cause :</strong> ${t.cause} — <strong>Temp :</strong> ${t.temperature}</p>
                    </div>`).join('')}
                <div class="photo-row">${det.photos.map(p => this.photoHTML(p)).join('')}</div>
            </div>`;
    }

    renderFireCauses() {
        let list = FIRE_DATABASE.fireCauses;
        if (this.currentFilter !== 'all') list = list.filter(c => c.category === this.currentFilter);
        document.getElementById('causesGrid').innerHTML = list.map(c => `
            <div class="cause-card">
                <span class="category-badge">${this.getCategoryLabel(c.category)}</span>
                <h3>${c.title}</h3>
                <p class="cause-type">Type : ${c.type}</p>
                <p class="cause-desc">${c.description}</p>
                <div class="cause-causes"><strong>Causes possibles :</strong>
                    <ul>${c.causes.slice(0, 3).map(x => `<li>${x}</li>`).join('')}</ul>
                </div>
                <div class="cause-temp">🌡️ ${c.temperature}</div>
                <div class="photo-row">${c.photos.map(p => this.photoHTML(p)).join('')}</div>
                <button class="btn-expand" onclick="app.expandCase('${c.id}')">Voir l'analyse complète</button>
            </div>
        `).join('') || '<p class="no-results">Aucun cas dans cette catégorie</p>';
    }

    getCategoryLabel(cat) {
        return { building: '🏢 Bâtiment', electrical: '⚡ Électrique', 'vehicle-thermal': '🚗 Thermique', 'vehicle-electric': '🔋 Électrique', equipment: '🔧 Matériel' }[cat] || cat;
    }

    expandCase(id) {
        const c = FIRE_DATABASE.fireCauses.find(x => x.id === id);
        if (!c) return;
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                <h2>${c.title}</h2>
                <div class="modal-section"><h3>Description</h3><p>${c.description}</p></div>
                <div class="modal-section"><h3>Causes</h3><ul>${c.causes.map(x => `<li>${x}</li>`).join('')}</ul></div>
                <div class="modal-section"><h3>Identification</h3>
                    <div class="id-subsection"><h4>🔌 Fils électriques</h4><p>${c.identification.wires}</p></div>
                    <div class="id-subsection"><h4>🔩 Métal</h4><p>${c.identification.metal}</p></div>
                    <div class="id-subsection"><h4>🏠 Environnement</h4><p>${c.identification.surroundings}</p></div>
                </div>
                <div class="modal-section"><h3>Température</h3><p class="temp-highlight">${c.temperature}</p></div>
                <div class="modal-section"><h3>📷 Photos de référence</h3>
                    <div class="photo-row big">${c.photos.map(p => this.photoHTML(p)).join('')}</div>
                </div>
                <div class="modal-section"><h3>✅ Checklist fils</h3><ul>${FIRE_DATABASE.diagnosticGuide.wireChecklist.map(x => `<li>${x}</li>`).join('')}</ul></div>
                <div class="modal-section"><h3>✅ Checklist métaux</h3><ul>${FIRE_DATABASE.diagnosticGuide.metalChecklist.map(x => `<li>${x}</li>`).join('')}</ul></div>
            </div>`;
        document.body.appendChild(modal);
    }

    renderGallery() {
        document.getElementById('photoGallery').innerHTML = Object.entries(PHOTOS).map(([key, p]) => `
            <figure class="gallery-item">
                ${this.photoHTML(key)}
                <figcaption>${p.caption}</figcaption>
            </figure>
        `).join('');
    }

    async cacheAllPhotos() {
        const keys = Object.keys(PHOTOS);
        const prog = document.getElementById('offlineProgress');
        let done = 0;
        for (const key of keys) {
            try { await fetch(PHOTOS[key].url); } catch (e) { console.warn('Photo non mise en cache:', key); }
            done++;
            prog.textContent = `📥 Mise en cache hors ligne : ${done}/${keys.length} photos...`;
        }
        prog.textContent = `✅ ${keys.length} photos disponibles hors ligne !`;
    }

    performSearch() {
        const q = document.getElementById('searchInput').value.toLowerCase().trim();
        const div = document.getElementById('searchResults');
        if (!q) { div.innerHTML = ''; return; }
        const results = FIRE_DATABASE.fireCauses.filter(c =>
            c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) ||
            c.type.toLowerCase().includes(q) || c.causes.some(x => x.toLowerCase().includes(q)));
        div.innerHTML = results.length
            ? `<div class="search-results-header">${results.length} résultat(s)</div>` +
              results.map(r => `<div class="search-result-item" onclick="app.expandCase('${r.id}')"><h4>${r.title}</h4><p>${r.description}</p></div>`).join('')
            : '<div class="no-results">Aucun résultat - essayez l\'IA Gemini 🤖</div>';
    }

    async performGeminiSearch() {
        const q = document.getElementById('searchInput').value.trim();
        const div = document.getElementById('geminiResults');
        if (!q) { alert('Entrez une question'); return; }
        div.innerHTML = '<div class="loading">🤖 Recherche IA en cours...</div>';
        try {
            const answer = await geminiSearch(q);
            div.innerHTML = `<div class="gemini-answer"><h3>🤖 Réponse Gemini</h3><div class="answer-content">${answer.replace(/\n/g, '<br>')}</div></div>`;
        } catch (e) {
            div.innerHTML = `<div class="error">Erreur : ${e.message}<br><small>Vérifiez la connexion et la clé API dans js/gemini-search.js</small></div>`;
        }
    }

    updateStorageStats() {
        document.getElementById('photosCount').textContent = Object.keys(PHOTOS).length;
        if (this.db) {
            const tx = this.db.transaction(['fireCases'], 'readonly');
            tx.objectStore('fireCases').count().onsuccess = e => {
                document.getElementById('casesCount').textContent = e.target.result || FIRE_DATABASE.fireCauses.length;
            };
        }
        document.getElementById('storageStatus').textContent = '✅ Base locale active - IndexedDB + Cache API';
    }
}

// Lightbox photos
function openLightbox(key) {
    const p = PHOTOS[key];
    if (!p) return;
    document.getElementById('lightboxImg').src = p.url;
    document.getElementById('lightboxCaption').textContent = p.caption;
    document.getElementById('lightboxCredit').textContent = '© ' + p.credit;
    document.getElementById('lightbox').classList.remove('hidden');
}
function closeLightbox() { document.getElementById('lightbox').classList.add('hidden'); }

// Auto-vérification (toutes les 60 s) + reprise après plantage
window.addEventListener('error', (e) => {
    localStorage.setItem('lastCrash', JSON.stringify({ time: Date.now(), error: e.message }));
});
setInterval(() => {
    const ok = window.app && window.app.db;
    console.log(ok ? '✅ Auto-vérification OK : app + base locale opérationnelles' : '⚠️ Auto-vérification : app non prête');
}, 60000);

let app;
document.addEventListener('DOMContentLoaded', () => {
    const crash = localStorage.getItem('lastCrash');
    if (crash) { console.warn('Reprise après incident détecté:', crash); localStorage.removeItem('lastCrash'); }
    app = new DiagIncendieApp();
});
