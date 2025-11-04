// Configuración del Sistema - EmailJS
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_mwog2jm',
    TEMPLATE_ID: 'template_wc3t3it',
    PUBLIC_KEY: 'PXJT-sYDto3IXyn1a',
    USER_ID: 'Valentin'
};

// Configuración del Backend
const BACKEND_CONFIG = {
    BASE_URL: 'https://personas-backend-v2.onrender.com',
    API_TIMEOUT: 10000,
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/api/auth/login',
            VERIFY: '/api/auth/verify'
        },
        PERSONAS: {
            BASE: '/api/personas',
            GET_ALL: '/api/personas',
            CREATE: '/api/personas',
            UPDATE: '/api/personas',
            DELETE: '/api/personas'
        }
    }
};

// Configuración de la Iglesia
const IGLESIA_CONFIG = {
    NOMBRE: 'Casa De Dios',
    EMAIL: 'valentin.alvarez.gg@gmail.com',
    TELEFONO: '+543517736190',
    DIRECCION: ''
};

// Configuración de WhatsApp
const WHATSAPP_CONFIG = {
    DEFAULT_PHONE: '+543517736190',
    DEFAULT_MESSAGE: 'Hola, te contactamos desde Casa De Dios - Sistema Iglesia'
};

console.log('⚙️ Configuración del sistema cargada');
