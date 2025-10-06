export const securityContent = `
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

#### Location: \`GoogleService-Info.plist\`
\`\`\`xml
<key>API_KEY</key>
<string>AIzaSyCj2bSK2U0pccNAv5Q0QZy0CYEdUGE2FfM</string>

<key>CLIENT_ID</key>
<string>113904800649-rm71thlh5407ju7in0s0gv105h8ehvpq.apps.googleusercontent.com</string>
\`\`\`

**Risk Level:** 🔴 CRITICAL  
**Impact:** Anyone with repository access can use these keys to access Google services

---

### 2. **Hardcoded API Base URLs**

#### Location: \`src/config.ts\`
\`\`\`typescript
export const config = {
  // baseURL: "http://localhost:15350",
  // baseURL: "http://10.20.30.21:15350",
  // baseURL: "http://192.168.10.30:15350",
  baseURL: "https://neocareapi.myvannet.eu",
};
\`\`\`

**Risk Level:** 🟠 HIGH  
**Issues:**
- Multiple commented URLs expose internal network structure
- Production URL hardcoded
- No environment-based configuration

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
   \`\`\`bash
   # Use BFG Repo-Cleaner
   brew install bfg
   bfg --delete-files GoogleService-Info.plist
   bfg --delete-files google-services.json
   \`\`\`

3. **Add files to .gitignore**
   \`\`\`gitignore
   # Sensitive configuration
   GoogleService-Info.plist
   google-services.json
   .env
   .env.local
   .env.production
   \`\`\`

---

### 🔧 SHORT TERM (Week 1)

#### 1. Implement Environment Variables

**Create:** \`app.config.js\`
\`\`\`javascript
export default {
  name: "NEOCARE",
  version: "1.2.0",
  extra: {
    apiUrl: process.env.API_URL,
    googleApiKey: process.env.GOOGLE_API_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    supportPhone: process.env.SUPPORT_PHONE,
  }
};
\`\`\`

**Update:** \`src/config.ts\`
\`\`\`typescript
import Constants from \'expo-constants\';

export const config = {
  baseURL: Constants.expoConfig?.extra?.apiUrl || \'\',
  googleApiKey: Constants.expoConfig?.extra?.googleApiKey || \'\',
  googleClientId: Constants.expoConfig?.extra?.googleClientId || \'\',
  supportPhone: Constants.expoConfig?.extra?.supportPhone || \'\',
};

// Validation
if (!config.baseURL) {
  throw new Error(\'API_URL environment variable is required\');
}
\`\`\`

---

## Verification Checklist

- [ ] All API keys rotated
- [ ] Sensitive files removed from git history
- [ ] \`.gitignore\` updated
- [ ] Environment variables implemented
- [ ] \`.env.example\` created and documented
- [ ] EAS secrets configured
- [ ] All hardcoded URLs replaced with env vars
- [ ] All hardcoded credentials replaced with env vars
- [ ] Team members notified of new configuration
- [ ] Documentation updated
- [ ] Security audit performed

---

## Prevention Measures

### 1. **Pre-commit Hooks**

Install \`git-secrets\`:
\`\`\`bash
brew install git-secrets
git secrets --install
git secrets --register-aws
\`\`\`

### 2. **Code Review Checklist**
- [ ] No API keys in code
- [ ] No passwords in code
- [ ] No internal URLs in code
- [ ] All config uses environment variables

---


## Priority: 🔴 HIGHEST - DO NOT DEPLOY UNTIL FIXED
`;
