// export interface ICourse {
//   id: number,
//   imgSource: string,
//   name: string,
//   teacher: string,
//   description: string
// }

export class Course {
  id?: string; // UUID
  imgSource?: string;
  name: string;
  teacher: string;
  description: string;
  category: Category;
  courseDetails? : CourseDetails;
  constructor(name: string, teacher: string, description: string, category: Category) {
    this.imgSource=DEFAULT_IMG_SOURCE;
    this.name=name;
    this.teacher=teacher;
    this.description=description;
    this.category=category;
  }
}

export class CourseDetails {
  id?: string;
  maxParticipantsNumber?: number; // maksymalna liczba uczestników
  //private lista uczestników, czyli odwołanie do tabeli pośredniej (bo tu jest relacja many-to-many względem User)
  price?: string; // cena za kurs / semestr
  roomId?: number; // nr sali (osobna TABELA Room)
  lessonDurationMinutes?: number; // czas trwania zajęć
  minAge?: number;
  maxAge?: number;
  date?: string; // termin, e.g., "Mon 13:00 - 13:45" (teoretycznie można tu wykorzystać informację o czasie trwania zajęć)
}

export enum Category {
  art = 'ART',
  dance = 'DANCE',
  education = 'EDUCATION',
  music = 'MUSIC',
  sport = 'SPORT',
  default = 'OTHER'
}

export const DEFAULT_IMG_SOURCE = "assets/icons/default.png"
export const DEFAULT_CATEGORY = Category.default;
