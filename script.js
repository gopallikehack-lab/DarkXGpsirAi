* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
    background: #0a0e17;
    color: #fff;
    min-height: 100vh;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 15px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* ===== HEADER ===== */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 10px;
}
.logo {
    font-size: 1.8rem;
    font-weight: 900;
    color: #e50914;
    letter-spacing: -0.5px;
}
.logo span {
    color: #00d4ff;
}
.badge {
    background: #e50914;
    padding: 4px 14px;
    border-radius: 30px;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* ===== CATEGORIES ===== */
.categories {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
}
.cat-btn {
    padding: 10px 24px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 30px;
    background: rgba(255,255,255,0.03);
    color: #8899aa;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 600;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 8px;
}
.cat-btn:hover {
    border-color: rgba(229,9,20,0.4);
    color: #fff;
    background: rgba(229,9,20,0.05);
}
.cat-btn.active {
    background: #e50914;
    border-color: #e50914;
    color: #fff;
    box-shadow: 0 10px 30px rgba(229,9,20,0.3);
}

/* ===== CONTENT ===== */
.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* ===== IMAGE CONTAINER (FULL SCREEN) ===== */
.image-container {
    flex: 1;
    min-height: 65vh;
    background: #0d0d12;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid rgba(255,255,255,0.05);
}

.image-wrapper {
    width: 100%;
    height: 100%;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}
.image-wrapper img {
    max-width: 100%;
    max-height: 75vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

/* ===== LOADING ===== */
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    color: #667788;
    font-size: 1.1rem;
    min-height: 300px;
}
.loading i {
    font-size: 2.5rem;
    color: #00d4ff;
}

/* ===== RAW DATA (Collapsible) ===== */
.raw-data {
    background: rgba(0,0,0,0.3);
    border-radius: 12px;
    padding: 15px;
    border: 1px solid rgba(255,255,255,0.05);
    max-height: 200px;
    overflow-y: auto;
}
.raw-data h3 {
    color: #00d4ff;
    font-size: 0.9rem;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.raw-data pre {
    color: #8899aa;
    font-size: 0.75rem;
    font-family: 'Courier New', monospace;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0;
}

/* ===== IMAGE META ===== */
.image-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255,255,255,0.03);
    border-radius: 10px;
    color: #667788;
    font-size: 0.8rem;
    flex-wrap: wrap;
    gap: 8px;
}
.image-meta a {
    color: #00d4ff;
    text-decoration: none;
}
.image-meta a:hover {
    text-decoration: underline;
}

/* ===== CONTROLS ===== */
.controls {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px 0;
}
.controls .refresh-btn,
.controls .download-btn {
    padding: 12px 32px;
    border: none;
    border-radius: 50px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
}
.controls .refresh-btn {
    background: linear-gradient(45deg, #00d4ff, #0088cc);
    color: #fff;
}
.controls .refresh-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0,212,255,0.3);
}
.controls .download-btn {
    background: linear-gradient(45deg, #4CAF50, #2E7D32);
    color: #fff;
}
.controls .download-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(76,175,80,0.3);
}

/* ===== FOOTER ===== */
footer {
    text-align: center;
    color: #334455;
    padding: 20px 0 10px;
    border-top: 1px solid rgba(255,255,255,0.03);
    margin-top: 20px;
    font-size: 0.85rem;
}
.tag {
    color: #222;
    font-family: monospace;
    margin-top: 4px;
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 10px;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .logo {
        font-size: 1.4rem;
    }
    .cat-btn {
        padding: 8px 16px;
        font-size: 0.75rem;
    }
    .image-wrapper {
        min-height: 40vh;
    }
    .image-wrapper img {
        max-height: 55vh;
    }
    .controls {
        gap: 10px;
    }
    .controls .refresh-btn,
    .controls .download-btn {
        padding: 10px 22px;
        font-size: 0.85rem;
    }
    .raw-data {
        max-height: 150px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 10px;
    }
    .categories {
        gap: 6px;
    }
    .cat-btn {
        padding: 6px 14px;
        font-size: 0.7rem;
    }
    .image-wrapper img {
        max-height: 45vh;
    }
}
