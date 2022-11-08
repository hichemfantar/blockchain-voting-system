// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Contacts {
    uint256 public count = 0; // state variable

    struct Contact {
        uint256 id;
        string name;
        string phone;
    }

    constructor() {
        createContact("Zafar Saleem", "123123123");
    }

    mapping(uint256 => Contact) public contacts;

    function createContact(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
    }
}
