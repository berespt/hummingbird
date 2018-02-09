import React from "react";

export default class Jumbotron extends React.Component {
  render() {
    const {image, title, subtitle} = this.props;
    return <div>
      <div className="pv5 pv6-l ph3 bg-center cover" style={{
        backgroundImage: image && `url(${image})`
      }}>
        <div className="mw7 center ph3">
          <div className="db mb3">
            <div className="mw7 relative bg-fix-white-alpha mb3">
              <h1 className="f2 f1-l b di lh-copy mb3 white mw6 bg-white-alpha">
                { title }
              </h1>
            </div>
            <div className="mw7 relative bg-fix-white-alpha">
              {subtitle && <p className="b f4 di lh-copy mb3 white mw6 bg-white-alpha">{ subtitle }</p>}
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
