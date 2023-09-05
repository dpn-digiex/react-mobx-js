import { makeAutoObservable } from "mobx";

class SampleStore {
  saveHandler = []; // remove if not have side effects
  constructor() {
    makeAutoObservable(this);
  }

  // core functions
  reset = () => {};
  destroy = () => {
    this.reset();
    this.saveHandler.forEach(disposer => disposer());
  };
}

export default SampleStore;
