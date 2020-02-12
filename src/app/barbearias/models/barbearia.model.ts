import { BarbeariasPadrao } from './barbearias-padrao.model';

export interface Barbearia {
    id: string;
    nome: string;
    foto: string;
    endereco: string;
    padrao: boolean;
    objectPadrao: BarbeariasPadrao;
}
