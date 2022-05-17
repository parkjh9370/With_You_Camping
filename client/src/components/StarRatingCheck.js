import React, { useState, useEffect } from "react";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer", width: "100px" }}
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

// Create an array of 5: Array.from({length: 5}, (v,i) => i)

export default function StarRatingCheck({ checkRating, setCheckRating }) {
  // Manages on Hover selection of a star
  const [selection, setSelection] = useState(0);

  // 별점 props로 받아 해당 별점 업데이트
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setCheckRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  const hoverOver = (event) => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute("star-id")) {
      starId = event.target.getAttribute("star-id");
    }
    setSelection(starId);
  };

  return (
    <div
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      onClick={(event) => setRating(event.target.getAttribute("star-id"))}
      style={{ width: "10px" }}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          key={i}
          starId={i + 1}
          marked={selection ? selection > i : rating > i}
        />
      ))}
    </div>
  );
}
