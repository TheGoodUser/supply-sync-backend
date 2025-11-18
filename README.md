# ether-flow

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)

A compact Hardhat + TypeScript project for developing, testing, and deploying Ethereum smart contracts. Includes sample contracts, TypeChain types, deployment scripts, and a small Express-based service that interacts with deployed contracts.

## What the project does

- **`contracts/`**: Solidity contracts (e.g., `PurchaseOrderContract`, `HelloAdd`, `Lock`)
- **`scripts/`**: TypeScript deployment and utility scripts
- **`typechain-types/`**: Generated TypeScript contract bindings for type-safe interactions
- **`src/`**: Backend service (`app.ts`, routes, and contract integration examples)
- **`test/`**: Hardhat test suites

## Why this is useful

- **Quick scaffold** for writing, compiling, and testing Solidity contracts with Hardhat + TypeScript
- **Type-safe contract bindings** via TypeChain — catch errors at compile time instead of runtime
- **Full-stack examples** showing how to integrate contracts with a backend service
- **Ready for local development** with Hardhat node and example deploy scripts

## Getting started

### Prerequisites

- Node.js (v16 or higher)
- Git
- npm or yarn

### Installation

```bash
npm install
```

### Compile and generate types

```bash
npx hardhat compile
```

This compiles all Solidity contracts and generates TypeScript types in `typechain-types/`.

### Run tests

```bash
npx hardhat test
```

### Local development workflow

1. **Start a local Hardhat node** (terminal 1):

   ```bash
   npx hardhat node
   ```

2. **Deploy contracts to localhost** (terminal 2):

   ```bash
   npx hardhat run scripts/deploy.ts --network localhost
   ```

3. **Run the backend service** (terminal 3):
   ```bash
   npm run dev
   ```

### Common commands

| Command                                                 | Description                                    |
| ------------------------------------------------------- | ---------------------------------------------- |
| `npx hardhat compile`                                   | Compile contracts and generate TypeChain types |
| `npx hardhat test`                                      | Run all tests                                  |
| `npx hardhat node`                                      | Start a local Hardhat network                  |
| `npx hardhat run scripts/deploy.ts --network localhost` | Deploy to local network                        |
| `npm run dev`                                           | Start the backend service                      |

## Project structure

| Path                | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `contracts/`        | Solidity smart contracts                              |
| `scripts/`          | Deployment and utility scripts                        |
| `typechain-types/`  | Generated TypeScript contract bindings                |
| `src/`              | Backend service code (Express, contract interactions) |
| `test/`             | Hardhat test files                                    |
| `hardhat.config.ts` | Hardhat configuration                                 |

## Where to get help

- **Found a bug?** [Open an issue](../../issues) in this repository
- **Hardhat documentation**: https://hardhat.org
- **ethers.js documentation**: https://docs.ethers.org
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts/

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

For significant changes, please open an issue first to discuss proposed changes.

## License

This project is licensed under the ISC License. See the LICENSE file for details.
