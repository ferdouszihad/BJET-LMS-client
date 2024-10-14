import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import AddVideoContent from "../components/AddVideoContent";
import AddLiveClassContent from "../components/AddLiveClassContent";
import AddDynamicTextContent from "../components/AddDynamicTextContent";

const CreateContent = () => {
  return (
    <div className="w-11/12 mx-auto py-10">
      <h2 className="text-xl py-5">Adding Content To This Module</h2>

      {/* React Tabs */}
      <Tabs>
        {/* Tab Titles */}
        <TabList className="flex justify-between border-b">
          <Tab
            className="py-2 px-4 cursor-pointer"
            selectedClassName="bg-primary text-white border-b-2 border-primary"
          >
            Video
          </Tab>
          <Tab
            className="py-2 px-4 cursor-pointer"
            selectedClassName="bg-primary text-white border-b-2 border-primary"
          >
            Live Class
          </Tab>
          <Tab
            className="py-2 px-4 cursor-pointer"
            selectedClassName="bg-primary text-white border-b-2 border-primary"
          >
            Dynamic Text
          </Tab>
        </TabList>

        {/* Tab Content */}
        <TabPanel>
          <AddVideoContent></AddVideoContent>
        </TabPanel>
        <TabPanel>
          <AddLiveClassContent></AddLiveClassContent>
        </TabPanel>
        <TabPanel>
          <AddDynamicTextContent></AddDynamicTextContent>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CreateContent;
