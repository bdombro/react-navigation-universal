import {onSnapshot, types} from "mobx-state-tree"
import {Reactotron} from "../config/Reactotron.config";
import {sleep} from "../lib/sleep";
import {set} from "mobx";

const UserModel = types
    .model("User", {
        id: types.string,
        token: types.string,
        // roles: types.array(types.enumeration("roles", ["admin", "identified", "unidentified"])),
        // roles: types.string,
        roles: types.frozen(),
    })
    .actions(self => ({
        async login() {
            // self.id = "12345";
            // self.token = "1234567890";
            // self.roles = ["admin","identified"];
            set(self, {
                id: "12345",
                token: "1234567890",
                roles: ["admin", "identified"],
            });
        },
        async logout() {
            set(self, {id: "", token: "", roles: []});
        }
    }));

const GlobalStoreModel = types
    .model("GlobalStore", {
        user: UserModel,
    });

// create an instance from a snapshot
export const GlobalStore = GlobalStoreModel.create({
    user: {id: "", token: "", roles: []}
});

// @ts-ignore: Reactotron.trackMstNode exists but untyped.
Reactotron.trackMstNode(GlobalStore);

// listen to new snapshots
// onSnapshot(GlobalStore, snapshot => {
//     console.dir(snapshot)
// });
