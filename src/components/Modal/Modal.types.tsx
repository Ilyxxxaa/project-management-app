import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import { ModalTypes } from '../../redux/features/modalSlice';
import { ITaskData } from '../../redux/api/tasksApi';

export interface IFormFields {
  title: string;
  description: string;
}

export interface ModalChild {
  register: UseFormRegister<IFormFields>;
  handleSubmit: UseFormHandleSubmit<IFormFields>;
  reset: UseFormReset<IFormFields>;
  errors: Partial<
    FieldErrorsImpl<{
      title: string;
      description: string;
    }>
  >;
  isDirty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
  data: ModalData | null;
  type: ModalTypes;
  userId: string | null;
}

export interface ModalData {
  boardId?: string;
  columnId?: string;
  taskId?: string;
  taskData?: ITaskData;
}
