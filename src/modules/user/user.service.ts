import {Injectable} from '@nestjs/common';
import {User} from './entity';
import {Observable, of} from "rxjs";

@Injectable()
export class UserService {
    private userArray = [
        new User('1', 'John', 'Doe', {
            id: '1',
            title: 'Team_One'
        }),
        new User('2', 'Michael', 'Smith', {
            id: '2',
            title: 'Team_Twoo'
        }),
        new User('3', 'Colin', 'Barker', {
            id: '3',
            title: 'Team_Three'
        }),
    ];

    getById(id: string): Observable<User> {
        return of(this.userArray.filter(user => user.id === id)[0] || null);
    }

    findByCredentials(username: string, password: string): Observable<User> {
        if (username === '1' && password == '1') {
            return of(this.userArray[0]);
        }

        if (username === '2' && password == '2') {
            return of(this.userArray[1]);
        }

        return of(null);
    }
}
