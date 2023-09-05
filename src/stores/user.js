import { logoutUser, signInUser } from "@apis/userService";
import { action, makeAutoObservable, observable, reaction } from "mobx";

class UserStore {
  isSignedIn = false;
  accessToken = null;
  userInfo = {};

  saveHandler = []; // Disposer all the side effects in this store

  constructor({ isSignedIn = false, accessToken = null, userInfo = {} }) {
    makeAutoObservable(this, {
      isSignedIn: observable,
      accessToken: observable,
      userInfo: observable,
      saveHandler: observable,
      signIn: action,
      logout: action,
      init: action,
      reset: action,
      destroy: action,
    });
    this.isSignedIn = isSignedIn;
    this.accessToken = accessToken;
    this.userInfo = userInfo;

    this.saveHandler = [
      reaction(
        () => this.asJson,
        json => {
          localStorage.setItem("user", json);
        }
      ),
      // define more side effects here
    ];
  }

  get asJson() {
    return {
      isSignedIn: this.isSignedIn,
      accessToken: this.accessToken,
      userInfo: this.userInfo,
    };
  }

  signIn = async userInfo => {
    const response = await signInUser({
      email: userInfo.email,
      password: userInfo.password,
    });
    if (response.status === 200) {
      this.isSignedIn = true;
      this.accessToken = response.data.accessToken;
      this.userInfo = response.data.userInfo;
    }
  };

  logout = async () => {
    const response = await logoutUser();
    if (response.status === 200) {
      this.reset();
      window.location.href = "/";
    }
  };

  // core functions
  reset = () => {
    this.isSignedIn = false;
    this.accessToken = null;
    this.userInfo = {};
  };
  destroy = () => {
    this.reset();
    this.saveHandler.forEach(disposer => disposer());
  };
}

export default UserStore;
