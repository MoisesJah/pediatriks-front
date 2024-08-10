export interface HorarioPersonal {
  id_horariop: string;
  id: string;
  id_administrador: string;
  horario_iniciop: string;
  horario_finalp: string;
  estado: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
