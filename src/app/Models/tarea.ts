import { IsubTarea } from "./subTarea";

export interface Itarea {
  tareaId: number;
  createdAt: any;
  descripcion: string;
  fechaComprometida: any;
  iconoId: number;
  prioridad: any;
  puntaje: any;
  responsable: any;
  statusId: any;
  updatedAt: any;
  listSubTareas: IsubTarea[];

  }
