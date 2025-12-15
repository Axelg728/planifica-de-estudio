import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('../pages/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'materias',
        loadChildren: () =>
          import('../pages/materias/materias.module').then(m => m.MateriasPageModule)
      },
      {
        path: 'tareas',
        loadChildren: () =>
          import('../pages/tareas/tareas.module').then(m => m.TareasPageModule)
      },
      {
        path: 'calendario',
        loadChildren: () =>
          import('../pages/calendario/calendario.module').then(m => m.CalendarioPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../pages/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
