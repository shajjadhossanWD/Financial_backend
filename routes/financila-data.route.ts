import express from "express";
import {
    calculateFinancialHealth,
    getAllFinancialData,
    getFinancialDataByEmail,
    getFinancialDataByMonth
} from "../controllers/financialData.controller";

import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const financialDataRouter = express.Router();

financialDataRouter.post(
 "/financial-data",
 isAuthenticated,
 authorizeRoles("user"),
 calculateFinancialHealth
 );
 financialDataRouter.get("/financial-data", getAllFinancialData);
 financialDataRouter.get("/financial-data/:email", getFinancialDataByEmail);
 financialDataRouter.get("/financial-data/cart/:email", getFinancialDataByMonth);


export default financialDataRouter;
