export interface Order {
    id: string;
    title: string;
    prepay?: boolean;
    features?: string[];
    deadline?: string;
    city?: string;
}
