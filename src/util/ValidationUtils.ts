class ValidationUtils {
  /**
   * Validates if a parameter is provided and meets certain conditions.
   * @param param The parameter to validate.
   * @param name The name of the parameter (for error messages).
   * @param conditions Additional validation conditions (optional).
   * @throws {Error} If the validation fails.
   */
  static validateParam(param: string, name: string, conditions = p => true) {
    if (param == null || !conditions(param)) {
      throw new Error(`Invalid ${name}: ${param}`)
    }
  }
}

export default ValidationUtils
