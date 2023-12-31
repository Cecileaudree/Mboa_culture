import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resulta-p',
  templateUrl: './resulta-p.page.html',
  styleUrls: ['./resulta-p.page.scss'],
})
export class ResultaPPage implements OnInit {

  constructor(private router:Router) { }
  data={
    taille:0,
    score:0
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.data = navigation.extras.state['resulta'];
    } else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de score
      this.router.navigate(['/quiz']);
    }

    console.log(this.data)

    this.data.taille=this.data.taille*3

  }

  reload(){
    this.data.score=0
    this.router.navigate(['/nombre-jouers'])
  }

}
