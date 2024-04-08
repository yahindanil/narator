"use client";
import React, { useState, useEffect } from "react";
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
