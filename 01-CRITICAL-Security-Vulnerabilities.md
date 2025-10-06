# 🔴 CRITICAL ISSUE #1: Security Vulnerabilities

**Severity:** 🔴 CRITICAL  
**Score:** 1/10  
**Status:** ❌ MUST FIX IMMEDIATELY

---

## Overview

API keys, credentials, and sensitive configuration are **hardcoded and exposed** in the repository. This is a **critical security vulnerability** that can lead to:
- Unauthorized access to backend services
- Data breaches
- Financial liability
- Service abuse
- Compliance violations (HIPAA for healthcare apps)

---

## Issues Found

### 1. **Exposed Google API Keys**

#### Location: `GoogleService-Info.plist`
```xml
<key>API_KEY</key>
<string>AIzaSyCj2bSK2U0pccNAv5Q0QZy0CYEdUGE2FfM</string>

<key>CLIENT_ID</key>
<string>113904800649-rm71thlh5407ju7in0s0gv105h8ehvpq.apps.googleusercontent.com</string>

<key>ANDROID_CLIENT_ID</key>
<string>113904800649-vre1j07cjb7sf44tqhicbs0ccrhl7f6b.apps.googleusercontent.com</string>
```

**Risk Level:** 🔴 CRITICAL  
**Impact:** Anyone with repository access can use these keys to access Google services

---

#### Location: `google-services.json`
```json
{
  "api_key": [{
    "current_key": "AIzaSyCj2bSK2U0pccNAv5Q0QZy0CYEdUGE2FfM"
  }],
  "client": [{
    "client_id": "113904800649-vre1j07cjb7sf44tqhicbs0ccrhl7f6b.apps.googleusercontent.com",
    "oauth_client": [{
      "client_id": "113904800649-rm71thlh5407ju7in0s0gv105h8ehvpq.apps.googleusercontent.com"
    }]
  }]
}
```

**Risk Level:** 🔴 CRITICAL  
**Impact:** Firebase configuration exposed, potential unauthorized access

---

### 2. **Hardcoded API Base URLs**

#### Location: `src/config.ts`
```typescript
export const config = {
  // baseURL: "http://localhost:15350",
  // baseURL: "http://10.20.30.21:15350",
  // baseURL: "http://192.168.10.30:15350",
  // baseURL: "http://192.168.10.195:15350",
  // baseURL: "https://neocareapi.spexup.com",
  // baseURL: "http://3.28.200.194:15350"
  baseURL: "https://neocareapi.myvannet.eu",
};
```

**Risk Level:** 🟠 HIGH  
**Issues:**
- Multiple commented URLs expose internal network structure
- Production URL hardcoded
- No environment-based configuration
- Internal IP addresses exposed (10.x.x.x, 192.168.x.x)

---

### 3. **Hardcoded Phone Numbers**

#### Location: `app/(auth)/booking/unknownPay.tsx`
```typescript
<Button
  onPress={() => Linking.openURL(`tel:+9651888828`)}
  title="Call to support"
  variant="contain"
/>
```

**Risk Level:** 🟡 MEDIUM  
**Issue:** Support phone number hardcoded in code

---

## Impact Assessment

| Risk Category | Impact | Likelihood | Overall Risk |
|--------------|--------|------------|--------------|
| Data Breach | Critical | High | 🔴 Critical |
| Service Abuse | High | High | 🔴 Critical |
| Financial Loss | High | Medium | 🟠 High |
| Reputation Damage | Critical | High | 🔴 Critical |
| Compliance Violation | Critical | High | 🔴 Critical |

---

## Required Actions

### ⚠️ IMMEDIATE (Within 24 Hours)

1. **Rotate ALL exposed API keys**
   - Generate new Google API keys
   - Update Firebase configuration
   - Revoke old keys immediately

2. **Remove sensitive files from git history**
   ```bash
   # Use BFG Repo-Cleaner
   brew install bfg
   bfg --delete-files GoogleService-Info.plist
   bfg --delete-files google-services.json
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   ```

3. **Add files to .gitignore**
   ```gitignore
   # Sensitive configuration
   GoogleService-Info.plist
   google-services.json
   .env
   .env.local
   .env.production
   ```

---

### 🔧 SHORT TERM (Week 1)

#### 1. Implement Environment Variables

**Create:** `app.config.js`
```javascript
export default {
  name: "NEOCARE",
  version: "1.2.0",
  extra: {
    apiUrl: process.env.API_URL,
    googleApiKey: process.env.GOOGLE_API_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    supportPhone: process.env.SUPPORT_PHONE,
    eas: {
      projectId: process.env.EAS_PROJECT_ID
    }
  }
};
```

**Create:** `.env.example`
```bash
# API Configuration
API_URL=https://api.example.com
GOOGLE_API_KEY=your_api_key_here
GOOGLE_CLIENT_ID=your_client_id_here
SUPPORT_PHONE=+1234567890
EAS_PROJECT_ID=your_project_id_here
```

**Create:** `.env` (DO NOT COMMIT)
```bash
API_URL=https://neocareapi.myvannet.eu
GOOGLE_API_KEY=<new_rotated_key>
GOOGLE_CLIENT_ID=<new_client_id>
SUPPORT_PHONE=+9651888828
EAS_PROJECT_ID=a732579e-d251-4952-97db-574e3f9c67c5
```

---

#### 2. Update Configuration Usage

**Update:** `src/config.ts`
```typescript
import Constants from 'expo-constants';

export const config = {
  baseURL: Constants.expoConfig?.extra?.apiUrl || '',
  googleApiKey: Constants.expoConfig?.extra?.googleApiKey || '',
  googleClientId: Constants.expoConfig?.extra?.googleClientId || '',
  supportPhone: Constants.expoConfig?.extra?.supportPhone || '',
};

// Validation
if (!config.baseURL) {
  throw new Error('API_URL environment variable is required');
}
```

**Update:** `app/(auth)/booking/unknownPay.tsx`
```typescript
import { config } from '@src/config';

<Button
  onPress={() => Linking.openURL(`tel:${config.supportPhone}`)}
  title="Call to support"
  variant="contain"
/>
```

---

#### 3. Set Up EAS Secrets

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Set secrets
eas secret:create --scope project --name API_URL --value "https://neocareapi.myvannet.eu"
eas secret:create --scope project --name GOOGLE_API_KEY --value "<your_key>"
eas secret:create --scope project --name GOOGLE_CLIENT_ID --value "<your_client_id>"
eas secret:create --scope project --name SUPPORT_PHONE --value "+9651888828"
```

---

#### 4. Update Build Configuration

**Update:** `eas.json`
```json
{
  "build": {
    "development": {
      "env": {
        "API_URL": "http://localhost:15350"
      }
    },
    "preview": {
      "env": {
        "API_URL": "https://staging-api.myvannet.eu"
      }
    },
    "production": {
      "env": {
        "API_URL": "https://neocareapi.myvannet.eu"
      }
    }
  }
}
```

---

## Verification Checklist

- [ ] All API keys rotated
- [ ] Sensitive files removed from git history
- [ ] `.gitignore` updated
- [ ] Environment variables implemented
- [ ] `.env.example` created and documented
- [ ] EAS secrets configured
- [ ] All hardcoded URLs replaced with env vars
- [ ] All hardcoded credentials replaced with env vars
- [ ] Team members notified of new configuration
- [ ] Documentation updated
- [ ] Security audit performed

---

## Prevention Measures

### 1. **Pre-commit Hooks**

Install `git-secrets`:
```bash
brew install git-secrets
git secrets --install
git secrets --register-aws
```

### 2. **Code Review Checklist**
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No internal URLs in code
- [ ] All config uses environment variables

### 3. **CI/CD Checks**
Add secret scanning to CI/CD pipeline:
```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Gitleaks
        uses: zricethezav/gitleaks-action@master
```

---

## Resources

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Expo Environment Variables](https://docs.expo.dev/guides/environment-variables/)
- [EAS Secrets](https://docs.expo.dev/build-reference/variables/)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

## Estimated Effort

- **Immediate Actions:** 2-4 hours
- **Implementation:** 1-2 days
- **Testing & Verification:** 1 day
- **Total:** 2-3 days

---

## Priority: 🔴 HIGHEST - DO NOT DEPLOY UNTIL FIXED
