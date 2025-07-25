// WARNING: This file is autogenerated by FHIR Schema Codegen.
// https://github.com/fhir-schema/fhir-schema-codegen
// Any manual changes made to this file may be overwritten.

import { Annotation } from './Annotation';
import { BackboneElement } from './BackboneElement';
import { CodeableConcept } from './CodeableConcept';
import { ContactPoint } from './ContactPoint';
import { DomainResource } from './DomainResource';
import { Identifier } from './Identifier';
import { ProdCharacteristic } from './ProdCharacteristic';
import { ProductShelfLife } from './ProductShelfLife';
import { Quantity } from './Quantity';
import { Reference } from './Reference';


export interface DeviceDefinitionCapability extends BackboneElement {
    description?: CodeableConcept[];
    type: CodeableConcept;
}

export interface DeviceDefinitionDeviceName extends BackboneElement {
    name: string;
    type: 'udi-label-name' | 'user-friendly-name' | 'patient-reported-name' | 'manufacturer-name' | 'model-name' | 'other';
}

export interface DeviceDefinitionMaterial extends BackboneElement {
    allergenicIndicator?: boolean;
    alternate?: boolean;
    substance: CodeableConcept;
}

export interface DeviceDefinitionProperty extends BackboneElement {
    type: CodeableConcept;
    valueCode?: CodeableConcept[];
    valueQuantity?: Quantity[];
}

export interface DeviceDefinitionSpecialization extends BackboneElement {
    systemType: string;
    version?: string;
}

export interface DeviceDefinitionUdiDeviceIdentifier extends BackboneElement {
    deviceIdentifier: string;
    issuer: string;
    jurisdiction: string;
}

export interface DeviceDefinition extends DomainResource {
    capability?: DeviceDefinitionCapability[];
    contact?: ContactPoint[];
    deviceName?: DeviceDefinitionDeviceName[];
    identifier?: Identifier[];
    languageCode?: CodeableConcept[];
    manufacturerReference?: Reference<'Organization'>;
    manufacturerString?: string;
    _manufacturerString?: Element;
    material?: DeviceDefinitionMaterial[];
    modelNumber?: string;
    _modelNumber?: Element;
    note?: Annotation[];
    onlineInformation?: string;
    _onlineInformation?: Element;
    owner?: Reference<'Organization'>;
    parentDevice?: Reference<'DeviceDefinition'>;
    physicalCharacteristics?: ProdCharacteristic;
    property?: DeviceDefinitionProperty[];
    quantity?: Quantity;
    safety?: CodeableConcept[];
    shelfLifeStorage?: ProductShelfLife[];
    specialization?: DeviceDefinitionSpecialization[];
    type?: CodeableConcept;
    udiDeviceIdentifier?: DeviceDefinitionUdiDeviceIdentifier[];
    url?: string;
    _url?: Element;
    version?: string[];
    _version?: Element;
}

