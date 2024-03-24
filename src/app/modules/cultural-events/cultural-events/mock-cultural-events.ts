import {CulturalEvent} from "./cultural-event";
import {SIMPLE_TEXT} from "../../../../assets/constants";

export const mockCulturalEvents: Array<CulturalEvent> = [
  {
    imgSource: "assets/images/cultural-event1.jpg",
    name: "Event1",
    date: new Date(2023, 11, 12),
    description: "Event1 - description. " + SIMPLE_TEXT + " " + SIMPLE_TEXT
  },
  {
    imgSource: "assets/images/cultural-event2.jpg",
    name: "Event2",
    date: new Date(2023, 10, 10),
    description: "Event2 - description. " + SIMPLE_TEXT
  },
  {
    imgSource: "assets/images/cultural-event3.jpg",
    name: "Event3",
    date: new Date(2023, 10, 5),
    description: "Event3 - description. " + SIMPLE_TEXT
  }
]
