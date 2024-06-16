class DeleteRegisterError extends Error {
  value: any;
  constructor(value: any) {
    super('Error on deleted register');
    this.value = value;
  }
}
