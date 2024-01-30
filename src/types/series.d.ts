export interface SeriesResponse {
    score: number;
    show: Show;
}

export interface Show {
    id: number;
    url: string;
    name: string;
    type: string;
    genres: string[];
    rating: Rating;
    image: Image | null;
    summary: string | null;
}

export interface Rating {
    average: number | null;
}

export interface Image {
    medium: string;
    original: string;
}

export interface CastMember {
    person: Person;
    character: Character;
    self: boolean;
    voice: boolean;
}

interface Person {
    id: number;
    url: string;
    name: string;
    country: Country;
    birthday: string | null;
    deathday: string | null;
    gender: string;
    image: Image;
    updated: number;
    _links: Links;
}

interface Character {
    id: number;
    url: string;
    name: string;
    image: Image;
    _links: Links;
}

interface Country {
    name: string;
    code: string;
    timezone: string;
}

interface Image {
    medium: string;
    original: string;
}

interface Links {
    self: { href: string };
}

