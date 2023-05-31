import { Component, OnInit, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'Ace of Night City', description: 'Share your craziest experiences from the darkest corners of Night City! What stories do you have about intense encounters and epic moments?' },
    { title: 'Two of Night City', description: 'No worries, choombas! Share your sickest cyber upgrades from Night City! What augmentations and implants have turned you into an absolute badass?' },
    { title: 'Three of Night City', description: 'Listen up, folks! How have you navigated through the chaos and stress of the cyberpunk lifestyle in Night City? Share your survival secrets and tips!' },
    { title: 'Four of Night City', description: 'Check it, gang! Which street gang do you think has the toughest crew in Night City? What makes them so hardcore, and what encounters have you had with them?' },
    { title: 'Five of Night City', description: 'Time to party, people! What are the wildest clubs and underground spots in Night City that you consider the ultimate party hotspots? Share your best memories of wild nights and unforgettable adventures!' },
    { title: 'Six of Night City', description: 'Hey there, folks! What are your thoughts on the schemes of the corrupt big corporations in Night City? Share your opinions on the power games and how to stand up to them!' },
    { title: 'Seven of Night City', description: 'Check this, choombas! How do the notorious megacorporations influence our daily lives in Night City? Share your experiences with their surveillance, control, and strategies to outsmart them!' },
    { title: 'Eight of Night City', description: 'Don\'t worry, gang! What tips do you have for safely navigating the dangerous streets of Night City? Share your best tricks to evade hostile gangs and mercenaries!' },
    { title: 'Nine of Night City', description: 'Hey, high-tech crowd! What are your coolest gadgets and tech innovations that have revolutionized your life in Night City? Share your mind-blowing experiences and techno wonders!' },
    { title: 'Ten of Night City', description: 'Check it, folks! What scandals and news stories are currently making headlines in Night City? Share your opinions on the most notorious personalities and the latest buzz!' },
    { title: 'Jack of Night City', description: 'Yo, people! Let\'s talk about the most influential figures in Night City - the big shots who dominate the game in the city of dreams! Who are your idols or adversaries in the scene?' },
    { title: 'Queen of Night City', description: 'Hey, ladies and gentlemen, the power of women in Night City! Share your thoughts on the badass chicas who rule the city. Who are your favorite women, and what stories do they have to tell?' },
    { title: 'King of Night City', description: 'Check it out, folks! Which architectural masterpieces and iconic skylines of Night City have taken your breath away? Show us your best shots and share your impressions!' }
  ];


  title = '';
  description = '';

  @Input() card: string | any = '';

  constructor() { }

  ngOnInit(): void {
    // console.log('current card: ', this.card);
  }

  ngOnChanges(): void {
    console.log('current card: ', this.card);

  }
}
