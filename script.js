// ===== API CONFIG =====
const API_BASE = "https://r-bots-free-apis.co08.art/api/v1/api/nsfw";
const CATEGORIES = ['pussy', 'cuckold', 'yuri', 'blowjob'];
let currentCategory = 'pussy';
let currentImageUrl = '';
let currentRawData = {};

const imageContainer = document.getElementById('imageContainer');

// ===== LOAD CATEGORY =====
function loadCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.cat-btn[onclick*="${category}"]`).classList.add('active');
    fetchImage();
}

// ===== FETCH IMAGE =====
async function fetchImage() {
    imageContainer.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>`;
    try {
        const url = `${API_BASE}/${currentCategory}`;
        console.log('📡 Fetching:', url);
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const contentType = response.headers.get('content-type') || '';
        console.log('📄 Content-Type:', contentType);
        
        // ===== BINARY IMAGE =====
        if (contentType.includes('image') || contentType.includes('octet-stream')) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            currentImageUrl = imageUrl;
            
            imageContainer.innerHTML = `
                <div class="image-wrapper">
                    <img src="${imageUrl}" alt="${currentCategory}" />
                </div>
                <div class="image-meta">
                    <span>📂 ${currentCategory.toUpperCase()}</span>
                    <span>📄 ${contentType}</span>
                    <span>📦 ${(blob.size / 1024).toFixed(1)} KB</span>
                </div>
                <div class="controls">
                    <button onclick="refreshImage()" class="refresh-btn"><i class="fas fa-sync-alt"></i> Refresh</button>
                    <button onclick="downloadImage()" class="download-btn"><i class="fas fa-download"></i> Download</button>
                </div>
            `;
            return;
        }
        
        // ===== JSON RESPONSE =====
        let data;
        try {
            const text = await response.text();
            data = JSON.parse(text);
        } catch (e) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            currentImageUrl = imageUrl;
            imageContainer.innerHTML = `
                <div class="image-wrapper">
                    <img src="${imageUrl}" alt="${currentCategory}" />
                </div>
                <div class="image-meta">
                    <span>📂 ${currentCategory.toUpperCase()}</span>
                    <span>📄 Raw Binary</span>
                    <span>📦 ${(blob.size / 1024).toFixed(1)} KB</span>
                </div>
                <div class="controls">
                    <button onclick="refreshImage()" class="refresh-btn"><i class="fas fa-sync-alt"></i> Refresh</button>
                    <button onclick="downloadImage()" class="download-btn"><i class="fas fa-download"></i> Download</button>
                </div>
            `;
            return;
        }
        
        console.log('📦 JSON:', data);
        currentRawData = data;
        
        // ===== EXTRACT IMAGE URL =====
        let imageUrl = null;
        if (data.url) imageUrl = data.url;
        else if (data.image) imageUrl = data.image;
        else if (data.data?.url) imageUrl = data.data.url;
        else if (data.data?.image) imageUrl = data.data.image;
        else if (data.link) imageUrl = data.link;
        else if (Array.isArray(data) && data[0]?.url) imageUrl = data[0].url;
        else if (typeof data === 'string' && data.startsWith('http')) imageUrl = data;
        else {
            const str = JSON.stringify(data);
            const match = str.match(/https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp)/i);
            if (match) imageUrl = match[0];
        }
        
        if (imageUrl) {
            currentImageUrl = imageUrl;
            imageContainer.innerHTML = `
                <div class="image-wrapper">
                    <img src="${imageUrl}" alt="${currentCategory}" />
                </div>
                <div class="raw-data">
                    <h3>📊 API Response</h3>
                    <pre>${JSON.stringify(currentRawData, null, 2)}</pre>
                </div>
                <div class="image-meta">
                    <span>📂 ${currentCategory.toUpperCase()}</span>
                    <span>🔗 <a href="${imageUrl}" target="_blank">Open</a></span>
                </div>
                <div class="controls">
                    <button onclick="refreshImage()" class="refresh-btn"><i class="fas fa-sync-alt"></i> Refresh</button>
                    <button onclick="downloadImage()" class="download-btn"><i class="fas fa-download"></i> Download</button>
                </div>
            `;
        } else {
            imageContainer.innerHTML = `
                <div class="raw-data" style="width:100%;">
                    <h3>⚠️ No Image Found</h3>
                    <pre>${JSON.stringify(currentRawData, null, 2)}</pre>
                </div>
            `;
        }
    } catch (error) {
        console.error('❌ Error:', error);
        imageContainer.innerHTML = `
            <div class="loading" style="color:#ff6b6b;">
                <i class="fas fa-exclamation-triangle"></i>
                ${error.message}
                <button onclick="fetchImage()" style="margin-top:15px;padding:10px 24px;border-radius:10px;border:1px solid #e50914;background:transparent;color:#fff;cursor:pointer;">Retry</button>
            </div>
        `;
    }
}

// ===== REFRESH =====
function refreshImage() {
    fetchImage();
}

// ===== DOWNLOAD =====
function downloadImage() {
    if (!currentImageUrl) {
        alert('No image to download!');
        return;
    }
    const link = document.createElement('a');
    link.href = currentImageUrl;
    link.download = `${currentCategory}_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'r' || e.key === 'R') refreshImage();
    if (e.key === 'd' || e.key === 'D') downloadImage();
});

// ===== INIT =====
fetchImage();
console.log('🌑 DarkX • GpsirAi • Shadow Community');
