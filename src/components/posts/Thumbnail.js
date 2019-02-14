import React from "react";

const Thumbnail = props => {
  return (
    <div className="thumbnail">
      <img alt={props.name} src={props.src} />
    </div>
  );
};

export default Thumbnail;
