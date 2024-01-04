import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-propose-question',
  templateUrl: './propose-question.page.html',
  styleUrls: ['./propose-question.page.scss'],
})
export class ProposeQuestionPage implements OnInit {
  questionForm: FormGroup|any;

  constructor(private auth:AuthService,private formBuilder: FormBuilder, private toastController: ToastController) {
    this.questionForm = this.formBuilder.group({
      libelleQuestion: ['', Validators.required],
      categorie: ['', Validators.required],
      niveau: ['', Validators.required],
      reponses: this.formBuilder.array([])  // FormArray pour les réponses

  });
  }

  @ViewChild(IonModal) modal!:IonModal;

  is_open:boolean=false

  question:any={}

  ngOnInit() {
  }

  close(){
    this.is_open=false
     this.modal.dismiss
  }

  get reponses(): FormArray {
    return this.questionForm.get('reponses') as FormArray;
  }

  ajouterReponse(): void {
    const reponseGroup = this.formBuilder.group({
      libelleReponse: ['', Validators.required],
      correcte: ['Faux'],
      points: [0, Validators.min(0)]
    });

    // Écouter les changements de la case "Correcte"
    reponseGroup.get('correcte')?.valueChanges.subscribe((value:any)=> {
      if (value==='Vrai') {
        // Désactiver les autres cases "Correcte"
        this.reponses.controls.forEach((reponseCtrl, index) => {
          if (index !== this.reponses.length - 1) {
            reponseCtrl.get('correcte')?.disable();
          }
        });
      } else {
        // Activer les autres cases "Correcte"
        this.reponses.controls.forEach((reponseCtrl) => {
          reponseCtrl.get('correcte')?.enable();
        });
      }
    });

    this.reponses.push(reponseGroup);
  }


  supprimerReponse(index: number): void {
    this.reponses.removeAt(index);
  }
  save(){

    // this.auth.PostStudent(this.etudiant).subscribe((reponse)=>{
    //   console.log("reussi")
    // })

    this.is_open=false
    this.modal.dismiss();
 }

 submitForm() {
  // Vérifiez si le formulaire est valide
  if (this.questionForm.valid) {
    // Récupérez les valeurs du formulaire
    const formValues = this.questionForm.value;
    console.log(formValues)

    // Enregistrez les valeurs ou effectuez d'autres actions
    console.log('Valeurs du formulaire :', formValues);
    const Catégorie=this.questionForm.get("categorie").value
    const niveau=this.questionForm.get("niveau")
    console.log(Catégorie)
    const reponse=this.questionForm.get("reponses").value
    console.log(reponse)
    if(Catégorie=="population"){
      this.questionForm.get("categorie").setValue(1)
    }
    if(Catégorie=="Culture"){
      this.questionForm.get("categorie").setValue(4)
    }
    if(Catégorie=="Musique"){
      this.questionForm.get("categorie").setValue(3)
    }
    if(Catégorie=="Organisation des ethnies"){
      this.questionForm.get("categorie").setValue(5)
    }

    if(Catégorie=="Sport"){
      this.questionForm.get("categorie").setValue(2)
    }

    if(niveau=="Débutant"){
      this.questionForm.get("categorie").setValue(1)
    }

    if(niveau=="Intermédiaire"){
      this.questionForm.get("categorie").setValue(2)
    }

    if(niveau=="professionel"){
      this.questionForm.get("categorie").setValue(3)
    }

    if(niveau=="master"){
      this.questionForm.get("categorie").setValue(4)
    }




    this.auth.PostStudent(formValues).subscribe(reponse=>{
       console.log(reponse)
       this.presentToast('Question soumise avec succès.');
     })

    // Réinitialisez le formulaire après la soumission
    this.questionForm.reset();

    // Affichez un message de succès à l'utilisateur

  }


}

async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
  });
  toast.present();
}

  handleclose(ev:any){
    this.is_open=false
  }

}
