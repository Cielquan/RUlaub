## App

## TODOs

- rename "Info" to "About" in frontend

### Roadmap Frontend

##### Essentiel

Frontend:

- Add DB dialog for creation
- Add DB dialog for changing

Backend:

- Add Tracing
- Add config loading (file watcher)
- Add DB interaction (file watcher)
- Add DB Data prep for Frontend
- Add selfupdater

##### Minor

Frontend:

- Add snackbars with Info of success/failures
- Add add vac dialog for FAB
- Tooltip on User for vac distribution
- Tooltip on Day (top) for Info on Holiday if any
- Tooltip on Day (body) for Info on vac + option to change it
  - Add vac edit dialog

### Links for help to do things (dev)

https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/

### Ideas

- change ico to a (self made) less "complex" one?
  https://github.com/aldeka/rustacean.net

- rewrite the calender without react-window?

- move calc of bigger things to backend for performance?
- use backend only for file handling

- by default load data from DB only for current year.
  Add button to settings menu to load all data.
  ? Add range slider to select range of years to load.

  - on change of DB data / config:
    1. send update to DB
    2. after success load whole data from DB anew

- Safe window size/position and restore on boot

### Misc

- self updater (**BEFORE 1.0**)
- split current state & new/update for DB stuff
  - so on DB update the state can be updated w/o corrupting new/update data
  - the current payload is like the update state .. is enough?
- Copy pub holiday system to mark special days like `Karneval`

### Error handling

- default logging level on startup: `DEBUG` (before loading conf)
- add "no config state" (error with file access/creation) to
  - show warning in settings and DB link/creation menus
  - send snackbars on changes (theme, i18n, year selection)
- Add logging / tracing to front and backend with exchange of data:
  - backend errors to front for showing only and only those errors:
    - via Promise for calls
    - via events for automated and sending stuff
    - **"events" with config**
      - file loaded successfully (init)
        DO: -
        LVL: success
        INFO: -
        VIA: -
      - file not found
        DO: create new with defaults
        LVL: info
        INFO: New config created + where?
        VIA: snackbar
      - cannot create / change file (permission or others)
        DO: work with default settings, set "no config state"
        LVL: error
        INFO: changes work for current session but cannot be preserved
        (add reason and advice if applicable)
        VIA: snackbar
      - invalid data
        DO: use defaults, overwrite setting in file with default
        LVL: warning
        INFO: invalid data, using defaults, overwrote setting in file with default
        VIA: snackbar
    - **"events" with DB**
      - file found and data fetched
        DO: (work with data +) send data to frontend
        LVL: success
        INFO: -
        VIA: -
      - file not found
        DO: -
        LVL: warning
        INFO: needs to create/link database (with buttons to both)]
        VIA: snackbar
      - cannot create file (permission or others)
        DO: -
        LVL: error
        INFO: need to fix reason
        (add reason and advice if applicable)
        VIA: dialog
      - cannot access file b/c in action by other user
        DO: retry after x time
        LVL: error
        INFO: db in use, trying again in x time
        VIA: dialog, shown timer, button for manual retry, abort
      - cannot access file b/c permission
        DO: -
        LVL: error
        INFO: need to get permission
        VIA: dialog
      - failed SQL command
        DO: -
        LVL: error
        INFO: failed command, contact support
        VIA: dialog
    - **"events" with 'log file'**
      - cannot create / change file (permission or others)
        DO: work with default settings, set "no config state"
        LVL: warning
        INFO: no logging (add reason and advice if applicable)
        VIA: snackbar
  - front to back to write to logfile (all with metadata)
    - data validation for data from backend

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

### School Holidays

- on update (add/remove) send data to DB
  && load data fresh from DB || or update state only
- on year change query data for new year only

- Dialog-Menu:
  - Field at top for link to load holidays from
    - add API call to get school holidays

### Vacation Types

- on update (add/deactivate) send data to DB
  && load data fresh from DB || or update state only

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
- monday
- tuesday
- wednesday
- thursday
- friday
- saturday
- sunday

#### vacation_types

not deleteable (only hidable)

- id
- name (unique)
- charge (to user's vacation_days)
- color_dark (str)
- color_light (str)
- active

#### vacation

deletable

- id
- user_id
- vacation_type_id
- start_date
- start_year_day
- start_year
- end_date
- end_year_day
- end_year

#### public_holidays

deletable

- id
- name (not unique)
  - if entry has `year` it takes precedence, if year == current_year
  - if two or more entries are applicable for the current year, higher ID takes precedence
- year (nullable)
- yearless_date (nullable)
  - `day` or `easter_sunday_offset` - if both: `day` takes precedence
- easter_sunday_offset (+/- interger, nullable)
  - `day` or `easter_sunday_offset` - if both: `day` takes precedence

#### school_holidays

deletable

- id
- name
- start_date
- start_year_day
- start_year
- end_date
- end_year_day
- end_year

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
log_level = "INFO"
today_autoscroll_left_offset = 2
year_change_scroll_begin = true
```
