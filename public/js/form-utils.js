document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('superhero-form');
  if (!form) return;

  form.querySelectorAll('input').forEach(input => {
    ['input', 'blur'].forEach(evt =>
      input.addEventListener(evt, () => validateField(input))
    );
  });

  function validateField(input) {
    const errorEl = input.nextElementSibling;
    if (!errorEl) return;

    let msg = '';
    const val = input.value.trim();
    const nm  = input.name;

    
    if (input.required && !val) {
      msg = 'Este campo es obligatorio.';
    }
    
    else if (['poderes', 'aliados', 'enemigos'].includes(nm)) {
      if (!val) {
        if (nm === 'poderes') {
          msg = 'Por favor, ingresa al menos un poder para el superhéroe.';
        }
      } else {
        const items = val.split(',').map(s => s.trim()).filter(Boolean);
        if (nm === 'poderes' && items.length === 0) {
          msg = 'Por favor, ingresa al menos un poder para el superhéroe.';
        } else {
          const invalid = items.filter(it => it.length < 3 || it.length > 60);
          if (invalid.length) {
            const campo = nm === 'poderes' ? 'poder' : nm === 'aliados' ? 'aliado' : 'enemigo';
            msg = `Cada ${campo} debe tener entre 3 y 60 caracteres.`;
          }
        }
      }
    }
    
    else if (input.type === 'number' && val) {
      const num = Number(val);
      if (input.min && num < Number(input.min)) {
        msg = `El valor no puede ser menor que ${input.min}.`;
      }
    }
    
    else if (input.type === 'text') {
      if (input.minLength > 0 && val.length < input.minLength) {
        msg = `Debe tener al menos ${input.minLength} caracteres.`;
      } else if (input.maxLength >= 0 && val.length > input.maxLength) {
        msg = `No puede superar ${input.maxLength} caracteres.`;
      }
    }

    if (msg) {
      errorEl.textContent = msg;
      input.classList.add('border-red-600');
    } else {
      errorEl.textContent = '';
      input.classList.remove('border-red-600');
    }
  }
});
