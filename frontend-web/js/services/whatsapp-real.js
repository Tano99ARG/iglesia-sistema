// 📱 SERVICIO WHATSAPP - FUNCIONALIDAD REAL
class WhatsAppService {
    static sendTestMessage() {
        const phoneNumber = '+543517736190';
        const message = '¡Hola! Mensaje de prueba del Sistema Casa De Dios. 🎉';
        
        this.sendMessage(phoneNumber, message);
    }

    static sendMessage(phoneNumber, message) {
        try {
            const formattedNumber = phoneNumber.replace(/\s+/g, '').replace('+', '');
            const encodedMessage = encodeURIComponent(message);
            
            const url = `https://web.whatsapp.com/send?phone=${formattedNumber}&text=${encodedMessage}`;
            
            window.open(url, '_blank');
            
            showNotification('✅ WhatsApp abierto con mensaje', 'success');
            
        } catch (error) {
            console.error('❌ Error WhatsApp:', error);
            showNotification('❌ Error abriendo WhatsApp', 'error');
        }
    }
}

function showNotification(message, type) {
    if (window.sistema && window.sistema.showNotification) {
        window.sistema.showNotification(message, type);
    }
}
