export declare class  Logger {
  constructor(name: string);
  alert(type: string, message?: any): string;
  critical(type: string, message?: any): string;
  error(type: string, message?: any): string;
  warning(type: string, message?: any): string;
  notice(type: string, message?: any): string;
  info(type: string, message?: any): string;
  success(type: string, message?: any): string;
  unauthorized(type: string, message?: any): string;
  badrequest(type: string, message?: any): string;
  debug(type: string, message?: any): string;
}
