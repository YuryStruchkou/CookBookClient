import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() private image: string;
  @Input() private title: string;
  @Input() private description: string;
  @Input() private averageVote: number;
  @Input() private route: string; 

  constructor() { }

  ngOnInit() {
  }

}
