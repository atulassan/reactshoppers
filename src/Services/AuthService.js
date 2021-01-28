import axios from "axios";

const API_URL = "https://mycoid.ch/api/v1/auth/";

class AuthService {
  login(loginData) {
    return axios
      .post(API_URL + "login", loginData)
      .then((response) => {
        console.log('Login',response);
        if (response.data.response) {
            localStorage.setItem("user", JSON.stringify(response.data.response));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(regiserData) {
    return axios.post(API_URL + "signup", regiserData);
  }
}

export default new AuthService();