// 👥 MÓDULO DE GESTIÓN DE PERSONAS
class PersonasManager {
    constructor() {
        this.personas = [];
    }

    addPersona(personaData) {
        const newPersona = {
            id: Date.now(),
            ...personaData,
            fecha_creacion: new Date().toISOString()
        };
        
        this.personas.push(newPersona);
        return newPersona;
    }

    searchPersonas(query) {
        if (!query) return this.personas;

        const lowerQuery = query.toLowerCase();
        return this.personas.filter(persona =>
            persona.nombre.toLowerCase().includes(lowerQuery) ||
            persona.email.toLowerCase().includes(lowerQuery) ||
            (persona.telefono && persona.telefono.includes(query))
        );
    }
}
