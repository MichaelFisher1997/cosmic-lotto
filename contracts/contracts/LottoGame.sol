// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./LottoNFT.sol";

/**
 * @title LottoGame
 * @dev A decentralized lottery game where users can purchase NFT tickets to participate in draws
 */
contract LottoGame is Ownable, ReentrancyGuard {
    // State variables
    LottoNFT public lottoNFT;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public currentDraw;
    uint256 public drawDuration = 1 weeks;
    uint256 public lastDrawTimestamp;
    
    // Draw information
    struct Draw {
        uint256 drawNumber;
        uint256 startTime;
        uint256 endTime;
        uint256 totalTickets;
        uint256 totalPrizePool;
        uint256[] winningTickets;
        bool isCompleted;
    }
    
    // Mapping from draw number to draw info
    mapping(uint256 => Draw) public draws;
    
    // Mapping from user to their ticket IDs for the current draw
    mapping(address => uint256[]) public userTickets;
    
    // Events
    event TicketPurchased(address indexed buyer, uint256 ticketId, uint256 drawNumber);
    event DrawStarted(uint256 drawNumber, uint256 startTime, uint256 endTime);
    event DrawCompleted(uint256 drawNumber, uint256[] winningTickets, uint256 prizePool);
    event PrizeClaimed(address indexed winner, uint256 amount, uint256 drawNumber);
    
    // Modifiers
    modifier whenDrawActive() {
        require(!isDrawComplete(), "Current draw is complete");
        _;
    }
    
    /**
     * @dev Constructor that initializes the contract
     * @param _lottoNFT Address of the LottoNFT contract
     */
    constructor(address _lottoNFT) {
        require(_lottoNFT != address(0), "Invalid LottoNFT address");
        lottoNFT = LottoNFT(_lottoNFT);
        _startNewDraw();
    }
    
    /**
     * @notice Purchase lottery tickets for the current draw
     * @param count Number of tickets to purchase
     */
    function purchaseTickets(uint256 count) external payable whenDrawActive nonReentrant {
        require(count > 0, "Must purchase at least one ticket");
        require(msg.value == ticketPrice * count, "Incorrect ETH amount sent");
        
        // Mint NFT tickets
        for (uint256 i = 0; i < count; i++) {
            uint256 ticketId = lottoNFT.mint(msg.sender, currentDraw);
            userTickets[msg.sender].push(ticketId);
            draws[currentDraw].totalTickets++;
            
            emit TicketPurchased(msg.sender, ticketId, currentDraw);
        }
        
        // Add to prize pool (90% of ticket price goes to prize pool, 10% to contract owner)
        uint256 prizeContribution = (msg.value * 90) / 100;
        draws[currentDraw].totalPrizePool += prizeContribution;
    }
    
    /**
     * @notice Complete the current draw and select winners
     * @param randomSeed A random seed to ensure fairness (can be from Chainlink VRF in production)
     */
    function completeDraw(uint256 randomSeed) external onlyOwner {
        require(!isDrawComplete(), "Draw already completed");
        require(block.timestamp >= draws[currentDraw].endTime, "Draw period not ended");
        
        uint256 totalTickets = draws[currentDraw].totalTickets;
        
        // If there are tickets, select winners
        if (totalTickets > 0) {
            // In a real implementation, use Chainlink VRF for randomness
            // This is a simplified version for demonstration
            uint256 winnerCount = totalTickets > 10 ? 3 : (totalTickets > 1 ? 1 : 0);
            
            for (uint256 i = 0; i < winnerCount; i++) {
                uint256 winnerIndex = uint256(keccak256(abi.encodePacked(randomSeed, i, block.timestamp, block.prevrandao))) % totalTickets;
                // In a real implementation, you would need to map the winner index to an actual ticket
                // This is simplified for demonstration
                draws[currentDraw].winningTickets.push(winnerIndex);
            }
            
            // Distribute prizes (simplified)
            if (winnerCount > 0) {
                uint256 prizePerWinner = draws[currentDraw].totalPrizePool / winnerCount;
                // In a real implementation, you would transfer the prize to the winners
                // For now, we just mark the draw as completed
            }
        }
        
        draws[currentDraw].isCompleted = true;
        emit DrawCompleted(currentDraw, draws[currentDraw].winningTickets, draws[currentDraw].totalPrizePool);
        
        // Start a new draw
        _startNewDraw();
    }
    
    /**
     * @notice Start a new draw
     */
    function _startNewDraw() private {
        currentDraw++;
        lastDrawTimestamp = block.timestamp;
        
        draws[currentDraw] = Draw({
            drawNumber: currentDraw,
            startTime: block.timestamp,
            endTime: block.timestamp + drawDuration,
            totalTickets: 0,
            totalPrizePool: 0,
            winningTickets: new uint256[](0),
            isCompleted: false
        });
        
        emit DrawStarted(currentDraw, block.timestamp, block.timestamp + drawDuration);
    }
    
    /**
     * @notice Check if the current draw is complete
     * @return bool True if the draw is complete
     */
    function isDrawComplete() public view returns (bool) {
        return block.timestamp >= draws[currentDraw].endTime || draws[currentDraw].isCompleted;
    }
    
    /**
     * @notice Get the current draw information
     * @return Draw The current draw information
     */
    function getCurrentDraw() external view returns (Draw memory) {
        return draws[currentDraw];
    }
    
    /**
     * @notice Get tickets owned by a user for the current draw
     * @param user Address of the user
     * @return Array of ticket IDs
     */
    function getUserTickets(address user) external view returns (uint256[] memory) {
        return userTickets[user];
    }
    
    /**
     * @notice Withdraw contract balance (only owner)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @notice Set the ticket price (only owner)
     * @param newPrice New ticket price in wei
     */
    function setTicketPrice(uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "Price must be greater than 0");
        ticketPrice = newPrice;
    }
    
    /**
     * @notice Set the draw duration (only owner)
     * @param newDuration New duration in seconds
     */
    function setDrawDuration(uint256 newDuration) external onlyOwner {
        require(newDuration > 0, "Duration must be greater than 0");
        drawDuration = newDuration;
    }
    
    // Fallback function to receive ETH
    receive() external payable {}
}
