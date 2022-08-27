const token = '100';

const AuthMock = {
  getToken() {
    return new Promise((resolve) => setTimeout(() => {
      resolve(token);
    }, 100)); // fake async
  },
};

export default AuthMock;
