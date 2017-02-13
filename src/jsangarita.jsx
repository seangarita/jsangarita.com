const React = require("react");
const {StyleSheet, css} = require("aphrodite");

const Data = require("./data.json");
const Resume = require("./resume.jsx");
const StyleConstants = require("./styleConstants.js");

class JSAngarita extends React.Component {
  render() {
    return (
      <div>
        <h1 className={css(styles.header1)}>
          <span className={css(styles.hello)}>Hi! My name is</span><br />
          <span className={css(styles.name)}>Juan Sebastian Angarita</span>
        </h1>
        <div className={css(styles.logoAndDescription)}>
          <div className={css(styles.logo)}>
            <img src="/img/logo.svg" />
          </div>
          <div className={css(styles.descriptionAndCTA)}>
              <p className={css(styles.description)}>
                I'm a <span className={css(styles.emphasis)}>Full Stack 
                Software Engineer</span> with an MS &amp; BS in Electrical 
                &amp; Computer Engineering from&nbsp;
                <span className={css(styles.emphasis)}>Carnegie Mellon</span>. 
                I love learning and building products that make people's lives 
                better and I work remotely from&nbsp;
                <span className={css(styles.emphasis)}>Bogot&aacute;, 
                Colombia</span>.
              </p>
              <button
                className={css(styles.CTA)}
                onClick={() => {
                  location.href=
                    "mailto:hello@jsangarita.com?Subject=Let%27s%20chat!";
                }}
              >
                Let's Chat!
              </button>
          </div>
        </div>
        <div className={css(styles.pageBreak)}>
          <div className={css(styles.pageBreakContent)}>
            <div className={css(styles.blubContainer)}>
              <div className={css(styles.blurb)}>
                One of my favorite projects was a Smart Mirror I worked on. 
                It would recognize your presence, know who you were, and show 
                you your calendar, twitter, and news feeds!
              </div>
              <div className={css(styles.blurb)}>
                Another project I worked on and really enjoyed was building a 
                drone from scratch. I 3D modeled it, 3D printed it, and wrote
                some simple linux drivers. It flew for a couple of minutes...
              </div>
            </div>
          </div>
          <img src="/img/arrow.svg" className={css(styles.arrow)}/> 
        </div>
        <div className={css(styles.resume)}>
          <Resume data={Data} />
        </div>
        <div className={css(styles.footer)}>
          <div className={css(styles.letsChatFooter, styles.footerContent)}>
            Let's Chat!&nbsp;
            <a
              href="mailto:hello@jsangarita.com?Subject=Let%27s%20chat!"
              className={css(styles.email)}
            >
              hello@jsangarita.com
            </a>
          </div>
          <div className={css(styles.createdWithLove, styles.footerContent)}>
            Created with <span className={css(styles.red)}>&hearts;</span> 
            &nbsp;in Colombia
          </div>
          <div className={css(styles.copyright, styles.footerContent)}>
            &copy; {(new Date()).getFullYear()}
          </div>
        </div>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  header1: {
    fontSize: "48px",
    margin: "50px auto",
    width: StyleConstants.defaultWidth,
  },
  hello: {
    fontWeight: StyleConstants.light,
  },
  name: {
    fontStyle: "italic",
    fontWeight: StyleConstants.medium,
  },
  logoAndDescription: {
    alignItems: "center",
    display: "flex",
    margin: "0 auto 100px auto",
    width: StyleConstants.defaultWidth,
  },
  logo: {
    flexBasis: 0,
    flexGrow: 1,
  },
  descriptionAndCTA: {
    flexBasis: 0,
    flexGrow: 1,
    padding:"0 50px",
  },
  description: {
    fontSize: "24px",
    fontWeight: StyleConstants.light,
    lineHeight: "28px",
    marginBottom: "40px",
  },
  emphasis: {
    fontWeight: StyleConstants.regular,
  },
  CTA: {
    backgroundColor: StyleConstants.yellow,
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: StyleConstants.bold,
    height: "50px",
    width: "150px",
    ":hover": {
      backgroundColor: "black",
      color: StyleConstants.yellow,
      cursor: "pointer",
    }
  },
  pageBreak: {
    marginBottom: "50px",
    width: "100%",
  },
  pageBreakContent: {
    backgroundColor: "black",
  },
  blubContainer: {
    display: "flex",
    margin: "0 auto 0 auto",
    width: StyleConstants.defaultWidth,
  },
  blurb: {
    color: "white",
    flexGrow: 1,
    fontStyle: "italic",
    fontWeight: StyleConstants.light,
    padding: "40px 100px",
    textAlign: "center",
  },
  arrow: {
    display: "block",
    margin: "0 auto",
  },
  resume: {
    marginLeft: "auto",
    marginRight: "auto",
    width: StyleConstants.defaultWidth,
  },
  footer: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: "20px",
    paddingTop: "20px",
    width: StyleConstants.defaultWidth,
  },
  footerContent: {
    textAlign: "center",
    width: "100%",
  },
  letsChatFooter: {
    fontSize: "48px",
    fontWeight: StyleConstants.light,
    marginBottom: "50px",
    marginTop: "50px",
  },
  email: {
    color: "black",
    fontStyle: "italic",
    fontWeight: StyleConstants.medium,
    textDecoration: "none",
  },
  createdWithLove: {
    fontSize: "18px",
    fontWeight: StyleConstants.light,
    marginBottom: "10px",
  },
  copyright: {
    color: StyleConstants.grey,
    fontSize: "18px",
    fontWeight: StyleConstants.light,
  },
  red: {
    color: StyleConstants.red,
  }
});

module.exports = JSAngarita;
