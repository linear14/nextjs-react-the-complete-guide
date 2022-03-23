const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        key1: "value1 for development",
        key2: "value2 for development",
      },
    };
  }

  // dev server 이외의 경우를 칭하지만, production이라고 봐도 괜찮을 것 같음
  return {
    env: {
      key1: "value1 for production",
      key2: "value2 for production",
    },
  };
};

// 참조 방식
// process.env.key
