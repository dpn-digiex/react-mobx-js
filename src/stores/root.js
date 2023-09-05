import SampleStore from "./sample";
import UserStore from "./user";

class RootStore {
  userStore = null;
  sampleStore = null;

  constructor() {
    this.userStore = new UserStore({});
    this.sampleStore = new SampleStore();
  }

  // core functions
  destroy = () => {
    this.userStore.destroy();
    this.sampleStore.destroy();
  };
}

export const rootStore = new RootStore();
