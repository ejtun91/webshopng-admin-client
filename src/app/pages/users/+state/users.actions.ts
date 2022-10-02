import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';
import { UsersEntity } from './users.models';

export const buildUserSession = createAction('[Users] Build User Session');

export const buildUsersSessionSuccess = createAction(
  '[Users] Build User Session Success',
  props<{ user: User }>()
);

export const buildUsersSessionFailure = createAction(
  '[Users] Build User Session Failure'
);
