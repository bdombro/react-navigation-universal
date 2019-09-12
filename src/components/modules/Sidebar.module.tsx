import React from "react";
import {View} from "react-native";
import {Text} from "react-native-elements";
import {Link} from "../lib/Routing";

export const SidebarModule = () => (
    <View>
        <Text>Desktop Sidebar</Text>
        <Link to="HomeStack"><Text>Home</Text></Link>
        <Link to="Home2Stack"><Text>Home2</Text></Link>
        <Link to="Blank"><Text>Blank</Text></Link>
    </View>
);
