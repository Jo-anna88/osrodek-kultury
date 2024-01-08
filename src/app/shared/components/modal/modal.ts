export enum ModalBtnAction {
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
}