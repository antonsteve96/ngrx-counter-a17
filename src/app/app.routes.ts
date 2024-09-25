import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CounterComponent} from "./counter/counter/counter.component";
import {PostsListComponent} from "./posts/posts-list/posts-list.component";
import {AddPostComponent} from "./posts/add-post/add-post.component";
import {EditPostComponent} from "./posts/edit-post/edit-post.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {AccountActivationComponent} from "./auth/account-activation/account-activation.component";


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'counter', component: CounterComponent},
  {
    path: 'posts', component: PostsListComponent, children: [
      {path: 'add', component: AddPostComponent},
      {path: 'edit/:id', component: EditPostComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'account-activation', component: AccountActivationComponent}
];
