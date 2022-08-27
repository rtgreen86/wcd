const token = '100';

const AuthMock = {
  getToken() {
    return new Promise(() => setTimeout(() => {
      return token;
    }, 100)); // fake async
  },
};

export default AuthMock;
