import {CulturalEvent} from "./cultural-event.model";
import {SIMPLE_TEXT} from "../../../assets/constants";
import {mock_locations} from "../../shared/models/address.model";

export const mockCulturalEvents: Array<CulturalEvent> = [
  {
    id: 1,
    imgSource: "assets/images/cultural-event1.jpg",
    name: "Event1",
    date: "2024-09-20",
    //date: new Date(2023, 11, 12),
    description: "Event1 - description. " + SIMPLE_TEXT + " " + SIMPLE_TEXT,
    price: "25",
    location: mock_locations[0],
    maxParticipantsNumber: 10
  },
  {
    id: 2,
    imgSource: "assets/images/cultural-event2.jpg",
    name: "Event2",
    date: "2024-07-15",
    //date: new Date(2023, 10, 10),
    description: "Event2 - description. " + SIMPLE_TEXT,
    price: "50",
    location: mock_locations[1],
    maxParticipantsNumber: 100
  },
  {
    id: 3,
    imgSource: "assets/images/cultural-event3.jpg",
    name: "Event3",
    date: "2024-08-05",
    //date: new Date(2023, 10, 5),
    description: "Event3 - description. " + SIMPLE_TEXT,
    price: "75",
    location: mock_locations[2],
    maxParticipantsNumber: 50
  },
  {
    id: 4,
    imgSource: "assets/images/cultural-event-default.jpg",
    name: "Event4",
    date: "2024-10-10",
    description: "Event4 - description. " + SIMPLE_TEXT,
    price: "100",
    location: mock_locations[3],
    maxParticipantsNumber: 25
  }
]
