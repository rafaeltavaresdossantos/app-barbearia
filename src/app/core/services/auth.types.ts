export enum ModoAutenticacao {
    email,
    facebook,
}

export enum TipoUsuario {
    Cliente,
    Admin,
    Operador
}

export interface Usuario {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    tipo?: TipoUsuario;
}

export interface OpcoesAutenticacao {
    isCadastro: boolean;
    modoAutenticacao: ModoAutenticacao;
    usuario: Usuario;
}
