// Export all middleware from a single entry point
import * as auth from './auth';
import * as error from './error';
import * as validation from './validation';

// Export all middleware as named exports
export { auth, error, validation };

// Export all middleware as default export
const middleware = {
  ...auth,
  ...error,
  ...validation,
};

export default middleware;
