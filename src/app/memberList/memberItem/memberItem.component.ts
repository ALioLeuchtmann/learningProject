import { Component, Input, Output,EventEmitter  } from "@angular/core";
import { Member } from "../member.model";



@Component({
    selector: 'app-MemberItem',
    templateUrl: './memberItem.component.html',
    styleUrls: ['./memberItem.component.css']
})
export class MemberItem
{
    @Input() public data: Member;
    @Output() onDelete = new EventEmitter<{}>();
    constructor(){console.log('Member Item created ');}
}