// Servicio de EmailJS - Versión Corregida
class EmailService {
    constructor() {
        this.initialized = false;
        this.init();
    }

    async init() {
        if (typeof emailjs === 'undefined') {
            console.warn('⚠️ EmailJS no cargado');
            return;
        }
        
        try {
            await emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
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
                from_name: 'Sistema Iglesia - Casa De Dios',
                to_name: persona ? persona.nombre : 'Usuario',
                persona_nombre: persona ? persona.nombre : '',
                persona_email: persona ? persona.email : '',
                persona_telefono: persona ? persona.telefono : '',
                fecha: new Date().toLocaleDateString('es-ES')
            };

            console.log('📧 Enviando email a:', to);
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
            
            console.log('✅ Email enviado correctamente');
            return { success: true, data: response };
        } catch (error) {
            console.error('❌ Error enviando email:', error);
            return { success: false, error: error.text || error.message };
        }
    }

    async sendWelcomeEmail(email, nombre) {
        return await this.sendEmail(
            email,
            '¡Bienvenido a Sistema Iglesia!',
            `Hola ${nombre}, te damos la bienvenida a nuestro sistema de gestión eclesiástica.`,
            { nombre, email }
        );
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
        'test@example.com',
        'Email de prueba - Sistema Iglesia',
        'Este es un email de prueba del sistema.'
    );
    console.log('Resultado test:', result);
    return result;
};

console.log('📧 EmailService cargado');
