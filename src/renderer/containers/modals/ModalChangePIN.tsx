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

// TODO: delete

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
};

type State = {
  step: Step,
  requestId: number,
  key: number,
  currentPin: string,
  newPin: string,
  repeatPin: string,
  loading: boolean,
  message: string
};

type Action = {
  type: string,
  requestId: number,
  payload?: string,
};

let nextId = 0;

const getInitialState: () => State = () => ({
  step: Step.Initializing,
  requestId: nextId++,
  key: nextId++,
  currentPin: '',
  newPin: '',
  repeatPin: '',
  loading: true,
  message: ''
});

let tmp = 0;

export function ChangePINModal({
  id,
  modalTypes = ModalTypes.Centered,
  modalButtons = ModalButtons.ButtonCancel,
  ...rest
}: ModalProps) {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const { loading, requestId, key } = state;
  const message = loading ? 'Please wait...' : state.message;
  const isFocused = !loading;



  // TODO: delete
  const changePin = async () => {
    // const result = await new Promise((resolve) => setTimeout(() => resolve(Boolean(state.newPin === '9999')), 500));
  }


  async function checkPinSetted() {
    const hasPin = await new Promise((resolve) => setTimeout(() => resolve(Boolean(tmp++)), 200));
    if (hasPin) {
      dispatch({ type: 'pin-required', requestId });
    } else {
      dispatch({ type: 'pin-check-passed', requestId });
    }
  }

  async function checkPin(pin: string) {
    const isPinCorrect = await new Promise((resolve) => setTimeout(() => resolve(Boolean(pin === '0000')), 500));
    if (isPinCorrect) {
      dispatch({ type: 'pin-check-passed', requestId })
    } else {
      dispatch({ type: 'pin-check-failed', requestId });
    }
  }

  function handleShown() {
    checkPinSetted();
  }

  function handleHidden() {
    dispatch({ type: 'reset', requestId });
  }

  function handlePinEntered(pin: string) {
    if (state.step === Step.EnterCurrentPin) {
      dispatch({  })
    }



    // switch (state.step) {
    //   case Step.EnterCurrentPin: {
    //     dispatch({ type: ActionType.CurrentPinEntered, requestId, payload: pin });
    //     checkPin(pin);
    //     return;
    //   }
    //   case Step.EnterNewPin: {
    //     if (pin === state.currentPin) {
    //       dispatch({ type: ActionType.NewPinValidationFailed, requestId });
    //     } else {
    //       dispatch({ type: ActionType.NewPinEntered, requestId, payload: pin })
    //     }
    //     return;
    //   }
    //   case Step.RepeatNewPin: {
    //     if (pin !== state.newPin) {
    //       dispatch({ type: ActionType.NewPinMatchingFailed, requestId });
    //     } else {
    //       dispatch({ type: ActionType.RepeatPinEntered, requestId, payload: pin });
    //       changePin();
    //       return;
    //     }
    //   }
    // }
  }

  return (
    <ModalRequestPIN id={id} disabled={loading} title="Change PIN code" modalTypes={modalTypes} modalButtons={modalButtons} captionCancel="Close" onShown={handleShown} onHidden={handleHidden} {...rest}>
      <div>{message}</div>
      <InputPIN name="pin" key={key} maxLength={CONST.PIN_LENGTH} forceFocus={isFocused} disabled={loading} onPinEntered={handlePinEntered}></InputPIN>
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
    case 'reset': {
      return getInitialState();
    }

    case 'pin-required': {
      return {
        ...state,
        step: Step.EnterCurrentPin,
        loading: false,
        message: 'Enter your current PIN code:'
      };
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

    case 'pin-check-passed': {
      return {
        ...state,
        step: Step.EnterNewPin,
        key: nextId++,
        loading: false,
        message: 'Enter new PIN code:',
      };
    }

    case ActionType.CurrentPinCheckFailed: return {
      ...state,
      // attempt: getNextId(),
      currentPin: '',
      loading: false,
      message: 'Incorrect PIN code. Please try again:',
      step: Step.EnterCurrentPin,
    }
    case ActionType.NewPinValidationFailed: return {
      ...state,
      // attempt: getNextId(),
      newPin: '',
      loading: false,
      message: 'The new PIN matches the old one. Enter new PIN code:',
      step: Step.EnterNewPin,
    }
    default: throw new Error(`Unknown type ${action.type}`);
  }
}

function changePin(pin: string, newPin: string) {
  console.log(pin, newPin);
  return new Promise((resolve) => setTimeout(() => resolve(true), 500));
}
