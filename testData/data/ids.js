import { ObjectId } from "mongodb";

// USERS
export const userIds = {
    'gmharper': new ObjectId('6a75f003ada1ee425aa74af9'),
    'boba_fett': new ObjectId('6a75eae8292c72785545b032'),
    'darth_maul': new ObjectId('6a75eae8292c72785545b033'),
    'darth_vader': new ObjectId('6a75eae8292c72785545b034'),
    'jar_jar': new ObjectId('6a75eae8292c72785545b035'),
    'yoda': new ObjectId('6a75eae8292c72785545b036'),
    'obi_wan': new ObjectId('6a75eae8292c72785545b037'),
    'palpatine': new ObjectId('6a75eae8292c72785545b038'),
    'anakin': new ObjectId('6a75eae8292c72785545b039')
};

export const userPreferencesIds = {
    'gmharper': new ObjectId("6a7de2fa748fef5224525d18"),
    'boba_fett': new ObjectId("6a7de2fa748fef5224525d19"),
    'darth_maul': new ObjectId("6a7de2fa748fef5224525d1a"),
    'darth_vader': new ObjectId("6a7de2fa748fef5224525d1b"),
    'jar_jar': new ObjectId("6a7de2fa748fef5224525d1c"),
    'yoda': new ObjectId("6a7de2fa748fef5224525d1d"),
    'obi_wan': new ObjectId("6a7de2fa748fef5224525d1e"),
    'palpatine': new ObjectId("6a7de2fa748fef5224525d1f"),
    'anakin': new ObjectId("6a7de2fa748fef5224525d20")
};

// INVENTORIES
export const inventoryIds = {
    'test_inv_1': new ObjectId('6a7511150930fd3868490c99'), 
    'test_inv_2': new ObjectId('6a7511150930fd3868490c9a'), 
    'test_inv_3': new ObjectId('6a7511150930fd3868490c9b'), 
    'test_inv_4': new ObjectId('6a7511150930fd3868490c9c'), 
    'test_inv_5': new ObjectId('6a7511150930fd3868490c9d'), 
    'test_inv_6': new ObjectId('6a7511150930fd3868490c9e'), 
    'test_inv_7': new ObjectId('6a7511150930fd3868490c9f'), 
    'test_inv_8': new ObjectId('6a7511150930fd3868490ca0')
};

// ITEMS
export const itemIds = {
    'test_item_1': new ObjectId('6a75f0845a9a13e26ba49314'),
    'test_item_2': new ObjectId('6a75f0845a9a13e26ba49315'),
    'test_item_3': new ObjectId('6a75f0845a9a13e26ba49316'),
    'test_item_4': new ObjectId('6a75f0845a9a13e26ba49317'),
    'test_item_5': new ObjectId('6a75f0845a9a13e26ba49318'),
    'test_item_6': new ObjectId('6a75f0845a9a13e26ba49319'),
    'test_item_7': new ObjectId('6a75f0845a9a13e26ba4931a'),
    'test_item_8': new ObjectId('6a75f0845a9a13e26ba4931b')
};

// MACHINES
export const machineIds = {
    'test_machine_1': new ObjectId('6a75fc21d8295be39ee90431'),
    'test_machine_2': new ObjectId('6a75fc21d8295be39ee90432'),
    'test_machine_3': new ObjectId('6a75fc21d8295be39ee90433'),
    'test_machine_4': new ObjectId('6a75fc21d8295be39ee90434'),
    'test_machine_5': new ObjectId('6a75fc21d8295be39ee90435'),
    'test_machine_6': new ObjectId('6a75fc21d8295be39ee90436'),
    'test_machine_7': new ObjectId('6a75fc21d8295be39ee90437'),
    'test_machine_8': new ObjectId('6a75fc21d8295be39ee90438')
};

// WORKFLOWS
export const workflowIds = {
    'test_workflow_1': new ObjectId('6a75f751f94ae4c1e49ca9b3'),
    'test_workflow_2': new ObjectId('6a75f751f94ae4c1e49ca9b4'),
    'test_workflow_3': new ObjectId('6a75f751f94ae4c1e49ca9b5'),
    'test_workflow_4': new ObjectId('6a75f751f94ae4c1e49ca9b6'),
    'test_workflow_5': new ObjectId('6a75f751f94ae4c1e49ca9b7'),
    'test_workflow_6': new ObjectId('6a75f751f94ae4c1e49ca9b8'),
    'test_workflow_7': new ObjectId('6a75f751f94ae4c1e49ca9b9'),
    'test_workflow_8': new ObjectId('6a75f751f94ae4c1e49ca9ba')
};


// COMMENTS
export const commentIds = {
    'inventory1_comment1': new ObjectId("6a7b7523f90647a55640dcc7"),
    'inventory1_comment2': new ObjectId("6a7b7523f90647a55640dcc8"),
    'inventory1_comment3': new ObjectId("6a7b7523f90647a55640dcc9"),
    'inventory1_comment4': new ObjectId("6a7b7523f90647a55640dcca"),
    'inventory1_comment5': new ObjectId("6a7b7523f90647a55640dccb"),
    'inventory2_comment1': new ObjectId("6a7b7523f90647a55640dccc"),
    'inventory2_comment2': new ObjectId("6a7b7523f90647a55640dccd"),
    'inventory4_comment1': new ObjectId("6a7b7523f90647a55640dcce"),
    'inventory6_comment1': new ObjectId("6a7b7523f90647a55640dccf"),
    'item1_comment1': new ObjectId("6a7b7523f90647a55640dcd0"),
    'item1_comment2': new ObjectId("6a7b7523f90647a55640dcd1"),
    'item1_comment3': new ObjectId("6a7b7523f90647a55640dcd2"),
    'item3_comment1': new ObjectId("6a7b7523f90647a55640dcd3"),
    'item8_comment1': new ObjectId("6a7b7523f90647a55640dcd4"),
    'item8_comment2': new ObjectId("6a7b7523f90647a55640dcd5"),
    'item8_comment3': new ObjectId("6a7b7523f90647a55640dcd6"),
    'item8_comment4': new ObjectId("6a7b7523f90647a55640dcd7"),
    'machine2_comment1': new ObjectId("6a7b7523f90647a55640dcd8"),
    'machine4_comment1': new ObjectId("6a7b7523f90647a55640dcd9"),
    'machine5_comment1': new ObjectId("6a7b7523f90647a55640dcda"),
    'machine5_comment2': new ObjectId("6a7b7523f90647a55640dcdb"),
    'machine5_comment3': new ObjectId("6a7b765d87af109be29ebc5a"),
    'machine6_comment1': new ObjectId("6a7b7523f90647a55640dcdd"),
    'machine7_comment1': new ObjectId("6a7b7523f90647a55640dcde")
};

// HISTORY
export const historyIds = {
    'inventory1_history': new ObjectId("6a7d21d34bbcae225dd3f69a"),
    'inventory2_history': new ObjectId("6a7d21d34bbcae225dd3f69b"),
    'inventory3_history': new ObjectId("6a7d21d34bbcae225dd3f69c"),
    'inventory4_history': new ObjectId("6a7d21d34bbcae225dd3f69d"),
    'inventory5_history': new ObjectId("6a7d21d34bbcae225dd3f69e"),
    'inventory6_history': new ObjectId("6a7d21d34bbcae225dd3f69f"),
    'inventory7_history': new ObjectId("6a7d21d34bbcae225dd3f6a0"),
    'inventory8_history': new ObjectId("6a7d21d34bbcae225dd3f6a1")
};

// DASHBOARD TABS
export const dashboardTabIds = {
    'dashboardtab1': new ObjectId("6a7de95ba1251aebb264484c"),
    'dashboardtab2': new ObjectId("6a7de95ba1251aebb264484d"),
    'dashboardtab3': new ObjectId("6a7de95ba1251aebb264484e")
};
