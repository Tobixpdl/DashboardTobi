// Translations
let currentLanguage = 'en';

const translations = {
  en: {
    // Topbar
    welcomeBack: 'Welcome back',
    addExpense: 'Add Expense',
    
    // Stats
    totalBalance: 'Total Balance',
    savingsRate: 'Savings Rate',
    creditExpenses: 'Credit Expenses',
    cashDebitExpenses: 'Cash/Debit Expenses',
    
    // Navigation
    overview: 'Overview',
    expenses: 'Expenses',
    settings: 'Settings',
    
    // Charts
    expensesDistribution: 'Expenses Distribution',
    expensesByCategory: 'Expenses by Category',
    noData: 'No data to display',
    noExpensesMonth: 'No expenses this month. Add your first expense to see the breakdown!',
    
    // Expenses View
    month: 'Month',
    allMonths: 'All Months',
    category: 'Category',
    allCategories: 'All Categories',
    paymentMethod: 'Payment Method',
    allMethods: 'All Methods',
    cash: 'Cash',
    debit: 'Debit',
    credit: 'Credit',
    noExpensesFound: 'No expenses found with the selected filters.',
    monthly: 'Monthly',
    payments: 'payments',
    
    // Modal
    addExpenseTitle: 'Add Expense',
    editExpenseTitle: 'Edit Expense',
    name: 'Name',
    namePlaceholder: 'e.g., Groceries',
    place: 'Enterprise / Place',
    optional: 'optional',
    placePlaceholder: 'e.g., Local Market',
    amount: 'Amount',
    amountPlaceholder: 'e.g., 50.00',
    paymentsLabel: 'Payments',
    paymentsHint: 'required if credit',
    paymentsPlaceholder: 'e.g., 5',
    date: 'Date',
    whoPays: 'Who Pays',
    monthlyRecurring: 'Monthly recurring payment',
    cancel: 'Cancel',
    saveExpense: 'Save Expense',
    updateExpense: 'Update Expense',
    
    // Settings
    settingsTitle: 'Settings',
    totalBalanceLabel: 'Total Balance ($)',
    saveBalance: 'Save Balance',
    dataManagement: 'Data Management',
    exportData: '📥 Export Data',
    importData: '📤 Import Data',
    dataManagementHint: 'Export your data to backup or transfer to another device. Import to restore.',
    categories: 'Categories',
    addCategory: '+ Add Category',
    whoPaysLabel: 'Who Pays',
    addPerson: '+ Add Person',
    delete: 'Delete',
    language: 'Language / Idioma',
    
    // Alerts
    expenseAdded: 'Expense Added!',
    expenseSaved: 'Your expense was saved successfully',
    areYouSure: 'Are you sure?',
    cannotRevert: "You won't be able to revert this!",
    yesDelete: 'Yes, delete it!',
    deleted: 'Deleted!',
    expenseDeleted: 'Your expense has been deleted.',
    balanceUpdated: 'Balance Updated!',
    cannotDelete: 'Cannot Delete',
    oneCategoryRequired: 'You must have at least one category!',
    onePersonRequired: 'You must have at least one person!',
    deleteCategory: 'Delete Category?',
    deletePerson: 'Delete Person?',
    categoryInUse: 'because there are expenses using this category.',
    personInUse: 'because there are expenses assigned to this person.',
    exportSuccessful: 'Export Successful!',
    dataDownloaded: 'Your data has been downloaded',
    importSuccessful: 'Import Successful!',
    importedExpenses: 'Successfully imported',
    importFailed: 'Import Failed',
    checkFileFormat: 'Error importing data. Please check the file format.',
    
    // Profile
    yourProfile: 'Your Profile',
    firstName: 'First Name',
    fullName: 'Full Name',
    save: 'Save',
    
    // Category names
    food: 'Food',
    transport: 'Transport',
    entertainment: 'Entertainment',
    bills: 'Bills',
    shopping: 'Shopping',
    other: 'Other'
  },
  es: {
    // Topbar
    welcomeBack: 'Bienvenido',
    addExpense: 'Agregar Gasto',
    
    // Stats
    totalBalance: 'Balance Total',
    savingsRate: 'Tasa de Ahorro',
    creditExpenses: 'Gastos en Crédito',
    cashDebitExpenses: 'Gastos en Efectivo/Débito',
    
    // Navigation
    overview: 'Resumen',
    expenses: 'Gastos',
    settings: 'Configuración',
    
    // Charts
    expensesDistribution: 'Distribución de Gastos',
    expensesByCategory: 'Gastos por Categoría',
    noData: 'No hay datos para mostrar',
    noExpensesMonth: 'No hay gastos este mes. ¡Agrega tu primer gasto para ver el desglose!',
    
    // Expenses View
    month: 'Mes',
    allMonths: 'Todos los Meses',
    category: 'Categoría',
    allCategories: 'Todas las Categorías',
    paymentMethod: 'Método de Pago',
    allMethods: 'Todos los Métodos',
    cash: 'Efectivo',
    debit: 'Débito',
    credit: 'Crédito',
    noExpensesFound: 'No se encontraron gastos con los filtros seleccionados.',
    monthly: 'Mensual',
    payments: 'cuotas',
    
    // Modal
    addExpenseTitle: 'Agregar Gasto',
    editExpenseTitle: 'Editar Gasto',
    name: 'Nombre',
    namePlaceholder: 'ej., Supermercado',
    place: 'Empresa / Lugar',
    optional: 'opcional',
    placePlaceholder: 'ej., Mercado Local',
    amount: 'Monto',
    amountPlaceholder: 'ej., 50.00',
    paymentsLabel: 'Cuotas',
    paymentsHint: 'requerido si es crédito',
    paymentsPlaceholder: 'ej., 5',
    date: 'Fecha',
    whoPays: 'Quién Paga',
    monthlyRecurring: 'Pago recurrente mensual',
    cancel: 'Cancelar',
    saveExpense: 'Guardar Gasto',
    updateExpense: 'Actualizar Gasto',
    
    // Settings
    settingsTitle: 'Configuración',
    totalBalanceLabel: 'Balance Total ($)',
    saveBalance: 'Guardar Balance',
    dataManagement: 'Gestión de Datos',
    exportData: '📥 Exportar Datos',
    importData: '📤 Importar Datos',
    dataManagementHint: 'Exporta tus datos para respaldar o transferir a otro dispositivo. Importa para restaurar.',
    categories: 'Categorías',
    addCategory: '+ Agregar Categoría',
    whoPaysLabel: 'Quién Paga',
    addPerson: '+ Agregar Persona',
    delete: 'Eliminar',
    language: 'Language / Idioma',
    
    // Alerts
    expenseAdded: '¡Gasto Agregado!',
    expenseSaved: 'Tu gasto fue guardado exitosamente',
    areYouSure: '¿Estás seguro?',
    cannotRevert: '¡No podrás revertir esto!',
    yesDelete: 'Sí, eliminarlo',
    deleted: '¡Eliminado!',
    expenseDeleted: 'Tu gasto ha sido eliminado.',
    balanceUpdated: '¡Balance Actualizado!',
    cannotDelete: 'No se Puede Eliminar',
    oneCategoryRequired: '¡Debes tener al menos una categoría!',
    onePersonRequired: '¡Debes tener al menos una persona!',
    deleteCategory: '¿Eliminar Categoría?',
    deletePerson: '¿Eliminar Persona?',
    categoryInUse: 'porque hay gastos usando esta categoría.',
    personInUse: 'porque hay gastos asignados a esta persona.',
    exportSuccessful: '¡Exportación Exitosa!',
    dataDownloaded: 'Tus datos han sido descargados',
    importSuccessful: '¡Importación Exitosa!',
    importedExpenses: 'Importados exitosamente',
    importFailed: 'Importación Fallida',
    checkFileFormat: 'Error al importar datos. Por favor verifica el formato del archivo.',
    
    // Profile
    yourProfile: 'Tu Perfil',
    firstName: 'Nombre',
    fullName: 'Nombre Completo',
    save: 'Guardar',
    
    // Category names
    food: 'Comida',
    transport: 'Transporte',
    entertainment: 'Entretenimiento',
    bills: 'Facturas',
    shopping: 'Compras',
    other: 'Otro'
  }
};

function t(key) {
  return translations[currentLanguage][key] || key;
}

















// State Management
let expenses = [];
let totalBalance = 12450;
let userName = 'User';
let userFullName = 'User Admin';
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let payers = [
  { id: 'user', name: 'User' },
  { id: 'other', name: 'Other' }
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
  updateWhoPaysOptions();  // â† AGREGAR ESTA LÃNEA
  updateMonthFilter();
  updateCategoryFilter();
  updateUI();
  attachEventListeners();
  updateProfileUI();
  translatePage();
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

  // Bottom Navigation (Mobile)
  document.querySelectorAll('.bottom-nav__item').forEach(item => {
    item.addEventListener('click', (e) => {
      const view = item.dataset.view;
      if (view === 'settings') {
        openSettingsModal();
      } else {
        switchView(view);
      }
      
      // Update active state in bottom nav
      document.querySelectorAll('.bottom-nav__item').forEach(btn => {
        btn.classList.remove('is-active');
      });
      item.classList.add('is-active');
    });
  });

  // Modal
// Modal
addExpenseTop?.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que el click suba al padre
  openModal();
});

document.getElementById('profileAvatar')?.addEventListener('click', (e) => {
  // Solo abre el modal si NO clickeaste el botÃ³n
  if (!e.target.closest('.topbar__action')) {
    openProfileModal();
  }
});
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
    
    // ESTE ES EL CAMBIO CLAVE: agregamos 'settings' a la condiciÃ³n
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
    whoPays: formData.get('whoPays'),
    isMonthly: formData.get('isMonthly') === 'on',
    createdAt: new Date().toISOString()
  };

  expenses.push(expense);
  saveData();
  updateUI();
  closeModal();
  
  // Success alert
  Swal.fire({
    icon: 'success',
    title: 'Expense Added!',
    text: 'Your expense was saved successfully',
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  });
}

function deleteExpense(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      expenses = expenses.filter(exp => exp.id !== id);
      saveData();
      updateUI();
      
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your expense has been deleted.',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  });
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

// POR esta nueva versiÃ³n:
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

// AGREGAR estas dos nuevas funciones despuÃ©s de calculateExpensesByPerson():

function calculateCreditExpensesByPerson() {
  const personTotals = {};
  
  payers.forEach(payer => {
    personTotals[payer.id] = 0;
  });
  
  expenses.forEach(expense => {
    if (expense.method !== 'credit') return; // Solo crÃ©dito
    
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
// REEMPLAZAR toda la funciÃ³n updateUI() por esta:
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

// Render Category Chart
let donutChartInstance = null;

function renderCategoryChart() {
  const container = document.getElementById('categoryChartContainer');
  container.innerHTML = '';
  
  const categoryTotals = calculateCategoryExpenses();
  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  
  if (totalExpenses === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">ðŸ“Š</div>
        <p>No expenses this month. Add your first expense to see the breakdown!</p>
      </div>
    `;
    
    // Clear donut chart too
    const chartCanvas = document.getElementById('expensesDonutChart');
    const legendDiv = document.getElementById('chartLegend');
    if (chartCanvas && legendDiv) {
      if (donutChartInstance) {
        donutChartInstance.destroy();
        donutChartInstance = null;
      }
      legendDiv.innerHTML = '<p style="text-align: center; color: var(--muted);">No data to display</p>';
    }
    
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
    amountLabel.textContent = `$${amount.toFixed(0)} (${percentage.toFixed(1)}%)`;
    
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
  
  // Render Donut Chart
  renderDonutChart(categoryTotals, totalExpenses);
}

function renderDonutChart(categoryTotals, totalExpenses) {
  const chartCanvas = document.getElementById('expensesDonutChart');
  const legendDiv = document.getElementById('chartLegend');
  
  if (!chartCanvas || !legendDiv) return;
  
  // Destroy previous chart instance
  if (donutChartInstance) {
    donutChartInstance.destroy();
  }
  
  // Prepare data
  const chartData = [];
  const chartLabels = [];
  const chartColors = [];
  
  categories.forEach(category => {
    const amount = categoryTotals[category.name] || 0;
    if (amount > 0) {
      chartData.push(amount);
      chartLabels.push(category.label);
      chartColors.push(category.color);
    }
  });
  
  // Create chart
  const ctx = chartCanvas.getContext('2d');
  donutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: chartColors,
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(31, 42, 68, 0.9)',
          padding: 12,
          bodyFont: {
            size: 14,
            family: 'Poppins'
          },
          displayColors: true,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = ((value / totalExpenses) * 100).toFixed(1);
              return `${label}: $${value.toFixed(0)} (${percentage}%)`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
  
  // Create custom legend
  legendDiv.innerHTML = '';
  chartLabels.forEach((label, index) => {
    const amount = chartData[index];
    const percentage = ((amount / totalExpenses) * 100).toFixed(1);
    
    const legendItem = document.createElement('div');
    legendItem.className = 'legend-item';
    
    legendItem.innerHTML = `
      <div class="legend-label">
        <span class="legend-color" style="background: ${chartColors[index]};"></span>
        ${label}
      </div>
      <div class="legend-amount">$${amount.toFixed(0)} (${percentage}%)</div>
    `;
    
    legendDiv.appendChild(legendItem);
  });
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
        <div class="empty-state-icon">ðŸ”</div>
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
    monthlyBadge.textContent = 'ðŸ”„ Monthly';
    header.appendChild(monthlyBadge);
  }
  
  const details = document.createElement('div');
  details.className = 'expense-details';
  
  let detailsText = '';
  if (expense.place) detailsText += expense.place + ' â€¢ ';
  detailsText += expense.method;
  if (expense.method === 'credit' && expense.payments > 1) {
    detailsText += ` (${expense.payments} payments)`;
  }
  detailsText += ' â€¢ ' + formatDate(expense.date);
  
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
  deleteBtn.textContent = 'ðŸ—‘ï¸';
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

function openSettingsModal() {
  switchView('settings');
  renderSettingsView();
}
function renderSettingsView() {
  // Update balance input
  document.getElementById('totalBalanceInput').value = totalBalance;
  
  // Update language selector
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }
  
  // Render categories
  renderCategoriesList();
  
  // Render payers
  renderPayersList();
  
  // Attach event listeners
  attachSettingsListeners();
  
  // Translate settings page
  translatePage();
}

function translatePage() {
  // Topbar
  document.querySelector('.topbar__greeting h1').textContent = `${t('welcomeBack')}, ${userName} 👋`;
  const addExpenseBtn = document.getElementById('addExpenseTop');
  if (addExpenseBtn) addExpenseBtn.textContent = t('addExpense');
  
  // Navigation
  const navItems = document.querySelectorAll('.nav__item, .bottom-nav__item');
  navItems.forEach(item => {
    const view = item.dataset.view;
    const label = item.querySelector('.nav__label, .bottom-nav__label');
    if (label && view) {
      label.textContent = t(view);
    }
  });
  
  // Stats cards
  const statLabels = document.querySelectorAll('.card__label');
  if (statLabels[0]) statLabels[0].textContent = t('totalBalance');
  if (statLabels[1]) statLabels[1].textContent = t('savingsRate');
  if (statLabels[2]) statLabels[2].textContent = t('creditExpenses');
  if (statLabels[3]) statLabels[3].textContent = t('cashDebitExpenses');
  
  // Filters
  const filterLabels = document.querySelectorAll('.filter-group label');
  if (filterLabels[0]) filterLabels[0].textContent = t('month');
  if (filterLabels[1]) filterLabels[1].textContent = t('category');
  if (filterLabels[2]) filterLabels[2].textContent = t('paymentMethod');
  
  const filterMonth = document.getElementById('filterMonth');
  if (filterMonth && filterMonth.options[0]) {
    filterMonth.options[0].textContent = t('allMonths');
  }
  
  const filterCategory = document.getElementById('filterCategory');
  if (filterCategory && filterCategory.options[0]) {
    filterCategory.options[0].textContent = t('allCategories');
  }
  
  const filterMethod = document.getElementById('filterMethod');
  if (filterMethod) {
    filterMethod.options[0].textContent = t('allMethods');
    filterMethod.options[1].textContent = t('cash');
    filterMethod.options[2].textContent = t('debit');
    filterMethod.options[3].textContent = t('credit');
  }
  
  // Settings page
  const settingsTitle = document.querySelector('#settingsView h2');
  if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
  
  const settingsHeaders = document.querySelectorAll('#settingsView h3');
  if (settingsHeaders[0]) settingsHeaders[0].textContent = t('totalBalanceLabel');
  if (settingsHeaders[1]) settingsHeaders[1].textContent = t('dataManagement');
  if (settingsHeaders[2]) settingsHeaders[2].textContent = t('categories');
  if (settingsHeaders[3]) settingsHeaders[3].textContent = t('whoPaysLabel');
  
  const saveBalanceBtn = document.getElementById('saveBalance');
  if (saveBalanceBtn) saveBalanceBtn.textContent = t('saveBalance');
  
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) exportBtn.textContent = t('exportData');
  
  const importLabel = document.querySelector('label[for="importFileBtn"]');
  if (importLabel) importLabel.textContent = t('importData');
  
  const addCategoryBtn = document.getElementById('addCategoryBtn');
  if (addCategoryBtn) addCategoryBtn.textContent = t('addCategory');
  
  const addPayerBtn = document.getElementById('addPayerBtn');
  if (addPayerBtn) addPayerBtn.textContent = t('addPerson');
  
  // Delete buttons in settings
  document.querySelectorAll('.delete-category-view, .delete-payer-view').forEach(btn => {
    btn.textContent = t('delete');
  });
}

function renderCategoriesList() {
  const container = document.getElementById('categoriesListView');
  container.innerHTML = '';
  
  categories.forEach((cat, index) => {
    const item = document.createElement('div');
    item.className = 'settings-item';
    item.innerHTML = `
      <input 
        type="color" 
        value="${cat.color}" 
        data-category-index="${index}"
        class="category-color-view"
        style="width: 40px; height: 40px; border: none; border-radius: 6px; cursor: pointer;"
      />
      <input 
        type="text" 
        value="${cat.label}" 
        data-category-index="${index}"
        class="category-label-view"
        style="flex: 1; padding: 10px 12px; border: 1px solid rgba(148,163,184,.35); border-radius: 8px; background: white;"
      />
      <button 
        type="button" 
        class="btn delete-category-view"
        data-category-index="${index}"
        style="background: #fee2e2; color: #dc2626;"
      >Delete</button>
    `;
    container.appendChild(item);
  });
}

function renderPayersList() {
  const container = document.getElementById('payersListView');
  container.innerHTML = '';
  
  payers.forEach((payer, index) => {
    const item = document.createElement('div');
    item.className = 'settings-item';
    item.innerHTML = `
      <input 
        type="text" 
        value="${payer.name}" 
        data-payer-index="${index}"
        class="payer-name-view"
        style="flex: 1; padding: 10px 12px; border: 1px solid rgba(148,163,184,.35); border-radius: 8px; background: white;"
      />
      <button 
        type="button" 
        class="btn delete-payer-view"
        data-payer-index="${index}"
        style="background: #fee2e2; color: #dc2626;"
      >Delete</button>
    `;
    container.appendChild(item);
  });
}

function attachSettingsListeners() {
  // Language change
  document.getElementById('languageSelect')?.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    localStorage.setItem('financeLanguage', currentLanguage);
    translatePage();
    updateUI(); // Para re-renderizar los grÃ¡ficos con el nuevo idioma
  });
  // Save balance
  document.getElementById('saveBalance')?.addEventListener('click', () => {
    const newBalance = parseFloat(document.getElementById('totalBalanceInput').value);
    if (!isNaN(newBalance)) {
      totalBalance = newBalance;
      saveData();
      updateUI();
      Swal.fire({
        icon: 'success',
        title: 'Balance Updated!',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      });
    }
  });
  
  // Export/Import
  document.getElementById('exportDataBtn')?.addEventListener('click', exportData);
  document.getElementById('importFileBtn')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file);
      e.target.value = '';
    }
  });
  
  // Add category
  document.getElementById('addCategoryBtn')?.addEventListener('click', () => {
    categories.push({
      name: 'new_category',
      label: 'New Category',
      color: '#e5e7eb'
    });
    renderCategoriesList();
    attachCategoryListeners();
  });
  
  // Add payer
  document.getElementById('addPayerBtn')?.addEventListener('click', () => {
    payers.push({
      id: 'new_person',
      name: 'New Person'
    });
    renderPayersList();
    attachPayerListeners();
  });
  
  attachCategoryListeners();
  attachPayerListeners();
}

function attachCategoryListeners() {
  // Update category on input change
  document.querySelectorAll('.category-color-view, .category-label-view').forEach(input => {
    input.addEventListener('change', function() {
      const index = parseInt(this.getAttribute('data-category-index'));
      if (this.classList.contains('category-color-view')) {
        categories[index].color = this.value;
      } else {
        categories[index].label = this.value;
        categories[index].name = this.value.toLowerCase().replace(/[^a-z0-9]/g, '_');
      }
      saveData();
      updateCategoryOptions();
      updateCategoryFilter();
      updateUI();
    });
  });
  
  // Delete category
  document.querySelectorAll('.delete-category-view').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-category-index'));
      
      if (categories.length <= 1) {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Delete',
          text: 'You must have at least one category!',
          confirmButtonColor: '#a7c7e7'
        });
        return;
      }
      
      const hasExpenses = expenses.some(exp => exp.category === categories[index].name);
      
      if (hasExpenses) {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Delete',
          text: `Cannot delete "${categories[index].label}" because there are expenses using this category.`,
          confirmButtonColor: '#a7c7e7'
        });
        return;
      }
      
      Swal.fire({
        title: 'Delete Category?',
        text: `Delete "${categories[index].label}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          categories.splice(index, 1);
          saveData();
          updateCategoryOptions();
          updateCategoryFilter();
          renderCategoriesList();
          attachCategoryListeners();
          updateUI();
        }
      });
    });
  });
}

function attachPayerListeners() {
  // Update payer on input change
  document.querySelectorAll('.payer-name-view').forEach(input => {
    input.addEventListener('change', function() {
      const index = parseInt(this.getAttribute('data-payer-index'));
      payers[index].name = this.value;
      payers[index].id = this.value.toLowerCase().replace(/[^a-z0-9]/g, '_');
      saveData();
      updateWhoPaysOptions();
      updateUI();
    });
  });
  
  // Delete payer
  document.querySelectorAll('.delete-payer-view').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-payer-index'));
      
      if (payers.length <= 1) {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Delete',
          text: 'You must have at least one person!',
          confirmButtonColor: '#a7c7e7'
        });
        return;
      }
      
      const hasExpenses = expenses.some(exp => exp.whoPays === payers[index].id);
      
      if (hasExpenses) {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Delete',
          text: `Cannot delete "${payers[index].name}" because there are expenses assigned to this person.`,
          confirmButtonColor: '#a7c7e7'
        });
        return;
      }
      
      Swal.fire({
        title: 'Delete Person?',
        text: `Delete "${payers[index].name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          payers.splice(index, 1);
          saveData();
          updateWhoPaysOptions();
          renderPayersList();
          attachPayerListeners();
          updateUI();
        }
      });
    });
  });
}
// Local Storage
function saveData() {
  localStorage.setItem('financeExpenses', JSON.stringify(expenses));
  localStorage.setItem('financeTotalBalance', totalBalance.toString());
  localStorage.setItem('financeCategories', JSON.stringify(categories));
  localStorage.setItem('financePayers', JSON.stringify(payers));
  localStorage.setItem('financeUserName', userName);
  localStorage.setItem('financeUserFullName', userFullName);
}

function loadData() {
  const savedExpenses = localStorage.getItem('financeExpenses');
  const savedBalance = localStorage.getItem('financeTotalBalance');
  const savedCategories = localStorage.getItem('financeCategories');
  const savedPayers = localStorage.getItem('financePayers'); 
  
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
  }
  
  if (savedBalance) {
    totalBalance = parseFloat(savedBalance);
  }
  
  if (savedCategories) {
    categories = JSON.parse(savedCategories);
  }
  
  // â† AGREGAR ESTE BLOQUE
  if (savedPayers) {
    payers = JSON.parse(savedPayers);
  }
  const savedUserName = localStorage.getItem('financeUserName');
    const savedUserFullName = localStorage.getItem('financeUserFullName');

    if (savedUserName) {
    userName = savedUserName;
    }

    if (savedUserFullName) {
    userFullName = savedUserFullName;
    }
      const savedLanguage = localStorage.getItem('financeLanguage');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
  }
}

// Export/Import Functions
function exportData() {
  const dataToExport = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    totalBalance: totalBalance,
    expenses: expenses,
    categories: categories,
    payers: payers
  };
  
  const dataStr = JSON.stringify(dataToExport, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tobi-finance-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  Swal.fire({
  icon: 'success',
  title: 'Export Successful!',
  text: 'Your data has been downloaded',
  timer: 2000,
  showConfirmButton: false,
  toast: true,
  position: 'top-end'
});
}

function importData(file) {
  if (!file) return;
  
  const reader = new FileReader();
  
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      
      // Validate data structure
      if (!importedData.expenses || !Array.isArray(importedData.expenses)) {
        throw new Error('Invalid data format');
      }
      
      // Confirm before overwriting
      const confirmMsg = `This will replace your current data with ${importedData.expenses.length} expenses. Continue?`;
      
      if (!confirm(confirmMsg)) {
        return;
      }
      
      // Import data
      expenses = importedData.expenses;
      totalBalance = importedData.totalBalance || 12450;
      
      if (importedData.categories) {
        categories = importedData.categories;
      }
      
      if (importedData.payers) {
        payers = importedData.payers;
      }
      
      // Save and update UI
      saveData();
      updateCategoryOptions();
      updateWhoPaysOptions();
      updateCategoryFilter();
      updateMonthFilter();
      updateUI();
      
      Swal.fire({
  icon: 'success',
  title: 'Import Successful!',
  text: `Successfully imported ${expenses.length} expenses!`,
  confirmButtonColor: '#a7c7e7'
});
      
      // Close settings modal if open
      const settingsModal = document.getElementById('settingsModal');
      if (settingsModal) {
        settingsModal.remove();
        document.body.style.overflow = '';
      }
      
    } catch (error) {
      console.error('Import error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Import Failed',
        text: 'Error importing data. Please check the file format.',
        confirmButtonColor: '#a7c7e7'
        });
    }
  };
  
  reader.onerror = function() {
    alert('âŒ Error reading file.');
  };
  
  reader.readAsText(file);
}

// Profile Modal
function openProfileModal() {
  const profileModal = document.createElement('div');
  profileModal.className = 'modal is-open';
  profileModal.id = 'profileModal';
  
  profileModal.innerHTML = `
    <div class="modal__backdrop"></div>
    <div class="modal__dialog" style="max-width: 400px;">
      <header class="modal__header">
        <h3>Your Profile</h3>
        <button class="modal__close" id="profileClose">âœ•</button>
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
    document.querySelector('.topbar__greeting h1').textContent = `Welcome back, ${userName} ðŸ‘‹`;
    document.querySelector('.topbar__greeting p').textContent = userFullName;
    document.querySelector('.topbar__profile').setAttribute('title', userFullName);
    
    // Update avatar initials
    const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    document.querySelector('.avatar').textContent = initials;
    
    saveData();
    closeProfile();
  });
}

// Update profile on load
function updateProfileUI() {
  document.querySelector('.topbar__greeting h1').textContent = `Welcome back, ${userName} ðŸ‘‹`;
  document.querySelector('.topbar__greeting p').textContent = userFullName;
  document.querySelector('.topbar__profile').setAttribute('title', userFullName);
  
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  document.querySelector('.avatar').textContent = initials;
}