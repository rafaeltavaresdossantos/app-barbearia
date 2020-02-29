export enum StatusFila {
    Aguardando,
    EmAndamento,
    Finalizado
}

export interface FilaBarbeiro {
    id: string;
    idUsuario: string;
    nomeUsuario: string;
    corte: string;
    valor: number;
    status: StatusFila;
    data: Date;
}
