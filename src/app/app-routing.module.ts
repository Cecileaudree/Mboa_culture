import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'niveaux',
    loadChildren: () => import('./niveaux/niveaux.module').then( m => m.NiveauxPageModule)
  },
  {
    path: 'nombre-jouers',
    loadChildren: () => import('./nombre-jouers/nombre-jouers.module').then( m => m.NombreJouersPageModule)
  },
  {
    path: 'quiz-p',
    loadChildren: () => import('./quiz-p/quiz-p.module').then( m => m.QuizPPageModule)
  },  {
    path: 'resulta-p',
    loadChildren: () => import('./resulta-p/resulta-p.module').then( m => m.ResultaPPageModule)
  },
  {
    path: 'propose-question',
    loadChildren: () => import('./propose-question/propose-question.module').then( m => m.ProposeQuestionPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
