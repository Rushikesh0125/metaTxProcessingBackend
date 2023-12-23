// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract FishInThePond is ERC2771Context{

    uint256 messageId;

    mapping (string => string) messageBox;
    mapping (uint256 => address) messageOwnerById;

    constructor(MinimalForwarder forwarder) ERC2771Context(address(forwarder)) {
    } 

    function putMessage(string memory _msg, string memory _for) public {
        messageId++;
        messageBox[_for] = _msg;
        messageOwnerById[messageId] = _msgSender();
    }

    function revealMessage(string memory _name) public view returns(string memory){
        if(keccak256(abi.encodePacked(messageBox[_name])) == keccak256(abi.encodePacked(""))){
            return "No Message";
        }

        return messageBox[_name];
    }

}