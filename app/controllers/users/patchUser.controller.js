// MODELS
import { patchUser } from "../../models/index.js";

// SCHEMA
import { UserZSchema } from "../../schema/user.schema.js";
import { ObjectIdSchema } from "../../schema/z.js";

export default async function patchUserController(req, res, next) {
    const { userId } = req.params;
    const data = req.body;

    const parsedId = ObjectIdSchema.safeParse(userId);
    if (!parsedId.success) {
        return res.status(400).json({
            error: "Invalid user ID",
            issues: parsedId.error.issues
        });
    };

    const parsed = UserZSchema.parse(data);

    const blacklist = [
        "_id", "username", "passwordHash", "preferences", 
        "inventories", "items", "machines", "workflows",
        "history", "createdAt"
    ];

    blacklist.forEach((key) => {
        delete parsed[key];
    });

    return patchUser(parsedId.data, parsed)
        .then((user) => {
            if (!user) return res.status(404).send({ err_msg: "404: Not Found" });
            else return res.status(200).send({ 
                msg: "User patched successfully!",
                user 
            });
        })
        .catch((err) => { next(err) })
};