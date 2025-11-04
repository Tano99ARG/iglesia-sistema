// ========== FUNCIONES GLOBALES DEL SISTEMA ==========

// Ver estado del sistema
window.mostrarEstadoSistema = function() {
    const estado = {
        sistema: window.sistema ? window.sistema.inicializado : false,
        config: {
            emailjs: !!window.EMAILJS_CONFIG,
            backend: !!window.BACKEND_CONFIG,
            iglesia: !!window.IGLESIA_CONFIG
        },
        servicios: {
            email: !!window.emailService,
            backend: !!window.backendService,
            auth: !!window.authSystem,
            ui: !!window.uiManager,
            dashboard: !!window.dashboard,
            personas: !!window.personasManager
        }
    };
    
    console.log('🏠 Estado del sistema:', estado);
    
    let mensaje = `Estado del Sistema:\n`;
    mensaje += `✅ Sistema: ${estado.sistema ? 'INICIALIZADO' : 'NO INICIALIZADO'}\n`;
    mensaje += `📧 EmailJS: ${estado.config.emailjs ? 'CONFIGURADO' : 'ERROR'}\n`;
    mensaje += `🔗 Backend: ${estado.config.backend ? 'CONFIGURADO' : 'ERROR'}\n`;
    mensaje += `🏠 Iglesia: ${estado.config.iglesia ? 'CONFIGURADA' : 'ERROR'}\n\n`;
    mensaje += `🛠️ Servicios:\n`;
    mensaje += `  📧 Email: ${estado.servicios.email ? 'OK' : 'ERROR'}\n`;
    mensaje += `  🔗 Backend: ${estado.servicios.backend ? 'OK' : 'ERROR'}\n`;
    mensaje += `  🔐 Auth: ${estado.servicios.auth ? 'OK' : 'ERROR'}\n`;
    mensaje += `  🎨 UI: ${estado.servicios.ui ? 'OK' : 'ERROR'}\n`;
    mensaje += `  📊 Dashboard: ${estado.servicios.dashboard ? 'OK' : 'ERROR'}\n`;
    mensaje += `  👥 Personas: ${estado.servicios.personas ? 'OK' : 'ERROR'}`;
    
    alert(mensaje);
};

// Probar backend
window.testBackend = async function() {
    console.log('🧪 Test manual de backend...');
    
    if (!window.backendService) {
        alert('❌ BackendService no disponible');
        return {success: false, error: 'BackendService no disponible'};
    }
    
    try {
        const result = await window.backendService.healthCheck();
        console.log('Resultado test backend:', result);
        
        if (result.success) {
            alert('✅ Backend conectado correctamente\n\n' + JSON.stringify(result.data, null, 2));
        } else {
            alert('❌ Error conectando al backend: ' + result.error);
        }
        
        return result;
    } catch (error) {
        console.error('Error en testBackend:', error);
        alert('❌ Error en test de backend: ' + error.message);
        return {success: false, error: error.message};
    }
};

// Probar email
window.testEmail = async function() {
    console.log('🧪 Test manual de email...');
    
    if (!window.emailService) {
        alert('❌ EmailService no disponible');
        return {success: false, error: 'EmailService no disponible'};
    }
    
    if (!window.emailService.initialized) {
        alert('⚠️ EmailJS no inicializado. Inicializando...');
        await window.emailService.init();
    }
    
    try {
        const testEmail = window.IGLESIA_CONFIG ? window.IGLESIA_CONFIG.EMAIL : 'valentin.alvarez.gg@gmail.com';
        console.log('📧 Enviando test a:', testEmail);
        
        const result = await window.emailService.sendTestEmail();
        console.log('Resultado test email:', result);
        
        if (result.success) {
            alert('✅ Email de prueba enviado correctamente a: ' + testEmail);
        } else {
            alert('❌ Error enviando email: ' + result.error + '\n\nVerifica el template en EmailJS.com');
        }
        
        return result;
    } catch (error) {
        console.error('Error en testEmail:', error);
        alert('❌ Error en test de email: ' + error.message);
        return {success: false, error: error.message};
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
        alert('👥 Cargando gestión de personas...');
    } else {
        alert('❌ PersonasManager no disponible');
    }
};

// Función para debug rápido
window.debugSistema = function() {
    console.log('🐛 DEBUG SISTEMA:');
    console.log('- window.sistema:', window.sistema);
    console.log('- window.EMAILJS_CONFIG:', window.EMAILJS_CONFIG);
    console.log('- window.BACKEND_CONFIG:', window.BACKEND_CONFIG);
    console.log('- window.IGLESIA_CONFIG:', window.IGLESIA_CONFIG);
    console.log('- window.emailService:', window.emailService);
    console.log('- window.backendService:', window.backendService);
    console.log('- window.authSystem:', window.authSystem);
    console.log('- window.uiManager:', window.uiManager);
    console.log('- window.dashboard:', window.dashboard);
    console.log('- window.personasManager:', window.personasManager);
    
    // Probar si las funciones globales existen
    console.log('- typeof testBackend:', typeof testBackend);
    console.log('- typeof mostrarEstadoSistema:', typeof mostrarEstadoSistema);
    console.log('- typeof testEmail:', typeof testEmail);
    console.log('- typeof cargarPersonas:', typeof cargarPersonas);
};

console.log('🌍 Funciones globales cargadas: testBackend, mostrarEstadoSistema, testEmail, cargarPersonas, debugSistema');
