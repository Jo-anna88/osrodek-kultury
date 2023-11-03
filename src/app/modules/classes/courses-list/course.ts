// export interface ICourse {
//   id: number,
//   imgSource: string,
//   name: string,
//   teacher: string,
//   description: string
// }
export class ICourse {
  id: number;
  imgSource: string;
  name: string;
  teacher: string;
  description: string;
  constructor(id: number, imgSource: string, name: string, teacher: string, description: string) {
    this.id=id;
    this.imgSource=imgSource;
    this.name=name;
    this.teacher=teacher;
    this.description=description;
  }

}
