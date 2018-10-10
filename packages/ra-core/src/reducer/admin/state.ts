'use strict'

import { IState as uiState} from './ui';
import { IState as savingState } from './saving';
import { IState as recordState } from './record';
import { IState as notificationState } from './notifications';
import { IState as loadingState } from './loading';
import { IState as authState } from './auth';

export interface IState {
  readonly ui: uiState;
  readonly saving: savingState;
  readonly record: recordState;
  readonly notifications: notificationState;
  readonly loading: loadingState;
  readonly auth: authState;
}

export default IState;
