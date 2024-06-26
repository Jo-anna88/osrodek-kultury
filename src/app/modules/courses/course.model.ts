import {AppLocation} from "../../shared/models/address.model";
import {UserSimpleData} from "../../shared/models/user.model";

export class Course {
  id?: string; // Long
  imgSource?: string;
  name: string;
  teacher: UserSimpleData;
  description: string;
  category: Category;
  maxParticipantsNumber?: number;
  freeSlots?: number;
  constructor(imgSource: string, name: string, teacher: UserSimpleData, description: string, category: Category, maxParticipantsNumber: number) {
    this.imgSource = imgSource;
    this.name=name;
    this.teacher=teacher;
    this.description=description;
    this.category=category;
    this.maxParticipantsNumber = maxParticipantsNumber;
  }
}

export interface CourseBasicInfo {
  id?: number,
  name?: string
}

export class CourseDetails {
  id?: string;
  minAge?: number;
  maxAge?: number;
  price?: string;
  lessonDurationMinutes?: number;
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

export interface CourseCriteria {
  minAge?: number,
  maxAge?: number,
  price?: string,
  teacher? : string, // User.id
  category?: Category,
  location?: number, // AppLocation.id
}

export const DEFAULT_ICON_SOURCE = "assets/icons/default.png"
export const DEFAULT_CATEGORY = Category.default;
