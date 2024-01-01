import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-propose-question',
  templateUrl: './propose-question.page.html',
  styleUrls: ['./propose-question.page.scss'],
})
export class ProposeQuestionPage implements OnInit {

  constructor(private auth:AuthService) { }

  @ViewChild(IonModal) modal!:IonModal;

  is_open:boolean=false

  question:any={}

  ngOnInit() {
  }

  close(){
    this.is_open=false
     this.modal.dismiss
  }

  save(){
    
    // this.auth.PostStudent(this.etudiant).subscribe((reponse)=>{
    //   console.log("reussi")
    // })

    this.is_open=false
    this.modal.dismiss();
 }

  handleclose(ev:any){
    this.is_open=false
  }

}
