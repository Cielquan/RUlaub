## App

### Ideas

- self updater
- change ico to a (self made) less "complex" one?
- move calc of bigger things to backend for performance?
- rewrite the calender without react-window?

### Misc

- Make component for DB table menus and sub component for different types/entries

### Config

- On first load only
- If rust can send data actively then add file watcher and update config on change
- Update file on change via UI
- Always overwrite whole file ???

### Database

- Dialog-Menu
  - File explorer to create new
  - File explorer to select existing
  - save URI to local config

### Users

- on update `Save` send data to DB
  && load data fresh from DB || or update state only
- on remove user .. caskading down to remove vac as well (in DB)
- use workdays selection for calc non-workdays out of vac-ranges

### Public Holidays

- on update (add/deactivate/remove) send data to DB
  && load data fresh from DB || or update state only
- on year change query data for new year only
- #TODO: think about calculated holidays

- Dialog-Menu:
  - Show all entries ordered by start-date and then by id
  - Switch to hide/show non-active ones
  - Each entry has:
    - invisible id
    - name
    - day
    - month
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

## Thoughts

### Database

- `user` deletable with caskading down to vacations
- `vacation_type` not deleteable (only hidable)
- `vacation` deletable
- `public_holiday`
  - split col `date` to `year` (nullable), `day` ({month}-{day}, nullable),
    `easter_sunday_offset` (+/- integer, nullable)
    - make *FE* only `day` oder `offset` can be entered)
    - `day` or `easter_sunday_offset` - if both: `day` takes precedence
  - all entries are removable
  - name can be double
    - if entry has `year` it takes precedence, if year == current_year
    - if two or more entries are applicable for the current year, higher ID takes precedence
- `school_holiday` deletable

### Rust side

- file watcher for config file
  - On change load config anew and send event + payload for state update
  - *FE*: make snackbar with `Load` button to update state
- file watcher for DB file
  - On change send events + payloads for all state updates
  - *FE*: make snackbar with `Load` button to update state
- pub holidays:
  - on query get data from DB, if no date -> calc moving holiday date
  - add key to DB table for calc -> how many days to add to day 0

### TS side

- split current state & new/update for DB stuff
  - so on DB update the state can be updated w/o corrupting new/update data
- on creation of new DB:
  - add default `vacation_types`
  - ask to add entries for `pub holidays` (or checkbox ?)
    - default: german holidays (NW or all?)

---

## Database plan

#### users

- id
- unique name
- vacation_days

#### vacation_types

- id
- unique type/name
- do_count (to user's vacation_days)
- hexcolor_dark
- hexcolor_light
- active

#### vacation

- id
- user_id
- vacation_type_id
- start_year
- end_year
- start_date
- end_date

#### public_holidays

- id
- name
- date
- active

#### school_holidays

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
