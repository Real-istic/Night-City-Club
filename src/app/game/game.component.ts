import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, setDoc, doc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | any = '';
  game = new Game;
  games$: Observable<any[]>;
  games: Array<any> = [];
  firestore: Firestore = inject(Firestore);


  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    const gameCollection = collection(this.firestore, 'games');
    this.games$ = collectionData(gameCollection);

    this.games$.subscribe((newGame) => {
      // console.log('Game update: ', newGame);
      this.games = newGame;
    });
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log('Params: ', params);
    });
    // console.log(this.game);
  }

  async newGame() {
    // this.router.navigateByUrl('/game/');
    // this.game = new Game();
    // console.log(this.game);
    const gameCollection = collection(this.firestore, 'games');
    let gameInfo = await addDoc(gameCollection, this.game.toJson());
    console.log('Game info: ', gameInfo);

  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.playedCards.push(this.currentCard);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
