// export type Category = {
//     Case?: string,
//     CPU?: string,
//     GPU?: string,
//     Motherboard?: string,
//     Monitor?: string,
//     PSU?: string,
//     RAM?: string,
//     Storage?: string
// }

export const categories = ['Case', 'CPU', 'GPU', 'Motherboard', 'Monitor', 'PSU', 'RAM', 'Storage'] as const;
export type Category = typeof categories[number];

export interface HardwareModel {
    id?: string;
    name: string;
    category: Category;
    price_usd: number | null;

    type?: string;
    side_panel_window?: string;
    internal_3_5_bays?: string | number;

    core_count?: string | number;
    core_clock?: string;
    boost_clock?: string;
    tdp?: string | number;
    integrated_graphics?: string | null;

    chipset?: string;

    cpu_socket?: string;
    form_factor?: string;
    memory_max?: string;
    memory_slots?: number;

    resolution?: string;
    refresh_rate?: string;

    efficiency_rating?: string;
    wattage?: string;
    modular?: string;

    speed?: string;
    modules?: string;

    capacity?: string;
    interface?: string;
}

