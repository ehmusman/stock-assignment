import stockData from "../data/stock.json"
import transactionData from "../data/transactions.json"
import { Stock, Transaction, StockLevel } from "../interfaces"
import calculateSum from "./calculate-sum"
const stocks: Stock[] = stockData
const transactions: Transaction[] = transactionData as Transaction[]

export const currentStockLevel = async (sku: string): Promise<StockLevel> => {

    if (!sku || typeof sku !== "string") {
        throw new Error("Valid SKU is required")
    }
    let item: Stock | undefined = stocks.find((stock: Stock) => stock.sku === sku)
    let filteredTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.sku === sku)
    if (!item && !filteredTransactions.length) {
        throw { message: "SKU does not exists" }
    }
    const initialStock = item?.stock ?? 0;
    const qty = calculateSum(filteredTransactions);
    return { sku, qty: initialStock - qty };
}

