import { it, expect } from "vitest"
import { currentStockLevel } from "./stock-level"
import stockData from "../data/stock.json"
import transactionData from "../data/transactions.json"
import { StockLevel, Stock, Transaction } from "../interfaces"

it("should return an object with the required property names", async () => {
    const sku = "LTV719449/39/39"
    let stock: StockLevel = await currentStockLevel(sku)
    expect(stock).toHaveProperty("sku")
    expect(stock).toHaveProperty("qty")
})

it("should throw error on empty SKU string", async () => {
    const sku = ""
    await expect(currentStockLevel(sku)).rejects.toThrowError()
})

it("should check if the result is correct or not on a valid SKU value", async () => {
    const sku = "LTV719449/39/39"
    let transactions: Transaction[] = transactionData as Transaction[]
    let stocks: Stock[] = stockData
    let item: Stock = stocks.find((stock: Stock) => stock.sku === sku)!
    let qty = item?.stock
    let filteredTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.sku === sku)
    let qtySum = filteredTransactions.reduce((accumulator: number, currentObject: Transaction) => accumulator + currentObject.qty, 0)


    let stock: StockLevel = await currentStockLevel(sku)
    expect(stock.qty).toBe(qty - qtySum)
    expect(stock.sku).toBe(sku)
})
