import { PrMapComponent } from './layouts/pr-map/pr-map.component';
import { TemplatesListComponent } from './layouts/templates-list/templates-list.component';
import { PreviewImageComponent } from './layouts/preview-image/preview-image.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AnimationCameraComponent } from './layouts/animation-camera/animation-camera.component';
import { NiyamSelectionComponent } from './layouts/niyam-selection/niyam-selection.component';
import { NiyamsPreviewComponent } from './layouts/niyams-preview/niyams-preview.component';

const routes: Routes =[
    { path: '', redirectTo: 'booths', pathMatch: 'full' },
    { path: 'camera',             component: AnimationCameraComponent },
    { path: 'preview',             component: PreviewImageComponent },
    { path: 'booths',           component: TemplatesListComponent},
    { path: 'niyam-selection',           component: NiyamSelectionComponent},
    { path: 'niyams-preview',           component: NiyamsPreviewComponent},
    { path: 'pr',           component: PrMapComponent},
    { path: 'home',             component: ComponentsComponent },
    { path: '**', redirectTo: ''},
    // { path: 'user-profile',     component: ProfileComponent },
    // { path: 'signup',           component: SignupComponent },
    // { path: 'landing',          component: LandingComponent },
    // { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
