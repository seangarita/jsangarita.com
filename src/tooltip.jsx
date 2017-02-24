const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const SharedStyles = require("./styles/sharedStyles.js");
const StyleConstants = require("./styles/styleConstants.js");

const PropTypes = React.PropTypes;

class Tooltip extends React.Component {
  componentDidMount() {
    const tooltipEl = this.refs.tooltip;
    const tooltipTextEl = this.refs.tooltipText;

    tooltipEl.onmouseenter = () => {
      tooltipTextEl.className = css(styles.text, styles.visible);
    };

    tooltipEl.onmouseleave = () => {
      tooltipTextEl.className = css(styles.text, styles.hidden);
    };
  }

  render() {
    return (
      <div className={css(styles.tooltipWrapper, SharedStyles.mobileHidable)}>
        <div className={css(styles.tooltip)} ref="tooltip">
          ?
          <span
            className={css(styles.text, styles.hidden)}
            ref="tooltipText"
          >
            {this.props.text}
          </span>
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  tooltipWrapper: {
    alignItems: "center",
    cursor: "default",
    display: "inline-block",
    marginLeft: "5px",
  },
  tooltip: {
    backgroundColor: "#ddd",
    borderRadius: "50px",
    color: "black",
    fontSize: "8px",
    lineHeight: "14px",
    position: "relative",
    textAlign: "center",
    width: "14px",
  },
  text: {
    backgroundColor: "black",
    color: "white",
    fontSize: "14px",
    fontWeight: StyleConstants.light,
    fontStyle: "italic",
    left: "20px",
    lineHeight: "16px",
    padding: "20px 15px",
    position: "absolute",
    textAlign: "center",
    top: "0px",
    width: "240px",
    zIndex: 1,
  },
  hidden: {
    opacity: "0",
    visibility: "hidden",
  },
  visible: {
    opacity: "1",
    transitionDuration: StyleConstants.animationDuration,
    transitionTimingFunction: StyleConstants.animationEase,
    transitionProperty: "opacity, visibility",
    visibility: "visible",
  },
});

module.exports = Tooltip;
