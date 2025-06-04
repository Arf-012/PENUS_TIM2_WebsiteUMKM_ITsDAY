const form = document.getElementById('contact-me'); 
const nameInput = form.name;
const emailInput = form.email;
const messageInput = form.message;
const successMsg = document.getElementById('success-message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error'); 
const messageError = document.getElementById('message-error'); 

function validateForm() {
  let isValid = true;
  
  const name = nameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = 'Nama minimal 3 karakter';
    isValid = false;
  } else {
    nameError.textContent = '';
  }
  
  const email = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = 'Email tidak valid';
    isValid = false;
  } else {
    emailError.textContent = '';
  }
  
  const message = messageInput.value.trim();
  if (message.length < 10) {
    messageError.textContent = 'Pesan minimal 10 karakter';
    isValid = false;
  } else {
    messageError.textContent = '';
  }
  
  return isValid;
}

emailjs.sendForm('service_5t9ol9k', 'template_anqlpjb', form, {
  customHeaders: {
    'X-Mailer': 'MyWebsiteContactForm/1.0',
    'X-Priority': '1',
    'Precedence': 'bulk'
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (!validateForm()) {
    return; 
  }
  
  const btn = event.target.querySelector('button[type="submit"]');
  
  btn.disabled = true;
  btn.textContent = 'Mengirim...';
  
  emailjs.sendForm('service_5t9ol9k', 'template_anqlpjb', this)
    .then(function() {
      successMsg.textContent = 'Pesan berhasil dikirim! Terima kasih.';
      successMsg.style.display = 'block';
      successMsg.style.color = ''; 
      form.reset();
    }, function(error) {
      successMsg.textContent = 'Gagal mengirim pesan. Silakan coba lagi.';
      successMsg.style.color = '#ff3333';
      successMsg.style.display = 'block';
      console.error('Error:', error);
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = '✉️ Kirim Pesan';
    });
});

const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

emailjs.sendForm('service_5t9ol9k', 'template_anqlpjb', form, {
  date: today
});