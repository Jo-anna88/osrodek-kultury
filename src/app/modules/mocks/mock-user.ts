import {Role, User} from "../../shared/models/user.model";
import {SIMPLE_TEXT_SHORT} from "../../../assets/constants";

export const CLIENT_MOCK: User = {
  id: "1",
  firstName: "Ewa",
  lastName: "Nowak",
  phone: "123-456-789",
  username: "ewa.nowak@o2.pl",
  age: 33,
  headshot: "assets/images/avatar4.svg",
  role: Role.Client
}

export const EMPLOYEE_MOCK: User = {
  id: "2",
  firstName: "Katarzyna",
  lastName: "Kowalska",
  phone: "456-789-123",
  username: "katarzyna.kowalska@ccw.pl",
  age: 28,
  headshot: "assets/images/avatar2.svg",
  role: Role.Employee,
  position: "Teacher",
  description: SIMPLE_TEXT_SHORT
}

export const ADMIN_MOCK: User = {
  id: "3",
  firstName: "Paweł",
  lastName: "Zorro",
  phone: "456-789-123",
  username: "pawel.zorro@ccw.pl",
  age: 42,
  headshot: "assets/images/avatar1.svg",
  role: Role.Admin,
  position: "Director",
  description: SIMPLE_TEXT_SHORT
}

let child1: User = {
  id: "4",
  firstName: "Kunegunda",
  lastName: "Nowak",
  phone: "123-456-789", // parent's phone
  username: "ewa.nowak@o2.pl/Kunegunda",
  age: 5,
  headshot: "assets/images/avatar-girl.svg",
  role: Role.Client
}
let child2: User = {
  id: "5",
  firstName: "Stefania",
  lastName: "Nowak",
  phone: "123-456-789", // parent's phone
  username: "ewa.nowak@o2.pl/Stefania",
  age: 12,
  headshot: "assets/images/avatar-girl.svg",
  role: Role.Client
}
let child3: User = {
  id: "6",
  firstName: "Krzysztof",
  lastName: "Nowak",
  phone: "123-456-789", // parent's phone
  username: "ewa.nowak@o2.pl/Krzysztof",
  age: 16,
  headshot: "assets/images/avatar-boy.svg",
  role: Role.Client
}
export const mockChildren: User[] = [child1, child2, child3]
