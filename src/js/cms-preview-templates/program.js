import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class ProgramPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetFor} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="cms mw7 center ph3 pt4">
        { widgetFor("body") }
      </div>
    </div>;
  }
}
