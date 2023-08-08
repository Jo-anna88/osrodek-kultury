import {ICulturalEvent} from "./cultural-event";

export const mockCulturalEvents: Array<ICulturalEvent> = [
  {
    imgSource: "assets/images/cultural-event1.jpg",
    title: "Event1",
    date: new Date(2023, 11, 12),
    description: "Event1 - description"
  },
  {
    imgSource: "assets/images/cultural-event2.jpg",
    title: "Event2",
    date: new Date(2023, 12, 1),
    description: "Event2 - description"
  },
  {
    imgSource: "assets/images/cultural-event3.jpg",
    title: "Event3",
    date: new Date(2023, 12, 10),
    description: "Event3 - description"
  }
]
