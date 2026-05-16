# Calculadora de juros compostos

A Next.js application for calculating compound interest with monthly contributions. Built with React, TypeScript, Tailwind CSS, and NumberFlow for animated results.

## Features

- 💰 Calculate compound interest with compound formula
- 📊 Support for monthly and yearly interest rates
- ⏱️ Choose between months and years for the investment period
- 🎬 Animated results using NumberFlow
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🔄 Clear button to reset the calculator

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your **Valor inicial** (current amount)
2. Enter your **Aportes mensais** (amount you'll add each month)
3. Enter the **Taxa de juros** and select if it's monthly or yearly
4. Enter the **Period** and select if it's in months or years
5. Click **Calculate** to see the results:
   - Final Value: Total amount after interest
   - Total Invested: Sum of initial value and all contributions
   - Total Interest: Interest earned

## Calculation Formula

The calculator uses the compound interest formula:

```
FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]
```

Where:
- FV = Future Value (final amount)
- PV = Present Value (initial investment)
- PMT = Payment (monthly contribution)
- r = Interest rate per period
- n = Number of periods

If the interest rate is annual, it's converted to a monthly equivalent using:
```
r_monthly = (1 + r_annual)^(1/12) - 1
```

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **NumberFlow** - Animated number display

## Build and Deploy

Build for production:

```bash
npm run build
npm start
```

## License

MIT
