import { useReducer } from 'react';
import { ModalProps, ModalTypes, ModalButtons } from '@components/Modal';
import { ModalRequestPIN } from '@components/modals/ModalRequestPIN';
import { InputPIN } from '@components/Form';
import { Spinner } from '@components/Spinner';
import * as CONST from '@shared/const';

enum Step {
  Initializing,
  EnterCurrentPin,
  EnterNewPin,
  RepeatNewPin,
  Done
};

type State = {
  step: Step,
  requestId: number,
  attempt: number,
  currentPin: string,
  newPin: string,
  repeatPin: string,
  loading: boolean,
  message: string
};

enum ActionType {
  Reset = 'Reset',
  PinRequired = 'PinRequired',
  CurrentPinEntered = 'CurrentPinEntered',
  NewPinEntered = 'NewPinEntered',
  RepeatPinEntered = 'RepeatPinEntered',
  CurrentPinCheckPassed = 'CurrentPinCheckPassed',
  CurrentPinCheckFailed = 'CurrentPinCheckFailed',
  NewPinValidationFailed = 'NewPinValidationFailed',
  NewPinMatchingFailed = 'NewPinMatchingFailed',
  PinChanged = 'PinChanged',
  ErrorOccurred = 'ErrorOccurred'
}

type Action = {
  type: ActionType,
  requestId: number,
  payload?: string,
};

let nextId = 0;

const getNextId = () => nextId++;

const getInitialState: () => State = () => ({
  step: Step.Initializing,
  requestId: getNextId(),
  attempt: getNextId(),
  currentPin: '',
  newPin: '',
  repeatPin: '',
  loading: true,
  message: ''
});

export const ChangePINModal = ({
  id,
  modalTypes = ModalTypes.Centered,
  modalButtons = ModalButtons.ButtonCancel,
  ...rest
}: ModalProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const { loading, requestId } = state;
  const message = loading ? 'Please wait...' : state.message;
  const isFocused = !loading;

  const checkPin = async (pin: string) => {
    await _checkPin(pin)
      ? dispatch({ type: ActionType.CurrentPinCheckPassed, requestId })
      : dispatch({ type: ActionType.CurrentPinCheckFailed, requestId });
  };

  const changePin = async () => {
    const result = await new Promise((resolve) => setTimeout(() => resolve(Boolean(state.newPin === '9999')), 500));
  }

  const handleShown = async () => {
    if (await checkPinSetted()) {
      dispatch({ type: ActionType.PinRequired, requestId });
    } else {
      dispatch({ type: ActionType.CurrentPinCheckPassed, requestId });
    }
  };

  const handleHidden = async () => {
    dispatch({ type: ActionType.Reset, requestId });
  };

  const handlePinEntered = (pin: string) => {
    switch (state.step) {
      case Step.EnterCurrentPin: {
        dispatch({ type: ActionType.CurrentPinEntered, requestId, payload: pin });
        checkPin(pin);
        return;
      }
      case Step.EnterNewPin: {
        if (pin === state.currentPin) {
          dispatch({ type: ActionType.NewPinValidationFailed, requestId });
        } else {
          dispatch({ type: ActionType.NewPinEntered, requestId, payload: pin })
        }
        return;
      }
      case Step.RepeatNewPin: {
        if (pin !== state.newPin) {
          dispatch({ type: ActionType.NewPinMatchingFailed, requestId });
        } else {
          dispatch({ type: ActionType.RepeatPinEntered, requestId, payload: pin });
          changePin();
          return;
        }
      }
    }
  }

  return (
    <ModalRequestPIN id={id} disabled={loading} title="Change PIN code" modalTypes={modalTypes} modalButtons={modalButtons} captionCancel="Close" onShown={handleShown} onHidden={handleHidden} {...rest}>
      <div>{message}</div>
      <InputPIN name="pin" key={state.attempt} maxLength={CONST.PIN_LENGTH} forceFocus={isFocused} disabled={loading} onPinEntered={handlePinEntered}></InputPIN>
      {loading ? <Spinner /> : null}
    </ModalRequestPIN>
  );
}

function reducer(state: State, action: Action): State {
  console.log(action);

  if (action.requestId !== state.requestId) {
    return state;
  }
  switch (action.type) {
    case ActionType.Reset: {
      return getInitialState()
    }
    case ActionType.PinRequired: return {
      ...state,
      loading: false,
      message: 'Enter your current PIN code:',
      step: Step.EnterCurrentPin
    }
    case ActionType.CurrentPinEntered: return {
      ...state,
      currentPin: action.payload || '',
      loading: true,
    }
    case ActionType.NewPinEntered: return {
      ...state,
      newPin: action.payload || '',
      loading: true,
    }
    case ActionType.CurrentPinCheckPassed: return {
      ...state,
      attempt: getNextId(),
      loading: false,
      message: 'Enter new PIN code:',
      step: Step.EnterNewPin,
    }
    case ActionType.CurrentPinCheckFailed: return {
      ...state,
      attempt: getNextId(),
      currentPin: '',
      loading: false,
      message: 'Incorrect PIN code. Please try again:',
      step: Step.EnterCurrentPin,
    }
    case ActionType.NewPinValidationFailed: return {
      ...state,
      attempt: getNextId(),
      newPin: '',
      loading: false,
      message: 'The new PIN matches the old one. Enter new PIN code:',
      step: Step.EnterNewPin,
    }
    default: throw new Error(`Unknown type ${action.type}`);
  }
}

let tmp = 1;

function checkPinSetted() {
  return new Promise((resolve) => setTimeout(() => resolve(Boolean(tmp++)), 200));
}

function _checkPin(pin: string) {
  return new Promise((resolve) => setTimeout(() => resolve(Boolean(pin === '0000')), 500));
}
