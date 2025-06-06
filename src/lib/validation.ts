// Regular expressions for validation
const PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  PHONE: /^\+?[\d\s-]{10,}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
}

// Validation error messages
export const ERROR_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL: "Please enter a valid email address",
  PASSWORD: "Password must be at least 8 characters long and include at least one letter, one number, and one special character",
  PASSWORD_MATCH: "Passwords do not match",
  PHONE: "Please enter a valid phone number",
  URL: "Please enter a valid URL",
  DATE: "Please enter a valid date (YYYY-MM-DD)",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters long`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters long`,
  MIN_VALUE: (min: number) => `Must be at least ${min}`,
  MAX_VALUE: (max: number) => `Must be no more than ${max}`,
  FILE_SIZE: (maxSize: number) => `File size must be less than ${maxSize}MB`,
  FILE_TYPE: (types: string[]) => `File must be of type: ${types.join(", ")}`
}

// Validation functions
export const validators = {
  required: (value: any): boolean => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === "string") return value.trim().length > 0
    return value !== null && value !== undefined
  },

  email: (value: string): boolean => {
    return PATTERNS.EMAIL.test(value)
  },

  password: (value: string): boolean => {
    return PATTERNS.PASSWORD.test(value)
  },

  passwordMatch: (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword
  },

  phone: (value: string): boolean => {
    return PATTERNS.PHONE.test(value)
  },

  url: (value: string): boolean => {
    return PATTERNS.URL.test(value)
  },

  date: (value: string): boolean => {
    return PATTERNS.DATE.test(value)
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max
  },

  minValue: (value: number, min: number): boolean => {
    return value >= min
  },

  maxValue: (value: number, max: number): boolean => {
    return value <= max
  },

  fileSize: (file: File, maxSizeMB: number): boolean => {
    return file.size <= maxSizeMB * 1024 * 1024
  },

  fileType: (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type)
  }
}

// Form validation helper
interface ValidationRule {
  validator: (value: any, ...args: any[]) => boolean
  message: string
  args?: any[]
}

interface ValidationRules {
  [field: string]: ValidationRule[]
}

interface ValidationResult {
  isValid: boolean
  errors: { [field: string]: string }
}

export const validateForm = (data: { [key: string]: any }, rules: ValidationRules): ValidationResult => {
  const errors: { [field: string]: string } = {}
  let isValid = true

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field]
    const value = data[field]

    for (const rule of fieldRules) {
      const isValidField = rule.validator(value, ...(rule.args || []))
      if (!isValidField) {
        errors[field] = rule.message
        isValid = false
        break
      }
    }
  })

  return { isValid, errors }
}

// Helper function to create validation rules
export const createValidationRules = (rules: ValidationRules): ValidationRules => rules

// Common validation rule sets
export const commonRules = {
  email: [
    {
      validator: validators.required,
      message: ERROR_MESSAGES.REQUIRED
    },
    {
      validator: validators.email,
      message: ERROR_MESSAGES.EMAIL
    }
  ],
  password: [
    {
      validator: validators.required,
      message: ERROR_MESSAGES.REQUIRED
    },
    {
      validator: validators.password,
      message: ERROR_MESSAGES.PASSWORD
    }
  ],
  required: [
    {
      validator: validators.required,
      message: ERROR_MESSAGES.REQUIRED
    }
  ]
}
