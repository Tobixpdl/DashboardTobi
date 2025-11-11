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

// Render Category Chart
let donutChartInstance = null;

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