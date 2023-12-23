import { Signer } from "ethers";

/*
 *Types
 *For hadling Data transfer object through controller, services and responses
 */

type Data = {
  _msg: string;
  _for: string;
};

type transactionBodyParams = {
  from: string;
  data: Data;
  signer: Signer;
};

export { Data, transactionBodyParams };
