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

/*

export enum Locations {
  "Wieliszew" = "CCW headquarters - Wieliszew", // id=1
  "Olszewnica" = "CCW branch - Olszewnica", //id=2
  "Skrzeszew" = "CCW branch - Skrzeszew", //id=3
  "Komornica" = "CCW branch - Komornica" //id=4
}

const mock_addresses: Array<Address> = [
    {id:1, location: Locations.Wieliszew, city: "Wieliszew", zipCode: "05-135", street: "Kulturalna", houseNumber: "1"},
    {id:2, location: Locations.Olszewnica, city: "Olszewnica", zipCode: "05-135", street: "Artystyczna", houseNumber: "2"},
    {id:3, location: Locations.Skrzeszew, city: "Skrzeszew", zipCode: "05-135", street: "Teatralna", houseNumber: "3"},
    {id:4, location: Locations.Komornica, city: "Komornica", zipCode: "05-135", street: "Sportowa", houseNumber: "4"}
]

const entries: Array<[Locations, Address]> = [
  [Locations.Wieliszew, {city: "Wieliszew", zipCode: "05-135", street: "Kulturalna", houseNumber: "1"}],
  [Locations.Olszewnica, {city: "Olszewnica", zipCode: "05-135", street: "Artystyczna", houseNumber: "2"}],
  [Locations.Skrzeszew, {city: "Skrzeszew", zipCode: "05-135", street: "Teatralna", houseNumber: "3"}],
  [Locations.Komornica, {city: "Komornica", zipCode: "05-135", street: "Sportowa", houseNumber: "4"}]
];

export const addresses: Map<Locations, Address> = new Map(entries);

*/

