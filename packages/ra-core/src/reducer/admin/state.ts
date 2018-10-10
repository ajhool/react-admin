'use strict'

import { IState as IUIState} from './ui';
import { IState as ISavingState } from './saving';
import { IState as IRecordState } from './record';
import { IState as INotificationState } from './notifications';
import { IState as ILoadingState } from './loading';
import { IState as IAuthState } from './auth';
import { IState as IResourcesState } from './resource';
import { IState as IReferencesState } from './references';

export interface IState {
  readonly ui: IUIState;
  readonly saving: ISavingState;
  readonly record: IRecordState;
  readonly notifications: INotificationState;
  readonly loading: ILoadingState;
  readonly auth: IAuthState;
  readonly resources: IResourcesState;
  readonly references: IReferencesState;
}

export default IState;
