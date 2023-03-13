import stockData from "../data/stock.json"
import transactionData from "../data/transactions.json"
import { Stock, Transaction, StockLevel, StockLevelError } from "../interfaces"

const stocks: Stock[] = stockData
const transactions: Transaction[] = transactionData as Transaction[]

export const currentStockLevel = async (sku: string): Promise<StockLevel> => {

    return new Promise((resolve, reject) => {
        if (!sku) {
            throw new Error("SKU is required")
        }
        let item: Stock | undefined = stocks.find((stock: Stock) => stock.sku === sku)
        let filteredTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.sku === sku)

        if (!item && !filteredTransactions.length) {
            reject({ message: "SKU does not exists" })
        }
        if (!item && filteredTransactions.length) {
            let qty = calculateSum(filteredTransactions)
            resolve({ sku, qty })
        }
        if (item && !filteredTransactions.length) {
            let qty = item.stock
            resolve({ sku, qty })
        }
        if (item && filteredTransactions.length) {
            let initialStock = item.stock
            let qty = calculateSum(filteredTransactions)
            resolve({ sku, qty: initialStock - qty })
        }
    })
}

function calculateSum(filteredTransactions: Transaction[]): number {
    let qty = 0
    for (let i = 0; i < filteredTransactions.length; i++) {
        let transaction: Transaction = filteredTransactions[i]
        qty = qty + transaction.qty
    }
    return qty
}