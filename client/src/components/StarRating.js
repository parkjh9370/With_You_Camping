import React, { useState } from "react";

const Star = ({ starId, marked }) => {
  return (
    <span
      star-id={starId}
      role="button"
      style={{ color: "#ff9933", cursor: "pointer" }}
    >
      {marked ? "\u2605" : "\u2606"}
    </span>
  );
};

// Create an array of 5: Array.from({length: 5}, (v,i) => i)

export default function StarRating({ postRating }) {
  // Manages on Hover selection of a star
  // eslint-disable-next-line no-unused-vars
  const [selection, setSelection] = useState(0);

  // 별점 props로 받아 해당 별점 업데이트
  const rating = postRating;

  return (
    <div>
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
