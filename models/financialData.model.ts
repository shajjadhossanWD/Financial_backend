import mongoose, { Schema, Document } from 'mongoose';

interface FinancialData extends Document {
  income: number;
  expenses: number;
  debts: number;
  assets: number;
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
});

export default mongoose.model<FinancialData>('FinancialData', FinancialDataSchema);
