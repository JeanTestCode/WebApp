import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {  
  clients: any[] = [];

  constructor(private clientService: ClientService,
              private toastr: ToastrService) {  
    
   }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.clientService.getClients().subscribe(data =>{
      this.clients = [];
      data.forEach((element:any) => {
        var newDate = new Date();        
        newDate.setDate(newDate.getDate()+ (Math.random()*(6000-4500)+4500));     
        var deathDate = newDate.toISOString().split('T')[0]
        this.clients.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
          deathDate: deathDate
        })
      });     
    })
  }

  deleteClient(id:string){
    this.clientService.deleteClient(id).then(()=>{
      this.toastr.error('Client was deleted successfully','Client deleted');
    }).catch(error =>{
      console.log(error);
    })
  }

  addDays(days:number){

  }

}
