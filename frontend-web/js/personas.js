// Sistema de Gestión de Personas
class PersonasManager {
    constructor() {
        this.personas = [];
        console.log('👥 PersonasManager inicializado');
    }

    async cargarPersonas() {
        const container = document.getElementById('personasSection');
        if (!container) return;

        container.innerHTML = `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h4><i class="fas fa-users me-2"></i>Gestión de Personas</h4>
                                <button class="btn btn-light btn-sm" onclick="personasManager.mostrarFormularioAgregar()">
                                    <i class="fas fa-plus me-1"></i>Agregar Persona
                                </button>
                            </div>
                            <div class="card-body">
                                <div id="personasListContainer">
                                    <div class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Cargando...</span>
                                        </div>
                                        <p>Cargando personas...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        await this.obtenerPersonas();
    }

    async obtenerPersonas() {
        try {
            console.log('📡 Obteniendo personas del backend...');
            
            if (window.backendService) {
                const result = await window.backendService.getPersonas();
                
                if (result.success) {
                    this.personas = result.data;
                    this.mostrarPersonas();
                } else {
                    this.mostrarError('Error obteniendo personas: ' + result.error);
                }
            } else {
                this.mostrarError('Backend service no disponible');
            }
        } catch (error) {
            console.error('Error obteniendo personas:', error);
            this.mostrarError('Error de conexión: ' + error.message);
        }
    }

    mostrarPersonas() {
        const container = document.getElementById('personasListContainer');
        if (!container) return;

        if (this.personas.length === 0) {
            container.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-users fa-3x text-muted mb-3"></i>
                    <h5>No hay personas registradas</h5>
                    <p class="text-muted">Comienza agregando la primera persona al sistema.</p>
                    <button class="btn btn-primary" onclick="personasManager.mostrarFormularioAgregar()">
                        <i class="fas fa-plus me-1"></i>Agregar Primera Persona
                    </button>
                </div>
            `;
            return;
        }

        let html = `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.personas.forEach(persona => {
            html += `
                <tr>
                    <td>${persona.nombre || 'N/A'}</td>
                    <td>${persona.email || 'N/A'}</td>
                    <td>${persona.telefono || 'N/A'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="personasManager.editarPersona(${persona.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="personasManager.eliminarPersona(${persona.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
            <div class="mt-3">
                <p class="text-muted">Total: <strong>${this.personas.length}</strong> personas registradas</p>
            </div>
        `;

        container.innerHTML = html;
    }

    mostrarError(mensaje) {
        const container = document.getElementById('personasListContainer');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    ${mensaje}
                </div>
                <button class="btn btn-primary" onclick="personasManager.obtenerPersonas()">
                    <i class="fas fa-redo me-1"></i>Reintentar
                </button>
            `;
        }
    }

    mostrarFormularioAgregar() {
        alert('Funcionalidad de agregar persona - Próximamente');
    }

    editarPersona(id) {
        alert('Editar persona ID: ' + id + ' - Próximamente');
    }

    eliminarPersona(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta persona?')) {
            alert('Eliminar persona ID: ' + id + ' - Próximamente');
        }
    }
}

window.personasManager = new PersonasManager();
window.cargarPersonas = () => window.personasManager.cargarPersonas();

console.log('👥 PersonasManager cargado');
