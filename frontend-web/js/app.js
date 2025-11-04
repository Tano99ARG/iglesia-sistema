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
        if (typeof EMAILJS_CONFIG === 'undefined') {
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
                emailjs: !!EMAILJS_CONFIG,
                backend: !!BACKEND_CONFIG,
                iglesia: !!IGLESIA_CONFIG
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

// Funciones globales de utilidad
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

console.log('🔧 Sistema Casa De Dios - Script cargado');
