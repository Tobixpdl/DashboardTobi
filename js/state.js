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

// DOM Elements (también pueden ir aquí o en un domElements.js)
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