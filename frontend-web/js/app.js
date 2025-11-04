// Sistema Principal - Casa De Dios (Versión Simplificada)
class SistemaCasaDeDios {
    constructor() {
        this.inicializado = false;
        console.log('🚀 Sistema Casa De Dios - Inicializando...');
    }

    async inicializar() {
        try {
            // Verificar dependencias críticas
            if (typeof emailjs === 'undefined') {
                console.warn('⚠️ EmailJS no está cargado');
            }
            
            if (typeof window.EMAILJS_CONFIG === 'undefined') {
                console.warn('⚠️ Configuración EmailJS no cargada');
            }
            
            // Inicializar servicios
            if (window.emailService && !window.emailService.initialized) {
                await window.emailService.init();
            }
            
            if (window.backendService) {
                const health = await window.backendService.healthCheck();
                console.log('✅ Backend conectado:', health);
            }
            
            this.inicializado = true;
            console.log('✅ Sistema 100% Funcional');
            
        } catch (error) {
            console.error('❌ Error inicializando sistema:', error);
        }
    }

    getEstado() {
        return {
            inicializado: this.inicializado,
            servicios: {
                email: !!window.emailService,
                backend: !!window.backendService
            }
        };
    }
}

// Inicializar sistema
document.addEventListener('DOMContentLoaded', async () => {
    window.sistema = new SistemaCasaDeDios();
    await window.sistema.inicializar();
    console.log('🏠 Sistema listo. Usa mostrarEstadoSistema() para ver el estado.');
});

console.log('🔧 Sistema Casa De Dios - Cargado');
