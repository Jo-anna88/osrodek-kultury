import {AppLocation} from "../../shared/models/address.model";

export class Course {
  id?: string; // UUID
  imgSource?: string;
  name: string;
  teacher: Teacher;
  description: string;
  category: Category;
  //courseDetails? : CourseDetails;
  maxParticipantsNumber?: number;
  freeSlots?: number; // get from backend
  constructor(imgSource: string, name: string, teacher: Teacher, description: string, category: Category, maxParticipantsNumber: number) {
    this.imgSource = imgSource;
    this.name=name;
    this.teacher=teacher;
    this.description=description;
    this.category=category;
    this.maxParticipantsNumber = maxParticipantsNumber;
  }
}

export class CourseDetails {
  id?: string;
  minAge?: number;
  maxAge?: number;
  price?: string; // cena za kurs / semestr
  //roomId?: number; // nr sali (osobna TABELA Room)
  lessonDurationMinutes?: number; // czas trwania zajęć
  date?: string; // termin, e.g., "Mon 13:00 - 13:45" (teoretycznie można tu wykorzystać informację o czasie trwania zajęć)
  location?: AppLocation;

  constructor(minAge: number, maxAge: number, price: string, lessonDurationMinutes: number, date: string, location: AppLocation) {
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.price = price;
    this.lessonDurationMinutes = lessonDurationMinutes;
    this.date = date;
    this.location = location;
  }
}

export enum Category {
  art = 'ART',
  dance = 'DANCE',
  education = 'EDUCATION',
  music = 'MUSIC',
  sport = 'SPORT',
  default = 'OTHER'
}

export interface Teacher { // or: PersonFullName
  id?: string, // UUID
  firstName?: string,
  lastName?: string
}

export const DEFAULT_IMG_SOURCE = "assets/icons/default.png"
export const DEFAULT_CATEGORY = Category.default;
