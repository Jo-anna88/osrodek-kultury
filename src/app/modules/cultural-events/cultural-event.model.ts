import {AppLocation} from "../../shared/models/address.model";

export interface CulturalEvent {
  id?: number,
  imgSource?: string,
  name: string,
  date?: string,
  description?: string,
  price?: string,
  location?: AppLocation,
  maxParticipantsNumber?: number
}

export const DEFAULT_IMG_SOURCE = "assets/images/cultural-event-default.jpg"
