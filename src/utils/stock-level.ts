import stockData from "../data/stock.json"
import transactionData from "../data/transactions.json"
import { Stock, Transaction, StockLevel } from "../interfaces"
import calculateSum from "./calculate-sum"
const stocks: Stock[] = stockData
const transactions: Transaction[] = transactionData as Transaction[]

export const currentStockLevel = async (sku: string): Promise<StockLevel> => {

    return new Promise((resolve, reject) => {
        if (!sku) {
            reject(new Error("SKU is required"))
        }
        let item: Stock | undefined = stocks.find((stock: Stock) => stock.sku === sku)
        let filteredTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.sku === sku)
        if (!item && !filteredTransactions.length) {
            reject({ message: "SKU does not exists" })
        }
        const initialStock = item?.stock ?? 0;
        const qty = calculateSum(filteredTransactions);
        resolve({ sku, qty: initialStock - qty });
    })
}

