# 🔴 CRITICAL ISSUE #3: Extensive Hardcoding

**Severity:** 🔴 CRITICAL  
**Score:** 1/10  
**Status:** ❌ MUST FIX IMMEDIATELY

---

## Overview

The codebase contains **extensive hardcoded values** throughout, including:
- Magic numbers for spacing, sizing, and timing
- Hardcoded strings that should be enums
- Hardcoded medicine dosages and cycles
- Hardcoded phone numbers and URLs
- Inline style values

This makes the code:
- ❌ Unmaintainable
- ❌ Difficult to scale
- ❌ Prone to inconsistencies
- ❌ Hard to theme
- ❌ Impossible to change globally

---

## Issues Found

### 1. **Hardcoded Medicine Values**

#### Location: `app/(auth)/medication/addMedicine.tsx`

```typescript
const [body, setBody] = useState({
  iconType: 1,
  title: "",
  dose: "250 mg",        // ❌ Hardcoded default dose
  cycle: "480",          // ❌ Hardcoded default cycle (8 hours in minutes)
  totalNumber: "0",
  startDate: dayjs().toISOString(),
  description: "",
  reminder: false,
  note: "",
  medicalName: "",
});

// Later in the code:
<TextField
  placeholder="250 mg"   // ❌ Hardcoded placeholder
  value={body.dose}
/>

<TextField
  placeholder="480"      // ❌ Hardcoded placeholder
  value={body.cycle}
/>
```

**Issues:**
- Default values hardcoded
- No constants file
- Values repeated in multiple places
- Cannot change globally

---

### 2. **Magic Numbers for Spacing**

#### Location: Multiple files

```typescript
// src/components/UIKit/Button.tsx
const styles = StyleSheet.create({
  contain: {
    paddingVertical: 8,      // ❌ Magic number
    paddingHorizontal: 14,   // ❌ Magic number
    gap: 4,                  // ❌ Magic number
  },
  normal: {
    borderRadius: 12,        // ❌ Magic number
  },
  round: {
    borderRadius: 100,       // ❌ Magic number
  },
});

// app/(auth)/booking/unknownPay.tsx
<Card
  padding={12}              // ❌ Magic number
  margin={12}               // ❌ Magic number
/>

<MaterialIcon
  size={74}                 // ❌ Magic number
/>

// app/(auth)/cycle/range.tsx
<Card marginTop={8}>        // ❌ Magic number

{arrayNumberGenerator(10, 38).map(...)}  // ❌ Magic numbers for cycle range
```

**Issues:**
- No spacing constants
- Inconsistent spacing values (8, 12, 14, 16, 24, 74, etc.)
- Cannot maintain consistent spacing
- Hard to implement design system

---

### 3. **Hardcoded String Literals (Should be Enums)**

#### Location: Multiple files

```typescript
// Button variants
variant="contain"     // ❌ Should be enum
variant="outline"     // ❌ Should be enum
variant="text"        // ❌ Should be enum

// Requirement types
element.type === "fileUpload"  // ❌ Should be enum
element.type === "input"       // ❌ Should be enum
element.type === "alert"       // ❌ Should be enum

// Requirement values
type: "file"          // ❌ Should be enum
type: "string"        // ❌ Should be enum
type: "alert"         // ❌ Should be enum
```

**Issues:**
- Typo-prone
- No autocomplete
- Hard to refactor
- No type safety

---

## Impact Assessment

| Category | Impact | Examples |
|----------|--------|----------|
| Maintainability | 🔴 Critical | Cannot change values globally |
| Consistency | 🔴 Critical | Different spacing values everywhere |
| Scalability | 🔴 Critical | Hard to add new features |
| Type Safety | 🟠 High | String literals prone to typos |
| Performance | 🟡 Medium | Inline styles recreated on render |

---

## Required Implementation

### 1. **Create Constants Files**

#### Create: `src/constants/Spacing.ts`

```typescript
/**
 * Spacing constants following 4px grid system
 * Use these for consistent spacing throughout the app
 */
export const Spacing = {
  /** 4px - Minimal spacing */
  xs: 4,
  /** 8px - Small spacing */
  sm: 8,
  /** 12px - Medium spacing */
  md: 12,
  /** 16px - Standard spacing */
  lg: 16,
  /** 24px - Large spacing */
  xl: 24,
  /** 32px - Extra large spacing */
  xxl: 32,
  /** 48px - Section spacing */
  xxxl: 48,
} as const;

export type SpacingKey = keyof typeof Spacing;
```

---

#### Create: `src/constants/Medicine.ts`

```typescript
/**
 * Medicine-related constants
 */
export const MedicineDefaults = {
  /** Default dose: 250 mg */
  DEFAULT_DOSE: '250 mg',
  /** Default cycle: 480 minutes (8 hours) */
  DEFAULT_CYCLE: 480,
  /** Default cycle in hours */
  DEFAULT_CYCLE_HOURS: 8,
  /** Minimum cycle in minutes */
  MIN_CYCLE: 60,
  /** Maximum cycle in minutes */
  MAX_CYCLE: 1440, // 24 hours
} as const;

/**
 * Common medicine dosages
 */
export const CommonDosages = [
  '50 mg',
  '100 mg',
  '250 mg',
  '500 mg',
  '1000 mg',
] as const;

/**
 * Common cycle intervals (in minutes)
 */
export const CommonCycles = {
  EVERY_4_HOURS: 240,
  EVERY_6_HOURS: 360,
  EVERY_8_HOURS: 480,
  EVERY_12_HOURS: 720,
  ONCE_DAILY: 1440,
} as const;
```

---

### 2. **Create Enums**

#### Create: `src/types/enums.ts`

```typescript
/**
 * Button variants
 */
export enum ButtonVariant {
  CONTAIN = 'contain',
  OUTLINE = 'outline',
  TEXT = 'text',
}

/**
 * Requirement types for services
 */
export enum RequirementType {
  FILE_UPLOAD = 'fileUpload',
  INPUT = 'input',
  ALERT = 'alert',
}

/**
 * Internal requirement value types
 */
export enum RequirementValueType {
  FILE = 'file',
  STRING = 'string',
  ALERT = 'alert',
}

/**
 * Medicine icon types
 */
export enum MedicineIconType {
  PILL = 1,
  CAPSULE = 2,
  LIQUID = 3,
  INJECTION = 4,
  INHALER = 5,
}

/**
 * Booking status
 */
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
```

---

### 3. **Update Components to Use Constants**

#### Update: `src/components/UIKit/Button.tsx`

```typescript
import { Spacing, BorderRadius } from '@src/constants';
import { ButtonVariant } from '@src/types/enums';

interface IButton {
  variant?: ButtonVariant;  // Use enum instead of string
  // ... other props
}

const Button = ({ variant = ButtonVariant.CONTAIN, ...props }: IButton) => {
  const renderVariant = () => {
    switch (variant) {
      case ButtonVariant.CONTAIN:
        return {
          ...styles[variant],
          backgroundColor: disabled ? Colors.gray[50] : color || Colors.main,
        };
      case ButtonVariant.OUTLINE:
        return {
          ...styles[variant],
          borderColor: color || Colors.main,
          borderWidth: borderWidth || 1,
        };
      default:
        return styles[variant];
    }
  };

  // ... rest of component
};

const styles = StyleSheet.create({
  [ButtonVariant.CONTAIN]: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  [ButtonVariant.OUTLINE]: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  round: {
    borderRadius: BorderRadius.round,
  },
  normal: {
    borderRadius: BorderRadius.md,
  },
});
```

---

#### Update: `app/(auth)/medication/addMedicine.tsx`

```typescript
import { MedicineDefaults, CommonCycles } from '@src/constants/Medicine';
import { MedicineIconType } from '@src/types/enums';
import { Spacing } from '@src/constants';

const AddMedicine = () => {
  const [body, setBody] = useState({
    iconType: MedicineIconType.PILL,
    title: "",
    dose: MedicineDefaults.DEFAULT_DOSE,
    cycle: CommonCycles.EVERY_8_HOURS.toString(),
    totalNumber: "0",
    startDate: dayjs().toISOString(),
    description: "",
    reminder: false,
    note: "",
    medicalName: "",
  });

  return (
    <View style={[styles.page, { paddingBottom: bottom }]}>
      <ScrollView nestedScrollEnabled>
        <TextField
          onChangeText={(e) => setBody((b) => ({ ...b, dose: e }))}
          title="Dose"
          placeholder={MedicineDefaults.DEFAULT_DOSE}
          value={body.dose}
        />
        
        <TextField
          onChangeText={(e) => setBody((b) => ({ ...b, cycle: e }))}
          inputMode="numeric"
          keyboardType="number-pad"
          title="Cycle"
          placeholder={CommonCycles.EVERY_8_HOURS.toString()}
          value={body.cycle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: Spacing.lg,
  },
});
```

---

## Migration Checklist

### Phase 1: Create Constants (Day 1)
- [ ] Create Spacing.ts
- [ ] Create BorderRadius.ts
- [ ] Create IconSizes.ts
- [ ] Create Medicine.ts
- [ ] Create MenstrualCycle.ts
- [ ] Create Contact.ts
- [ ] Create enums.ts
- [ ] Create DesignTokens.ts
- [ ] Create index.ts

### Phase 2: Update Core Components (Days 2-3)
- [ ] Update Button.tsx
- [ ] Update Card.tsx
- [ ] Update Text.tsx
- [ ] Update TextField.tsx
- [ ] Update all UIKit components

### Phase 3: Update Feature Components (Days 4-7)
- [ ] Update medication screens
- [ ] Update booking screens
- [ ] Update cycle screens
- [ ] Update all other screens

### Phase 4: Verification (Day 8)
- [ ] Search for magic numbers
- [ ] Search for hardcoded strings
- [ ] Verify consistency
- [ ] Test all screens
- [ ] Update documentation

---

## Benefits After Implementation

✅ **Maintainability:** Change values in one place  
✅ **Consistency:** Same spacing/sizing everywhere  
✅ **Type Safety:** Enums prevent typos  
✅ **Scalability:** Easy to add new values  
✅ **Documentation:** Constants are self-documenting  
✅ **Design System:** Foundation for proper design system  

---

## Estimated Effort

- **Create Constants:** 1 day
- **Update Core Components:** 2 days
- **Update Feature Components:** 4 days
- **Testing & Verification:** 1 day
- **Total:** 1-2 weeks

---

## Priority: 🔴 CRITICAL - BLOCKS PROPER DESIGN SYSTEM
