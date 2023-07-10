import { UserInterface } from 'interfaces/user';
import { LabelInterface } from 'interfaces/label';
import { GetQueryInterface } from 'interfaces';

export interface ListenerInterface {
  id?: string;
  user_id?: string;
  followed_label_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  label?: LabelInterface;
  _count?: {};
}

export interface ListenerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  followed_label_id?: string;
}
