// ===== API CONFIG =====
const API_BASE = "https://r-bots-free-apis.co08.art/api/v1/api/nsfw";
const CATEGORIES = ['pussy', 'cuckold', 'yuri', 'blowjob'];
let currentCategory = 'pussy';
let currentImageUrl = '';

// ===== DOM ELEMENTS =====
const imageContainer = document.getElementById('imageContainer');

// ===== LOAD CATEGORY =====
function loadCategory(category) {
    currentCategory = category;
    // Update active button
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.cat-btn[onclick*="${category}"]`).classList.add('active');
    // Load image
    fetchImage();
}

// ===== FETCH IMAGE =====
async function fetchImage() {
    imageContainer.innerHTML = `<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>`;
    try {
        const url = `${API_BASE}/${currentCategory}`;
        console.log('Fetching:', url);
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle different response formats
        let imageUrl = null;
        if (data.url) imageUrl = data.url;
        else if (data.image) imageUrl = data.image;
        else if (data.data && data.data.url) imageUrl = data.data.url;
        else if (data.data && data.data.image) imageUrl = data.data.image;
        else if (data.link) imageUrl = data.link;
        else if (Array.isArray(data) && data.length > 0 && data[0].url) {
            imageUrl = data[0].url;
        } else if (typeof data === 'string' && data.startsWith('http')) {
            imageUrl = data;
        } else {
            // Try to find any URL in response
            const str = JSON.stringify(data);
            const match = str.match(/https?:\/\/[^\s"']+\.(jpg|jpeg|png|gif|webp)/i);
            if (match) imageUrl = match[0];
        }
        
        if (imageUrl) {
            currentImageUrl = imageUrl;
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="${currentCategory}" />`;
        } else {
            throw new Error('No image URL found in response');
        }
    } catch (error) {
        console.error('Error:', error);
        imageContainer.innerHTML = `
            <div class="loading" style="color:#ff6b6b;">
                <i class="fas fa-exclamation-triangle"></i>
                Error loading image. <br />
                <span style="font-size:0.8rem;color:#667788;">${error.message}</span>
                <br />
                <button onclick="fetchImage()" style="margin-top:10px;padding:8px 20px;border-radius:8px;border:1px solid #e50914;background:transparent;color:#fff;cursor:pointer;">Retry</button>
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
        alert('No image to download. Load an image first!');
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
