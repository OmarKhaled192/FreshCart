import { Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
    ngOnInit(): void {
    $('.loading').fadeOut(1000);
  }
  ngOnDestroy(): void {
    $('.loading').fadeIn(0);
    
  }
}
