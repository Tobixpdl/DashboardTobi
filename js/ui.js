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
        <span style="font-weight: 500; padding-right:5px">${payer.name}:</span>
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
        <span style="font-weight: 500; padding-right:5px">${payer.name}:</span>
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

function updateProfileUI() {
  document.querySelector('.topbar__greeting h1').textContent = `Welcome back, ${userName} 👋`;
  document.querySelector('.topbar__greeting p').textContent = userFullName;
  document.querySelector('.topbar__profile').setAttribute('title', userFullName);
  
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  document.querySelector('.avatar').textContent = initials;
}

function switchView(viewName) {
  currentView = viewName;
  
  // Update nav items (sidebar)
  document.querySelectorAll('.nav__item').forEach(item => {
    item.classList.remove('is-active');
    if (item.dataset.view === viewName) {
      item.classList.add('is-active');
    }
  });
  
  // Update bottom nav items (mobile)
  document.querySelectorAll('.bottom-nav__item').forEach(item => {
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
    
    // Hide/show stats section based on view
    const statsSection = document.querySelector('.stats');
    const chartSection = document.getElementById('overviewChartView');
    
    // ESTE ES EL CAMBIO CLAVE: agregamos 'settings' a la condición
    if (viewName === 'expenses' || viewName === 'settings') {
      statsSection.style.display = 'none';
      if (chartSection) chartSection.style.display = 'none';
      if (viewName === 'expenses') {
        renderExpensesList();
      }
    } else {
      statsSection.style.display = 'grid';
      if (chartSection) chartSection.style.display = 'block';
      if (viewName === 'overview') {
        renderCategoryChart();
      }
    }
  }

  // Close sidebar on mobile
  sidebar.classList.remove('sidebar--open');
}