export interface TipoCita {
    id_tipocita: string
    nombre: string
    descripcion?: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}