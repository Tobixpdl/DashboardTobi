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

