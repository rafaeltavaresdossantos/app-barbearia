export enum ModoAutenticacao {
    email,
    facebook,
};

export interface Usuario {
    nome?: string;
    email: string;
    senha: string;
}
export interface OpcoesAutenticacao {
    isLogado: boolean;
    modoAutenticao: ModoAutenticacao;
    usuario: Usuario;
}