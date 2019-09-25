import {Dimensions} from "react-native";
import {types} from "mobx-state-tree"
import {Reactotron} from "../config/Reactotron.config";
import {ThemeConfig} from "../config/Theme.config";
import {getViewportInfo, getViewportInfoResponse} from "../lib/getViewportInfo";

interface User {id: string, token: string, roles: string[]};

const GlobalStoreModel = types
    .model("GlobalStore", {
        forceRenderCount: types.number,
        theme: types.frozen<typeof ThemeConfig.light>(),
        viewportInfo: types.frozen<getViewportInfoResponse>(),
        sidebarToggled: types.boolean,
        user: types.frozen<User>(),
    })
    .actions(self => ({
        themeToggle() {
            self.theme = self.theme.dark ? ThemeConfig.light : ThemeConfig.dark;
        },
        viewportInfoRefresh() {
            self.viewportInfo = getViewportInfo();
        },
        userSet(userNext: User) {
            self.user = userNext;
        },
        userReset() {
            self.user = {id: "", token: "", roles: []};
        }
    }));

// create an instance from a snapshot
export const GlobalStore = GlobalStoreModel.create({
    forceRenderCount: 0,
    theme: ThemeConfig.light,
    viewportInfo: getViewportInfo(),
    sidebarToggled: getViewportInfo().isLarge,
    user: {id: "", token: "", roles: []},
});

// @ts-ignore: Reactotron.trackMstNode exists but untyped.
Reactotron.trackMstNode(GlobalStore);

// listen to new snapshots
// onSnapshot(GlobalStore, snapshot => {
//     console.dir(snapshot)
// });

setInterval(() => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    if (width != GlobalStore.viewportInfo.width || height != GlobalStore.viewportInfo.height)
        GlobalStore.viewportInfoRefresh();
}, 200);
