class Analytics {
  logFinishedAnimation() {
    ga("send", {
      hitType: "event",
      eventCategory: "Hero",
      eventAction: "Finished Animation",
      eventLabel: "Tree Animation",
    });
  }

  logScrolled() {
    ga("send", {
      hitType: "event",
      eventCategory: "Root",
      eventAction: "Scrolled",
    });
  }

  logScrolledToEnd() {
    ga("send", {
      hitType: "event",
      eventCategory: "Root",
      eventAction: "Scrolled To End",
    });
  }

  logHoveredOverMoreInfo(companyName) {
    ga("send", {
      hitType: "event",
      eventCategory: "Resume",
      eventAction: "Hovered",
      eventLabel: "More Info",
      eventValue: companyName,
    });
  }
}

export let analytics = new Analytics();
