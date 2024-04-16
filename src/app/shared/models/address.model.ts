export interface Address {
  id?: number,
  location?: string,
  city: string;
  zipCode: string;
  street: string;
  houseNumber: string;
  flatNumber?: number; // room?
}

export interface AppLocation {
  id?: number,
  location?: string
}

export const mock_locations: Array<AppLocation> = [
  {id: 1, location: "CCW headquarters - Wieliszew"},
  {id: 2, location: "CCW branch - Olszewnica"},
  {id: 3, location: "CCW branch - Skrzeszew"},
  {id: 4, location: "CCW branch - Komornica"}
]

export const mock_addresses: Array<Address> = [
    {id:1, location: mock_locations[0].location, city: "Wieliszew", zipCode: "05-135", street: "Kulturalna", houseNumber: "1"},
    {id:2, location: mock_locations[1].location, city: "Olszewnica", zipCode: "05-135", street: "Artystyczna", houseNumber: "2"},
    {id:3, location: mock_locations[2].location, city: "Skrzeszew", zipCode: "05-135", street: "Teatralna", houseNumber: "3"},
    {id:4, location: mock_locations[3].location, city: "Komornica", zipCode: "05-135", street: "Sportowa", houseNumber: "4"}
]
