import { StockLevel, StockLevelError } from "./interfaces"
import { currentStockLevel } from "./utils/stock-level";

let args = process.argv.slice(2)
console.log(args)
for (let i = 0; i < args.length; i++) {
    let sku = args[i]
    currentStockLevel(sku)
        .then((res: StockLevel) => {
            console.table(res)
        })
        .catch((err: StockLevelError) => {
            console.dir(err)
        })
}