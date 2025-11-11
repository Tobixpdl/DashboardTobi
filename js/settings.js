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
    updateUI(); // Para re-renderizar los gráficos con el nuevo idioma
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