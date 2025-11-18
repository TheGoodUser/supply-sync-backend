// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract PurchaseOrderContract {
    // PO Status
    enum POStatus {
        CREATED,
        ACCEPTED,
        REJECTED,
        COMPLETED
    }

    struct PurchasedOrder {
        uint256 poId;
        address buyer;
        address producer;
        string itemName;
        uint256 quantity;
        uint256 pricePerUnit;
        uint256 totalAmount;
        POStatus status;
        uint256 createdAt;
    }

    uint256 public nextPOId = 1;
    mapping(uint256 => PurchasedOrder) public purchaseOrders;

    event POCreated(
        uint256 indexed poId,
        address indexed buyer,
        address indexed producer,
        string itemName,
        uint256 quantity,
        uint256 pricePerUnit,
        uint256 totalAmount,
        uint256 createdAt
    );

    function createPO(
        address producer,
        string memory itemName,
        uint256 quantity,
        uint256 pricePerUnit
    ) external returns (uint256) {
        require(producer != address(0), "Invalid producers");
        require(quantity > 0, "Invalid quantity");
        require(pricePerUnit > 0, "Invalid price");

        uint256 totalCost = quantity * pricePerUnit;

        PurchasedOrder memory po = PurchasedOrder({
            poId: nextPOId,
            buyer: msg.sender,
            producer: producer,
            itemName: itemName,
            quantity: quantity,
            pricePerUnit: pricePerUnit,
            totalAmount: totalCost,
            status: POStatus.CREATED,
            createdAt: block.timestamp
        });

        purchaseOrders[nextPOId] = po;

        emit POCreated(
            nextPOId,
            msg.sender,
            producer,
            itemName,
            quantity,
            pricePerUnit,
            totalCost,
            block.timestamp
        );

        nextPOId++;

        return po.poId;
    }
}
