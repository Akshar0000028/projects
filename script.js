// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initChart();
    setupEventListeners();
    setupThemeToggle();
});

// Particles.js configuration
function initParticles() {
    particlesJS('particles', {
        particles: {
            number: { value: 80 },
            color: { value: '#6C63FF' },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: { enable: true, speed: 1 }
        }
    });
}

// Chart.js initialization
let churnChart;
function initChart() {
    const ctx = document.getElementById('churnChart').getContext('2d');
    churnChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Churn Risk', 'Retention Probability'],
            datasets: [{
                data: [30, 70],
                backgroundColor: [ '#FF6584', '#6C63FF' ]
            }]
        },
        options: {
            cutout: '80%',
            plugins: { legend: { display: false } }
        }
    });
}

// Tab management system
let currentTab = 1;

function showTab(tabNumber) {
    updateProgressSteps(tabNumber);
    animateTabTransition(tabNumber);
    if(tabNumber === 5) animatePrediction();
}

function updateProgressSteps(tabNumber) {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('active', index < tabNumber);
    });
}

function animateTabTransition(tabNumber) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
        tab.style.pointerEvents = 'none';
    });
    
    const nextTab = document.getElementById(`tab${tabNumber}`);
    nextTab.classList.add('active');
    nextTab.style.pointerEvents = 'auto';
    currentTab = tabNumber;
    nextTab.style.animation = 'fadeIn 0.6s ease forwards';
}

// Form handling
function setupEventListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLoginSubmit);
    document.getElementById('companyForm').addEventListener('submit', handleCompanySubmit);
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
    
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', validateInput);
    });
}

function handleLoginSubmit(e) {
    e.preventDefault();
    showTab(3);
}

function handleCompanySubmit(e) {
    e.preventDefault();
    showTab(4);
}

function handleUserSubmit(e) {
    e.preventDefault();
    showTab(5);
}

function validateInput(e) {
    e.target.style.borderColor = e.target.checkValidity() ? '#6C63FF' : '#FF6584';
}

// Prediction system
function animatePrediction() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if(progress >= 85) {
            clearInterval(interval);
            showRecommendations();
        }
        updateChart(progress);
    }, 100);
}

function updateChart(progress) {
    churnChart.data.datasets[0].data = [progress, 100-progress];
    churnChart.update();
    document.getElementById('riskLevel').textContent = `${Math.round(progress)}%`;
}

function showRecommendations() {
    document.querySelectorAll('.recommendation-card').forEach(card => {
        card.style.animation = 'scaleIn 0.5s ease forwards';
    });
}

// Theme management
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
}