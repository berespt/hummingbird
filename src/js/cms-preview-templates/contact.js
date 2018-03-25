import React from "react";

const ContactEntry = ({heading, text}) =>
  <div>
    <h4 className="f4 b lh-title mb2 primary">{ heading }</h4>
    <p>{ text }</p>
  </div>;

const ContactEntries = ({data}) => data && data.length > 0
    ? <div className="flex-ns mb3">
      {data.map(({heading, text}) => <ContactEntry heading={heading} text={text} />)}
    </div>
    : "";

export default class ContactPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetFor} = this.props;
    const entryContactEntries = entry.getIn(["data", "contact_entries"]);
    const contactEntries = entryContactEntries ? entryContactEntries.toJS() : [];
    return <div className="ph3 bg-off-white">
      <div class="flex-ns center mw7 pv3">
        <div class="w-40-ns order-last">
          <img src={getAsset(entry.getIn(["data", "logo"]))} alt="" className="db w5 center pv4" />
        </div>
        <div class="w-60-ns">
          <div className="center mw6 pv3">
            <div class="cms">{ widgetFor("body") }</div>
            <ContactEntries data={contactEntries} />
          </div>
        </div>
      </div>
    </div>;
  }
}
