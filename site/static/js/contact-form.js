document.addEventListener('DOMContentLoaded', function () {
  console.log('contact-form loaded');

  var form = document.getElementById('contactForm');
  if (!form) {
    return;
  }

  var nameInput = document.getElementById('contactName');
  var emailInput = document.getElementById('contactEmail');
  var messageInput = document.getElementById('contactMessage');

  var lang = (document.documentElement.getAttribute('lang') || 'es').toLowerCase();
  var strings = lang.startsWith('en')
    ? {
        missingMessage: 'Please tell us what you need in the message field.',
        invalidEmail: 'Enter a valid email address (must include @).'
      }
    : {
        missingMessage: 'Por favor, contanos en el mensaje qué necesitás.',
        invalidEmail: 'Ingresá un email válido (debe incluir @).'
      };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = nameInput ? nameInput.value.trim() : '';
    var email = emailInput ? emailInput.value.trim() : '';
    var message = messageInput ? messageInput.value.trim() : '';

    if (!message) {
      alert(strings.missingMessage);
      if (messageInput) {
        messageInput.focus();
      }
      return;
    }

    if (!email || email.indexOf('@') === -1) {
      alert(strings.invalidEmail);
      if (emailInput) {
        emailInput.focus();
      }
      return;
    }

    var subject = 'Consulta web - ' + (name || 'The Paradise');
    var body =
      'Hola, soy ' + (name || 'un huésped') + '.\n\n' +
      message;

    var mailtoUrl =
      'mailto:info@hosteriaparadise.com.ar' +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoUrl;
  });
});
