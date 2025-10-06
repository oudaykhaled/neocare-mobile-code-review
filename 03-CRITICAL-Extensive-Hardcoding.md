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

### 4. **Hardcoded Phone Numbers**

#### Location: `app/(auth)/booking/unknownPay.tsx`

```typescript
<Button
  onPress={() => Linking.openURL(`tel:+9651888828`)}  // ❌ Hardcoded phone
  title="Call to support"
  variant="contain"
/>
```

**Issues:**
- Cannot change without code update
- Different for different regions
- Should be in configuration

---

### 5. **Hardcoded Cycle Ranges**

#### Location: `app/(auth)/cycle/range.tsx`

```typescript
{arrayNumberGenerator(10, 38).map((item, index) => (  // ❌ Magic numbers
  <Picker.Item
    label={`${item} Days`}
    value={item.toString()}
    key={index}
  />
))}

<Text>
  For most women, a typical cycle is 24 to 38 days.  // ❌ Hardcoded text
</Text>
```

**Issues:**
- Medical constants hardcoded
- Cannot adjust based on medical guidelines
- Should be in constants

---

### 6. **Inline Style Values**

#### Location: `app/(auth)/medication/addMedicine.tsx`

```typescript
<View
  style={{
    flexDirection: direction === "ltr" ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
```

**Issues:**
- Inline styles instead of StyleSheet
- Cannot reuse
- Poor performance
- Inconsistent

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

#### Create: `src/constants/BorderRadius.ts`

```typescript
/**
 * Border radius constants for consistent rounded corners
 */
export const BorderRadius = {
  /** 4px - Minimal rounding */
  xs: 4,
  /** 8px - Small rounding */
  sm: 8,
  /** 12px - Medium rounding */
  md: 12,
  /** 16px - Large rounding */
  lg: 16,
  /** 24px - Extra large rounding */
  xl: 24,
  /** 100px - Fully rounded (pills, circles) */
  round: 100,
} as const;

export type BorderRadiusKey = keyof typeof BorderRadius;
```

---

#### Create: `src/constants/IconSizes.ts`

```typescript
/**
 * Standard icon sizes
 */
export const IconSizes = {
  /** 16px - Small icons */
  sm: 16,
  /** 24px - Standard icons */
  md: 24,
  /** 32px - Large icons */
  lg: 32,
  /** 48px - Extra large icons */
  xl: 48,
  /** 64px - Hero icons */
  xxl: 64,
} as const;

export type IconSizeKey = keyof typeof IconSizes;
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

#### Create: `src/constants/MenstrualCycle.ts`

```typescript
/**
 * Menstrual cycle constants based on medical guidelines
 */
export const MenstrualCycle = {
  /** Minimum typical cycle length in days */
  MIN_CYCLE_LENGTH: 10,
  /** Maximum typical cycle length in days */
  MAX_CYCLE_LENGTH: 38,
  /** Average cycle length in days */
  AVERAGE_CYCLE_LENGTH: 28,
  /** Minimum typical period length in days */
  MIN_PERIOD_LENGTH: 2,
  /** Maximum typical period length in days */
  MAX_PERIOD_LENGTH: 7,
  /** Average period length in days */
  AVERAGE_PERIOD_LENGTH: 5,
} as const;

/**
 * Helper text for cycle tracking
 */
export const CycleHelpText = {
  TYPICAL_CYCLE: `For most women, a typical cycle is ${MenstrualCycle.MIN_CYCLE_LENGTH} to ${MenstrualCycle.MAX_CYCLE_LENGTH} days.`,
  TYPICAL_PERIOD: `A typical period lasts ${MenstrualCycle.MIN_PERIOD_LENGTH} to ${MenstrualCycle.MAX_PERIOD_LENGTH} days.`,
} as const;
```

---

#### Create: `src/constants/Contact.ts`

```typescript
/**
 * Contact information
 * These should eventually come from environment variables
 */
export const Contact = {
  /** Support phone number */
  SUPPORT_PHONE: '+9651888828',
  /** Support email */
  SUPPORT_EMAIL: 'support@neocare.com',
  /** Emergency phone */
  EMERGENCY_PHONE: '+9651888828',
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

/**
 * Payment status
 */
export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  UNKNOWN = 'unknown',
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
  [ButtonVariant.TEXT]: {
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

#### Update: `app/(auth)/cycle/range.tsx`

```typescript
import { MenstrualCycle, CycleHelpText } from '@src/constants/MenstrualCycle';
import { Spacing } from '@src/constants';

const Range = () => {
  return (
    <View style={styles.container}>
      <Card marginTop={Spacing.sm}>
        <Text
          gutterBottom
          fontSize={14}
          fontWeight="SemiBold"
          color={colors.neuralColor}
        >
          How long is your typical cycle?
        </Text>
        <Picker
          selectedValue={selectedRange}
          onValueChange={(itemValue) => setSelectedRange(itemValue)}
        >
          {arrayNumberGenerator(
            MenstrualCycle.MIN_CYCLE_LENGTH,
            MenstrualCycle.MAX_CYCLE_LENGTH
          ).map((item, index) => (
            <Picker.Item
              label={`${item} Days`}
              value={item.toString()}
              key={index}
              color={colors.text}
            />
          ))}
        </Picker>
        <Text
          style={styles.hint}
          fontSize={12}
          fontWeight="SemiBold"
          color={colors.neuralColor}
        >
          {CycleHelpText.TYPICAL_CYCLE}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  hint: {
    marginTop: Spacing.sm,
  },
});
```

---

#### Update: `app/(auth)/booking/unknownPay.tsx`

```typescript
import { Contact } from '@src/constants/Contact';
import { Spacing, IconSizes } from '@src/constants';
import { ButtonVariant } from '@src/types/enums';

const UnknownPay = () => {
  return (
    <Card
      padding={Spacing.md}
      margin={Spacing.md}
      backgroundColor={colors.card}
    >
      <View style={styles.errorContainer}>
        <MaterialIcon
          size={IconSizes.xxl}
          color={colors.yellow[70]}
          name="warning-amber"
        />
        <Text gutterBottom>Booking status is unknown call to support</Text>
        <Button
          onPress={() => Linking.openURL(`tel:${Contact.SUPPORT_PHONE}`)}
          title="Call to support"
          variant={ButtonVariant.CONTAIN}
        />
      </View>
      <Button
        onPress={() => router.replace("/(auth)/(tabs)")}
        title="Go to home"
        variant={ButtonVariant.OUTLINE}
      />
    </Card>
  );
};
```

---

#### Update: `app/(auth)/booking/preview.tsx`

```typescript
import { RequirementType, RequirementValueType } from '@src/types/enums';

const Preview = () => {
  const getServiceRequirements = useCallback(() => {
    getApi(`/service/detail?serviceID=${service?._id}`, { t: user?.token })
      .then(({ data }: AxiosResponse<IServices>) => {
        if (data.requirements) {
          let arr: IRequirement[] = [];
          let alerts: { type: RequirementValueType.ALERT; note: string }[] = [];
          
          for (let index = 0; index < data.requirements.length; index++) {
            const element = data.requirements[index];
            
            if (element.type === RequirementType.FILE_UPLOAD) {
              arr.push({
                type: RequirementValueType.FILE,
                value: "",
                note: element.note,
                id: index,
              });
            } else if (element.type === RequirementType.INPUT) {
              arr.push({
                type: RequirementValueType.STRING,
                value: "",
                note: element.note,
                id: index,
              });
            } else {
              alerts.push({
                type: RequirementValueType.ALERT,
                note: element.note
              });
            }
          }
          
          setRequirementAlert(alerts);
          setRequirementValues(arr);
        }
      })
      .catch((err: AxiosError) => {
        console.warn(err.response?.data);
      });
  }, [service?._id, user?.token]);
};
```

---

### 4. **Create Design Tokens**

#### Create: `src/constants/DesignTokens.ts`

```typescript
import { Spacing } from './Spacing';
import { BorderRadius } from './BorderRadius';
import { IconSizes } from './IconSizes';

/**
 * Centralized design tokens
 * Import this file for comprehensive design system access
 */
export const DesignTokens = {
  spacing: Spacing,
  borderRadius: BorderRadius,
  iconSizes: IconSizes,
  
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  shadows: {
    sm: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;

export default DesignTokens;
```

---

### 5. **Create Index File for Easy Imports**

#### Create: `src/constants/index.ts`

```typescript
export * from './Spacing';
export * from './BorderRadius';
export * from './IconSizes';
export * from './Medicine';
export * from './MenstrualCycle';
export * from './Contact';
export * from './DesignTokens';
export { default as DesignTokens } from './DesignTokens';
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

## Search and Replace Guide

### Find Magic Numbers:
```bash
# Find hardcoded numbers in styles
grep -r "paddingVertical: [0-9]" app/
grep -r "paddingHorizontal: [0-9]" app/
grep -r "margin: [0-9]" app/
grep -r "borderRadius: [0-9]" app/
grep -r "gap: [0-9]" app/
```

### Find String Literals:
```bash
# Find variant strings
grep -r 'variant="contain"' app/
grep -r 'variant="outline"' app/
grep -r 'type === "fileUpload"' app/
```

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
