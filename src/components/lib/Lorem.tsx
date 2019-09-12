import React from "react";
import {Text} from "react-native";

let lorem = `Vivamus suscipit tortor eget felis porttitor volutpat. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla quis lorem ut libero malesuada feugiat. Donec sollicitudin molestie malesuada.`;
lorem = lorem.repeat(8);
lorem = "\n\n" + lorem + "\n";
lorem = lorem.repeat(4);

export const Lorem = () => <Text>{lorem}</Text>;
