"use client";
import React, { useEffect, useState } from "react";
import { StorySegment } from "@/types/types";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import PreloadImages from "./PreloadImages";

export default function StoryBlock({
  StorySegmentsData,
}: {
  StorySegmentsData: StorySegment[];
}) {
  const [currentSegmentID, setCurrentSegmentID] = useState(1);
  const [imgUrlsToPreload, setImgUrlsToPreload] = useState<string[]>([]);

  const currentSegment = StorySegmentsData.find(
    (segment) => segment.segmentID == currentSegmentID
  );

  const handleOptionClick = (leadsTo: number) => {
    setCurrentSegmentID(leadsTo);
  };

  const getImgUrlsToPreload = (currentSegment: StorySegment) => {
    const segmentsToPreload = StorySegmentsData.filter((segment) =>
      currentSegment.options.some(
        (option) => option.leadsTo === segment.segmentID
      )
    );

    const imgURLs = segmentsToPreload.map((segment) => segment.imageLink);
    return imgURLs;
  };

  useEffect(() => {
    if (currentSegment && currentSegment.options) {
      setImgUrlsToPreload(getImgUrlsToPreload(currentSegment));
    }
  }, [currentSegment]);

  return (
    <div className="mb-5 mt-5">
      {currentSegment && (
        <div>
          <h2 className="text-lg font-bold text-center">
            {currentSegment.header}
          </h2>

          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={currentSegment.imageLink}
              alt={currentSegment.header}
              fill
              sizes="100%"
              className="rounded-md object-cover"
              priority={true}
            />
            {imgUrlsToPreload && (
              <PreloadImages imagesURLs={imgUrlsToPreload} />
            )}
          </AspectRatio>
          <p className="mb-3">{currentSegment.text}</p>
          <div>
            {currentSegment.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleOptionClick(option.leadsTo)}
                className="w-full mb-3"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
