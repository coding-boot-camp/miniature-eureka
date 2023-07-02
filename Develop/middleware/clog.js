// Custom middleware that logs out paths of each request to the server 
const clog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    switch (req.method) {
      case 'GET': {
        //green
        console.info(`${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      case 'POST': {
        //blue
        console.info(`${fgCyan}${req.method} request to ${req.path}`);
        break;
      }
      default:
        //yellow
        console.log(`${fgCyan}${req.method} request to ${req.path}`);
    }
    next();
  };

  exports.clog = clog;