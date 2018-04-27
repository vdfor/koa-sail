const dev = {
  jwtSecret: 'test',
  log4js: {
    appenders: {
      sail: {
        type: 'console'
      }
    },
    categories: {
      default: {
        appenders: [
          'sail'
        ],
        level: 'ALL'
      }
    }
  },
  db: {},
  port: 3000
};

export default dev;
