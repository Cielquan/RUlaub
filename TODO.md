## App

### State

- Add state for public holidays

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

- Add 'add new holiday' menu
- Add 'edit/remove holiday' menu

- Add (local) 'Settings' menu
  - change username
    - evtl. add user (as badge) to navbar instead
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

- Add marker for Sat & Sun in calendar
- Add marker for school holidays in calendar
- Add marker for public holidays in calendar
- If year == current_year: focus on current_day
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

---

## Database plan

#### users

- id
- name
- vacation_days

#### vacation_types

- id
- type
- doCount (to user's vacation_days)
- hexcolor

#### vacations

- id
- user_id
- type_id
- year
- start_date
- end_date

#### public_holidays

- id
- name
- date

#### school_holiday

- id
- name
- start_day
- end_day

---

## Local Config Plan

```toml
[user]
name = "xy"

[settings]
databaseURI = "path/to/DB"
yearToShow = 2000
theme = "dark"
langauge = "de-DE"
```
