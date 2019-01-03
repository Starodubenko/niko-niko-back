import {Injectable} from '@nestjs/common';
import {User} from './entity';
import {Observable, of} from "rxjs";

@Injectable()
export class UserService {
    private userArray = [
        new User('1', 'John', 'Doe', 'Team_One'),
        new User('2', 'Michael', 'Smith', 'Team_Two'),
        new User('3', 'Colin', 'Barker', 'Team_Three'),
    ];

    getById(id: string): Observable<User> {
        return of(this.userArray.filter(user => user.id === id)[0] || null);
    }

    findByCredentials(username: string, password: string): Observable<User> {
        if(username === '1' && password == '1'){
            return of(this.userArray[1]);
        }

        if(username === '2' && password == '2'){
            return of(this.userArray[2]);
        }

        return of(null);
    }
}
