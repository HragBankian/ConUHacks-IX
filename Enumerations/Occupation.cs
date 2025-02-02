using System.Runtime.Serialization;
//using System.Text.Json.Serialization;

//namespace fl_backend.Enumerations
//{
//    public enum Occupation
//    {
//        Unemployed,
//        Full_time,
//        Part_time,
//        Retired
//    }
//}
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Runtime.Serialization;

namespace fl_backend.Enumerations
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Occupation
    {
        [EnumMember(Value = "unemployed")]
        Unemployed,

        [EnumMember(Value = "full-time")]
        Full_time,

        [EnumMember(Value = "part-time")]
        Part_time,

        [EnumMember(Value = "retired")]
        Retired
    }
}
