import { Request, Response } from 'express';
import FinancialData from '../models/financialData.model';
import { CatchAsyncError } from "../middleware/catchAsyncError";

export const calculateFinancialHealth = CatchAsyncError(
async (req: Request, res: Response) => {
  try {
    const { income, expenses, debts, assets, month, year } = req.body;

    const email = req.user.email;

    // Save financial data to MongoDB
    const financialData = new FinancialData({ income, expenses, debts, assets, email, month, year });

    const financialHealthScore = calculateScore(income, expenses, debts, assets);

    financialData.score = financialHealthScore;
    await financialData.save();


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
  const totalLiabilities = Number(debts) + Number(assets);

  if (totalLiabilities === 0) {
    // Avoid division by zero
    return netIncome > 0 ? 100 : 0;
  }

  const financialHealthScore = (netIncome / totalLiabilities) * 100;
  return Math.round(financialHealthScore); 
  }


 export const getAllFinancialData = CatchAsyncError(
    async (req: Request, res: Response) => {
      try {
        const allFinancialData = await FinancialData.find().sort({ createdAt: -1 });
        res.json(allFinancialData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );


  export const getFinancialDataByEmail = CatchAsyncError(
    async (req: Request, res: Response) => {
      try {
        const { email } = req.params; 
        const financialData = await FinancialData.find({ email });
  
        if (!financialData) {
          return res.status(404).json({ error: 'Financial data not found for the specified email' });
        }
  
        res.json(financialData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
  


  export const getFinancialDataByMonth = CatchAsyncError(
    async (req: Request, res: Response) => {
      try {
        const { email } = req.params;
        const financialData = await FinancialData.find({ email });
        if (!financialData) {
          return res.status(404).json({ error: 'Financial data not found for the specified email' });
        }
        
        const result = financialData.map((data: any) => {
          return {
            score: data.score,
            month: data.month
          };
        });
  
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );
  