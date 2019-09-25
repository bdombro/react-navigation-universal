import Reactotron from 'reactotron-react-js';
import {reactotronRedux} from "reactotron-redux";

Reactotron
    .configure() // controls connection & communication settings
    .use(reactotronRedux())
    .connect(); // let's connect!

export {Reactotron};
