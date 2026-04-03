document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var nameInput    = document.getElementById('contactName');
  var emailInput   = document.getElementById('contactEmail');
  var messageInput = document.getElementById('contactMessage');
  var submitBtn    = form.querySelector('[type="submit"]');
  var statusEl     = document.getElementById('contactFormStatus');

  var lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
  var isEn = lang.startsWith('en');

  var strings = isEn
    ? {
        missingMessage : 'Please tell us what you need in the message field.',
        invalidEmail   : 'Enter a valid email address (must include @).',
        sending        : 'Sending…',
        send           : 'Send',
        success        : 'Message sent! We\'ll get back to you soon.',
        error          : 'Something went wrong. Write to us directly at <a href="mailto:info@hosteriaparadise.com.ar">info@hosteriaparadise.com.ar</a>.'
      }
    : {
        missingMessage : 'Por favor, contanos en el mensaje qué necesitás.',
        invalidEmail   : 'Ingresá un email válido (debe incluir @).',
        sending        : 'Enviando…',
        send           : 'Enviar',
        success        : '¡Mensaje enviado! Te respondemos pronto.',
        error          : 'Algo salió mal. Escribinos directamente a <a href="mailto:info@hosteriaparadise.com.ar">info@hosteriaparadise.com.ar</a>.'
      };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name    = nameInput    ? nameInput.value.trim()    : '';
    var email   = emailInput   ? emailInput.value.trim()   : '';
    var message = messageInput ? messageInput.value.trim() : '';

    if (!message) {
      alert(strings.missingMessage);
      if (messageInput) messageInput.focus();
      return;
    }

    if (!email || email.indexOf('@') === -1) {
      alert(strings.invalidEmail);
      if (emailInput) emailInput.focus();
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = strings.sending;
    statusEl.hidden       = true;
    statusEl.className    = 'form-status';

    var data = new FormData();
    data.append('name',     name);
    data.append('email',    email);
    data.append('message',  message);
    data.append('_subject', 'Consulta web - ' + (name || 'The Paradise'));

    fetch('https://formspree.io/f/mreoyljr', {
      method  : 'POST',
      body    : data,
      headers : { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          statusEl.innerHTML  = strings.success;
          statusEl.className  = 'form-status form-status--ok';
          statusEl.hidden     = false;
          form.reset();
        } else {
          return response.json().then(function (body) {
            throw new Error(body.error || 'error');
          });
        }
      })
      .catch(function () {
        statusEl.innerHTML = strings.error;
        statusEl.className = 'form-status form-status--error';
        statusEl.hidden    = false;
      })
      .finally(function () {
        submitBtn.disabled    = false;
        submitBtn.textContent = strings.send;
      });
  });
});
