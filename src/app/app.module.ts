import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ListView } from './memberList/listView.component';
import { MemberInput } from './memberList/memberInput/memberInput.component';
import { MemberItem } from './memberList/memberItem/memberItem.component';
import { SortViewComponent } from './sort-view/sort-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SortViewComponent,
    ListView,
    MemberInput,
    MemberItem,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
