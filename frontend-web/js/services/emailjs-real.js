// Servicio de EmailJS - Versión Corregida con Credenciales Reales
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
        
        try {
            // EmailJS v3+ usa init con publicKey
            await emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            this.initialized = true;
            console.log('✅ EmailJS inicializado correctamente');
            console.log('📧 Service ID:', EMAILJS_CONFIG.SERVICE_ID);
            console.log('📧 Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
        } catch (error) {
            console.error('❌ Error inicializando EmailJS:', error);
        }
    }

    async sendEmail(to, subject, message, persona = null) {
        if (!this.initialized) {
            console.warn('⚠️ EmailJS no inicializado, intentando inicializar...');
            await this.init();
        }

        try {
            const templateParams = {
                to_email: to,
                subject: subject,
                message: message,
                from_name: IGLESIA_CONFIG.NOMBRE,
                to_name: persona ? persona.nombre : 'Usuario',
                persona_nombre: persona ? persona.nombre : '',
                persona_email: persona ? persona.email : '',
                persona_telefono: persona ? persona.telefono : '',
                iglesia_nombre: IGLESIA_CONFIG.NOMBRE,
                iglesia_email: IGLESIA_CONFIG.EMAIL,
                iglesia_telefono: IGLESIA_CONFIG.TELEFONO,
                fecha: new Date().toLocaleDateString('es-ES'),
                hora: new Date().toLocaleTimeString('es-ES')
            };

            console.log('📧 Enviando email a:', to);
            console.log('📧 Parámetros:', templateParams);
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
            
            console.log('✅ Email enviado correctamente:', response);
            return { success: true, data: response };
        } catch (error) {
            console.error('❌ Error enviando email:', error);
            return { 
                success: false, 
                error: error.text || error.message || 'Error desconocido',
                details: error 
            };
        }
    }

    async sendWelcomeEmail(email, nombre) {
        const subject = `¡Bienvenido a ${IGLESIA_CONFIG.NOMBRE}!`;
        const message = `Hola ${nombre},\n\nTe damos la bienvenida a ${IGLESIA_CONFIG.NOMBRE}. Estamos contentos de tenerte en nuestra comunidad.\n\nBendiciones,\nEquipo ${IGLESIA_CONFIG.NOMBRE}`;
        
        return await this.sendEmail(email, subject, message, { nombre, email });
    }

    async sendNotification(email, nombre, tipo, detalles) {
        const subject = `Notificación - ${IGLESIA_CONFIG.NOMBRE}`;
        const message = `Hola ${nombre},\n\n${detalles}\n\n${IGLESIA_CONFIG.NOMBRE}`;
        
        return await this.sendEmail(email, subject, message, { nombre, email });
    }
}

// Instancia global
window.emailService = new EmailService();

// Función legacy para compatibilidad
async function sendEmail(to, subject, message, persona = null) {
    return await window.emailService.sendEmail(to, subject, message, persona);
}

// Test manual (no automático)
window.testEmail = async function() {
    console.log('🧪 Test manual de email...');
    const result = await window.emailService.sendEmail(
        IGLESIA_CONFIG.EMAIL,
        '✅ Email de prueba - Sistema Iglesia',
        'Este es un email de prueba del sistema. Si recibes esto, EmailJS está funcionando correctamente.'
    );
    console.log('Resultado test:', result);
    
    if (result.success) {
        alert('✅ Email de prueba enviado correctamente');
    } else {
        alert('❌ Error enviando email: ' + result.error);
    }
    
    return result;
};

console.log('📧 EmailService cargado con credenciales reales');
