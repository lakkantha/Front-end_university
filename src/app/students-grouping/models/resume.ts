export class Resume {
    skills: Skill[] = [];

    constructor() {
        this.skills.push(new Skill());
    }
}

export class Skill {
    value: string;
}
