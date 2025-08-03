document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('superhero-form');
  const modal = document.getElementById('modal-confirm');
  const modalErrorList = document.getElementById('modal-error-list');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  
  function validateField(field) {
    const validity = field.validity;
    const errorSpan = document.getElementById(field.name + '-error');
    if (validity.valid) {
      errorSpan.textContent = '';
      field.classList.remove('ring-2', 'ring-red-500');
      return true;
    } else {
      if (validity.valueMissing) {
        errorSpan.textContent = 'Este campo es obligatorio.';
      } else if (validity.patternMismatch) {
        errorSpan.textContent = 'Formato inválido.';
      } else if (validity.rangeOverflow || validity.rangeUnderflow) {
        errorSpan.textContent = 'Valor fuera de rango permitido.';
      } else {
        errorSpan.textContent = 'Campo inválido.';
      }
      field.classList.add('ring-2', 'ring-red-500');
      errorSpan.classList.add('text-red-500');
      field.focus();
      return false;
    }
  }
  
  function validateForm() {
    let valid = true;
    const errors = [];
    [...form.elements].forEach(field => {
      if (field.tagName.toLowerCase() !== 'input') return;
      const isFieldValid = validateField(field);
      if (!isFieldValid) {
        valid = false;
        errors.push(field.previousElementSibling.textContent.trim() + ': ' + document.getElementById(field.name + '-error').textContent);
      }
    });
    return { valid, errors };
  }

  function showModal(errors) {
    modalErrorList.innerHTML = '';
    errors.forEach(err => {
      const li = document.createElement('li');
      li.textContent = err;
      modalErrorList.appendChild(li);
    });
    modal.classList.remove('hidden');
  }

  modalCloseBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  [...form.elements].forEach(field => {
    if (field.tagName.toLowerCase() !== 'input') return;
    field.addEventListener('input', () => validateField(field));
  });
  
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const { valid, errors } = validateForm();
      if (valid) {
        form.submit();
      } else {
        showModal(errors);
      }
    });
  });
});
