// 📧 SERVICIO EMAILJS - CREDENCIALES REALES
class EmailService {
    static async sendTestEmail() {
        try {
            const templateParams = {
                to_name: 'Valentin',
                from_name: 'Sistema Casa De Dios',
                message: '¡Email de prueba del sistema! Sistema 100% funcional.',
                to_email: 'valentin.alvarez.gg@gmail.com',
                reply_to: 'valentin.alvarez.gg@gmail.com'
            };

            const response = await emailjs.send(
                'service_mwog2jm',
                'template_wc3t3it',
                templateParams
            );

            console.log('✅ Email enviado:', response);
            showNotification('✅ Email enviado correctamente', 'success');
            return response;
            
        } catch (error) {
            console.error('❌ Error email:', error);
            showNotification('❌ Error enviando email', 'error');
        }
    }
}

function showNotification(message, type) {
    if (window.sistema && window.sistema.showNotification) {
        window.sistema.showNotification(message, type);
    }
}
