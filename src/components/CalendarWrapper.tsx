import { useState } from "react";

import Calendar from "./Calendar";
import NewHolidayButton from "./NewHolidayButton";
import SchoolHolidaysDownloadButton from "./SchoolHolidaysDownloadButton";

const App = (): React.ReactElement => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  return (
    <>
      <Calendar
        scrollX={scrollX}
        setScrollX={setScrollX}
        scrollY={scrollY}
        setScrollY={setScrollY}
      />
      <NewHolidayButton />
      <SchoolHolidaysDownloadButton />
    </>
  );
};

export default App;
