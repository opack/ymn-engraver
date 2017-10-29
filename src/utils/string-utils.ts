export class StringUtils {
  public static emptyIfUndefined(value: string): string {
    return this.valueOrDefault(value, '');
  }

  public static valueOrDefault(value: string, defaultValue: string): string {
    return value === undefined ? defaultValue : value;
  }
}
