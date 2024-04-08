export type StorySegment = {
  segmentID: number;
  header: string;
  text: string;
  imageLink: string;
  options: {
    text: string;
    leadsTo: number;
  }[];
};
