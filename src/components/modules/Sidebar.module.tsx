import React from "react";
import {View} from "react-native";
import {Text, Link} from "../elements/paper";

export const SidebarModule = () => (
    <View>
        <Text>Desktop Sidebar</Text>
        <Link to="HomeStack"><Text>Home</Text></Link>
        <Link to="Home2Stack"><Text>Home2</Text></Link>
        <Link to="Blank"><Text>Blank</Text></Link>
    </View>
);
