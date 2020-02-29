import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { FilaBarbeiro, StatusFila } from '../models/fila-barbeiro.model';
import { map, take, switchMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/core/services/usuario.service';

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

  entrarNaFila(): Observable<FilaBarbeiro> {

    return this.usuarioService.usuario$.pipe(
      map(usuario => ({
          id: null,
          data: new Date(),
          idUsuario: usuario.id,
          nomeUsuario: usuario.nome,
          corte: 'corte',
          valor: 0,
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

  sairDaFila(fila: FilaBarbeiro) {
    return this.delete(fila);
  }
}
