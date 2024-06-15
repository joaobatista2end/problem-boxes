class MissingParametersError extends Error {
  missingParams: string[];

  constructor(missingParams: string[]) {
    const message = `Missing parameters: ${missingParams.join(', ')}`;
    super(message);
    this.name = 'MissingParametersError';
    this.missingParams = missingParams;
  }
}