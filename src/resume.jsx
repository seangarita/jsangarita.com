const Moment = require("moment");
const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const SharedStyles = require("./styles/sharedStyles.js");
const StyleConstants = require("./styles/styleConstants.js");
const Tooltip = require("./tooltip.jsx");

const PropTypes = React.PropTypes;

class ExperienceItem extends React.Component {
  render() {
    const itemData = this.props.itemData;

    const inputDateFormat = "MMM-YYYY";
    const outputDateFormat = "MMM' YY";

    const startDate = Moment(itemData.startDate, inputDateFormat);
    const endDate = !!itemData.endDate
      ? Moment(itemData.endDate, inputDateFormat)
      : null;

    const durationString = !!endDate
      ? ` (~${Moment.duration(endDate.diff(startDate)).humanize()})`
      : "";

    const timeString =
      `${startDate.format(outputDateFormat)} - ` +
      `${!!endDate ? endDate.format(outputDateFormat) : "Present"} ` +
      durationString;

    let itemName;
    if (itemData.link) {
      itemName =
      <div className={css(styles.itemName, SharedStyles.textHoverAnimation)}>
        <a href={itemData.link} target="_blank">{itemData.name}</a>
      </div>
    } else {
      itemName = <div className={css(styles.itemName)}>{itemData.name}</div>
    }

    return (
      <div className={css(styles.item)}>
        <div className={css(styles.itemHeader)}>
          {itemName}
          {!!itemData.moreInfo ? <Tooltip text={itemData.moreInfo}/> : null}
        </div>
        <div className={css(styles.itemInfoString)}>
          {`${itemData.jobTitle} / ${itemData.location} / ${timeString}`}
        </div>
        <div className={css(styles.itemBody)}>
          <ul className={css(styles.itemMain)}>
            {itemData.accomplishments.map((accomplishment, idx) => {
              return (
                <li
                  key={idx}
                  className={css(styles.accomplishment)}
                >
                  - {accomplishment}
                </li>
              );
            })}
          </ul>
          <div className={css(styles.technologies, SharedStyles.mobileHidable)}>
            {itemData.technologies.map((technology, idx) => {
              return (
                <div
                  key={idx}
                  className={css(styles.technology)}
                >
                  {`{ ${technology} }`}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ExperienceItem.propTypes = {
  itemData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    jobTitle: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    moreInfo: PropTypes.string.isRequired,
    accomplishments: PropTypes.arrayOf(PropTypes.string).isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

class ProjectItem extends React.Component {
  render() {
    const itemData = this.props.itemData;

    return (
      <div className={css(styles.item)}>
        <div className={css(styles.itemHeader)}>
          <div className={css(styles.itemName)}>{itemData.name}</div>
        </div>
        <div className={css(styles.itemInfoString)}>
          {itemData.year}
        </div>
        <div className={css(styles.itemBody)}>
          <div className={css(styles.itemMain)}>{itemData.description}</div>
          <div className={css(styles.technologies, SharedStyles.mobileHidable)}>
            {itemData.technologies.map((technology, idx) => {
              return (
                <div
                  key={idx}
                  className={css(styles.technology)}
                >
                  {`{ ${technology} }`}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  itemData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

class Resume extends React.Component {
  render() {
    const technologiesHeader =
      <h1 className={
        css(
          styles.headerOne, styles.technologiesHeader,
          SharedStyles.mobileHidable
        )
      }>
        Technologies
      </h1>

    return (
      <div>
        {this.props.data.dataArray.map((section, idx) => {
          return (
            <div key={idx}>
              <div className={css(styles.sectionHeader)}>
                <h1 className={css(styles.headerOne, styles.mainHeader)}>
                  <span className={css(SharedStyles.yellow)}>/</span>
                  <span className={css(SharedStyles.blue)}>/</span>
                  <span className={css(SharedStyles.red)}>/</span>
                  / {section.sectionName}
                </h1>
                {(idx === 0) ? technologiesHeader : null}
              </div>
              {section.sectionData.map((item, idx) => {
                switch (section.sectionName) {
                  case "Experience":
                    return <ExperienceItem itemData={item} key={idx}/>;
                  case "Projects":
                    return <ProjectItem itemData={item} key={idx}/>;
                  default:
                    throw new Error("Not a valid section name.");
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

Resume.propTypes = {
  data: PropTypes.shape({
    dataArray: PropTypes.arrayOf(PropTypes.shape({
      sectionName: PropTypes.string.isRequired,
      sectionData: PropTypes.arrayOf(PropTypes.object).isRequired,
    })).isRequired
  }).isRequired,
};

const styles = StyleSheet.create({
  headerOne: {
    fontSize: "36px",
    fontWeight: StyleConstants.bold,
  },
  sectionHeader: {
    display: "flex",
    marginTop: "50px",
    marginBottom: "30px",
    "@media (max-width: 960px)": {
      paddingLeft: "25px",
    },
  },
  mainHeader: {
    flexGrow: 1,
  },
  technologiesHeader: {
    flexBasis: StyleConstants.technologiesWidth,
    textAlign: "center",
  },
  item: {
    marginBottom: "30px",
    "@media (max-width: 960px)": {
      paddingLeft: "25px",
      paddingRight: "25px",
    },
  },
  itemName: {
    display: "inline-block",
    fontSize: "24px",
    fontWeight: StyleConstants.bold,
    verticalAlign: "middle",
  },
  itemHeader: {
    marginBottom: "10px",
  },
  itemInfoString: {
    color: StyleConstants.grey,
    fontSize: "18px",
    fontWeight: StyleConstants.regular,
    marginBottom: "20px",
    "@media (max-width: 960px)": {
      fontSize: "12px",
    },
  },
  itemBody: {
    alignItems: "center",
    display: "flex",
  },
  itemMain: {
    flex: 1,
    fontSize: "14px",
    fontWeight: StyleConstants.regular,
    lineHeight: "24px",
  },
  technologies: {
    flexBasis: StyleConstants.technologiesWidth,
    fontSize: "24px",
    fontWeight: StyleConstants.light,
    lineHeight: "28px",
  },
  technology: {
    textAlign: "center",
    width: "100%",
  },
});

module.exports = Resume;
