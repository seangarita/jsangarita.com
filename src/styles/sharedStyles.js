const {StyleSheet} = require("aphrodite");

const StyleConstants = require("./styleConstants.js");

module.exports = StyleSheet.create({
  mobileHidable: {
    "@media (max-width: 960px)": {
      display: "none",
    },
  },
  yellow: {
    color: StyleConstants.yellow,
  },
  blue: {
    color: StyleConstants.blue,
  },
  red: {
    color: StyleConstants.red,
  },
  textHoverAnimation: {
    letterSpacing: "0px",
    textShadow: "none",
    transitionDuration: StyleConstants.animationDuration,
    transitionTimingFunction: StyleConstants.animationEase,
    transitionProperty: "letter-spacing, text-shadow",

    ":hover": {
      letterSpacing: "1px",
      textShadow: "2px 2px 25px rgba(0, 0, 0, 0.4)",
      transitionDuration: StyleConstants.animationDuration,
      transitionTimingFunction: StyleConstants.animationEase,
      transitionProperty: "letter-spacing, text-shadow",
    },
  },
  miscHoverAnimation: {
    transform: "none",
    boxShadow: "none",
    transitionDuration: StyleConstants.animationDuration,
    transitionTimingFunction: StyleConstants.animationEase,
    transitionProperty: "transform, box-shadow",

    ":hover": {
      transform: "scale(1.05, 1.05)",
      boxShadow: "2px 2px 25px rgba(0, 0, 0, 0.4)",
      transitionDuration: StyleConstants.animationDuration,
      transitionTimingFunction: StyleConstants.animationEase,
      transitionProperty: "transform, box-shadow",
    },
  }
});
