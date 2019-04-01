# BitCoinBalance
Exports BTC transactions into Cointracking import file (CSV).

It only suports "Deposit" and "Withdrawal" as it is intended to be used to **track transactions made with a Ledger hardware wallet (e.g: Ledger Nano S.

The Format matches what you require in [https://cointracking.info/import/import_xls](https://cointracking.info/import/import_xls).

### Get started

```bash
git clone https://github.com/digitaldonkey/TransactionsExport
cd TransactionsExport
npm install 

```

### Basic usage
```bash
# Evaluate with test data
npm run export example.export.json 
# or 
npm run export example.export.json myExport.csv

# Basic Usage (calling blockchain.info API) 
npm run export xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz
# Write file 
npm run export xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz myexport.csv
```

### Using a local file

```bash
# Get data
wget https://blockchain.info/multiaddr?active=xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz -O testfile.json
# Review 
npm run export testfile.json
# Write CSV 
npm run export testfile.json myexport.csv
```



## Review your Export

Make sure the constants match your needs. 
How the Excel import is set up depends on the language you use for Cointracking website. 

```js
const EXCHANGE = 'Ledger BTC'
const TRADE_GROUP = ''

// Import is dependent on your cointracking language settings.
// This script can only turn 'Deposit' and 'Withdrawal' into cointracking imports.
const DEPOSIT = 'Einzahlung';
const WITHDRAWL = 'Auszahlung'

// Date is also language dependent
// See: https://www.npmjs.com/package/dateformat#mask-options
const DATE_FORMAT = 'dd-mm-yyyy HH:MM:ss'
```

If Everything is write you can write a csv file 

```
npm run export xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz myExport.csv
```

See also [https://bitcoin.stackexchange.com/a/64685](https://bitcoin.stackexchange.com/a/64685)
