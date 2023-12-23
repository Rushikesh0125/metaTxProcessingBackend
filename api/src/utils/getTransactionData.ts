import { signMetaTxRequest } from "../../../mtx/src/signer";
import { ethers } from "ethers";
import { createInstance } from "./forwarderInst";
import { createContractInstance } from "./contractInst";

export const getTransactionData = async (
  _msg: string,
  _for: string,
  from: string,
  signer: any
) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const forwarderInst = createInstance(provider);
    const contractInst = createContractInstance(provider);
    const data = contractInst.interface.encodeFunctionData("putMessage", [
      _msg,
      _for,
    ]);
    const to = contractInst.address;
    const { signature, request } = await signMetaTxRequest(
      signer,
      forwarderInst,
      { to, from, data }
    );
    return { signature, request, from };
  } catch (error) {
    console.log("Failed!, Invalid Tx Data");
    throw new Error("Bad Tx Data");
  }
};
