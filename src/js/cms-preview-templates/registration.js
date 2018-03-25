import React from "react";
import format from "date-fns/format";

import Jumbotron from "./components/jumbotron";

const ConditionalButton = ({link, text}) => {
  return !link ? "" :
  <a href={link} class="btn raise">{text}</a>;
};

const IndiegogoCampaignBox = ({embedLink}) => {
  if (!embedLink) { // return logo if there's no campaign link
    return <img src="/img/logo.svg" alt="Hummingbird logo" class="w5 center mb4 br0 "/>
  }
  return <iframe src={embedLink} width="222px" height="445px" frameborder="0" scrolling="no"/>
}

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

      <div class="bg-off-white pv4 ph3">
        <div class="mw7 center">
          <h2 class="f2 b lh-title mb3">{entry.getIn(["data", "intro", "heading"])}</h2>
          <div class="flex-ns">
            <div class="w-60-ns">
              <p>{widgetsFor("intro").get('widgets').get('description')}</p>
              <div class="tc">
                <ConditionalButton link={entry.getIn(["data", "intro", "formButtonLink"])} text={entry.getIn(["data", "intro", "formButtonText"])}/>
                &nbsp;
                <ConditionalButton link={entry.getIn(["data", "intro", "indiegogoButtonLink"])} text={entry.getIn(["data", "intro", "indiegogoButtonText"])}/>
              </div>
            </div>
            <div class="w-40-ns tc dn db-ns">
              <IndiegogoCampaignBox embedLink={entry.getIn(["data", "intro", "indiegogoEmbedLink"])}/>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-off-white pv4 ph3">
        <div className="mw7 center">

          <h2 className="f2 b lh-title mb3">{entry.getIn(['data', 'pricing', 'heading'])}</h2>
          <p className="mw6">{widgetsFor("pricing").get('widgets').get('description')}</p>

          <div className="flex-ns mhn2-ns mw7">
            {(entry.getIn(['data', 'pricing', 'plans']) || []).map((plan, index) => <div className="w-33-ns ph2" key={index}>
              <div className="ph2">

                <h3 className="b f5 grey-3 tc lh-title mb3 h2-ns">{plan.get('plan')}</h3>

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
