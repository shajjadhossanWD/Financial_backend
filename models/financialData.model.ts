import mongoose, { Schema, Document } from 'mongoose';

interface FinancialData extends Document {
  income: number;
  expenses: number;
  debts: number;
  assets: number;
  score: number;
  month: string;
  year: string;
  email: string;
}

const FinancialDataSchema: Schema = new Schema({
  income: { 
    type: Number, 
    required: true 
  },
  expenses: { 
    type: Number, 
    required: true 
  },
  debts: { 
    type: Number, 
    required: true 
  },
  assets: { 
    type: Number, 
    required: true 
  },
  score: { 
    type: Number, 
    required: true,
    default: 1,
  },
  month: { 
    type: String, 
    required: true 
  },
  year: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
});

export default mongoose.model<FinancialData>('FinancialData', FinancialDataSchema);
