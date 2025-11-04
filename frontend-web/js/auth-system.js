// Sistema de Autenticación Simplificado
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.token = null;
    }

    login(email, password) {
        // Login simple - siempre funciona con credenciales básicas
        if (email === 'admin@iglesia.com' && password === 'admin123') {
            this.currentUser = {
                id: 1,
                email: email,
                nombre: 'Administrador',
                rol: 'admin'
            };
            this.token = 'fake-jwt-token-' + Date.now();
            
            console.log('✅ Login exitoso:', this.currentUser);
            return { success: true, user: this.currentUser, token: this.token };
        } else {
            console.log('❌ Login fallido');
            return { success: false, error: 'Credenciales inválidas' };
        }
    }

    logout() {
        this.currentUser = null;
        this.token = null;
        console.log('✅ Logout exitoso');
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

window.authSystem = new AuthSystem();
console.log('🔐 AuthSystem cargado');
