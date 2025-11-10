// State Management
let expenses = [];
let totalBalance = 12450;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let payers = [
  { id: 'tobi', name: 'Tobi' },
  { id: 'mica', name: 'Mica' }
];
let categories = [
  { name: 'food', label: 'Food', color: '#bfe3d0' },
  { name: 'transport', label: 'Transport', color: '#a7c7e7' },
  { name: 'entertainment', label: 'Entertainment', color: '#f6c3d3' },
  { name: 'bills', label: 'Bills', color: '#f6ebd9' },
  { name: 'shopping', label: 'Shopping', color: '#e8d5f2' },
  { name: 'other', label: 'Other', color: '#e5e7eb' }
];

let currentView = 'overview';
let editingExpenseId = null;
let filters = {
  month: 'all',
  category: 'all',
  method: 'all'
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const expenseModal = document.getElementById('expenseModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const addExpenseTop = document.getElementById('addExpenseTop');
const addExpenseFab = document.getElementById('addExpenseFab');
const cancelExpense = document.getElementById('cancelExpense');
const expenseForm = document.getElementById('expenseForm');
const methodSelect = document.getElementById('method');
const paymentsField = document.getElementById('paymentsField');
const categorySelect = document.getElementById('categorySelect');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  updateCategoryOptions();
  updateWhoPaysOptions();  // ← AGREGAR ESTA LÍNEA
  updateMonthFilter();
  updateCategoryFilter();
  updateUI();
  attachEventListeners();
}); 

// Event Listeners
function attachEventListeners() {
  // Menu toggle
  menuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--open');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('sidebar--open') && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('sidebar--open');
    }
  });

  // Navigation
  document.querySelectorAll('.nav__item').forEach(item => {
    item.addEventListener('click', (e) => {
      const view = item.dataset.view;
      if (view === 'settings') {
        openSettingsModal();
      } else {
        switchView(view);
      }
    });
  });

  // Modal
  addExpenseTop?.addEventListener('click', openModal);
  addExpenseFab?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  cancelExpense?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // Form
  expenseForm?.addEventListener('submit', handleExpenseSubmit);
  methodSelect?.addEventListener('change', handleMethodChange);

  // Filters
  document.getElementById('filterMonth')?.addEventListener('change', (e) => {
    filters.month = e.target.value;
    renderExpensesList();
  });

  document.getElementById('filterCategory')?.addEventListener('change', (e) => {
    filters.category = e.target.value;
    renderExpensesList();
  });

  document.getElementById('filterMethod')?.addEventListener('change', (e) => {
    filters.method = e.target.value;
    renderExpensesList();
  });
}

// View Management
function switchView(viewName) {
  currentView = viewName;
  
  // Update nav items
  document.querySelectorAll('.nav__item').forEach(item => {
    item.classList.remove('is-active');
    if (item.dataset.view === viewName) {
      item.classList.add('is-active');
    }
  });

  // Update views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('is-active');
  });
  
  const activeView = document.getElementById(`${viewName}View`);
  if (activeView) {
    activeView.classList.add('is-active');
    
    if (viewName === 'expenses') {
      renderExpensesList();
    }
  }

  // Close sidebar on mobile
  sidebar.classList.remove('sidebar--open');
}

// Modal Functions
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

function handleMethodChange() {
  const paymentsInput = paymentsField.querySelector('input');
  if (methodSelect.value === 'credit') {
    paymentsField.style.opacity = '1';
    paymentsInput.required = true;
  } else {
    paymentsField.style.opacity = '0.5';
    paymentsInput.required = false;
    paymentsInput.value = '';
  }
}

// Expense Management
function handleExpenseSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(expenseForm);
  const expense = {
    id: Date.now(),
    name: formData.get('name'),
    place: formData.get('place') || '',
    amount: parseFloat(formData.get('amount')),
    payments: parseInt(formData.get('payments')) || 1,
    date: formData.get('date'),
    method: formData.get('method'),
    category: formData.get('category'),
    whoPays: formData.get('whoPays'),  // ← AGREGAR ESTA LÍNEA
    isMonthly: formData.get('isMonthly') === 'on',
    createdAt: new Date().toISOString()
  };

  expenses.push(expense);
  saveData();
  updateUI();
  closeModal();
}

function deleteExpense(id) {
  if (confirm('Are you sure you want to delete this expense?')) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveData();
    updateUI();
  }
}

// Calculate monthly expenses
function calculateMonthlyExpenses() {
  let total = 0;
  
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    
    // Monthly recurring payments
    if (expense.isMonthly) {
      const startDate = new Date(expenseYear, expenseMonth, 1);
      const currentDate = new Date(currentYear, currentMonth, 1);
      
      // Only include if the expense started before or during current month
      if (startDate <= currentDate) {
        total += expense.amount;
      }
    }
    // Credit with multiple payments
    else if (expense.method === 'credit' && expense.payments > 1) {
      const monthsDiff = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
      
      if (monthsDiff >= 0 && monthsDiff < expense.payments) {
        total += expense.amount / expense.payments;
      }
    }
    // One-time payments
    else {
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        total += expense.amount;
      }
    }
  });
  
  return total;
}

// Calculate expenses by category
function calculateCategoryExpenses() {
  const categoryTotals = {};
  
  categories.forEach(cat => {
    categoryTotals[cat.name] = 0;
  });
  
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    
    // Monthly recurring
    if (expense.isMonthly) {
      const startDate = new Date(expense.date);
      const checkDate = new Date(currentYear, currentMonth, 1);
      
      if (startDate <= checkDate) {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
      }
    }
    // Credit with payments
    else if (expense.method === 'credit' && expense.payments > 1) {
      const monthsDiff = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
      
      if (monthsDiff >= 0 && monthsDiff < expense.payments) {
        const monthlyAmount = expense.amount / expense.payments;
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + monthlyAmount;
      }
    }
    // One-time
    else {
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
      }
    }
  });
  
  return categoryTotals;
}

// POR esta nueva versión:
function calculateSavingsRate() {
  const expensesByPerson = calculateExpensesByPerson();
  const tobiExpenses = expensesByPerson['tobi'] || 0;

  if (totalBalance === 0) return 0;

  const savings = totalBalance - tobiExpenses;
  const rate = (savings / totalBalance) * 100;

  return rate.toFixed(1); // devuelve porcentaje con un decimal
}


function calculateExpensesByPerson() {
  const personTotals = {};
  
  // Initialize all payers with 0
  payers.forEach(payer => {
    personTotals[payer.id] = 0;
  });
  
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    const whoPays = expense.whoPays || 'tobi'; // Default to tobi if not set
    
    // Monthly recurring
    if (expense.isMonthly) {
      const startDate = new Date(expense.date);
      const checkDate = new Date(currentYear, currentMonth, 1);
      
      if (startDate <= checkDate) {
        personTotals[whoPays] = (personTotals[whoPays] || 0) + expense.amount;
      }
    }
    // Credit with payments
    else if (expense.method === 'credit' && expense.payments > 1) {
      const monthsDiff = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
      
      if (monthsDiff >= 0 && monthsDiff < expense.payments) {
        const monthlyAmount = expense.amount / expense.payments;
        personTotals[whoPays] = (personTotals[whoPays] || 0) + monthlyAmount;
      }
    }
    // One-time
    else {
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        personTotals[whoPays] = (personTotals[whoPays] || 0) + expense.amount;
      }
    }
  });
  
  return personTotals;
}

// AGREGAR estas dos nuevas funciones después de calculateExpensesByPerson():

function calculateCreditExpensesByPerson() {
  const personTotals = {};
  
  payers.forEach(payer => {
    personTotals[payer.id] = 0;
  });
  
  expenses.forEach(expense => {
    if (expense.method !== 'credit') return; // Solo crédito
    
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    const whoPays = expense.whoPays || 'tobi';
    
    if (expense.isMonthly) {
      const startDate = new Date(expense.date);
      const checkDate = new Date(currentYear, currentMonth, 1);
      
      if (startDate <= checkDate) {
        personTotals[whoPays] = (personTotals[whoPays] || 0) + expense.amount;
      }
    }
    else if (expense.payments > 1) {
      const monthsDiff = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
      
      if (monthsDiff >= 0 && monthsDiff < expense.payments) {
        const monthlyAmount = expense.amount / expense.payments;
        personTotals[whoPays] = (personTotals[whoPays] || 0) + monthlyAmount;
      }
    }
    else {
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        personTotals[whoPays] = (personTotals[whoPays] || 0) + expense.amount;
      }
    }
  });
  
  return personTotals;
}

function calculateCashDebitExpensesByPerson() {
  const personTotals = {};
  
  payers.forEach(payer => {
    personTotals[payer.id] = 0;
  });
  
  expenses.forEach(expense => {
    if (expense.method === 'credit') return; // Solo cash y debit
    
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    const whoPays = expense.whoPays || 'tobi';
    
    if (expense.isMonthly) {
      const startDate = new Date(expense.date);
      const checkDate = new Date(currentYear, currentMonth, 1);
      
      if (startDate <= checkDate) {
        personTotals[whoPays] = (personTotals[whoPays] || 0) + expense.amount;
      }
    }
    else {
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        personTotals[whoPays] = (personTotals[whoPays] || 0) + expense.amount;
      }
    }
  });
  
  return personTotals;
}

// UI Updates
// REEMPLAZAR toda la función updateUI() por esta:
function updateUI() {
  // Update balance
  document.getElementById('totalBalanceValue').textContent = 
    `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  
  // Calculate credit expenses
  const creditExpenses = calculateCreditExpensesByPerson();
  const totalCredit = Object.values(creditExpenses).reduce((sum, val) => sum + val, 0);
  document.getElementById('creditExpensesValue').textContent = 
    `$${totalCredit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  
  const creditByPersonContainer = document.getElementById('creditByPerson');
  if (creditByPersonContainer) {
    creditByPersonContainer.innerHTML = '';
    payers.forEach(payer => {
      const amount = creditExpenses[payer.id] || 0;
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.justifyContent = 'space-between';
      div.innerHTML = `
        <span style="font-weight: 500;">${payer.name}:</span>
        <span style="font-weight: 600;">$${amount.toFixed(0)}</span>
      `;
      creditByPersonContainer.appendChild(div);
    });
  }
  
  // Calculate cash/debit expenses
  const cashDebitExpenses = calculateCashDebitExpensesByPerson();
  const totalCashDebit = Object.values(cashDebitExpenses).reduce((sum, val) => sum + val, 0);
  document.getElementById('cashDebitExpensesValue').textContent = 
    `$${totalCashDebit.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  
  const cashDebitByPersonContainer = document.getElementById('cashDebitByPerson');
  if (cashDebitByPersonContainer) {
    cashDebitByPersonContainer.innerHTML = '';
    payers.forEach(payer => {
      const amount = cashDebitExpenses[payer.id] || 0;
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.justifyContent = 'space-between';
      div.innerHTML = `
        <span style="font-weight: 500;">${payer.name}:</span>
        <span style="font-weight: 600;">$${amount.toFixed(0)}</span>
      `;
      cashDebitByPersonContainer.appendChild(div);
    });
  }
  
  // Update savings rate
  const savingsRate = calculateSavingsRate();
  document.getElementById('savingsRateValue').textContent = `${savingsRate}%`;
  
  renderCategoryChart();
  if (currentView === 'expenses') {
    renderExpensesList();
  }
}

// Render Category Chart
function renderCategoryChart() {
  const container = document.getElementById('categoryChartContainer');
  container.innerHTML = '';
  
  const categoryTotals = calculateCategoryExpenses();
  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  
  if (totalExpenses === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📊</div>
        <p>No expenses this month. Add your first expense to see the breakdown!</p>
      </div>
    `;
    return;
  }
  
  const chartSection = document.createElement('div');
  chartSection.style.marginTop = '8px';
  
  const header = document.createElement('h2');
  header.textContent = 'Expenses by Category';
  header.style.fontSize = '1.05rem';
  header.style.margin = '0 0 12px';
  header.style.color = '#465a72';
  
  chartSection.appendChild(header);
  
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.style.padding = '20px';
  
  categories.forEach(category => {
    const amount = categoryTotals[category.name] || 0;
    if (amount === 0) return;
    
    const percentage = (amount / totalExpenses) * 100;
    
    const barContainer = document.createElement('div');
    barContainer.style.marginBottom = '16px';
    
    const labelRow = document.createElement('div');
    labelRow.style.display = 'flex';
    labelRow.style.justifyContent = 'space-between';
    labelRow.style.marginBottom = '6px';
    labelRow.style.fontSize = '0.9rem';
    
    const label = document.createElement('span');
    label.style.fontWeight = '500';
    label.style.color = '#334155';
    label.textContent = category.label;
    
    const amountLabel = document.createElement('span');
    amountLabel.style.fontWeight = '600';
    amountLabel.style.color = '#1f2a44';
    amountLabel.textContent = `${amount.toFixed(2)} (${percentage.toFixed(1)}%)`;
    
    labelRow.appendChild(label);
    labelRow.appendChild(amountLabel);
    
    const barTrack = document.createElement('div');
    barTrack.style.width = '100%';
    barTrack.style.height = '24px';
    barTrack.style.background = '#f0f4f8';
    barTrack.style.borderRadius = '12px';
    barTrack.style.overflow = 'hidden';
    barTrack.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';
    
    const barFill = document.createElement('div');
    barFill.style.width = `${percentage}%`;
    barFill.style.height = '100%';
    barFill.style.background = category.color;
    barFill.style.borderRadius = '12px';
    barFill.style.transition = 'width 0.5s ease';
    barFill.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    
    barTrack.appendChild(barFill);
    barContainer.appendChild(labelRow);
    barContainer.appendChild(barTrack);
    chartCard.appendChild(barContainer);
  });
  
  chartSection.appendChild(chartCard);
  container.appendChild(chartSection);
}

// Render Expenses List with Filters
function renderExpensesList() {
  const container = document.getElementById('expensesList');
  container.innerHTML = '';
  
  // Filter expenses
  let filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    
    // Month filter
    if (filters.month !== 'all') {
      const [filterYear, filterMonth] = filters.month.split('-').map(Number);
      if (expenseMonth !== filterMonth || expenseYear !== filterYear) {
        return false;
      }
    }
    
    // Category filter
    if (filters.category !== 'all' && expense.category !== filters.category) {
      return false;
    }
    
    // Method filter
    if (filters.method !== 'all' && expense.method !== filters.method) {
      return false;
    }
    
    return true;
  });
  
  if (filteredExpenses.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <p>No expenses found with the selected filters.</p>
      </div>
    `;
    return;
  }
  
  // Sort by date (most recent first)
  filteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  filteredExpenses.forEach(expense => {
    const card = createExpenseCard(expense);
    container.appendChild(card);
  });
}

function createExpenseCard(expense) {
  const card = document.createElement('div');
  card.className = 'expense-card';
  
  const info = document.createElement('div');
  info.className = 'expense-info';
  
  const header = document.createElement('div');
  header.className = 'expense-header';
  
  const name = document.createElement('div');
  name.className = 'expense-name';
  name.textContent = expense.name;
  
  const categoryBadge = document.createElement('span');
  categoryBadge.className = 'expense-badge';
  const categoryObj = categories.find(cat => cat.name === expense.category);
  categoryBadge.style.background = categoryObj ? categoryObj.color : '#e5e7eb';
  categoryBadge.textContent = categoryObj ? categoryObj.label : expense.category;
  
  header.appendChild(name);
  header.appendChild(categoryBadge);
  
  // Add monthly badge if applicable
  if (expense.isMonthly) {
    const monthlyBadge = document.createElement('span');
    monthlyBadge.className = 'expense-badge';
    monthlyBadge.style.background = '#fef3c7';
    monthlyBadge.textContent = '🔄 Monthly';
    header.appendChild(monthlyBadge);
  }
  
  const details = document.createElement('div');
  details.className = 'expense-details';
  
  let detailsText = '';
  if (expense.place) detailsText += expense.place + ' • ';
  detailsText += expense.method;
  if (expense.method === 'credit' && expense.payments > 1) {
    detailsText += ` (${expense.payments} payments)`;
  }
  detailsText += ' • ' + formatDate(expense.date);
  
  details.textContent = detailsText;
  
  info.appendChild(header);
  info.appendChild(details);
  
  const actions = document.createElement('div');
  actions.className = 'expense-actions';
  
  const amount = document.createElement('div');
  amount.className = 'expense-amount';
  amount.textContent = `${expense.amount.toFixed(2)}`;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '🗑️';
  deleteBtn.onclick = () => deleteExpense(expense.id);
  deleteBtn.setAttribute('aria-label', 'Delete expense');
  
  actions.appendChild(amount);
  actions.appendChild(deleteBtn);
  
  card.appendChild(info);
  card.appendChild(actions);
  
  return card;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Update filter dropdowns
function updateMonthFilter() {
  const select = document.getElementById('filterMonth');
  if (!select) return;
  
  const months = new Set();
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    months.add(monthKey);
  });
  
  const sortedMonths = Array.from(months).sort().reverse();
  
  select.innerHTML = '<option value="all">All Months</option>';
  sortedMonths.forEach(monthKey => {
    const [year, month] = monthKey.split('-').map(Number);
    const date = new Date(year, month, 1);
    const option = document.createElement('option');
    option.value = monthKey;
    option.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    select.appendChild(option);
  });
}

function updateCategoryFilter() {
  const select = document.getElementById('filterCategory');
  if (!select) return;
  
  select.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.name;
    option.textContent = cat.label;
    select.appendChild(option);
  });
}

function updateCategoryOptions() {
  categorySelect.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.name;
    option.textContent = cat.label;
    categorySelect.appendChild(option);
  });
}

function updateWhoPaysOptions() {
  const whoPaysSelect = document.getElementById('whoPaysSelect');
  if (!whoPaysSelect) return;
  
  whoPaysSelect.innerHTML = '';
  payers.forEach(payer => {
    const option = document.createElement('option');
    option.value = payer.id;
    option.textContent = payer.name;
    whoPaysSelect.appendChild(option);
  });
}

// Settings Modal
// Settings Modal
function openSettingsModal() {
  const settingsModal = document.createElement('div');
  settingsModal.className = 'modal is-open';
  settingsModal.id = 'settingsModal';
  
  // Generate categories HTML
  let categoriesHTML = '';
  categories.forEach((cat, index) => {
    categoriesHTML += `
      <div class="category-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 8px;">
        <input 
          type="color" 
          value="${cat.color}" 
          data-category-index="${index}"
          class="category-color"
          style="width: 40px; height: 40px; border: none; border-radius: 6px; cursor: pointer;"
        />
        <input 
          type="text" 
          value="${cat.label}" 
          data-category-index="${index}"
          class="category-label"
          style="flex: 1; padding: 8px 12px; border: 1px solid rgba(148,163,184,.35); border-radius: 8px; background: white;"
        />
        <button 
          type="button" 
          class="delete-category"
          data-category-index="${index}"
          style="background: #fee; color: #c00; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 500;"
        >Delete</button>
      </div>
    `;
  });
  
  // Generate payers HTML
  let payersHTML = '';
  payers.forEach((payer, index) => {
    payersHTML += `
      <div class="payer-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 8px;">
        <input 
          type="text" 
          value="${payer.name}" 
          data-payer-index="${index}"
          class="payer-name"
          style="flex: 1; padding: 8px 12px; border: 1px solid rgba(148,163,184,.35); border-radius: 8px; background: white;"
        />
        <button 
          type="button" 
          class="delete-payer"
          data-payer-index="${index}"
          style="background: #fee; color: #c00; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 500;"
        >Delete</button>
      </div>
    `;
  });
  
  settingsModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__dialog">
      <header class="modal__header">
        <h3>Settings</h3>
        <button class="modal__close" id="settingsClose">✕</button>
      </header>
      <div class="modal__body">
        <form id="settingsForm">
          <div class="form__field" style="margin-bottom: 24px;">
            <label class="form__label" for="totalBalanceInput">Total Balance ($)</label>
            <input 
              type="number" 
              id="totalBalanceInput" 
              name="totalBalance" 
              value="${totalBalance}" 
              step="0.01" 
              required 
              style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(148,163,184,.35); background: #fbfcfe;"
            />
          </div>
          
          <div class="form__field">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <label class="form__label">Categories</label>
              <button 
                type="button" 
                id="addCategory"
                class="btn btn--primary"
                style="padding: 6px 12px; font-size: 0.85rem;"
              >+ Add Category</button>
            </div>
            <div id="categoriesList">
              ${categoriesHTML}
            </div>
          </div>
          
          <div class="form__field" style="margin-top: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <label class="form__label">Who Pays</label>
              <button 
                type="button" 
                id="addPayer"
                class="btn btn--primary"
                style="padding: 6px 12px; font-size: 0.85rem;"
              >+ Add Person</button>
            </div>
            <div id="payersList">
              ${payersHTML}
            </div>
          </div>
          
          <div class="modal__footer">
            <button type="button" class="btn" id="cancelSettings">Cancel</button>
            <button type="submit" class="btn btn--primary">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(settingsModal);
  document.body.style.overflow = 'hidden';
  
  const settingsClose = settingsModal.querySelector('#settingsClose');
  const cancelSettings = settingsModal.querySelector('#cancelSettings');
  const settingsBackdrop = settingsModal.querySelector('.modal__backdrop');
  const settingsForm = settingsModal.querySelector('#settingsForm');
  const addCategoryBtn = settingsModal.querySelector('#addCategory');
  const addPayerBtn = settingsModal.querySelector('#addPayer');
  
  const closeSettings = () => {
    settingsModal.remove();
    document.body.style.overflow = '';
  };
  
  settingsClose.addEventListener('click', closeSettings);
  cancelSettings.addEventListener('click', closeSettings);
  settingsBackdrop.addEventListener('click', closeSettings);
  
  // Add Category Handler
  addCategoryBtn.addEventListener('click', () => {
    const categoriesList = document.getElementById('categoriesList');
    const newIndex = categories.length;
    
    const newCategoryHTML = `
      <div class="category-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 8px;">
        <input 
          type="color" 
          value="#e5e7eb" 
          data-category-index="${newIndex}"
          class="category-color"
          style="width: 40px; height: 40px; border: none; border-radius: 6px; cursor: pointer;"
        />
        <input 
          type="text" 
          value="New Category" 
          data-category-index="${newIndex}"
          class="category-label"
          placeholder="Category name"
          style="flex: 1; padding: 8px 12px; border: 1px solid rgba(148,163,184,.35); border-radius: 8px; background: white;"
        />
        <button 
          type="button" 
          class="delete-category"
          data-category-index="${newIndex}"
          style="background: #fee; color: #c00; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 500;"
        >Delete</button>
      </div>
    `;
    
    categoriesList.insertAdjacentHTML('beforeend', newCategoryHTML);
    
    const newDeleteBtn = categoriesList.querySelector(`[data-category-index="${newIndex}"].delete-category`);
    newDeleteBtn.addEventListener('click', function() {
      this.closest('.category-item').remove();
    });
  });
  
  // Add Payer Handler
  addPayerBtn.addEventListener('click', () => {
    const payersList = document.getElementById('payersList');
    const newIndex = payers.length;
    
    const newPayerHTML = `
      <div class="payer-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 8px;">
        <input 
          type="text" 
          value="New Person" 
          data-payer-index="${newIndex}"
          class="payer-name"
          placeholder="Person name"
          style="flex: 1; padding: 8px 12px; border: 1px solid rgba(148,163,184,.35); border-radius: 8px; background: white;"
        />
        <button 
          type="button" 
          class="delete-payer"
          data-payer-index="${newIndex}"
          style="background: #fee; color: #c00; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: 500;"
        >Delete</button>
      </div>
    `;
    
    payersList.insertAdjacentHTML('beforeend', newPayerHTML);
    
    const newDeleteBtn = payersList.querySelector(`[data-payer-index="${newIndex}"].delete-payer`);
    newDeleteBtn.addEventListener('click', function() {
      this.closest('.payer-item').remove();
    });
  });
  
  // Delete Category Handlers
  settingsModal.querySelectorAll('.delete-category').forEach(btn => {
    btn.addEventListener('click', function() {
      if (settingsModal.querySelectorAll('.category-item').length <= 1) {
        alert('You must have at least one category!');
        return;
      }
      this.closest('.category-item').remove();
    });
  });
  
  // Delete Payer Handlers
  settingsModal.querySelectorAll('.delete-payer').forEach(btn => {
    btn.addEventListener('click', function() {
      if (settingsModal.querySelectorAll('.payer-item').length <= 1) {
        alert('You must have at least one person!');
        return;
      }
      this.closest('.payer-item').remove();
    });
  });
  
  // Form Submit Handler
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newBalance = parseFloat(e.target.totalBalance.value);
    totalBalance = newBalance;
    
    // Save Categories
    const newCategories = [];
    const categoryItems = settingsModal.querySelectorAll('.category-item');
    
    categoryItems.forEach((item, index) => {
      const colorInput = item.querySelector('.category-color');
      const labelInput = item.querySelector('.category-label');
      
      if (labelInput.value.trim()) {
        const name = labelInput.value.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        newCategories.push({
          name: name,
          label: labelInput.value.trim(),
          color: colorInput.value
        });
      }
    });
    
    if (newCategories.length === 0) {
      alert('You must have at least one category!');
      return;
    }
    
    categories = newCategories;
    
    // Save Payers
    const newPayers = [];
    const payerItems = settingsModal.querySelectorAll('.payer-item');
    
    payerItems.forEach((item, index) => {
      const nameInput = item.querySelector('.payer-name');
      
      if (nameInput.value.trim()) {
        const id = nameInput.value.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        newPayers.push({
          id: id,
          name: nameInput.value.trim()
        });
      }
    });
    
    if (newPayers.length === 0) {
      alert('You must have at least one person!');
      return;
    }
    
    payers = newPayers;
    
    saveData();
    updateCategoryOptions();
    updateWhoPaysOptions();
    updateCategoryFilter();
    updateUI();
    closeSettings();
  });
}
// Local Storage
function saveData() {
  localStorage.setItem('financeExpenses', JSON.stringify(expenses));
  localStorage.setItem('financeTotalBalance', totalBalance.toString());
  localStorage.setItem('financeCategories', JSON.stringify(categories));
  localStorage.setItem('financePayers', JSON.stringify(payers));  // ← AGREGAR ESTA LÍNEA
}

function loadData() {
  const savedExpenses = localStorage.getItem('financeExpenses');
  const savedBalance = localStorage.getItem('financeTotalBalance');
  const savedCategories = localStorage.getItem('financeCategories');
  const savedPayers = localStorage.getItem('financePayers');  // ← AGREGAR
  
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
  }
  
  if (savedBalance) {
    totalBalance = parseFloat(savedBalance);
  }
  
  if (savedCategories) {
    categories = JSON.parse(savedCategories);
  }
  
  // ← AGREGAR ESTE BLOQUE
  if (savedPayers) {
    payers = JSON.parse(savedPayers);
  }
}