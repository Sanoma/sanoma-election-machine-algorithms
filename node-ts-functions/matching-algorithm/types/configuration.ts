export interface ElectionConfig {
  values: Value[];
  electionMachineQuestions: Question[];
}

export interface Value {
  id: number;
  name: string;
  bounds: [string, string];
}

export interface BaseQuestion {
  id: number;
}

export type FactQuestion = BaseQuestion;

export interface ValueQuestion extends BaseQuestion {
  valueDetails: {
    valueId: number;
    targetBound: string;
  }[];
}

export type Question = ValueQuestion | FactQuestion;

export const isValueQuestion = (value: Question): value is ValueQuestion =>
  "valueDetails" in value;