import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  data={
    taille:0,
    score:0
  }

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.data = navigation.extras.state['resulta'];
    } else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de score
      this.router.navigate(['/quiz']);
    }

    this.data.taille=this.data.taille*3
  }

  reload(){
    this.router.navigate(['/categories'])
  }
}
