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
  
  // ← AGREGAR ESTE BLOQUE
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
    alert('❌ Error reading file.');
  };
  
  reader.readAsText(file);
}