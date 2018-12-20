export class User {
    id: string;
    name: string;
    surname: string;
    team: string;

    constructor(id: string, name: string, surname: string, team: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.team = team;
    }
}
