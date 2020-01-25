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
    isCadastro: boolean;
    modoAutenticacao: ModoAutenticacao;
    usuario: Usuario;
}