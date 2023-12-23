# Meta Transaction batch processing backend

 A Backend system with** **TsEd** APIs, **OpenZeppelin defender's relayer and autotask action** **to Batch process saved user's Meta transactions**.
 With **Mongo DB Atlas** as secure database buffer.

 ## stack
   - **TsEd**
   - **Openzepplin defender** - Relayer & autotask
   - **Mongo DB Atlas** - Used as DB Buffer for transaction data

 ## Directories 
   - **api** - Consists of all API logic
   - **mtx** - Consists of contracts, deployment and creation of contracts, relayer, forwarder, and autotask.
   - **legacy** - raw express api outline for testing with express "does not contributes to project"

 ## What's done
   - Accumulating transaction data with user signature.
   - validation of data and valid whitelisted user.
   - validation of contract call through autotask before execution.
   - Logic of buffer size of 100. Execution of 100 transaction triggers one by one in middleware. after 100th transaction is saved.
   - Only registered users can do meta transactions, Validated through middleware before saving the transaction and signature data to DB.
   - Creation and deployment of relayers, autotask.
   - Implemented autotask in a way that it handles gas, nonce, and other tx data.

 ## Needed to be done
   - **tests** - Was not able to produce tests diretly from backend as it was time consuming to accomodate or construct signer object at backend for signatures.
   - **minimal frontend** - could have made it full fledge by a front end

