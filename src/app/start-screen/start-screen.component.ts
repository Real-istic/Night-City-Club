import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { update } from 'firebase/database';
import { collection, doc } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  firestore: Firestore = inject(Firestore);
  game$: any;



  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  async newGame() {
    let game = new Game();
    const gameCollection = collection(this.firestore, 'games');
    let gameInfo = await addDoc(gameCollection, game.toJson());
    // console.log('gameInfo: ', gameInfo);
    this.router.navigate([`/game/${gameInfo.id}`]);
  }



}
