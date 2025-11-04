// Servicio de EmailJS - Versión Simplificada
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

    async sendEmail(to, subject, message) {
        if (!this.initialized) {
            console.warn('⚠️ EmailJS no inicializado');
            return { success: false, error: 'EmailJS no inicializado' };
        }

        // Validar que el email de destino no esté vacío
        if (!to || to.trim() === '') {
            console.error('❌ Email de destino vacío');
            return { success: false, error: 'Email de destino no puede estar vacío' };
        }

        try {
            // Parámetros MUY simples que deberían funcionar con cualquier template
            const templateParams = {
                to_email: to,
                subject: subject,
                message: message,
                from_name: 'Sistema Iglesia',
                to_name: 'Usuario',
                reply_to: window.IGLESIA_CONFIG ? window.IGLESIA_CONFIG.EMAIL : 'sistema@iglesia.com'
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

    // Función específica para test
    async sendTestEmail() {
        const testEmail = window.IGLESIA_CONFIG ? window.IGLESIA_CONFIG.EMAIL : 'valentin.alvarez.gg@gmail.com';
        return await this.sendEmail(
            testEmail,
            '✅ Email de prueba - Sistema Iglesia',
            'Este es un email de prueba del sistema. Si recibes esto, EmailJS está funcionando correctamente.\n\nSistema Iglesia - Casa De Dios'
        );
    }
}

// Instancia global
window.emailService = new EmailService();

console.log('📧 EmailService cargado - Versión Simplificada');
