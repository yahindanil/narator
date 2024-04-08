import { getLocalData } from "./utils/getdata";
import StoryBlock from "./components/StoryBlock";
import { StorySegment } from "@/types/types";

export default async function Home() {
  const StorySegmentsData = (await getLocalData()) as StorySegment[];

  return (
    <main className="wrapper">
      <StoryBlock StorySegmentsData={StorySegmentsData} />
    </main>
  );
}
