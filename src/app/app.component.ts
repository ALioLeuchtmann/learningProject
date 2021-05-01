import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'experimentProject';

  mode: string;

  changeMode(eventData:{selectedMode: string})
  {
      this.mode=eventData.selectedMode;
  }

}