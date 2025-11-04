// Sistema Principal - Casa De Dios
class SistemaCasaDeDios {
    constructor() {
        this.inicializado = false;
        this.modulos = {};
        console.log('🚀 Sistema Casa De Dios - Inicializando...');
    }

    async inicializar() {
        try {
            // Verificar dependencias críticas
            await this.verificarDependencias();
            
            // Inicializar módulos en orden
            await this.inicializarModulos();
            
            // Configurar event listeners
            this.configurarEventListeners();
            
            this.inicializado = true;
            console.log('✅ Sistema 100% Funcional');
            
        } catch (error) {
            console.error('❌ Error inicializando sistema:', error);
        }
    }

    async verificarDependencias() {
        // Verificar que EmailJS esté cargado
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS no está cargado');
        }
        
        // Verificar configuración
        if (typeof window.EMAILJS_CONFIG === 'undefined') {
            throw new Error('Configuración no cargada');
        }
        
        console.log('✅ Dependencias verificadas');
    }

    async inicializarModulos() {
        // Inicializar servicios
        if (window.emailService) {
            await window.emailService.init();
        }
        
        if (window.backendService) {
            const health = await window.backendService.healthCheck();
            console.log('✅ Backend conectado:', health);
        }
        
        console.log('✅ Módulos inicializados');
    }

    configurarEventListeners() {
        // Event listeners globales
        document.addEventListener('DOMContentLoaded', () => {
            console.log('✅ DOM cargado - Sistema listo');
        });
        
        // Manejar errores no capturados
        window.addEventListener('error', (event) => {
            console.error('🚨 Error global:', event.error);
        });
    }

    // Métodos públicos
    getEstado() {
        return {
            inicializado: this.inicializado,
            backend: !!window.backendService,
            email: !!window.emailService,
            config: {
                emailjs: !!window.EMAILJS_CONFIG,
                backend: !!window.BACKEND_CONFIG,
                iglesia: !!window.IGLESIA_CONFIG
            }
        };
    }
}

// Inicializar sistema cuando esté listo
document.addEventListener('DOMContentLoaded', async () => {
    window.sistema = new SistemaCasaDeDios();
    await window.sistema.inicializar();
    
    // Mostrar estado en consola
    console.log('🏠 Estado del sistema:', window.sistema.getEstado());
});

// ========== FUNCIONES GLOBALES ==========

// Ver estado del sistema
window.mostrarEstadoSistema = function() {
    if (window.sistema) {
        const estado = window.sistema.getEstado();
        alert(`Estado del Sistema:
✅ Inicializado: ${estado.inicializado}
🔗 Backend: ${estado.backend}
📧 Email: ${estado.email}
⚙️ Config: ${estado.config.emailjs && estado.config.backend && estado.config.iglesia ? 'OK' : 'ERROR'}`);
    } else {
        alert('Sistema no inicializado');
    }
};

// Probar backend
window.testBackend = async function() {
    console.log('🧪 Test manual de backend...');
    
    if (!window.backendService) {
        alert('❌ BackendService no disponible');
        return;
    }
    
    try {
        const result = await window.backendService.healthCheck();
        console.log('Resultado test backend:', result);
        
        if (result.success) {
            alert('✅ Backend conectado correctamente');
        } else {
            alert('❌ Error conectando al backend: ' + result.error);
        }
        
        return result;
    } catch (error) {
        console.error('Error en testBackend:', error);
        alert('❌ Error en test de backend: ' + error.message);
    }
};

// Probar email
window.testEmail = async function() {
    console.log('🧪 Test manual de email...');
    
    if (!window.emailService) {
        alert('❌ EmailService no disponible');
        return;
    }
    
    try {
        const result = await window.emailService.sendTestEmail();
        console.log('Resultado test email:', result);
        
        if (result.success) {
            alert('✅ Email de prueba enviado correctamente');
        } else {
            alert('❌ Error enviando email: ' + result.error);
        }
        
        return result;
    } catch (error) {
        console.error('Error en testEmail:', error);
        alert('❌ Error en test de email: ' + error.message);
    }
};

// Cargar personas
window.cargarPersonas = function() {
    if (window.personasManager) {
        window.personasManager.cargarPersonas();
        // Mostrar sección de personas
        if (window.uiManager) {
            window.uiManager.showSection('personasSection');
        }
    } else {
        alert('❌ PersonasManager no disponible');
    }
};

console.log('🔧 Sistema Casa De Dios - Script cargado con funciones globales');
