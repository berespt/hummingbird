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
      <p className="cms">{text}</p>
    </div>
  </div>;
};

export default class AboutPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetsFor} = this.props;
    
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }
    
    const itemsEntry = entry.getIn(["data", "items"]);
    const getItemTextWidget = (i) => widgetsFor("items").get(i).get('widgets').get('text');
    const items = itemsEntry ? itemsEntry.toJS() : [];
    
    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="bg-grey-1 pv3">
        <div className="ph3 center mw7">
          <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "blurb", "heading"])}</h2>
          <p className="cms mb0">{widgetsFor("blurb").get("widgets").get("text")}</p>
        </div>
      </div>

      <div className="bg-off-white pv3">
        <div className="mw7 center ph3 pt4">
          {items.map(({text, heading, imageUrl}, i) =>
            <MediaBlock key={i} text={getItemTextWidget(i)} heading={heading} imageUrl={imageUrl} reverse={i % 2 === 0} />
          )}
        </div>
      </div>
    </div>;
  }
}
