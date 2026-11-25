import { 
    patchUserService,
    patchUserPreferencesService,
    postInventoryService, patchInventoryService, deleteInventoryService,
    postItemService, patchItemService, deleteItemService,
    postMachineService, patchMachineService, deleteMachineService,
    postWorkflowService, patchWorkflowService, deleteWorkflowService,
    postDashboardTabService, patchDashboardTabService, deleteDashboardTabService,
    postCommentService, patchCommentService, deleteCommentService,
    appendHistoryService, trimHistoryService
} from "../service/index.js";

export async function dispatchCommand(command) {
    const { _id, payload } = command;

    switch (command.type) {
        // USER
        case "user.update":
            patchUserService(_id, payload);
            break;
        case "preferences.update":
            patchUserPreferencesService(_id, payload);
            break;

        // INVENTORY
        case "inventory.create":
            postInventoryService(payload);
            break;
        case "inventory.update":
            patchInventoryService(_id, payload);
            break;
        case "inventory.delete":
            deleteInventoryService(_id);
            break;

        // ITEM
        case "item.create":
            postItemService(payload);
            break;
        case "item.update":
            patchItemService(_id, payload);
            break;
        case "item.delete":
            deleteItemService(_id);
            break;

        // MACHINE
        case "machine.create":
            postMachineService(payload);
            break;
        case "machine.update":
            patchMachineService(_id, payload);
            break;
        case "machine.delete":
            deleteMachineService(_id);
            break;

        // WORKFLOW
        case "workflow.create":
            postWorkflowService(payload);
            break;
        case "workflow.update":
            patchWorkflowService(_id, payload);
            break;
        case "workflow.delete":
            deleteWorkflowService(_id);
            break;

        // DASHBOARD TAB
        case "dashboardTab.create":
            postDashboardTabService(payload);
            break;
        case "dashboardTab.update":
            patchDashboardTabService(_id, payload);
            break;
        case "dashboardTab.delete":
            deleteDashboardTabService(_id);
            break;

        // COMMENT
        case "comment.create":
            postCommentService(payload);
            break;
        case "comment.update":
            patchCommentService(_id, payload);
            break;
        case "comment.delete":
            deleteCommentService(_id);
            break;

        // HISTORY
        case "history.append":
            appendHistoryService(_id, payload);
            break;
        case "history.trim":
            trimHistoryService(_id, payload);
            break;
    };
};