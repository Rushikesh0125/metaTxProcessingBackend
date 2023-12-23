import { Transaction } from "../models/Transaction";

/*
 *Function aims to forward the transactions to autotask
 *it sends out transactions one by one to autotask
 *
 *AUTOTASK_WEBHOOK_URI -> it is webhook provided by openzeppelin defender's relayer
 *Autotask is configuered programatically in mtx/scripts/createAutotask
 *
 *Request to autotask takes in request body which is one of the attributes of transaction model object
 *request body consists of tx parameters with function param data
 *
 *@param transactions - List of last 100 transactions
 *
 */
export const executeTransaction = async (transaction: Transaction) => {
  const url = process.env.AUTOTASK_WEBHOOK_URI;

  const tx = transaction;
  try {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(tx.request),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(`Tx Number failed with reason ${error.message}`);
  }
};
