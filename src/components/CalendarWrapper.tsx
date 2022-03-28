import Calendar from "./Calendar";
import NewHolidayButton from "./NewHolidayButton";
import SchoolHolidaysDownloadButton from "./SchoolHolidaysDownloadButton";

const App = (): React.ReactElement => {
  return (
    <>
      <Calendar />
      <NewHolidayButton />
      <SchoolHolidaysDownloadButton />
    </>
  );
};

export default App;
