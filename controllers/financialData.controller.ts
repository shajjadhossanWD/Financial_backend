import { Request, Response } from 'express';
import FinancialData from '../models/financialData.model';
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const calculateFinancialHealth = CatchAsyncError(
async (req: Request, res: Response) => {
  try {
    const { income, expenses, debts, assets } = req.body;

    // Save financial data to MongoDB
    const financialData = new FinancialData({ income, expenses, debts, assets });
    await financialData.save();

    // Implement financial health score calculation logic here
    const financialHealthScore = calculateScore(income, expenses, debts, assets);

    res.json({ score: financialHealthScore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }
);


const calculateScore = (income: number, expenses: number, debts: number, assets: number): number => {
  // Simple Financial Health Score Calculation
  const netIncome = income - expenses;
  const totalLiabilities = debts + assets;

  if (totalLiabilities === 0) {
    // Avoid division by zero
    return netIncome > 0 ? 100 : 0;
  }

  const financialHealthScore = (netIncome / totalLiabilities) * 100;
  return Math.round(financialHealthScore); // Round to the nearest integer

  }
