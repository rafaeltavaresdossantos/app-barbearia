import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { FilaBarbeiro, StatusFila } from '../models/fila-barbeiro.model';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { CortesBarbeiro } from '../models/cortes-barbeiro.model';

@Injectable({
  providedIn: 'root'
})
export class FilaBarbeiroService extends Firestore<FilaBarbeiro> {

  constructor(
    db: AngularFirestore,
    private usuarioService: UsuarioService
  ) {
    super(db);
  }

  getFila(idBarbeiro: string): Observable<FilaBarbeiro[]> {
    this.setCollection(`/barbeiros/${idBarbeiro}/fila`,
     ref => ref
      .where('status', 'in', [ StatusFila.Aguardando, StatusFila.EmAndamento ]));

    return this.getAll();
  }

  getQuantidadeFila(idBarbeiro: string): Observable<number> {
    return this.getFila(idBarbeiro).pipe(
      map(fila => fila.length)
    );
  }

  entrarNaFila(corte: CortesBarbeiro): Observable<FilaBarbeiro> {

    return this.usuarioService.usuario$.pipe(
      map(usuario => ({
          id: null,
          data: new Date(),
          idUsuario: usuario.id,
          nomeUsuario: usuario.nome,
          corte: corte.servico,
          valor: corte.preco,
          status: StatusFila.Aguardando
      })),
      switchMap((fila: FilaBarbeiro) => this.create(fila)),
      take(1)
    );
  }

  usuarioEstaNaFila(idBarbeiro: string): Observable<boolean> {
    return combineLatest(
      this.usuarioService.usuario$,
      this.getFila(idBarbeiro)
    ).pipe(
      map(([usuario, fila]) => fila.find(item => item.idUsuario === usuario.id) !== undefined)
    );
  }

  sairDaFila(idBarbeiro) {
    return combineLatest(
      this.usuarioService.usuario$,
      this.getFila(idBarbeiro)
    ).pipe(
      map(([usuario, fila]) => fila.find(item => item.idUsuario === usuario.id)),
      tap(fila => fila ? this.delete(fila) : null)
    );
  }
}
