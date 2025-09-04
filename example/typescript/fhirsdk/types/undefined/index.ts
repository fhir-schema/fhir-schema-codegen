import { Client } from './Client';
export { Client };

export type ResourceTypeMap =  {
    User: Record<string, any>;
    Client: Client;
}
export type ResourceType = keyof ResourceTypeMap;
export const resourceList: readonly ResourceType[] = [
    'Client', 
]
