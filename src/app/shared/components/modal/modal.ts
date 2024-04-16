export enum ModalType {
  SIGNUP = "signup",
  DELETE_CONFIRMATION = "delete",
  JOIN_CONFIRMATION = "joinCourse",
  CREATE_CULTURAL_EVENT = "createCulturalEvent",
  UPDATE_CULTURAL_EVENT = "updateCulturalEvent",
  CREATE_COURSE = "createCourse",
  UPDATE_COURSE = "updateCourse",
  CREATE_COURSE_DETAILS = "createCourseDetails",
  UPDATE_COURSE_DETAILS = "updateCourseDetails",
  ADD_EMPLOYEE = "addEmployee",
  UPDATE_EMPLOYEE = "updateEmployee",
  ADD_CHILD = "addChild",
  UPDATE_CLIENT_ACCOUNT = "updateClientAccount",
}
export enum ButtonAction {
  SAVE = "Save",
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
  CANCEL = "Cancel",
  REGISTER = "Register",
  WITHDRAW = "Withdraw from class",
  CANCEL_BOOKING = "Cancel the booking",
  FILTER = "Filter",
  SORT = "Sort",
  SUBMIT = "Submit",
  NONE = ""
}

export interface ModalConfiguration {
  isClosable?: boolean,
  // isTitle?: boolean, // maybe it is not needed, because we can use: if(this.modalTitle) this.isTitle = true;
  title? : string,
  data?: any, // np. dane inicjalizujące do formularza przy Update, lub słowo-klucz w Delete, które określa item, który użytkownik oznaczył do usunięcia
  question? : string, // a field for custom question in delete/remove confirmation window
  action?: ButtonAction
}
