// Finance Dashboard - Main JavaScript

// State Management
let expenses = [];
let totalBalance = 12450;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

let categories = [
  { name: 'food', label: 'Food', color: '#bfe3d0' },
  { name: 'transport', label: 'Transport', color: '#a7c7e7' },
  { name: 'entertainment', label: 'Entertainment', color: '#f6c3d3' },
  { name: 'bills', label: 'Bills', color: '#f6ebd9' },
  { name: 'shopping', label: 'Shopping', color: '#e8d5f2' },
  { name: 'other', label: 'Other', color: '#e5e7eb' }
];

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

// Current view state
let currentView = 'overview';
let editingExpenseId = null;
let pieChart = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  updateCategoryOptions();
  updateUI();
  attachEventListeners();
  registerServiceWorker();
});

// Register Service Worker for PWA
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker registration failed', err));
  }
}

// Event Listeners
function attachEventListeners() {
  // Menu toggle for mobile
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

  // Modal open buttons
  addExpenseTop?.addEventListener('click', openModal);
  addExpenseFab?.addEventListener('click', openModal);

  // Modal close buttons
  modalClose?.addEventListener('click', closeModal);
  cancelExpense?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // Form submission
  expenseForm?.addEventListener('submit', handleExpenseSubmit);

  // Payment method change
  methodSelect?.addEventListener('change', handleMethodChange);

  // Settings navigation
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (index === 4) { // Settings button
        openSettingsModal();
      }
    });
  });
}

// Modal Functions
function openModal() {
  expenseModal.classList.add('is-open');
  expenseModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Set today's date as default
  const dateInput = expenseForm.querySelector('input[name="date"]');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

function closeModal() {
  expenseModal.classList.remove('is-open');
  expenseModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  expenseForm.reset();
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
    
    if (expense.method === 'credit' && expense.payments > 1) {
      // For credit with multiple payments, check if current month falls within payment period
      const monthsDiff = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
      
      if (monthsDiff >= 0 && monthsDiff < expense.payments) {
        total += expense.amount / expense.payments;
      }
    } else {
      // For cash/debit or single payment, only count in the purchase month
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        total += expense.amount;
      }
    }
  });
  
  return total;
}

// Calculate expenses by category for current month
function calculateCategoryExpenses() {
  const categoryTotals = {};
  
  // Initialize all categories with 0
  categories.forEach(cat => {
    categoryTotals[cat.name] = 0;
  });
  
  expenses.forEach(expense => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();
    
    if (expense.method === 'credit' && expense.payments > 1) {
      // For credit with multiple payments, check if current month falls within payment period
      const monthsDiff = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
      
      if (monthsDiff >= 0 && monthsDiff < expense.payments) {
        const monthlyAmount = expense.amount / expense.payments;
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + monthlyAmount;
      }
    } else {
      // For cash/debit or single payment, only count in the purchase month
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
      }
    }
  });
  
  return categoryTotals;
}

// Render category chart
function renderCategoryChart() {
  const overview = document.querySelector('.overview');
  const placeholder = overview.querySelector('.overview__placeholder');
  
  // Remove existing chart if any
  const existingChart = document.getElementById('categoryChart');
  if (existingChart) {
    existingChart.remove();
  }
  
  const categoryTotals = calculateCategoryExpenses();
  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  
  if (totalExpenses === 0) {
    return; // Don't show chart if no expenses
  }
  
  // Create chart container
  const chartContainer = document.createElement('div');
  chartContainer.id = 'categoryChart';
  chartContainer.style.marginTop = '24px';
  
  const header = document.createElement('h2');
  header.textContent = 'Expenses by Category';
  header.style.fontSize = '1.05rem';
  header.style.margin = '0 0 12px';
  header.style.color = '#465a72';
  
  chartContainer.appendChild(header);
  
  // Create chart card
  const chartCard = document.createElement('div');
  chartCard.className = 'card';
  chartCard.style.padding = '20px';
  
  // Create bars
  categories.forEach(category => {
    const amount = categoryTotals[category.name] || 0;
    if (amount === 0) return; // Skip categories with no expenses
    
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
  
  chartContainer.appendChild(chartCard);
  
  // Insert before expenses list or at end of overview
  const expensesList = document.getElementById('expensesList');
  if (expensesList) {
    overview.insertBefore(chartContainer, expensesList);
  } else {
    overview.appendChild(chartContainer);
  }
}
function calculateSavingsRate() {
  const monthlyExpenses = calculateMonthlyExpenses();
  // Assuming monthly income based on current balance (simplified)
  const estimatedMonthlyIncome = totalBalance / 6; // Rough estimate
  
  if (estimatedMonthlyIncome === 0) return 0;
  
  const savings = estimatedMonthlyIncome - monthlyExpenses;
  const rate = (savings / estimatedMonthlyIncome) * 100;
  
  return Math.max(0, Math.min(100, rate));
}

// Update UI
function updateUI() {
  // Update stats cards
  document.querySelector('.card--stat:nth-child(1) .card__value').textContent = 
    `${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  
  const monthlyExpenses = calculateMonthlyExpenses();
  document.querySelector('.card--stat:nth-child(2) .card__value').textContent = 
    `${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  
  const savingsRate = calculateSavingsRate();
  document.querySelector('.card--stat:nth-child(3) .card__value').textContent = 
    `${savingsRate.toFixed(0)}%`;
  
  // Render category chart and expenses list
  renderCategoryChart();
  renderExpensesList();
}

function renderExpensesList() {
  const overview = document.querySelector('.overview');
  
  // Remove existing expenses list if any
  const existingList = document.getElementById('expensesList');
  if (existingList) {
    existingList.remove();
  }
  
  // Create expenses section
  const expensesSection = document.createElement('div');
  expensesSection.id = 'expensesList';
  expensesSection.style.marginTop = '24px';
  
  const header = document.createElement('h2');
  header.textContent = 'Recent Expenses';
  header.style.fontSize = '1.05rem';
  header.style.margin = '0 0 12px';
  header.style.color = '#465a72';
  
  expensesSection.appendChild(header);
  
  if (expenses.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'card';
    emptyState.style.textAlign = 'center';
    emptyState.style.padding = '32px';
    emptyState.style.color = 'var(--muted)';
    emptyState.textContent = 'No expenses yet. Click "Add Expense" to get started!';
    expensesSection.appendChild(emptyState);
  } else {
    // Sort expenses by date (most recent first)
    const sortedExpenses = [...expenses].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    sortedExpenses.forEach(expense => {
      const card = createExpenseCard(expense);
      expensesSection.appendChild(card);
    });
  }
  
  overview.appendChild(expensesSection);
}

function createExpenseCard(expense) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.marginBottom = '12px';
  card.style.display = 'grid';
  card.style.gridTemplateColumns = '1fr auto';
  card.style.gap = '12px';
  card.style.alignItems = 'center';
  
  const info = document.createElement('div');
  
  const nameRow = document.createElement('div');
  nameRow.style.display = 'flex';
  nameRow.style.alignItems = 'center';
  nameRow.style.gap = '8px';
  nameRow.style.marginBottom = '4px';
  
  const name = document.createElement('div');
  name.style.fontWeight = '600';
  name.style.fontSize = '1rem';
  name.textContent = expense.name;
  
  const categoryBadge = document.createElement('span');
  categoryBadge.style.fontSize = '0.75rem';
  categoryBadge.style.padding = '2px 8px';
  categoryBadge.style.borderRadius = '6px';
  categoryBadge.style.background = getCategoryColor(expense.category);
  categoryBadge.style.color = '#1f2a44';
  categoryBadge.style.fontWeight = '500';
  const categoryObj = categories.find(cat => cat.name === expense.category);
  categoryBadge.textContent = categoryObj ? categoryObj.label : expense.category;
  
  nameRow.appendChild(name);
  nameRow.appendChild(categoryBadge);
  
  const details = document.createElement('div');
  details.style.color = 'var(--muted)';
  details.style.fontSize = '0.85rem';
  
  let detailsText = `${expense.place ? expense.place + ' • ' : ''}${expense.method}`;
  if (expense.method === 'credit' && expense.payments > 1) {
    detailsText += ` (${expense.payments} payments)`;
  }
  detailsText += ` • ${formatDate(expense.date)}`;
  details.textContent = detailsText;
  
  info.appendChild(nameRow);
  info.appendChild(details);
  
  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.alignItems = 'center';
  actions.style.gap = '12px';
  
  const amount = document.createElement('div');
  amount.style.fontWeight = '600';
  amount.style.fontSize = '1.1rem';
  amount.style.color = '#1f2a44';
  amount.textContent = `$${expense.amount.toFixed(2)}`;
  
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.style.background = 'transparent';
  deleteBtn.style.border = 'none';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.style.fontSize = '1.2rem';
  deleteBtn.style.opacity = '0.6';
  deleteBtn.style.transition = 'opacity 0.15s ease';
  deleteBtn.onmouseover = () => deleteBtn.style.opacity = '1';
  deleteBtn.onmouseout = () => deleteBtn.style.opacity = '0.6';
  deleteBtn.onclick = () => deleteExpense(expense.id);
  deleteBtn.setAttribute('aria-label', 'Delete expense');
  
  actions.appendChild(amount);
  actions.appendChild(deleteBtn);
  
  card.appendChild(info);
  card.appendChild(actions);
  
  return card;
}

function getCategoryColor(categoryName) {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.color : '#e5e7eb';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Settings Modal
function openSettingsModal() {
  const settingsModal = document.createElement('div');
  settingsModal.className = 'modal is-open';
  settingsModal.id = 'settingsModal';
  
  // Build categories HTML
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
  
  settingsModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__dialog" style="max-height: 90vh; overflow-y: auto;">
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
  
  // Event listeners for settings modal
  const settingsClose = settingsModal.querySelector('#settingsClose');
  const cancelSettings = settingsModal.querySelector('#cancelSettings');
  const settingsBackdrop = settingsModal.querySelector('.modal__backdrop');
  const settingsForm = settingsModal.querySelector('#settingsForm');
  const addCategoryBtn = settingsModal.querySelector('#addCategory');
  
  const closeSettings = () => {
    settingsModal.remove();
    document.body.style.overflow = '';
  };
  
  settingsClose.addEventListener('click', closeSettings);
  cancelSettings.addEventListener('click', closeSettings);
  settingsBackdrop.addEventListener('click', closeSettings);
  
  // Add category button
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
    
    // Add event listener to new delete button
    const newDeleteBtn = categoriesList.querySelector(`[data-category-index="${newIndex}"].delete-category`);
    newDeleteBtn.addEventListener('click', function() {
      this.closest('.category-item').remove();
    });
  });
  
  // Delete category buttons
  settingsModal.querySelectorAll('.delete-category').forEach(btn => {
    btn.addEventListener('click', function() {
      if (settingsModal.querySelectorAll('.category-item').length <= 1) {
        alert('You must have at least one category!');
        return;
      }
      this.closest('.category-item').remove();
    });
  });
  
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Update balance
    const newBalance = parseFloat(e.target.totalBalance.value);
    totalBalance = newBalance;
    
    // Update categories
    const newCategories = [];
    const categoryItems = settingsModal.querySelectorAll('.category-item');
    
    categoryItems.forEach((item, index) => {
      const colorInput = item.querySelector('.category-color');
      const labelInput = item.querySelector('.category-label');
      
      if (labelInput.value.trim()) {
        // Create a safe name from the label
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
    
    saveData();
    updateCategoryOptions();
    updateUI();
    closeSettings();
  });
}

// Update category options in expense form
function updateCategoryOptions() {
  const categorySelect = document.querySelector('#expenseForm select[name="category"]');
  if (!categorySelect) return;
  
  categorySelect.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.name;
    option.textContent = cat.label;
    categorySelect.appendChild(option);
  });
}

// Local Storage
function saveData() {
  localStorage.setItem('financeExpenses', JSON.stringify(expenses));
  localStorage.setItem('financeTotalBalance', totalBalance.toString());
  localStorage.setItem('financeCategories', JSON.stringify(categories));
}

function loadData() {
  const savedExpenses = localStorage.getItem('financeExpenses');
  const savedBalance = localStorage.getItem('financeTotalBalance');
  const savedCategories = localStorage.getItem('financeCategories');
  
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
  }
  
  if (savedBalance) {
    totalBalance = parseFloat(savedBalance);
  }
  
  if (savedCategories) {
    categories = JSON.parse(savedCategories);
  }
}