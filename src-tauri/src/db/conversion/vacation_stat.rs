use std::collections::HashMap;

use chrono::{NaiveDate, Weekday};

use crate::db::query_only_models::{self, VacationWithType};
use crate::db::state_models::user::UserId;
use crate::db::state_models::vacation_type::VacationTypeId;

pub type VacationMap = HashMap<UserId, HashMap<VacationTypeId, Vec<VacationData>>>;

pub struct VacationData {
    pub start_date: NaiveDate,
    pub end_date: NaiveDate,
    pub charge: bool,
}

pub fn group_vacations(vacation_list: Vec<VacationWithType>) -> VacationMap {
    trace!(
        target = "database-data",
        message = "Sort vacation data by user and type id"
    );
    let mut user_vac_map: VacationMap = HashMap::new();

    for vac in vacation_list {
        let user_entry = user_vac_map.entry(vac.user_id).or_insert(HashMap::new());
        let vac_list = user_entry.entry(vac.vacation_type_id).or_insert(Vec::new());

        vac_list.push(VacationData {
            start_date: vac.start_date,
            end_date: vac.end_date,
            charge: vac.charge,
        })
    }
    user_vac_map
}

pub fn map_user_workdays_list(
    user_workdays_list: &Vec<query_only_models::UserWorkdays>,
) -> HashMap<i32, Vec<Weekday>> {
    trace!(
        target = "database-data",
        message = "Build a list of user workdays from user database data",
    );

    let mut user_workdays: HashMap<i32, Vec<Weekday>> = HashMap::new();

    user_workdays_list.iter().for_each(|user| {
        let mut workday_list = Vec::new();
        if user.monday {
            workday_list.push(Weekday::Mon);
        }
        if user.tuesday {
            workday_list.push(Weekday::Tue);
        }
        if user.wednesday {
            workday_list.push(Weekday::Wed);
        }
        if user.thursday {
            workday_list.push(Weekday::Thu);
        }
        if user.friday {
            workday_list.push(Weekday::Fri);
        }
        if user.saturday {
            workday_list.push(Weekday::Sat);
        }
        if user.sunday {
            workday_list.push(Weekday::Sun);
        }
        user_workdays.insert(user.id, workday_list);
    });

    user_workdays
}
