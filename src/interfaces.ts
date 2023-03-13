export interface Stock {
    sku: string
    stock: number
}


export interface Transaction {
    sku: string,
    type: 'refund' | 'order',
    qty: number
}

export interface StockLevel {
    sku: string,
    qty: number
}
export interface StockLevelError {
    message: string
}