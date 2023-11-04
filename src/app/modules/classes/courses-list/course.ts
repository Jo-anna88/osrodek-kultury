// export interface ICourse {
//   id: number,
//   imgSource: string,
//   name: string,
//   teacher: string,
//   description: string
// }
export class ICourse {
  id: string; // UUID
  imgSource: string;
  name: string;
  teacher: string;
  description?: string;
  constructor(id: string, imgSource: string, name: string, teacher: string, description?: string) {
    this.id=id;
    this.imgSource=imgSource;
    this.name=name;
    this.teacher=teacher;
    this.description=description;
  }

}
