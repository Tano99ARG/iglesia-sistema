// Servicio de Backend - Usando window.BACKEND_CONFIG
class BackendService {
    constructor() {
        if (!window.BACKEND_CONFIG) {
            console.error('❌ BACKEND_CONFIG no está definido');
            return;
        }
        this.baseURL = window.BACKEND_CONFIG.BASE_URL;
        this.timeout = window.BACKEND_CONFIG.API_TIMEOUT;
        console.log('🔗 Backend Service iniciado:', this.baseURL);
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }
            
            return { success: true, data };
        } catch (error) {
            console.error('❌ API Error:', error);
            return { 
                success: false, 
                error: error.message || 'Error de conexión' 
            };
        }
    }

    async healthCheck() {
        return await this.request('/api/health');
    }

    async login(email, password) {
        return await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async getPersonas() {
        return await this.request('/api/personas');
    }
}

// Instancia global
window.backendService = new BackendService();

// Test de conexión
window.testBackend = async function() {
    console.log('🧪 Test manual de backend...');
    const result = await window.backendService.healthCheck();
    console.log('Resultado test backend:', result);
    
    if (result.success) {
        alert('✅ Backend conectado correctamente');
    } else {
        alert('❌ Error conectando al backend: ' + result.error);
    }
    
    return result;
};

// Función para mostrar estado
window.mostrarEstadoSistema = function() {
    const estado = {
        config: {
            emailjs: !!window.EMAILJS_CONFIG,
            backend: !!window.BACKEND_CONFIG,
            iglesia: !!window.IGLESIA_CONFIG
        },
        servicios: {
            email: !!window.emailService,
            backend: !!window.backendService
        }
    };
    
    console.log('🏠 Estado del sistema:', estado);
    alert(`Estado del Sistema:
✅ Configuración: ${estado.config.emailjs && estado.config.backend && estado.config.iglesia ? 'OK' : 'ERROR'}
🔗 Backend Service: ${estado.servicios.backend ? 'OK' : 'ERROR'}
📧 Email Service: ${estado.servicios.email ? 'OK' : 'ERROR'}`);
};

console.log('🔗 BackendService cargado');
