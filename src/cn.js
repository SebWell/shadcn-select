/**
 * Utility function to merge class names (equivalent to clsx + twMerge)
 * Adapté pour Vue.js depuis shadcn/ui
 */

/**
 * Simple clsx implementation
 */
function clsx(...inputs) {
  const classes = []
  
  for (const input of inputs) {
    if (!input) continue
    
    if (typeof input === 'string') {
      classes.push(input)
    } else if (Array.isArray(input)) {
      const nested = clsx(...input)
      if (nested) classes.push(nested)
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) classes.push(key)
      }
    }
  }
  
  return classes.join(' ')
}

/**
 * Simple Tailwind merge implementation
 * Removes duplicate Tailwind classes and keeps the last one
 */
function twMerge(classString) {
  if (!classString) return ''
  
  const classes = classString.split(' ').filter(Boolean)
  const classMap = new Map()
  
  for (const cls of classes) {
    // Extract base class (e.g., 'text-red-500' -> 'text')
    const baseClass = cls.split('-')[0]
    
    // For responsive prefixes like 'md:', 'lg:', etc.
    if (cls.includes(':')) {
      const [prefix, actualClass] = cls.split(':')
      const actualBaseClass = actualClass.split('-')[0]
      classMap.set(`${prefix}:${actualBaseClass}`, cls)
    } else {
      classMap.set(baseClass, cls)
    }
  }
  
  return Array.from(classMap.values()).join(' ')
}

/**
 * Combine clsx and twMerge functionality
 * @param {...any} inputs - Class inputs to merge
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(...inputs))
}

export default cn 