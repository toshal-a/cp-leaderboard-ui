import jwtDecode from 'jwt-decode';
import axios from 'utils/axios';

class AuthService {
  setAxiosInterceptors = ({ onLogout }) => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          this.setSession(null);

          if (onLogout) {
            onLogout();
          }
        }

        return Promise.reject(error);
      }
    );
  };

  handleAuthentication() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return;
    }

    if (this.isValidToken(accessToken)) {
      this.setSession(accessToken);
    } else {
      this.setSession(null);
    }
  }

  loginWithEmailAndPassword = (email, password) => new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('username',email);
    formData.append('password',password);
    axios.post('https://api.cp-leaderboard.me/login/access-token',formData)
      .then((response) => {
          this.setSession(response.data.access_token);
          resolve(response.data.access_token);
      })
      .catch((error) => {
        reject(error);
      });
  })

  loginInWithToken = () => new Promise((resolve, reject) => {
    axios.get('https://api.cp-leaderboard.me/user/me')
      .then((response) => {
          resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  })

  logout = () => {
    this.setSession(null);
  }

  setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common.Authorization;
    }
  }

  getAccessToken = () => localStorage.getItem('accessToken');

  isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }

    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  }

  isAuthenticated = () => !!this.getAccessToken()
}

const authService = new AuthService();

export default authService;