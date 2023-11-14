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
  constructor(name: string, teacher: string, description: string) {
    this.imgSource=DEFAULT_IMG_SOURCE;
    this.name=name;
    this.teacher=teacher;
    this.description=description;
  }
}

export const DEFAULT_IMG_SOURCE = "assets/icons/default.png"
