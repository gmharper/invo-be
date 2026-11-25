// USER
import { getUsersService, getUserService } from "./user/getUser.service.js";
import { postUserService } from "./user/postUser.service.js";
import { patchUserService } from "./user/patchUser.service.js";
import { deleteUserService } from "./user/deleteUser.service.js";

// USER PREFERENCES
import { getUserPreferencesService } from "./preferences/getPreferences.service.js";
import { patchUserPreferencesService } from "./preferences/patchUserPreferences.service.js";

// INVENTORY
import { getInventoriesService, getInventoryService } from "./inventory/getInventory.service.js";
import { postInventoryService } from "./inventory/postInventory.service.js";
import { patchInventoryService } from "./inventory/patchInventory.service.js";
import { deleteInventoryService } from "./inventory/deleteInventory.service.js";

// ITEM
import { getItemsService, getItemService } from "./item/getItem.service.js";
import { postItemService } from "./item/postItem.service.js";
import { patchItemService } from "./item/patchItem.service.js";
import { deleteItemService } from "./item/deleteItem.service.js";

// MACHINE
import { getMachinesService, getMachineService } from "./machine/getMachine.service.js";
import { postMachineService } from "./machine/postMachine.service.js";
import { patchMachineService } from "./machine/patchMachine.service.js";
import { deleteMachineService } from "./machine/deleteMachine.service.js";

// WORKFLOW
import { getWorkflowsService, getWorkflowService } from "./workflow/getWorkflow.service.js";
import { postWorkflowService } from "./workflow/postWorkflow.service.js";
import { patchWorkflowService } from "./workflow/patchWorkflow.service.js";
import { deleteWorkflowService } from "./workflow/deleteWorkflow.service.js";

// DASHBOARD TABS
import { getDashboardTabsService, getDashboardTabService } from "./dashboardTab/getDashboardTab.service.js";
import { postDashboardTabService } from "./dashboardTab/postDashboardTab.service.js";
import { patchDashboardTabService } from "./dashboardTab/patchDashboardTab.service.js";
import { deleteDashboardTabService } from "./dashboardTab/deleteDashboardTab.service.js";

// COMMENTS
import { getCommentsService, getCommentService } from "./comment/getComment.service.js";
import { postCommentService } from "./comment/postComment.service.js";
import { patchCommentService } from "./comment/patchComment.service.js";
import { deleteCommentService } from "./comment/deleteComment.service.js";

// HISTORY
import { getHistoryService } from "./history/getHistory.service.js";
import { appendHistoryService, trimHistoryService } from "./history/patchHistory.service.js";

export {
    getUsersService, getUserService, postUserService, patchUserService, deleteUserService,
    getUserPreferencesService, patchUserPreferencesService,
    getInventoriesService, getInventoryService, postInventoryService, patchInventoryService, deleteInventoryService,
    getItemsService, getItemService, postItemService, patchItemService, deleteItemService,
    getMachinesService, getMachineService, postMachineService, patchMachineService, deleteMachineService,
    getWorkflowsService, getWorkflowService, postWorkflowService, patchWorkflowService, deleteWorkflowService,
    getDashboardTabsService, getDashboardTabService, postDashboardTabService, patchDashboardTabService, deleteDashboardTabService,
    getCommentsService, getCommentService, postCommentService, patchCommentService, deleteCommentService,
    getHistoryService, appendHistoryService, trimHistoryService
};