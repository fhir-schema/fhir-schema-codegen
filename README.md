# FHIR Schema Codegen

This project is a tool to generate SDK from FHIR Schema.


## How it works

### transform FHIR Schema to Type Schema

types and urls

we need FHIR version in context (or name of base package)
we need to translate url to package name :(

* hl7.com/fhir/SD/Patient  -> ?
* HumanName -> ?
* us-core/Patient -> ?

Multiversion?

fhir.r4.Patient
fhir.r5.Patient

```js
//It's a matter of import 
import HumanName from fhir.r4.types 

class ? {
    name HumanName[]
}

```

generate pkg1, pgk2, pkg3 =>

generate us-core ->
depends on base - is it part of generated code or just reference

```js
ctx = {
    currentPackage: ref
    //relative resolve from package
    resolve: ()=> {

    }
}

url2import(ctx, url)
import [url -> pkg / file]

url2type(ctx, url) ->
USPatient extends [ url -> Patient ]
```

pkg: us-core
url: http://us-core
base: fhir/Patient
elements:
  extensions:
    race: 
      url: http://us-core
      binding: 
        valueset: http:/ 
  name: {type: HumanName}


generate imports before usage
ideally at the same place

header.import(type)
line('field', ':', type)

or 

prepare before generation in typeschema

type: USPatient
deps:
- Patient: { pkg: core, file: ...}
- RaceEnum: { pkg: us-core ...}
nestedTypes: {}
fields: {}

Symbol(url | type) + ctx{currentType, pkg } -> import ()

onType:     ()=>
onBase:     ()=>
onBinding:  ()=>

pkg/
  types.x  one file or file per type
  Patient.x
  Encounter.x
  VitalSigns.x


## fhir to type

* translate url2coord { package, class }
* if base url - url2coord { package, class } add dep
* TODO: patterns / intefaces 
* walk thro first level of elements (path = [])
  * if element has type -> type2coord + add dep
  * else generate nested type + add dep (local)
  * if binding url -> binding2coord + add dep
  
