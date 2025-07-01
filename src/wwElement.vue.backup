<template>
  <div class="relative" :class="cn('w-full', content.customClass)">
    <!-- Select Trigger -->
    <button
      ref="triggerRef"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :disabled="content.disabled"
      @click="toggleSelect"
      @keydown="handleKeyDown"
      :class="cn(selectVariants({ variant: content.variant, size: content.size }), 
        content.disabled && 'pointer-events-none opacity-50',
        content.customClass
      )"
    >
      <span v-if="selectedOption" class="block truncate">
        {{ getDisplayValue(selectedOption) }}
      </span>
      <span v-else class="block truncate text-muted-foreground">
        {{ content.placeholder || 'Select an option...' }}
      </span>
      
      <!-- Chevron Icon -->
      <svg
        class="h-4 w-4 opacity-50 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- Select Content -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="contentRef"
        :style="contentStyles"
        :class="cn(
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          content.contentClass
        )"
      >
        <!-- Search Input (if searchable) -->
        <div v-if="content.searchable" class="flex items-center border-b px-3 pb-2">
          <svg class="mr-2 h-4 w-4 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            :placeholder="content.searchPlaceholder || 'Search...'"
            class="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            @keydown.escape="closeSelect"
          />
        </div>

        <!-- Options -->
        <div class="max-h-60 overflow-auto">
          <div
            v-for="(option, index) in filteredOptions"
            :key="getOptionKey(option, index)"
            role="option"
            :aria-selected="isSelected(option)"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
            :class="cn(
              'relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
              'hover:bg-accent hover:text-accent-foreground',
              isSelected(option) && 'bg-accent text-accent-foreground',
              highlightedIndex === index && 'bg-accent text-accent-foreground',
              option.disabled && 'pointer-events-none opacity-50'
            )"
          >
            <!-- Check Icon for selected option -->
            <svg
              v-if="isSelected(option)"
              class="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span v-else class="mr-6"></span>
            
            {{ getDisplayValue(option) }}
          </div>
          
          <!-- No options message -->
          <div
            v-if="filteredOptions.length === 0"
            class="py-6 text-center text-sm text-muted-foreground"
          >
            {{ content.noOptionsText || 'No options found.' }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from './cn.js'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: [String, Number, Object],
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'open', 'close'])

// Refs
const triggerRef = ref(null)
const contentRef = ref(null)
const isOpen = ref(false)
const searchQuery = ref('')
const highlightedIndex = ref(-1)
const contentStyles = ref({})

// Select variants
const selectVariants = (props) => {
  const base = 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  
  const variants = {
    default: '',
    outline: 'border-input',
    ghost: 'border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizes = {
    default: 'h-10',
    sm: 'h-9 px-2',
    lg: 'h-11 px-4'
  }
  
  return cn(base, variants[props.variant] || variants.default, sizes[props.size] || sizes.default)
}

// Computed properties
const options = computed(() => props.content.options || [])

const filteredOptions = computed(() => {
  if (!props.content.searchable || !searchQuery.value) {
    return options.value
  }
  
  return options.value.filter(option => {
    const value = getDisplayValue(option).toLowerCase()
    return value.includes(searchQuery.value.toLowerCase())
  })
})

const selectedOption = computed(() => {
  if (!props.modelValue) return null
  
  return options.value.find(option => {
    if (typeof option === 'object') {
      return option[props.content.valueKey || 'value'] === props.modelValue
    }
    return option === props.modelValue
  })
})

// Helper functions
const getDisplayValue = (option) => {
  if (!option) return ''
  if (typeof option === 'object') {
    return option[props.content.labelKey || 'label'] || option[props.content.valueKey || 'value'] || ''
  }
  return String(option)
}

const getOptionValue = (option) => {
  if (typeof option === 'object') {
    return option[props.content.valueKey || 'value']
  }
  return option
}

const getOptionKey = (option, index) => {
  return getOptionValue(option) || index
}

const isSelected = (option) => {
  const optionValue = getOptionValue(option)
  return optionValue === props.modelValue
}

// Methods
const toggleSelect = () => {
  if (props.content.disabled) return
  
  if (isOpen.value) {
    closeSelect()
  } else {
    openSelect()
  }
}

const openSelect = async () => {
  isOpen.value = true
  searchQuery.value = ''
  highlightedIndex.value = -1
  
  emit('open')
  
  await nextTick()
  updateContentPosition()
}

const closeSelect = () => {
  isOpen.value = false
  highlightedIndex.value = -1
  emit('close')
}

const selectOption = (option) => {
  if (option.disabled) return
  
  const value = getOptionValue(option)
  emit('update:modelValue', value)
  emit('change', value, option)
  closeSelect()
}

const updateContentPosition = () => {
  if (!triggerRef.value || !contentRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const contentEl = contentRef.value
  const contentRect = contentEl.getBoundingClientRect()
  
  // Position below the trigger by default
  let top = triggerRect.bottom + window.scrollY + 4
  let left = triggerRect.left + window.scrollX
  
  // Check if content would overflow viewport
  if (top + contentRect.height > window.innerHeight + window.scrollY) {
    // Position above if there's more space
    if (triggerRect.top > contentRect.height) {
      top = triggerRect.top + window.scrollY - contentRect.height - 4
    }
  }
  
  // Ensure content doesn't overflow horizontally
  if (left + contentRect.width > window.innerWidth) {
    left = window.innerWidth - contentRect.width - 8
  }
  
  contentStyles.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    width: `${Math.max(triggerRect.width, 200)}px`
  }
}

const handleKeyDown = (event) => {
  if (props.content.disabled) return
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        openSelect()
      } else if (highlightedIndex.value >= 0) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
      
    case 'Escape':
      closeSelect()
      break
      
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openSelect()
      } else {
        highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredOptions.value.length - 1)
      }
      break
      
    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      }
      break
      
    case 'Home':
      if (isOpen.value) {
        event.preventDefault()
        highlightedIndex.value = 0
      }
      break
      
    case 'End':
      if (isOpen.value) {
        event.preventDefault()
        highlightedIndex.value = filteredOptions.value.length - 1
      }
      break
  }
}

const handleOutsideClick = (event) => {
  if (!triggerRef.value?.contains(event.target) && !contentRef.value?.contains(event.target)) {
    closeSelect()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('resize', updateContentPosition)
  window.addEventListener('scroll', updateContentPosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('resize', updateContentPosition)
  window.removeEventListener('scroll', updateContentPosition)
})

// Watch for content changes
watch(() => props.content, updateContentPosition, { deep: true })
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 