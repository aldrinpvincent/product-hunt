import React from "react";
const Content = props => {
  return (
    <div className="content-wrapper">
      <h3 className="content" itemProp="name">
        {props.name}
      </h3>
      <p className="" itemProp="itemDescription">
        {props.tagline}
      </p>
      <p className="meta_info">{props.catogory}</p>
    </div>
  );
};

export default Content;
