import { Action } from "../actions";
import { State } from "../contexts/state-context";
import reducer from "./reducer";

describe('reducer', () => {
  describe('marks', () => {
    it('marks/set should set marks', () => {
      const state: State = {
        year: 2000,
        isMarksLoaded: true,
        marks: {
          '2000-01-01': ['red']
        }
      };

      const action: Action = {
        type: "marks/set",
        payload: {
          '2000-01-01': ['green', 'blue'],
          '2000-01-02': ['red', 'green', 'blue'],
        }
      }

      const result = reducer(state, action);

      expect(result).toEqual({
        year: 2000,
        isMarksLoaded: true,
        marks: {
          '2000-01-01': ['red', 'green', 'blue'],
          '2000-01-02': ['red', 'green', 'blue'],
        }
      });
    });

    it('marks/unset should unset marks', () => {
      const state: State = {
        year: 2000,
        isMarksLoaded: true,
        marks: {
          '2000-01-01': ['red'],
          '2000-01-02': ['red', 'green', 'blue'],
          '2000-01-03': ['red', 'green', 'blue'],
        }
      };

      const action: Action = {
        type: "marks/unset",
        payload: {
          '2000-01-01': ['red'],
          '2000-01-02': ['red'],
        }
      }

      const result = reducer(state, action);

      expect(result).toEqual({
        year: 2000,
        isMarksLoaded: true,
        marks: {
          '2000-01-02': ['green', 'blue'],
          '2000-01-03': ['red', 'green', 'blue'],
        }
      });
    });

    it('marks/toggle should toggle marks', () => {
      const state: State = {
        year: 2000,
        isMarksLoaded: true,
        marks: {
          '2000-01-01': ['red', 'green', 'blue'],
          '2000-01-02': ['red', 'green', 'blue'],
          '2000-01-03': ['red', 'green', 'blue'],
        }
      };

      const action: Action = {
        type: "marks/toggle",
        payload: {
          '2000-01-01': ['red', 'green', 'blue'],
          '2000-01-02': ['green', 'blue'],
        }
      }

      const result = reducer(state, action);

      expect(result).toEqual({
        year: 2000,
        isMarksLoaded: true,
        marks: {
          '2000-01-02': ['red'],
          '2000-01-03': ['red', 'green', 'blue'],
        }
      });
    });
  });
});
