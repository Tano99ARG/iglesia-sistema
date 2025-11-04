// Servicio de Backend - Con configuración centralizada
class BackendService {
    constructor() {
        this.baseURL = BACKEND_CONFIG.BASE_URL;
        this.timeout = BACKEND_CONFIG.API_TIMEOUT;
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
            console.log('🌐 API Request:', url, config);
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}`);
            }
            
            console.log('✅ API Response:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ API Error:', error);
            return { 
                success: false, 
                error: error.message || 'Error de conexión' 
            };
        }
    }

    // Autenticación
    async login(email, password) {
        return await this.request(BACKEND_CONFIG.ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async verifyToken(token) {
        return await this.request(BACKEND_CONFIG.ENDPOINTS.AUTH.VERIFY, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }

    // Personas CRUD
    async getPersonas() {
        return await this.request(BACKEND_CONFIG.ENDPOINTS.PERSONAS.GET_ALL);
    }

    async createPersona(personaData) {
        return await this.request(BACKEND_CONFIG.ENDPOINTS.PERSONAS.CREATE, {
            method: 'POST',
            body: JSON.stringify(personaData)
        });
    }

    async updatePersona(id, personaData) {
        return await this.request(`${BACKEND_CONFIG.ENDPOINTS.PERSONAS.UPDATE}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(personaData)
        });
    }

    async deletePersona(id) {
        return await this.request(`${BACKEND_CONFIG.ENDPOINTS.PERSONAS.DELETE}/${id}`, {
            method: 'DELETE'
        });
    }

    // Health check
    async healthCheck() {
        return await this.request('/api/health');
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

console.log('🔗 BackendService cargado');
