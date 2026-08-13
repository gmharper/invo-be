import { DashboardTab } from "../schema/dashboardTab.schema";

export async function getDashboardTabs() {
    const total = await DashboardTab.countDocuments();

    const { sort, order, limit, p, author } = props;

    let query = DashboardTab.find(author ? { author } : {}).sort({ [sort]:order });

    if (!author) {
        query = query.skip(p * limit).limit(limit)
    };

    const dashboardTabs = await query.lean()

    return {
        total,
        totalPages: Math.ceil(total / limit),
        dashboardTabs
    };
};

export async function getDashboardTab(id) {
    const dashboardTab = await DashboardTab.findOne({ _id:id })
        .lean();

    return dashboardTab;
};

export async function postDashboardTab(inventory) {
    try {
        const result = await DashboardTab.insertOne({ ...inventory });
        return result.toObject();
    } catch (err) {
        console.error(err);
    };
};

export async function patchDashboardTab(id, patch) {
    const dashboardTab = await DashboardTab.findOneAndUpdate(
        { _id:id }, 
        { $set:{...patch} }, 
        { returnDocument:'after' }
    );

    return dashboardTab;
};

export async function clearDashboardTab(id) {

};

export async function deleteDashboardTab(id) {
    const dashboardTab = await DashboardTab.findOneAndDelete({ _id:id });

    return dashboardTab;
};