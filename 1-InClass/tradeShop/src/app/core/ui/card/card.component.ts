import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() carddata: Post;

  constructor() { }

}