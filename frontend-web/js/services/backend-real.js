// 🔗 SERVICIO BACKEND - CONEXIÓN REAL
class BackendService {
    static baseURL = 'https://personas-backend-v2.onrender.com/api';

    static async testConnection() {
        try {
            showNotification('🔗 Probando conexión backend...', 'info');
            
            const response = await fetch(`${this.baseURL}/health`);
            const data = await response.json();
            
            if (response.ok) {
                console.log('✅ Backend conectado:', data);
                showNotification('✅ Backend conectado correctamente', 'success');
                return data;
            } else {
                throw new Error('Error en respuesta del servidor');
            }
            
        } catch (error) {
            console.error('❌ Error backend:', error);
            showNotification('❌ Error conectando al backend', 'error');
        }
    }
}

function showNotification(message, type) {
    if (window.sistema && window.sistema.showNotification) {
        window.sistema.showNotification(message, type);
    }
}
