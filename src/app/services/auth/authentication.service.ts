import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { User } from 'src/app/models/User/user.model';
import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userLogged = new BehaviorSubject<User | undefined>(undefined);
  private currentUser: User | undefined = undefined;

  constructor(private auth: Auth, private userService: UserService, private router: Router) {
    onAuthStateChanged(auth,(user)=>{
      console.log(user);
      if (user!){
        this.setUser(user!.uid)
      }else{
        this.currentUser=undefined;
      }
    })
  }

  get isLoggedIn(){
    return this.userLogged.asObservable(); // convierte el loggedIn a un Observable para poder suscribirse
  }

  getLogedUser(){
    return this.currentUser!
  }

  setUser(id: string) {
    this.userService.getUserById(`users/${id}`)
      .then(docData => {
        this.currentUser = {
          id: id,
          username: docData!['username'],
          email: docData!['email'],
          is_admin: docData!['is_admin'],
          photo_url: docData!['photo_url']
        };
        this.userLogged.next(this.currentUser)
        console.log(this.userLogged)
      })
  }

  async logout() {
    await signOut(this.auth)
    this.currentUser = undefined;
    this.userLogged.next(undefined)
  }

  loginWithEmailAndPassword(email: string, password: string){
    return signInWithEmailAndPassword(this.auth,email,password)
    .then(() =>{
      this.router.navigate(['/']);
    })
  }

  createUserWithEmailAndPassword(email: any, password: any, username: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user: User = {
          id: userCredential.user.uid,
          email: userCredential.user.email!,
          is_admin:false,
          photo_url: "none",
          username: username,
        }
        this.userService.createUser(user)
        .then(()=>{
          this.router.navigate(['']);
        })
      })
  }
}
