import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // responsivemenu
  responsiveMenu: any;
  // responsivemaincontent
  responsiveContent: any;
  defaultStatus = true;
  openNav(status: any) {
    if (status === this.defaultStatus) {
      this.responsiveMenu = {
        display: 'block',
      };
      this.responsiveContent = {
        'margin-left': '150px',
      };
      this.defaultStatus = false;
    } else {
      this.responsiveMenu = {
        display: null,
      };
      this.responsiveContent = {
        'margin-left': null,
      };
      this.defaultStatus = true;
    }
  }
}
