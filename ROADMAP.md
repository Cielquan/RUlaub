# Roadmap

- Add tauri command for DB creation
  add default `vacation_types`
  ask to add entries for `pub holidays` (or checkbox ?)
  default: german holidays (NW or all?)

- Add tauri commands for updating users in DB
  on remove user .. caskading down to remove vac as well (in DB)
  use workdays selection for calc non-workdays out of vac-ranges
  on update save data to DB && return whole data for state update
  on year change query data for new year only (vacs)

- Add tauri commands for updating vacations in DB
  on update save data to DB && return whole data for state update

- Add tauri commands for updating vacTypes in DB
  on update save data to DB && return whole data for state update

- Add tauri commands for updating school holidays in DB
  on update save data to DB && return whole data for state update
  on year change query data for new year only

- Add tauri commands for updating public holidays in DB
  on update save data to DB && return whole data for state update
  FE | on year change query data for new year only
  on query calc easter_sunday, if no day-month -> calc moving holiday date with offset
  `day` or `easter_sunday_offset` - if both: `day` takes precedence

- ? split current state & new/update for DB stuff
  so on DB update the state can be updated w/o corrupting new/update data
  the current payload is like the update state .. is enough?

- BE | Add file watcher for DB

- Add Event to send data to FE for db-data update
  On change send event
  make snackbar with `Load` button to update state via commands

- BE | Add selfupdater

- **BETA**

- FE | Add snackbars with Info of success/failures

- FE | Tooltip on User for vac distribution

- FE | Tooltip on Day (top) for Info on Holiday if any

- FE | Add vac edit dialog

- FE | Tooltip on Day (body) for Info on vac + option to change it

- Copy pub holiday system to mark special days like `Karneval`

- FE | Improve Coloring
  Find good default colors for vacation

- **1.0**

- Check option for auto-scroll to today

- Check for double/intersecting Vacation

- Tests

- FE | Add new view to show team overview with how many days taken etc.

- FE | Mark workdays in datepicker for vacations

- Safe window size/position and restore on boot

- ? rewrite the calender without react-window

## Links for help to do things (dev)

[css-tricks.com](https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/)

## Error handling

- add "no config state" (error with file access/creation) to
  - show warning in settings and DB link/creation menus
  - send snackbars on changes (theme, i18n, year selection)
- Add logging / tracing to front and backend with exchange of data:
  - backend errors to front for showing only and only those errors:
    - via Promise for calls
    - via events for automated and sending stuff
    - **"events" with config**
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
year_change_scroll_begin = true
```
