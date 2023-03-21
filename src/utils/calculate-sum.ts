import { Transaction } from "../interfaces"
export default function calculateSum(filteredTransactions: Transaction[]): number {
    let qty = 0
    for (const transaction of filteredTransactions) {
        if (transaction.type === "order") {
            qty += transaction.qty;
        } else if (transaction.type === "refund") {
            qty -= transaction.qty;
        }
    }
    return qty
}