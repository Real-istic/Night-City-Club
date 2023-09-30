import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { collection, doc, updateDoc } from "firebase/firestore";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  game$: Observable<any> | any;
  gameID: string | any = '';


  constructor(public dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(async (params: any) => {
      this.gameID = params.id;
      const gameCollection = collection(this.firestore, 'games');
      this.game$ = doc(gameCollection, this.gameID);

      docData(this.game$).subscribe((myGame: any) => {
        this.game.currentPlayer = myGame.currentPlayer;
        this.game.playedCards = myGame.playedCards;
        this.game.players = myGame.players;
        this.game.stack = myGame.stack;
        this.game.pickCardAnimation = myGame.pickCardAnimation;
        this.game.currentCard = myGame.currentCard;
      });
    });
  }

  async newGame() {
    this.game = new Game();
    this.openDialog();
  }

  async takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0 && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.playedCards.push(this.game.currentCard);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 10);
    } else if (this.game.stack.length == 0) {
      for (let i = 0; i < this.game.newStack.length; i++) {
        this.game.stack.push(this.game.newStack[i]);
      }
      this.game.shuffle(this.game.stack);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  async saveGame() {
    const gameCollection = collection(this.firestore, 'games');
    this.game$ = doc(gameCollection, this.gameID);
    const pushSaveGame = await updateDoc(this.game$, this.game.toJson());
  }
}
