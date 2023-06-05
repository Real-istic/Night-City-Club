import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, setDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, addDoc, getFirestore, getDoc } from "firebase/firestore";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | any = '';
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  game$: Observable<any> | any;
  gameID: string | any = '';


  constructor(public dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(async (params) => {
      console.log('Params-id: ', params['id']);
      this.gameID = params['id'];
      const gameCollection = collection(this.firestore, 'games');
      this.game$ = doc(gameCollection, this.gameID);

      docData(this.game$).subscribe((myGames) => {
        console.log('myGame: ', myGames);

      });

    });


  }

  async newGame() {
    // this.game = new Game();


    // let gameInfo = await addDoc(gameCollection, this.game.toJson());
    // console.log('Game collection: ', gameCollection);
    // console.log('Game info: ', gameInfo.id);
    // console.log(this.game.toJson())


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
