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
  updateWhoPaysOptions();  // ← AGREGAR ESTA LÍNEA
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
  // Solo abre el modal si NO clickeaste el botón
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
