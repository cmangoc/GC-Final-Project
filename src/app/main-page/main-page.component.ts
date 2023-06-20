import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {


  currentLat: number = 0;
  currentLng: number = 0;

  items:string[] = [];

  addItem(newItem: string) {
    if(this.items.length > 1){
      this.items = [];
    }
    this.items.push(newItem);
    if(this.items.length === 2){
      this.currentLat = parseFloat(this.items[0]);
      this.currentLng = parseFloat(this.items[1]);
    }
  }
}
