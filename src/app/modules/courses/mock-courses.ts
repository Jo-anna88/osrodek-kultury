import {Category, Course} from "./course";
import {SIMPLE_TEXT} from "../../../assets/constants";

export const mockCourses: Course[] = [
  {
    id: "1",
    imgSource: "assets/icons/ballet-shoes.png",
    name: "Ballet",
    teacher: {firstName: "Anna", lastName: "Baletowicz"},
    description: SIMPLE_TEXT,
    category: Category.dance,
    maxParticipantsNumber: 30,
    freeSlots: 25
  },
  {
    id: "2",
    imgSource: "assets/icons/chess.png",
    name: "Chess",
    teacher: {firstName: "Igor", lastName: "Szachista"},
    description: SIMPLE_TEXT,
    category: Category.sport,
    maxParticipantsNumber: 20,
    freeSlots: 10
  },
  {
    id: "3",
    imgSource: "assets/icons/guitar.png",
    name: "Guitar",
    teacher: {firstName: "Jan", lastName: "Muzyk"},
    description: SIMPLE_TEXT,
    category: Category.music,
    maxParticipantsNumber: 15,
    freeSlots: 5
  },
  {
    id: "4",
    imgSource: "assets/icons/pottery.png",
    name: "Pottery",
    teacher: {firstName: "Katarzyna", lastName: "Waza"},
    description: SIMPLE_TEXT,
    category: Category.art,
    maxParticipantsNumber: 10,
    freeSlots: 0
  },
  {
    id: "5",
    imgSource: "assets/icons/theatre.png",
    name: "Theatre",
    teacher: {firstName: "Agnieszka", lastName: "Teatralna"},
    description: SIMPLE_TEXT,
    category: Category.art,
    maxParticipantsNumber: 30,
    freeSlots: 15
  },
  {
    id: "6",
    imgSource: "assets/icons/microphone.png",
    name: "Vocal",
    teacher: {firstName: "Łukasz", lastName: "Wokalista"},
    description: SIMPLE_TEXT,
    category: Category.music,
    maxParticipantsNumber: 3,
    freeSlots: 1
  },
]
