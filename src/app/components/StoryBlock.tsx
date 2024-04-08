"use client";
import React, { useEffect, useState } from "react";
import { StorySegment } from "@/types/types";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export default function StoryBlock({
  StorySegmentsData,
}: {
  StorySegmentsData: StorySegment[];
}) {
  const [currentSegmentID, setCurrentSegmentID] = useState(1);
  const currentSegment = StorySegmentsData.find(
    (segment) => segment.segmentID == currentSegmentID
  );

  const handleOptionClick = (leadsTo: number) => {
    setCurrentSegmentID(leadsTo);
  };

  // Function to preload images
  const preloadImages = (segmentIDs: any[]) => {
    segmentIDs.forEach((id: number) => {
      const segment = StorySegmentsData.find(
        (segment) => segment.segmentID === id
      );
      if (segment && segment.imageLink) {
        const img = new window.Image();
        img.src = segment.imageLink;
      }
    });
  };

  // Effect to preload images for the next possible segments
  useEffect(() => {
    if (currentSegment && currentSegment.options) {
      const nextSegmentIDs = currentSegment.options.map(
        (option) => option.leadsTo
      );
      preloadImages(nextSegmentIDs);
    }
  }, [currentSegmentID, StorySegmentsData]);

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
