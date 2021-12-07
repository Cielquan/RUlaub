pub trait EnumStringConverter {
    fn new(value: &str) -> Self;
    fn to_string(&self) -> String;
}
