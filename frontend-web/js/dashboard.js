// Dashboard Simplificado
class Dashboard {
    constructor() {
        console.log('📊 Dashboard inicializado');
    }

    async cargarDashboard() {
        const container = document.getElementById('dashboardSection');
        if (!container) return;

        container.innerHTML = `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-primary text-white">
                                <h4><i class="fas fa-tachometer-alt me-2"></i>Dashboard - Casa De Dios</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3 mb-3">
                                        <div class="card text-white bg-success">
                                            <div class="card-body">
                                                <h5><i class="fas fa-users me-2"></i>Personas</h5>
                                                <h3 id="totalPersonas">0</h3>
                                                <p>Registradas en el sistema</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <div class="card text-white bg-info">
                                            <div class="card-body">
                                                <h5><i class="fas fa-envelope me-2"></i>Emails</h5>
                                                <h3 id="totalEmails">0</h3>
                                                <p>Enviados hoy</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <div class="card text-white bg-warning">
                                            <div class="card-body">
                                                <h5><i class="fas fa-comments me-2"></i>Mensajes</h5>
                                                <h3 id="totalMensajes">0</h3>
                                                <p>Enviados por WhatsApp</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <div class="card text-white bg-danger">
                                            <div class="card-body">
                                                <h5><i class="fas fa-chart-line me-2"></i>Actividad</h5>
                                                <h3 id="totalActividad">0</h3>
                                                <p>Eventos esta semana</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5>Acciones Rápidas</h5>
                                            </div>
                                            <div class="card-body">
                                                <button class="btn btn-primary me-2" onclick="mostrarPersonas()">
                                                    <i class="fas fa-users me-1"></i>Gestionar Personas
                                                </button>
                                                <button class="btn btn-success me-2" onclick="window.testEmail()">
                                                    <i class="fas fa-envelope me-1"></i>Probar Email
                                                </button>
                                                <button class="btn btn-info me-2" onclick="window.testBackend()">
                                                    <i class="fas fa-server me-1"></i>Probar Backend
                                                </button>
                                                <button class="btn btn-warning" onclick="mostrarEstadoSistema()">
                                                    <i class="fas fa-cog me-1"></i>Estado del Sistema
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Actualizar estadísticas
        this.actualizarEstadisticas();
    }

    async actualizarEstadisticas() {
        try {
            // Obtener personas del backend
            if (window.backendService) {
                const result = await window.backendService.getPersonas();
                if (result.success) {
                    document.getElementById('totalPersonas').textContent = result.data.length;
                }
            }
        } catch (error) {
            console.error('Error actualizando estadísticas:', error);
        }
    }
}

window.dashboard = new Dashboard();

// Cargar dashboard cuando se muestre la sección
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar dashboard cuando se carga la página
    setTimeout(() => {
        if (window.dashboard && document.getElementById('dashboardSection')) {
            window.dashboard.cargarDashboard();
        }
    }, 1000);
});

console.log('📊 Dashboard cargado');
