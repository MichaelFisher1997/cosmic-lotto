// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title LottoNFT
 * @dev ERC721 token that represents lottery tickets
 */
contract LottoNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to draw number
    mapping(uint256 => uint256) private _drawNumbers;
    
    // Mapping from draw number to array of token IDs
    mapping(uint256 => uint256[]) private _drawTickets;

    // Base URI for token metadata
    string private _baseTokenURI;

    // Contract that can mint new tokens (the LottoGame contract)
    address public minter;

    // Events
    event TicketMinted(address indexed to, uint256 tokenId, uint256 drawNumber);

    /**
     * @dev Constructor that sets the base token URI and initial owner
     */
    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_
    ) ERC721(name_, symbol_) {
        _baseTokenURI = baseURI_;
    }

    /**
     * @dev Set the minter address (only callable by owner)
     * @param _minter Address of the minter contract
     */
    function setMinter(address _minter) external onlyOwner {
        require(_minter != address(0), "Invalid minter address");
        minter = _minter;
    }

    /**
     * @dev Mint a new ticket (only callable by minter)
     * @param to Address to mint the ticket to
     * @param drawNumber The draw number this ticket is for
     * @return The new token ID
     */
    function mint(address to, uint256 drawNumber) external returns (uint256) {
        require(msg.sender == minter, "Caller is not the minter");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(to, newTokenId);
        _drawNumbers[newTokenId] = drawNumber;
        _drawTickets[drawNumber].push(newTokenId);
        
        emit TicketMinted(to, newTokenId, drawNumber);
        return newTokenId;
    }

    /**
     * @dev Get the draw number for a specific token
     * @param tokenId The token ID to check
     * @return The draw number
     */
    function getDrawNumber(uint256 tokenId) external view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _drawNumbers[tokenId];
    }

    /**
     * @dev Get all ticket IDs for a specific draw
     * @param drawNumber The draw number to get tickets for
     * @return Array of token IDs
     */
    function getTicketsForDraw(uint256 drawNumber) external view returns (uint256[] memory) {
        return _drawTickets[drawNumber];
    }

    /**
     * @dev Override base URI for token metadata
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Set the base URI for token metadata (only callable by owner)
     * @param baseURI The new base URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Check if the contract supports an interface
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
