import {Category, Course} from "../course";
import {SIMPLE_TEXT} from "../../../../assets/constants";

export const mockCourses: Course[] = [
  {
    id: "1",
    imgSource: "assets/icons/ballet-shoes.png",
    name: "Ballet",
    teacher: "Anna Baletowicz",
    description: SIMPLE_TEXT,
    category: Category.dance
  },
  {
    id: "2",
    imgSource: "assets/icons/chess.png",
    name: "Chess",
    teacher: "Igor Szachista",
    description: SIMPLE_TEXT,
    category: Category.sport
  },
  {
    id: "3",
    imgSource: "assets/icons/guitar.png",
    name: "Guitar",
    teacher: "Jan Muzyk",
    description: SIMPLE_TEXT,
    category: Category.music
  },
  {
    id: "4",
    imgSource: "assets/icons/pottery.png",
    name: "Pottery",
    teacher: "Katarzyna Waza",
    description: SIMPLE_TEXT,
    category: Category.art
  },
  {
    id: "5",
    imgSource: "assets/icons/theatre.png",
    name: "Theatre",
    teacher: "Agnieszka Teatralna",
    description: SIMPLE_TEXT,
    category: Category.art
  },
  {
    id: "6",
    imgSource: "assets/icons/microphone.png",
    name: "Vocal",
    teacher: "Łukasz Wokalista",
    description: SIMPLE_TEXT,
    category: Category.music
  },
]
