export interface Booking {
  id?: number,
  participantId?: string, // UUID
  culturalEventId: number,
  numberOfTickets: number
}
