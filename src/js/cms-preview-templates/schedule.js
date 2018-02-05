import React from "react";
import { List } from 'immutable';

import Jumbotron from "./components/jumbotron";

const MediaBlock = ({heading, text, imageUrl, reverse}) => {
  const imageContainerClassName = reverse
    ? "ph3-m w-50-m"
    : "ph3-m w-50-m order-last-m";
  return <div className="flex-m mhn3-m mb4">
    <div className={imageContainerClassName}>
      <img src={imageUrl} alt="" className="db mb2" />
    </div>
    <div className="ph3-m w-50-m">
      <h3 className="f3 b lh-title mb1">{heading}</h3>
      <p>{text}</p>
    </div>
  </div>;
};

export default class SchedulePreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }
    
    const scheduleEntry = entry.getIn(["data", "schedule"]);
    const scheduleItems = scheduleEntry ? scheduleEntry.toJS() : [];
    
    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="bg-grey-1 pv4">
        <div className="flex-l mhn1-l ph3 center mw7">
          <h2 className="f2 b lh-title mb2 w-40-l">{entry.getIn(["data", "blurb", "heading"])}</h2>
          <p className="w-60-l mb0">{entry.getIn(["data", "blurb", "text"])}</p>
        </div>
      </div>

      <div className="bg-off-white pv4">
        <div className="mw7 center ph3 pt4">
          {scheduleItems.map(({text, heading, imageUrl}, i) =>
            <MediaBlock key={i} text={text} heading={heading} imageUrl={imageUrl} reverse={i % 2 === 0} />
          )}
        </div>
      </div>
    </div>;
  }
}
