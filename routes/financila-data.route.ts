import express from "express";
import {
    calculateFinancialHealth,
    getAllFinancialData,
    getFinancialDataByEmail
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


export default financialDataRouter;
