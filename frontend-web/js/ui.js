// Sistema de UI Simplificado
class UIManager {
    constructor() {
        console.log('🎨 UIManager inicializado');
    }

    showSection(sectionId) {
        // Ocultar todas las secciones
        const sections = ['authSection', 'mainSection', 'dashboardSection', 'personasSection'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.classList.add('hidden');
        });

        // Mostrar sección solicitada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            console.log('📱 Mostrando sección:', sectionId);
        }
    }

    showAlert(message, type = 'info') {
        alert(`${type.toUpperCase()}: ${message}`);
    }

    toggleLoading(show) {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = show ? 'flex' : 'none';
        }
    }
}

window.uiManager = new UIManager();

// Funciones globales de navegación
function mostrarDashboard() {
    window.uiManager.showSection('dashboardSection');
}

function mostrarPersonas() {
    window.uiManager.showSection('personasSection');
    // Cargar personas si existe la función
    if (window.cargarPersonas) {
        window.cargarPersonas();
    }
}

function cerrarSesion() {
    if (window.authSystem) {
        window.authSystem.logout();
    }
    window.uiManager.showSection('authSection');
}

console.log('🎨 UI Manager cargado');
