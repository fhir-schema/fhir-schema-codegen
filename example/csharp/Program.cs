using Aidbox.FHIR.R4.Core;
using Aidbox.Client;
using Aidbox;

var auth = new Auth
{
    Method = AuthMethods.BASIC,
    Credentials = new AuthCredentials
    {
        Username = "root",
        Password = "secret"
    }
};

var client = new Client("http://localhost:8888", auth);

var patient = new Patient
{
    Identifier = [new Identifier { System = "http://hl7.org/fhir/us/CodeSystem/identity", Value = "0000-0000" }],
    Name = [new HumanName { Given = ["John"], Family = "Doe" }],
    Gender = "male",
    BirthDate = "1990-01-01",
};

var (result, error) = await client.Create(patient);

System.Diagnostics.Debug.Assert(error == null, $"Error occurred: {error}");

Console.WriteLine(
    System.Text.Json.JsonSerializer.Serialize(
        result,
        Config.JsonSerializerOptions
    )
);
