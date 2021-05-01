import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() newMode = new EventEmitter<{selectedMode: string}>();

  constructor() { }

  onClick(mode: string)
  {
    this.newMode.emit( {selectedMode: mode});
    console.log(mode); // alles gut
  }

  ngOnInit(): void {
  }

}
