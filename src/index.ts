import stockData from "./data/stock.json"
import transactionData from "./data/transactions.json"

import { Stock, Transaction, StockLevel, StockLevelError } from "./interfaces"
import { currentStockLevel } from "./utils/stock-level";
const stocks: Stock[] = stockData
const transactions: Transaction[] = transactionData as Transaction[]

let args = process.argv.slice(2)
console.log(args)

for (let i = 0; i < args.length; i++) {
    let sku = args[i]
    currentStockLevel(sku, stocks, transactions)
        .then((res: StockLevel) => {
            console.table(res)
        })
        .catch((err: StockLevelError) => {
            console.dir(err)
        })
}