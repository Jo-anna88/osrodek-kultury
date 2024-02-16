export enum ModalType {
  DELETE_CONFIRMATION = "delete",
  SIGNUP = "signup",
  CREATE_COURSE = "createCourse",
  UPDATE_COURSE = "updateCourse",
  CREATE_COURSE_DETAILS = "createCourseDetails",
  UPDATE_COURSE_DETAILS = "updateCourseDetails"
}
export enum ButtonAction {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
  CANCEL = "Cancel",
  NONE = ""
}

export interface ModalConfiguration {
  isClosable?: boolean,
  // isTitle?: boolean, // maybe it is not needed, because we can use: if(this.modalTitle) this.isTitle = true;
  title? : string,
  data?: any // np. dane inicjalizujące do formularza przy Update, lub słowo-klucz w Delete, które określa item, który użytkownik oznaczył do usunięcia
}
