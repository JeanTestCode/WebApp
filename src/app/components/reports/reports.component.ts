import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  average: number = 0;
  ds: number = 0;
  loadingA = false;  
  loadingB = false;  
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAverage();
    this.getStandarDesviation();
  }

  getAverage(){
    this.loadingA = true;  
    this.clientService.getClients().subscribe(data =>{      
      var sum = 0;
      data.forEach((element:any) => {
        sum = sum + element.payload.doc.data()['age'];        
      });
      this.loadingA = false; 
      this.average = sum/data.length;      
    })
  }

  getStandarDesviation(){    
    var agesArr : number[] = []; 
    this.loadingB = true;     
    this.clientService.getClients().subscribe(data =>{            
      data.forEach((element:any) => {
        agesArr.push(element.payload.doc.data()['age'])        
      });

      let mean = agesArr.reduce((acc, curr)=>{
        return acc + curr
      },0) / agesArr.length; 
      
      agesArr = agesArr.map((k)=>{
        return (k - mean) ** 2
      })        
      let sum = agesArr.reduce((acc, curr)=> acc + curr, 0);      
      this.ds = Math.sqrt(sum / agesArr.length)
      this.loadingB = false;             
    })                  
  }

}
