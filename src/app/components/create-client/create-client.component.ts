import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  createClient:FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  title = 'Add Client';
  buttonText = 'Add';

  constructor(private fb: FormBuilder,
              private clientService: ClientService,
              private router: Router,
              private toastr: ToastrService,
              private aRoute: ActivatedRoute) { 
    this.createClient = this.fb.group({
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      age: ['',Validators.required],
      birthDate: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');   
  }

  ngOnInit(): void {
    this.isEdit();
  }

  addEditClient(){
    this.submitted = true;

    if(this.createClient.invalid){
      return;
    }

    if(this.id === null){
      this.addClient();
    }else{
      this.editClient(this.id);
    }   
  }

  addClient(){
    const client: any = {
      name: this.createClient.value.name,
      lastName: this.createClient.value.lastName,
      age: this.createClient.value.age,
      birthDate: this.createClient.value.birthDate,
      createdAt: new Date()
    }
    this.loading = true;

    this.clientService.addClient(client).then(() =>{
      this.toastr.success('Client saved successfully', 'Client registered');
      this.loading = false;      
      this.router.navigate(['/list-clients']);

    }).catch(error =>{
      console.log(error);
      this.loading = false;
    });    
  }

  editClient(id:string){
   
    const client: any = {
      name: this.createClient.value.name,
      lastName: this.createClient.value.lastName,
      age: this.createClient.value.age,
      birthDate: this.createClient.value.birthDate      
    }

    this.loading = true;
    this.clientService.updateClient(id, client).then(()=>{
      this.loading = false;
      this.toastr.info('Client updated sucessfully','Client updated');
      this.router.navigate(['/list-clients']);
    })
  }

  isEdit(){    
    if(this.id !== null){
      this.title = 'Edit Client'
      this.buttonText = 'Edit'
      this.loading = true;
      this.clientService.getClient(this.id).subscribe(data=>{
        this.loading = false;        
        this.createClient.setValue({
          name: data.payload.data()['name'],
          lastName: data.payload.data()['lastName'],
          age: data.payload.data()['age'],
          birthDate: data.payload.data()['birthDate'],
        })
      })
    }
  }



}
