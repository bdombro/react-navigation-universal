import Reactotron from 'reactotron-react-js';
import {mst} from "reactotron-mst";

Reactotron
    .configure() // controls connection & communication settings
    .use(mst())
    .connect(); // let's connect!

export {Reactotron};
