module.exports = class MockStorage {
  static load() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('{"1986-02-05": "red"}'));
    });
  }
}