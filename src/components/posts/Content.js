import React from "react";
const Content = props => {
  return (
    <div className="content-wrapper">
      <h3 className="content" itemProp="name">
        {props.name}
      </h3>
      <p className="tag-line" itemProp="itemDescription">
        {props.tagline}
      </p>
      <span className="meta_info">{props.catogory}</span>
    </div>
  );
};

export default Content;
