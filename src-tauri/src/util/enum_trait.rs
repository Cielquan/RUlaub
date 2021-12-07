pub trait StringEnum {
    fn new(value: &str) -> Self;
    fn to_string(&self) -> String;
}
