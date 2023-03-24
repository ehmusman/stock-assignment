import { it, expect, describe } from "vitest";
import { currentStockLevel } from "../stock-level";
import { StockLevel, Stock, Transaction } from "../../interfaces";


describe("currentStockLevel", () => {
    // Mock data
    const mockStocks: Stock[] = [
        { sku: "SKU001", stock: 10 },
        { sku: "SKU002", stock: 5 },
        { sku: "SKU003", stock: 0 },
    ]
    const mockTransactions: Transaction[] = [
        { sku: "SKU001", type: "order", qty: 5 },
        { sku: "SKU001", type: "order", qty: 1 },
        { sku: "SKU002", type: "refund", qty: 2 },
        { sku: "SKU002", type: "order", qty: 3 },
    ]

    it("should throw an error if SKU does not exist", async () => {
        const sku = "SKU004"
        await expect(currentStockLevel(sku, mockStocks, mockTransactions)).rejects.toEqual({ message: "SKU does not exists" })
    })
    it("should throw an error if SKU is empty or not a string", async () => {
        const invalidSkus = ["", null, undefined, 123, {}, []]
        for (const sku of invalidSkus) {
            await expect(currentStockLevel(sku, mockStocks, mockTransactions)).rejects.toThrowError("SKU is required")
        }
    })

    it("should return the correct stock level for a valid SKU value", async () => {
        const sku = "SKU001"
        const expectedStockLevel: StockLevel = { sku, qty: 4 }
        const result = await currentStockLevel(sku, mockStocks, mockTransactions)
        expect(result).toEqual(expectedStockLevel)
    });
});