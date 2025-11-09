// Minimal interactivity for layout + form behavior
(function () {
  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  const sidebar = qs('#sidebar');
  const menuToggle = qs('#menuToggle');
  const addTop = qs('#addExpenseTop');
  const addFab = qs('#addExpenseFab');
  const modal = qs('#expenseModal');
  const modalBackdrop = qs('#modalBackdrop');
  const modalClose = qs('#modalClose');
  const cancelBtn = qs('#cancelExpense');
  const form = qs('#expenseForm');
  const method = qs('#method');
  const paymentsField = qs('#paymentsField input');

  // Sidebar toggle (mobile)
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar--open');
    });
    // Close sidebar when clicking a nav item (mobile)
    qsa('.sidebar .nav__item').forEach(btn => btn.addEventListener('click', () => {
      sidebar.classList.remove('sidebar--open');
    }));
  }

  // Modal open/close helpers
  const openModal = () => {
    modal?.classList.add('is-open');
    // focus first input for quick entry
    setTimeout(() => qs('input[name="name"]', modal)?.focus(), 0);
  };
  const closeModal = () => {
    modal?.classList.remove('is-open');
  };

  addTop?.addEventListener('click', openModal);
  addFab?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // Payment method -> payments required if credit
  const updatePaymentsRequirement = () => {
    const isCredit = method?.value === 'credit';
    if (!paymentsField) return;
    paymentsField.required = !!isCredit;
    paymentsField.disabled = !isCredit;
    if (!isCredit) paymentsField.value = '';
  };
  method?.addEventListener('change', updatePaymentsRequirement);
  updatePaymentsRequirement();

  // Placeholder form submit (no persistence yet)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    // Basic guard: if credit ensure payments >=1
    if (data.method === 'credit') {
      const count = Number(data.payments || 0);
      if (!count || count < 1) {
        paymentsField?.focus();
        return;
      }
    }
    // For now, just log and reset
    console.log('Expense saved (demo):', data);
    form.reset();
    updatePaymentsRequirement();
    closeModal();
  });
})();
