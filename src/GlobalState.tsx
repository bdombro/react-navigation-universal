import { action, observable, set } from 'mobx';
import { Dimensions } from 'react-native';
import { getViewportInfo } from './lib/getViewportInfo';
import {ThemeConfig} from "./config/Theme.config";
// import { MobxPersistClass } from './lib/MobxPersistClass';

class GlobalStateClass {
  // persistedFields = ['user', 'sidebarToggled'];
  // isHydrated = false;

  @observable
  user = {
    id: '',
    token: '',
    roles: []
  };

  @action
  logout = async () => {
    // May need to wrap this in set
    this.user = {
      id: '',
      token: '',
      roles: []
    };
  };

  @observable
  theme = ThemeConfig.light;
  @action
  toggleTheme = () => this.theme= this.theme.dark ? ThemeConfig.light2 : ThemeConfig.dark;

  @observable
  forceRenderCount = 0;
  @action
  forceRender = () => ++this.forceRenderCount;

  @observable
  sidebarToggled = true;

  @observable
  viewportInfo = getViewportInfo();
  @action
  refreshViewportInfo = () => this.viewportInfo = getViewportInfo();
}
export const GlobalState = new GlobalStateClass();
// MobxPersistClass(GlobalState);

setInterval(() => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  if (width != GlobalState.viewportInfo.width || height != GlobalState.viewportInfo.height)
    GlobalState.refreshViewportInfo();
}, 200);
