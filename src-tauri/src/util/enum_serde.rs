pub trait EnumStringConverter {
    fn to_string(&self) -> String;
    fn to_enum(value: &str) -> Self;
}
