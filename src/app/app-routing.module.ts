import { CartComponent } from './cart/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ComputersComponent } from './computers/computers.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MonitorsComponent } from './monitors/monitors.component';
import { MycartComponent } from './mycart/mycart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PaypalComponent } from './paypal/paypal.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { SignupComponent } from './signup/signup.component';
import { TabletsComponent } from './tablets/tablets.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component: LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'product',component: ProductComponent},
  {path:'mycart',component: CartComponent},
  {path:'contactus',component: ContactusComponent},
  {path:'about',component: AboutComponent},
  {path:'pc',component:ComputersComponent},
  {path:'monitors',component:MonitorsComponent},
  {path:'tablets',component:TabletsComponent},
  {path:'logout',component:LoginComponent},
  {path:'paypal',component:PaypalComponent},
  {path:'signup',component:SignupComponent},
  {path:'product/:prodId',component:ProductDetailsComponent},
  {path: '**',component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
