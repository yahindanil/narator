import { getLocalData } from "./utils/getdata";
import StoryBlock from "./components/StoryBlock";
import { StorySegment } from "@/types/types";

export default async function Home() {
  const StorySegmentsData = (await getLocalData()) as StorySegment[];

  return (
    <div className="wrapper">
      <StoryBlock StorySegmentsData={StorySegmentsData} />
    </div>
  );
}
