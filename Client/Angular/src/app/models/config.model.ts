export interface ConfigModel {
    case: string;
    cpu: string;
    gpu?: string;
    motherboard: string;
    monitor?: string;
    powerSupply: string;
    ram: string;
    storage: string;
    id?: string;
}