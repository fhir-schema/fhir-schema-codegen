using System.Text.Json;
using System.Text.Json.Serialization;

namespace Aidbox;

public class LowercaseNamingPolicy : JsonNamingPolicy
{
    public override string ConvertName(string name) => name.ToLower();
}

public class Config
{
    public static readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        Converters = { new JsonStringEnumConverter(new LowercaseNamingPolicy()) },
        WriteIndented = true
    };

    public static readonly Dictionary<Type, string> ResourceMap = ResourceDictionary.Map;
}