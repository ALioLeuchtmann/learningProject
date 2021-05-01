import { Component, OnInit } from '@angular/core';
import { SwapPaar } from '../swapPaar.module';

@Component({
  selector: 'app-sort-view',
  templateUrl: './sort-view.component.html',
  styleUrls: ['./sort-view.component.css']
})
export class SortViewComponent implements OnInit 
{

  // list of saved operations on the array so i can go through them with set Intervall
  listOfSwaps: SwapPaar[]=[];
  array: number[]=[];
  factor: number;
  numb: number;
  stopTime: number;
  timerID;

  counter:number;

  constructor(){ this.createArray(300); this.stopTime=1; }
  createArray(num: number)
  {
    for(let i=0; i<((num<301)?num:300); i++)this.array.push(Math.floor((Math.random()*100)));
    var tmp: number=0;
    for(let i=0;i<this.array.length;i++)   // woanders platzieren ineffizient  einmal berechnen und als member speichern dann uebergeben
      if(tmp<this.array[i])tmp=this.array[i];
    this.factor=tmp/450;
  }
 
  newArray()
  {
    clearInterval(this.timerID); // stopping timer
    this.clean(); // clearing swapList and array
    this.createArray(this.numb); //creating new array
  }

  // calculating the height of each column representing a value (so they allways fit in the view) 
  getSize(index: number){  return (this.array[index]/this.factor).toString();  }


  bubbleSort()
  {
    this.listOfSwaps=[];
    var copyArray: number[]=this.array.slice(); // !ACHTUNG! have to use slice otherwise reference will be created !
    var len: number = copyArray.length;

    for(let i=0;i<len-1;i++)
     for(let j=i+1;j<len;j++)
       if(copyArray[j]<copyArray[i])
       {
           this.listOfSwaps.push({i:i,j:j});
           this.swap(copyArray,{i:i,j:j});
       }
       this.executeSwapList();
  }

  startQuickSort()
  {
     this.listOfSwaps=[];
     var copyArray:number[] = this.array.slice();
     this.quickSort(0,copyArray.length-1,copyArray);
     
     this.executeSwapList();

  }
  partition(left:number,right:number,array:number[])
  {
    // setting pivot allways last element
    var i:     number = left;
    var j:     number = left-1;
    var pivot: number = array[right];
    
    while(i<right)
    {
       if(array[i]<pivot)
       {
           j++;
           this.listOfSwaps.push({i:i,j:j});
           var tmp: number = array[i];
           array[i] = array[j];
           array[j] = tmp;
       }
       i++;
    }

    j++;
    this.listOfSwaps.push({ i: j , j: right });
    var tmp: number=array[j];
    array[j]=array[right];
    array[right]=tmp;

    return j;
  }
  quickSort(left:number,right:number,array:number[])
  {
     if(left<right)
     {
        var mid: number=this.partition(left,right,array);

        this.quickSort(left,mid-1,array);

        this.quickSort(mid+1,right,array);
     }
  }
  
  startMergeSort()
  {
    this.listOfSwaps=[];
    var copyArray:number[] = this.array.slice();
    this.mergeSort(0,copyArray.length,copyArray);
    
    this.executeSwapListMergeSort();
  }
  merge(left:number,right:number,mid:number,array:number[])
  {
      var leftArray: number[]=array.slice(left,mid+1);
      var rigthArray: number[]=array.slice(mid+1,right+1);

      console.log('merge: '+left+','+right+','+mid+' ls: '+leftArray.length+' rs: '+rigthArray.length);

      var leftCounter:number=0;
      var rigthCounter:number=0;
      var mainCounter:number=left;

      while(leftCounter<leftArray.length && rigthCounter<rigthArray.length)
      {
          if(leftArray[leftCounter]<=rigthArray[rigthCounter])
            {
              this.listOfSwaps.push({i: mainCounter,j: leftArray[leftCounter]}); 
              // no swaps in mergesort
              // need to pass index of array and value to insert instead of  index of swapping items
              array[mainCounter]=leftArray[leftCounter];
              mainCounter++;leftCounter++;
            }
          else 
            {
              this.listOfSwaps.push({i: mainCounter,j: rigthArray[rigthCounter]});
              array[mainCounter]=rigthArray[rigthCounter];
              mainCounter++;rigthCounter++;
            }
      }

// setting remaining values
      while(leftCounter<leftArray.length)
        {
          this.listOfSwaps.push({i: mainCounter,j: leftArray[leftCounter]}); 
          array[mainCounter]=leftArray[leftCounter];
          mainCounter++;leftCounter++;
          
        }

      while(rigthCounter<rigthArray.length)
        {
          this.listOfSwaps.push({i: mainCounter,j: rigthArray[rigthCounter]});
          array[mainCounter]=rigthArray[rigthCounter];
          mainCounter++;rigthCounter++;
        }

  }
  mergeSort(left:number,right:number,array:number[])
  {
      if(left<right)
      {
        var mid: number=Math.floor(left+(right-left)/2); //// REMINDER !!!!! NUMBER IS NOT INT !!!!!! so Math.floor is needed
//        console.log('MERGESORT: '+left+','+mid+','+right);
        this.mergeSort(left,mid,array);
//        console.log('MERGESORT: '+left+','+mid+','+right);
        this.mergeSort(mid+1,right,array);

        this.merge(left,right,mid,array);
      }
      
  }

  executeSwapList()
  {
    this.counter=this.listOfSwaps.length;
    console.log('amount of swaps: '+this.counter);
    this.listOfSwaps.reverse();

    this.timerID = setInterval( 
      ()=>{
        this.swap(this.array,this.listOfSwaps.pop());
        console.log('running:'+this.counter); 
        this.counter--;
        if(this.counter<=0)clearInterval(this.timerID);
      }, this.stopTime );
  }

  executeSwapListMergeSort()
  {
    this.counter=this.listOfSwaps.length;
    console.log('amount of swaps: '+this.counter);
    this.listOfSwaps.reverse();

    this.timerID = setInterval( 
      ()=>{
        
        var tmp: SwapPaar = this.listOfSwaps.pop();   // hier zuweisung anstelle von swap ! 
        this.array[tmp.i]=tmp.j;

        console.log('running:'+this.counter); 
        this.counter--;
        if(this.counter<=0)clearInterval(this.timerID);
      }, this.stopTime );

  }

  
  clean(){this.listOfSwaps=[]; this.array=[];}

  swap(array: number[],swap: SwapPaar)
  {
    // the quotation mark is resolving error if type is unknown
    var tmp =array[swap?.i];
    array[swap?.i]=array[swap?.j];
    array[swap?.j]=tmp;
  }

  ngOnInit(): void {
  }

}
