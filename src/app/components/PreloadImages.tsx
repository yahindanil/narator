import React from "react";
import Image from "next/image";

export default function PreloadImages({
  imagesURLs,
}: {
  imagesURLs: string[];
}) {
  return (
    <div style={{ display: "none" }}>
      {imagesURLs.map((imageLink, index) => (
        <Image
          key={index}
          src={imageLink}
          alt="preloaded image"
          height={1}
          width={1}
          sizes="100%"
          className="rounded-md object-cover"
          priority={true}
        />
      ))}
    </div>
  );
}
