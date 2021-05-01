import { Component, EventEmitter, Output } from '@angular/core'
import { Member } from '../member.model';
import { formRow } from './formRow.model';


@Component({
    selector: 'app-MemberInput',
    templateUrl: './memberInput.component.html',
    styleUrls: ['./memberInput.component.css']
  })
export class MemberInput
{  
      @Output() memberCreated = new EventEmitter<Member>();
      maxDob: Date;
      minDob: Date;

      //REGEXP
      stringRegExp = new RegExp("[a-zA-Z]{3,20}");
      emailRegExp  = new RegExp("[a-zA-Z]{3,20}@[a-zA-Z]{2,20}\.[a-zA-Z]{2,5}"); // not good enough
      adressRegExp = new RegExp("[a-zA-Z]{3,}.{3,20}[0-9]{1,7}");
      dobRegExp    = new RegExp("");

    // containing all displayed form items (label,input, and state(valid/invalid))
    rowArray: formRow[]=
    [
      new formRow('Firstname: ','invalid',''),
      new formRow('Lastname: ','invalid',''),
      new formRow('Adress: ','invalid',''),
      new formRow('Email: ','invalid',''),
      new formRow('ID: ','invalid',''),
      new formRow('Occupation: ','invalid',''),
      new formRow('Date of birth: ','invalid',''),
    ];    
    
    // cahange function name -> confusion becouse same function name in expression
    test(index: number)
    {
        console.log('test called i: '+index+' value: '+this.rowArray[index].inputValue);
        switch(index)
        {
          case 0:{var result=this.stringRegExp.test(this.rowArray[index].inputValue); 
                  if(result)this.rowArray[index].state='valid';
                  else this.rowArray[index].state='invalid';}
                  break;

          case 1:{var result=this.stringRegExp.test(this.rowArray[index].inputValue); 
                  if(result)this.rowArray[index].state='valid';
                  else this.rowArray[index].state='invalid';}
                  break;

          case 2:{var result=this.adressRegExp.test(this.rowArray[index].inputValue); 
                  if(result)this.rowArray[index].state='valid';
                  else this.rowArray[index].state='invalid';}
                  break; 

          case 3:{var result=this.emailRegExp.test(this.rowArray[index].inputValue); 
                  if(result)this.rowArray[index].state='valid';
                  else this.rowArray[index].state='invalid';}
                  break;

          case 4:{var result=this.stringRegExp.test(this.rowArray[index].inputValue);  // later removed and id created manually 
                  if(result)this.rowArray[index].state='valid';
                  else this.rowArray[index].state='invalid';}
                  break;

          case 5:{var result=this.stringRegExp.test(this.rowArray[index].inputValue); 
                  if(result)this.rowArray[index].state='valid';
                  else this.rowArray[index].state='invalid';}
                  break;

          case 6:{this.rowArray[index].state='valid';}break; //date can only get valid values
        } 
    }

    // only emits the memberCreated Event if every input is valid
    checkInputValid()
    {
      var result: Boolean=true;
      for(let i=0;i<this.rowArray.length;i++)
        if(this.rowArray[i].state=='invalid')return false; 
      
      if(result==true) // not so pretty
       {
         this.memberCreated.emit(new Member(this.rowArray[0].inputValue,
                    this.rowArray[1].inputValue,new Date(1,1,1900),
                    this.rowArray[3].inputValue,this.rowArray[4].inputValue,
                    this.rowArray[5].inputValue,this.rowArray[6].inputValue));


       }
      else console.log('no success'); // maybe setting bool here displaying label informing about the error
    }
    
    
     
    
    constructor(){}
}