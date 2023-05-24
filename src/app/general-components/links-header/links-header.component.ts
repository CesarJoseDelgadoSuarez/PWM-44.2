import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-links-header',
  templateUrl: './links-header.component.html',
  styleUrls: ['./links-header.component.scss'],
})
export class LinksHeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goHome(){
    this.router.navigate(['/home']);
  }
  goLogin(){
    this.router.navigate(['/login']);
  }
}
