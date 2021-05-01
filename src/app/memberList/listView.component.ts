import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Member } from './member.model';


// To Do:
// - fix dates (min/max) aswell as format (without time)
// - implement edit
// - implement datank
// 

@Component({
    selector: 'app-listView',
    templateUrl: './listView.component.html',
    styleUrls: ['./listView.component.css']
  })
export class ListView
{
    newBool: boolean=false;

    // list of members to display
    memberList: Member[] = 
    [
        new Member('Alio','Leuchtmann',new Date(1997,5,13),'Programmer','alio.leuchtmann@gmx.de','1','musterstrass 31'),
        new Member('Alio','Leuchtmann',new Date(1997,5,13),'Programmer','alio.leuchtmann@gmx.de','1','musterstrass 31'),
        
    ];

    // deleting Member, event emitted when button delete is presed in memberItem
    // in ngFor(this html component) this event is bound to this function while it gets the fitting index according to i in ngFor
    deleteMember(index: number)
    {

        for(let i=0;i<this.memberList.length;i++)
        {
           console.log(this.memberList[i]);
        }

         var tmp =this.memberList[this.memberList.length-1];
         this.memberList[this.memberList.length-1]=this.memberList[index];
         this.memberList[index]=tmp;
         this.memberList.pop();

    }

    addMember(data: Member)
    {
        this.memberList.push(data);
        this.newBool=false;
    }

    

    constructor(){}
}