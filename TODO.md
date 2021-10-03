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

- Dialog-Menu:
  - Add 'cancel' btn to SettingsDialog

### Database

- Dialog-Menu
  - File explorer to create new
  - File explorer to select existing
  - save URI to local config

### Users

- on update (add/remove) send data to DB
  && load data fresh from DB || or update state only

- Dialog-Menu:
  - Show all entries ordered by DB-id
  - Each entry has:
    - id
    - unique name
    - amount vac days
    - workdays selection (for calc non-workdays out of vac-ranges)
    - button to edit
    - button to remove user .. caskading down to remove vac as well (in DB)

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

## Database plan

#### users

- id
- name
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
