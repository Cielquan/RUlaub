use std::collections::HashMap;

use chrono::NaiveDate;

use crate::db::query_only_models::VacationWithType;
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
