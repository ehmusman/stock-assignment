import { it, expect, describe } from "vitest";
import { currentStockLevel } from "../stock-level";
import stockData from "../../data/stock.json";
import transactionData from "../../data/transactions.json";
import { StockLevel, Stock, Transaction } from "../../interfaces";

describe("currentStockLevel", () => {
    const sku = "LTV719449/39/39";
    const transactions: Transaction[] = transactionData as Transaction[];
    const stocks: Stock[] = stockData;

    it("should return an object with the required property names", async () => {
        const stock: StockLevel = await currentStockLevel(sku);
        expect(stock).toHaveProperty("sku");
        expect(stock).toHaveProperty("qty");
    });

    it("should throw an error when given an empty SKU string", async () => {
        const emptySku = "";
        await expect(currentStockLevel(emptySku)).rejects.toThrowError("Valid SKU is required");
    });

    it("should throw an error when given an invalid SKU value", async () => {
        const invalidSkus = [1, {}, [], true];
        for (const sku of invalidSkus) {
            await expect(currentStockLevel(sku)).rejects.toThrowError("Valid SKU is required");
        }
    });

    it("should return the correct stock level for a valid SKU value", async () => {
        const item: Stock = stocks.find((stock: Stock) => stock.sku === sku)!;
        const initialStock = item.stock ?? 0;
        const filteredTransactions: Transaction[] = transactions.filter((transaction: Transaction) => transaction.sku === sku);
        const qtySum = filteredTransactions.reduce((accumulator: number, currentObject: Transaction) => currentObject.type === "order" ? accumulator + currentObject.qty : accumulator - currentObject.qty, 0);

        const stock: StockLevel = await currentStockLevel(sku);
        expect(stock.sku).toBe(sku);
        expect(stock.qty).toBe(initialStock - qtySum);
    });
});