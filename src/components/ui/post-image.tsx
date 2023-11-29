/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { ImageProps } from "next/image";
import React from "react";

const PostImage =
  (slug: string) =>
  ({ src = "", alt = "alt", title = "title" }) => {
    if (src.match(/https/)) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} title={title} />;
    }
    // console.log("Post Image", src, slug);
    try {
      const image: ImageProps = require("../../../_posts/" +
        slug +
        "/" +
        src).default;
      // console.log("Image", image);
      return (
        <img
          src={`${image.src}`}
          alt={alt}
          title={title}
          className="next-image"
        />
      );
    } catch (e) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} title={title} />;
    }
  };
export default PostImage;
