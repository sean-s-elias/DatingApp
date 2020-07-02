import { catchError } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class MemberLislResolver implements  Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UserService,
                private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
               this.alertify.error('Problem rettreving data');
               this.router.navigate(['/home']);
               return of(null);
            })
        );
    }
}
