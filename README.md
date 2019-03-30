# TransactionsExport
Exports BTC transactions (e.g. from a Ledger device) into Cointracking import file (CSV).

Usage

```
git clone https://github.com/digitaldonkey/TransactionsExport
cd TransactionsExport
npm install 
npm run review xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz 
```


Review your Export. 

Make sure the constants match your needs. 
How tha exact Excell import is set up depends on the language you use for Cointracking UI.  

```
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
npm run review xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz myExport.csv
```

The Format matches what you require in https://cointracking.info/import/import_xls.

See also: https://bitcoin.stackexchange.com/a/64685
