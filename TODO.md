## App

### Data queries

##### Config

- On first load only
- If rust can send data actively then add file watcher and update config on change
- Update file on change via UI
- Always overwrite whole file ???

##### User data

- On addition/hide/(removal?) send update to DB

##### Vacations

- On year change query for data for this year only
- On addition/removal send update to DB

##### Holidays

- On year change query for data for this year only
- On addition/removal send update to DB

##### Vacation types

- On addition/hide send update to DB

##### Holidays types

- On addition/hide send update to DB

### Menus (popups)

- Add 'cancel' btn to SettingsDialog

- Add 'add new holiday' menu
- Add 'edit/remove holiday' menu

- Add 'Create new DB' menu
  - file explorer to create new db file and save URI
- Add 'Select DB' menu
  - file explorer to save URI
- Add 'Modify DB' menu
  - add/edit vacation types
    (or hide and not remove .. b/c of DB relations)
  - add/edit school holiday types
    (or hide and not remove .. b/c of DB relations)
  - add/edit/remove school holidays
  - add/edit/remove public holidays

### Calendar

##### Visual

- Add new view to show team overview with how many days taken etc.
- Add popup on hover over names that shows vac taken stats

##### Functional

- click holiday to alter/remove it

### Misc

- Add logic to dis-/enable new holiday FAB
- add API call to get school holidays and public holidays

### Stuff for later

- self updater
- change ico to a (self made) less "complex" one?
- move calc of bigger things to backend for performance?
- rewrite the calender without react-window?

### Theming / Style

- Improve coloring for:
  - marker for school holidays in calendar
  - marker for public holidays in calendar
  - marker for weekends
  - marker for today
- Find good default colors for vacations

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

#### vacations

- id
- user_id
- type_id
- start_year
- end_year
- start_date
- end_date

#### public_holidays

- id
- name
- date
- active

#### school_holiday

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

---

## Thoughts

#### DB modifying menus

- Split 'modify' menu into different menus for different tables.
- Make component for DB table menus and sub component for different types

- Menu for vac types:
  - Show all entries ordered by DB-id
  - Button to hide non-applicable ones
  - Each entry has:
    - invisible id
    - unique name
    - 'doCount' bool if counted towards year-vac-days
    - hex-color via picker
    - ? second hex-color for dark-theme?
    - ? switch checkbox for activating color-split
    - checkbox if applicable

- Menu for pub holidays:
  - Show all entries ordered by start-date and then by id
  - Button to hide non-applicable ones
  - Each entry has:
    - invisible id
    - unique name
    - date
    - checkbox if applicable

- Menu for school holidays:
  - Show all entries ordered by start-date and then by id
  - Field at top for link to load holidays from
  - show all holidays .. like pub holidays
  - each entry has:
    - invisible id
    - name
    - start date
    - end date
    - button to edit
    - button to remove

- Menu for vacations:
  - Show all entries ordered by start-date and then by id
  - FAB down right opens 'add vac' menu
  - via sidemenu you can open 'add vac' menu
  - via vac-menu you can open 'add vac' menu
  - later via click on vac inside calendar you can open 'edit vac' menu
  - show each vac
  - each entry has:
    - invisible id
    - user name
    - type (dropdown)
    - start date
    - end date
    - button to edit
    - button to remove

- Menu for userbase:
  - Show all entries ordered by DB-id
  - each entry has:
    - unique id
    - unique name
    - amount vac days
    - workdays selection .. for calc non-workdays out of vac-ranges
    - button to remove user .. caskading down to remove vac as well
