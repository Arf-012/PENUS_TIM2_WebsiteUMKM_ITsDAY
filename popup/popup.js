// Mendapatkan elemen yang diperlukan
const popup = document.getElementById('contactPopup');
const openBtn = document.getElementById('openPopupBtn');
const closeBtn = document.querySelector('.close-btn');
const contactForm = document.getElementById('contactForm');

// Membuka popup ketika tombol diklik
openBtn.addEventListener('click', function() {
    popup.style.display = 'flex';
});

// Menutup popup ketika tombol close diklik
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Menutup popup ketika mengklik di luar area popup
window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// Menangani pengiriman form
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Di sini Anda bisa menambahkan kode untuk mengirim data form
    // Contoh: menggunakan AJAX atau Fetch API
    
    alert('Pesan Anda telah terkirim! Terima kasih.');
    popup.style.display = 'none';
    
    // Reset form
    contactForm.reset();
});