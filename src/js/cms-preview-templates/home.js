import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return (
      <div>
        <Jumbotron image={image} title={entry.getIn(["data", "title"])} subtitle={entry.getIn(["data", "subtitle"])} />

        <div className="bg-grey-1 pv4">
          <div className="flex-l mhn1-l ph3 center mw7">
            <h2 className="f2 b lh-title mb2 w-40-l">{entry.getIn(["data", "blurb", "heading"])}</h2>
            <p className="w-60-l mb0">{entry.getIn(["data", "blurb", "text"])}</p>
          </div>
        </div>

        <div className="bg-off-white pv4">
          <div className="ph3 mw7 center">
            <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "intro", "heading"])}</h2>
            <p className="mb4 mw6">{entry.getIn(["data", "intro", "text"])}</p>
            <section class="relative aspect-ratio aspect-ratio--16x9 overflow-hidden">
              <iframe
                src={entry.getIn(["data", "intro", "video"])}
                class="absolute top-0 left-0 h-100 w-100"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
              />
            </section>
            <div className="tc pt3">
              <a href="#" className="btn raise">
                Register now!
              </a>
            </div>
          </div>
        </div>

        <div className="bg-grey-1 pv4">
          <div className="ph3 mw7 center">
            <div className="flex-l mhn2-l">
              <div className="w-40-l ph2-l">
                <h2 className="f2 b lh-title mb2">{entry.getIn(["data", "about", "heading"])}</h2>

                <p>{entry.getIn(["data", "about", "text"])}</p>
              </div>

              <div className="w-60-l ph2-l">
                <img src={getAsset(entry.getIn(["data", "about", "image"]))} alt="" className="mb3" />
              </div>
            </div>

            <div className="tc">
              <a href="{{.buttonLink}}" className="btn raise">
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
