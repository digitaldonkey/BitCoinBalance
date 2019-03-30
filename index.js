const axios = require("axios");
const jsoncsv = require('json-csv');
const fs = require('fs');
const dateFormat = require('dateformat');

// See: https://bitcoin.stackexchange.com/a/64685
const API_URL = ' https://blockchain.info/multiaddr?active='

const EXCHANGE = 'Ledger BTC'
const TRADE_GROUP = ''

// Import is dependent on your cointracking language settings.
// This script can only turn 'Deposit' and 'Withdrawal' into cointracking imports.
const DEPOSIT = 'Einzahlung';
const WITHDRAWL = 'Auszahlung'

// Date is also language dependent
// See: https://www.npmjs.com/package/dateformat#mask-options
const DATE_FORMAT = 'dd-mm-yyyy HH:MM:ss'

const parseOptions = {
  fields: [
    {
       //required: field name for source value
        name: 'result',
        //required: column label for CSV header
        label: 'Type (Trade IN or OUT)',
         filter : function(value) {
           return value < 0 ? WITHDRAWL: DEPOSIT
         }
      },
      {
        label: 'Buy Amount',
         name: 'result',
         filter : function(value) {
           return value > 0 ? toBtc(value) : null;
         }
      },
      {
        label: 'Buy Cur.',
        name: 'result',
        filter : function(value) {
           return value > 0 ? 'BTC' : null;
        }
      },
      {
        label: 'Sell Amount',
        name: 'result',
        filter : function(value) {
           return value < 0 ?  toBtc(value) * -1 : null;
        }
      },
      {
        label: 'Sell Cur.',
        name: 'result',
        filter : function(value) {
           return value < 0 ? 'BTC' : null;
        }
      },
      {
       label: 'Fee Amount (optional)',
       name: 'fee',
       filter : function(value) {
         return toBtc(value);
       }
      },
      {
        label: 'Fee Cur. (optional)',
        name: 'fee',
        filter : function(value) {
          return value > 0 ? 'BTC' : null;
        }
      },
      {
        label: 'Exchange (optional)',
        name: 'result', // Irrelevant.
        filter : function(value) {
          return EXCHANGE;
        }
      },
      {
        label: 'Trade Group (optional)',
        name: 'result', // Irrelevant.
        filter : function(value) {
          return TRADE_GROUP;
        }
      },
      {
        label: 'Comment (optional)',
        name: 'hash'
      },
    {
      label: 'Date',
      name : 'time',
      filter : function(value) {
        const d = new Date(value * 1000);
        return dateFormat(d, DATE_FORMAT);
      }
    }
  ],
  fieldSeparator : ';'
};


// Write CSV file ?
const writeCsvFile = process.argv[3];

// Print Help if no arg provided.
const dataSource = process.argv[2];
if (!dataSource) {
  console.log('Usage npm run exportFromFile <json file> | <xpub string>')
  console.log('')
  console.log('The JSON file you might get manually from blockchain.info e.g: https://blockchain.info/multiaddr?active=xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz. If you provide a xpub key the script will do this request for you.')
  console.log('')
  console.log('Optionally provide a filename to write CSV to a file.')

}

// You can provide a file or a pubkey
const dataMethod = fs.existsSync(dataSource) ? 'file' : 'api';

// Load data from API.
if(dataMethod === 'api') {
  // Verify xpub key.
  if(dataSource.length !== 111 && dataSource.substr(0, 4) !== 'xpub') {
    console.log('First argument must be a Bitcoin xpub key starting with "xpub" and a overall length of 111 letters.');
  }
  else {
    // Get data.
    const getData = async url => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        createCSV(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData(API_URL + dataSource);
  }
}

// Local file
if(dataMethod === 'file') {
  try {
    if (fs.existsSync(dataSource)) {
      createCSV(JSON.parse(fs.readFileSync(dataSource)));
    }
    else {
      console.log('Cant read file: ' + dataSource)
    }
  } catch(err) {
    console.error(err)
  }
}


function createCSV (data) {

  if (!Array.isArray(data.txs) || data.txs.length < 1) {
    console.log('No transactions found.')
    return;
  }

  jsoncsv.csvBuffered(
    data.txs,
    parseOptions,
    function(err,csv) {
      if (!err && writeCsvFile) {
        writeFile(csv)
      }
      else if (!err) {
        console.log(csv)
      }
      else {
        console.log(err, 'error')
      }
    }
  );
}


function writeFile (content) {
  fs.writeFile(writeCsvFile, content, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log('Wrote to file ' + writeCsvFile);
  });
}

// Helper to convert Satoshi values to BTC.
function toBtc(val) { return val / 100000000};
