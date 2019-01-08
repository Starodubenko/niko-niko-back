import {Injectable} from '@nestjs/common';
import {Team} from './entity';
import {Observable, of} from "rxjs";

@Injectable()
export class TeamService {
    private teamArray = [
        new Team('1', 'Team_One'),
        new Team('2', 'Team_Two'),
        new Team('3', 'Team_Three'),
    ];

    getById(id: string): Observable<Team> {
        return of(this.teamArray.filter(user => user.id === id)[0] || null);
    }
}
