import { Signer } from "ethers";

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
