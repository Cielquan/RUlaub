## App

### Ideas

- self updater
- change ico to a (self made) less "complex" one?
- move calc of bigger things to backend for performance?
- rewrite the calender without react-window?

### Misc

- add key combi to open error log in app as dialog
- Make component for DB table menus and sub component for different types/entries
- split current state & new/update for DB stuff
  - so on DB update the state can be updated w/o corrupting new/update data

### Config

- file watcher for config file
  - On change load config anew and send event + payload for state update
  - make snackbar with `Load` button to update state
- Update file on change via UI
  - Always overwrite whole file ???

### Database

- Dialog-Menu
  - File explorer to create new
    - on creation of new DB:
      - add default `vacation_types`
      - ask to add entries for `pub holidays` (or checkbox ?)
        - default: german holidays (NW or all?)
  - File explorer to select existing
  - save URI to local config
- file watcher for DB file
  - On change send events + payloads for all state updates
  - make snackbar with `Load` button to update state

### Users

- on update `Save` send data to DB
  && load data fresh from DB || or update state only
- on remove user .. caskading down to remove vac as well (in DB)
- use workdays selection for calc non-workdays out of vac-ranges

### Public Holidays

- on update (add/deactivate/remove) send data to DB
  && load data fresh from DB || or update state only
- on year change query data for new year only
- on query calc easter_sunday, if no day-month -> calc moving holiday date with offset
- #TODO: think about calculated holidays

- Dialog-Menu:
  - Show all entries ordered by start-date and then by id
  - Switch to hide/show non-active ones
  - only `day` || `offset` can be entered)
  - Each entry has:
    - invisible id
    - name
    - month-day
    - easter sunday offset
    - (year)
    - button to edit
    - checkbox if applicable || button to remove

### School Holidays

- on update (add/remove) send data to DB
  && load data fresh from DB || or update state only
- on year change query data for new year only

- Dialog-Menu:
  - Show all entries ordered by start-date and then by id
  - Field at top for link to load holidays from
    - add API call to get school holidays
  - Each entry has:
    - invisible id
    - name
    - start date
    - end date
    - button to edit
    - button to remove

### Vacation Types

- on update (add/deactivate) send data to DB
  && load data fresh from DB || or update state only

- Dialog-Menu:
  - Show all entries ordered by DB-id
  - Switch to hide/show non-active ones
  - Each entry has:
    - invisible id
    - unique name
    - do_count (bool if counted towards year-vac-days)
    - hex-color via picker
    - ? second hex-color for dark-theme?
    - ? switch checkbox for activating color-split
    - checkbox if applicable

### Vacation

- on update (add/deactivate) send data to DB
  && load data fresh from DB || or update state only
- on year change query data for new year only

- Dialog-Menu:
  - Show all entries ordered by start-date and then by id
  - 'add vac' menu opend by
    - FAB (bottom right)
      - Add logic to dis-/enable FAB
    - sidemenu
    - vac-menu
  - later via click on vac inside **calendar**
    you can open 'edit vac' menu and quick remove
  - Each entry has:
    - invisible id
    - user name
    - type (dropdown when edit)
    - start date
    - end date
    - button to edit
    - button to remove

### Calendar

- Add new view to show team overview with how many days taken etc.
- Add hover popup on names that shows vac taken stats
- Add hover popup on vacation showing stats (and menu buttons)
- Add hover popup on school holidays showing stats (and menu buttons)
- Add hover popup on public holidays showing stats (and menu buttons)

- Improve coloring for:
  - marker for school holidays
  - marker for public holidays
  - marker for weekends
  - marker for today
- Find good default colors for vacation

---

## Database plan

#### users

deletable with caskading down to vacations

- id
- name (unique)
- vacation_days

#### vacation_types

not deleteable (only hidable)

- id
- type/name (unique)
- do_count (to user's vacation_days)
- hexcolor_dark
- hexcolor_light
- active

#### vacation

deletable

- id
- user_id
- vacation_type_id
- start_year
- end_year
- start_date
- end_date

#### public_holidays

deletable

- id
- name (not unique)
  - if entry has `year` it takes precedence, if year == current_year
  - if two or more entries are applicable for the current year, higher ID takes precedence
- year (nullable)
- day_month (nullable)
  - `day` or `easter_sunday_offset` - if both: `day` takes precedence
- easter_sunday_offset (+/- interger, nullable)
  - `day` or `easter_sunday_offset` - if both: `day` takes precedence

#### school_holidays

deletable

- id
- name
- start_date
- end_date

---

## Local Config Plan

```toml
[user]
name = "xy"

[settings]
database_uri = "path/to/DB"
year_to_show = 2000
theme = "dark"
langauge = "de-DE"
```
