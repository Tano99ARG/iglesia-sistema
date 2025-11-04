// Servicio de EmailJS - Usando window.EMAILJS_CONFIG
class EmailService {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        if (typeof emailjs === 'undefined') {
            console.error('❌ EmailJS no está cargado en la página');
            return;
        }
        
        if (!window.EMAILJS_CONFIG) {
            console.error('❌ EMAILJS_CONFIG no está definido');
            return;
        }
        
        try {
            await emailjs.init(window.EMAILJS_CONFIG.PUBLIC_KEY);
            this.initialized = true;
            console.log('✅ EmailJS inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando EmailJS:', error);
        }
    }

    async sendEmail(to, subject, message, persona = null) {
        if (!this.initialized) {
            console.warn('⚠️ EmailJS no inicializado');
            return { success: false, error: 'EmailJS no inicializado' };
        }

        try {
            const templateParams = {
                to_email: to,
                subject: subject,
                message: message,
                from_name: window.IGLESIA_CONFIG.NOMBRE,
                to_name: persona ? persona.nombre : 'Usuario',
                persona_nombre: persona ? persona.nombre : '',
                persona_email: persona ? persona.email : '',
                persona_telefono: persona ? persona.telefono : '',
                iglesia_nombre: window.IGLESIA_CONFIG.NOMBRE,
                iglesia_email: window.IGLESIA_CONFIG.EMAIL,
                iglesia_telefono: window.IGLESIA_CONFIG.TELEFONO,
                fecha: new Date().toLocaleDateString('es-ES'),
                hora: new Date().toLocaleTimeString('es-ES')
            };

            console.log('📧 Enviando email a:', to);
            
            const response = await emailjs.send(
                window.EMAILJS_CONFIG.SERVICE_ID,
                window.EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
            
            console.log('✅ Email enviado correctamente');
            return { success: true, data: response };
        } catch (error) {
            console.error('❌ Error enviando email:', error);
            return { 
                success: false, 
                error: error.text || error.message || 'Error desconocido'
            };
        }
    }
}

// Instancia global
window.emailService = new EmailService();

// Función legacy para compatibilidad
async function sendEmail(to, subject, message, persona = null) {
    return await window.emailService.sendEmail(to, subject, message, persona);
}

// Test manual
window.testEmail = async function() {
    console.log('🧪 Test manual de email...');
    const result = await window.emailService.sendEmail(
        window.IGLESIA_CONFIG.EMAIL,
        '✅ Email de prueba - Sistema Iglesia',
        'Este es un email de prueba del sistema.'
    );
    console.log('Resultado test:', result);
    
    if (result.success) {
        alert('✅ Email de prueba enviado correctamente');
    } else {
        alert('❌ Error enviando email: ' + result.error);
    }
    
    return result;
};

console.log('📧 EmailService cargado');
