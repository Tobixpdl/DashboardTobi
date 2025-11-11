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