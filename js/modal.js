function openModal(expenseId = null) {
  editingExpenseId = expenseId;
  
  expenseModal.classList.add('is-open');
  expenseModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Update modal title
  const modalTitle = document.getElementById('expenseTitle');
  modalTitle.textContent = editingExpenseId ? 'Edit Expense' : 'Add Expense';
  
  // Update submit button text
  const submitBtn = expenseForm.querySelector('button[type="submit"]');
  submitBtn.textContent = editingExpenseId ? 'Update Expense' : 'Save Expense';
  
  if (editingExpenseId) {
    // Load expense data for editing
    const expense = expenses.find(e => e.id === editingExpenseId);
    if (expense) {
      expenseForm.querySelector('input[name="name"]').value = expense.name;
      expenseForm.querySelector('input[name="place"]').value = expense.place || '';
      expenseForm.querySelector('input[name="amount"]').value = expense.amount;
      expenseForm.querySelector('select[name="category"]').value = expense.category;
      expenseForm.querySelector('input[name="isMonthly"]').checked = expense.isMonthly || false;
      
      // Disable fields that can't be edited
      expenseForm.querySelector('input[name="date"]').value = expense.date;
      expenseForm.querySelector('input[name="date"]').disabled = true;
      expenseForm.querySelector('select[name="method"]').value = expense.method;
      expenseForm.querySelector('select[name="method"]').disabled = true;
      expenseForm.querySelector('input[name="payments"]').value = expense.payments || '';
      expenseForm.querySelector('input[name="payments"]').disabled = true;
      
      handleMethodChange();
    }
  } else {
    // New expense - enable all fields
    expenseForm.querySelector('input[name="date"]').disabled = false;
    expenseForm.querySelector('select[name="method"]').disabled = false;
    expenseForm.querySelector('input[name="payments"]').disabled = false;
    
    // Set today's date as default
    const dateInput = expenseForm.querySelector('input[name="date"]');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  }
}

function closeModal() {
  expenseModal.classList.remove('is-open');
  expenseModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  expenseForm.reset();
  editingExpenseId = null;
  
  // Re-enable all fields
  expenseForm.querySelector('input[name="date"]').disabled = false;
  expenseForm.querySelector('select[name="method"]').disabled = false;
  expenseForm.querySelector('input[name="payments"]').disabled = false;
}

function openProfileModal() {
  const profileModal = document.createElement('div');
  profileModal.className = 'modal is-open';
  profileModal.id = 'profileModal';
  
  profileModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__dialog" style="max-width: 400px;">
      <header class="modal__header">
        <h3>Your Profile</h3>
        <button class="modal__close" id="profileClose">✕</button>
      </header>
      <div class="modal__body">
        <form id="profileForm">
          <div class="form__field" style="margin-bottom: 16px;">
            <label class="form__label" for="userNameInput">First Name</label>
            <input 
              type="text" 
              id="userNameInput" 
              name="userName" 
              value="${userName}" 
              required 
              style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(148,163,184,.35); background: #fbfcfe;"
            />
          </div>
          
          <div class="form__field" style="margin-bottom: 16px;">
            <label class="form__label" for="userFullNameInput">Full Name</label>
            <input 
              type="text" 
              id="userFullNameInput" 
              name="userFullName" 
              value="${userFullName}" 
              required 
              style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(148,163,184,.35); background: #fbfcfe;"
            />
          </div>
          
          <div class="modal__footer">
            <button type="button" class="btn" id="cancelProfile">Cancel</button>
            <button type="submit" class="btn btn--primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(profileModal);
  document.body.style.overflow = 'hidden';
  
  const profileClose = profileModal.querySelector('#profileClose');
  const cancelProfile = profileModal.querySelector('#cancelProfile');
  const profileBackdrop = profileModal.querySelector('.modal__backdrop');
  const profileForm = profileModal.querySelector('#profileForm');
  
  const closeProfile = () => {
    profileModal.remove();
    document.body.style.overflow = '';
  };
  
  profileClose.addEventListener('click', closeProfile);
  cancelProfile.addEventListener('click', closeProfile);
  profileBackdrop.addEventListener('click', closeProfile);
  
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    userName = e.target.userName.value.trim();
    userFullName = e.target.userFullName.value.trim();
    
    // Update UI
    document.querySelector('.topbar__greeting h1').textContent = `Welcome back, ${userName} 👋`;
    document.querySelector('.topbar__greeting p').textContent = userFullName;
    document.querySelector('.topbar__profile').setAttribute('title', userFullName);
    
    // Update avatar initials
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    document.querySelector('.avatar').textContent = initials;
    
    saveData();
    closeProfile();
  });
}

function openSettingsModal() {
  switchView('settings');
  renderSettingsView();
}