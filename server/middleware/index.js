// Export all middleware from a single entry point
import * as auth from './auth';
import * as error from './error';
import * as validation from './validation';

export {
  auth,
  error,
  validation
};

export default {
  ...auth,
  ...error,
  ...validation
};
