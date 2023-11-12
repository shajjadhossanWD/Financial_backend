import express from "express";
import {
    calculateFinancialHealth
} from "../controllers/financialData.controller";

import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const financialDataRouter = express.Router();

financialDataRouter.post(
 "/financial-data",
 isAuthenticated,
 authorizeRoles("user"),
 calculateFinancialHealth
 );


export default financialDataRouter;
