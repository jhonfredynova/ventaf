// eslint-disable-next-line import/prefer-default-export
export const runMiddleware = (req, res, fn) => new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      
      return resolve(result);
    });
  });