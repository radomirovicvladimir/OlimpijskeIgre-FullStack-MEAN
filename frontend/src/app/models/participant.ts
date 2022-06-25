import { Medals } from "./medals";

export class Participant {
    _id: string;
    firstname: string;
    lastname: string;
    country: string;
    gender: string;
    sport: string;
    discipline: string;
    type: string;
    medals: Medals;
    competitions: Array<string>
}