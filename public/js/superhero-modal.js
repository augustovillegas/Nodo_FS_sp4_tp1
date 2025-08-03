document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('superhero-modal');
  const closeModalBtn = document.getElementById('close-modal');

  function showSuperheroModal(row) {
    document.getElementById('modal-name').textContent       = row.dataset.name       || '-';
    document.getElementById('modal-realname').textContent   = row.dataset.realname   || '-';
    document.getElementById('modal-age').textContent        = row.dataset.age        || '-';
    document.getElementById('modal-planet').textContent     = row.dataset.planet     || '-';
    document.getElementById('modal-weakness').textContent   = row.dataset.weakness   || '-';
    document.getElementById('modal-creator').textContent    = row.dataset.creator    || '-';

    ['powers','allies','enemies'].forEach(key => {
      try {
        const arr = JSON.parse(row.dataset[key]);
        document.getElementById(`modal-${key}`).textContent = arr.length ? arr.join(', ') : '-';
      } catch {
        document.getElementById(`modal-${key}`).textContent = '-';
      }
    });

    modal.classList.remove('hidden');
  }

  window.showSuperheroModal = showSuperheroModal;

  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
});
