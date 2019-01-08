import {Team} from "../../team/entity";

export class User {
    id: string;
    name: string;
    surname: string;
    team: Team;

    constructor(id: string, name: string, surname: string, team: Team) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.team = team;
    }
}
