import { LoggerService, Provider } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

export type LogData = string | Record<string, unknown>;

export interface Logger {
  log: (data: LogData) => void;
  error: (data: LogData) => void;
  warn: (data: LogData) => void;
}

const log = (data: LogData) => data;

export const getLoggerServiceMock = jest.fn<Logger, []>(() => ({
  log: jest.fn((data: LogData) => log(data)),
  error: jest.fn((data: LogData) => log(data)),
  warn: jest.fn((data: LogData) => log(data)),
}));

export const loggerServiceMockProvider: Provider<LoggerService> = {
  provide: WINSTON_MODULE_NEST_PROVIDER,
  useFactory: getLoggerServiceMock,
};
