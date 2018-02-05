import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

export default class PostPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetsFor} = this.props;
    let image = getAsset(entry.getIn(["data", "image"]));

    // Bit of a nasty hack to make relative paths work as expected as a background image here
    if (image && !image.fileObj) {
      image = window.parent.location.protocol + "//" + window.parent.location.host + image;
    }

    return <div>
      <Jumbotron image={image} title={entry.getIn(["data", "title"])} />

      <div className="bg-off-white pv4 ph3">
        <div className="mw7 center">

          <h2 className="f2 b lh-title mb3">{entry.getIn(['data', 'pricing', 'heading'])}</h2>
          <p className="mw6">{widgetsFor("pricing").get('widgets').get('description')}</p>

          <div className="flex-ns mhn2-ns mw7">
            {(entry.getIn(['data', 'pricing', 'plans']) || []).map((plan, index) => <div className="w-33-ns ph2" key={index}>
              <div className="ph2">

                <h3 className="b f5 grey-3 tc lh-title mb3">{plan.get('plan')}</h3>

                <p className="primary f1 b tc lh-title center">
                  {plan.get('price')}<span className="f4">&euro;</span>
                </p>

                <p className="b">{plan.get('description')}</p>

                <ul>
                  {(plan.get('items') || []).map((item, index) => <li key={index}>
                    <p className={index + 1 !== plan.get('items').size ? "pb2 mb2 divider-grey" : null}>{item}</p>
                  </li>)}
                </ul>

              </div>

            </div>)}
          </div>
        </div>
      </div>
    </div>;
  }
}
