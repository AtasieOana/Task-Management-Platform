import { CalendarEvent } from 'angular-calendar';
import {AssignedUsersOnTask} from "./assignedusersontask";

export interface CalendarEventKeys extends CalendarEvent {
  assignedUsersOnTask: AssignedUsersOnTask;

}
